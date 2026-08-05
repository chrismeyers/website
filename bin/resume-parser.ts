import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import { format } from 'oxfmt';
import oxfmtConfig from '../oxfmt.config.ts';

type Resume = {
  experience: {
    url: string | null;
    firstLine: string[];
    secondLine: string[][];
    info: string[][];
  }[];
  education: {
    url: string | null;
    firstLine: string[];
    secondLine: string[][];
    info: string[][];
  }[];
  skills: {
    mainItem: { title: string; items: string[] };
    subItems: string[];
  }[];
};

type ResumeSummary = {
  languages: string[];
  mostRecentJob: {
    employed: boolean;
    company: string;
    url: string | null;
    title: string;
    dates: string[];
  };
};

export default class ResumeParser {
  #rawSections: Record<string, string[]> = {};

  constructor(resumePath: string) {
    this.#load(resumePath);
  }

  #load(resumePath: string) {
    const data = fs.readFileSync(resumePath, { encoding: 'utf-8' });
    const lines = data.split('\n');

    const beginPattern = '% BEGIN';
    const endPattern = '% END';
    let section = '';

    lines.forEach((line) => {
      const trimmedLine = line.trim();

      if (trimmedLine === '') return;

      if (trimmedLine.includes(beginPattern)) {
        // New section
        section = trimmedLine.substring(beginPattern.length + 1);
      } else if (section !== '' && !trimmedLine.includes(endPattern)) {
        // Between begin and end
        if (section in this.#rawSections) {
          this.#rawSections[section].push(trimmedLine);
        } else {
          this.#rawSections[section] = [trimmedLine];
        }
      } else {
        // Between end and begin
        section = '';
      }
    });
  }

  parseComplexSection(section: string, removeInlineComments: boolean = true) {
    const urlPattern = '% URL';
    const firstLinePattern = String.raw`{\textbf{`;
    const secondLinePattern = String.raw`{\emph{`;
    const endPattern = '}}';
    const infoPattern = String.raw`\item[$\circ$]`;
    const sameCompanyPattern = '% SAME COMPANY';
    const blockEndPattern = '% BLOCK END';

    const items: {
      url: string | null;
      firstLine: string[];
      secondLine: string[][];
      info: string[][];
    }[] = [];

    let url: string | null = null;
    let firstLine: string[] = [];
    let secondLine: string[][] = [];
    let info: string[][] = [];
    let currentSecondLine: string[] = [];
    let currentInfo: string[] = [];

    this.#rawSections[section].forEach((line) => {
      if (line.startsWith(urlPattern)) {
        const beginPatternIndex =
          line.indexOf(urlPattern) + urlPattern.length + 1;

        url = line.substring(beginPatternIndex);
      } else if (line.startsWith(firstLinePattern)) {
        const beginPatternIndex =
          line.indexOf(firstLinePattern) + firstLinePattern.length;
        const endPatternIndex = line.indexOf(endPattern);
        const cleaned = ResumeParser.#cleanString(
          line
            .substring(beginPatternIndex, endPatternIndex)
            .replaceAll(endPattern, ''),
          removeInlineComments
        );

        firstLine.push(cleaned);
      } else if (line.startsWith(secondLinePattern)) {
        const beginPatternIndex =
          line.indexOf(secondLinePattern) + secondLinePattern.length;
        const endPatternIndex = line.indexOf(endPattern);
        const cleaned = ResumeParser.#cleanString(
          line
            .substring(beginPatternIndex, endPatternIndex)
            .replaceAll(endPattern, ''),
          removeInlineComments
        );

        currentSecondLine.push(cleaned);
      } else if (line.startsWith(infoPattern)) {
        const cleaned = ResumeParser.#cleanString(
          line.substring(infoPattern.length + 1),
          removeInlineComments
        );

        currentInfo.push(cleaned);
      } else if (line.startsWith(sameCompanyPattern)) {
        secondLine.push(currentSecondLine);
        info.push(currentInfo);

        currentSecondLine = [];
        currentInfo = [];
      } else if (line.startsWith(blockEndPattern)) {
        secondLine.push(currentSecondLine);
        info.push(currentInfo);
        items.push({ url, firstLine, secondLine, info });

        url = null;
        firstLine = [];
        secondLine = [];
        info = [];
        currentSecondLine = [];
        currentInfo = [];
      }
    });

    return items;
  }

  parseListSection(section: string, removeInlineComments: boolean = true) {
    const itemPattern = String.raw`\item`;
    const titleBeginPattern = String.raw`\textbf{`;
    const titleEndPattern = '}';

    const items: {
      mainItem: { title: string; items: string[] };
      subItems: string[];
    }[] = [];

    this.#rawSections[section].forEach((line) => {
      if (line.startsWith(itemPattern)) {
        const data = { title: '', items: [] as string[] };
        const trimmed = line.replace(itemPattern, '').trim();

        if (trimmed.startsWith(titleBeginPattern)) {
          const beginPatternIndex =
            trimmed.indexOf(titleBeginPattern) + titleBeginPattern.length;
          const endPatternIndex = trimmed.indexOf(titleEndPattern);

          data.title = ResumeParser.#cleanString(
            trimmed
              .substring(beginPatternIndex, endPatternIndex)
              .replaceAll(titleEndPattern, ''),
            removeInlineComments
          );

          data.items = trimmed
            .substring(endPatternIndex + titleEndPattern.length + 1)
            .split(/(?!\(.*),(?![^(]*?\))/) // Splits the language lists on commas, except within parentheses
            .map((s) => ResumeParser.#cleanString(s, removeInlineComments));
        } else {
          data.items = [
            ResumeParser.#cleanString(trimmed, removeInlineComments),
          ];
        }

        items.push({ mainItem: data, subItems: [] });
      }
    });

    return items;
  }

  getLanguages() {
    const skills = this.parseListSection('TechnicalSkills', false);
    const languages = skills.find(
      (skill) =>
        skill.mainItem.title.toLowerCase().replace(':', '') === 'languages'
    );

    if (!languages) return [];

    return languages.mainItem.items;
  }

  getMostRecentJob() {
    const job = this.parseComplexSection('Experience')[0];

    const dates = job.secondLine[0][1].split('&ndash;').map((d) => d.trim());

    return {
      employed: dates[1].toLowerCase() === 'present',
      company: job.firstLine[0],
      url: job.url,
      title: job.secondLine[0][0].split(',')[0],
      dates,
    };
  }

  static #cleanString(input: string, removeInlineComments: boolean) {
    let output = input.trim();

    if (removeInlineComments) {
      // This regex skips escaped percent signs by using negative lookbehind
      output = output.split(/(?<!\\)%/)[0].trim();
    }

    output = output.replaceAll(String.raw`\CPP`, 'C++');
    output = output.replaceAll(String.raw`\break`, '');
    output = output.replaceAll('--', '&ndash;');
    output = output.replaceAll(
      String.raw`\textsuperscript{\textregistered}`,
      '&reg;'
    );
    output = output.replaceAll(String.raw({ raw: '\\' }), '');

    return output;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.length < 4) {
    console.error('Usage: node resume-parser.js resumePath generatedPath');
    process.exit(1);
  }

  const [, , resumePath, generatedPath] = process.argv;

  const parser = new ResumeParser(resumePath);
  const parsed: { full: Resume; summary: ResumeSummary } = {
    full: {
      experience: parser.parseComplexSection('Experience'),
      education: parser.parseComplexSection('Education'),
      skills: parser.parseListSection('TechnicalSkills'),
    },
    summary: {
      languages: parser.getLanguages(),
      mostRecentJob: parser.getMostRecentJob(),
    },
  };

  const srcPath = new URL(import.meta.url).pathname;
  const program = ts.createProgram([srcPath], {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
  });
  const srcFile = program.getSourceFile(srcPath);
  if (!srcFile) {
    throw new Error(`Could not read source file for types: ${srcPath}`);
  }
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  const printTypeAlias = (name: string) => {
    if (!srcFile) throw new Error('Source file not available');
    for (const stmt of srcFile.statements) {
      if (ts.isTypeAliasDeclaration(stmt) && stmt.name.text === name) {
        return printer.printNode(ts.EmitHint.Unspecified, stmt, srcFile);
      }
    }
    throw new Error(`Type alias "${name}" not found in ${srcPath}`);
  };

  const resumeType = printTypeAlias('Resume');
  const resumeSummaryType = printTypeAlias('ResumeSummary');

  const source = `
    // WARNING: This file is generated, do not edit directly!
    // Edit the resume source file and regenerate instead.

    ${resumeType}

    ${resumeSummaryType}

    export const full: Resume = ${JSON.stringify(parsed.full)};

    export const summary: ResumeSummary = ${JSON.stringify(parsed.summary)};
  `;
  const { code, errors } = await format(generatedPath, source, oxfmtConfig);

  if (errors.length > 0) {
    throw new Error(
      `Failed to format generated resume module: ${errors.map((error) => error.message).join('\n')}`
    );
  }

  fs.writeFileSync(generatedPath, code);
}

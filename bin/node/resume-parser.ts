import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import prettier, { type Config } from 'prettier';
// @ts-expect-error: Could not find a declaration file for module '../../prettier.config.js'
import prettierrc from '../../prettier.config.js';

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
    const circleItemPattern = String.raw`\item[$\circ$]`;
    const beginSubPattern = String.raw`\begin{itemize*}`;
    const endSubPattern = String.raw`\end{itemize*}`;

    const items: {
      mainItem: string;
      subItems: string[];
    }[] = [];
    let subItem = false;
    let count = 0;

    this.#rawSections[section].forEach((line) => {
      if (line.startsWith(beginSubPattern)) {
        subItem = true;
      } else if (line.startsWith(endSubPattern)) {
        subItem = false;
      } else if (line.startsWith(itemPattern)) {
        if (subItem) {
          const cleaned = ResumeParser.#cleanString(
            line.substring(circleItemPattern.length + 1),
            removeInlineComments
          );

          items[count - 1].subItems.push(cleaned);
        } else {
          const cleaned = ResumeParser.#cleanString(
            line.substring(itemPattern.length + 1),
            removeInlineComments
          );

          items.push({ mainItem: cleaned, subItems: [] });
          count += 1;
        }
      }
    });

    return items;
  }

  getLanguages() {
    const languagesPattern = '% LANGUAGES';
    const langMap: Record<string, string[]> = {};
    const skills = this.parseListSection('TechnicalSkills', false);

    skills.forEach((skill) => {
      if (skill.mainItem.includes(languagesPattern)) {
        const [type, delimiter] = skill.mainItem
          .split(languagesPattern)[1]
          .trim()
          .split(' ');

        langMap[type] = skill.mainItem
          .split(delimiter)[1]
          .split(languagesPattern)[0]
          .split(/(?!\(.*),(?![^(]*?\))/) // Splits the language lists on commas, except within parentheses
          .map((s) => s.trim());
      }
    });

    return langMap;
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

  const parsed = {
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

  fs.writeFileSync(
    generatedPath,
    await prettier.format(
      `
        // WARNING: This file is generated, do not edit directly!
        // Edit the resume source file and regenerate instead.

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
            mainItem: string;
            subItems: string[];
          }[];
        }

        type ResumeSummary = {
          languages: {
            all: string[];
          };
          mostRecentJob: {
            employed: boolean;
            company: string;
            url: string;
            title: string;
            dates: string[];
          };
        }

        export const full: Resume = ${JSON.stringify(parsed.full)};

        export const summary: ResumeSummary = ${JSON.stringify(parsed.summary)};
      `,
      { parser: 'typescript', ...(prettierrc as Config) }
    )
  );
}

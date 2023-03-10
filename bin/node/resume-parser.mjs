#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import prettier from 'prettier'; // eslint-disable-line import/no-extraneous-dependencies
import prettierrc from '../../.prettierrc.js';

const resumeParser = ({ resumePath }) => {
  const rawSections = {};

  const load = () => {
    const data = fs.readFileSync(resumePath, 'utf8');
    const lines = data.split('\n');

    const beginPattern = '% BEGIN';
    const endPattern = '% END';
    let section = '';

    lines.forEach((line) => {
      const trimmedLine = line.trim();

      if (trimmedLine === '') {
        return;
      }

      if (trimmedLine.includes(beginPattern)) {
        // New section
        section = trimmedLine.substring(beginPattern.length + 1);
      } else if (section !== '' && !trimmedLine.includes(endPattern)) {
        // Between begin and end
        if (section in rawSections) {
          const values = rawSections[section];
          values.push(trimmedLine);
          rawSections[section] = values;
        } else {
          rawSections[section] = [trimmedLine];
        }
      } else {
        // Between end and begin
        section = '';
      }
    });
  };

  const cleanString = (input, removeInlineComments) => {
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
  };

  const parseComplexSection = (section, removeInlineComments = true) => {
    const urlPattern = '% URL';
    const firstLinePattern = String.raw`{\textbf{`;
    const secondLinePattern = String.raw`{\emph{`;
    const endPattern = '}}';
    const infoPattern = String.raw`\item[$\circ$]`;
    const sameCompanyPattern = '% Same Company';
    const blockEndPattern = '% BLOCK End';

    const items = [];

    let url = null;
    let firstLine = [];
    let secondLine = [];
    let info = [];

    let currentSecondLine = [];
    let currentInfo = [];

    rawSections[section].forEach((line) => {
      if (line.startsWith(urlPattern)) {
        const beginPatternIndex =
          line.indexOf(urlPattern) + urlPattern.length + 1;

        url = line.substring(beginPatternIndex);
      } else if (line.startsWith(firstLinePattern)) {
        const beginPatternIndex =
          line.indexOf(firstLinePattern) + firstLinePattern.length;
        const endPatternIndex = line.indexOf(endPattern);
        const cleaned = cleanString(
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
        const cleaned = cleanString(
          line
            .substring(beginPatternIndex, endPatternIndex)
            .replaceAll(endPattern, ''),
          removeInlineComments
        );

        currentSecondLine.push(cleaned);
      } else if (line.startsWith(infoPattern)) {
        const cleaned = cleanString(
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
  };

  const parseListSection = (section, removeInlineComments = true) => {
    const itemPattern = String.raw`\item`;
    const circleItemPattern = String.raw`\item[$\circ$]`;
    const beginSubPattern = String.raw`\begin{itemize*}`;
    const endSubPattern = String.raw`\end{itemize*}`;

    const items = [];
    let subItem = false;
    let count = 0;

    rawSections[section].forEach((line) => {
      if (line.startsWith(beginSubPattern)) {
        subItem = true;
      } else if (line.startsWith(endSubPattern)) {
        subItem = false;
      } else if (line.startsWith(itemPattern)) {
        let cleaned = '';

        if (subItem) {
          cleaned = cleanString(
            line.substring(circleItemPattern.length + 1),
            removeInlineComments
          );
          items[count - 1].subItems.push(cleaned);
        } else {
          cleaned = cleanString(
            line.substring(itemPattern.length + 1),
            removeInlineComments
          );
          items.push({ mainItem: cleaned, subItems: [] });
          count += 1;
        }
      }
    });

    return items;
  };

  const getLanguages = () => {
    const languagesPattern = '% LANGUAGES';
    // Splits the language lists on commas, except within parentheses
    const regexp = /(?!\(.*),(?![^(]*?\))/;
    const langMap = {};
    const skills = parseListSection('TechnicalSkills', false);

    skills.forEach((skill) => {
      if (skill.mainItem.includes(languagesPattern)) {
        const type = skill.mainItem.split(languagesPattern)[1].trim();
        langMap[type] = skill.subItems[0].split(regexp).map((s) => s.trim());
      }
    });

    return langMap;
  };

  const getMostRecentJob = () => {
    const job = parseComplexSection('Experience')[0];

    const dates = job.secondLine[0][1].split('&ndash;').map((d) => d.trim());

    return {
      employed: dates[1].toLowerCase() === 'present',
      company: job.firstLine[0],
      url: job.url,
      title: job.secondLine[0][0].split(',')[0],
      dates,
    };
  };

  return {
    load,
    parseComplexSection,
    parseListSection,
    getLanguages,
    getMostRecentJob,
  };
};

const createResumeParser = (resumePath) => {
  const parser = resumeParser({ resumePath });
  parser.load();
  return parser;
};

export default createResumeParser;

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.length < 4) {
    // eslint-disable-next-line no-console
    console.error('usage: node resume.js <resumePath> <generatedPath>');
    process.exit(1);
  }

  const resumePath = process.argv[2];
  const generatedPath = process.argv[3];

  const { dir: generatedDir } = path.parse(generatedPath);

  fs.rmSync(generatedDir, { recursive: true, force: true });

  const parser = createResumeParser(resumePath);

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

  fs.mkdirSync(generatedDir, { recursive: true });

  fs.writeFileSync(
    generatedPath,
    prettier.format(
      [
        '// WARNING: This file is generated, do not edit directly!',
        '// Edit the resume source file and regenerate instead',
        '',
        `export const full = ${JSON.stringify(parsed.full)};`,
        '',
        `export const summary = ${JSON.stringify(parsed.summary)};`,
      ].join('\n'),
      { parser: 'babel', ...prettierrc }
    )
  );
}

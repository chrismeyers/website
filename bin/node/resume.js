#!/usr/bin/env node

const fs = require('fs');
const prettier = require('prettier'); // eslint-disable-line import/no-extraneous-dependencies
const prettierrc = require('../../.prettierrc');
const createResumeParser = require('../../src/lib/resume-parser');

if (process.argv.length < 3) {
  // eslint-disable-next-line no-console
  console.error('usage: node resume.js resumePath');
  process.exit(1);
}

const generatedDir = 'generated';
const resumePath = process.argv[2];

fs.rmSync(generatedDir, { recursive: true, force: true });

const parser = createResumeParser(resumePath);
parser.load();

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
  `${generatedDir}/resume.js`,
  prettier.format(
    [
      `export const getFullResume = () => (${JSON.stringify(parsed.full)});`,
      '',
      `export const getSummary = () => (${JSON.stringify(parsed.summary)});`,
    ].join('\n'),
    { parser: 'babel', ...prettierrc },
  ),
);

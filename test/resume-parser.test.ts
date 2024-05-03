import path from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';
import ResumeParser from '../bin/node/resume-parser';

describe('Resume Parser', () => {
  let parser: ResumeParser;

  beforeAll(() => {
    parser = new ResumeParser(
      path.join(__dirname, 'fixtures', 'test-resume.latex')
    );
  });

  describe('full', () => {
    it('parses experience section', () => {
      const items = parser.parseComplexSection('Experience');

      expect(items).toStrictEqual([
        {
          url: 'https://www.company1.com',
          firstLine: ['Company 1', 'Planet Earth'],
          secondLine: [
            ['Position 1', 'June 1234 &ndash; Present'],
            ['Position 2', 'Jan. 1234 &ndash; May 1234'],
          ],
          info: [['Item 1', 'Item 2&reg;'], ['Item 1']],
        },
        {
          url: 'https://company2.com',
          firstLine: ['Company 2', 'Mars'],
          secondLine: [['Position 1', 'Jan. 2199 &ndash; Mar. 2208']],
          info: [['Item 1', 'Item 2', 'Item 3']],
        },
      ]);
    });

    it('parses education section', () => {
      const items = parser.parseComplexSection('Education');

      expect(items).toStrictEqual([
        {
          url: 'https://www.school.edu',
          firstLine: ['School', 'Planet Earth'],
          secondLine: [['Degree', 'Jan. 9999 &ndash; Dec. 9999']],
          info: [[]],
        },
      ]);
    });

    it('parses technical skills section', () => {
      const items = parser.parseListSection('TechnicalSkills');

      expect(items).toStrictEqual([
        {
          mainItem:
            'Language list 100% delimiter Language 1 (Something 1, Something 2), Language 2, Language 3 (Something 3)',
          subItems: [],
        },
        {
          mainItem: 'Item 1',
          subItems: [],
        },
        {
          mainItem: 'Item 2',
          subItems: [],
        },
        {
          mainItem: 'Item 3',
          subItems: [],
        },
      ]);
    });
  });

  describe('summary', () => {
    it('parses language summary', () => {
      const item = parser.getLanguages();

      expect(item).toStrictEqual({
        all: [
          'Language 1 (Something 1, Something 2)',
          'Language 2',
          'Language 3 (Something 3)',
        ],
      });
    });

    it('parses most recent job', () => {
      const item = parser.getMostRecentJob();

      expect(item).toStrictEqual({
        employed: true,
        company: 'Company 1',
        url: 'https://www.company1.com',
        title: 'Position 1',
        dates: ['June 1234', 'Present'],
      });
    });
  });
});

import { describe, expect, it, vi } from 'vitest';
import * as resume from '../../src/assets/generated/resume.ts';
import ResumeContent from '../../src/components/content/ResumeContent.astro';
import styles from '../../src/styles/Resume.module.css';
import { renderAstro } from '../_astro-container.ts';

describe('Resume page', () => {
  it('displays experience section correctly', async () => {
    vi.spyOn(resume, 'full', 'get').mockReturnValue({
      experience: [
        {
          url: 'https://company.com',
          firstLine: ['Somewhere', 'Anywhere, Earth'],
          secondLine: [['Wizard', 'Jan. 1234 &ndash; Present']],
          info: [['Did this thing', 'Did that thing']],
        },
      ],
      education: [],
      skills: [],
    });

    const page = await renderAstro(ResumeContent);

    expect(page.getByText('Anywhere, Earth')).toBeInTheDocument();
    expect(page.getByText('Somewhere')).toHaveAttribute(
      'href',
      'https://company.com'
    );
    expect(page.getByText('Somewhere').closest('li')).toHaveClass(
      styles.company
    );
    expect(page.getByText('Anywhere, Earth')).toHaveClass(styles.location);
    expect(page.getByText('Wizard')).toHaveClass(styles.jobTitle);
    expect(page.getByText('Jan. 1234 \u2013 Present')).toHaveClass(
      styles.tenure
    );
    expect(page.getByText('Did this thing')).toHaveClass('more-info');
    expect(page.getByText('Did that thing')).toHaveClass('more-info');
  });

  it('displays experience section without info correctly', async () => {
    vi.spyOn(resume, 'full', 'get').mockReturnValue({
      experience: [
        {
          url: 'https://company.com',
          firstLine: ['Somewhere', 'Anywhere, Earth'],
          secondLine: [['Wizard', 'Jan. 1234 &ndash; Present']],
          info: [[]],
        },
      ],
      education: [],
      skills: [],
    });

    const page = await renderAstro(ResumeContent);

    expect(page.getByText('Anywhere, Earth')).toBeInTheDocument();
    expect(page.getByText('Somewhere')).toHaveAttribute(
      'href',
      'https://company.com'
    );
    expect(page.getByText('Somewhere').closest('li')).toHaveClass(
      styles.company
    );
    expect(page.getByText('Anywhere, Earth')).toHaveClass(styles.location);
    expect(page.getByText('Wizard')).toHaveClass(styles.jobTitle);
    expect(page.getByText('Jan. 1234 \u2013 Present')).toHaveClass(
      styles.tenure
    );
  });

  it('displays multiple experience at some company correctly', async () => {
    vi.spyOn(resume, 'full', 'get').mockReturnValue({
      experience: [
        {
          url: 'https://company.com',
          firstLine: ['Somewhere', 'Anywhere, Earth'],
          secondLine: [
            ['Wizard', 'Jan. 1234 &ndash; Present'],
            ['Sorcerer', 'Jan. 1000 &ndash; Dec. 1233'],
          ],
          info: [
            ['Did this thing as a wizard', 'Did that thing as a wizard'],
            ['Did this thing as a sorcerer', 'Did that thing as a sorcerer'],
          ],
        },
      ],
      education: [],
      skills: [],
    });

    const page = await renderAstro(ResumeContent);

    expect(page.getByText('Anywhere, Earth')).toBeInTheDocument();
    expect(page.getByText('Somewhere')).toHaveAttribute(
      'href',
      'https://company.com'
    );
    expect(page.getByText('Somewhere').closest('li')).toHaveClass(
      styles.company
    );
    expect(page.getByText('Anywhere, Earth')).toHaveClass(styles.location);
    expect(page.getByText('Wizard')).toHaveClass(styles.jobTitle);
    expect(page.getByText('Jan. 1234 \u2013 Present')).toHaveClass(
      styles.tenure
    );
    expect(page.getByText('Sorcerer')).toHaveClass(styles.jobTitle);
    expect(page.getByText('Jan. 1000 \u2013 Dec. 1233')).toHaveClass(
      styles.tenure
    );
    expect(page.getByText('Did this thing as a wizard')).toHaveClass(
      'more-info'
    );
    expect(page.getByText('Did that thing as a wizard')).toHaveClass(
      'more-info'
    );
    expect(page.getByText('Did this thing as a sorcerer')).toHaveClass(
      'more-info'
    );
    expect(page.getByText('Did that thing as a sorcerer')).toHaveClass(
      'more-info'
    );
  });

  it('displays education section correctly', async () => {
    vi.spyOn(resume, 'full', 'get').mockReturnValue({
      experience: [],
      education: [
        {
          url: 'https://school.edu',
          firstLine: ['School', 'Anywhere, Earth'],
          secondLine: [['Degree', 'Jan. 9999 &ndash; Dec. 9999']],
          info: [['Took a class', 'Took another class']],
        },
      ],
      skills: [],
    });

    const page = await renderAstro(ResumeContent);

    expect(page.getByText('Anywhere, Earth')).toBeInTheDocument();
    expect(page.getByText('School')).toHaveAttribute(
      'href',
      'https://school.edu'
    );
    expect(page.getByText('School').closest('li')).toHaveClass(styles.school);
    expect(page.getByText('Degree')).toHaveClass(styles.degree);
    expect(page.getByText('Anywhere, Earth')).toHaveClass(styles.location);
    expect(page.getByText('Jan. 9999 \u2013 Dec. 9999')).toHaveClass(
      styles.tenure
    );
    expect(page.getByText('Took a class')).toHaveClass('more-info');
    expect(page.getByText('Took another class')).toHaveClass('more-info');
  });

  it('displays education section without info correctly', async () => {
    vi.spyOn(resume, 'full', 'get').mockReturnValue({
      experience: [],
      education: [
        {
          url: 'https://school.edu',
          firstLine: ['School', 'Anywhere, Earth'],
          secondLine: [['Degree', 'Jan. 9999 &ndash; Dec. 9999']],
          info: [[]],
        },
      ],
      skills: [],
    });

    const page = await renderAstro(ResumeContent);

    expect(page.getByText('Anywhere, Earth')).toBeInTheDocument();
    expect(page.getByText('School')).toHaveAttribute(
      'href',
      'https://school.edu'
    );
    expect(page.getByText('School').closest('li')).toHaveClass(styles.school);
    expect(page.getByText('Degree')).toHaveClass(styles.degree);
    expect(page.getByText('Anywhere, Earth')).toHaveClass(styles.location);
    expect(page.getByText('Jan. 9999 \u2013 Dec. 9999')).toHaveClass(
      styles.tenure
    );
  });

  it('displays skills section correctly', async () => {
    vi.spyOn(resume, 'full', 'get').mockReturnValue({
      experience: [],
      education: [],
      skills: [
        {
          mainItem: 'Multiple subitems',
          subItems: ['Sub 1', 'Sub 2a'],
        },
        {
          mainItem: 'One subitem',
          subItems: ['Sub 3'],
        },
        {
          mainItem: 'No subitems',
          subItems: [],
        },
      ],
    });

    const page = await renderAstro(ResumeContent);

    const multiple = page.getByText('Multiple subitems');
    expect(multiple).toHaveClass('skill-wrapper');
    expect(multiple.querySelector('ul')?.children.length).toBe(2);

    const one = page.getByText('One subitem');
    expect(one).toHaveClass('skill-wrapper');
    expect(one.querySelector('ul')?.children.length).toBe(1);

    const none = page.getByText('No subitems');
    expect(none).toHaveClass('skill-wrapper');
    expect(none.querySelector('ul')).toBeNull();
  });
});

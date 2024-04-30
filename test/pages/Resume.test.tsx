import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as resume from '../../src/assets/generated/resume.ts';
import Resume from '../../src/pages/Resume.tsx';
import styles from '../../src/styles/Resume.module.css';

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
    } as typeof resume.full);

    render(<Resume />);

    await waitFor(() => {
      expect(screen.getByText('Anywhere, Earth')).toBeInTheDocument();
    });

    expect(screen.getByText('Somewhere')).toHaveAttribute(
      'href',
      'https://company.com'
    );
    expect(screen.getByText('Somewhere').closest('li')).toHaveClass(
      styles.company
    );
    expect(screen.getByText('Anywhere, Earth')).toHaveClass(styles.location);
    expect(screen.getByText('Wizard')).toHaveClass(styles.jobTitle);
    expect(screen.getByText('Jan. 1234 \u2013 Present')).toHaveClass(
      styles.tenure
    );
    expect(screen.getByText('Did this thing')).toHaveClass('more-info');
    expect(screen.getByText('Did that thing')).toHaveClass('more-info');
  });

  it('displays experience section without info correctly', async () => {
    vi.spyOn(resume, 'full', 'get').mockReturnValue({
      experience: [
        {
          url: 'https://company.com',
          firstLine: ['Somewhere', 'Anywhere, Earth'],
          secondLine: [['Wizard', 'Jan. 1234 &ndash; Present']],
        },
      ],
    } as typeof resume.full);

    render(<Resume />);

    await waitFor(() => {
      expect(screen.getByText('Anywhere, Earth')).toBeInTheDocument();
    });

    expect(screen.getByText('Somewhere')).toHaveAttribute(
      'href',
      'https://company.com'
    );
    expect(screen.getByText('Somewhere').closest('li')).toHaveClass(
      styles.company
    );
    expect(screen.getByText('Anywhere, Earth')).toHaveClass(styles.location);
    expect(screen.getByText('Wizard')).toHaveClass(styles.jobTitle);
    expect(screen.getByText('Jan. 1234 \u2013 Present')).toHaveClass(
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
    } as typeof resume.full);

    render(<Resume />);

    await waitFor(() => {
      expect(screen.getByText('Anywhere, Earth')).toBeInTheDocument();
    });

    expect(screen.getByText('Somewhere')).toHaveAttribute(
      'href',
      'https://company.com'
    );
    expect(screen.getByText('Somewhere').closest('li')).toHaveClass(
      styles.company
    );
    expect(screen.getByText('Anywhere, Earth')).toHaveClass(styles.location);
    expect(screen.getByText('Wizard')).toHaveClass(styles.jobTitle);
    expect(screen.getByText('Jan. 1234 \u2013 Present')).toHaveClass(
      styles.tenure
    );
    expect(screen.getByText('Sorcerer')).toHaveClass(styles.jobTitle);
    expect(screen.getByText('Jan. 1000 \u2013 Dec. 1233')).toHaveClass(
      styles.tenure
    );
    expect(screen.getByText('Did this thing as a wizard')).toHaveClass(
      'more-info'
    );
    expect(screen.getByText('Did that thing as a wizard')).toHaveClass(
      'more-info'
    );
    expect(screen.getByText('Did this thing as a sorcerer')).toHaveClass(
      'more-info'
    );
    expect(screen.getByText('Did that thing as a sorcerer')).toHaveClass(
      'more-info'
    );
  });

  it('displays education section correctly', async () => {
    vi.spyOn(resume, 'full', 'get').mockReturnValue({
      education: [
        {
          url: 'https://school.edu',
          firstLine: ['School', 'Anywhere, Earth'],
          secondLine: [['Degree', 'Jan. 9999 &ndash; Dec. 9999']],
          info: [['Took a class', 'Took another class']],
        },
      ],
    } as typeof resume.full);

    render(<Resume />);

    await waitFor(() => {
      expect(screen.getByText('Anywhere, Earth')).toBeInTheDocument();
    });

    expect(screen.getByText('School')).toHaveAttribute(
      'href',
      'https://school.edu'
    );
    expect(screen.getByText('School').closest('li')).toHaveClass(styles.school);
    expect(screen.getByText('Degree')).toHaveClass(styles.degree);
    expect(screen.getByText('Anywhere, Earth')).toHaveClass(styles.location);
    expect(screen.getByText('Jan. 9999 \u2013 Dec. 9999')).toHaveClass(
      styles.tenure
    );
    expect(screen.getByText('Took a class')).toHaveClass('more-info');
    expect(screen.getByText('Took another class')).toHaveClass('more-info');
  });

  it('displays education section without info correctly', async () => {
    vi.spyOn(resume, 'full', 'get').mockReturnValue({
      education: [
        {
          url: 'https://school.edu',
          firstLine: ['School', 'Anywhere, Earth'],
          secondLine: [['Degree', 'Jan. 9999 &ndash; Dec. 9999']],
        },
      ],
    } as typeof resume.full);

    render(<Resume />);

    await waitFor(() => {
      expect(screen.getByText('Anywhere, Earth')).toBeInTheDocument();
    });

    expect(screen.getByText('School')).toHaveAttribute(
      'href',
      'https://school.edu'
    );
    expect(screen.getByText('School').closest('li')).toHaveClass(styles.school);
    expect(screen.getByText('Degree')).toHaveClass(styles.degree);
    expect(screen.getByText('Anywhere, Earth')).toHaveClass(styles.location);
    expect(screen.getByText('Jan. 9999 \u2013 Dec. 9999')).toHaveClass(
      styles.tenure
    );
  });

  it('displays skills section correctly', async () => {
    vi.spyOn(resume, 'full', 'get').mockReturnValue({
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
    } as typeof resume.full);

    render(<Resume />);

    await waitFor(() => {
      expect(screen.getByText('Multiple subitems')).toBeInTheDocument();
    });

    const multiple = screen.getByText('Multiple subitems');
    expect(multiple).toHaveClass('skill-wrapper');
    expect(multiple.querySelector('ul')?.children.length).toBe(2);

    const one = screen.getByText('One subitem');
    expect(one).toHaveClass('skill-wrapper');
    expect(one.querySelector('ul')?.children.length).toBe(1);

    const none = screen.getByText('No subitems');
    expect(none).toHaveClass('skill-wrapper');
    expect(none.querySelector('ul')).toBeNull();
  });
});

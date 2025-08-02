import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as resume from '../../src/assets/generated/resume.ts';
import About from '../../src/pages/About.tsx';

describe('About page', () => {
  it('excludes employment info is not currently employed', () => {
    vi.spyOn(resume, 'summary', 'get').mockReturnValue({
      languages: { all: ['N/A'] },
      mostRecentJob: {
        employed: false,
        company: 'Nope',
        url: 'http://not.employed',
        title: 'Nope',
        dates: ['Jan. 2999', 'Jan. 3999'],
      },
    });

    render(<About />);

    expect(screen.queryByTestId('employment')).toBeNull();
  });

  it('displays current job if currently employed', () => {
    vi.spyOn(resume, 'summary', 'get').mockReturnValue({
      languages: { all: ['Everything'] },
      mostRecentJob: {
        employed: true,
        company: 'Somewhere',
        url: 'http://current.job',
        title: 'Wizard',
        dates: ['Jan. 2999', 'Present'],
      },
    });

    render(<About />);

    const employment = screen.getByTestId('employment');

    expect(employment).toBeInTheDocument();
    expect(employment).toHaveTextContent(
      'Currently, I am employed as a Wizard at Somewhere'
    );
  });

  it('excludes language experience if missing', () => {
    vi.spyOn(resume, 'summary', 'get').mockReturnValue({
      languages: { all: [] },
      mostRecentJob: {
        employed: true,
        company: 'Somewhere',
        url: 'http://current.job',
        title: 'Wizard',
        dates: ['Jan. 2999', 'Present'],
      },
    });

    render(<About />);

    expect(screen.queryByTestId('languages')).not.toBeInTheDocument();
  });

  it('displays language experience', () => {
    vi.spyOn(resume, 'summary', 'get').mockReturnValue({
      languages: {
        all: [
          'Language 1 (Something 1, Something 2)',
          'Language 2',
          'Language 3 (Something 3)',
        ],
      },
      mostRecentJob: {
        employed: true,
        company: 'Somewhere',
        url: 'http://current.job',
        title: 'Wizard',
        dates: ['Jan. 2999', 'Present'],
      },
    });

    render(<About />);

    const languages = screen.getByTestId('languages');

    expect(languages).toBeInTheDocument();
    expect(languages.children).toHaveLength(3);
  });
});

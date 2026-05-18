import { describe, expect, it, vi } from 'vitest';
import * as resume from '../../src/assets/generated/resume.ts';
import AboutContent from '../../src/components/content/AboutContent.astro';
import { renderAstro } from '../_astro-container.ts';

describe('About page', () => {
  it('excludes employment info is not currently employed', async () => {
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

    const page = await renderAstro(AboutContent);

    expect(page.queryByTestId('employment')).toBeNull();
  });

  it('displays current job if currently employed', async () => {
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

    const page = await renderAstro(AboutContent);

    const employment = page.getByTestId('employment');

    expect(employment).toBeInTheDocument();
    expect(employment).toHaveTextContent(
      'Currently, I am employed as a Wizard at Somewhere'
    );
  });

  it('excludes language experience if missing', async () => {
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

    const page = await renderAstro(AboutContent);

    expect(page.queryByTestId('languages')).not.toBeInTheDocument();
  });

  it('displays language experience', async () => {
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

    const page = await renderAstro(AboutContent);

    const languages = page.getByTestId('languages');

    expect(languages).toBeInTheDocument();
    expect(languages.children).toHaveLength(3);
  });
});

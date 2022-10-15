import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AboutPage from '../../src/components/AboutPage';
import * as resume from '../../src/assets/generated/resume';

describe('AboutPage', () => {
  it('excludes employment info is not currently employed', async () => {
    vi.spyOn(resume, 'summary', 'get').mockReturnValue({
      mostRecentJob: {
        employed: false,
      },
    });

    render(<AboutPage />, { wrapper: MemoryRouter });

    await expect(screen.findByTestId('employment')).rejects.toThrow();
  });

  it('displays current job if currently employed', async () => {
    vi.spyOn(resume, 'summary', 'get').mockReturnValue({
      mostRecentJob: {
        employed: true,
        company: 'Somewhere',
        title: 'Wizard',
      },
    });

    render(<AboutPage />, { wrapper: MemoryRouter });

    const employment = await screen.findByTestId('employment');

    expect(employment).toBeInTheDocument();
    expect(employment).toHaveTextContent(
      'Currently, I am employed as a Wizard at Somewhere'
    );
  });

  it('excludes language experience if missing', async () => {
    vi.spyOn(resume, 'summary', 'get').mockReturnValue({});

    render(<AboutPage />, { wrapper: MemoryRouter });

    await expect(screen.findByTestId('desktop-languages')).rejects.toThrow();
    await expect(screen.findByTestId('web-languages')).rejects.toThrow();
  });

  it('displays language experience', async () => {
    vi.spyOn(resume, 'summary', 'get').mockReturnValue({
      languages: {
        desktop: [
          'Language 1 (Something 1, Something 2)',
          'Language 2',
          'Language 3',
        ],
        web: ['Language 4', 'Language 5 (Something 3)'],
      },
    });

    render(<AboutPage />, { wrapper: MemoryRouter });

    const desktopLanguages = await screen.findByTestId('desktop-languages');
    const webLanguages = await screen.findByTestId('web-languages');

    expect(desktopLanguages).toBeInTheDocument();
    expect(webLanguages).toBeInTheDocument();

    expect(desktopLanguages.children.length).toBe(3);
    expect(webLanguages.children.length).toBe(2);
  });
});

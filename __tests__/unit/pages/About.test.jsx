import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '../../../src/pages/About';
import * as resume from '../../../src/assets/generated/resume';

describe('About page', () => {
  it('excludes employment info is not currently employed', async () => {
    vi.spyOn(resume, 'summary', 'get').mockReturnValue({
      mostRecentJob: {
        employed: false,
      },
    });

    render(<About />, { wrapper: MemoryRouter });

    expect(screen.queryByTestId('employment')).toBeNull();
  });

  it('displays current job if currently employed', async () => {
    vi.spyOn(resume, 'summary', 'get').mockReturnValue({
      mostRecentJob: {
        employed: true,
        company: 'Somewhere',
        title: 'Wizard',
      },
    });

    render(<About />, { wrapper: MemoryRouter });

    const employment = screen.getByTestId('employment');

    expect(employment).toBeInTheDocument();
    expect(employment).toHaveTextContent(
      'Currently, I am employed as a Wizard at Somewhere'
    );
  });

  it('excludes language experience if missing', async () => {
    vi.spyOn(resume, 'summary', 'get').mockReturnValue({});

    render(<About />, { wrapper: MemoryRouter });

    expect(screen.queryByTestId('desktop-languages')).toBeNull();
    expect(screen.queryByTestId('web-languages')).toBeNull();
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

    render(<About />, { wrapper: MemoryRouter });

    const desktopLanguages = screen.getByTestId('desktop-languages');
    const webLanguages = screen.getByTestId('web-languages');

    expect(desktopLanguages).toBeInTheDocument();
    expect(webLanguages).toBeInTheDocument();

    expect(desktopLanguages.children.length).toBe(3);
    expect(webLanguages.children.length).toBe(2);
  });
});

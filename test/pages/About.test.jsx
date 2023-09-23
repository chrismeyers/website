import { cleanup, render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as resume from '../../src/assets/generated/resume';
import About from '../../src/pages/About';

describe('About page', () => {
  afterEach(() => {
    cleanup();
  });

  it('excludes employment info is not currently employed', async () => {
    vi.spyOn(resume, 'summary', 'get').mockReturnValue({
      mostRecentJob: {
        employed: false,
      },
    });

    render(
      <RouterProvider
        router={createMemoryRouter([{ path: '', element: <About /> }])}
      />
    );

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

    render(
      <RouterProvider
        router={createMemoryRouter([{ path: '', element: <About /> }])}
      />
    );

    const employment = screen.getByTestId('employment');

    expect(employment).toBeInTheDocument();
    expect(employment).toHaveTextContent(
      'Currently, I am employed as a Wizard at Somewhere'
    );
  });

  it('excludes language experience if missing', async () => {
    vi.spyOn(resume, 'summary', 'get').mockReturnValue({});

    render(
      <RouterProvider
        router={createMemoryRouter([{ path: '', element: <About /> }])}
      />
    );

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

    render(
      <RouterProvider
        router={createMemoryRouter([{ path: '', element: <About /> }])}
      />
    );

    const desktopLanguages = screen.getByTestId('desktop-languages');
    const webLanguages = screen.getByTestId('web-languages');

    expect(desktopLanguages).toBeInTheDocument();
    expect(webLanguages).toBeInTheDocument();

    expect(desktopLanguages.children.length).toBe(3);
    expect(webLanguages.children.length).toBe(2);
  });
});

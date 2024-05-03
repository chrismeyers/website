import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import * as resume from '../../src/assets/generated/resume.ts';
import * as lightbox from '../../src/components/Lightbox.tsx';
import About from '../../src/pages/About.tsx';

describe('About page', () => {
  let lgSpy: MockInstance;

  beforeEach(() => {
    lgSpy = vi
      .spyOn(lightbox, 'createLightGallery')
      // eslint-disable-next-line react/jsx-no-useless-fragment
      .mockImplementation(() => <></>);
  });

  it('excludes employment info is not currently employed', () => {
    vi.spyOn(resume, 'summary', 'get').mockReturnValue({
      mostRecentJob: {
        employed: false,
      },
    } as typeof resume.summary);

    render(
      <RouterProvider
        router={createMemoryRouter([{ path: '', element: <About /> }])}
      />
    );

    expect(screen.queryByTestId('employment')).toBeNull();

    expect(lgSpy).toHaveBeenCalledTimes(1);
  });

  it('displays current job if currently employed', () => {
    vi.spyOn(resume, 'summary', 'get').mockReturnValue({
      mostRecentJob: {
        employed: true,
        company: 'Somewhere',
        title: 'Wizard',
      },
    } as typeof resume.summary);

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

    expect(lgSpy).toHaveBeenCalledTimes(1);
  });

  it('excludes language experience if missing', () => {
    vi.spyOn(resume, 'summary', 'get').mockReturnValue(
      {} as typeof resume.summary
    );

    render(
      <RouterProvider
        router={createMemoryRouter([{ path: '', element: <About /> }])}
      />
    );

    expect(screen.queryByTestId('desktop-languages')).toBeNull();
    expect(screen.queryByTestId('web-languages')).toBeNull();

    expect(lgSpy).toHaveBeenCalledTimes(1);
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
    } as typeof resume.summary);

    render(
      <RouterProvider
        router={createMemoryRouter([{ path: '', element: <About /> }])}
      />
    );

    const languages = screen.getByTestId('languages');

    expect(languages).toBeInTheDocument();
    expect(languages.children).toHaveLength(3);

    expect(lgSpy).toHaveBeenCalledTimes(1);
  });
});

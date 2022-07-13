import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import nock from 'nock';
import Axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import AboutPage from '../../src/components/AboutPage';

Axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});

describe('AboutPage', () => {
  it('excludes employment info is not currently employed', async () => {
    nock(import.meta.env.VITE_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/resume/summary')
      .once()
      .reply(200, {
        mostRecentJob: {
          employed: false,
        },
      });

    render(
      <QueryClientProvider client={queryClient}>
        <AboutPage />
      </QueryClientProvider>,
      { wrapper: MemoryRouter },
    );

    await expect(screen.findByTestId('employment')).rejects.toThrow();
  });

  it('displays current job if currently employed', async () => {
    nock(import.meta.env.VITE_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/resume/summary')
      .once()
      .reply(200, {
        mostRecentJob: {
          employed: true,
          company: 'Somewhere',
          title: 'Wizard',
        },
      });

    render(
      <QueryClientProvider client={queryClient}>
        <AboutPage />
      </QueryClientProvider>,
      { wrapper: MemoryRouter },
    );

    const employment = await screen.findByTestId('employment');

    expect(employment).toBeInTheDocument();
    expect(employment).toHaveTextContent(
      'Currently, I am employed as a Wizard at Somewhere',
    );
  });

  it('excludes language experience if missing', async () => {
    nock(import.meta.env.VITE_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/resume/summary')
      .once()
      .reply(200);

    render(
      <QueryClientProvider client={queryClient}>
        <AboutPage />
      </QueryClientProvider>,
      { wrapper: MemoryRouter },
    );

    await expect(screen.findByTestId('desktop-languages')).rejects.toThrow();
    await expect(screen.findByTestId('web-languages')).rejects.toThrow();
  });

  it('displays language experience', async () => {
    nock(import.meta.env.VITE_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/resume/summary')
      .once()
      .reply(200, {
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
      <QueryClientProvider client={queryClient}>
        <AboutPage />
      </QueryClientProvider>,
      { wrapper: MemoryRouter },
    );

    const desktopLanguages = await screen.findByTestId('desktop-languages');
    const webLanguages = await screen.findByTestId('web-languages');

    expect(desktopLanguages).toBeInTheDocument();
    expect(webLanguages).toBeInTheDocument();

    expect(desktopLanguages.children.length).toBe(3);
    expect(webLanguages.children.length).toBe(2);
  });
});

import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import nock from 'nock';
import Axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import BuildsPage from '../../src/components/BuildsPage';

Axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});

describe('BuildsPage', () => {
  it('displays build summary correctly', async () => {
    const id = 1;
    const displayDate = 'Today - Built for Someone';
    const cpu = 'Intel 1000000K @ 99.9GHz';

    nock(import.meta.env.VITE_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/builds')
      .once()
      .reply(200, {
        items: [
          {
            id,
            displayDate,
            cpu,
          },
        ],
      });

    render(
      <QueryClientProvider client={queryClient}>
        <BuildsPage />
      </QueryClientProvider>,
      { wrapper: MemoryRouter },
    );

    await waitFor(() => {
      expect(screen.getByText(displayDate)).toBeInTheDocument();
    });

    expect(screen.getByText(displayDate)).toHaveAttribute(
      'href',
      `/builds/${id}`,
    );
    expect(
      screen.getByText((content, node) => {
        const hasText = (n) => n.textContent.match(/An Intel 1000000K/);
        const nodeHasText = hasText(node);
        const childrenDontHaveText = Array.from(node.children).every(
          (child) => !hasText(child),
        );

        return nodeHasText && childrenDontHaveText;
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Build Details/)).toHaveAttribute(
      'href',
      `/builds/${id}`,
    );
  });
});

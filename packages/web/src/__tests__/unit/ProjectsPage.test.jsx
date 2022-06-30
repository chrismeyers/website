import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import nock from 'nock';
import Axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProjectsPage from '../../components/ProjectsPage';

Axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});

describe('ProjectsPage', () => {
  it('displays project summary correctly', async () => {
    const id = 1;
    const title = 'Project Name';
    const displayDate = 'Test Project, Always and Forever';
    const info = 'Something involving code';

    nock(import.meta.env.VITE_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/projects')
      .once()
      .reply(200, {
        items: [
          {
            id,
            title,
            displayDate,
            info,
          },
        ],
      });

    render(
      <QueryClientProvider client={queryClient}>
        <ProjectsPage />
      </QueryClientProvider>,
      { wrapper: MemoryRouter },
    );

    await waitFor(() => {
      expect(screen.getByText('Project Name')).toBeInTheDocument();
    });

    expect(screen.getByText('Project Name')).toHaveAttribute(
      'href',
      `/projects/${id}`,
    );
    expect(screen.getByText(displayDate)).toBeInTheDocument();
    expect(screen.getByText(info)).toBeInTheDocument();
    expect(screen.getByText(/Project Details/)).toHaveAttribute(
      'href',
      `/projects/${id}`,
    );
  });
});

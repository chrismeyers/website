import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import nock from 'nock';
import Axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProjectPage from '../../src/components/ProjectPage';

Axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: 1 }),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});

describe('ProjectPage', () => {
  it('handles failure to load a project', async () => {
    nock(import.meta.env.VITE_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/projects/1')
      .once()
      .reply(404);

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <ProjectPage />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Project Details')).toBeInTheDocument();
    });

    expect(container).not.toHaveClass('project-wrapper');
  });

  it('displays project details without images correctly', async () => {
    const id = 1;
    const title = 'Project Name';
    const webUrl = 'https://hosted.site';
    const codeUrl = 'https://hosted.code';
    const displayDate = 'Test Project, Always and Forever';
    const lang = 'Language 1';
    const info = 'Something involving code';
    const role = 'Solo project';
    const stat = 'Being maintained';
    const images = [];

    nock(import.meta.env.VITE_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/projects/1')
      .once()
      .reply(200, {
        id,
        title,
        webUrl,
        codeUrl,
        displayDate,
        lang,
        info,
        role,
        stat,
        images,
      });

    render(
      <QueryClientProvider client={queryClient}>
        <ProjectPage />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Project Name')).toBeInTheDocument();
    });

    expect(
      screen.getByText('Test Project, Always and Forever'),
    ).toBeInTheDocument();
    expect(screen.getByText('Something involving code')).toBeInTheDocument();
    expect(screen.getByText('Solo project')).toBeInTheDocument();
    expect(screen.getByText('Being maintained')).toBeInTheDocument();
    expect(screen.getByText('Website')).toHaveAttribute(
      'href',
      'https://hosted.site',
    );
    expect(screen.getByText('Code')).toHaveAttribute(
      'href',
      'https://hosted.code',
    );
    await expect(screen.findByAltText('Image 1')).rejects.toThrow();
  });

  it('displays project details with images correctly', async () => {
    const id = 1;
    const title = 'Project Name';
    const webUrl = 'https://hosted.site';
    const codeUrl = 'https://hosted.code';
    const displayDate = 'Test Project, Always and Forever';
    const lang = 'Language 1';
    const info = 'Something involving code';
    const role = 'Solo project';
    const stat = 'Being maintained';
    const images = [
      {
        id: 1,
        path: '/path/to/1.png',
        thumbnail: null,
        title: 'Image 1',
        pos: 1,
        orient: 'square',
      },
      {
        id: 2,
        path: '/path/to/2.png',
        thumbnail: null,
        title: 'Image 2',
        pos: 2,
        orient: 'land',
      },
    ];

    nock(import.meta.env.VITE_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/projects/1')
      .once()
      .reply(200, {
        id,
        title,
        webUrl,
        codeUrl,
        displayDate,
        lang,
        info,
        role,
        stat,
        images,
      });

    render(
      <QueryClientProvider client={queryClient}>
        <ProjectPage />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Project Name')).toBeInTheDocument();
    });

    expect(
      screen.getByText('Test Project, Always and Forever'),
    ).toBeInTheDocument();
    expect(screen.getByText('Something involving code')).toBeInTheDocument();
    expect(screen.getByText('Solo project')).toBeInTheDocument();
    expect(screen.getByText('Being maintained')).toBeInTheDocument();
    expect(screen.getByText('Website')).toHaveAttribute(
      'href',
      'https://hosted.site',
    );
    expect(screen.getByText('Code')).toHaveAttribute(
      'href',
      'https://hosted.code',
    );
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
    expect(screen.getByAltText('Image 1').closest('a')).toHaveAttribute(
      'href',
      '/path/to/1.png',
    );
    expect(screen.getByAltText('Image 2')).toBeInTheDocument();
    expect(screen.getByAltText('Image 2').closest('a')).toHaveAttribute(
      'href',
      '/path/to/2.png',
    );
  });

  it('displays project details without a web URL correctly', async () => {
    const webUrl = null;
    const codeUrl = 'https://hosted.code';

    nock(import.meta.env.VITE_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/projects/1')
      .once()
      .reply(200, {
        webUrl,
        codeUrl,
      });

    render(
      <QueryClientProvider client={queryClient}>
        <ProjectPage />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Code')).toHaveAttribute(
        'href',
        'https://hosted.code',
      );
    });

    await expect(screen.findByAltText('Website')).rejects.toThrow();
  });

  it('displays gif thumbnail correctly', async () => {
    const title = 'Project Name';
    const images = [
      {
        id: 1,
        path: '/path/to/animated.gif',
        thumbnail: '/path/to/thumbnail.png',
        title: 'Image 1',
        pos: 1,
        orient: 'square',
      },
    ];

    nock(import.meta.env.VITE_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/projects/1')
      .once()
      .reply(200, {
        title,
        images,
      });

    render(
      <QueryClientProvider client={queryClient}>
        <ProjectPage />
      </QueryClientProvider>,
    );

    expect(await screen.findByAltText('Image 1')).toHaveAttribute(
      'src',
      '/path/to/thumbnail.png',
    );
    expect(
      (await screen.findByAltText('Image 1')).closest('a'),
    ).toHaveAttribute('href', '/path/to/animated.gif');
  });
});

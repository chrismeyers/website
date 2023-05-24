import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import Project from '../../src/pages/Project';
import * as data from '../../src/assets/data';

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useParams: () => ({ id: 1 }),
  useLocation: () => ({ pathname: '/projects/1' }),
}));

describe('Project page', () => {
  it('handles no projects', async () => {
    vi.spyOn(data, 'projects', 'get').mockReturnValue([]);

    render(
      <RouterProvider
        router={createMemoryRouter([{ path: '', element: <Project /> }])}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/does not exist/)).toBeInTheDocument();
    });

    expect(screen.getByText('/projects/1')).toBeInTheDocument();
  });

  it('handles no active projects', async () => {
    vi.spyOn(data, 'projects', 'get').mockReturnValue([
      {
        id: 1,
        active: false,
        title: 'Project Name',
        webUrl: 'https://hosted.site',
        codeUrl: 'https://hosted.code',
        displayDate: 'Test Project, Always and Forever',
        languages: ['Language 1'],
        info: 'Something involving code',
        role: 'Solo project',
        status: 'Being maintained',
        images: [],
      },
    ]);

    render(
      <RouterProvider
        router={createMemoryRouter([{ path: '', element: <Project /> }])}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/does not exist/)).toBeInTheDocument();
    });

    expect(screen.getByText('/projects/1')).toBeInTheDocument();
  });

  it('displays project details without images correctly', async () => {
    const id = 1;
    const title = 'Project Name';
    const webUrl = 'https://hosted.site';
    const codeUrl = 'https://hosted.code';
    const displayDate = 'Test Project, Always and Forever';
    const languages = ['Language 1'];
    const info = 'Something involving code';
    const role = 'Solo project';
    const status = 'Being maintained';
    const images = [];

    vi.spyOn(data, 'projects', 'get').mockReturnValue([
      {
        id,
        active: true,
        title,
        webUrl,
        codeUrl,
        displayDate,
        languages,
        info,
        role,
        status,
        images,
      },
    ]);

    render(<Project />);

    await waitFor(() => {
      expect(screen.getByText('Project Name')).toBeInTheDocument();
    });

    expect(
      screen.getByText('Test Project, Always and Forever')
    ).toBeInTheDocument();
    expect(screen.getByText('Something involving code')).toBeInTheDocument();
    expect(screen.getByText('Solo project')).toBeInTheDocument();
    expect(screen.getByText('Being maintained')).toBeInTheDocument();
    expect(screen.getByText('Website')).toHaveAttribute(
      'href',
      'https://hosted.site'
    );
    expect(screen.getByText('Code')).toHaveAttribute(
      'href',
      'https://hosted.code'
    );
    expect(screen.queryByAltText('Image 1')).toBeNull();
  });

  it('displays project details with images correctly', async () => {
    const id = 1;
    const title = 'Project Name';
    const webUrl = 'https://hosted.site';
    const codeUrl = 'https://hosted.code';
    const displayDate = 'Test Project, Always and Forever';
    const languages = ['Language 1'];
    const info = 'Something involving code';
    const role = 'Solo project';
    const status = 'Being maintained';
    const images = [
      {
        id: 1,
        path: '/path/to/1.png',
        thumbnail: null,
        title: 'Image 1',
        position: 1,
        orientation: 'square',
      },
      {
        id: 2,
        path: '/path/to/2.png',
        thumbnail: null,
        title: 'Image 2',
        position: 2,
        orientation: 'landscape',
      },
    ];

    vi.spyOn(data, 'projects', 'get').mockReturnValue([
      {
        id,
        active: true,
        title,
        webUrl,
        codeUrl,
        displayDate,
        languages,
        info,
        role,
        status,
        images,
      },
    ]);

    render(<Project />);

    await waitFor(() => {
      expect(screen.getByText('Project Name')).toBeInTheDocument();
    });

    expect(
      screen.getByText('Test Project, Always and Forever')
    ).toBeInTheDocument();
    expect(screen.getByText('Something involving code')).toBeInTheDocument();
    expect(screen.getByText('Solo project')).toBeInTheDocument();
    expect(screen.getByText('Being maintained')).toBeInTheDocument();
    expect(screen.getByText('Website')).toHaveAttribute(
      'href',
      'https://hosted.site'
    );
    expect(screen.getByText('Code')).toHaveAttribute(
      'href',
      'https://hosted.code'
    );
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
    expect(screen.getByAltText('Image 1').closest('a')).toHaveAttribute(
      'href',
      '/path/to/1.png'
    );
    expect(screen.getByAltText('Image 2')).toBeInTheDocument();
    expect(screen.getByAltText('Image 2').closest('a')).toHaveAttribute(
      'href',
      '/path/to/2.png'
    );
  });

  it('displays project details without a web URL correctly', async () => {
    const webUrl = null;
    const codeUrl = 'https://hosted.code';

    vi.spyOn(data, 'projects', 'get').mockReturnValue([
      {
        id: 1,
        active: true,
        webUrl,
        codeUrl,
        languages: [],
      },
    ]);

    render(<Project />);

    await waitFor(() => {
      expect(screen.getByText('Code')).toHaveAttribute(
        'href',
        'https://hosted.code'
      );
    });

    expect(screen.queryByAltText('Website')).toBeNull();
  });

  it('displays gif thumbnail correctly', async () => {
    const title = 'Project Name';
    const images = [
      {
        id: 1,
        path: '/path/to/animated.gif',
        thumbnail: '/path/to/thumbnail.png',
        title: 'Image 1',
        position: 1,
        orientation: 'square',
      },
    ];

    vi.spyOn(data, 'projects', 'get').mockReturnValue([
      { id: 1, active: true, title, images, languages: [] },
    ]);

    render(<Project />);

    expect(screen.queryByAltText('Image 1')).toHaveAttribute(
      'src',
      '/path/to/thumbnail.png'
    );
    expect(screen.queryByAltText('Image 1').closest('a')).toHaveAttribute(
      'href',
      '/path/to/animated.gif'
    );
  });
});

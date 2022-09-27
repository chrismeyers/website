import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import ProjectPage from '../../src/components/ProjectPage';
import styles from '../../src/styles/Project.module.css';
import * as Data from '../../src/assets/data';

vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: 1 }),
}));

describe('ProjectPage', () => {
  it('handles no projects', async () => {
    vi.spyOn(Data, 'getProjects').mockReturnValue([]);

    const { container } = render(<ProjectPage />);

    await waitFor(() => {
      expect(screen.getByText('Project Details')).toBeInTheDocument();
    });

    expect(container).not.toHaveClass(styles.wrapper);
  });

  it('handles no active projects', async () => {
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

    vi.spyOn(Data, 'getProjects').mockReturnValue([
      {
        id,
        active: false,
        title,
        webUrl,
        codeUrl,
        displayDate,
        lang,
        info,
        role,
        stat,
        images,
      },
    ]);

    const { container } = render(<ProjectPage />);

    await waitFor(() => {
      expect(screen.getByText('Project Details')).toBeInTheDocument();
    });

    expect(container).not.toHaveClass(styles.wrapper);
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

    vi.spyOn(Data, 'getProjects').mockReturnValue([
      {
        id,
        active: true,
        title,
        webUrl,
        codeUrl,
        displayDate,
        lang,
        info,
        role,
        stat,
        images,
      },
    ]);

    render(<ProjectPage />);

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

    vi.spyOn(Data, 'getProjects').mockReturnValue([
      {
        id,
        active: true,
        title,
        webUrl,
        codeUrl,
        displayDate,
        lang,
        info,
        role,
        stat,
        images,
      },
    ]);

    render(<ProjectPage />);

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

    vi.spyOn(Data, 'getProjects').mockReturnValue([
      {
        id: 1,
        active: true,
        webUrl,
        codeUrl,
      },
    ]);

    render(<ProjectPage />);

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

    vi.spyOn(Data, 'getProjects').mockReturnValue([
      { id: 1, active: true, title, images },
    ]);

    render(<ProjectPage />);

    expect(await screen.findByAltText('Image 1')).toHaveAttribute(
      'src',
      '/path/to/thumbnail.png',
    );
    expect(
      (await screen.findByAltText('Image 1')).closest('a'),
    ).toHaveAttribute('href', '/path/to/animated.gif');
  });
});

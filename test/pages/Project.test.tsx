import { render, screen, waitFor } from '@testing-library/react';
import type { MockInstance } from 'vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Project } from '../../src/assets/data.ts';
import * as lightbox from '../../src/components/LightBox.tsx';
import ProjectDetail from '../../src/components/content/ProjectDetail.tsx';

describe('Project page', () => {
  let lgSpy: MockInstance;

  beforeEach(() => {
    vi.resetAllMocks();
    lgSpy = vi.spyOn(lightbox, 'default').mockImplementation(() => <></>);
  });

  it('displays project details without images correctly', async () => {
    const project: Project = {
      id: 1,
      title: 'Project Name',
      webUrl: 'https://hosted.site',
      codeUrl: 'https://hosted.code',
      displayDate: 'Test Project, Always and Forever',
      startedDate: '',
      languages: ['Language 1'],
      info: 'Something involving code',
      role: 'Solo project',
      status: 'Being maintained',
      images: [],
    };

    render(<ProjectDetail data={project} />);

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
    expect(lgSpy).toHaveBeenCalledTimes(0);
  });

  it('displays project details with images correctly', async () => {
    const project: Project = {
      id: 1,
      title: 'Project Name',
      webUrl: 'https://hosted.site',
      codeUrl: 'https://hosted.code',
      displayDate: 'Test Project, Always and Forever',
      startedDate: '',
      languages: ['Language 1'],
      info: 'Something involving code',
      role: 'Solo project',
      status: 'Being maintained',
      images: [
        {
          id: 1,
          path: '/path/to/1.png',
          thumbnail: null,
          title: 'Image 1',
          orientation: 'square',
        },
        {
          id: 2,
          path: '/path/to/2.png',
          thumbnail: null,
          title: 'Image 2',
          orientation: 'landscape',
        },
      ],
    };

    render(<ProjectDetail data={project} />);

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
    expect(lgSpy).toHaveBeenCalledTimes(1);
  });

  it('displays project details without a web URL correctly', async () => {
    const project = {
      id: 1,
      webUrl: null,
      codeUrl: 'https://hosted.code',
      languages: [''],
    } as Project;

    render(<ProjectDetail data={project} />);

    await waitFor(() => {
      expect(screen.getByText('Code')).toHaveAttribute(
        'href',
        'https://hosted.code'
      );
    });

    expect(screen.queryByAltText('Website')).toBeNull();
    expect(lgSpy).toHaveBeenCalledTimes(0);
  });

  it('displays gif thumbnail correctly', () => {
    const project = {
      id: 1,
      title: 'Project Name',
      images: [
        {
          id: 1,
          path: '/path/to/animated.gif',
          thumbnail: '/path/to/thumbnail.png',
          title: 'Image 1',
          orientation: 'square',
        },
      ],
      languages: [''],
    } as Project;

    render(<ProjectDetail data={project} />);

    expect(lgSpy).toHaveBeenCalledTimes(1);
  });
});

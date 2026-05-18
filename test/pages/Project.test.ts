import { describe, expect, it } from 'vitest';
import type { Project } from '../../src/assets/data.ts';
import ProjectDetail from '../../src/components/content/ProjectDetail.astro';
import { renderAstro } from '../_astro-container.ts';

describe('Project page', () => {
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

    const page = await renderAstro(ProjectDetail, { props: { data: project } });

    expect(page.getByText('Project Name')).toBeInTheDocument();
    expect(
      page.getByText('Test Project, Always and Forever')
    ).toBeInTheDocument();
    expect(page.getByText('Something involving code')).toBeInTheDocument();
    expect(page.getByText('Solo project')).toBeInTheDocument();
    expect(page.getByText('Being maintained')).toBeInTheDocument();
    expect(page.getByText('Website')).toHaveAttribute(
      'href',
      'https://hosted.site'
    );
    expect(page.getByText('Code')).toHaveAttribute(
      'href',
      'https://hosted.code'
    );
    expect(page.html).not.toContain('data-lightgallery');
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

    const page = await renderAstro(ProjectDetail, { props: { data: project } });

    expect(page.getByText('Project Name')).toBeInTheDocument();
    expect(
      page.getByText('Test Project, Always and Forever')
    ).toBeInTheDocument();
    expect(page.getByText('Something involving code')).toBeInTheDocument();
    expect(page.getByText('Solo project')).toBeInTheDocument();
    expect(page.getByText('Being maintained')).toBeInTheDocument();
    expect(page.getByText('Website')).toHaveAttribute(
      'href',
      'https://hosted.site'
    );
    expect(page.getByText('Code')).toHaveAttribute(
      'href',
      'https://hosted.code'
    );
    expect(page.html).toContain('data-lightgallery');
  });

  it('displays project details without a web URL correctly', async () => {
    const project = {
      id: 1,
      webUrl: null,
      codeUrl: 'https://hosted.code',
      languages: [''],
    } as Project;

    const page = await renderAstro(ProjectDetail, { props: { data: project } });

    expect(page.getByText('Code')).toHaveAttribute(
      'href',
      'https://hosted.code'
    );
    expect(page.queryByAltText('Website')).toBeNull();
    expect(page.html).not.toContain('data-lightgallery');
  });

  it('displays gif thumbnail correctly', async () => {
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

    const page = await renderAstro(ProjectDetail, { props: { data: project } });

    expect(page.html).toContain('data-lightgallery');
    expect(page.html).toContain('data-lg-gif-restart="true"');
  });
});

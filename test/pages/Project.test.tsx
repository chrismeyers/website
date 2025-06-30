import type { ReactNode } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Route, Router } from 'wouter';
import { memoryLocation } from 'wouter/memory-location';
import type { MockInstance } from 'vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as data from '../../src/assets/data.ts';
import * as lightbox from '../../src/components/LightBox.tsx';
import Project from '../../src/pages/Project.tsx';

const createMockRouter = (
  component: ReactNode,
  path: string = '/projects/1'
) => {
  const { hook } = memoryLocation({ path, static: true });
  return (
    <Router hook={hook}>
      <Route path="/projects/:id">{component}</Route>
    </Router>
  );
};

describe('Project page', () => {
  let lgSpy: MockInstance;

  beforeEach(() => {
    vi.resetAllMocks();
    lgSpy = vi.spyOn(lightbox, 'default').mockImplementation(() => <></>);
  });

  it('handles no projects', async () => {
    vi.spyOn(data, 'projects', 'get').mockReturnValue(new Map());

    render(createMockRouter(<Project />));

    await waitFor(() => {
      expect(screen.getByText(/does not exist/)).toBeInTheDocument();
    });

    expect(screen.getByText('/projects/1')).toBeInTheDocument();
    expect(lgSpy).toHaveBeenCalledTimes(0);
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

    vi.spyOn(data, 'projects', 'get').mockReturnValue(
      new Map([
        [
          id,
          {
            id,
            title,
            webUrl,
            codeUrl,
            displayDate,
            startedDate: '',
            languages,
            info,
            role,
            status,
            images: [],
          },
        ],
      ])
    );

    render(createMockRouter(<Project />));

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
        orientation: 'square' as const,
      },
      {
        id: 2,
        path: '/path/to/2.png',
        thumbnail: null,
        title: 'Image 2',
        orientation: 'landscape' as const,
      },
    ];

    vi.spyOn(data, 'projects', 'get').mockReturnValue(
      new Map([
        [
          id,
          {
            id,
            title,
            webUrl,
            codeUrl,
            displayDate,
            startedDate: '',
            languages,
            info,
            role,
            status,
            images,
          },
        ],
      ])
    );

    render(createMockRouter(<Project />));

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
    const webUrl = null;
    const codeUrl = 'https://hosted.code';

    vi.spyOn(data, 'projects', 'get').mockReturnValue(
      new Map([
        [
          1,
          {
            id: 1,
            webUrl,
            codeUrl,
            languages: [''],
          } as data.Project,
        ],
      ])
    );

    render(createMockRouter(<Project />));

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
    const title = 'Project Name';
    const images = [
      {
        id: 1,
        path: '/path/to/animated.gif',
        thumbnail: '/path/to/thumbnail.png',
        title: 'Image 1',
        orientation: 'square',
      },
    ];

    vi.spyOn(data, 'projects', 'get').mockReturnValue(
      new Map([
        [
          1,
          {
            id: 1,
            title,
            images,
            languages: [''],
          } as data.Project,
        ],
      ])
    );

    render(createMockRouter(<Project />));

    expect(lgSpy).toHaveBeenCalledTimes(1);
  });
});

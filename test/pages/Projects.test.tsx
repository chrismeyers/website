import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import * as data from '../../src/assets/data.ts';
import Projects from '../../src/pages/Projects.tsx';

describe('Projects page', () => {
  it('displays project summary correctly', async () => {
    const id = 1;
    const title = 'Project Name';
    const displayDate = 'Test Project, Always and Forever';
    const info = 'Something involving code';

    vi.spyOn(data, 'projects', 'get').mockReturnValue(
      new Map([[1, { id, title, displayDate, info } as data.Project]])
    );

    render(
      <RouterProvider
        router={createMemoryRouter([{ path: '', element: <Projects /> }])}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Project Name')).toBeInTheDocument();
    });

    expect(screen.getByText('Project Name')).toHaveAttribute(
      'href',
      `/projects/${id}`
    );
    expect(screen.getByText(displayDate)).toBeInTheDocument();
    expect(screen.getByText(info)).toBeInTheDocument();
    expect(screen.getByText(/Project Details/)).toHaveAttribute(
      'href',
      `/projects/${id}`
    );
  });

  it('displays multiple projects', () => {
    vi.spyOn(data, 'projects', 'get').mockReturnValue(
      new Map([
        [1, { id: 1, title: 'Apples' } as data.Project],
        [2, { id: 2, title: 'Bananas' } as data.Project],
      ])
    );

    render(
      <RouterProvider
        router={createMemoryRouter([{ path: '', element: <Projects /> }])}
      />
    );

    expect(screen.getByText(/Apples/)).toBeInTheDocument();
    expect(screen.getByText(/Bananas/)).toBeInTheDocument();
  });
});

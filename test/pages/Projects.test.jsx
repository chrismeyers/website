import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import Projects from '../../src/pages/Projects';
import * as data from '../../src/assets/data';

describe('Projects page', () => {
  it('displays project summary correctly', async () => {
    const id = 1;
    const title = 'Project Name';
    const displayDate = 'Test Project, Always and Forever';
    const info = 'Something involving code';

    vi.spyOn(data, 'projects', 'get').mockReturnValue([
      {
        id,
        active: true,
        title,
        displayDate,
        info,
      },
    ]);

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

  it('displays multiple projects', async () => {
    vi.spyOn(data, 'projects', 'get').mockReturnValue([
      { id: 1, active: true, title: 'Apples' },
      { id: 2, active: true, title: 'Bananas' },
    ]);

    render(
      <RouterProvider
        router={createMemoryRouter([{ path: '', element: <Projects /> }])}
      />
    );

    expect(screen.getByText(/Apples/)).toBeInTheDocument();
    expect(screen.getByText(/Bananas/)).toBeInTheDocument();
  });
});

import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import ProjectsPage from '../../src/components/ProjectsPage';
import * as data from '../../src/assets/data';

describe('ProjectsPage', () => {
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

    render(<ProjectsPage />, { wrapper: MemoryRouter });

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
});

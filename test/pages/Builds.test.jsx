import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import Builds from '../../src/pages/Builds';
import * as data from '../../src/assets/data';

describe('Builds page', () => {
  it('displays build summary correctly', async () => {
    const id = 1;
    const displayDate = 'Today - Built for Someone';
    const cpu = 'Intel 1000000K @ 99.9GHz';

    vi.spyOn(data, 'builds', 'get').mockReturnValue([
      { id, active: true, displayDate, cpu },
    ]);

    render(
      <RouterProvider
        router={createMemoryRouter([{ path: '', element: <Builds /> }])}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(displayDate)).toBeInTheDocument();
    });

    expect(screen.getByText(displayDate)).toHaveAttribute(
      'href',
      `/builds/${id}`
    );
    expect(
      screen.getByText((content, node) => {
        const hasText = (n) => n.textContent.match(/An Intel 1000000K/);
        const nodeHasText = hasText(node);
        const childrenDontHaveText = Array.from(node.children).every(
          (child) => !hasText(child)
        );

        return nodeHasText && childrenDontHaveText;
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/Build Details/)).toHaveAttribute(
      'href',
      `/builds/${id}`
    );
  });

  it('displays multiple builds', async () => {
    vi.spyOn(data, 'builds', 'get').mockReturnValue([
      { id: 1, active: true, displayDate: 'Yesterday', cpu: 'ABC @ 123GHz' },
      { id: 2, active: true, displayDate: 'Today', cpu: 'ZYX @ 987GHz' },
    ]);

    render(
      <RouterProvider
        router={createMemoryRouter([{ path: '', element: <Builds /> }])}
      />
    );

    expect(screen.getByText(/Yesterday/)).toBeInTheDocument();
    expect(screen.getByText(/Today/)).toBeInTheDocument();
  });
});

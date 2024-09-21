import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import * as data from '../../src/assets/data.ts';
import Builds from '../../src/pages/Builds.tsx';

describe('Builds page', () => {
  it('displays build summary correctly', async () => {
    const id = 1;
    const displayDate = 'Today - Built for Someone';
    const cpu = 'Intel 1000000K @ 99.9GHz';

    vi.spyOn(data, 'builds', 'get').mockReturnValue(
      new Map([[id, { id, displayDate, cpu } as data.Build]])
    );

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
      screen.getByText((_content, node) => {
        const hasText = (n: Element | null) =>
          n?.textContent?.match(/An Intel 1000000K/) ?? false;
        const nodeHasText = hasText(node);
        const childrenDontHaveText = Array.from(node?.children ?? []).every(
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

  it('displays multiple builds', () => {
    vi.spyOn(data, 'builds', 'get').mockReturnValue(
      new Map([
        [
          1,
          {
            id: 1,
            displayDate: 'Then',
            cpu: 'ABC @ 123GHz',
          } as data.Build,
        ],
        [
          2,
          {
            id: 2,
            displayDate: 'Now',
            cpu: 'ZYX @ 987GHz',
          } as data.Build,
        ],
      ])
    );

    render(
      <RouterProvider
        router={createMemoryRouter([{ path: '', element: <Builds /> }])}
      />
    );

    expect(screen.getByText(/Then/)).toBeInTheDocument();
    expect(screen.getByText(/Now/)).toBeInTheDocument();
  });
});

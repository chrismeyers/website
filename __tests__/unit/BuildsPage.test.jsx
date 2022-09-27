import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import BuildsPage from '../../src/components/BuildsPage';
import * as Data from '../../src/utils/data';

describe('BuildsPage', () => {
  it('displays build summary correctly', async () => {
    const id = 1;
    const displayDate = 'Today - Built for Someone';
    const cpu = 'Intel 1000000K @ 99.9GHz';

    vi.spyOn(Data, 'getBuilds').mockReturnValue([
      { id, active: true, displayDate, cpu },
    ]);

    render(<BuildsPage />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(screen.getByText(displayDate)).toBeInTheDocument();
    });

    expect(screen.getByText(displayDate)).toHaveAttribute(
      'href',
      `/builds/${id}`,
    );
    expect(
      screen.getByText((content, node) => {
        const hasText = (n) => n.textContent.match(/An Intel 1000000K/);
        const nodeHasText = hasText(node);
        const childrenDontHaveText = Array.from(node.children).every(
          (child) => !hasText(child),
        );

        return nodeHasText && childrenDontHaveText;
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Build Details/)).toHaveAttribute(
      'href',
      `/builds/${id}`,
    );
  });
});

import { describe, expect, it, vi } from 'vitest';
import * as data from '../../src/assets/data.ts';
import BuildsContent from '../../src/components/content/BuildsContent.astro';
import { renderAstro } from '../_astro-container.ts';

describe('Builds page', () => {
  it('displays build summary correctly', async () => {
    const id = 1;
    const displayDate = 'Today - Built for Someone';
    const cpu = 'Intel 1000000K @ 99.9GHz';

    vi.spyOn(data, 'builds', 'get').mockReturnValue(
      new Map([[id, { id, displayDate, cpu } as data.Build]])
    );

    const page = await renderAstro(BuildsContent);

    expect(page.getByText(displayDate)).toBeInTheDocument();
    expect(page.getByText(displayDate)).toHaveAttribute(
      'href',
      `/builds/${id}`
    );
    expect(
      page.getByText((_content, node) => {
        const hasText = (n: Element | null) =>
          n?.textContent?.match(/An Intel 1000000K/) ?? false;
        const nodeHasText = hasText(node);
        const childrenDontHaveText = Array.from(node?.children ?? []).every(
          (child) => !hasText(child)
        );

        return Boolean(nodeHasText && childrenDontHaveText);
      })
    ).toBeInTheDocument();
    expect(page.getByText(/Build Details/)).toHaveAttribute(
      'href',
      `/builds/${id}`
    );
  });

  it('displays multiple builds', async () => {
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

    const page = await renderAstro(BuildsContent);

    expect(page.getByText(/Then/)).toBeInTheDocument();
    expect(page.getByText(/Now/)).toBeInTheDocument();
  });
});

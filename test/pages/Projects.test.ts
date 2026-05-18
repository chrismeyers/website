import { describe, expect, it, vi } from 'vitest';
import * as data from '../../src/assets/data.ts';
import ProjectsContent from '../../src/components/content/ProjectsContent.astro';
import { renderAstro } from '../_astro-container.ts';

describe('Projects page', () => {
  it('displays project summary correctly', async () => {
    const id = 1;
    const title = 'Project Name';
    const displayDate = 'Test Project, Always and Forever';
    const info = 'Something involving code';

    vi.spyOn(data, 'projects', 'get').mockReturnValue(
      new Map([[1, { id, title, displayDate, info } as data.Project]])
    );

    const page = await renderAstro(ProjectsContent);

    expect(page.getByText('Project Name')).toBeInTheDocument();
    expect(page.getByText('Project Name')).toHaveAttribute(
      'href',
      `/projects/${id}`
    );
    expect(page.getByText(displayDate)).toBeInTheDocument();
    expect(page.getByText(info)).toBeInTheDocument();
    expect(page.getByText(/Project Details/)).toHaveAttribute(
      'href',
      `/projects/${id}`
    );
  });

  it('displays multiple projects', async () => {
    vi.spyOn(data, 'projects', 'get').mockReturnValue(
      new Map([
        [1, { id: 1, title: 'Apples' } as data.Project],
        [2, { id: 2, title: 'Bananas' } as data.Project],
      ])
    );

    const page = await renderAstro(ProjectsContent);

    expect(page.getByText(/Apples/)).toBeInTheDocument();
    expect(page.getByText(/Bananas/)).toBeInTheDocument();
  });
});

import { describe, expect, it } from 'vitest';
import type { Build, Project } from '../src/assets/data.ts';
import {
  absoluteUrl,
  buildDescription,
  buildOgImage,
  canonicalPath,
  pageImageUrl,
  projectDescription,
  projectOgImage,
  stripHtml,
  truncate,
} from '../src/lib/seo.ts';

const sampleProject: Project = {
  id: 1,
  title: 'Sample Project',
  webUrl: null,
  codeUrl: 'https://github.com/example/repo',
  displayDate: 'Fall 2020',
  startedDate: '2020-09-01T00:00:00.000Z',
  languages: ['TypeScript', 'React'],
  info: `
    A <strong>cool</strong> project.
    <br><br>
    Built with <a href="https://example.com">modern tools</a>.
  `,
  summary: 'A <strong>cool</strong> project built with modern tools.',
  role: 'Developer',
  status: 'Complete',
  images: [
    {
      id: 1,
      path: 'https://r2.chrismeyers.net/projects/example.png',
      thumbnail: null,
      title: 'Screenshot',
      orientation: 'landscape',
    },
  ],
};

const sampleBuild: Build = {
  id: 1,
  displayDate: 'November 2021 - Built for myself',
  startedDate: '2021-11-26T00:00:00.000Z',
  cpu: 'AMD Ryzen 9 5900X',
  cool: 'Corsair H150i',
  mobo: 'Asus ROG Strix X570-E',
  ram: '32GB Corsair Vengeance',
  hdd: null,
  ssd: ['Samsung 980 PRO 1TB'],
  gpu: 'Asus RTX 2080 Ti',
  case: 'Corsair 5000D',
  psu: 'Corsair RM850x',
  image: {
    id: 29,
    path: 'https://r2.chrismeyers.net/builds/example.jpg',
    thumbnail: null,
    title: 'Build photo',
    orientation: 'landscape',
  },
};

describe('stripHtml', () => {
  it('removes tags and collapses whitespace', () => {
    expect(stripHtml(sampleProject.info)).toBe(
      'A cool project. Built with modern tools .'
    );
  });
});

describe('truncate', () => {
  it('returns short text unchanged', () => {
    expect(truncate('hello')).toBe('hello');
  });

  it('truncates long text with an ellipsis', () => {
    const longText = 'word '.repeat(50);
    const result = truncate(longText, 40);

    expect(result.length).toBeLessThanOrEqual(40);
    expect(result.endsWith('…')).toBe(true);
  });
});

describe('projectDescription', () => {
  it('includes title, languages, date, and project summary', () => {
    const description = projectDescription(sampleProject);

    expect(description).toContain('Sample Project');
    expect(description).toContain('TypeScript, React');
    expect(description).toContain('Fall 2020');
    expect(description).toContain('A cool project built with modern tools.');
    expect(description).not.toContain('<strong>');
  });
});

describe('buildDescription', () => {
  it('summarizes key build components', () => {
    const description = buildDescription(sampleBuild);

    expect(description).toContain('November 2021');
    expect(description).toContain('AMD Ryzen 9 5900X');
    expect(description).toContain('Asus RTX 2080 Ti');
  });
});

describe('absoluteUrl', () => {
  it('builds absolute URLs from paths', () => {
    expect(absoluteUrl('/projects')).toBe('https://chrismeyers.net/projects');
  });
});

describe('canonicalPath', () => {
  it('normalizes index and file-format paths', () => {
    expect(canonicalPath('/index.html')).toBe('/');
    expect(canonicalPath('/projects/1.html')).toBe('/projects/1');
    expect(canonicalPath('/resume')).toBe('/resume');
  });
});

describe('pageImageUrl', () => {
  it('returns the default image when none is provided', () => {
    expect(pageImageUrl(undefined)).toBe(
      'https://chrismeyers.net/og-image-default.png'
    );
  });

  it('passes through absolute image URLs', () => {
    expect(pageImageUrl('https://r2.chrismeyers.net/example.jpg')).toBe(
      'https://r2.chrismeyers.net/example.jpg'
    );
  });

  it('resolves relative image paths', () => {
    expect(pageImageUrl('/custom.jpg')).toBe(
      'https://chrismeyers.net/custom.jpg'
    );
  });
});

describe('projectOgImage', () => {
  it('uses the first available project image', () => {
    expect(projectOgImage(sampleProject)).toBe(
      'https://r2.chrismeyers.net/projects/example.png'
    );
  });
});

describe('buildOgImage', () => {
  it('uses the build image when present', () => {
    expect(buildOgImage(sampleBuild)).toBe(
      'https://r2.chrismeyers.net/builds/example.jpg'
    );
  });
});

import { describe, expect, it } from 'vitest';
import type { Build } from '../../src/assets/data.ts';
import BuildDetail from '../../src/components/content/BuildDetail.astro';
import { renderAstro } from '../_astro-container.ts';

describe('Build page', () => {
  it('displays build details without optional fields correctly', async () => {
    const build: Build = {
      id: 1,
      displayDate: 'Today - Built for Someone',
      startedDate: '',
      cpu: 'Intel 1000000K CPU @ 99.9GHz',
      cool: null,
      mobo: 'Motherboard with a lot of LEDs',
      ram: '999GB Fast Memory 9999MHz',
      hdd: null,
      ssd: null,
      gpu: 'The best GPU 99GB',
      case: 'Shiny Case',
      psu: 'Powerful PSU',
    };

    const page = await renderAstro(BuildDetail, { props: { data: build } });

    expect(page.getByText(build.displayDate)).toBeInTheDocument();
    expect(page.getByText(build.cpu)).toBeInTheDocument();
    expect(page.queryByText('Cooling')).toBeNull();
    expect(page.getByText(build.mobo)).toBeInTheDocument();
    expect(page.getByText(build.ram)).toBeInTheDocument();
    expect(page.queryByText('HDD')).toBeNull();
    expect(page.queryByText('SSD')).toBeNull();
    expect(page.getByText(build.gpu)).toBeInTheDocument();
    expect(page.html).not.toContain('data-lightgallery');
    expect(page.getByText(build.case)).toBeInTheDocument();
    expect(page.getByText(build.psu)).toBeInTheDocument();
  });

  it('displays build details without image correctly', async () => {
    const build: Build = {
      id: 1,
      displayDate: 'Today - Built for Someone',
      startedDate: '',
      cpu: 'Intel 1000000K CPU @ 99.9GHz',
      cool: 'Cold Cooling',
      mobo: 'Motherboard with a lot of LEDs',
      ram: '999GB Fast Memory 9999MHz',
      hdd: ['Fast HDD 9999GB @ 9999rpm'],
      ssd: ['Faster SSD 9999GB'],
      gpu: 'The best GPU 99GB',
      case: 'Shiny Case',
      psu: 'Powerful PSU',
    };

    const page = await renderAstro(BuildDetail, { props: { data: build } });

    expect(page.getByText(build.displayDate)).toBeInTheDocument();
    expect(page.getByText(build.cpu)).toBeInTheDocument();
    expect(page.getByText(build.cool!)).toBeInTheDocument();
    expect(page.getByText(build.mobo)).toBeInTheDocument();
    expect(page.getByText(build.ram)).toBeInTheDocument();
    expect(page.getByText(build.hdd![0])).toBeInTheDocument();
    expect(page.getByText(build.ssd![0])).toBeInTheDocument();
    expect(page.getByText(build.gpu)).toBeInTheDocument();
    expect(page.html).not.toContain('data-lightgallery');
    expect(page.getByText(build.case)).toBeInTheDocument();
    expect(page.getByText(build.psu)).toBeInTheDocument();
  });

  it('displays build details with multiple hard drives correctly', async () => {
    const build: Build = {
      id: 1,
      displayDate: 'Today - Built for Someone',
      startedDate: '',
      cpu: 'Intel 1000000K CPU @ 99.9GHz',
      cool: 'Cold Cooling',
      mobo: 'Motherboard with a lot of LEDs',
      ram: '999GB Fast Memory 9999MHz',
      hdd: ['Fast HDD 9999GB @ 9999rpm', 'Slow HDD 99GB @ 99rpm'],
      ssd: ['Faster SSD 9999GB'],
      gpu: 'The best GPU 99GB',
      case: 'Shiny Case',
      psu: 'Powerful PSU',
    };

    const page = await renderAstro(BuildDetail, { props: { data: build } });

    expect(page.getByText(build.displayDate)).toBeInTheDocument();
    expect(page.getByText(build.hdd![0])).toBeInTheDocument();
    expect(page.getByText(build.hdd![1])).toBeInTheDocument();
    expect(page.html).not.toContain('data-lightgallery');
  });

  it('displays build details with image correctly', async () => {
    const build: Build = {
      id: 1,
      displayDate: 'Today - Built for Someone',
      startedDate: '',
      cpu: 'Intel 1000000K CPU @ 99.9GHz',
      cool: 'Cold Cooling',
      mobo: 'Motherboard with a lot of LEDs',
      ram: '999GB Fast Memory 9999MHz',
      hdd: ['Fast HDD 9999GB @ 9999rpm'],
      ssd: ['Faster SSD 9999GB'],
      gpu: 'The best GPU 99GB',
      image: {
        id: 1,
        path: '/path/to/1.png',
        thumbnail: null,
        title: 'Image 1',
        orientation: 'landscape',
      },
      case: 'Shiny Case',
      psu: 'Powerful PSU',
    };

    const page = await renderAstro(BuildDetail, { props: { data: build } });

    expect(page.getByText(build.displayDate)).toBeInTheDocument();
    expect(page.html).toContain('data-lightgallery');
  });
});

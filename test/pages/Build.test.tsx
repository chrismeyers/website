import { render, screen, waitFor } from '@testing-library/react';
import type { MockInstance } from 'vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Build } from '../../src/assets/data.ts';
import * as lightbox from '../../src/components/LightBox.tsx';
import BuildDetail from '../../src/components/content/BuildDetail.tsx';

describe('Build page', () => {
  let lgSpy: MockInstance;

  beforeEach(() => {
    vi.resetAllMocks();
    lgSpy = vi.spyOn(lightbox, 'default').mockImplementation(() => <></>);
  });

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

    render(<BuildDetail data={build} />);

    await waitFor(() => {
      expect(screen.getByText(build.displayDate)).toBeInTheDocument();
    });

    expect(screen.getByText(build.cpu)).toBeInTheDocument();
    expect(screen.queryByText('Cooling')).toBeNull();
    expect(screen.getByText(build.mobo)).toBeInTheDocument();
    expect(screen.getByText(build.ram)).toBeInTheDocument();
    expect(screen.queryByText('HDD')).toBeNull();
    expect(screen.queryByText('SSD')).toBeNull();
    expect(screen.getByText(build.gpu)).toBeInTheDocument();
    expect(lgSpy).toHaveBeenCalledTimes(0);
    expect(screen.getByText(build.case)).toBeInTheDocument();
    expect(screen.getByText(build.psu)).toBeInTheDocument();
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

    render(<BuildDetail data={build} />);

    await waitFor(() => {
      expect(screen.getByText(build.displayDate)).toBeInTheDocument();
    });

    expect(screen.getByText(build.cpu)).toBeInTheDocument();
    expect(screen.getByText(build.cool!)).toBeInTheDocument();
    expect(screen.getByText(build.mobo)).toBeInTheDocument();
    expect(screen.getByText(build.ram)).toBeInTheDocument();
    expect(screen.getByText(build.hdd![0])).toBeInTheDocument();
    expect(screen.getByText(build.ssd![0])).toBeInTheDocument();
    expect(screen.getByText(build.gpu)).toBeInTheDocument();
    expect(lgSpy).toHaveBeenCalledTimes(0);
    expect(screen.getByText(build.case)).toBeInTheDocument();
    expect(screen.getByText(build.psu)).toBeInTheDocument();
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

    render(<BuildDetail data={build} />);

    await waitFor(() => {
      expect(screen.getByText(build.displayDate)).toBeInTheDocument();
    });

    expect(screen.getByText(build.hdd![0])).toBeInTheDocument();
    expect(screen.getByText(build.hdd![1])).toBeInTheDocument();
    expect(lgSpy).toHaveBeenCalledTimes(0);
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

    render(<BuildDetail data={build} />);

    await waitFor(() => {
      expect(screen.getByText(build.displayDate)).toBeInTheDocument();
    });

    expect(lgSpy).toHaveBeenCalledTimes(1);
  });
});

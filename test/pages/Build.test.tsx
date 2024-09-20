import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import * as data from '../../src/assets/generated/data.ts';
import * as lightbox from '../../src/components/Lightbox.tsx';
import Build from '../../src/pages/Build.tsx';

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useParams: () => ({ id: 1 }),
  useLocation: () => ({ pathname: '/builds/1' }),
}));

describe('Build page', () => {
  let lgSpy: MockInstance;

  beforeEach(() => {
    lgSpy = vi
      .spyOn(lightbox, 'createLightGallery')
      .mockImplementation(() => <></>);
  });

  it('handles no builds', async () => {
    vi.spyOn(data, 'builds', 'get').mockReturnValue(new Map());

    render(
      <RouterProvider
        router={createMemoryRouter([{ path: '', element: <Build /> }])}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/does not exist/)).toBeInTheDocument();
    });

    expect(screen.getByText('/builds/1')).toBeInTheDocument();
    expect(lgSpy).toHaveBeenCalledTimes(0);
  });

  it('displays build details without optional fields correctly', async () => {
    const id = 1;
    const displayDate = 'Today - Built for Someone';
    const cpu = 'Intel 1000000K CPU @ 99.9GHz';
    const cool = null;
    const mobo = 'Motherboard with a lot of LEDs';
    const ram = '999GB Fast Memory 9999MHz';
    const hdd = null;
    const ssd = null;
    const gpu = 'The best GPU 99GB';
    const pcCase = 'Shiny Case';
    const psu = 'Powerful PSU';

    vi.spyOn(data, 'builds', 'get').mockReturnValue(
      new Map([
        [
          id,
          {
            id,
            active: true,
            displayDate,
            startedDate: '',
            cpu,
            cool,
            mobo,
            ram,
            hdd,
            ssd,
            gpu,
            case: pcCase,
            psu,
          },
        ],
      ])
    );

    render(<Build />);

    await waitFor(() => {
      expect(screen.getByText(displayDate)).toBeInTheDocument();
    });

    expect(screen.getByText(cpu)).toBeInTheDocument();
    expect(screen.queryByText('Cooling')).toBeNull();
    expect(screen.getByText(mobo)).toBeInTheDocument();
    expect(screen.getByText(ram)).toBeInTheDocument();
    expect(screen.queryByText('HDD')).toBeNull();
    expect(screen.queryByText('SSD')).toBeNull();
    expect(screen.getByText(gpu)).toBeInTheDocument();
    expect(lgSpy).toHaveBeenCalledTimes(0);
    expect(screen.getByText(pcCase)).toBeInTheDocument();
    expect(screen.getByText(psu)).toBeInTheDocument();
  });

  it('displays build details without image correctly', async () => {
    const id = 1;
    const displayDate = 'Today - Built for Someone';
    const cpu = 'Intel 1000000K CPU @ 99.9GHz';
    const cool = 'Cold Cooling';
    const mobo = 'Motherboard with a lot of LEDs';
    const ram = '999GB Fast Memory 9999MHz';
    const hdd = ['Fast HDD 9999GB @ 9999rpm'];
    const ssd = ['Faster SSD 9999GB'];
    const gpu = 'The best GPU 99GB';
    const pcCase = 'Shiny Case';
    const psu = 'Powerful PSU';

    vi.spyOn(data, 'builds', 'get').mockReturnValue(
      new Map([
        [
          id,
          {
            id,
            active: true,
            displayDate,
            startedDate: '',
            cpu,
            cool,
            mobo,
            ram,
            hdd,
            ssd,
            gpu,
            case: pcCase,
            psu,
          },
        ],
      ])
    );

    render(<Build />);

    await waitFor(() => {
      expect(screen.getByText(displayDate)).toBeInTheDocument();
    });

    expect(screen.getByText(cpu)).toBeInTheDocument();
    expect(screen.getByText(cool)).toBeInTheDocument();
    expect(screen.getByText(mobo)).toBeInTheDocument();
    expect(screen.getByText(ram)).toBeInTheDocument();
    expect(screen.getByText(hdd[0])).toBeInTheDocument();
    expect(screen.getByText(ssd[0])).toBeInTheDocument();
    expect(screen.getByText(gpu)).toBeInTheDocument();
    expect(lgSpy).toHaveBeenCalledTimes(0);
    expect(screen.getByText(pcCase)).toBeInTheDocument();
    expect(screen.getByText(psu)).toBeInTheDocument();
  });

  it('displays build details with multiple hard drives correctly', async () => {
    const id = 1;
    const displayDate = 'Today - Built for Someone';
    const cpu = 'Intel 1000000K CPU @ 99.9GHz';
    const cool = 'Cold Cooling';
    const mobo = 'Motherboard with a lot of LEDs';
    const ram = '999GB Fast Memory 9999MHz';
    const hdd = ['Fast HDD 9999GB @ 9999rpm', 'Slow HDD 99GB @ 99rpm'];
    const ssd = ['Faster SSD 9999GB'];
    const gpu = 'The best GPU 99GB';
    const pcCase = 'Shiny Case';
    const psu = 'Powerful PSU';

    vi.spyOn(data, 'builds', 'get').mockReturnValue(
      new Map([
        [
          id,
          {
            id,
            active: true,
            displayDate,
            startedDate: '',
            cpu,
            cool,
            mobo,
            ram,
            hdd,
            ssd,
            gpu,
            case: pcCase,
            psu,
          },
        ],
      ])
    );

    render(<Build />);

    await waitFor(() => {
      expect(screen.getByText(displayDate)).toBeInTheDocument();
    });

    expect(screen.getByText(cpu)).toBeInTheDocument();
    expect(screen.getByText(cool)).toBeInTheDocument();
    expect(screen.getByText(mobo)).toBeInTheDocument();
    expect(screen.getByText(ram)).toBeInTheDocument();
    expect(screen.getByText(hdd[0])).toBeInTheDocument();
    expect(screen.getByText(hdd[1])).toBeInTheDocument();
    expect(screen.getByText(ssd[0])).toBeInTheDocument();
    expect(screen.getByText(gpu)).toBeInTheDocument();
    expect(lgSpy).toHaveBeenCalledTimes(0);
    expect(screen.getByText(pcCase)).toBeInTheDocument();
    expect(screen.getByText(psu)).toBeInTheDocument();
  });

  it('displays build details with image correctly', async () => {
    const id = 1;
    const displayDate = 'Today - Built for Someone';
    const cpu = 'Intel 1000000K CPU @ 99.9GHz';
    const cool = 'Cold Cooling';
    const mobo = 'Motherboard with a lot of LEDs';
    const ram = '999GB Fast Memory 9999MHz';
    const hdd = ['Fast HDD 9999GB @ 9999rpm'];
    const ssd = ['Faster SSD 9999GB'];
    const gpu = 'The best GPU 99GB';
    const image = {
      id: 1,
      path: '/path/to/1.png',
      thumbnail: null,
      title: 'Image 1',
      orientation: 'landscape' as const,
    };
    const pcCase = 'Shiny Case';
    const psu = 'Powerful PSU';

    vi.spyOn(data, 'builds', 'get').mockReturnValue(
      new Map([
        [
          id,
          {
            id,
            active: true,
            displayDate,
            startedDate: '',
            cpu,
            cool,
            mobo,
            ram,
            hdd,
            ssd,
            gpu,
            image,
            case: pcCase,
            psu,
          },
        ],
      ])
    );

    render(<Build />);

    await waitFor(() => {
      expect(screen.getByText(displayDate)).toBeInTheDocument();
    });

    expect(screen.getByText(cpu)).toBeInTheDocument();
    expect(screen.getByText(cool)).toBeInTheDocument();
    expect(screen.getByText(mobo)).toBeInTheDocument();
    expect(screen.getByText(ram)).toBeInTheDocument();
    expect(screen.getByText(hdd[0])).toBeInTheDocument();
    expect(screen.getByText(ssd[0])).toBeInTheDocument();
    expect(screen.getByText(gpu)).toBeInTheDocument();
    expect(lgSpy).toHaveBeenCalledTimes(1);
    expect(screen.getByText(pcCase)).toBeInTheDocument();
    expect(screen.getByText(psu)).toBeInTheDocument();
  });
});

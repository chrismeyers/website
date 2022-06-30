import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import nock from 'nock';
import Axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import BuildPage from '../../components/BuildPage';

Axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: 1 }),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});

describe('BuildPage', () => {
  it('handles failure to load a build', async () => {
    nock(import.meta.env.VITE_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/builds/1')
      .once()
      .reply(404);

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <BuildPage />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Build Details')).toBeInTheDocument();
    });

    expect(container).not.toHaveClass('build-info');
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
    const image = null;
    const pcCase = 'Shiny Case';
    const psu = 'Powerful PSU';

    nock(import.meta.env.VITE_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/builds/1')
      .once()
      .reply(200, {
        id,
        displayDate,
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
      });

    render(
      <QueryClientProvider client={queryClient}>
        <BuildPage />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(displayDate)).toBeInTheDocument();
    });

    expect(screen.getByText(cpu)).toBeInTheDocument();
    await expect(screen.findByText(cool)).rejects.toThrow();
    expect(screen.getByText(mobo)).toBeInTheDocument();
    expect(screen.getByText(ram)).toBeInTheDocument();
    await expect(screen.findByText(hdd)).rejects.toThrow();
    await expect(screen.findByText(ssd)).rejects.toThrow();
    expect(screen.getByText(gpu)).toBeInTheDocument();
    await expect(screen.findByTitle('Click to enlarge')).rejects.toThrow();
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
    const hdd = 'Fast HDD 9999GB @ 9999rpm';
    const ssd = 'Faster SSD 9999GB';
    const gpu = 'The best GPU 99GB';
    const image = null;
    const pcCase = 'Shiny Case';
    const psu = 'Powerful PSU';

    nock(import.meta.env.VITE_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/builds/1')
      .once()
      .reply(200, {
        id,
        displayDate,
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
      });

    render(
      <QueryClientProvider client={queryClient}>
        <BuildPage />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(displayDate)).toBeInTheDocument();
    });

    expect(screen.getByText(cpu)).toBeInTheDocument();
    expect(screen.getByText(cool)).toBeInTheDocument();
    expect(screen.getByText(mobo)).toBeInTheDocument();
    expect(screen.getByText(ram)).toBeInTheDocument();
    expect(screen.getByText(hdd)).toBeInTheDocument();
    expect(screen.getByText(ssd)).toBeInTheDocument();
    expect(screen.getByText(gpu)).toBeInTheDocument();
    await expect(screen.findByTitle('Click to enlarge')).rejects.toThrow();
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
    const hdd = 'Fast HDD 9999GB @ 9999rpm, Slow HDD 99GB @ 99rpm';
    const ssd = 'Faster SSD 9999GB';
    const gpu = 'The best GPU 99GB';
    const image = null;
    const pcCase = 'Shiny Case';
    const psu = 'Powerful PSU';

    nock(import.meta.env.VITE_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/builds/1')
      .once()
      .reply(200, {
        id,
        displayDate,
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
      });

    render(
      <QueryClientProvider client={queryClient}>
        <BuildPage />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(displayDate)).toBeInTheDocument();
    });

    expect(screen.getByText(cpu)).toBeInTheDocument();
    expect(screen.getByText(cool)).toBeInTheDocument();
    expect(screen.getByText(mobo)).toBeInTheDocument();
    expect(screen.getByText(ram)).toBeInTheDocument();
    const hdds = hdd.split(',').map((hdd) => hdd.trim());
    expect(screen.getByText(hdds[0])).toBeInTheDocument();
    expect(screen.getByText(hdds[1])).toBeInTheDocument();
    expect(screen.getByText(ssd)).toBeInTheDocument();
    expect(screen.getByText(gpu)).toBeInTheDocument();
    await expect(screen.findByTitle('Click to enlarge')).rejects.toThrow();
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
    const hdd = 'Fast HDD 9999GB @ 9999rpm';
    const ssd = 'Faster SSD 9999GB';
    const gpu = 'The best GPU 99GB';
    const image = {
      id: 1,
      path: '/path/to/1.png',
      thumbnail: null,
      title: 'Image 1',
      pos: 1,
      orient: 'land',
    };
    const pcCase = 'Shiny Case';
    const psu = 'Powerful PSU';

    nock(import.meta.env.VITE_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/builds/1')
      .once()
      .reply(200, {
        id,
        displayDate,
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
      });

    render(
      <QueryClientProvider client={queryClient}>
        <BuildPage />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(displayDate)).toBeInTheDocument();
    });

    expect(screen.getByText(cpu)).toBeInTheDocument();
    expect(screen.getByText(cool)).toBeInTheDocument();
    expect(screen.getByText(mobo)).toBeInTheDocument();
    expect(screen.getByText(ram)).toBeInTheDocument();
    expect(screen.getByText(hdd)).toBeInTheDocument();
    expect(screen.getByText(ssd)).toBeInTheDocument();
    expect(screen.getByText(gpu)).toBeInTheDocument();
    expect(screen.getByTitle('Click to enlarge')).toHaveAttribute(
      'src',
      image.path,
    );
    expect(screen.getByTitle('Click to enlarge').closest('a')).toHaveAttribute(
      'href',
      image.path,
    );
    expect(screen.getByText(pcCase)).toBeInTheDocument();
    expect(screen.getByText(psu)).toBeInTheDocument();
  });
});
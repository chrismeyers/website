import { createRoot } from 'react-dom/client';
import Axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css';
import './assets/vendor/hamburgers/hamburgers.min.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import App from './App';

Axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'auto';
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1,
      retry: (count, error) => {
        if ([400, 404].includes(error.statusCode)) return false;
        return count < 3;
      },
    },
  },
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);

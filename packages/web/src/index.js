import { createRoot } from 'react-dom/client';
import Axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css';
import './assets/vendor/hamburgers/hamburgers.min.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'auto';
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

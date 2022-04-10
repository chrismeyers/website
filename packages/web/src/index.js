import 'delayed-scroll-restoration-polyfill';
import { createRoot } from 'react-dom/client';
import Axios from 'axios';
import SimpleReactLightbox from 'simple-react-lightbox';
import './index.css';
import './assets/vendor/hamburgers/hamburgers.min.css';
import 'react-loading-skeleton/dist/skeleton.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const app = (
  <SimpleReactLightbox>
    <App />
  </SimpleReactLightbox>
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(app);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

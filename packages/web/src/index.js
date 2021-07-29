import 'delayed-scroll-restoration-polyfill';
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { isIE } from 'react-device-detect';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { GITHUB_URL, LINKEDIN_URL, MAILTO_HREF } from './utils/constants';

Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

let element;
if (isIE) {
  element = (
    <div style={{ marginLeft: 20 }}>
      <h1>Welcome to my website!</h1>
      <p>
        Hey, my name is Chris Meyers and I am a software engineer and technology
        enthusiast. Due to the limitations of Internet Explorer, this website is
        unable to fully load. For a better browsing experience, please visit
        this website on a different web browser, if possible. Some good web
        browser alternatives are:
      </p>
      <ul>
        <li>
          <a href="https://www.google.com/chrome/">Google Chrome</a>
        </li>
        <li>
          <a href="https://www.mozilla.org/firefox/">Firefox</a>
        </li>
        <li>
          <a href="https://www.microsoft.com/edge/">Microsoft Edge</a>
        </li>
      </ul>
      <p>
        If using a different web browser is not possible, please use the
        following links for more information about me:
      </p>
      <ul>
        <li>
          <a href={GITHUB_URL}>GitHub</a>
        </li>
        <li>
          <a href={LINKEDIN_URL}>LinkedIn</a>
        </li>
      </ul>
      <p>
        If you have any questions, comments, or would like to work together on a
        project, please <a href={MAILTO_HREF}>send me a message</a>.
      </p>
    </div>
  );
} else {
  const App = lazy(() => import('./App'));
  const SimpleReactLightbox = lazy(() => import('simple-react-lightbox'));
  import('./assets/vendor/hamburgers/hamburgers.min.css');

  element = (
    <React.StrictMode>
      <Suspense fallback={<></>}>
        <SimpleReactLightbox>
          <App />
        </SimpleReactLightbox>
      </Suspense>
    </React.StrictMode>
  );
}

ReactDOM.render(element, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { setLogger } from 'react-query';

setLogger({
  log: console.log, // eslint-disable-line no-console
  warn: console.warn, // eslint-disable-line no-console
  error: () => {},
});
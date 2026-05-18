import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { within } from '@testing-library/dom';
import { JSDOM } from 'jsdom';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

let container: AstroContainer;

export const getAstroContainer = async () => {
  if (!container) {
    container = await AstroContainer.create();
  }

  return container;
};

export const renderAstro = async (
  component: AstroComponentFactory,
  options: {
    props?: Record<string, unknown>;
    slots?: Record<string, string>;
  } = {}
) => {
  const astroContainer = await getAstroContainer();
  const html = await astroContainer.renderToString(component, options);
  const dom = new JSDOM(`<!DOCTYPE html><html><body>${html}</body></html>`);

  return {
    html,
    dom,
    ...within(dom.window.document.body),
  };
};

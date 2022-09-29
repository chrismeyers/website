export const getCssVar = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export const setBodyScrollable = (enabled) =>
  enabled
    ? document.body.classList.remove('prevent-scroll')
    : document.body.classList.add('prevent-scroll');

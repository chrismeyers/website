export function getCssVar(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

export function setBodyScrollable(enabled) {
  return enabled
    ? document.body.classList.remove('prevent-scroll')
    : document.body.classList.add('prevent-scroll');
}

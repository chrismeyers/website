const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

export const buildIconSvg = (
  raw: string,
  {
    className,
    title,
    ariaLabel,
  }: {
    className?: string;
    title?: string;
    ariaLabel?: string;
  }
): string =>
  raw.replace(/<svg([^>]*)>/, (_match, attrs: string) => {
    let next = attrs;

    if (className) {
      const classMatch = /\bclass="([^"]*)"/.exec(next);
      if (classMatch) {
        next = next.replace(
          /\bclass="[^"]*"/,
          `class="${classMatch[1]} ${className}"`
        );
      } else {
        next = `${next} class="${className}"`;
      }
    }

    if (ariaLabel) {
      next = next.replace(/\saria-hidden="[^"]*"/, '');
      if (/\baria-label=/.test(next)) {
        next = next.replace(
          /\baria-label="[^"]*"/,
          `aria-label="${escapeAttr(ariaLabel)}"`
        );
      } else {
        next = `${next} role="img" aria-label="${escapeAttr(ariaLabel)}"`;
      }
    } else if (!/\baria-hidden=/.test(next)) {
      next = `${next} aria-hidden="true"`;
    }

    if (title && !/\btitle=/.test(next)) {
      next = `${next} title="${escapeAttr(title)}"`;
    }

    return `<svg${next}>`;
  });

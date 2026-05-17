import type { Build, Project } from '../assets/data.ts';
import { SITE_URL } from '../constants.ts';

const DESCRIPTION_MAX_LENGTH = 160;

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

export function truncate(text: string, max = DESCRIPTION_MAX_LENGTH): string {
  if (text.length <= max) {
    return text;
  }

  const trimmed = text.slice(0, max - 1).trimEnd();
  const lastSpace = trimmed.lastIndexOf(' ');
  const base = lastSpace > max * 0.6 ? trimmed.slice(0, lastSpace) : trimmed;

  return `${base}…`;
}

export function canonicalPath(pathname: string): string {
  let path = pathname;

  if (path.endsWith('/index.html')) {
    path = path.slice(0, -'/index.html'.length) || '/';
  } else if (path.endsWith('.html')) {
    path = path.slice(0, -'.html'.length);
  }

  if (path !== '/' && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  return path || '/';
}

export function absoluteUrl(path: string, site = SITE_URL): string {
  return new URL(path, site).href;
}

export function pageImageUrl(
  image: string | undefined,
  site = SITE_URL
): string {
  if (!image) {
    return absoluteUrl('/og-image-default.png', site);
  }

  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }

  return absoluteUrl(image, site);
}

export function projectDescription(project: Project): string {
  const languages = project.languages.join(', ');
  const summary = stripHtml(project.info);
  const prefix = `${project.title} — ${languages}, ${project.displayDate}.`;

  if (!summary) {
    return truncate(prefix);
  }

  return truncate(`${prefix} ${summary}`);
}

export function buildDescription(build: Build): string {
  const text = `${build.displayDate} PC build: ${build.cpu}, ${build.gpu}, ${build.ram}.`;
  return truncate(text);
}

export function projectOgImage(project: Project, site = SITE_URL): string {
  return pageImageUrl(project.images.find((image) => image?.path)?.path, site);
}

export function buildOgImage(build: Build, site = SITE_URL): string {
  return pageImageUrl(build.image?.path, site);
}

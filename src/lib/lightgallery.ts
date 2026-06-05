import 'lightgallery/css/lightgallery-bundle.min.css';
import '../styles/lightgallery.css';
import lightGallery from 'lightgallery';
import type { LightGallerySettings } from 'lightgallery/lg-settings';
import type { LightGallery as LG } from 'lightgallery/lightgallery';
import type { LgQuery } from 'lightgallery/lgQuery';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { LIGHTGALLERY_LICENSE } from '../constants.ts';

export type LightGalleryPlugin = 'thumbnail' | 'zoom';

const PLUGINS: Record<
  LightGalleryPlugin,
  new (instance: LG, $LG: LgQuery) => unknown
> = {
  thumbnail: lgThumbnail,
  zoom: lgZoom,
};

export interface LightGalleryOptions {
  plugins?: LightGalleryPlugin[];
  thumbnail?: boolean;
  selector?: string;
  enableDrag?: boolean;
  enableSwipe?: boolean;
  gifRestart?: boolean;
}

const restartGif = () => {
  setTimeout(() => {
    const gif = document.getElementsByClassName('lg-image')[0] as
      | HTMLImageElement
      | undefined;

    if (gif) {
      // TODO: Browsers like FireFox and Safari don't restart GIFs when setting
      // the src attribute. A workaround is to invalidate the cached image by
      // adding a unique query param (timestamp) to the image URL. This requires
      // the image to be downloaded each time it's opened, so if this ever gets
      // fixed in the aforementioned browsers then the following should be used:
      //
      // gif.setAttribute('src', gif.src);

      const url = new URL(gif.src);
      url.searchParams.set('ts', Date.now().toString());
      gif.src = url.toString();
    }
  }, 100);
};

export const initLightGallery = (
  element: HTMLElement,
  options: LightGalleryOptions = {}
): void => {
  const {
    plugins = [],
    thumbnail,
    selector,
    enableDrag,
    enableSwipe,
    gifRestart,
  } = options;

  if (gifRestart) {
    element.addEventListener('lgAfterOpen', restartGif);
  }

  const settings: LightGallerySettings = {
    licenseKey: LIGHTGALLERY_LICENSE,
    download: false,
    hideScrollbar: true,
    plugins: plugins.map((plugin) => PLUGINS[plugin]),
  };

  if (thumbnail !== undefined) {
    settings.thumbnail = thumbnail;
  }

  if (selector !== undefined) {
    settings.selector = selector;
  }

  if (enableDrag !== undefined) {
    settings.enableDrag = enableDrag;
  }

  if (enableSwipe !== undefined) {
    settings.enableSwipe = enableSwipe;
  }

  lightGallery(element, settings);
};

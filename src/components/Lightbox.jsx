import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import LightGallery from 'lightgallery/react';
import { LIGHTGALLERY_LICENSE } from '../constants';

const LIGHTGALLERY_PLUGINS = { lgThumbnail, lgZoom };

/**
 * @param {any[]} images
 * @param {import('lightgallery/react').LightGalleryProps} props
 * @param {('lgThumbnail' | 'lgZoom')[]} plugins
 * @returns LightGallery
 */
export const createLightGallery = (images, props = {}, plugins = []) => {
  const realPlugins = plugins.map((p) => LIGHTGALLERY_PLUGINS[p]);

  return (
    <LightGallery
      licenseKey={LIGHTGALLERY_LICENSE}
      download={false}
      plugins={realPlugins}
      {...props} // eslint-disable-line react/jsx-props-no-spreading
    >
      {images.length === 1 ? images[0] : images}
    </LightGallery>
  );
};

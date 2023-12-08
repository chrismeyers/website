import LightGallery from 'lightgallery/react';
import { LIGHTGALLERY_LICENSE } from '../constants';

/**
 * @param {any[]} images
 * @param {import('lightgallery/react').LightGalleryProps} props
 * @returns LightGallery
 */
export const createLightGallery = (images, props = {}) => (
  <LightGallery
    licenseKey={LIGHTGALLERY_LICENSE}
    download={false}
    {...props} // eslint-disable-line react/jsx-props-no-spreading
  >
    {images.length === 1 ? images[0] : images}
  </LightGallery>
);

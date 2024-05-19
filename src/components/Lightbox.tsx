import { ReactNode } from 'react';
import LightGallery, { LightGalleryProps } from 'lightgallery/react';
import { LIGHTGALLERY_LICENSE } from '../constants.ts';

export const createLightGallery = (
  images: ReactNode[],
  props: LightGalleryProps = {}
) => (
  <LightGallery licenseKey={LIGHTGALLERY_LICENSE} download={false} {...props}>
    {images.length === 1 ? images[0] : images}
  </LightGallery>
);

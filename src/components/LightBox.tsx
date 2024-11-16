import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import { ReactNode } from 'react';
import LightGallery, { LightGalleryProps } from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { LIGHTGALLERY_LICENSE } from '../constants.ts';

interface Props {
  children: ReactNode;
  props?: LightGalleryProps;
  plugins?: ('zoom' | 'thumbnail')[];
}

const LightBox = ({ children, props = {}, plugins = [] }: Props) => {
  props.plugins = [];
  plugins.forEach((plugin) => {
    if (plugin === 'zoom') {
      props.plugins?.push(lgZoom);
    } else if (plugin === 'thumbnail') {
      props.plugins?.push(lgThumbnail);
    }
  });

  return (
    <LightGallery licenseKey={LIGHTGALLERY_LICENSE} download={false} {...props}>
      {children}
    </LightGallery>
  );
};

export default LightBox;

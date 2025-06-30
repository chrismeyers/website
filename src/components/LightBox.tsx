import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import type { ReactNode } from 'react';
import type { LightGallery as LG } from 'lightgallery/lightgallery';
import type { LgQuery } from 'lightgallery/lgQuery';
import LightGallery, { type LightGalleryProps } from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { LIGHTGALLERY_LICENSE } from '../constants.ts';

type Plugin = 'thumbnail' | 'zoom';

interface Props {
  children: ReactNode;
  props?: LightGalleryProps;
  plugins?: Plugin[];
}

const PLUGINS: Record<Plugin, new (instance: LG, $LG: LgQuery) => any> = {
  thumbnail: lgThumbnail,
  zoom: lgZoom,
};

const LightBox = ({ children, props = {}, plugins = [] }: Props) => {
  props.plugins = plugins.map((plugin) => PLUGINS[plugin]);

  return (
    <LightGallery licenseKey={LIGHTGALLERY_LICENSE} download={false} {...props}>
      {children}
    </LightGallery>
  );
};

export default LightBox;

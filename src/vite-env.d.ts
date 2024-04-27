/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LIGHTGALLERY_LICENSE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.svg' {
  import * as React from 'react';

  const ReactComponent: React.FunctionComponent<
    React.ComponentProps<'svg'> & { title?: string; alt?: string }
  >;

  export default ReactComponent;
}

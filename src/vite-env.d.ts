/// <reference types="./shims.d.ts" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LIGHTGALLERY_LICENSE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

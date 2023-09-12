/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly RUNTIME_FIREBASE_API_KEY: string;
  readonly RUNTIME_FIREBASE_AUTH_DOMAIN: string;
  readonly RUNTIME_FIREBASE_PROJECT_ID: string;
  readonly RUNTIME_FIREBASE_STORAGE_BUCKET: string;
  readonly RUNTIME_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly RUNTIME_FIREBASE_APP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

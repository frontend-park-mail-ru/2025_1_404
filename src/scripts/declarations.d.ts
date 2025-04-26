/* eslint-disable */

declare module "*.precompiled.js" {
    const template: (context?: any, options?: any) => string;
    export default template;
}

interface ImportMetaEnv {
    readonly VITE_BACKEND_URL: string;
    readonly VITE_GEOCODE_TOKEN: string;
    readonly VITE_SUGGEST_TOKEN: string;
    readonly VITE_CSAT_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
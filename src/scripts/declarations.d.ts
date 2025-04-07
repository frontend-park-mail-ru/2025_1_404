declare module "*.precompiled.js" {
    const template: (context?: any, options?: any) => string;
    export default template;
}
import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
export const component = async () => (await import('../entries/pages/_page.svelte.js')).default;
export const file = '_app/immutable/entry/_page.svelte.dce1f7d2.mjs';
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/entry/_page.svelte.dce1f7d2.mjs","_app/immutable/chunks/index.3da1513a.mjs"];
export const stylesheets = ["_app/immutable/assets/_page.b39a507e.css"];
export const fonts = [];

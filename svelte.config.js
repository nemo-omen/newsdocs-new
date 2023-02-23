// import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-vercel";
import { mdsvex } from "mdsvex";
/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  extensions: [".svelte", ".md", ".svx"],
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: [".md", ".svx"],
      layout: {
        shiftguide: "src/routes/shiftguide/Layout.svelte",
        docs: "src/routes/docs/Layout.svelte",
      },
    }),
  ],

  kit: {
    adapter: adapter({}),
  },
};

export default config;

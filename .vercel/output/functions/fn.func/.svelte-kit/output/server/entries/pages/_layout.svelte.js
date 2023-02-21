import { c as create_ssr_component, e as escape } from "../../chunks/index.js";
const style = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-jie6jp_START -->${$$result.title = `<title>NewsDocs</title>`, ""}<!-- HEAD_svelte-jie6jp_END -->`, ""}

<header><div class="${"inner header-inner"}"><a href="${"/"}" id="${"brand"}" aria-label="${"NewsDocs.org"}"><img src="${"logo.svg"}" alt="${"NewsDocs"}" width="${"64"}" height="${"64"}">
      NewsDocs
    </a>
    
    
    
    </div></header>

<main><div class="${"inner"}">${slots.default ? slots.default({}) : ``}</div></main>

<footer><div class="${"inner"}">© ${escape(new Date().getFullYear())} NewsDocs
  </div></footer>`;
});
export {
  Layout as default
};

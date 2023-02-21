import { c as create_ssr_component, e as escape } from "../../../chunks/index.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".roster-header.svelte-cn28h4.svelte-cn28h4{display:flex;gap:2rem;margin-bottom:2rem;justify-content:flex-end}.form-body.svelte-cn28h4.svelte-cn28h4{display:flex;flex-direction:column;gap:1rem}.form-group.svelte-cn28h4.svelte-cn28h4{display:flex;flex-direction:column;text-align:right;gap:1rem}.post-form form.svelte-cn28h4 input[type='submit'].svelte-cn28h4{align-self:flex-end}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<div class="${"roster"}"><div class="${"roster-header svelte-cn28h4"}">${`<button>Copy the Code</button>`}

    ${`<button>See the Code</button>`}

    <button>Create Post</button></div>
  <dialog ${""}><form method="${"POST"}" class="${"svelte-cn28h4"}"><div class="${"form-body svelte-cn28h4"}"><div class="${"form-group svelte-cn28h4"}"><label for="${"email"}">Email</label>
          <input type="${"email"}" name="${"email"}" id="${"email"}"></div>
        <div class="${"form-group svelte-cn28h4"}"><label for="${"password"}">Password</label>
          <input type="${"password"}" name="${"password"}" id="${"password"}"></div>
        <input type="${"submit"}" value="${"Send It!"}" class="${"svelte-cn28h4"}">
        <button>Cancel</button></div></form></dialog>
  ${`<h2>Jail Logs: ${escape(new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }))}</h2>
    <!-- HTML_TAG_START -->${data.templateData}<!-- HTML_TAG_END -->`}
</div>`;
});
export {
  Page as default
};

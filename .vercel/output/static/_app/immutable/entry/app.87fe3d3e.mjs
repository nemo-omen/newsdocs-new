import{S as B,i as q,s as U,a as j,e as h,c as z,b as w,d,f as L,g as p,h as g,j as W,o as F,k as G,l as H,m as J,p as N,q as m,r as K,u as M,v as Q,w as P,x as S,y as k,z as v,A,B as E,C as y}from"../chunks/index.3da1513a.mjs";const X="modulepreload",Y=function(o,e){return new URL(o,e).href},C={},R=function(e,n,i){if(!n||n.length===0)return e();const s=document.getElementsByTagName("link");return Promise.all(n.map(f=>{if(f=Y(f,i),f in C)return;C[f]=!0;const t=f.endsWith(".css"),a=t?'[rel="stylesheet"]':"";if(!!i)for(let l=s.length-1;l>=0;l--){const u=s[l];if(u.href===f&&(!t||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${f}"]${a}`))return;const r=document.createElement("link");if(r.rel=t?"stylesheet":X,t||(r.as="script",r.crossOrigin=""),r.href=f,document.head.appendChild(r),t)return new Promise((l,u)=>{r.addEventListener("load",l),r.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${f}`)))})})).then(()=>e())},ie={};function Z(o){let e,n,i;var s=o[1][0];function f(t){return{props:{data:t[3],form:t[2]}}}return s&&(e=k(s,f(o)),o[12](e)),{c(){e&&v(e.$$.fragment),n=h()},l(t){e&&A(e.$$.fragment,t),n=h()},m(t,a){e&&E(e,t,a),w(t,n,a),i=!0},p(t,a){const _={};if(a&8&&(_.data=t[3]),a&4&&(_.form=t[2]),s!==(s=t[1][0])){if(e){P();const r=e;d(r.$$.fragment,1,0,()=>{y(r,1)}),L()}s?(e=k(s,f(t)),t[12](e),v(e.$$.fragment),p(e.$$.fragment,1),E(e,n.parentNode,n)):e=null}else s&&e.$set(_)},i(t){i||(e&&p(e.$$.fragment,t),i=!0)},o(t){e&&d(e.$$.fragment,t),i=!1},d(t){o[12](null),t&&g(n),e&&y(e,t)}}}function $(o){let e,n,i;var s=o[1][0];function f(t){return{props:{data:t[3],$$slots:{default:[x]},$$scope:{ctx:t}}}}return s&&(e=k(s,f(o)),o[11](e)),{c(){e&&v(e.$$.fragment),n=h()},l(t){e&&A(e.$$.fragment,t),n=h()},m(t,a){e&&E(e,t,a),w(t,n,a),i=!0},p(t,a){const _={};if(a&8&&(_.data=t[3]),a&8215&&(_.$$scope={dirty:a,ctx:t}),s!==(s=t[1][0])){if(e){P();const r=e;d(r.$$.fragment,1,0,()=>{y(r,1)}),L()}s?(e=k(s,f(t)),t[11](e),v(e.$$.fragment),p(e.$$.fragment,1),E(e,n.parentNode,n)):e=null}else s&&e.$set(_)},i(t){i||(e&&p(e.$$.fragment,t),i=!0)},o(t){e&&d(e.$$.fragment,t),i=!1},d(t){o[11](null),t&&g(n),e&&y(e,t)}}}function x(o){let e,n,i;var s=o[1][1];function f(t){return{props:{data:t[4],form:t[2]}}}return s&&(e=k(s,f(o)),o[10](e)),{c(){e&&v(e.$$.fragment),n=h()},l(t){e&&A(e.$$.fragment,t),n=h()},m(t,a){e&&E(e,t,a),w(t,n,a),i=!0},p(t,a){const _={};if(a&16&&(_.data=t[4]),a&4&&(_.form=t[2]),s!==(s=t[1][1])){if(e){P();const r=e;d(r.$$.fragment,1,0,()=>{y(r,1)}),L()}s?(e=k(s,f(t)),t[10](e),v(e.$$.fragment),p(e.$$.fragment,1),E(e,n.parentNode,n)):e=null}else s&&e.$set(_)},i(t){i||(e&&p(e.$$.fragment,t),i=!0)},o(t){e&&d(e.$$.fragment,t),i=!1},d(t){o[10](null),t&&g(n),e&&y(e,t)}}}function D(o){let e,n=o[6]&&I(o);return{c(){e=G("div"),n&&n.c(),this.h()},l(i){e=H(i,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var s=J(e);n&&n.l(s),s.forEach(g),this.h()},h(){N(e,"id","svelte-announcer"),N(e,"aria-live","assertive"),N(e,"aria-atomic","true"),m(e,"position","absolute"),m(e,"left","0"),m(e,"top","0"),m(e,"clip","rect(0 0 0 0)"),m(e,"clip-path","inset(50%)"),m(e,"overflow","hidden"),m(e,"white-space","nowrap"),m(e,"width","1px"),m(e,"height","1px")},m(i,s){w(i,e,s),n&&n.m(e,null)},p(i,s){i[6]?n?n.p(i,s):(n=I(i),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},d(i){i&&g(e),n&&n.d()}}}function I(o){let e;return{c(){e=K(o[7])},l(n){e=M(n,o[7])},m(n,i){w(n,e,i)},p(n,i){i&128&&Q(e,n[7])},d(n){n&&g(e)}}}function ee(o){let e,n,i,s,f;const t=[$,Z],a=[];function _(l,u){return l[1][1]?0:1}e=_(o),n=a[e]=t[e](o);let r=o[5]&&D(o);return{c(){n.c(),i=j(),r&&r.c(),s=h()},l(l){n.l(l),i=z(l),r&&r.l(l),s=h()},m(l,u){a[e].m(l,u),w(l,i,u),r&&r.m(l,u),w(l,s,u),f=!0},p(l,[u]){let b=e;e=_(l),e===b?a[e].p(l,u):(P(),d(a[b],1,1,()=>{a[b]=null}),L(),n=a[e],n?n.p(l,u):(n=a[e]=t[e](l),n.c()),p(n,1),n.m(i.parentNode,i)),l[5]?r?r.p(l,u):(r=D(l),r.c(),r.m(s.parentNode,s)):r&&(r.d(1),r=null)},i(l){f||(p(n),f=!0)},o(l){d(n),f=!1},d(l){a[e].d(l),l&&g(i),r&&r.d(l),l&&g(s)}}}function te(o,e,n){let{stores:i}=e,{page:s}=e,{constructors:f}=e,{components:t=[]}=e,{form:a}=e,{data_0:_=null}=e,{data_1:r=null}=e;W(i.page.notify);let l=!1,u=!1,b=null;F(()=>{const c=i.page.subscribe(()=>{l&&(n(6,u=!0),n(7,b=document.title||"untitled page"))});return n(5,l=!0),c});function O(c){S[c?"unshift":"push"](()=>{t[1]=c,n(0,t)})}function T(c){S[c?"unshift":"push"](()=>{t[0]=c,n(0,t)})}function V(c){S[c?"unshift":"push"](()=>{t[0]=c,n(0,t)})}return o.$$set=c=>{"stores"in c&&n(8,i=c.stores),"page"in c&&n(9,s=c.page),"constructors"in c&&n(1,f=c.constructors),"components"in c&&n(0,t=c.components),"form"in c&&n(2,a=c.form),"data_0"in c&&n(3,_=c.data_0),"data_1"in c&&n(4,r=c.data_1)},o.$$.update=()=>{o.$$.dirty&768&&i.page.set(s)},[t,f,a,_,r,l,u,b,i,s,O,T,V]}class se extends B{constructor(e){super(),q(this,e,te,ee,U,{stores:8,page:9,constructors:1,components:0,form:2,data_0:3,data_1:4})}}const re=[()=>R(()=>import("../chunks/0.823e3776.mjs"),["../chunks/0.823e3776.mjs","./_layout.svelte.51e4debb.mjs","../chunks/index.3da1513a.mjs","../assets/_layout.badaa9af.css"],import.meta.url),()=>R(()=>import("../chunks/1.b977d800.mjs"),["../chunks/1.b977d800.mjs","./error.svelte.c4c0dc64.mjs","../chunks/index.3da1513a.mjs","../chunks/singletons.5ac1ea63.mjs"],import.meta.url),()=>R(()=>import("../chunks/2.120526a3.mjs"),["../chunks/2.120526a3.mjs","./_page.svelte.dce1f7d2.mjs","../chunks/index.3da1513a.mjs","../assets/_page.b39a507e.css"],import.meta.url),()=>R(()=>import("../chunks/3.b785af5e.mjs"),["../chunks/3.b785af5e.mjs","./roster-page.svelte.7879fb64.mjs","../chunks/index.3da1513a.mjs","../assets/_page.b39a507e.css"],import.meta.url)],oe=[],ae={"/":[-3],"/roster":[-4]},le={handleError:({error:o})=>{console.error(o)}};export{ae as dictionary,le as hooks,ie as matchers,re as nodes,se as root,oe as server_loads};

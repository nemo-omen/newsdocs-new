function w(){}function K(t,e){for(const n in e)t[n]=e[n];return t}function k(t){return t()}function j(){return Object.create(null)}function y(t){t.forEach(k)}function q(t){return typeof t=="function"}function _t(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let x;function dt(t,e){return x||(x=document.createElement("a")),x.href=e,t===x.href}function W(t){return Object.keys(t).length===0}function Q(t,...e){if(t==null)return w;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function ht(t,e,n){t.$$.on_destroy.push(Q(e,n))}function mt(t,e,n,i){if(t){const r=G(t,e,n,i);return t[0](r)}}function G(t,e,n,i){return t[1]&&i?K(n.ctx.slice(),t[1](i(e))):n.ctx}function pt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const o=[],s=Math.max(e.dirty.length,r.length);for(let u=0;u<s;u+=1)o[u]=e.dirty[u]|r[u];return o}return e.dirty|r}return e.dirty}function yt(t,e,n,i,r,o){if(r){const s=G(e,n,i,o);t.p(s,r)}}function gt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}let N=!1;function U(){N=!0}function V(){N=!1}function X(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function Y(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let c=0;c<e.length;c++){const a=e[c];a.claim_order!==void 0&&l.push(a)}e=l}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let l=0;l<e.length;l++){const c=e[l].claim_order,a=(r>0&&e[n[r]].claim_order<=c?r+1:X(1,r,g=>e[n[g]].claim_order,c))-1;i[l]=n[a]+1;const f=a+1;n[f]=l,r=Math.max(f,r)}const o=[],s=[];let u=e.length-1;for(let l=n[r]+1;l!=0;l=i[l-1]){for(o.push(e[l-1]);u>=l;u--)s.push(e[u]);u--}for(;u>=0;u--)s.push(e[u]);o.reverse(),s.sort((l,c)=>l.claim_order-c.claim_order);for(let l=0,c=0;l<s.length;l++){for(;c<o.length&&s[l].claim_order>=o[c].claim_order;)c++;const a=c<o.length?o[c]:null;t.insertBefore(s[l],a)}}function Z(t,e){if(N){for(Y(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function tt(t,e,n){t.insertBefore(e,n||null)}function et(t,e,n){N&&!n?Z(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function E(t){t.parentNode&&t.parentNode.removeChild(t)}function O(t){return document.createElement(t)}function nt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function S(t){return document.createTextNode(t)}function xt(){return S(" ")}function bt(){return S("")}function $t(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function wt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function it(t){return Array.from(t.childNodes)}function P(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function z(t,e,n,i,r=!1){P(t);const o=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const u=t[s];if(e(u)){const l=n(u);return l===void 0?t.splice(s,1):t[s]=l,r||(t.claim_info.last_index=s),u}}for(let s=t.claim_info.last_index-1;s>=0;s--){const u=t[s];if(e(u)){const l=n(u);return l===void 0?t.splice(s,1):t[s]=l,r?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,u}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function rt(t,e,n,i){return z(t,r=>r.nodeName===e,r=>{const o=[];for(let s=0;s<r.attributes.length;s++){const u=r.attributes[s];n[u.name]||o.push(u.name)}o.forEach(s=>r.removeAttribute(s))},()=>i(e))}function Et(t,e,n){return rt(t,e,n,O)}function st(t,e){return z(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>S(e),!0)}function Nt(t){return st(t," ")}function C(t,e,n){for(let i=n;i<t.length;i+=1){const r=t[i];if(r.nodeType===8&&r.textContent.trim()===e)return i}return t.length}function vt(t,e){const n=C(t,"HTML_TAG_START",0),i=C(t,"HTML_TAG_END",n);if(n===i)return new L(void 0,e);P(t);const r=t.splice(n,i-n+1);E(r[0]),E(r[r.length-1]);const o=r.slice(1,r.length-1);for(const s of o)s.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new L(o,e)}function Tt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function At(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function St(t,e){const n=[];let i=0;for(const r of e.childNodes)if(r.nodeType===8){const o=r.textContent.trim();o===`HEAD_${t}_END`?(i-=1,n.push(r)):o===`HEAD_${t}_START`&&(i+=1,n.push(r))}else i>0&&n.push(r);return n}class lt{constructor(e=!1){this.is_svg=!1,this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=nt(n.nodeName):this.e=O(n.nodeName),this.t=n,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)tt(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(E)}}class L extends lt{constructor(e,n=!1){super(n),this.e=this.n=null,this.l=e}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let n=0;n<this.n.length;n+=1)et(this.t,this.n[n],e)}}function Ht(t,e){return new t(e)}let p;function m(t){p=t}function F(){if(!p)throw new Error("Function called outside component initialization");return p}function Mt(t){F().$$.on_mount.push(t)}function jt(t){F().$$.after_update.push(t)}const h=[],D=[],b=[],B=[],R=Promise.resolve();let T=!1;function I(){T||(T=!0,R.then(J))}function Ct(){return I(),R}function A(t){b.push(t)}const v=new Set;let d=0;function J(){if(d!==0)return;const t=p;do{try{for(;d<h.length;){const e=h[d];d++,m(e),ct(e.$$)}}catch(e){throw h.length=0,d=0,e}for(m(null),h.length=0,d=0;D.length;)D.pop()();for(let e=0;e<b.length;e+=1){const n=b[e];v.has(n)||(v.add(n),n())}b.length=0}while(h.length);for(;B.length;)B.pop()();T=!1,v.clear(),m(t)}function ct(t){if(t.fragment!==null){t.update(),y(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(A)}}const $=new Set;let _;function Lt(){_={r:0,c:[],p:_}}function Dt(){_.r||y(_.c),_=_.p}function ot(t,e){t&&t.i&&($.delete(t),t.i(e))}function Bt(t,e,n,i){if(t&&t.o){if($.has(t))return;$.add(t),_.c.push(()=>{$.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}function kt(t){t&&t.c()}function qt(t,e){t&&t.l(e)}function ut(t,e,n,i){const{fragment:r,after_update:o}=t.$$;r&&r.m(e,n),i||A(()=>{const s=t.$$.on_mount.map(k).filter(q);t.$$.on_destroy?t.$$.on_destroy.push(...s):y(s),t.$$.on_mount=[]}),o.forEach(A)}function ft(t,e){const n=t.$$;n.fragment!==null&&(y(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function at(t,e){t.$$.dirty[0]===-1&&(h.push(t),I(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Gt(t,e,n,i,r,o,s,u=[-1]){const l=p;m(t);const c=t.$$={fragment:null,ctx:[],props:o,update:w,not_equal:r,bound:j(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(l?l.$$.context:[])),callbacks:j(),dirty:u,skip_bound:!1,root:e.target||l.$$.root};s&&s(c.root);let a=!1;if(c.ctx=n?n(t,e.props||{},(f,g,...H)=>{const M=H.length?H[0]:g;return c.ctx&&r(c.ctx[f],c.ctx[f]=M)&&(!c.skip_bound&&c.bound[f]&&c.bound[f](M),a&&at(t,f)),g}):[],c.update(),a=!0,y(c.before_update),c.fragment=i?i(c.ctx):!1,e.target){if(e.hydrate){U();const f=it(e.target);c.fragment&&c.fragment.l(f),f.forEach(E)}else c.fragment&&c.fragment.c();e.intro&&ot(t.$$.fragment),ut(t,e.target,e.anchor,e.customElement),V(),J()}m(l)}class Ot{$destroy(){ft(this,1),this.$destroy=w}$on(e,n){if(!q(n))return w;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!W(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{qt as A,ut as B,ft as C,mt as D,St as E,dt as F,Z as G,yt as H,gt as I,pt as J,ht as K,$t as L,L as M,vt as N,Ot as S,xt as a,et as b,Nt as c,Bt as d,bt as e,Dt as f,ot as g,E as h,Gt as i,jt as j,O as k,Et as l,it as m,w as n,Mt as o,wt as p,At as q,S as r,_t as s,Ct as t,st as u,Tt as v,Lt as w,D as x,Ht as y,kt as z};
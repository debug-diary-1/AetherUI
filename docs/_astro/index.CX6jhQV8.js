/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qe=globalThis,St=qe.ShadowRoot&&(qe.ShadyCSS===void 0||qe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ct=Symbol(),Ft=new WeakMap;let Ei=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==Ct)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(St&&e===void 0){const o=t!==void 0&&t.length===1;o&&(e=Ft.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&Ft.set(t,e))}return e}toString(){return this.cssText}};const co=i=>new Ei(typeof i=="string"?i:i+"",void 0,Ct),k=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((o,n,s)=>o+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[s+1],i[0]);return new Ei(t,i,Ct)},ho=(i,e)=>{if(St)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const o=document.createElement("style"),n=qe.litNonce;n!==void 0&&o.setAttribute("nonce",n),o.textContent=t.cssText,i.appendChild(o)}},Gt=St?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return co(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:po,defineProperty:uo,getOwnPropertyDescriptor:fo,getOwnPropertyNames:mo,getOwnPropertySymbols:go,getPrototypeOf:vo}=Object,it=globalThis,Jt=it.trustedTypes,bo=Jt?Jt.emptyScript:"",yo=it.reactiveElementPolyfillSupport,Te=(i,e)=>i,$t={toAttribute(i,e){switch(e){case Boolean:i=i?bo:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},ki=(i,e)=>!po(i,e),Qt={attribute:!0,type:String,converter:$t,reflect:!1,useDefault:!1,hasChanged:ki};Symbol.metadata??=Symbol("metadata"),it.litPropertyMetadata??=new WeakMap;let he=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Qt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),n=this.getPropertyDescriptor(e,o,t);n!==void 0&&uo(this.prototype,e,n)}}static getPropertyDescriptor(e,t,o){const{get:n,set:s}=fo(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:n,set(r){const l=n?.call(this);s?.call(this,r),this.requestUpdate(e,l,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Qt}static _$Ei(){if(this.hasOwnProperty(Te("elementProperties")))return;const e=vo(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Te("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Te("properties"))){const t=this.properties,o=[...mo(t),...go(t)];for(const n of o)this.createProperty(n,t[n])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[o,n]of t)this.elementProperties.set(o,n)}this._$Eh=new Map;for(const[t,o]of this.elementProperties){const n=this._$Eu(t,o);n!==void 0&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const n of o)t.unshift(Gt(n))}else e!==void 0&&t.push(Gt(e));return t}static _$Eu(e,t){const o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ho(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){const o=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,o);if(n!==void 0&&o.reflect===!0){const s=(o.converter?.toAttribute!==void 0?o.converter:$t).toAttribute(t,o.type);this._$Em=e,s==null?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(e,t){const o=this.constructor,n=o._$Eh.get(e);if(n!==void 0&&this._$Em!==n){const s=o.getPropertyOptions(n),r=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:$t;this._$Em=n,this[n]=r.fromAttribute(t,s.type)??this._$Ej?.get(n)??null,this._$Em=null}}requestUpdate(e,t,o){if(e!==void 0){const n=this.constructor,s=this[e];if(o??=n.getPropertyOptions(e),!((o.hasChanged??ki)(s,t)||o.useDefault&&o.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,o))))return;this.C(e,t,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:n,wrapped:s},r){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),s!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),n===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[n,s]of this._$Ep)this[n]=s;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[n,s]of o){const{wrapped:r}=s,l=this[n];r!==!0||this._$AL.has(n)||l===void 0||this.C(n,void 0,s,l)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(o=>o.hostUpdate?.()),this.update(t)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};he.elementStyles=[],he.shadowRootOptions={mode:"open"},he[Te("elementProperties")]=new Map,he[Te("finalized")]=new Map,yo?.({ReactiveElement:he}),(it.reactiveElementVersions??=[]).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Pt=globalThis,Fe=Pt.trustedTypes,Zt=Fe?Fe.createPolicy("lit-html",{createHTML:i=>i}):void 0,Si="$lit$",q=`lit$${Math.random().toFixed(9).slice(2)}$`,Ci="?"+q,wo=`<${Ci}>`,ie=document,Ie=()=>ie.createComment(""),Me=i=>i===null||typeof i!="object"&&typeof i!="function",Tt=Array.isArray,xo=i=>Tt(i)||typeof i?.[Symbol.iterator]=="function",bt=`[ 	
\f\r]`,ke=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Xt=/-->/g,Yt=/>/g,Q=RegExp(`>|${bt}(?:([^\\s"'>=/]+)(${bt}*=${bt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ei=/'/g,ti=/"/g,Pi=/^(?:script|style|textarea|title)$/i,$o=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),v=$o(1),me=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),ii=new WeakMap,Y=ie.createTreeWalker(ie,129);function Ti(i,e){if(!Tt(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Zt!==void 0?Zt.createHTML(e):e}const _o=(i,e)=>{const t=i.length-1,o=[];let n,s=e===2?"<svg>":e===3?"<math>":"",r=ke;for(let l=0;l<t;l++){const a=i[l];let d,h,c=-1,u=0;for(;u<a.length&&(r.lastIndex=u,h=r.exec(a),h!==null);)u=r.lastIndex,r===ke?h[1]==="!--"?r=Xt:h[1]!==void 0?r=Yt:h[2]!==void 0?(Pi.test(h[2])&&(n=RegExp("</"+h[2],"g")),r=Q):h[3]!==void 0&&(r=Q):r===Q?h[0]===">"?(r=n??ke,c=-1):h[1]===void 0?c=-2:(c=r.lastIndex-h[2].length,d=h[1],r=h[3]===void 0?Q:h[3]==='"'?ti:ei):r===ti||r===ei?r=Q:r===Xt||r===Yt?r=ke:(r=Q,n=void 0);const p=r===Q&&i[l+1].startsWith("/>")?" ":"";s+=r===ke?a+wo:c>=0?(o.push(d),a.slice(0,c)+Si+a.slice(c)+q+p):a+q+(c===-2?l:p)}return[Ti(i,s+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]};let _t=class Oi{constructor({strings:e,_$litType$:t},o){let n;this.parts=[];let s=0,r=0;const l=e.length-1,a=this.parts,[d,h]=_o(e,t);if(this.el=Oi.createElement(d,o),Y.currentNode=this.el.content,t===2||t===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(n=Y.nextNode())!==null&&a.length<l;){if(n.nodeType===1){if(n.hasAttributes())for(const c of n.getAttributeNames())if(c.endsWith(Si)){const u=h[r++],p=n.getAttribute(c).split(q),f=/([.?@])?(.*)/.exec(u);a.push({type:1,index:s,name:f[2],strings:p,ctor:f[1]==="."?Eo:f[1]==="?"?ko:f[1]==="@"?So:ot}),n.removeAttribute(c)}else c.startsWith(q)&&(a.push({type:6,index:s}),n.removeAttribute(c));if(Pi.test(n.tagName)){const c=n.textContent.split(q),u=c.length-1;if(u>0){n.textContent=Fe?Fe.emptyScript:"";for(let p=0;p<u;p++)n.append(c[p],Ie()),Y.nextNode(),a.push({type:2,index:++s});n.append(c[u],Ie())}}}else if(n.nodeType===8)if(n.data===Ci)a.push({type:2,index:s});else{let c=-1;for(;(c=n.data.indexOf(q,c+1))!==-1;)a.push({type:7,index:s}),c+=q.length-1}s++}}static createElement(e,t){const o=ie.createElement("template");return o.innerHTML=e,o}};function ge(i,e,t=i,o){if(e===me)return e;let n=o!==void 0?t._$Co?.[o]:t._$Cl;const s=Me(e)?void 0:e._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),s===void 0?n=void 0:(n=new s(i),n._$AT(i,t,o)),o!==void 0?(t._$Co??=[])[o]=n:t._$Cl=n),n!==void 0&&(e=ge(i,n._$AS(i,e.values),n,o)),e}let Ao=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,n=(e?.creationScope??ie).importNode(t,!0);Y.currentNode=n;let s=Y.nextNode(),r=0,l=0,a=o[0];for(;a!==void 0;){if(r===a.index){let d;a.type===2?d=new Ot(s,s.nextSibling,this,e):a.type===1?d=new a.ctor(s,a.name,a.strings,this,e):a.type===6&&(d=new Co(s,this,e)),this._$AV.push(d),a=o[++l]}r!==a?.index&&(s=Y.nextNode(),r++)}return Y.currentNode=ie,n}p(e){let t=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}},Ot=class Ii{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,n){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ge(this,e,t),Me(e)?e===y||e==null||e===""?(this._$AH!==y&&this._$AR(),this._$AH=y):e!==this._$AH&&e!==me&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):xo(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==y&&Me(this._$AH)?this._$AA.nextSibling.data=e:this.T(ie.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:o}=e,n=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=_t.createElement(Ti(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===n)this._$AH.p(t);else{const s=new Ao(n,this),r=s.u(this.options);s.p(t),this.T(r),this._$AH=s}}_$AC(e){let t=ii.get(e.strings);return t===void 0&&ii.set(e.strings,t=new _t(e)),t}k(e){Tt(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,n=0;for(const s of e)n===t.length?t.push(o=new Ii(this.O(Ie()),this.O(Ie()),this,this.options)):o=t[n],o._$AI(s),n++;n<t.length&&(this._$AR(o&&o._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e&&e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}};class ot{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,n,s){this.type=1,this._$AH=y,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=s,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=y}_$AI(e,t=this,o,n){const s=this.strings;let r=!1;if(s===void 0)e=ge(this,e,t,0),r=!Me(e)||e!==this._$AH&&e!==me,r&&(this._$AH=e);else{const l=e;let a,d;for(e=s[0],a=0;a<s.length-1;a++)d=ge(this,l[o+a],t,a),d===me&&(d=this._$AH[a]),r||=!Me(d)||d!==this._$AH[a],d===y?e=y:e!==y&&(e+=(d??"")+s[a+1]),this._$AH[a]=d}r&&!n&&this.j(e)}j(e){e===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}let Eo=class extends ot{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===y?void 0:e}},ko=class extends ot{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==y)}};class So extends ot{constructor(e,t,o,n,s){super(e,t,o,n,s),this.type=5}_$AI(e,t=this){if((e=ge(this,e,t,0)??y)===me)return;const o=this._$AH,n=e===y&&o!==y||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,s=e!==y&&(o===y||n);n&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}let Co=class{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){ge(this,e)}};const Po=Pt.litHtmlPolyfillSupport;Po?.(_t,Ot),(Pt.litHtmlVersions??=[]).push("3.3.0");const To=(i,e,t)=>{const o=t?.renderBefore??e;let n=o._$litPart$;if(n===void 0){const s=t?.renderBefore??null;o._$litPart$=n=new Ot(e.insertBefore(Ie(),s),s,void 0,t??{})}return n._$AI(i),n};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const It=globalThis;class x extends he{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=To(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return me}}x._$litElement$=!0,x.finalized=!0,It.litElementHydrateSupport?.({LitElement:x});const Oo=It.litElementPolyfillSupport;Oo?.({LitElement:x});(It.litElementVersions??=[]).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const M=i=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(i,e)}):customElements.define(i,e)};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ke=globalThis,Mt=Ke.ShadowRoot&&(Ke.ShadyCSS===void 0||Ke.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Mi=Symbol(),oi=new WeakMap;let Io=class{constructor(i,e,t){if(this._$cssResult$=!0,t!==Mi)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=e}get styleSheet(){let i=this.o;const e=this.t;if(Mt&&i===void 0){const t=e!==void 0&&e.length===1;t&&(i=oi.get(e)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),t&&oi.set(e,i))}return i}toString(){return this.cssText}};const Mo=i=>new Io(typeof i=="string"?i:i+"",void 0,Mi),Ro=(i,e)=>{if(Mt)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const o=document.createElement("style"),n=Ke.litNonce;n!==void 0&&o.setAttribute("nonce",n),o.textContent=t.cssText,i.appendChild(o)}},ni=Mt?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return Mo(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:No,defineProperty:Do,getOwnPropertyDescriptor:Lo,getOwnPropertyNames:Uo,getOwnPropertySymbols:Ho,getPrototypeOf:zo}=Object,ve=globalThis,si=ve.trustedTypes,jo=si?si.emptyScript:"",ri=ve.reactiveElementPolyfillSupport,Oe=(i,e)=>i,Ge={toAttribute(i,e){switch(e){case Boolean:i=i?jo:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},Rt=(i,e)=>!No(i,e),ai={attribute:!0,type:String,converter:Ge,reflect:!1,useDefault:!1,hasChanged:Rt};Symbol.metadata!=null||(Symbol.metadata=Symbol("metadata")),ve.litPropertyMetadata!=null||(ve.litPropertyMetadata=new WeakMap);class Se extends HTMLElement{static addInitializer(e){var t;this._$Ei(),((t=this.l)!=null?t:this.l=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ai){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),n=this.getPropertyDescriptor(e,o,t);n!==void 0&&Do(this.prototype,e,n)}}static getPropertyDescriptor(e,t,o){var n;const{get:s,set:r}=(n=Lo(this.prototype,e))!=null?n:{get(){return this[t]},set(l){this[t]=l}};return{get:s,set(l){const a=s?.call(this);r?.call(this,l),this.requestUpdate(e,a,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){var t;return(t=this.elementProperties.get(e))!=null?t:ai}static _$Ei(){if(this.hasOwnProperty(Oe("elementProperties")))return;const e=zo(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Oe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Oe("properties"))){const t=this.properties,o=[...Uo(t),...Ho(t)];for(const n of o)this.createProperty(n,t[n])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[o,n]of t)this.elementProperties.set(o,n)}this._$Eh=new Map;for(const[t,o]of this.elementProperties){const n=this._$Eu(t,o);n!==void 0&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const n of o)t.unshift(ni(n))}else e!==void 0&&t.push(ni(e));return t}static _$Eu(e,t){const o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t,o;((t=this._$EO)!=null?t:this._$EO=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&((o=e.hostConnected)==null||o.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){var e;const t=(e=this.shadowRoot)!=null?e:this.attachShadow(this.constructor.shadowRootOptions);return Ro(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot!=null||(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostConnected)==null?void 0:o.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostDisconnected)==null?void 0:o.call(t)})}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){var o;const n=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,n);if(s!==void 0&&n.reflect===!0){const r=(((o=n.converter)==null?void 0:o.toAttribute)!==void 0?n.converter:Ge).toAttribute(t,n.type);this._$Em=e,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(e,t){var o,n,s,r;const l=this.constructor,a=l._$Eh.get(e);if(a!==void 0&&this._$Em!==a){const d=l.getPropertyOptions(a),h=typeof d.converter=="function"?{fromAttribute:d.converter}:((o=d.converter)==null?void 0:o.fromAttribute)!==void 0?d.converter:Ge;this._$Em=a,this[a]=(r=(s=h.fromAttribute(t,d.type))!=null?s:(n=this._$Ej)==null?void 0:n.get(a))!=null?r:null,this._$Em=null}}requestUpdate(e,t,o){var n,s;if(e!==void 0){const r=this.constructor,l=this[e];if(o!=null||(o=r.getPropertyOptions(e)),!(((n=o.hasChanged)!=null?n:Rt)(l,t)||o.useDefault&&o.reflect&&l===((s=this._$Ej)==null?void 0:s.get(e))&&!this.hasAttribute(r._$Eu(e,o))))return;this.C(e,t,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:n,wrapped:s},r){var l,a,d;o&&!((l=this._$Ej)!=null?l:this._$Ej=new Map).has(e)&&(this._$Ej.set(e,(a=r??t)!=null?a:this[e]),s!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),n===!0&&this._$Em!==e&&((d=this._$Eq)!=null?d:this._$Eq=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot!=null||(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[s,r]of n){const{wrapped:l}=r,a=this[s];l!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,r,a)}}let t=!1;const o=this._$AL;try{t=this.shouldUpdate(o),t?(this.willUpdate(o),(e=this._$EO)==null||e.forEach(n=>{var s;return(s=n.hostUpdate)==null?void 0:s.call(n)}),this.update(o)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(o)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(o=>{var n;return(n=o.hostUpdated)==null?void 0:n.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}}var li;Se.elementStyles=[],Se.shadowRootOptions={mode:"open"},Se[Oe("elementProperties")]=new Map,Se[Oe("finalized")]=new Map,ri?.({ReactiveElement:Se}),((li=ve.reactiveElementVersions)!=null?li:ve.reactiveElementVersions=[]).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bo={attribute:!0,type:String,converter:Ge,reflect:!1,hasChanged:Rt},Vo=(i=Bo,e,t)=>{const{kind:o,metadata:n}=t;let s=globalThis.litPropertyMetadata.get(n);if(s===void 0&&globalThis.litPropertyMetadata.set(n,s=new Map),o==="setter"&&((i=Object.create(i)).wrapped=!0),s.set(t.name,i),o==="accessor"){const{name:r}=t;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(r,a,i)},init(l){return l!==void 0&&this.C(r,void 0,i,l),l}}}if(o==="setter"){const{name:r}=t;return function(l){const a=this[r];e.call(this,l),this.requestUpdate(r,a,i)}}throw Error("Unsupported decorator location: "+o)};function m(i){return(e,t)=>typeof t=="object"?Vo(i,e,t):((o,n,s)=>{const r=n.hasOwnProperty(s);return n.constructor.createProperty(s,o),r?Object.getOwnPropertyDescriptor(n,s):void 0})(i,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Nt(i){return m({...i,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ri=(i,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(i,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function H(i,e){return(t,o,n)=>{const s=r=>{var l,a;return(a=(l=r.renderRoot)==null?void 0:l.querySelector(i))!=null?a:null};return Ri(t,o,{get(){return s(this)}})}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function qo(i){return(e,t)=>{const{slot:o,selector:n}=i??{},s="slot"+(o?`[name=${o}]`:":not([name])");return Ri(e,t,{get(){var r,l;const a=(r=this.renderRoot)==null?void 0:r.querySelector(s),d=(l=a?.assignedElements(i))!=null?l:[];return n===void 0?d:d.filter(h=>h.matches(n))}})}}const Ko=k`
  :host {
    display: inline-block;
    --_focus-ring-color: var(--ae-focus-ring-color, var(--ae-color-primary));
    --_focus-ring-width: var(--ae-focus-ring-width, 2px);
    --_focus-ring-offset: var(--ae-focus-ring-offset, 2px);
  }

  .base {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: none;
    border-radius: var(--ae-border-radius, 0.375rem);
    font-family: var(--ae-font-family);
    font-weight: var(--ae-font-weight, 500);
    cursor: pointer;
    transition: all var(--ae-transition-duration, 200ms) ease;
    position: relative;
    margin: 0;
    padding: 0;
    line-height: 1;
    text-align: center;
    -webkit-appearance: none;
    appearance: none;
    box-sizing: border-box;
    min-width: 0;
  }

  /* Variants */
  .base--primary {
    background: var(--ae-color-primary);
    color: var(--ae-color-primary-foreground);
  }

  .base--primary:hover:not(:disabled) {
    background: var(--ae-color-primary-hover);
  }

  .base--secondary {
    background: var(--ae-color-secondary);
    color: var(--ae-color-secondary-foreground);
  }

  .base--secondary:hover:not(:disabled) {
    background: var(--ae-color-secondary-hover);
  }

  .base--ghost {
    background: transparent;
    color: var(--ae-color-text);
  }

  .base--ghost:hover:not(:disabled) {
    background: var(--ae-color-surface-hover);
  }

  /* Sizes */
  .base--sm {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1;
    height: 2rem;
  }

  .base--md {
    padding: 0.625rem 1rem;
    font-size: 1rem;
    line-height: 1;
    height: 2.5rem;
  }

  .base--lg {
    padding: 0.75rem 1.25rem;
    font-size: 1.125rem;
    line-height: 1;
    height: 3rem;
  }

  /* Icon positioning */
  ::slotted([slot="icon"]) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 1em;
    height: 1em;
  }

  :host([icon-position="end"]) .base {
    flex-direction: row-reverse;
  }

  /* Icon-only state */
  :host([icon-only]) .base {
    padding: 0.5rem;
    width: 2.5rem;
    height: 2.5rem;
    aspect-ratio: 1;
  }

  :host([icon-only]) ::slotted([slot="icon"]) {
    width: 1.25em;
    height: 1.25em;
  }

  /* Disabled state */
  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  :host([disabled]) .base {
    cursor: not-allowed;
  }

  /* Focus state */
  .base:focus-visible {
    outline: var(--_focus-ring-width) solid var(--_focus-ring-color);
    outline-offset: var(--_focus-ring-offset);
  }
`;var Wo=Object.defineProperty,Ue=(i,e,t,o)=>{for(var n=void 0,s=i.length-1,r;s>=0;s--)(r=i[s])&&(n=r(e,t,n)||n);return n&&Wo(e,t,n),n};const Ni=class extends x{constructor(){super(...arguments),this.variant="primary",this.size="md",this.disabled=!1,this.iconPosition="start",this.iconOnly=!1}render(){return v`
      <button
        class="base base--${this.variant} base--${this.size}"
        part="base"
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        <slot name="icon" part="icon"></slot>
        <slot></slot>
      </button>
    `}_handleClick(e){if(this.disabled){e.preventDefault();return}}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{const e=this.querySelector('[slot="icon"]')!==null,t=Array.from(this.childNodes).some(o=>o.nodeType===Node.TEXT_NODE?!0:o.nodeType===Node.ELEMENT_NODE?!o.hasAttribute("slot"):!1);e&&!t&&(this.iconOnly=!0,this.hasAttribute("aria-label")||console.warn("Icon-only buttons should have an aria-label attribute"))})}};Ni.styles=Ko;let le=Ni;Ue([m({type:String,reflect:!0})],le.prototype,"variant");Ue([m({type:String,reflect:!0})],le.prototype,"size");Ue([m({type:Boolean,reflect:!0})],le.prototype,"disabled");Ue([m({type:String,reflect:!0,attribute:"icon-position"})],le.prototype,"iconPosition");Ue([m({type:Boolean,reflect:!0,attribute:"icon-only"})],le.prototype,"iconOnly");const Fo=()=>{customElements.get("ae-button")||customElements.define("ae-button",le)};var Go=Object.defineProperty,Dt=(i,e,t,o)=>{for(var n=void 0,s=i.length-1,r;s>=0;s--)(r=i[s])&&(n=r(e,t,n)||n);return n&&Go(e,t,n),n};const Di=class extends x{constructor(){super(...arguments),this.multiselectable=!1,this.defaultOpen=[],this.openPanels=new Set,this.items=new Set}connectedCallback(){super.connectedCallback(),this.setAttribute("role","presentation"),this.defaultOpen.length>0&&(this.openPanels=new Set(this.defaultOpen))}handleSlotChange(e){const t=e.target.assignedElements();this.items.clear(),t.forEach(o=>{if(o.tagName.toLowerCase()==="ae-accordion-item"){this.items.add(o);const n=o.getAttribute("headerid");n&&(o.open=this.openPanels.has(n))}})}handlePanelChange(e){const t=e.detail.headerId,o=e.detail.open,n=e.target;o?(this.multiselectable||(this.items.forEach(s=>{s!==n&&(s.open=!1)}),this.openPanels.clear()),this.openPanels.add(t)):this.openPanels.delete(t),this.dispatchEvent(new CustomEvent("ae-change",{detail:{open:Array.from(this.openPanels)},bubbles:!0,composed:!0}))}render(){return v`
      <slot 
        @slotchange=${this.handleSlotChange}
        @ae-panel-change=${this.handlePanelChange}
      ></slot>
    `}};Di.styles=k`
    :host {
      display: block;
      width: 100%;
    }

    ::slotted(ae-accordion-item) {
      margin-bottom: 0.5rem;
    }

    ::slotted(ae-accordion-item:last-child) {
      margin-bottom: 0;
    }
  `;let nt=Di;Dt([m({type:Boolean,reflect:!0})],nt.prototype,"multiselectable");Dt([m({type:Array})],nt.prototype,"defaultOpen");Dt([Nt()],nt.prototype,"openPanels");var Jo=Object.defineProperty,Li=(i,e,t,o)=>{for(var n=void 0,s=i.length-1,r;s>=0;s--)(r=i[s])&&(n=r(e,t,n)||n);return n&&Jo(e,t,n),n};const Ui=class extends x{constructor(){super(...arguments),this.headerId=crypto.randomUUID(),this.open=!1,this.panelHeight=0}connectedCallback(){super.connectedCallback(),this.setAttribute("role","region")}updated(e){e.has("open")&&this.updatePanelHeight()}updatePanelHeight(){var e;if(this.open){const t=(e=this.shadowRoot)==null?void 0:e.querySelector(".panel-inner");t&&(this.panelHeight=t.offsetHeight,this.style.setProperty("--panel-height",`${this.panelHeight}px`))}}handleHeaderClick(){this.open=!this.open,this.dispatchEvent(new CustomEvent("ae-panel-change",{detail:{headerId:this.headerId,open:this.open},bubbles:!0,composed:!0}))}handleKeydown(e){(e.key===" "||e.key==="Enter")&&(e.preventDefault(),this.handleHeaderClick())}render(){return v`
      <button
        class="header"
        part="header"
        role="button"
        aria-expanded=${this.open}
        aria-controls="panel-${this.headerId}"
        @click=${this.handleHeaderClick}
        @keydown=${this.handleKeydown}
      >
        <slot name="header"></slot>
        <svg
          class="icon"
          part="icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div
        class="panel"
        part="panel"
        id="panel-${this.headerId}"
      >
        <div class="panel-inner">
          <slot></slot>
        </div>
      </div>
    `}};Ui.styles=k`
    :host {
      display: block;
      border: 1px solid var(--ae-color-border);
      border-radius: var(--ae-border-radius);
      overflow: hidden;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      cursor: pointer;
      background: var(--ae-color-surface);
      border: none;
      width: 100%;
      text-align: left;
      color: var(--ae-color-text);
      font-family: var(--ae-font-family);
      font-size: var(--ae-font-size-base);
    }

    .header:hover {
      background: var(--ae-color-surface-hover);
    }

    .header:focus-visible {
      outline: 2px solid var(--ae-color-primary);
      outline-offset: -2px;
    }

    .icon {
      width: 1rem;
      height: 1rem;
      transform: rotate(0deg);
      transition: transform var(--ae-transition-duration) ease;
      flex-shrink: 0;
      margin-left: 0.5rem;
    }

    :host([open]) .icon {
      transform: rotate(180deg);
    }

    .panel {
      overflow: hidden;
      max-height: 0;
      opacity: 0;
      transition: max-height var(--ae-transition-duration) ease,
                  opacity var(--ae-transition-duration) ease,
                  padding var(--ae-transition-duration) ease;
      background: var(--ae-color-surface);
      border-top: 0 solid var(--ae-color-border);
    }

    :host([open]) .panel {
      max-height: var(--panel-height, 1000px);
      opacity: 1;
      border-top-width: 1px;
      padding: 1rem;
    }

    .panel-inner {
      opacity: 0;
      transition: opacity var(--ae-transition-duration) ease;
    }

    :host([open]) .panel-inner {
      opacity: 1;
    }
  `;let Lt=Ui;Li([m({type:String})],Lt.prototype,"headerId");Li([m({type:Boolean,reflect:!0})],Lt.prototype,"open");const Qo=()=>{customElements.get("ae-accordion")||customElements.define("ae-accordion",nt),customElements.get("ae-accordion-item")||customElements.define("ae-accordion-item",Lt)};var Zo=Object.defineProperty,Xo=Object.getOwnPropertyDescriptor,He=(i,e,t,o)=>{for(var n=o>1?void 0:o?Xo(e,t):e,s=i.length-1,r;s>=0;s--)(r=i[s])&&(n=(o?r(e,t,n):r(n))||n);return o&&n&&Zo(e,t,n),n};let W=class extends x{constructor(){super(...arguments),this.value="",this.disabled=!1,this.checked=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","radio"),this.setAttribute("tabindex",this.checked?"0":"-1"),this.setAttribute("aria-checked",this.checked.toString())}handleClick(){this.disabled||(this.checked=!0,this.dispatchEvent(new CustomEvent("ae-change",{detail:{value:this.value},bubbles:!0,composed:!0})))}handleKeydown(i){this.disabled||(i.key===" "||i.key==="Enter")&&(i.preventDefault(),this.handleClick())}render(){return v`
      <div
        class="control"
        part="control"
        @click=${this.handleClick}
        @keydown=${this.handleKeydown}
        aria-checked=${this.checked}
        tabindex=${this.checked?"0":"-1"}
      >
        <div class="indicator" part="indicator"></div>
      </div>
      <span class="label" part="label">
        <slot></slot>
      </span>
    `}};W.styles=k`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    .control {
      position: relative;
      width: 1rem;
      height: 1rem;
      border: 2px solid var(--ae-color-border);
      border-radius: 50%;
      background: var(--ae-color-surface);
      transition: border-color var(--ae-transition-duration) ease;
    }

    .control:hover {
      border-color: var(--ae-color-primary);
    }

    .indicator {
      position: absolute;
      inset: 2px;
      border-radius: 50%;
      background: var(--ae-color-primary);
      transform: scale(0);
      transition: transform var(--ae-transition-duration) ease;
    }

    .control[aria-checked="true"] .indicator {
      transform: scale(1);
    }

    .label {
      font-size: var(--ae-font-size-sm);
      color: var(--ae-color-text);
    }

    :host([disabled]) {
      opacity: 0.5;
      cursor: not-allowed;
    }

    :host([disabled]) .control {
      border-color: var(--ae-color-border-disabled);
    }
  `;He([m({type:String})],W.prototype,"value",2);He([m({type:Boolean,reflect:!0})],W.prototype,"disabled",2);He([m({type:Boolean,reflect:!0})],W.prototype,"checked",2);He([H(".control")],W.prototype,"control",2);W=He([M("ae-radio")],W);var Yo=Object.defineProperty,en=Object.getOwnPropertyDescriptor,st=(i,e,t,o)=>{for(var n=o>1?void 0:o?en(e,t):e,s=i.length-1,r;s>=0;s--)(r=i[s])&&(n=(o?r(e,t,n):r(n))||n);return o&&n&&Yo(e,t,n),n};let oe=class extends x{constructor(){super(...arguments),this.value="",this.orientation="vertical"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","radiogroup")}handleChange(i){const e=i.target;this.value=e.value,this.updateRadios()}updateRadios(){this.radios.forEach(i=>{i.checked=i.value===this.value})}handleKeydown(i){if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(i.key))return;i.preventDefault();const e=this.radios.findIndex(n=>n.checked);let t=e;this.orientation==="vertical"?i.key==="ArrowUp"?t=e>0?e-1:this.radios.length-1:i.key==="ArrowDown"&&(t=e<this.radios.length-1?e+1:0):i.key==="ArrowLeft"?t=e>0?e-1:this.radios.length-1:i.key==="ArrowRight"&&(t=e<this.radios.length-1?e+1:0);const o=this.radios[t];o&&!o.disabled&&(o.checked=!0,this.value=o.value,this.dispatchEvent(new CustomEvent("ae-change",{detail:{value:this.value},bubbles:!0,composed:!0})))}render(){return v`
      <slot
        @ae-change=${this.handleChange}
        @keydown=${this.handleKeydown}
      ></slot>
    `}};oe.styles=k`
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    :host([orientation="horizontal"]) {
      flex-direction: row;
      align-items: center;
    }
  `;st([m({type:String})],oe.prototype,"value",2);st([m({type:String,reflect:!0})],oe.prototype,"orientation",2);st([qo({selector:"ae-radio"})],oe.prototype,"radios",2);oe=st([M("ae-radio-group")],oe);const tn=()=>{customElements.get("ae-radio")||customElements.define("ae-radio",W)},on=()=>{customElements.get("ae-radio-group")||customElements.define("ae-radio-group",oe)};let We=null;function nn(){We=document.activeElement}function sn(){We&&We.focus&&We.focus()}function rn(i,e){const t=i.querySelectorAll('a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])');if(t.length===0)return;const o=t[0],n=t[t.length-1];if(e){const r=i.querySelector(e);r&&r.focus?r.focus():o.focus()}else o.focus();const s=r=>{r.key==="Tab"&&(r.shiftKey?document.activeElement===o&&(r.preventDefault(),n.focus()):document.activeElement===n&&(r.preventDefault(),o.focus()))};return i.addEventListener("keydown",s),()=>{i.removeEventListener("keydown",s)}}let pe=null;function an(){if(pe)return;pe={overflow:document.body.style.overflow,paddingRight:document.body.style.paddingRight};const i=window.innerWidth-document.documentElement.clientWidth;i>0&&(document.body.style.paddingRight=`${i}px`),document.body.style.overflow="hidden"}function di(){pe&&(document.body.style.overflow=pe.overflow,document.body.style.paddingRight=pe.paddingRight,pe=null)}var ln=Object.defineProperty,rt=(i,e,t,o)=>{for(var n=void 0,s=i.length-1,r;s>=0;s--)(r=i[s])&&(n=r(e,t,n)||n);return n&&ln(e,t,n),n};const Hi=class extends x{constructor(){super(...arguments),this.open=!1,this.underlay=!0,this.initialFocus=null}connectedCallback(){super.connectedCallback(),this.setAttribute("role","dialog"),this.setAttribute("aria-modal","true"),document.addEventListener("keydown",this.handleKeyDown.bind(this))}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleKeyDown.bind(this)),this.cleanup()}attributeChangedCallback(e,t,o){if(super.attributeChangedCallback(e,t,o),e==="open"){const n=t!==null,s=o!==null;!n&&s?this.handleOpen():n&&!s&&this.handleClose()}}handleOpen(){an(),nn(),this.updateComplete.then(()=>{const e=typeof this.initialFocus=="string"?this.initialFocus:void 0;this.cleanupFocusTrap=rn(this.panel,e)})}handleClose(){this.cleanupFocusTrap&&(this.cleanupFocusTrap(),this.cleanupFocusTrap=void 0),sn(),di()}cleanup(){this.cleanupFocusTrap&&this.cleanupFocusTrap(),di()}handleKeyDown(e){this.open&&e.key==="Escape"&&this.requestClose("escape")}handleOverlayClick(e){e.target===e.currentTarget&&this.underlay&&this.requestClose("backdrop")}requestClose(e){this.open=!1,this.removeAttribute("open"),this.dispatchEvent(new CustomEvent("ae-request-close",{detail:{reason:e},bubbles:!0,composed:!0}))}render(){return v`
      <div 
        class="overlay"
        part="overlay"
        @click=${this.handleOverlayClick}
      >
        <div 
          class="panel"
          part="panel"
        >
          <div class="header" part="header">
            <slot name="header"></slot>
            <button
              class="close-button"
              aria-label="Close"
              @click=${()=>this.requestClose("api")}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 6L6 18M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          <div class="body" part="body">
            <slot></slot>
          </div>
          <div class="footer" part="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `}};Hi.styles=k`
    :host {
      --ae-modal-overlay-bg: rgba(0, 0, 0, 0.5);
      --ae-modal-z-index: 1000;
      --ae-transition-duration: 200ms;
      --ae-modal-text-color: var(--ae-color-text, #1a1a1a);
      position: fixed;
      inset: 0;
      display: none;
      z-index: var(--ae-modal-z-index);
    }

    :host([open]) {
      display: block;
    }

    .overlay {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--ae-modal-overlay-bg);
      backdrop-filter: blur(4px);
      opacity: 0;
      visibility: hidden;
      transition: opacity var(--ae-transition-duration) ease,
                  visibility var(--ae-transition-duration) ease;
    }

    :host([open]) .overlay {
      opacity: 1;
      visibility: visible;
    }

    .panel {
      position: relative;
      display: flex;
      flex-direction: column;
      min-width: 20rem;
      max-width: 90vw;
      max-height: 90vh;
      background: var(--ae-color-surface, #fff);
      color: var(--ae-modal-text-color);
      border-radius: var(--ae-border-radius, 0.375rem);
      box-shadow: var(--ae-shadow-lg);
      transform: scale(0.95);
      opacity: 0;
      transition: transform var(--ae-transition-duration) ease,
                  opacity var(--ae-transition-duration) ease;
    }

    :host([open]) .panel {
      transform: scale(1);
      opacity: 1;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      border-bottom: 1px solid var(--ae-color-border);
      color: var(--ae-modal-text-color);
      font-weight: 600;
    }

    .body {
      flex: 1;
      padding: 1rem;
      overflow-y: auto;
      color: var(--ae-modal-text-color);
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.5rem;
      padding: 1rem;
      border-top: 1px solid var(--ae-color-border);
    }

    .close-button {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      padding: 0.5rem;
      border: none;
      background: transparent;
      cursor: pointer;
      color: var(--ae-modal-text-color);
    }

    .close-button:hover {
      opacity: 0.8;
    }

    .close-button:focus-visible {
      outline: 2px solid var(--ae-color-primary);
      outline-offset: 2px;
      border-radius: var(--ae-border-radius);
    }
  `;let $e=Hi;rt([m({type:Boolean,reflect:!0})],$e.prototype,"open");rt([m({type:Boolean})],$e.prototype,"underlay");rt([m()],$e.prototype,"initialFocus");rt([H(".panel")],$e.prototype,"panel");const dn=k`
  :host {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    --_size: var(--ae-checkbox-size, 1rem);
    --_color: var(--ae-color-primary, #3b82f6);
    --_border-color: var(--ae-color-border, #d1d5db);
    --_bg-color: var(--ae-color-surface, #ffffff);
  }

  :host([disabled]) {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .root {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;
  }

  /* Hide native input but keep it focusable */
  .input {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    margin: 0;
    cursor: inherit;
    z-index: 1;
  }

  /* Custom control - can be styled with ::part(control) */
  .control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--_size);
    height: var(--_size);
    border: 2px solid var(--_border-color);
    border-radius: 0.25rem;
    background: var(--_bg-color);
    transition: all 200ms ease;
    position: relative;
    flex-shrink: 0;
  }

  /* Indicator - can be styled with ::part(indicator) */
  .indicator {
    color: white;
    transform: scale(0);
    transition: transform 200ms ease;
    position: absolute;
  }

  /* Label - can be styled with ::part(label) */
  .label {
    line-height: 1.2;
  }

  /* Checked/indeterminate states */
  :host([checked]) .control,
  :host([indeterminate]) .control {
    background: var(--_color);
    border-color: var(--_color);
  }

  :host([checked]) .indicator,
  :host([indeterminate]) .indicator {
    transform: scale(1);
  }

  /* Focus styles */
  .input:focus-visible + .control {
    outline: 2px solid var(--_color);
    outline-offset: 2px;
  }

  /* Hover styles */
  :host(:hover:not([disabled])) .control {
    border-color: var(--_color);
  }
`;var cn=Object.defineProperty,at=(i,e,t,o)=>{for(var n=void 0,s=i.length-1,r;s>=0;s--)(r=i[s])&&(n=r(e,t,n)||n);return n&&cn(e,t,n),n};const zi=class extends x{constructor(){super(...arguments),this.checked=!1,this.defaultChecked=!1,this.indeterminate=!1,this.disabled=!1}firstUpdated(){this.defaultChecked&&(this.checked=!0)}render(){return v`
      <label class="root">
        <input
          type="checkbox"
          class="input"
          .checked=${this.checked}
          .indeterminate=${this.indeterminate}
          ?disabled=${this.disabled}
          @change=${this._handleChange}
          aria-checked=${this.indeterminate?"mixed":this.checked}
        />
        <span class="control" part="control">
          <span class="indicator" part="indicator">
            ${this.indeterminate?this._renderIndeterminate():this._renderCheckmark()}
          </span>
        </span>
        <span class="label" part="label">
          <slot></slot>
        </span>
      </label>
    `}_renderCheckmark(){return v`
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M10 3L4.5 8.5L2 6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    `}_renderIndeterminate(){return v`
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M2.5 6H9.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    `}_handleChange(e){const t=e.target;this.checked=t.checked,this.indeterminate&&(this.indeterminate=!1),this.dispatchEvent(new CustomEvent("ae-change",{detail:{checked:this.checked},bubbles:!0,composed:!0}))}};zi.styles=dn;let _e=zi;at([m({type:Boolean,reflect:!0})],_e.prototype,"checked");at([m({type:Boolean})],_e.prototype,"defaultChecked");at([m({type:Boolean,reflect:!0})],_e.prototype,"indeterminate");at([m({type:Boolean,reflect:!0})],_e.prototype,"disabled");const hn=()=>{customElements.get("ae-checkbox")||customElements.define("ae-checkbox",_e)},pn=k`
  /* Base styles for the host element - horizontal by default */
  :host {
    display: block !important;
    width: 100%;
  }

  /* Base tablist styles - horizontal by default */
  [part="tablist"] {
    display: flex;
    flex-direction: row;
    gap: var(--ae-tabs-gap, 1rem);
    border-bottom: 1px solid #ddd;
    margin-bottom: 1rem;
    border-right: none;
    margin-right: 0;
  }

  /* Flex layout for vertical orientation - only applied when orientation="vertical" */
  :host([orientation="vertical"]) {
    display: flex !important;
  }

  /* Vertical tablist styles - only applied when orientation="vertical" */
  :host([orientation="vertical"]) [part="tablist"] {
    flex-direction: column;
    min-width: 150px;
    border-right: 1px solid #ddd;
    margin-right: 1rem;
    border-bottom: none;
    margin-bottom: 0;
  }

  /* Button/tab styles */
  ::part(tab) {
    background: transparent;
    padding: var(--ae-tabs-padding-y, 0.25rem) var(--ae-tabs-padding-x, 0.75rem);
    border: none;
    cursor: pointer;
    font: inherit;
    position: relative;
  }

  /* Selected tab styles - horizontal by default */
  ::part(tab)[aria-selected="true"] {
    border-bottom: 2px solid var(--ae-tabs-indicator-color, currentColor);
    border-right: none;
    font-weight: bold;
    margin-bottom: -1px;
  }

  /* Selected tab styles - vertical */
  :host([orientation="vertical"]) ::part(tab)[aria-selected="true"] {
    border-right: 2px solid var(--ae-tabs-indicator-color, currentColor);
    border-bottom: none;
    font-weight: bold;
    margin-bottom: 0;
  }

  /* Panel container for vertical layout */
  :host([orientation="vertical"]) .panel-container {
    flex: 1;
  }

  /* Panel styles */
  ::part(panel) {
    padding: 1rem 0;
  }

  /* Specificity cascade for tabs without explicit orientation (treat as horizontal) */
  :host:not([orientation="vertical"]) {
    display: block !important;
  }

  :host:not([orientation="vertical"]) [part="tablist"] {
    flex-direction: row !important;
    border-bottom: 1px solid #ddd !important;
    border-right: none !important;
    margin-bottom: 1rem !important;
    margin-right: 0 !important;
  }

  /* Ensure horizontal tabs for compatibility */
  :host([orientation="horizontal"]) {
    display: block !important;
  }

  :host([orientation="horizontal"]) [part="tablist"] {
    flex-direction: row !important;
    border-bottom: 1px solid #ddd !important;
    border-right: none !important;
    margin-bottom: 1rem !important;
    margin-right: 0 !important;
  }
`;var un=Object.defineProperty,fn=Object.getOwnPropertyDescriptor,de=(i,e,t,o)=>{for(var n=o>1?void 0:o?fn(e,t):e,s=i.length-1,r;s>=0;s--)(r=i[s])&&(n=(o?r(e,t,n):r(n))||n);return o&&n&&un(e,t,n),n};let L=class extends x{constructor(){super(),this.value="",this.orientation="horizontal",this.activation="auto",this._tabs=[],this._panels=[],this.orientation="horizontal"}connectedCallback(){super.connectedCallback(),this.hasAttribute("orientation")||this.setAttribute("orientation","horizontal")}firstUpdated(){this.tabSlot.addEventListener("slotchange",()=>this._handleSlotChange()),this.panelSlot.addEventListener("slotchange",()=>this._handleSlotChange()),this._handleSlotChange(),this.tabList&&this.tabList.setAttribute("aria-orientation",this.orientation)}_handleSlotChange(){this._tabs=this.tabSlot.assignedElements(),this._panels=this.panelSlot.assignedElements(),this._tabs.forEach((i,e)=>{const t=this._panels[e];if(i&&t){const o=i.id||`tab-${e}`,n=t.id||`panel-${e}`;i.id=o,t.id=n,i.setAttribute("aria-controls",n),t.setAttribute("aria-labelledby",o),i.addEventListener("click",s=>this.handleTabClick(s))}}),!this.value&&this._tabs.length>0&&(this.value=this._tabs[0].id),this.updateActiveTab()}updated(i){i.has("value")&&this.updateActiveTab(),i.has("orientation")&&this.tabList&&(this.tabList.setAttribute("aria-orientation",this.orientation),this.requestUpdate())}updateActiveTab(){this._tabs.length&&(this._tabs.forEach(i=>{var e;const t=i.id===this.value;i.setAttribute("aria-selected",t?"true":"false");const o=((e=i.shadowRoot)==null?void 0:e.querySelector('[role="tab"]'))||i;o instanceof HTMLElement&&(o.tabIndex=t?0:-1)}),this._panels.forEach(i=>{i.hidden=i.getAttribute("aria-labelledby")!==this.value}))}handleTabClick(i){const e=i.currentTarget.id;e!==this.value&&(this.value=e,this.dispatchEvent(new CustomEvent("ae-change",{detail:{value:e},bubbles:!0,composed:!0})))}handleKeyDown(i){var e;if(this._tabs.length===0)return;const t=this._tabs.findIndex(s=>s.id===this.value);if(t===-1)return;let o=null;const n=this.orientation==="horizontal";switch(i.key){case(n?"ArrowRight":"ArrowDown"):o=(t+1)%this._tabs.length;break;case(n?"ArrowLeft":"ArrowUp"):o=(t-1+this._tabs.length)%this._tabs.length;break;case"Home":o=0;break;case"End":o=this._tabs.length-1;break;default:return}if(o!==null){i.preventDefault();const s=this._tabs[o];this.activation==="auto"&&(this.value=s.id,this.dispatchEvent(new CustomEvent("ae-change",{detail:{value:s.id},bubbles:!0,composed:!0})));const r=((e=s.shadowRoot)==null?void 0:e.querySelector('[role="tab"]'))||s;r instanceof HTMLElement&&r.focus()}}render(){return v`
      <div 
        role="tablist" 
        aria-orientation=${this.orientation} 
        @keydown=${this.handleKeyDown}
        part="tablist"
      >
        <slot name="tab"></slot>
      </div>
      <div part="panels" class="panel-container">
        <slot name="panel"></slot>
      </div>
    `}};L.styles=[pn,k`
      :host {
        display: block;
        width: 100%;
      }
      
      :host([orientation="vertical"]) {
        display: flex;
        width: 100%;
      }
      
      .panel-container {
        flex: 1;
      }
      
      /* Vertical layout specific styles */
      :host([orientation="vertical"]) [part="tablist"] {
        min-width: 150px;
        border-right: 1px solid #ddd;
        margin-right: 1rem;
      }
    `];de([m({type:String,reflect:!0})],L.prototype,"value",2);de([m({type:String,reflect:!0})],L.prototype,"orientation",2);de([m({type:String})],L.prototype,"activation",2);de([H('[role="tablist"]')],L.prototype,"tabList",2);de([H('slot[name="tab"]')],L.prototype,"tabSlot",2);de([H('slot[name="panel"]')],L.prototype,"panelSlot",2);L=de([M("ae-tabs")],L);var mn=Object.defineProperty,gn=Object.getOwnPropertyDescriptor,ze=(i,e,t,o)=>{for(var n=o>1?void 0:o?gn(e,t):e,s=i.length-1,r;s>=0;s--)(r=i[s])&&(n=(o?r(e,t,n):r(n))||n);return o&&n&&mn(e,t,n),n};let F=class extends x{constructor(){super(),this.id="",this.ariaSelected="false",this.ariaControls="",this.tabIndex=-1,this.addEventListener("click",this._onClick)}_onClick(i){}updated(i){var e;if(i.has("ariaSelected")||i.has("ariaControls")||i.has("tabIndex")){const t=(e=this.shadowRoot)==null?void 0:e.querySelector("button");t&&(t.setAttribute("aria-selected",this.ariaSelected),t.setAttribute("aria-controls",this.ariaControls),t.tabIndex=this.tabIndex)}}render(){return v`
      <button 
        role="tab" 
        part="tab"
        aria-selected="${this.ariaSelected}"
        aria-controls="${this.ariaControls}"
        tabindex="${this.tabIndex}"
      >
        <slot></slot>
      </button>
    `}};F.styles=k`
    :host {
      display: block;
    }
    
    button {
      width: 100%;
      text-align: left;
      background: transparent;
      border: none;
      font: inherit;
      cursor: pointer;
      padding: var(--ae-tabs-padding-y, 0.25rem) var(--ae-tabs-padding-x, 0.75rem);
    }
    
    /* Adjust for parent orientation */
    :host-context(ae-tabs[orientation="horizontal"]) button {
      text-align: center;
    }
    
    :host-context(ae-tabs[orientation="vertical"]) button {
      text-align: left;
      justify-content: flex-start;
    }
  `;ze([m({type:String,reflect:!0})],F.prototype,"id",2);ze([m({type:String,reflect:!0,attribute:"aria-selected"})],F.prototype,"ariaSelected",2);ze([m({type:String,reflect:!0,attribute:"aria-controls"})],F.prototype,"ariaControls",2);ze([m({type:Number,reflect:!0})],F.prototype,"tabIndex",2);F=ze([M("ae-tab")],F);var vn=Object.defineProperty,bn=Object.getOwnPropertyDescriptor,lt=(i,e,t,o)=>{for(var n=o>1?void 0:o?bn(e,t):e,s=i.length-1,r;s>=0;s--)(r=i[s])&&(n=(o?r(e,t,n):r(n))||n);return o&&n&&vn(e,t,n),n};let be=class extends x{constructor(){super(...arguments),this.id="",this.ariaLabelledby="",this.hidden=!1}updated(i){var e;if(i.has("ariaLabelledby")||i.has("hidden")){const t=(e=this.shadowRoot)==null?void 0:e.querySelector("section");t&&(t.setAttribute("aria-labelledby",this.ariaLabelledby),t.hidden=this.hidden)}}render(){return v`
      <section 
        role="tabpanel" 
        tabindex="0" 
        part="panel"
        aria-labelledby="${this.ariaLabelledby}"
        ?hidden="${this.hidden}"
      >
        <slot></slot>
      </section>
    `}};lt([m({type:String,reflect:!0})],be.prototype,"id",2);lt([m({type:String,reflect:!0,attribute:"aria-labelledby"})],be.prototype,"ariaLabelledby",2);lt([m({type:Boolean,reflect:!0})],be.prototype,"hidden",2);be=lt([M("ae-tab-panel")],be);function yn(){customElements.get("ae-tabs")||customElements.define("ae-tabs",L),customElements.get("ae-tab")||customElements.define("ae-tab",F),customElements.get("ae-tab-panel")||customElements.define("ae-tab-panel",be)}const wn=k`
  :host {
    display: block;
  }

  :host(:not([open])) {
    display: none;
  }

  /* Base alert container */
  ::part(base) {
    display: flex;
    align-items: flex-start;
    gap: var(--ae-space-3, 0.75rem);
    padding: var(--ae-alert-padding, 1rem);
    border-radius: var(--ae-alert-radius, 0.375rem);
    background: var(--ae-alert-bg-info, #e8f4fd);
    color: var(--ae-alert-fg-info, #055160);
  }

  /* Variant styles */
  :host([variant='success']) ::part(base) {
    background: var(--ae-alert-bg-success, #edf7ed);
    color: var(--ae-alert-fg-success, #065f46);
  }

  :host([variant='warning']) ::part(base) {
    background: var(--ae-alert-bg-warning, #fff8e1);
    color: var(--ae-alert-fg-warning, #7a4d00);
  }

  :host([variant='error']) ::part(base) {
    background: var(--ae-alert-bg-error, #fdecea);
    color: var(--ae-alert-fg-error, #b71c1c);
  }

  /* Icon styling */
  ::part(icon) {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
  }

  /* Content area */
  ::part(content) {
    flex: 1;
  }

  /* Close button */
  ::part(close) {
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    color: inherit;
    opacity: 0.7;
    border-radius: 50%;
  }

  ::part(close):hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.1);
  }

  ::part(close):focus {
    outline: 2px solid var(--ae-focus-ring-color, rgba(0, 0, 0, 0.2));
    outline-offset: 2px;
  }
`;var xn=Object.defineProperty,$n=Object.getOwnPropertyDescriptor,dt=(i,e,t,o)=>{for(var n=o>1?void 0:o?$n(e,t):e,s=i.length-1,r;s>=0;s--)(r=i[s])&&(n=(o?r(e,t,n):r(n))||n);return o&&n&&xn(e,t,n),n};let ne=class extends x{constructor(){super(...arguments),this.variant="info",this.closable=!1,this.open=!0}_handleClose(){this.open=!1,this.dispatchEvent(new CustomEvent("ae-close"))}_getRole(){return this.variant==="info"?"status":"alert"}_getDefaultIcon(){return this.querySelector('[slot="icon"]')?v`<slot name="icon"></slot>`:{info:v`<svg part="icon" viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>`,success:v`<svg part="icon" viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>`,warning:v`<svg part="icon" viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
        </svg>`,error:v`<svg part="icon" viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>`}[this.variant]}render(){return this.open?v`
      <section part="base" role=${this._getRole()}>
        ${this._getDefaultIcon()}
        <div part="content">
          <slot></slot>
        </div>
        ${this.closable?v`
          <button 
            part="close" 
            aria-label="Close" 
            @click=${this._handleClose}
          >
            <svg width="14" height="14" viewBox="0 0 14 14">
              <path fill="currentColor" d="M14 1.41L12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7z"/>
            </svg>
          </button>
        `:""}
      </section>
    `:null}};ne.styles=wn;dt([m({type:String,reflect:!0})],ne.prototype,"variant",2);dt([m({type:Boolean,reflect:!0})],ne.prototype,"closable",2);dt([m({type:Boolean,reflect:!0})],ne.prototype,"open",2);ne=dt([M("ae-alert")],ne);const _n=Object.freeze(Object.defineProperty({__proto__:null,get AeAlert(){return ne}},Symbol.toStringTag,{value:"Module"})),An=()=>{customElements.get("ae-alert")||Promise.resolve().then(()=>_n)},En=k`
  :host { 
    display: contents; 
    position: relative;
  }

  /* Trigger styling */
  ::part(trigger) {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
  }

  ::part(trigger):disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Overlay styling */
  ::part(overlay) {
    background: var(--ae-dropdown-bg, #fff);
    color: var(--ae-dropdown-fg, #111);
    border-radius: var(--ae-dropdown-radius, 8px);
    box-shadow: var(--ae-dropdown-shadow, 0 6px 16px rgba(0,0,0,.3));
    padding: 0;
    z-index: 9999;
    min-width: 200px;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    border: var(--ae-dropdown-border, none);
  }

  /* Header styling */
  ::part(header) {
    padding: 12px 16px;
    font-weight: 600;
    background: var(--ae-dropdown-header-bg, inherit);
    color: var(--ae-dropdown-header-fg, inherit);
    border-bottom: var(--ae-dropdown-header-border, 1px solid rgba(255,255,255,0.1));
    display: flex;
    align-items: center;
  }

  /* Menu styling */
  ::part(menu) {
    display: flex;
    flex-direction: column;
    outline: none;
    padding: 0;
    margin: 0;
    max-height: var(--ae-dropdown-max-height, 400px);
    overflow-y: auto;
  }

  /* Section styling */
  ::part(section) {
    border-bottom: var(--ae-dropdown-section-border, 1px solid rgba(255,255,255,0.1));
    padding: 8px 0;
  }

  ::part(section):last-child {
    border-bottom: none;
  }

  /* Menu item styling */
  ::part(item) {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    background: transparent;
    border: none;
    text-align: left;
    cursor: pointer;
    color: inherit;
    font: inherit;
    width: 100%;
    justify-content: space-between;
    font-size: var(--ae-dropdown-item-font-size, 0.9rem);
  }

  ::part(item-content) {
    display: flex;
    align-items: center;
    flex: 1;
  }

  ::part(item):hover {
    background: var(--ae-dropdown-item-hover-bg, rgba(255,255,255,0.1));
  }

  ::part(item)[data-active] {
    background: var(--ae-dropdown-item-active-bg, rgba(255,255,255,0.2));
  }

  ::part(item)[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ::part(item[disabled]):hover {
    background: transparent;
  }

  /* Separator styling */
  ::part(separator) {
    height: 1px;
    background-color: var(--ae-dropdown-separator-color, rgba(255,255,255,0.1));
    margin: 8px 0;
    border: none;
  }

  /* Icon support for menu items */
  ::part(item-icon) {
    display: inline-flex;
    margin-right: 12px;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  /* Support for right-aligned text (like shortcut hints) */
  ::part(item-hint) {
    display: inline-flex;
    margin-left: 16px;
    font-size: 0.8em;
    opacity: 0.7;
    flex-shrink: 0;
    color: var(--ae-dropdown-hint-color, rgba(255,255,255,0.7));
    background: var(--ae-dropdown-hint-bg, transparent);
    padding: var(--ae-dropdown-hint-padding, 2px 4px);
    border-radius: var(--ae-dropdown-hint-radius, 3px);
  }

  /* Support for submenu indicators */
  ::part(item-submenu-indicator) {
    display: inline-flex;
    align-items: center;
    margin-left: 8px;
  }

  /* Default dark theme to match example */
  :host {
    --ae-dropdown-bg: #111;
    --ae-dropdown-fg: #fff;
    --ae-dropdown-item-hover-bg: rgba(255,255,255,0.1);
    --ae-dropdown-item-active-bg: rgba(255,255,255,0.2);
    --ae-dropdown-separator-color: rgba(255,255,255,0.1);
    --ae-dropdown-header-border: 1px solid rgba(255,255,255,0.1);
    --ae-dropdown-section-border: 1px solid rgba(255,255,255,0.1);
  }

  /* Light theme override */
  :host([theme="light"]) {
    --ae-dropdown-bg: #fff;
    --ae-dropdown-fg: #111;
    --ae-dropdown-item-hover-bg: rgba(0,0,0,0.05);
    --ae-dropdown-item-active-bg: rgba(0,0,0,0.1);
    --ae-dropdown-separator-color: rgba(0,0,0,0.1);
    --ae-dropdown-header-border: 1px solid rgba(0,0,0,0.1);
    --ae-dropdown-section-border: 1px solid rgba(0,0,0,0.1);
  }
`;class kn{constructor(e){this.menuElement=null,this.items=[],this.activeIndex=-1,this.typeaheadBuffer="",this.typeaheadTimeout=null,this.handleKeyDown=t=>{switch(t.key){case"ArrowDown":t.preventDefault(),this.moveActive(1);break;case"ArrowUp":t.preventDefault(),this.moveActive(-1);break;case"Home":t.preventDefault(),this.items.length>0&&this.setActiveItem(0);break;case"End":t.preventDefault(),this.items.length>0&&this.setActiveItem(this.items.length-1);break;case"Enter":case" ":t.preventDefault(),this.activeIndex>=0&&this.activeIndex<this.items.length&&this.items[this.activeIndex].click();break;default:t.key.length===1&&!t.ctrlKey&&!t.altKey&&!t.metaKey&&this.handleTypeahead(t.key.toLowerCase())}},this.host=e,e.addController(this)}hostConnected(){}hostDisconnected(){this.cleanup()}setMenu(e){if(!e){this.cleanup();return}this.menuElement=e,this.refresh(),this.menuElement.addEventListener("keydown",this.handleKeyDown)}refresh(){this.menuElement&&(this.items=Array.from(this.menuElement.querySelectorAll('[role="menuitem"]')),this.activeIndex===-1&&this.items.length>0&&this.setActiveItem(0))}setActiveItem(e){if(this.activeIndex>=0&&this.activeIndex<this.items.length){const t=this.items[this.activeIndex];t.tabIndex=-1,t.removeAttribute("data-active"),t.blur()}if(this.activeIndex=e,this.activeIndex>=0&&this.activeIndex<this.items.length){const t=this.items[this.activeIndex];t.tabIndex=0,t.setAttribute("data-active",""),t.focus()}}handleTypeahead(e){this.typeaheadTimeout!==null&&window.clearTimeout(this.typeaheadTimeout),this.typeaheadBuffer+=e,this.typeaheadTimeout=window.setTimeout(()=>{this.typeaheadBuffer="",this.typeaheadTimeout=null},500);const t=this.items.findIndex(o=>{var n;return(((n=o.textContent)==null?void 0:n.trim().toLowerCase())||"").startsWith(this.typeaheadBuffer)});t>=0&&this.setActiveItem(t)}moveActive(e){if(this.items.length===0)return;let t=this.activeIndex+e;t<0?t=this.items.length-1:t>=this.items.length&&(t=0),this.setActiveItem(t)}cleanup(){this.menuElement&&this.menuElement.removeEventListener("keydown",this.handleKeyDown),this.menuElement=null,this.items=[],this.activeIndex=-1,this.typeaheadTimeout!==null&&(window.clearTimeout(this.typeaheadTimeout),this.typeaheadTimeout=null),this.typeaheadBuffer=""}}const At=Math.min,ue=Math.max,Je=Math.round,D=i=>({x:i,y:i}),Sn={left:"right",right:"left",bottom:"top",top:"bottom"},Cn={start:"end",end:"start"};function ci(i,e,t){return ue(i,At(e,t))}function ct(i,e){return typeof i=="function"?i(e):i}function se(i){return i.split("-")[0]}function ht(i){return i.split("-")[1]}function ji(i){return i==="x"?"y":"x"}function Bi(i){return i==="y"?"height":"width"}function te(i){return["top","bottom"].includes(se(i))?"y":"x"}function Vi(i){return ji(te(i))}function Pn(i,e,t){t===void 0&&(t=!1);const o=ht(i),n=Vi(i),s=Bi(n);let r=n==="x"?o===(t?"end":"start")?"right":"left":o==="start"?"bottom":"top";return e.reference[s]>e.floating[s]&&(r=Qe(r)),[r,Qe(r)]}function Tn(i){const e=Qe(i);return[Et(i),e,Et(e)]}function Et(i){return i.replace(/start|end/g,e=>Cn[e])}function On(i,e,t){const o=["left","right"],n=["right","left"],s=["top","bottom"],r=["bottom","top"];switch(i){case"top":case"bottom":return t?e?n:o:e?o:n;case"left":case"right":return e?s:r;default:return[]}}function In(i,e,t,o){const n=ht(i);let s=On(se(i),t==="start",o);return n&&(s=s.map(r=>r+"-"+n),e&&(s=s.concat(s.map(Et)))),s}function Qe(i){return i.replace(/left|right|bottom|top/g,e=>Sn[e])}function Mn(i){return{top:0,right:0,bottom:0,left:0,...i}}function Rn(i){return typeof i!="number"?Mn(i):{top:i,right:i,bottom:i,left:i}}function Ze(i){const{x:e,y:t,width:o,height:n}=i;return{width:o,height:n,top:t,left:e,right:e+o,bottom:t+n,x:e,y:t}}function hi(i,e,t){let{reference:o,floating:n}=i;const s=te(e),r=Vi(e),l=Bi(r),a=se(e),d=s==="y",h=o.x+o.width/2-n.width/2,c=o.y+o.height/2-n.height/2,u=o[l]/2-n[l]/2;let p;switch(a){case"top":p={x:h,y:o.y-n.height};break;case"bottom":p={x:h,y:o.y+o.height};break;case"right":p={x:o.x+o.width,y:c};break;case"left":p={x:o.x-n.width,y:c};break;default:p={x:o.x,y:o.y}}switch(ht(e)){case"start":p[r]-=u*(t&&d?-1:1);break;case"end":p[r]+=u*(t&&d?-1:1);break}return p}const Nn=async(i,e,t)=>{const{placement:o="bottom",strategy:n="absolute",middleware:s=[],platform:r}=t,l=s.filter(Boolean),a=await(r.isRTL==null?void 0:r.isRTL(e));let d=await r.getElementRects({reference:i,floating:e,strategy:n}),{x:h,y:c}=hi(d,o,a),u=o,p={},f=0;for(let g=0;g<l.length;g++){const{name:b,fn:_}=l[g],{x:w,y:S,data:T,reset:R}=await _({x:h,y:c,initialPlacement:o,placement:u,strategy:n,middlewareData:p,rects:d,platform:r,elements:{reference:i,floating:e}});h=w??h,c=S??c,p={...p,[b]:{...p[b],...T}},R&&f<=50&&(f++,typeof R=="object"&&(R.placement&&(u=R.placement),R.rects&&(d=R.rects===!0?await r.getElementRects({reference:i,floating:e,strategy:n}):R.rects),{x:h,y:c}=hi(d,u,a)),g=-1)}return{x:h,y:c,placement:u,strategy:n,middlewareData:p}};async function qi(i,e){var t;e===void 0&&(e={});const{x:o,y:n,platform:s,rects:r,elements:l,strategy:a}=i,{boundary:d="clippingAncestors",rootBoundary:h="viewport",elementContext:c="floating",altBoundary:u=!1,padding:p=0}=ct(e,i),f=Rn(p),g=l[u?c==="floating"?"reference":"floating":c],b=Ze(await s.getClippingRect({element:(t=await(s.isElement==null?void 0:s.isElement(g)))==null||t?g:g.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(l.floating)),boundary:d,rootBoundary:h,strategy:a})),_=c==="floating"?{x:o,y:n,width:r.floating.width,height:r.floating.height}:r.reference,w=await(s.getOffsetParent==null?void 0:s.getOffsetParent(l.floating)),S=await(s.isElement==null?void 0:s.isElement(w))?await(s.getScale==null?void 0:s.getScale(w))||{x:1,y:1}:{x:1,y:1},T=Ze(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:_,offsetParent:w,strategy:a}):_);return{top:(b.top-T.top+f.top)/S.y,bottom:(T.bottom-b.bottom+f.bottom)/S.y,left:(b.left-T.left+f.left)/S.x,right:(T.right-b.right+f.right)/S.x}}const Dn=function(i){return i===void 0&&(i={}),{name:"flip",options:i,async fn(e){var t,o;const{placement:n,middlewareData:s,rects:r,initialPlacement:l,platform:a,elements:d}=e,{mainAxis:h=!0,crossAxis:c=!0,fallbackPlacements:u,fallbackStrategy:p="bestFit",fallbackAxisSideDirection:f="none",flipAlignment:g=!0,...b}=ct(i,e);if((t=s.arrow)!=null&&t.alignmentOffset)return{};const _=se(n),w=te(l),S=se(l)===l,T=await(a.isRTL==null?void 0:a.isRTL(d.floating)),R=u||(S||!g?[Qe(l)]:Tn(l)),Bt=f!=="none";!u&&Bt&&R.push(...In(l,g,f,T));const ao=[l,...R],gt=await qi(e,b),Ve=[];let ce=((o=s.flip)==null?void 0:o.overflows)||[];if(h&&Ve.push(gt[_]),c){const J=Pn(n,r,T);Ve.push(gt[J[0]],gt[J[1]])}if(ce=[...ce,{placement:n,overflows:Ve}],!Ve.every(J=>J<=0)){var Vt,qt;const J=(((Vt=s.flip)==null?void 0:Vt.index)||0)+1,vt=ao[J];if(vt){var Kt;const B=c==="alignment"?w!==te(vt):!1,N=((Kt=ce[0])==null?void 0:Kt.overflows[0])>0;if(!B||N)return{data:{index:J,overflows:ce},reset:{placement:vt}}}let Ee=(qt=ce.filter(B=>B.overflows[0]<=0).sort((B,N)=>B.overflows[1]-N.overflows[1])[0])==null?void 0:qt.placement;if(!Ee)switch(p){case"bestFit":{var Wt;const B=(Wt=ce.filter(N=>{if(Bt){const V=te(N.placement);return V===w||V==="y"}return!0}).map(N=>[N.placement,N.overflows.filter(V=>V>0).reduce((V,lo)=>V+lo,0)]).sort((N,V)=>N[1]-V[1])[0])==null?void 0:Wt[0];B&&(Ee=B);break}case"initialPlacement":Ee=l;break}if(n!==Ee)return{reset:{placement:Ee}}}return{}}}};async function Ln(i,e){const{placement:t,platform:o,elements:n}=i,s=await(o.isRTL==null?void 0:o.isRTL(n.floating)),r=se(t),l=ht(t),a=te(t)==="y",d=["left","top"].includes(r)?-1:1,h=s&&a?-1:1,c=ct(e,i);let{mainAxis:u,crossAxis:p,alignmentAxis:f}=typeof c=="number"?{mainAxis:c,crossAxis:0,alignmentAxis:null}:{mainAxis:c.mainAxis||0,crossAxis:c.crossAxis||0,alignmentAxis:c.alignmentAxis};return l&&typeof f=="number"&&(p=l==="end"?f*-1:f),a?{x:p*h,y:u*d}:{x:u*d,y:p*h}}const Un=function(i){return i===void 0&&(i=0),{name:"offset",options:i,async fn(e){var t,o;const{x:n,y:s,placement:r,middlewareData:l}=e,a=await Ln(e,i);return r===((t=l.offset)==null?void 0:t.placement)&&(o=l.arrow)!=null&&o.alignmentOffset?{}:{x:n+a.x,y:s+a.y,data:{...a,placement:r}}}}},Hn=function(i){return i===void 0&&(i={}),{name:"shift",options:i,async fn(e){const{x:t,y:o,placement:n}=e,{mainAxis:s=!0,crossAxis:r=!1,limiter:l={fn:b=>{let{x:_,y:w}=b;return{x:_,y:w}}},...a}=ct(i,e),d={x:t,y:o},h=await qi(e,a),c=te(se(n)),u=ji(c);let p=d[u],f=d[c];if(s){const b=u==="y"?"top":"left",_=u==="y"?"bottom":"right",w=p+h[b],S=p-h[_];p=ci(w,p,S)}if(r){const b=c==="y"?"top":"left",_=c==="y"?"bottom":"right",w=f+h[b],S=f-h[_];f=ci(w,f,S)}const g=l.fn({...e,[u]:p,[c]:f});return{...g,data:{x:g.x-t,y:g.y-o,enabled:{[u]:s,[c]:r}}}}}};function pt(){return typeof window<"u"}function Ae(i){return Ki(i)?(i.nodeName||"").toLowerCase():"#document"}function C(i){var e;return(i==null||(e=i.ownerDocument)==null?void 0:e.defaultView)||window}function z(i){var e;return(e=(Ki(i)?i.ownerDocument:i.document)||window.document)==null?void 0:e.documentElement}function Ki(i){return pt()?i instanceof Node||i instanceof C(i).Node:!1}function O(i){return pt()?i instanceof Element||i instanceof C(i).Element:!1}function U(i){return pt()?i instanceof HTMLElement||i instanceof C(i).HTMLElement:!1}function pi(i){return!pt()||typeof ShadowRoot>"u"?!1:i instanceof ShadowRoot||i instanceof C(i).ShadowRoot}function je(i){const{overflow:e,overflowX:t,overflowY:o,display:n}=I(i);return/auto|scroll|overlay|hidden|clip/.test(e+o+t)&&!["inline","contents"].includes(n)}function zn(i){return["table","td","th"].includes(Ae(i))}function ut(i){return[":popover-open",":modal"].some(e=>{try{return i.matches(e)}catch{return!1}})}function Ut(i){const e=Ht(),t=O(i)?I(i):i;return["transform","translate","scale","rotate","perspective"].some(o=>t[o]?t[o]!=="none":!1)||(t.containerType?t.containerType!=="normal":!1)||!e&&(t.backdropFilter?t.backdropFilter!=="none":!1)||!e&&(t.filter?t.filter!=="none":!1)||["transform","translate","scale","rotate","perspective","filter"].some(o=>(t.willChange||"").includes(o))||["paint","layout","strict","content"].some(o=>(t.contain||"").includes(o))}function jn(i){let e=G(i);for(;U(e)&&!ye(e);){if(Ut(e))return e;if(ut(e))return null;e=G(e)}return null}function Ht(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function ye(i){return["html","body","#document"].includes(Ae(i))}function I(i){return C(i).getComputedStyle(i)}function ft(i){return O(i)?{scrollLeft:i.scrollLeft,scrollTop:i.scrollTop}:{scrollLeft:i.scrollX,scrollTop:i.scrollY}}function G(i){if(Ae(i)==="html")return i;const e=i.assignedSlot||i.parentNode||pi(i)&&i.host||z(i);return pi(e)?e.host:e}function Wi(i){const e=G(i);return ye(e)?i.ownerDocument?i.ownerDocument.body:i.body:U(e)&&je(e)?e:Wi(e)}function Fi(i,e,t){var o;e===void 0&&(e=[]);const n=Wi(i),s=n===((o=i.ownerDocument)==null?void 0:o.body),r=C(n);return s?(kt(r),e.concat(r,r.visualViewport||[],je(n)?n:[],[])):e.concat(n,Fi(n,[]))}function kt(i){return i.parent&&Object.getPrototypeOf(i.parent)?i.frameElement:null}function Gi(i){const e=I(i);let t=parseFloat(e.width)||0,o=parseFloat(e.height)||0;const n=U(i),s=n?i.offsetWidth:t,r=n?i.offsetHeight:o,l=Je(t)!==s||Je(o)!==r;return l&&(t=s,o=r),{width:t,height:o,$:l}}function Ji(i){return O(i)?i:i.contextElement}function fe(i){const e=Ji(i);if(!U(e))return D(1);const t=e.getBoundingClientRect(),{width:o,height:n,$:s}=Gi(e);let r=(s?Je(t.width):t.width)/o,l=(s?Je(t.height):t.height)/n;return(!r||!Number.isFinite(r))&&(r=1),(!l||!Number.isFinite(l))&&(l=1),{x:r,y:l}}const Bn=D(0);function Qi(i){const e=C(i);return!Ht()||!e.visualViewport?Bn:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function Vn(i,e,t){return e===void 0&&(e=!1),!t||e&&t!==C(i)?!1:e}function Re(i,e,t,o){e===void 0&&(e=!1),t===void 0&&(t=!1);const n=i.getBoundingClientRect(),s=Ji(i);let r=D(1);e&&(o?O(o)&&(r=fe(o)):r=fe(i));const l=Vn(s,t,o)?Qi(s):D(0);let a=(n.left+l.x)/r.x,d=(n.top+l.y)/r.y,h=n.width/r.x,c=n.height/r.y;if(s){const u=C(s),p=o&&O(o)?C(o):o;let f=u,g=kt(f);for(;g&&o&&p!==f;){const b=fe(g),_=g.getBoundingClientRect(),w=I(g),S=_.left+(g.clientLeft+parseFloat(w.paddingLeft))*b.x,T=_.top+(g.clientTop+parseFloat(w.paddingTop))*b.y;a*=b.x,d*=b.y,h*=b.x,c*=b.y,a+=S,d+=T,f=C(g),g=kt(f)}}return Ze({width:h,height:c,x:a,y:d})}function zt(i,e){const t=ft(i).scrollLeft;return e?e.left+t:Re(z(i)).left+t}function Zi(i,e,t){t===void 0&&(t=!1);const o=i.getBoundingClientRect(),n=o.left+e.scrollLeft-(t?0:zt(i,o)),s=o.top+e.scrollTop;return{x:n,y:s}}function qn(i){let{elements:e,rect:t,offsetParent:o,strategy:n}=i;const s=n==="fixed",r=z(o),l=e?ut(e.floating):!1;if(o===r||l&&s)return t;let a={scrollLeft:0,scrollTop:0},d=D(1);const h=D(0),c=U(o);if((c||!c&&!s)&&((Ae(o)!=="body"||je(r))&&(a=ft(o)),U(o))){const p=Re(o);d=fe(o),h.x=p.x+o.clientLeft,h.y=p.y+o.clientTop}const u=r&&!c&&!s?Zi(r,a,!0):D(0);return{width:t.width*d.x,height:t.height*d.y,x:t.x*d.x-a.scrollLeft*d.x+h.x+u.x,y:t.y*d.y-a.scrollTop*d.y+h.y+u.y}}function Kn(i){return Array.from(i.getClientRects())}function Wn(i){const e=z(i),t=ft(i),o=i.ownerDocument.body,n=ue(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth),s=ue(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight);let r=-t.scrollLeft+zt(i);const l=-t.scrollTop;return I(o).direction==="rtl"&&(r+=ue(e.clientWidth,o.clientWidth)-n),{width:n,height:s,x:r,y:l}}function Fn(i,e){const t=C(i),o=z(i),n=t.visualViewport;let s=o.clientWidth,r=o.clientHeight,l=0,a=0;if(n){s=n.width,r=n.height;const d=Ht();(!d||d&&e==="fixed")&&(l=n.offsetLeft,a=n.offsetTop)}return{width:s,height:r,x:l,y:a}}function Gn(i,e){const t=Re(i,!0,e==="fixed"),o=t.top+i.clientTop,n=t.left+i.clientLeft,s=U(i)?fe(i):D(1),r=i.clientWidth*s.x,l=i.clientHeight*s.y,a=n*s.x,d=o*s.y;return{width:r,height:l,x:a,y:d}}function ui(i,e,t){let o;if(e==="viewport")o=Fn(i,t);else if(e==="document")o=Wn(z(i));else if(O(e))o=Gn(e,t);else{const n=Qi(i);o={x:e.x-n.x,y:e.y-n.y,width:e.width,height:e.height}}return Ze(o)}function Xi(i,e){const t=G(i);return t===e||!O(t)||ye(t)?!1:I(t).position==="fixed"||Xi(t,e)}function Jn(i,e){const t=e.get(i);if(t)return t;let o=Fi(i,[]).filter(l=>O(l)&&Ae(l)!=="body"),n=null;const s=I(i).position==="fixed";let r=s?G(i):i;for(;O(r)&&!ye(r);){const l=I(r),a=Ut(r);!a&&l.position==="fixed"&&(n=null),(s?!a&&!n:!a&&l.position==="static"&&n&&["absolute","fixed"].includes(n.position)||je(r)&&!a&&Xi(i,r))?o=o.filter(d=>d!==r):n=l,r=G(r)}return e.set(i,o),o}function Qn(i){let{element:e,boundary:t,rootBoundary:o,strategy:n}=i;const s=[...t==="clippingAncestors"?ut(e)?[]:Jn(e,this._c):[].concat(t),o],r=s[0],l=s.reduce((a,d)=>{const h=ui(e,d,n);return a.top=ue(h.top,a.top),a.right=At(h.right,a.right),a.bottom=At(h.bottom,a.bottom),a.left=ue(h.left,a.left),a},ui(e,r,n));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function Zn(i){const{width:e,height:t}=Gi(i);return{width:e,height:t}}function Xn(i,e,t){const o=U(e),n=z(e),s=t==="fixed",r=Re(i,!0,s,e);let l={scrollLeft:0,scrollTop:0};const a=D(0);function d(){a.x=zt(n)}if(o||!o&&!s)if((Ae(e)!=="body"||je(n))&&(l=ft(e)),o){const p=Re(e,!0,s,e);a.x=p.x+e.clientLeft,a.y=p.y+e.clientTop}else n&&d();s&&!o&&n&&d();const h=n&&!o&&!s?Zi(n,l):D(0),c=r.left+l.scrollLeft-a.x-h.x,u=r.top+l.scrollTop-a.y-h.y;return{x:c,y:u,width:r.width,height:r.height}}function yt(i){return I(i).position==="static"}function fi(i,e){if(!U(i)||I(i).position==="fixed")return null;if(e)return e(i);let t=i.offsetParent;return z(i)===t&&(t=t.ownerDocument.body),t}function Yi(i,e){const t=C(i);if(ut(i))return t;if(!U(i)){let n=G(i);for(;n&&!ye(n);){if(O(n)&&!yt(n))return n;n=G(n)}return t}let o=fi(i,e);for(;o&&zn(o)&&yt(o);)o=fi(o,e);return o&&ye(o)&&yt(o)&&!Ut(o)?t:o||jn(i)||t}const Yn=async function(i){const e=this.getOffsetParent||Yi,t=this.getDimensions,o=await t(i.floating);return{reference:Xn(i.reference,await e(i.floating),i.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function es(i){return I(i).direction==="rtl"}const ts={convertOffsetParentRelativeRectToViewportRelativeRect:qn,getDocumentElement:z,getClippingRect:Qn,getOffsetParent:Yi,getElementRects:Yn,getClientRects:Kn,getDimensions:Zn,getScale:fe,isElement:O,isRTL:es},is=Un,os=Hn,ns=Dn,ss=(i,e,t)=>{const o=new Map,n={platform:ts,...t},s={...n.platform,_c:o};return Nn(i,e,{...n,platform:s})};async function rs(i,e,t="bottom-start",o="absolute",n=4){const s=new AbortController,{signal:r}=s;try{Object.assign(e.style,{position:o,visibility:"hidden",top:"0",left:"0",margin:"0",zIndex:"9999"});const{x:l,y:a}=await ss(i,e,{placement:t,strategy:o,middleware:[is(n),ns({padding:8}),os({padding:8})]});if(r.aborted)return()=>{};Object.assign(e.style,{position:o,left:`${l}px`,top:`${a}px`,margin:"0",visibility:"visible"})}catch(l){console.error("Error positioning dropdown:",l)}return()=>s.abort()}var as=Object.defineProperty,ls=Object.getOwnPropertyDescriptor,$=(i,e,t,o)=>{for(var n=o>1?void 0:o?ls(e,t):e,s=i.length-1,r;s>=0;s--)(r=i[s])&&(n=(o?r(e,t,n):r(n))||n);return o&&n&&as(e,t,n),n};let E=class extends x{constructor(){super(...arguments),this.open=!1,this.defaultOpen=!1,this.placement="bottom-start",this.strategy="absolute",this.disabled=!1,this.theme="dark",this.header="",this.isControlled=!1,this.internalOpen=!1,this.positionCleanup=null,this.keyboardController=new kn(this),this.handleTriggerClick=i=>{i.stopPropagation(),!this.disabled&&this.toggleOpen(!this.isOpen)},this.handleItemClick=(i,e)=>{i.stopPropagation(),this.dispatchEvent(new CustomEvent("ae-select",{detail:{value:e},bubbles:!0,composed:!0})),this.toggleOpen(!1)},this.handleClickOutside=i=>{var e;if(!this.isOpen)return;const t=i.target;this.contains(t)||(e=this.overlayEl)!=null&&e.contains(t)||this.toggleOpen(!1)},this.handleKeyDown=i=>{this.isOpen&&i.key==="Escape"&&(i.preventDefault(),this.toggleOpen(!1))}}connectedCallback(){super.connectedCallback(),this.isControlled=this.hasAttribute("open"),this.isControlled||(this.internalOpen=this.defaultOpen),document.addEventListener("click",this.handleClickOutside),document.addEventListener("keydown",this.handleKeyDown)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.handleClickOutside),document.removeEventListener("keydown",this.handleKeyDown),this.cleanupPositioning()}updated(i){(i.has("open")||i.has("internalOpen"))&&(this.isOpen?this.handleOpen():(this.cleanupPositioning(),this.keyboardController.setMenu(null)))}get isOpen(){return this.isControlled?this.open:this.internalOpen}async handleOpen(){!this.overlayEl||!this.triggerEl||(this.overlayEl.style.visibility="visible",this.overlayEl.style.zIndex="9999",this.positionMenu(),this.keyboardController.setMenu(this.menuEl))}async positionMenu(){if(this.cleanupPositioning(),!(!this.overlayEl||!this.triggerEl))try{const i=await rs(this.triggerEl,this.overlayEl,this.placement,this.strategy);this.positionCleanup=i}catch(i){console.error("Error positioning dropdown menu:",i)}}cleanupPositioning(){this.positionCleanup&&(this.positionCleanup(),this.positionCleanup=null)}toggleOpen(i){this.disabled||(this.isControlled?this.dispatchEvent(new CustomEvent("ae-open-change",{detail:{open:i},bubbles:!0,composed:!0})):this.internalOpen=i)}render(){const i=this.isOpen;return v`
      <div class="trigger" part="trigger" @click=${this.handleTriggerClick}>
        <slot></slot>
      </div>

      ${i?v`
        <div class="overlay" part="overlay">
          ${this.header?v`
            <div class="header" part="header">
              ${this.header}
            </div>
          `:y}
          
          <div 
            class="menu" 
            part="menu" 
            role="menu" 
            tabindex="-1"
            aria-orientation="vertical"
          >
            <slot name="item" @click=${e=>{const t=e.target.closest('[role="menuitem"]');if(t){const o=t.getAttribute("data-value")||"";this.handleItemClick(e,o)}}}></slot>
          </div>
        </div>
      `:y}
    `}};E.styles=En;$([m({type:Boolean,reflect:!0})],E.prototype,"open",2);$([m({type:Boolean,attribute:"default-open"})],E.prototype,"defaultOpen",2);$([m({type:String})],E.prototype,"placement",2);$([m({type:String})],E.prototype,"strategy",2);$([m({type:Boolean,reflect:!0})],E.prototype,"disabled",2);$([m({type:String,reflect:!0})],E.prototype,"theme",2);$([m({type:String})],E.prototype,"header",2);$([H(".trigger")],E.prototype,"triggerEl",2);$([H(".overlay")],E.prototype,"overlayEl",2);$([H('[role="menu"]')],E.prototype,"menuEl",2);$([Nt()],E.prototype,"isControlled",2);$([Nt()],E.prototype,"internalOpen",2);E=$([M("ae-dropdown")],E);let re=class extends x{constructor(){super(...arguments),this.value="",this.disabled=!1,this.hasSubmenu=!1}render(){return v`
      <button 
        role="menuitem" 
        part="item"
        ?disabled=${this.disabled}
        data-value=${this.value}
        tabindex="-1"
      >
        <div part="item-content">
          <slot name="icon" part="item-icon"></slot>
          <slot></slot>
        </div>
        <slot name="hint" part="item-hint"></slot>
        ${this.hasSubmenu?v`
          <span part="item-submenu-indicator">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M6 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        `:y}
      </button>
    `}};re.styles=k`
    :host {
      display: contents;
    }
  `;$([m()],re.prototype,"value",2);$([m({type:Boolean,reflect:!0})],re.prototype,"disabled",2);$([m({type:Boolean,attribute:"has-submenu"})],re.prototype,"hasSubmenu",2);re=$([M("ae-menu-item")],re);let Xe=class extends x{render(){return v`<hr role="separator" part="separator">`}};Xe.styles=k`
    :host {
      display: contents;
    }
  `;Xe=$([M("ae-menu-separator")],Xe);let Ne=class extends x{constructor(){super(...arguments),this.title=""}render(){return v`
      <div role="group" part="section">
        ${this.title?v`<div part="section-title">${this.title}</div>`:y}
        <slot></slot>
      </div>
    `}};Ne.styles=k`
    :host {
      display: contents;
    }
  `;$([m()],Ne.prototype,"title",2);Ne=$([M("ae-menu-section")],Ne);function ds(){customElements.get("ae-dropdown")||customElements.define("ae-dropdown",E),customElements.get("ae-menu-item")||customElements.define("ae-menu-item",re),customElements.get("ae-menu-separator")||customElements.define("ae-menu-separator",Xe),customElements.get("ae-menu-section")||customElements.define("ae-menu-section",Ne)}class cs{constructor(e){this.root=null,this.nodes=[],this.visibleNodes=[],this.expandedIds=new Set,this.selectedIds=new Set,this.activeIndex=-1,this.selectionMode="single",this.searchTimeout=null,this.searchQuery="",this.handleKeyDown=t=>{const o=this.getActiveNode();if(o)switch(t.key){case"ArrowDown":t.preventDefault(),this.moveDown();break;case"ArrowUp":t.preventDefault(),this.moveUp();break;case"ArrowRight":t.preventDefault(),o.hasChildren&&(this.isExpanded(o.id)?this.moveDown():this.toggleExpand(o.id,!0));break;case"ArrowLeft":t.preventDefault(),o.hasChildren&&this.isExpanded(o.id)?this.toggleExpand(o.id,!1):o.parentId&&this.setActiveNodeById(o.parentId);break;case"Home":t.preventDefault(),this.moveToFirst();break;case"End":t.preventDefault(),this.moveToLast();break;case"Enter":case" ":t.preventDefault(),this.toggleSelection(o.id);break;case"*":t.preventDefault(),this.expandSiblings(o);break;default:t.key.length===1&&!t.ctrlKey&&!t.altKey&&!t.metaKey&&this.handleTypeahead(t.key)}},this.host=e,e.addController(this)}hostConnected(){}hostDisconnected(){this.cleanup()}setRoot(e){this.root=e,this.root.addEventListener("keydown",this.handleKeyDown)}setData(e,t,o,n){this.expandedIds=new Set(t),this.selectedIds=new Set(o),this.selectionMode=n,this.nodes=this.flattenTree(e),this.updateVisibleNodes(),this.visibleNodes.length>0&&this.activeIndex===-1&&(this.activeIndex=0)}setExpandedIds(e){this.expandedIds=new Set(e),this.updateVisibleNodes()}setSelectedIds(e){this.selectedIds=new Set(e)}getActiveNode(){return this.activeIndex>=0&&this.activeIndex<this.visibleNodes.length?this.visibleNodes[this.activeIndex]:null}setActiveNodeById(e){const t=this.visibleNodes.findIndex(o=>o.id===e);return t>=0?(this.activeIndex=t,!0):!1}handleTypeahead(e){this.searchTimeout!==null&&window.clearTimeout(this.searchTimeout),this.searchQuery+=e.toLowerCase(),this.searchTimeout=window.setTimeout(()=>{this.searchQuery="",this.searchTimeout=null},500);const t=(this.activeIndex+1)%this.visibleNodes.length;for(let o=0;o<this.visibleNodes.length;o++){const n=(t+o)%this.visibleNodes.length;if(this.visibleNodes[n].label.toLowerCase().startsWith(this.searchQuery)){this.activeIndex=n;break}}}moveDown(){this.activeIndex<this.visibleNodes.length-1&&this.activeIndex++}moveUp(){this.activeIndex>0&&this.activeIndex--}moveToFirst(){this.visibleNodes.length>0&&(this.activeIndex=0)}moveToLast(){this.visibleNodes.length>0&&(this.activeIndex=this.visibleNodes.length-1)}isExpanded(e){return this.expandedIds.has(e)}isSelected(e){return this.selectedIds.has(e)}toggleExpand(e,t){const o=new Set(this.expandedIds);(t!==void 0?t:!o.has(e))?o.add(e):o.delete(e),this.host.dispatchEvent(new CustomEvent("ae-expand-change",{detail:{expanded:Array.from(o)},bubbles:!0,composed:!0})),this.expandedIds=o,this.updateVisibleNodes()}toggleSelection(e,t){const o=new Set(this.selectedIds),n=t!==void 0?t:!o.has(e);this.selectionMode==="single"?(o.clear(),n&&o.add(e)):n?o.add(e):o.delete(e),this.host.dispatchEvent(new CustomEvent("ae-select",{detail:{selected:Array.from(o)},bubbles:!0,composed:!0})),this.selectedIds=o}expandSiblings(e){const t=this.nodes.filter(n=>n.level===e.level&&n.parentId===e.parentId&&n.hasChildren),o=new Set(this.expandedIds);t.forEach(n=>{o.add(n.id)}),this.host.dispatchEvent(new CustomEvent("ae-expand-change",{detail:{expanded:Array.from(o)},bubbles:!0,composed:!0})),this.expandedIds=o,this.updateVisibleNodes()}flattenTree(e,t=0,o=null){const n=[];let s=0;return e.forEach(r=>{var l,a;n.push({id:r.id,label:r.label,level:t,hasChildren:!!((l=r.children)!=null&&l.length),parentId:o,index:s++}),(a=r.children)!=null&&a.length&&n.push(...this.flattenTree(r.children,t+1,r.id))}),n}updateVisibleNodes(){this.visibleNodes=[],this.nodes.filter(e=>e.level===0).forEach(e=>{this.addVisibleNode(e)}),this.activeIndex>=this.visibleNodes.length&&(this.activeIndex=Math.max(0,this.visibleNodes.length-1))}addVisibleNode(e){this.visibleNodes.push(e),e.hasChildren&&this.expandedIds.has(e.id)&&this.nodes.filter(t=>t.parentId===e.id).forEach(t=>{this.addVisibleNode(t)})}cleanup(){this.root&&this.root.removeEventListener("keydown",this.handleKeyDown),this.searchTimeout!==null&&window.clearTimeout(this.searchTimeout)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ye=globalThis,et=Ye.trustedTypes,mi=et?et.createPolicy("lit-html",{createHTML:i=>i}):void 0,eo="$lit$",K=`lit$${Math.random().toFixed(9).slice(2)}$`,to="?"+K,hs=`<${to}>`,ae=document,tt=()=>ae.createComment(""),De=i=>i===null||typeof i!="object"&&typeof i!="function",jt=Array.isArray,ps=i=>jt(i)||typeof i?.[Symbol.iterator]=="function",wt=`[ 	
\f\r]`,Ce=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,gi=/-->/g,vi=/>/g,Z=RegExp(`>|${wt}(?:([^\\s"'>=/]+)(${wt}*=${wt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),bi=/'/g,yi=/"/g,io=/^(?:script|style|textarea|title)$/i,we=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),wi=new WeakMap,ee=ae.createTreeWalker(ae,129);function oo(i,e){if(!jt(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return mi!==void 0?mi.createHTML(e):e}const us=(i,e)=>{const t=i.length-1,o=[];let n,s=e===2?"<svg>":e===3?"<math>":"",r=Ce;for(let l=0;l<t;l++){const a=i[l];let d,h,c=-1,u=0;for(;u<a.length&&(r.lastIndex=u,h=r.exec(a),h!==null);)u=r.lastIndex,r===Ce?h[1]==="!--"?r=gi:h[1]!==void 0?r=vi:h[2]!==void 0?(io.test(h[2])&&(n=RegExp("</"+h[2],"g")),r=Z):h[3]!==void 0&&(r=Z):r===Z?h[0]===">"?(r=n??Ce,c=-1):h[1]===void 0?c=-2:(c=r.lastIndex-h[2].length,d=h[1],r=h[3]===void 0?Z:h[3]==='"'?yi:bi):r===yi||r===bi?r=Z:r===gi||r===vi?r=Ce:(r=Z,n=void 0);const p=r===Z&&i[l+1].startsWith("/>")?" ":"";s+=r===Ce?a+hs:c>=0?(o.push(d),a.slice(0,c)+eo+a.slice(c)+K+p):a+K+(c===-2?l:p)}return[oo(i,s+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]};class Le{constructor({strings:e,_$litType$:t},o){let n;this.parts=[];let s=0,r=0;const l=e.length-1,a=this.parts,[d,h]=us(e,t);if(this.el=Le.createElement(d,o),ee.currentNode=this.el.content,t===2||t===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(n=ee.nextNode())!==null&&a.length<l;){if(n.nodeType===1){if(n.hasAttributes())for(const c of n.getAttributeNames())if(c.endsWith(eo)){const u=h[r++],p=n.getAttribute(c).split(K),f=/([.?@])?(.*)/.exec(u);a.push({type:1,index:s,name:f[2],strings:p,ctor:f[1]==="."?ms:f[1]==="?"?gs:f[1]==="@"?vs:mt}),n.removeAttribute(c)}else c.startsWith(K)&&(a.push({type:6,index:s}),n.removeAttribute(c));if(io.test(n.tagName)){const c=n.textContent.split(K),u=c.length-1;if(u>0){n.textContent=et?et.emptyScript:"";for(let p=0;p<u;p++)n.append(c[p],tt()),ee.nextNode(),a.push({type:2,index:++s});n.append(c[u],tt())}}}else if(n.nodeType===8)if(n.data===to)a.push({type:2,index:s});else{let c=-1;for(;(c=n.data.indexOf(K,c+1))!==-1;)a.push({type:7,index:s}),c+=K.length-1}s++}}static createElement(e,t){const o=ae.createElement("template");return o.innerHTML=e,o}}function xe(i,e,t=i,o){var n,s,r;if(e===we)return e;let l=o!==void 0?(n=t._$Co)==null?void 0:n[o]:t._$Cl;const a=De(e)?void 0:e._$litDirective$;return l?.constructor!==a&&((s=l?._$AO)==null||s.call(l,!1),a===void 0?l=void 0:(l=new a(i),l._$AT(i,t,o)),o!==void 0?((r=t._$Co)!=null?r:t._$Co=[])[o]=l:t._$Cl=l),l!==void 0&&(e=xe(i,l._$AS(i,e.values),l,o)),e}let fs=class{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){var e;const{el:{content:t},parts:o}=this._$AD,n=((e=i?.creationScope)!=null?e:ae).importNode(t,!0);ee.currentNode=n;let s=ee.nextNode(),r=0,l=0,a=o[0];for(;a!==void 0;){if(r===a.index){let d;a.type===2?d=new Be(s,s.nextSibling,this,i):a.type===1?d=new a.ctor(s,a.name,a.strings,this,i):a.type===6&&(d=new bs(s,this,i)),this._$AV.push(d),a=o[++l]}r!==a?.index&&(s=ee.nextNode(),r++)}return ee.currentNode=ae,n}p(i){let e=0;for(const t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(i,t,e),e+=t.strings.length-2):t._$AI(i[e])),e++}};class Be{get _$AU(){var e,t;return(t=(e=this._$AM)==null?void 0:e._$AU)!=null?t:this._$Cv}constructor(e,t,o,n){var s;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=n,this._$Cv=(s=n?.isConnected)!=null?s:!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=xe(this,e,t),De(e)?e===A||e==null||e===""?(this._$AH!==A&&this._$AR(),this._$AH=A):e!==this._$AH&&e!==we&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ps(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==A&&De(this._$AH)?this._$AA.nextSibling.data=e:this.T(ae.createTextNode(e)),this._$AH=e}$(e){var t;const{values:o,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Le.createElement(oo(n.h,n.h[0]),this.options)),n);if(((t=this._$AH)==null?void 0:t._$AD)===s)this._$AH.p(o);else{const r=new fs(s,this),l=r.u(this.options);r.p(o),this.T(l),this._$AH=r}}_$AC(e){let t=wi.get(e.strings);return t===void 0&&wi.set(e.strings,t=new Le(e)),t}k(e){jt(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,n=0;for(const s of e)n===t.length?t.push(o=new Be(this.O(tt()),this.O(tt()),this,this.options)):o=t[n],o._$AI(s),n++;n<t.length&&(this._$AR(o&&o._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var o;for((o=this._$AP)==null?void 0:o.call(this,!1,!0,t);e&&e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class mt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,n,s){this.type=1,this._$AH=A,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=s,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=A}_$AI(e,t=this,o,n){const s=this.strings;let r=!1;if(s===void 0)e=xe(this,e,t,0),r=!De(e)||e!==this._$AH&&e!==we,r&&(this._$AH=e);else{const l=e;let a,d;for(e=s[0],a=0;a<s.length-1;a++)d=xe(this,l[o+a],t,a),d===we&&(d=this._$AH[a]),r||(r=!De(d)||d!==this._$AH[a]),d===A?e=A:e!==A&&(e+=(d??"")+s[a+1]),this._$AH[a]=d}r&&!n&&this.j(e)}j(e){e===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ms extends mt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===A?void 0:e}}class gs extends mt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==A)}}class vs extends mt{constructor(e,t,o,n,s){super(e,t,o,n,s),this.type=5}_$AI(e,t=this){var o;if((e=(o=xe(this,e,t,0))!=null?o:A)===we)return;const n=this._$AH,s=e===A&&n!==A||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,r=e!==A&&(n===A||s);s&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,o;typeof this._$AH=="function"?this._$AH.call((o=(t=this.options)==null?void 0:t.host)!=null?o:this.element,e):this._$AH.handleEvent(e)}}class bs{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){xe(this,e)}}const ys={I:Be},xi=Ye.litHtmlPolyfillSupport;var $i;xi?.(Le,Be),(($i=Ye.litHtmlVersions)!=null?$i:Ye.litHtmlVersions=[]).push("3.3.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ws={CHILD:2},xs=i=>(...e)=>({_$litDirective$:i,values:e});class $s{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,o){this._$Ct=e,this._$AM=t,this._$Ci=o}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:_s}=ys,_i=()=>document.createComment(""),Pe=(i,e,t)=>{var o;const n=i._$AA.parentNode,s=e===void 0?i._$AB:e._$AA;if(t===void 0){const r=n.insertBefore(_i(),s),l=n.insertBefore(_i(),s);t=new _s(r,l,i,i.options)}else{const r=t._$AB.nextSibling,l=t._$AM,a=l!==i;if(a){let d;(o=t._$AQ)==null||o.call(t,i),t._$AM=i,t._$AP!==void 0&&(d=i._$AU)!==l._$AU&&t._$AP(d)}if(r!==s||a){let d=t._$AA;for(;d!==r;){const h=d.nextSibling;n.insertBefore(d,s),d=h}}}return t},X=(i,e,t=i)=>(i._$AI(e,t),i),As={},Es=(i,e=As)=>i._$AH=e,ks=i=>i._$AH,xt=i=>{var e;(e=i._$AP)==null||e.call(i,!1,!0);let t=i._$AA;const o=i._$AB.nextSibling;for(;t!==o;){const n=t.nextSibling;t.remove(),t=n}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ai=(i,e,t)=>{const o=new Map;for(let n=e;n<=t;n++)o.set(i[n],n);return o},no=xs(class extends $s{constructor(i){if(super(i),i.type!==ws.CHILD)throw Error("repeat() can only be used in text expressions")}dt(i,e,t){let o;t===void 0?t=e:e!==void 0&&(o=e);const n=[],s=[];let r=0;for(const l of i)n[r]=o?o(l,r):r,s[r]=t(l,r),r++;return{values:s,keys:n}}render(i,e,t){return this.dt(i,e,t).values}update(i,[e,t,o]){var n;const s=ks(i),{values:r,keys:l}=this.dt(e,t,o);if(!Array.isArray(s))return this.ut=l,r;const a=(n=this.ut)!=null?n:this.ut=[],d=[];let h,c,u=0,p=s.length-1,f=0,g=r.length-1;for(;u<=p&&f<=g;)if(s[u]===null)u++;else if(s[p]===null)p--;else if(a[u]===l[f])d[f]=X(s[u],r[f]),u++,f++;else if(a[p]===l[g])d[g]=X(s[p],r[g]),p--,g--;else if(a[u]===l[g])d[g]=X(s[u],r[g]),Pe(i,d[g+1],s[u]),u++,g--;else if(a[p]===l[f])d[f]=X(s[p],r[f]),Pe(i,s[u],s[p]),p--,f++;else if(h===void 0&&(h=Ai(l,f,g),c=Ai(a,u,p)),h.has(a[u]))if(h.has(a[p])){const b=c.get(l[f]),_=b!==void 0?s[b]:null;if(_===null){const w=Pe(i,s[u]);X(w,r[f]),d[f]=w}else d[f]=X(_,r[f]),Pe(i,s[u],_),s[b]=null;f++}else xt(s[p]),p--;else xt(s[u]),u++;for(;f<=g;){const b=Pe(i,d[g+1]);X(b,r[f]),d[f++]=b}for(;u<=p;){const b=s[u++];b!==null&&xt(b)}return this.ut=l,Es(i,d),we}}),Ss=k`
  :host { 
    display: block;
    contain: content;
  }

  /* Use a roving tabindex container */
  .treeview {
    outline: none;
  }

  /* Node styling */
  ::part(node) {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.375rem 0.25rem;
    cursor: pointer;
    user-select: none;
    border-radius: var(--ae-treeview-node-radius, 4px);
    font-size: var(--ae-treeview-font-size, inherit);
  }

  ::part(node):hover {
    background: var(--ae-treeview-row-hover-bg, #f3f4f6);
  }

  ::part(node):focus-visible {
    outline: 2px solid var(--ae-treeview-focus-color, #4f46e5);
    outline-offset: 1px;
  }

  ::part(node)[aria-selected="true"] {
    background: var(--ae-treeview-row-selected-bg, #e0e7ff);
    color: var(--ae-treeview-row-selected-fg, #3730a3);
  }

  /* Caret styling */
  ::part(caret) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--ae-treeview-caret-size, 16px);
    height: var(--ae-treeview-caret-size, 16px);
    transition: transform 120ms ease;
    color: var(--ae-treeview-caret-color, currentColor);
    opacity: 0.7;
  }

  ::part(caret)[aria-expanded="true"] {
    transform: rotate(90deg);
    opacity: 1;
    color: var(--ae-treeview-caret-open, currentColor);
  }

  ::part(caret-spacer) {
    width: var(--ae-treeview-caret-size, 16px);
    height: var(--ae-treeview-caret-size, 16px);
  }

  /* Label styling */
  ::part(label) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
  }

  /* Subtree styling */
  ::part(subtree) {
    margin-left: var(--ae-treeview-indent, 16px);
  }

  /* Checkbox / Multi-select styling */
  ::part(checkbox) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--ae-treeview-checkbox-size, 16px);
    height: var(--ae-treeview-checkbox-size, 16px);
    margin-right: 4px;
    border-radius: var(--ae-treeview-checkbox-radius, 3px);
    border: 1px solid var(--ae-treeview-checkbox-border, #d1d5db);
    background: var(--ae-treeview-checkbox-bg, white);
  }

  ::part(node)[aria-selected="true"] ::part(checkbox) {
    background: var(--ae-treeview-checkbox-selected-bg, #4f46e5);
    border-color: var(--ae-treeview-checkbox-selected-border, #4338ca);
  }

  ::part(node)[aria-selected="true"] ::part(checkbox)::before {
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    background: white;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  /* Icon support */
  ::part(icon) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--ae-treeview-icon-size, 18px);
    height: var(--ae-treeview-icon-size, 18px);
    margin-right: 4px;
    color: var(--ae-treeview-icon-color, currentColor);
  }

  /* Empty state */
  .empty-state {
    padding: 1rem;
    text-align: center;
    color: var(--ae-treeview-empty-color, #6b7280);
    font-style: italic;
  }

  /* Loading state */
  .loading {
    padding: 1rem;
    text-align: center;
    color: var(--ae-treeview-loading-color, #6b7280);
  }
`,Cs=v`
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`,Ps=v`
  <span part="checkbox"></span>
`;function so(i){const{node:e,level:t,expanded:o,selected:n,hasCheckbox:s,onExpand:r,onSelect:l,children:a,isExpanded:d,isSelected:h,handleExpand:c,handleSelect:u}=i,p=a&&a.length>0;return v`
    <div 
      class="node" 
      part="node" 
      role="treeitem"
      aria-level="${t}"
      aria-selected="${n}"
      ?aria-expanded="${p?o:void 0}"
      @click="${f=>{f.stopPropagation(),l()}}"
    >
      ${p?v`
          <span 
            part="caret" 
            aria-expanded="${o}" 
            @click="${f=>{f.stopPropagation(),r()}}"
          >
            ${Cs}
          </span>
        `:v`<span part="caret-spacer"></span>`}
      
      ${s?Ps:""}
      
      ${e.icon?v`<span part="icon">${e.icon}</span>`:""}
      
      <span part="label">${e.label}</span>
    </div>
    
    ${p&&o?v`
        <div 
          part="subtree" 
          role="group"
        >
          ${no(a,f=>f.id,f=>so({node:f,level:t+1,expanded:d(f.id),selected:h(f.id),hasCheckbox:s,onExpand:()=>c(f.id),onSelect:()=>u(f.id),children:f.children||[],isExpanded:d,isSelected:h,handleExpand:c,handleSelect:u}))}
        </div>
      `:""}
  `}var Ts=Object.defineProperty,Os=Object.getOwnPropertyDescriptor,j=(i,e,t,o)=>{for(var n=o>1?void 0:o?Os(e,t):e,s=i.length-1,r;s>=0;s--)(r=i[s])&&(n=(o?r(e,t,n):r(n))||n);return o&&n&&Ts(e,t,n),n};let P=class extends x{constructor(){super(...arguments),this.data=[],this.expanded=[],this.selectionMode="single",this.selected=[],this.indentSize=16,this.loading=!1,this.emptyMessage="No items",this.keyboardController=new cs(this)}firstUpdated(){this.keyboardController.setRoot(this.treeviewRoot),this.updateController()}updated(i){(i.has("data")||i.has("expanded")||i.has("selected")||i.has("selectionMode"))&&this.updateController(),i.has("indentSize")&&this.style.setProperty("--ae-treeview-indent",`${this.indentSize}px`)}updateController(){this.keyboardController.setData(this.data,this.expanded,this.selected,this.selectionMode)}handleExpand(i){const e=new Set(this.expanded);e.has(i)?e.delete(i):e.add(i);const t=Array.from(e);this.dispatchEvent(new CustomEvent("ae-expand-change",{detail:{expanded:t},bubbles:!0,composed:!0})),this.expanded===void 0&&(this.expanded=t)}handleSelect(i){let e;if(this.selectionMode==="single")e=this.selected.includes(i)?[]:[i];else{const t=new Set(this.selected);t.has(i)?t.delete(i):t.add(i),e=Array.from(t)}this.dispatchEvent(new CustomEvent("ae-select",{detail:{selected:e},bubbles:!0,composed:!0})),this.selected===void 0&&(this.selected=e)}isExpanded(i){return this.expanded.includes(i)}isSelected(i){return this.selected.includes(i)}render(){return this.loading?v`<div class="loading" part="loading">Loading...</div>`:!this.data||this.data.length===0?v`<div class="empty-state" part="empty">${this.emptyMessage}</div>`:v`
      <div 
        class="treeview" 
        role="tree" 
        tabindex="0"
        aria-multiselectable=${this.selectionMode==="multiple"}
      >
        ${no(this.data,i=>i.id,i=>so({node:i,level:1,expanded:this.isExpanded(i.id),selected:this.isSelected(i.id),hasCheckbox:this.selectionMode==="multiple",onExpand:()=>this.handleExpand(i.id),onSelect:()=>this.handleSelect(i.id),children:i.children||[],isExpanded:e=>this.isExpanded(e),isSelected:e=>this.isSelected(e),handleExpand:e=>this.handleExpand(e),handleSelect:e=>this.handleSelect(e)}))}
      </div>
    `}};P.styles=Ss;j([m({type:Array})],P.prototype,"data",2);j([m({type:Array})],P.prototype,"expanded",2);j([m({type:String})],P.prototype,"selectionMode",2);j([m({type:Array})],P.prototype,"selected",2);j([m({type:Number})],P.prototype,"indentSize",2);j([m({type:Boolean})],P.prototype,"loading",2);j([m({type:String})],P.prototype,"emptyMessage",2);j([H(".treeview")],P.prototype,"treeviewRoot",2);P=j([M("ae-treeview")],P);function ro(){customElements.get("ae-treeview")||customElements.define("ae-treeview",P)}const Is=typeof window<"u"&&!window.AETHER_NO_AUTO_REGISTER;Is&&ro();function Ms(){customElements.get("ae-modal")||customElements.define("ae-modal",$e)}function Ks(){Qo(),Fo(),tn(),on(),Ms(),hn(),yn(),An(),ds(),ro()}customElements.define("ae-modal",$e);customElements.define("ae-button",le);customElements.define("ae-checkbox",_e);export{nt as AeAccordion,Lt as AeAccordionItem,ne as AeAlert,le as AeButton,_e as AeCheckbox,E as AeDropdown,re as AeMenuItem,Ne as AeMenuSection,Xe as AeMenuSeparator,$e as AeModal,W as AeRadio,oe as AeRadioGroup,F as AeTab,be as AeTabPanel,L as AeTabs,P as AeTreeView,cs as TreeViewKeyboardController,Qo as defineAeAccordion,An as defineAeAlert,Fo as defineAeButton,hn as defineAeCheckbox,ds as defineAeDropdown,Ms as defineAeModal,tn as defineAeRadio,on as defineAeRadioGroup,yn as defineAeTabs,ro as defineAeTreeView,Ks as defineAll,En as dropdownStyles,so as nodeTemplate,pn as tabStyles,Ss as treeviewStyles};

(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,638464,e=>{"use strict";var t=e.i(58125);e.s(["lobeStaticStylish",()=>t.staticStylish])},347782,e=>{"use strict";var t=e.i(843476),r=e.i(522016),n=e.i(271645);e.s(["default",0,({prefetch:e,onMouseEnter:i,...a})=>{let o=(0,n.useRef)(!1),[,l]=(0,n.useState)(0),s=(0,n.useCallback)(e=>{o.current||l(e=>e+1),o.current=!0,i?.(e)},[i]);return(0,t.jsx)(r.default,{...a,onMouseEnter:s,prefetch:e??(!!o.current&&null)})}])},297355,e=>{"use strict";let t="%[a-f0-9]{2}",r=RegExp("("+t+")|([^%]+?)","gi"),n=RegExp("("+t+")+","gi");function i(e,t){if("string"!=typeof e||"string"!=typeof t)throw TypeError("Expected the arguments to be of type `string`");if(""===e||""===t)return[];let r=e.indexOf(t);return -1===r?[]:[e.slice(0,r),e.slice(r+t.length)]}let a=Symbol("encodeFragmentIdentifier");function o(e){if("string"!=typeof e||1!==e.length)throw TypeError("arrayFormatSeparator must be single character string")}function l(e,t){return t.encode?t.strict?encodeURIComponent(e).replaceAll(/[!'()*]/g,e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`):encodeURIComponent(e):e}function s(e,t){if(t.decode){if("string"!=typeof e)throw TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return decodeURIComponent(e)}catch{var i=e;let t={"%FE%FF":"��","%FF%FE":"��"},a=n.exec(i);for(;a;){try{t[a[0]]=decodeURIComponent(a[0])}catch{let e=function(e){try{return decodeURIComponent(e)}catch{let t=e.match(r)||[];for(let n=1;n<t.length;n++)t=(e=(function e(t,r){try{return[decodeURIComponent(t.join(""))]}catch{}if(1===t.length)return t;r=r||1;let n=t.slice(0,r),i=t.slice(r);return Array.prototype.concat.call([],e(n),e(i))})(t,n).join("")).match(r)||[];return e}}(a[0]);e!==a[0]&&(t[a[0]]=e)}a=n.exec(i)}for(let e of(t["%C2"]="�",Object.keys(t)))i=i.replace(RegExp(e,"g"),t[e]);return i}}return e}function c(e){let t=e.indexOf("#");return -1!==t&&(e=e.slice(0,t)),e}function u(e,t,r){return"string"===r&&"string"==typeof e?e:"function"==typeof r&&"string"==typeof e?r(e):"boolean"===r&&null===e||("boolean"===r&&null!==e&&("true"===e.toLowerCase()||"false"===e.toLowerCase())?"true"===e.toLowerCase():"boolean"===r&&null!==e&&("1"===e.toLowerCase()||"0"===e.toLowerCase())?"1"===e.toLowerCase():"string[]"===r&&"none"!==t.arrayFormat&&"string"==typeof e?[e]:"number[]"!==r||"none"===t.arrayFormat||Number.isNaN(Number(e))||"string"!=typeof e||""===e.trim()?"number"!==r||Number.isNaN(Number(e))||"string"!=typeof e||""===e.trim()?t.parseBooleans&&null!==e&&("true"===e.toLowerCase()||"false"===e.toLowerCase())?"true"===e.toLowerCase():t.parseNumbers&&!Number.isNaN(Number(e))&&"string"==typeof e&&""!==e.trim()?Number(e):e:Number(e):[Number(e)])}function d(e){let t=(e=c(e)).indexOf("?");return -1===t?"":e.slice(t+1)}function p(e,t){o((t={decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1,types:Object.create(null),...t}).arrayFormatSeparator);let r=function(e){let t;switch(e.arrayFormat){case"index":return(e,r,n)=>{if(t=/\[(\d*)]$/.exec(e),e=e.replace(/\[\d*]$/,""),!t){n[e]=r;return}void 0===n[e]&&(n[e]={}),n[e][t[1]]=r};case"bracket":return(e,r,n)=>{if(t=/(\[])$/.exec(e),e=e.replace(/\[]$/,""),!t){n[e]=r;return}if(void 0===n[e]){n[e]=[r];return}n[e]=[...n[e],r]};case"colon-list-separator":return(e,r,n)=>{if(t=/(:list)$/.exec(e),e=e.replace(/:list$/,""),!t){n[e]=r;return}if(void 0===n[e]){n[e]=[r];return}n[e]=[...n[e],r]};case"comma":case"separator":return(t,r,n)=>{let i="string"==typeof r&&r.includes(e.arrayFormatSeparator)?r.split(e.arrayFormatSeparator).map(t=>s(t,e)):null===r?r:s(r,e);n[t]=i};case"bracket-separator":return(t,r,n)=>{let i=/(\[])$/.test(t);if(t=t.replace(/\[]$/,""),!i){n[t]=r?s(r,e):r;return}let a=null===r?[]:s(r,e).split(e.arrayFormatSeparator);if(void 0===n[t]){n[t]=a;return}n[t]=[...n[t],...a]};default:return(e,t,r)=>{if(void 0===r[e]){r[e]=t;return}r[e]=[...[r[e]].flat(),t]}}}(t),n=Object.create(null);if("string"!=typeof e||!(e=e.trim().replace(/^[?#&]/,"")))return n;for(let a of e.split("&")){if(""===a)continue;let e=t.decode?a.replaceAll("+"," "):a,[o,l]=i(e,"=");void 0===o&&(o=e),l=void 0===l?null:["comma","separator","bracket-separator"].includes(t.arrayFormat)?l:s(l,t),r(s(o,t),l,n)}for(let[e,r]of Object.entries(n))if("object"==typeof r&&null!==r&&"string"!==t.types[e])for(let[n,i]of Object.entries(r)){let a=t.types[e],o="function"==typeof a?a:a?a.replace("[]",""):void 0;r[n]=u(i,t,o)}else"object"==typeof r&&null!==r&&"string"===t.types[e]?n[e]=Object.values(r).join(t.arrayFormatSeparator):n[e]=u(r,t,t.types[e]);return!1===t.sort?n:(!0===t.sort?Object.keys(n).sort():Object.keys(n).sort(t.sort)).reduce((e,t)=>{let r=n[t];return e[t]=r&&"object"==typeof r&&!Array.isArray(r)?function e(t){return Array.isArray(t)?t.sort():"object"==typeof t?e(Object.keys(t)).sort((e,t)=>Number(e)-Number(t)).map(e=>t[e]):t}(r):r,e},Object.create(null))}function m(e,t){if(!e)return"";o((t={encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:",",...t}).arrayFormatSeparator);let r=r=>t.skipNull&&null==e[r]||t.skipEmptyString&&""===e[r],n=function(e){switch(e.arrayFormat){case"index":return t=>(r,n)=>{let i=r.length;return void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?r:null===n?[...r,l(t,e)+"["+i+"]"]:[...r,l(t,e)+"["+l(i,e)+"]="+l(n,e)]};case"bracket":return t=>(r,n)=>void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?r:null===n?[...r,l(t,e)+"[]"]:[...r,l(t,e)+"[]="+l(n,e)];case"colon-list-separator":return t=>(r,n)=>void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?r:null===n?[...r,l(t,e)+":list="]:[...r,l(t,e)+":list="+l(n,e)];case"comma":case"separator":case"bracket-separator":{let t="bracket-separator"===e.arrayFormat?"[]=":"=";return r=>(n,i)=>void 0===i||e.skipNull&&null===i||e.skipEmptyString&&""===i?n:(i=null===i?"":i,0===n.length)?[[l(r,e),t,l(i,e)].join("")]:[[n,l(i,e)].join(e.arrayFormatSeparator)]}default:return t=>(r,n)=>void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?r:null===n?[...r,l(t,e)]:[...r,l(t,e)+"="+l(n,e)]}}(t),i={};for(let[t,n]of Object.entries(e))r(t)||(i[t]=n);let a=Object.keys(i);return!1!==t.sort&&a.sort(t.sort),a.map(r=>{let i=e[r];if(t.replacer&&void 0===(i=t.replacer(r,i))||void 0===i)return"";if(null===i)return l(r,t);if(Array.isArray(i)){if(0===i.length&&"bracket-separator"===t.arrayFormat)return l(r,t)+"[]";let e=i;return t.replacer&&(e=i.map((e,n)=>t.replacer(`${r}[${n}]`,e)).filter(e=>void 0!==e)),e.reduce(n(r),[]).join("&")}return l(r,t)+"="+l(i,t)}).filter(e=>e.length>0).join("&")}function f(e,t){t={decode:!0,...t};let[r,n]=i(e,"#");return void 0===r&&(r=e),{url:r?.split("?")?.[0]??"",query:p(d(e),t),...t&&t.parseFragmentIdentifier&&n?{fragmentIdentifier:s(n,t)}:{}}}function g(e,t){var r;let n,i;t={encode:!0,strict:!0,[a]:!0,...t};let o=c(e.url).split("?")[0]||"",l=m({...p(d(e.url),{sort:!1,...t}),...e.query},t);l&&=`?${l}`;let s=(r=e.url,n="",-1!==(i=r.indexOf("#"))&&(n=r.slice(i)),n);if("string"==typeof e.fragmentIdentifier){let r=new URL(o);r.hash=e.fragmentIdentifier,s=t[a]?r.hash:`#${e.fragmentIdentifier}`}return`${o}${l}${s}`}function h(e,t,r){let{url:n,query:i,fragmentIdentifier:o}=f(e,r={parseFragmentIdentifier:!0,[a]:!1,...r});return g({url:n,query:function(e,t){let r={};if(Array.isArray(t))for(let n of t){let t=Object.getOwnPropertyDescriptor(e,n);t?.enumerable&&Object.defineProperty(r,n,t)}else for(let n of Reflect.ownKeys(e)){let i=Object.getOwnPropertyDescriptor(e,n);if(i.enumerable){let a=e[n];t(n,a,e)&&Object.defineProperty(r,n,i)}}return r}(i,t),fragmentIdentifier:o},r)}e.s(["exclude",0,function(e,t,r){return h(e,Array.isArray(t)?e=>!t.includes(e):(e,r)=>!t(e,r),r)},"extract",0,d,"parse",0,p,"parseUrl",0,f,"pick",0,h,"stringify",0,m,"stringifyUrl",0,g],681324);var x=e.i(681324);e.s(["default",0,x],297355)},484479,e=>{"use strict";let t=(0,e.i(456420).default)("download",[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]);e.s(["default",0,t])},923388,e=>{"use strict";var t=e.i(484479);e.s(["DownloadIcon",()=>t.default])},924886,576792,e=>{"use strict";var t,r=e.i(271645);let n=async()=>{try{let e=navigator.userAgentData;if(!e?.getHighEntropyValues)return"unknown";let t=await e.getHighEntropyValues(["architecture"]),r=String(t.architecture||"").toLowerCase();if(r.includes("arm"))return"apple-silicon";if(r.includes("x86"))return"intel"}catch{}return"unknown"};e.s(["usePlatformDetection",0,()=>{let[e,t]=(0,r.useState)({macArchitecture:"unknown",platform:"unknown"});return(0,r.useEffect)(()=>{let e,r,i=!1,a=(e=window.navigator.userAgent.toLowerCase(),r=window.navigator.platform?.toLowerCase()||"",/iphone|ipad|ipod/.test(e)||r.includes("mac")&&"ontouchend"in document?{platform:"ios"}:e.includes("android")?{platform:"android"}:e.includes("mac")||r.includes("mac")||e.includes("darwin")?{macArchitecture:"unknown",platform:"mac"}:e.includes("win")||r.includes("win")||e.includes("windows")?{platform:"win"}:e.includes("linux")||r.includes("linux")||e.includes("x11")?{platform:"linux"}:{platform:"unknown"});return t(a),"mac"===a.platform&&(async()=>{let e=await n(),r="unknown"!==e?e:(()=>{try{let e=document.createElement("canvas"),t=e.getContext("webgl")||e.getContext("experimental-webgl");if(!t)return"unknown";let r=t.getExtension("WEBGL_debug_renderer_info");if(!r)return"unknown";let n=String(t.getParameter(r.UNMASKED_RENDERER_WEBGL)||"");if(/apple\s*(m\d|gpu|silicon)/i.test(n))return"apple-silicon";if(/intel/i.test(n)||/(amd|radeon|ati)/i.test(n))return"intel"}catch{}return"unknown"})();i||"unknown"!==r&&t(e=>"mac"===e.platform?{...e,macArchitecture:r}:e)})(),()=>{i=!0}},[]),e}],924886);var i=e.i(297355),a=((t={}).Android="android",t.Linux="linux",t.MacosAppleSilicon="macosAppleSilicon",t.MacosIntel="macosIntel",t.Windows="windows",t.iOS="ios",t);let o=new class{latestEndpoint="https://app.lobehub.com/api/desktop/latest";getApiType=e=>{switch(e){case"macosAppleSilicon":return"mac-arm";case"macosIntel":return"mac-intel";case"windows":return"windows";case"linux":return"linux";case"ios":case"android":return null}};getLatestDesktopRelease=async e=>{let t=await fetch(i.default.stringifyUrl({query:{as_json:1},url:this.latestEndpoint}),{signal:e});if(!t.ok)throw Error(`Failed to fetch desktop releases: ${t.status}`);return t.json()};getPlatformDownloadUrl=e=>{if("ios"===e)return"https://apps.apple.com/app/id6749615954";if("android"===e)return"https://play.google.com/store/apps/details?id=com.lobehub.app";let t=this.getApiType(e);return t?i.default.stringifyUrl({query:{type:t},url:this.latestEndpoint}):"/downloads"};getPlatformDownloadPage=e=>{switch(e.platform){case"ios":return"https://apps.apple.com/app/id6749615954";case"android":return"https://play.google.com/store/apps/details?id=com.lobehub.app";case"mac":return"/downloads/mac";case"win":return"/downloads/win";case"linux":return"/downloads/linux";default:return"/downloads"}};getPlatformDownloadPageLegacy=e=>{switch(e){case"mac":return"/downloads/mac";case"win":return"/downloads/win";case"linux":return"/downloads/linux";default:return"/downloads"}};getRecommendedDownloadPlatform=e=>{switch(e.platform){case"ios":return"ios";case"android":return"android";case"mac":if("intel"===e.macArchitecture)return"macosIntel";if("apple-silicon"===e.macArchitecture);return"macosAppleSilicon";case"win":return"windows";case"linux":return"linux";default:return null}};getRecommendedDownloadPlatformLegacy=e=>{switch(e){case"mac":return"macosAppleSilicon";case"win":return"windows";case"linux":return"linux";default:return null}};getPlatformDisplayName=e=>{switch(e.platform){case"ios":return"iOS";case"android":return"Android";case"mac":if("intel"===e.macArchitecture)return"macOS";if("apple-silicon"===e.macArchitecture);return"macOS";case"win":return"Windows";case"linux":return"Linux";default:return"Unknown Platform"}};getPlatformDisplayNameLegacy=e=>{switch(e){case"mac":return"macOS";case"win":return"Windows";case"linux":return"Linux";default:return"Unknown Platform"}}};e.s(["DownloadPlatforms",()=>a,"downloadService",0,o],576792)},813097,263543,e=>{"use strict";var t=e.i(247167),r=e.i(843476),n=e.i(450354),i=e.i(123243),a=e.i(184283),o=e.i(271645);e.i(785269);var l=e.i(322831),s=e.i(923388),c=e.i(347782),u=e.i(924886),d=e.i(576792);let p=(0,o.memo)(({...e})=>{let{t}=(0,l.useTranslation)("downloads"),i=(0,u.usePlatformDetection)(),{text:a,url:p,isLoading:m,isExternal:f}=(0,o.useMemo)(()=>{if("unknown"===i.platform)return{isExternal:!1,isLoading:!0,text:t("page.downloadLatest"),url:"/downloads"};let e=d.downloadService.getPlatformDisplayName(i),r=d.downloadService.getPlatformDownloadPage(i);return{isExternal:"ios"===i.platform||"android"===i.platform,isLoading:!1,text:t("page.downloadFor",{platform:e}),url:r}},[t,i]);return f?(0,r.jsx)(n.Button,{href:p,icon:s.DownloadIcon,iconPlacement:"end",loading:m,size:"large",target:"_blank",...e,children:a}):(0,r.jsx)(c.default,{href:p,children:(0,r.jsx)(n.Button,{icon:s.DownloadIcon,iconPlacement:"end",loading:m,size:"large",...e,children:a})})});e.s(["default",0,p],263543);var m=e.i(892766),f=e.i(889515);let g=(0,a.createStaticStyles)(({css:e,cssVar:t})=>({button:e`
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: center;

    height: 48px !important;
    padding-inline: 32px;
    border: none !important;

    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;

    box-shadow: 0 0 0 1px ${t.colorFillTertiary} inset !important;
  `,downloadButton:e`
    gap: 8px;
    padding-inline: 16px;
    background: color-mix(in srgb, ${t.colorBgContainer} 85%, transparent);

    &:hover {
      background: ${t.colorBgContainer} !important;
    }
  `})),h=(0,o.memo)(({cloudCtaUtm:e,mobile:o,utmTerm:s})=>{let{t:u}=(0,l.useTranslation)(["landing","blog"]),d=e?.utmContent&&e.utmMedium?e:(t.default,{utmContent:f.UTM_CONTENT.callbackFooterDiscover,utmMedium:f.UTM_MEDIUM.discover});return(0,r.jsxs)(i.Center,{gap:16,horizontal:!o,children:[(0,r.jsx)(c.default,{href:(0,m.urlWithUTM)(m.LOBE_CHAT_URL,{utmContent:d.utmContent,utmMedium:d.utmMedium,...s?{utmTerm:s}:{}}),children:(0,r.jsx)(n.Button,{block:o,className:g.button,size:"large",type:"primary",children:u("buttons.getStartedForFree",{ns:"common"})})}),!o&&(0,r.jsx)(p,{className:(0,a.cx)(g.button,g.downloadButton),variant:"filled"})]})});e.s(["default",0,h],813097)},486642,e=>{"use strict";var t=e.i(843476),r=e.i(128709),n=e.i(184283),i=e.i(271645);let a=(0,n.createStaticStyles)(({css:e,cssVar:t})=>({desc:e`
    font-size: 16px;
    color: ${t.colorTextDescription};
    ${n.responsive.sm} {
      text-align: center;
    }
  `,subtitle:e`
    font-size: 20px;
    font-weight: 400;
    line-height: 1.6;
    ${n.responsive.sm} {
      font-size: 16px;
    }
  `,title:e`
    margin: 0;

    font-size: 32px;
    font-weight: 700;
    line-height: 1.6;
    text-align: center;

    box-decoration-break: clone;

    -webkit-text-fill-color: transparent;
    ${n.responsive.sm} {
      font-size: 24px;
    }
  `})),o=(0,i.memo)(({children:e,className:i,...o})=>(0,t.jsx)(r.Text,{className:(0,n.cx)(a.subtitle,i),...o,children:e}));e.s(["default",0,o],486642)},748619,e=>{"use strict";var t=e.i(843476),r=e.i(128709),n=e.i(184283),i=e.i(271645);let a=(0,n.createStaticStyles)(({css:e})=>({container:e`
    flex-wrap: wrap;
    column-gap: 0.3em;

    min-height: 60px;

    font-size: 48px;
    font-weight: bold;
    line-height: 1.2;
    ${n.responsive.sm} {
      font-size: 32px;
    }
  `})),o=(0,i.memo)(({as:e="h2",children:i,className:o,...l})=>(0,t.jsx)(r.Text,{as:e,className:(0,n.cx)(a.container,o),...l,children:i}));e.s(["default",0,o])},619964,254968,e=>{"use strict";var t=e.i(382162),r=e.i(297169),n=e.i(184283);let i={path:"assets/logo-3d.webp",pkg:"@lobehub/assets-logo",version:"1.2.0"},a=(0,n.createStaticStyles)(({css:e})=>({extraTitle:e`
      font-weight: 300;
      white-space: nowrap;
    `}));e.s(["LOGO_3D",0,i,"styles",0,a],254968);var o=e.i(843476);let l=({size:e="1em",style:n,alt:a="LobeHub",...l})=>(0,o.jsx)(r.default,{alt:a,height:e,src:(0,t.useCdnFn)()(i),style:n,width:e,...l});l.displayName="LobeHubLogo3d",e.s(["default",0,l],619964)},172651,e=>{"use strict";var t=e.i(843476);e.s(["default",0,({size:e="1em",style:r,...n})=>(0,t.jsx)("svg",{fill:"none",height:e,shapeRendering:"geometricPrecision",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",style:{flex:"none",lineHeight:1,...r},viewBox:"0 0 24 24",width:e,...n,children:(0,t.jsx)("path",{d:"M16.88 3.549L7.12 20.451"})})])},35716,329150,e=>{"use strict";var t=e.i(714928),r=t.LobeHub.Color;e.s(["default",0,r],35716),e.s(["icons_default",()=>t.LobeHub],329150)},201175,664033,e=>{"use strict";var t=e.i(206868),r=e.i(172651),n=e.i(254968),i=e.i(619964),a=e.i(35716),o=e.i(329150),l=e.i(843476);let s=({size:e="1em",style:t,...r})=>(0,l.jsxs)("svg",{fill:"currentColor",fillRule:"evenodd",height:e,style:{flex:"none",lineHeight:1,...t},viewBox:"0 0 940 320",xmlns:"http://www.w3.org/2000/svg",...r,children:[(0,l.jsx)("title",{children:"LobeHub"}),(0,l.jsx)("path",{d:"M15 240.035V87.172h39.24V205.75h66.192v34.285H15zM183.731 242c-11.759 0-22.196-2.621-31.313-7.862-9.116-5.241-16.317-12.447-21.601-21.619-5.153-9.317-7.729-19.945-7.729-31.883 0-11.937 2.576-22.492 7.729-31.664 5.164-8.963 12.159-15.98 20.982-21.05l.619-.351c9.117-5.241 19.554-7.861 31.313-7.861s22.196 2.62 31.313 7.861c9.248 5.096 16.449 12.229 21.601 21.401 5.153 9.172 7.729 19.727 7.729 31.664 0 11.938-2.576 22.566-7.729 31.883-5.152 9.172-12.353 16.378-21.601 21.619-9.117 5.241-19.554 7.862-31.313 7.862zm0-32.975c4.36 0 8.191-1.092 11.494-3.275 3.436-2.184 6.144-5.387 8.126-9.609 1.982-4.367 2.973-9.536 2.973-15.505 0-5.968-.991-10.991-2.973-15.067-1.906-4.06-4.483-7.177-7.733-9.352l-.393-.257c-3.303-2.184-7.134-3.276-11.494-3.276-4.228 0-8.059 1.092-11.495 3.276-3.303 2.184-6.011 5.387-8.125 9.609-1.982 4.076-2.973 9.099-2.973 15.067 0 5.969.991 11.138 2.973 15.505 2.114 4.222 4.822 7.425 8.125 9.609 3.436 2.183 7.267 3.275 11.495 3.275zM295.508 78l-.001 54.042a34.071 34.071 0 016.541-5.781c6.474-4.367 14.269-6.551 23.385-6.551 9.777 0 18.629 2.475 26.557 7.424 7.872 4.835 14.105 11.684 18.7 20.546l.325.637c4.756 9.026 7.135 19.799 7.135 32.319 0 12.666-2.379 23.585-7.135 32.757-4.624 9.026-10.966 16.087-19.025 21.182-7.928 4.95-16.78 7.425-26.557 7.425-9.644 0-17.704-2.184-24.178-6.551-2.825-1.946-5.336-4.355-7.532-7.226l.001 11.812h-35.87V78h37.654zm21.998 74.684c-4.228 0-8.059 1.092-11.494 3.276-3.303 2.184-6.012 5.387-8.126 9.609-1.982 4.076-2.972 9.099-2.972 15.067 0 5.969.99 11.138 2.972 15.505 2.114 4.222 4.823 7.425 8.126 9.609 3.435 2.183 7.266 3.275 11.494 3.275s7.994-1.092 11.297-3.275c3.435-2.184 6.143-5.387 8.125-9.609 2.114-4.367 3.171-9.536 3.171-15.505 0-5.968-1.057-10.991-3.171-15.067-1.906-4.06-4.483-7.177-7.732-9.352l-.393-.257c-3.303-2.184-7.069-3.276-11.297-3.276zm105.335 38.653l.084.337a27.857 27.857 0 002.057 5.559c2.246 4.222 5.417 7.498 9.513 9.827 4.096 2.184 8.984 3.276 14.665 3.276 5.285 0 9.777-.801 13.477-2.403 3.579-1.632 7.1-4.025 10.564-7.182l.732-.679 19.818 22.711c-5.153 6.26-11.494 11.064-19.025 14.413-7.531 3.203-16.449 4.804-26.755 4.804-12.683 0-23.782-2.621-33.294-7.862-9.381-5.386-16.713-12.665-21.998-21.837-5.153-9.317-7.729-19.872-7.729-31.665 0-11.792 2.51-22.274 7.53-31.446 5.036-9.105 11.902-16.195 20.596-21.268l.61-.351c8.984-5.241 19.091-7.861 30.322-7.861 10.311 0 19.743 2.286 28.294 6.859l.64.347c8.72 4.659 15.656 11.574 20.809 20.746 5.153 9.172 7.729 20.309 7.729 33.411 0 1.294-.052 2.761-.156 4.4l-.042.623-.17 2.353c-.075 1.01-.151 1.973-.227 2.888h-78.044zm21.365-42.147c-4.492 0-8.456 1.092-11.891 3.276-3.303 2.184-5.879 5.314-7.729 9.39a26.04 26.04 0 00-1.117 2.79 30.164 30.164 0 00-1.121 4.499l-.058.354h43.96l-.015-.106c-.401-2.638-1.122-5.055-2.163-7.252l-.246-.503c-1.776-3.774-4.282-6.742-7.519-8.906l-.409-.266c-3.303-2.184-7.2-3.276-11.692-3.276zm111.695-62.018l-.001 57.432h53.51V87.172h39.24v152.863h-39.24v-59.617H555.9l.001 59.617h-39.24V87.172h39.24zM715.766 242c-8.72 0-16.581-1.893-23.583-5.678-6.87-3.785-12.287-9.681-16.251-17.688-3.832-8.153-5.747-18.417-5.747-30.791v-66.168h37.654v59.398c0 9.172 1.519 15.723 4.558 19.654 3.171 3.931 7.597 5.896 13.278 5.896 3.7 0 7.069-.946 10.108-2.839 3.038-1.892 5.483-4.877 7.332-8.953 1.85-4.222 2.775-9.609 2.775-16.16v-56.996h37.654v118.36h-35.871l.004-12.38c-2.642 3.197-5.682 5.868-9.12 8.012-7.002 4.222-14.599 6.333-22.791 6.333zM841.489 78l-.001 54.041a34.1 34.1 0 016.541-5.78c6.474-4.367 14.269-6.551 23.385-6.551 9.777 0 18.629 2.475 26.556 7.424 7.873 4.835 14.106 11.684 18.701 20.546l.325.637c4.756 9.026 7.134 19.799 7.134 32.319 0 12.666-2.378 23.585-7.134 32.757-4.624 9.026-10.966 16.087-19.026 21.182-7.927 4.95-16.779 7.425-26.556 7.425-9.645 0-17.704-2.184-24.178-6.551-2.825-1.946-5.336-4.354-7.531-7.224v11.81h-35.87V78h37.654zm21.998 74.684c-4.228 0-8.059 1.092-11.495 3.276-3.303 2.184-6.011 5.387-8.125 9.609-1.982 4.076-2.973 9.099-2.973 15.067 0 5.969.991 11.138 2.973 15.505 2.114 4.222 4.822 7.425 8.125 9.609 3.436 2.183 7.267 3.275 11.495 3.275 4.228 0 7.993-1.092 11.296-3.275 3.435-2.184 6.144-5.387 8.126-9.609 2.114-4.367 3.171-9.536 3.171-15.505 0-5.968-1.057-10.991-3.171-15.067-1.906-4.06-4.484-7.177-7.733-9.352l-.393-.257c-3.303-2.184-7.068-3.276-11.296-3.276z"})]});s.displayName="LobeHubText",e.s(["default",0,s],664033);var c=e.i(271645),u=e.i(184283);let d=(0,c.memo)(({type:e="3d",size:c=32,style:d,extra:p,className:m,...f})=>{let g;switch(e){case"3d":g=(0,l.jsx)(i.default,{size:c,...f});break;case"flat":g=(0,l.jsx)(a.default,{size:c,style:d});break;case"mono":g=(0,l.jsx)(o.icons_default,{size:c,style:d});break;case"text":g=(0,l.jsx)(s,{className:m,size:c,style:d,...f});break;case"combine":g=(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i.default,{alt:"LobeChat",size:c}),(0,l.jsx)(s,{size:c,style:{marginLeft:Math.round(c/4)}})]}),p||(g=(0,l.jsx)(t.default,{horizontal:!0,align:"center",className:m,flex:"none",style:d,children:g}))}if(!p)return g;let h=Math.round(c/3*1.9);return(0,l.jsxs)(t.default,{horizontal:!0,align:"center",className:m,flex:"none",style:d,...f,children:[g,(0,l.jsx)(r.default,{size:h,style:{color:u.cssVar.colorFill}}),(0,l.jsx)("div",{className:n.styles.extraTitle,style:{fontSize:h},children:p})]})});d.displayName="LobeHubBrand",e.s(["default",0,d],201175)},546061,e=>{"use strict";var t=e.i(201175);e.s(["LobeHub",()=>t.default])},404010,e=>{"use strict";let t=new Set(["agent","mcp","skills"]);e.s(["getDiscoverResourceIdFromPathname",0,e=>{let r=e.split("/").filter(Boolean);for(let e=0;e<r.length;e+=1)if(t.has(r[e])&&e+1<r.length)return decodeURIComponent(r.slice(e+1).join("/"))},"getIconsResourceIdFromPathname",0,e=>{let t=e.split("/").filter(Boolean),r=t.indexOf("icons");if(!(r<0)&&!(r+1>=t.length))return decodeURIComponent(t.slice(r+1).join("/"))}])},171858,e=>{"use strict";var t=e.i(843476),r=e.i(943243),n=e.i(123243),i=e.i(208544),a=e.i(638464),o=e.i(546061),l=e.i(184283),s=e.i(618566),c=e.i(271645);e.i(785269);var u=e.i(322831),d=e.i(813097),p=e.i(748619),m=e.i(486642),f=e.i(889515),g=e.i(404010);let h=(0,l.createStaticStyles)(({css:e,cssVar:t})=>({container:e`
      position: relative;
      padding-block: 96px;

      &::before {
        content: '';

        position: absolute;
        inset-block-start: 0;
        inset-inline-start: 0;

        display: block;

        width: 100%;
        height: 1px;

        background: linear-gradient(
          90deg,
          transparent 0,
          ${t.colorFillSecondary} 10%,
          ${t.colorFillSecondary} 90%,
          transparent 100%
        );
      }

      &::after {
        pointer-events: none;
        content: '';

        position: absolute;
        z-index: 1;
        inset-block-start: 0;
        inset-inline-start: 0;

        display: block;

        width: 100%;
        height: 100%;

        opacity: 0.05;
        background: radial-gradient(50% 50% at 50% 0, ${t.gold} 0, transparent 100%);
      }
    `,desc:e`
      font-size: 18px;
      color: ${t.colorTextDescription};
      ${l.responsive.sm} {
        margin-block-end: 24px;
        font-size: 16px;
        text-align: center;
      }
    `,hightlight:(0,l.cx)(a.lobeStaticStylish.gradientAnimation,e`
        position: relative;
        z-index: 5;
        background-clip: text;

        -webkit-text-fill-color: transparent;

        &::selection {
          -webkit-text-fill-color: #000 !important;
        }
      `),title:e`
      margin-block-end: 0.5em;
      font-size: 32px;
      font-weight: bold;
      line-height: 1.2;
      ${l.responsive.sm} {
        font-size: 26px;
        text-align: center;
      }
    `})),x=(0,c.memo)(({actions:e,description:a,mobile:l,style:x,title:y,variant:w})=>{let{t:b}=(0,u.useTranslation)("landing"),v=(0,s.usePathname)(),k=f.CALLBACK_FOOTER_CLOUD_UTM[w]??f.CALLBACK_FOOTER_CLOUD_UTM.discover,j=(0,c.useMemo)(()=>"discover"===w?(0,g.getDiscoverResourceIdFromPathname)(v)??void 0:"icons"===w?(0,g.getIconsResourceIdFromPathname)(v)??void 0:void 0,[w,v]);return(0,t.jsxs)(n.Center,{className:h.container,gap:32,style:x,children:[(0,t.jsx)(r.Block,{align:"center",height:128,justify:"center",style:{borderRadius:28,boxShadow:"0 8px 32px rgba(0, 0, 0, 0.05)",zIndex:10},variant:"outlined",width:128,children:(0,t.jsx)(o.LobeHub,{size:100})}),(0,t.jsxs)(i.Flexbox,{align:"center",style:{zIndex:1},children:[(0,t.jsx)(p.default,{align:l?"center":void 0,style:{letterSpacing:"-0.04em",minHeight:"unset"},weight:"bolder",children:y??"Agent teammates that grow with you"}),(0,t.jsx)(m.default,{align:l?"center":void 0,as:"h3",children:a??b("footer.desc")})]}),e||(0,t.jsx)(d.default,{cloudCtaUtm:k,mobile:l,utmTerm:j})]})});e.s(["default",0,x,"styles",0,h])},307243,e=>{"use strict";var t=e.i(843476),r=e.i(450354),n=e.i(546061),i=e.i(184283),a=e.i(618566),o=e.i(271645);e.i(785269);var l=e.i(322831),s=e.i(892766),c=e.i(889515),u=e.i(404010);let d=(0,i.createStyles)(({css:e,responsive:t})=>({container:e`
    position: fixed;
    z-index: 1200;
    inset-block-end: 24px;
    inset-inline-end: 24px;

    ${t.mobile} {
      inset-block-end: 16px;
      inset-inline-end: 16px;
      display: none;
    }
  `,link:e`
    display: inline-flex;
    gap: 8px;
    align-items: center;
    font-size: 15px;
  `})),p=(0,o.memo)(({mobile:e})=>{let{styles:i}=d(),o=(0,a.usePathname)(),{t:p}=(0,l.useTranslation)("discover");if(e)return null;let m=(0,u.getDiscoverResourceIdFromPathname)(o),f=o.includes("/skills")?p("floatingCta.skills",{defaultValue:"Run any SKILL with one click"}):o.includes("/mcp")?p("floatingCta.mcp",{defaultValue:"Run any MCP with one click"}):o.includes("/agent")?p("floatingCta.agent",{defaultValue:"Run any Agent with one click"}):p("floatingCta.default",{defaultValue:"Run in LobeHub with one click"});return(0,t.jsx)("div",{className:i.container,children:(0,t.jsx)(r.Button,{className:i.link,href:(0,s.urlWithUTM)(s.LOBE_CHAT_URL,{utmContent:c.UTM_CONTENT.discoverFloatCTA,utmMedium:c.UTM_MEDIUM.discover,...m?{utmTerm:m}:{}}),icon:(0,t.jsx)(n.LobeHub,{size:24}),shape:"round",size:"large",target:"_blank",type:"primary",children:f})})});e.s(["default",0,p])},343349,e=>{"use strict";var t=e.i(271645);e.i(785269);var r=e.i(322831),n=e.i(498660);let i="discover",a=(e,t,r)=>{e.addResourceBundle(t,i,r,!0,!0)},o=(0,t.memo)(({children:e,locale:o,resource:l})=>{let{i18n:s}=(0,r.useTranslation)();return(n.isOnServerSide||!s.hasResourceBundle(o,i))&&a(s,o,l),(0,t.useEffect)(()=>{a(s,o,l)},[s,o,l]),e});o.displayName="DiscoverLocaleClient",e.s(["default",0,o])}]);
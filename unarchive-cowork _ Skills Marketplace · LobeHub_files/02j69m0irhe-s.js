(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,578379,e=>{"use strict";var t=e.i(206868),i=e.i(184283);let a=(0,i.createStaticStyles)(({css:e})=>e`
    --rows: var(--grid-rows, 3);
    --max-item-width: var(--grid-max-item-width, 240px);
    --gap: var(--grid-gap, 1em);

    display: grid !important;
    grid-template-columns: repeat(
      auto-fill,
      minmax(
        max(var(--max-item-width), calc((100% - var(--gap) * (var(--rows) - 1)) / var(--rows))),
        1fr
      )
    );
  `);var n=e.i(271645),r=e.i(843476);function l(e){return"string"==typeof e||e instanceof String}let o=({className:e,gap:o="1em",rows:s=3,children:c,maxItemWidth:d=240,ref:u,style:p,...m})=>{let f=(0,n.useMemo)(()=>({"--grid-gap":l(o)?o:`${o}px`,"--grid-max-item-width":l(d)?d:`${d}px`,"--grid-rows":`${s}`}),[o,d,s]);return(0,r.jsx)(t.default,{className:(0,i.cx)(a,e),gap:o,ref:u,style:{...f,...p},...m,children:c})};o.displayName="Grid",e.s(["default",0,o],578379)},43884,e=>{"use strict";var t=e.i(578379);e.s(["Grid",()=>t.default])},459817,e=>{"use strict";e.i(247167);var t=e.i(271645),i=e.i(931067),a=e.i(440383),n=e.i(180573),r=e.i(232839),l=e.i(207670),o=e.i(128473),s=e.i(401676);let c=(e,t)=>{if(!e)return null;let i={left:e.offsetLeft,right:e.parentElement.clientWidth-e.clientWidth-e.offsetLeft,width:e.clientWidth,top:e.offsetTop,bottom:e.parentElement.clientHeight-e.clientHeight-e.offsetTop,height:e.clientHeight};return t?{left:0,right:0,width:0,top:i.top,bottom:i.bottom,height:i.height}:{left:i.left,right:i.right,width:i.width,top:0,bottom:0,height:0}},d=e=>void 0!==e?`${e}px`:void 0;function u(e){let{prefixCls:i,containerRef:a,value:n,getValueIndex:u,motionName:p,onMotionStart:m,onMotionEnd:f,direction:h,vertical:g=!1}=e,b=t.useRef(null),[y,x]=t.useState(n),w=e=>{let t=u(e),n=a.current?.querySelectorAll(`.${i}-item`)[t];return n?.offsetParent&&n},[v,k]=t.useState(null),[S,$]=t.useState(null);(0,s.default)(()=>{if(y!==n){let e=w(y),t=w(n),i=c(e,g),a=c(t,g);x(n),k(i),$(a),e&&t?m():f()}},[n]);let C=t.useMemo(()=>g?d(v?.top??0):"rtl"===h?d(-v?.right):d(v?.left),[g,h,v]),j=t.useMemo(()=>g?d(S?.top??0):"rtl"===h?d(-S?.right):d(S?.left),[g,h,S]);return v&&S?t.createElement(o.default,{visible:!0,motionName:p,motionAppear:!0,onAppearStart:()=>g?{transform:"translateY(var(--thumb-start-top))",height:"var(--thumb-start-height)"}:{transform:"translateX(var(--thumb-start-left))",width:"var(--thumb-start-width)"},onAppearActive:()=>g?{transform:"translateY(var(--thumb-active-top))",height:"var(--thumb-active-height)"}:{transform:"translateX(var(--thumb-active-left))",width:"var(--thumb-active-width)"},onVisibleChanged:()=>{k(null),$(null),f()}},({className:e,style:a},n)=>{let o={...a,"--thumb-start-left":C,"--thumb-start-width":d(v?.width),"--thumb-active-left":j,"--thumb-active-width":d(S?.width),"--thumb-start-top":C,"--thumb-start-height":d(v?.height),"--thumb-active-top":j,"--thumb-active-height":d(S?.height)},s={ref:(0,r.composeRef)(b,n),style:o,className:(0,l.clsx)(`${i}-thumb`,e)};return t.createElement("div",s)}):null}let p=({prefixCls:e,className:i,style:a,styles:n,classNames:r,data:o,disabled:s,checked:c,label:d,title:u,value:p,name:m,onChange:f,onFocus:h,onBlur:g,onKeyDown:b,onKeyUp:y,onMouseDown:x,itemRender:w=e=>e})=>w(t.createElement("label",{className:(0,l.clsx)(i,{[`${e}-item-disabled`]:s}),style:a,onMouseDown:x},t.createElement("input",{name:m,className:`${e}-item-input`,type:"radio",disabled:s,checked:c,onChange:e=>{s||f(e,p)},onFocus:h,onBlur:g,onKeyDown:b,onKeyUp:y}),t.createElement("div",{className:(0,l.clsx)(`${e}-item-label`,r?.label),title:u,style:n?.label},d)),{item:o}),m=t.forwardRef((e,o)=>{let{prefixCls:s="rc-segmented",direction:c,vertical:d,options:m=[],disabled:f,defaultValue:h,value:g,name:b,onChange:y,className:x="",style:w,styles:v,classNames:k,motionName:S="thumb-motion",itemRender:$,...C}=e,j=t.useRef(null),T=t.useMemo(()=>(0,r.composeRef)(j,o),[j,o]),N=t.useMemo(()=>m.map(e=>{if("object"==typeof e&&null!==e){let t=void 0!==e.title?e.title:"object"!=typeof e.label?e.label?.toString():void 0;return{...e,title:t}}return{label:e?.toString(),title:e?.toString(),value:e}}),[m]),[P,I]=(0,a.default)(h??N[0]?.value,g),[A,R]=t.useState(!1),O=(e,t)=>{I(t),y?.(t)},E=(0,n.default)(C,["children"]),[M,L]=t.useState(!1),[z,F]=t.useState(!1),H=()=>{F(!0)},D=()=>{F(!1)},B=()=>{L(!1)},U=e=>{"Tab"===e.key&&L(!0)},W=e=>{let t=N.findIndex(e=>e.value===P),i=N.length,a=N[(t+e+i)%i];a&&(I(a.value),y?.(a.value))},q=e=>{switch(e.key){case"ArrowLeft":case"ArrowUp":W(-1);break;case"ArrowRight":case"ArrowDown":W(1)}};return t.createElement("div",(0,i.default)({role:"radiogroup","aria-label":"segmented control",tabIndex:f?void 0:0,"aria-orientation":d?"vertical":"horizontal",style:w},E,{className:(0,l.clsx)(s,{[`${s}-rtl`]:"rtl"===c,[`${s}-disabled`]:f,[`${s}-vertical`]:d},x),ref:T}),t.createElement("div",{className:`${s}-group`},t.createElement(u,{vertical:d,prefixCls:s,value:P,containerRef:j,motionName:`${s}-${S}`,direction:c,getValueIndex:e=>N.findIndex(t=>t.value===e),onMotionStart:()=>{R(!0)},onMotionEnd:()=>{R(!1)}}),N.map(e=>{let{value:a,disabled:n}=e;return t.createElement(p,(0,i.default)({},e,{name:b,data:e,itemRender:$,key:a,prefixCls:s,className:(0,l.clsx)(e.className,`${s}-item`,k?.item,{[`${s}-item-selected`]:a===P&&!A,[`${s}-item-focused`]:z&&M&&a===P}),style:v?.item,classNames:k,styles:v,checked:a===P,onChange:O,onFocus:H,onBlur:D,onKeyDown:q,onKeyUp:U,onMouseDown:B,disabled:!!f||!!n}))})))});var f=e.i(987225),h=e.i(711517),g=e.i(548817),b=e.i(806520),y=e.i(242064),x=e.i(517455),w=e.i(491816);e.i(296059);var v=e.i(915654),k=e.i(183293),S=e.i(246422),$=e.i(838378);function C(e,t){return{[`${e}, ${e}:hover, ${e}:focus`]:{color:t.colorTextDisabled,cursor:"not-allowed"}}}let j=e=>({background:e.itemSelectedBg,boxShadow:e.boxShadowTertiary}),T={overflow:"hidden",...k.textEllipsis},N=(0,S.genStyleHooks)("Segmented",e=>{let{lineWidth:t,calc:i}=e;return(e=>{let{componentCls:t,motionDurationSlow:i,motionEaseInOut:a,motionDurationMid:n}=e,r=e.calc(e.controlHeight).sub(e.calc(e.trackPadding).mul(2)).equal(),l=e.calc(e.controlHeightLG).sub(e.calc(e.trackPadding).mul(2)).equal(),o=e.calc(e.controlHeightSM).sub(e.calc(e.trackPadding).mul(2)).equal();return{[t]:{...(0,k.resetComponent)(e),display:"inline-block",padding:e.trackPadding,color:e.itemColor,background:e.trackBg,borderRadius:e.borderRadius,transition:`all ${n}`,...(0,k.genFocusStyle)(e),[`${t}-group`]:{position:"relative",display:"flex",alignItems:"stretch",justifyItems:"flex-start",flexDirection:"row",width:"100%"},[`&${t}-rtl`]:{direction:"rtl"},[`&${t}-vertical`]:{[`${t}-group`]:{flexDirection:"column"},[`${t}-thumb`]:{width:"100%",height:0,padding:`0 ${(0,v.unit)(e.paddingXXS)}`}},[`&${t}-block`]:{display:"flex"},[`&${t}-block ${t}-item`]:{flex:1,minWidth:0},[`${t}-item`]:{position:"relative",textAlign:"center",cursor:"pointer",transition:`color ${n}`,borderRadius:e.borderRadiusSM,transform:"translateZ(0)","&-selected":{...j(e),color:e.itemSelectedColor},"&-focused":(0,k.genFocusOutline)(e),"&::after":{content:'""',position:"absolute",zIndex:-1,width:"100%",height:"100%",top:0,insetInlineStart:0,borderRadius:"inherit",opacity:0,pointerEvents:"none",transition:["opacity","background-color"].map(e=>`${e} ${n}`).join(", ")},[`&:not(${t}-item-selected):not(${t}-item-disabled)`]:{"&:hover, &:active":{color:e.itemHoverColor},"&:hover::after":{opacity:1,backgroundColor:e.itemHoverBg},"&:active::after":{opacity:1,backgroundColor:e.itemActiveBg}},"&-label":{minHeight:r,lineHeight:(0,v.unit)(r),padding:`0 ${(0,v.unit)(e.segmentedPaddingHorizontal)}`,...T},"&-icon + *":{marginInlineStart:e.calc(e.marginSM).div(2).equal()},"&-input":{position:"absolute",insetBlockStart:0,insetInlineStart:0,width:0,height:0,opacity:0,pointerEvents:"none"}},[`${t}-thumb`]:{...j(e),position:"absolute",insetBlockStart:0,insetInlineStart:0,width:0,height:"100%",padding:`${(0,v.unit)(e.paddingXXS)} 0`,borderRadius:e.borderRadiusSM,[`& ~ ${t}-item:not(${t}-item-selected):not(${t}-item-disabled)::after`]:{backgroundColor:"transparent"}},[`&${t}-lg`]:{borderRadius:e.borderRadiusLG,[`${t}-item-label`]:{minHeight:l,lineHeight:(0,v.unit)(l),padding:`0 ${(0,v.unit)(e.segmentedPaddingHorizontal)}`,fontSize:e.fontSizeLG},[`${t}-item, ${t}-thumb`]:{borderRadius:e.borderRadius}},[`&${t}-sm`]:{borderRadius:e.borderRadiusSM,[`${t}-item-label`]:{minHeight:o,lineHeight:(0,v.unit)(o),padding:`0 ${(0,v.unit)(e.segmentedPaddingHorizontalSM)}`},[`${t}-item, ${t}-thumb`]:{borderRadius:e.borderRadiusXS}},...C(`&-disabled ${t}-item`,e),...C(`${t}-item-disabled`,e),[`${t}-thumb-motion-appear-active`]:{willChange:"transform, width",transition:["transform","width"].map(e=>`${e} ${i} ${a}`).join(", ")},[`&${t}-shape-round`]:{borderRadius:9999,[`${t}-item, ${t}-thumb`]:{borderRadius:9999}}}}})((0,$.mergeToken)(e,{segmentedPaddingHorizontal:i(e.controlPaddingHorizontal).sub(t).equal(),segmentedPaddingHorizontalSM:i(e.controlPaddingHorizontalSM).sub(t).equal()}))},e=>{let{colorTextLabel:t,colorText:i,colorFillSecondary:a,colorBgElevated:n,colorFill:r,lineWidthBold:l,colorBgLayout:o}=e;return{trackPadding:l,trackBg:o,itemColor:t,itemHoverColor:i,itemHoverBg:a,itemSelectedBg:n,itemActiveBg:r,itemSelectedColor:i}}),P=t.forwardRef((e,i)=>{let a=(0,f.default)(),{prefixCls:n,className:r,rootClassName:o,block:s,options:c=[],size:d,style:u,vertical:p,orientation:v,shape:k="default",name:S=a,styles:$,classNames:C,...j}=e,{getPrefixCls:T,direction:P,className:I,style:A,classNames:R,styles:O}=(0,y.useComponentConfig)("segmented"),E={...e,options:c,size:d,shape:k},[M,L]=(0,h.useMergeSemantic)([R,C],[O,$],{props:E}),z=T("segmented",n),[F,H]=N(z),D=(0,x.default)(d),B=t.useMemo(()=>c.map(e=>{if((0,b.isPlainObject)(e)&&e?.icon){let{icon:i,label:a,...n}=e;return{...n,label:t.createElement(t.Fragment,null,t.createElement("span",{className:(0,l.clsx)(`${z}-item-icon`,M.icon),style:L.icon},i),a&&t.createElement("span",null,a))}}return e}),[c,z,M.icon,L.icon]),[,U]=(0,g.useOrientation)(v,p),W=(0,l.clsx)(r,o,I,M.root,{[`${z}-block`]:s,[`${z}-sm`]:"small"===D,[`${z}-lg`]:"large"===D,[`${z}-vertical`]:U,[`${z}-shape-${k}`]:"round"===k},F,H),q={...L.root,...A,...u};return t.createElement(m,{...j,name:S,className:W,style:q,classNames:M,styles:L,itemRender:(e,{item:i})=>{if(!i.tooltip)return e;let a=(0,b.isPlainObject)(i.tooltip)?i.tooltip:{title:i.tooltip};return t.createElement(w.default,{...a},e)},options:B,ref:i,prefixCls:z,direction:P,vertical:U})});e.s(["default",0,P],459817)},256017,560025,e=>{"use strict";var t=e.i(58125),i=e.i(184283),a=e.i(225913);let n=(0,i.createStaticStyles)(({css:e,cssVar:i})=>({borderless:t.staticStylish.variantBorderlessWithoutHover,filled:e`
      border: 1px solid ${i.colorFillQuaternary};
      background: ${i.colorBgLayout};
    `,glass:t.staticStylish.blur,outlined:e`
      border: 1px solid ${i.colorBorderSecondary};
      background: transparent;
    `,root:e``,shadow:t.staticStylish.shadow})),r=(0,a.cva)(n.root,{defaultVariants:{glass:!1,shadow:!1,variant:"filled"},variants:{variant:{filled:n.filled,outlined:n.outlined,borderless:n.borderless},glass:{false:null,true:n.glass},shadow:{false:null,true:n.shadow}}});var l=e.i(271645),o=e.i(843476),s=e.i(459817);e.s(["Segmented",()=>s.default],560025);var s=s;let c=(0,l.memo)(({ref:e,padding:t,style:a,className:n,variant:l="filled",shadow:c,glass:d,...u})=>(0,o.jsx)(s.default,{className:(0,i.cx)(r({glass:d,shadow:c,variant:l}),n),ref:e,style:{padding:t,...a},...u}));c.displayName="Segmented",e.s(["Segmented",0,c],256017)},638464,e=>{"use strict";var t=e.i(58125);e.s(["lobeStaticStylish",()=>t.staticStylish])},347782,e=>{"use strict";var t=e.i(843476),i=e.i(522016),a=e.i(271645);e.s(["default",0,({prefetch:e,onMouseEnter:n,...r})=>{let l=(0,a.useRef)(!1),[,o]=(0,a.useState)(0),s=(0,a.useCallback)(e=>{l.current||o(e=>e+1),l.current=!0,n?.(e)},[n]);return(0,t.jsx)(i.default,{...r,onMouseEnter:s,prefetch:e??(!!l.current&&null)})}])},297355,e=>{"use strict";let t="%[a-f0-9]{2}",i=RegExp("("+t+")|([^%]+?)","gi"),a=RegExp("("+t+")+","gi");function n(e,t){if("string"!=typeof e||"string"!=typeof t)throw TypeError("Expected the arguments to be of type `string`");if(""===e||""===t)return[];let i=e.indexOf(t);return -1===i?[]:[e.slice(0,i),e.slice(i+t.length)]}let r=Symbol("encodeFragmentIdentifier");function l(e){if("string"!=typeof e||1!==e.length)throw TypeError("arrayFormatSeparator must be single character string")}function o(e,t){return t.encode?t.strict?encodeURIComponent(e).replaceAll(/[!'()*]/g,e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`):encodeURIComponent(e):e}function s(e,t){if(t.decode){if("string"!=typeof e)throw TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return decodeURIComponent(e)}catch{var n=e;let t={"%FE%FF":"��","%FF%FE":"��"},r=a.exec(n);for(;r;){try{t[r[0]]=decodeURIComponent(r[0])}catch{let e=function(e){try{return decodeURIComponent(e)}catch{let t=e.match(i)||[];for(let a=1;a<t.length;a++)t=(e=(function e(t,i){try{return[decodeURIComponent(t.join(""))]}catch{}if(1===t.length)return t;i=i||1;let a=t.slice(0,i),n=t.slice(i);return Array.prototype.concat.call([],e(a),e(n))})(t,a).join("")).match(i)||[];return e}}(r[0]);e!==r[0]&&(t[r[0]]=e)}r=a.exec(n)}for(let e of(t["%C2"]="�",Object.keys(t)))n=n.replace(RegExp(e,"g"),t[e]);return n}}return e}function c(e){let t=e.indexOf("#");return -1!==t&&(e=e.slice(0,t)),e}function d(e,t,i){return"string"===i&&"string"==typeof e?e:"function"==typeof i&&"string"==typeof e?i(e):"boolean"===i&&null===e||("boolean"===i&&null!==e&&("true"===e.toLowerCase()||"false"===e.toLowerCase())?"true"===e.toLowerCase():"boolean"===i&&null!==e&&("1"===e.toLowerCase()||"0"===e.toLowerCase())?"1"===e.toLowerCase():"string[]"===i&&"none"!==t.arrayFormat&&"string"==typeof e?[e]:"number[]"!==i||"none"===t.arrayFormat||Number.isNaN(Number(e))||"string"!=typeof e||""===e.trim()?"number"!==i||Number.isNaN(Number(e))||"string"!=typeof e||""===e.trim()?t.parseBooleans&&null!==e&&("true"===e.toLowerCase()||"false"===e.toLowerCase())?"true"===e.toLowerCase():t.parseNumbers&&!Number.isNaN(Number(e))&&"string"==typeof e&&""!==e.trim()?Number(e):e:Number(e):[Number(e)])}function u(e){let t=(e=c(e)).indexOf("?");return -1===t?"":e.slice(t+1)}function p(e,t){l((t={decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1,types:Object.create(null),...t}).arrayFormatSeparator);let i=function(e){let t;switch(e.arrayFormat){case"index":return(e,i,a)=>{if(t=/\[(\d*)]$/.exec(e),e=e.replace(/\[\d*]$/,""),!t){a[e]=i;return}void 0===a[e]&&(a[e]={}),a[e][t[1]]=i};case"bracket":return(e,i,a)=>{if(t=/(\[])$/.exec(e),e=e.replace(/\[]$/,""),!t){a[e]=i;return}if(void 0===a[e]){a[e]=[i];return}a[e]=[...a[e],i]};case"colon-list-separator":return(e,i,a)=>{if(t=/(:list)$/.exec(e),e=e.replace(/:list$/,""),!t){a[e]=i;return}if(void 0===a[e]){a[e]=[i];return}a[e]=[...a[e],i]};case"comma":case"separator":return(t,i,a)=>{let n="string"==typeof i&&i.includes(e.arrayFormatSeparator)?i.split(e.arrayFormatSeparator).map(t=>s(t,e)):null===i?i:s(i,e);a[t]=n};case"bracket-separator":return(t,i,a)=>{let n=/(\[])$/.test(t);if(t=t.replace(/\[]$/,""),!n){a[t]=i?s(i,e):i;return}let r=null===i?[]:s(i,e).split(e.arrayFormatSeparator);if(void 0===a[t]){a[t]=r;return}a[t]=[...a[t],...r]};default:return(e,t,i)=>{if(void 0===i[e]){i[e]=t;return}i[e]=[...[i[e]].flat(),t]}}}(t),a=Object.create(null);if("string"!=typeof e||!(e=e.trim().replace(/^[?#&]/,"")))return a;for(let r of e.split("&")){if(""===r)continue;let e=t.decode?r.replaceAll("+"," "):r,[l,o]=n(e,"=");void 0===l&&(l=e),o=void 0===o?null:["comma","separator","bracket-separator"].includes(t.arrayFormat)?o:s(o,t),i(s(l,t),o,a)}for(let[e,i]of Object.entries(a))if("object"==typeof i&&null!==i&&"string"!==t.types[e])for(let[a,n]of Object.entries(i)){let r=t.types[e],l="function"==typeof r?r:r?r.replace("[]",""):void 0;i[a]=d(n,t,l)}else"object"==typeof i&&null!==i&&"string"===t.types[e]?a[e]=Object.values(i).join(t.arrayFormatSeparator):a[e]=d(i,t,t.types[e]);return!1===t.sort?a:(!0===t.sort?Object.keys(a).sort():Object.keys(a).sort(t.sort)).reduce((e,t)=>{let i=a[t];return e[t]=i&&"object"==typeof i&&!Array.isArray(i)?function e(t){return Array.isArray(t)?t.sort():"object"==typeof t?e(Object.keys(t)).sort((e,t)=>Number(e)-Number(t)).map(e=>t[e]):t}(i):i,e},Object.create(null))}function m(e,t){if(!e)return"";l((t={encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:",",...t}).arrayFormatSeparator);let i=i=>t.skipNull&&null==e[i]||t.skipEmptyString&&""===e[i],a=function(e){switch(e.arrayFormat){case"index":return t=>(i,a)=>{let n=i.length;return void 0===a||e.skipNull&&null===a||e.skipEmptyString&&""===a?i:null===a?[...i,o(t,e)+"["+n+"]"]:[...i,o(t,e)+"["+o(n,e)+"]="+o(a,e)]};case"bracket":return t=>(i,a)=>void 0===a||e.skipNull&&null===a||e.skipEmptyString&&""===a?i:null===a?[...i,o(t,e)+"[]"]:[...i,o(t,e)+"[]="+o(a,e)];case"colon-list-separator":return t=>(i,a)=>void 0===a||e.skipNull&&null===a||e.skipEmptyString&&""===a?i:null===a?[...i,o(t,e)+":list="]:[...i,o(t,e)+":list="+o(a,e)];case"comma":case"separator":case"bracket-separator":{let t="bracket-separator"===e.arrayFormat?"[]=":"=";return i=>(a,n)=>void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?a:(n=null===n?"":n,0===a.length)?[[o(i,e),t,o(n,e)].join("")]:[[a,o(n,e)].join(e.arrayFormatSeparator)]}default:return t=>(i,a)=>void 0===a||e.skipNull&&null===a||e.skipEmptyString&&""===a?i:null===a?[...i,o(t,e)]:[...i,o(t,e)+"="+o(a,e)]}}(t),n={};for(let[t,a]of Object.entries(e))i(t)||(n[t]=a);let r=Object.keys(n);return!1!==t.sort&&r.sort(t.sort),r.map(i=>{let n=e[i];if(t.replacer&&void 0===(n=t.replacer(i,n))||void 0===n)return"";if(null===n)return o(i,t);if(Array.isArray(n)){if(0===n.length&&"bracket-separator"===t.arrayFormat)return o(i,t)+"[]";let e=n;return t.replacer&&(e=n.map((e,a)=>t.replacer(`${i}[${a}]`,e)).filter(e=>void 0!==e)),e.reduce(a(i),[]).join("&")}return o(i,t)+"="+o(n,t)}).filter(e=>e.length>0).join("&")}function f(e,t){t={decode:!0,...t};let[i,a]=n(e,"#");return void 0===i&&(i=e),{url:i?.split("?")?.[0]??"",query:p(u(e),t),...t&&t.parseFragmentIdentifier&&a?{fragmentIdentifier:s(a,t)}:{}}}function h(e,t){var i;let a,n;t={encode:!0,strict:!0,[r]:!0,...t};let l=c(e.url).split("?")[0]||"",o=m({...p(u(e.url),{sort:!1,...t}),...e.query},t);o&&=`?${o}`;let s=(i=e.url,a="",-1!==(n=i.indexOf("#"))&&(a=i.slice(n)),a);if("string"==typeof e.fragmentIdentifier){let i=new URL(l);i.hash=e.fragmentIdentifier,s=t[r]?i.hash:`#${e.fragmentIdentifier}`}return`${l}${o}${s}`}function g(e,t,i){let{url:a,query:n,fragmentIdentifier:l}=f(e,i={parseFragmentIdentifier:!0,[r]:!1,...i});return h({url:a,query:function(e,t){let i={};if(Array.isArray(t))for(let a of t){let t=Object.getOwnPropertyDescriptor(e,a);t?.enumerable&&Object.defineProperty(i,a,t)}else for(let a of Reflect.ownKeys(e)){let n=Object.getOwnPropertyDescriptor(e,a);if(n.enumerable){let r=e[a];t(a,r,e)&&Object.defineProperty(i,a,n)}}return i}(n,t),fragmentIdentifier:l},i)}e.s(["exclude",0,function(e,t,i){return g(e,Array.isArray(t)?e=>!t.includes(e):(e,i)=>!t(e,i),i)},"extract",0,u,"parse",0,p,"parseUrl",0,f,"pick",0,g,"stringify",0,m,"stringifyUrl",0,h],681324);var b=e.i(681324);e.s(["default",0,b],297355)},484479,e=>{"use strict";let t=(0,e.i(456420).default)("download",[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]);e.s(["default",0,t])},923388,e=>{"use strict";var t=e.i(484479);e.s(["DownloadIcon",()=>t.default])},924886,576792,e=>{"use strict";var t,i=e.i(271645);let a=async()=>{try{let e=navigator.userAgentData;if(!e?.getHighEntropyValues)return"unknown";let t=await e.getHighEntropyValues(["architecture"]),i=String(t.architecture||"").toLowerCase();if(i.includes("arm"))return"apple-silicon";if(i.includes("x86"))return"intel"}catch{}return"unknown"};e.s(["usePlatformDetection",0,()=>{let[e,t]=(0,i.useState)({macArchitecture:"unknown",platform:"unknown"});return(0,i.useEffect)(()=>{let e,i,n=!1,r=(e=window.navigator.userAgent.toLowerCase(),i=window.navigator.platform?.toLowerCase()||"",/iphone|ipad|ipod/.test(e)||i.includes("mac")&&"ontouchend"in document?{platform:"ios"}:e.includes("android")?{platform:"android"}:e.includes("mac")||i.includes("mac")||e.includes("darwin")?{macArchitecture:"unknown",platform:"mac"}:e.includes("win")||i.includes("win")||e.includes("windows")?{platform:"win"}:e.includes("linux")||i.includes("linux")||e.includes("x11")?{platform:"linux"}:{platform:"unknown"});return t(r),"mac"===r.platform&&(async()=>{let e=await a(),i="unknown"!==e?e:(()=>{try{let e=document.createElement("canvas"),t=e.getContext("webgl")||e.getContext("experimental-webgl");if(!t)return"unknown";let i=t.getExtension("WEBGL_debug_renderer_info");if(!i)return"unknown";let a=String(t.getParameter(i.UNMASKED_RENDERER_WEBGL)||"");if(/apple\s*(m\d|gpu|silicon)/i.test(a))return"apple-silicon";if(/intel/i.test(a)||/(amd|radeon|ati)/i.test(a))return"intel"}catch{}return"unknown"})();n||"unknown"!==i&&t(e=>"mac"===e.platform?{...e,macArchitecture:i}:e)})(),()=>{n=!0}},[]),e}],924886);var n=e.i(297355),r=((t={}).Android="android",t.Linux="linux",t.MacosAppleSilicon="macosAppleSilicon",t.MacosIntel="macosIntel",t.Windows="windows",t.iOS="ios",t);let l=new class{latestEndpoint="https://app.lobehub.com/api/desktop/latest";getApiType=e=>{switch(e){case"macosAppleSilicon":return"mac-arm";case"macosIntel":return"mac-intel";case"windows":return"windows";case"linux":return"linux";case"ios":case"android":return null}};getLatestDesktopRelease=async e=>{let t=await fetch(n.default.stringifyUrl({query:{as_json:1},url:this.latestEndpoint}),{signal:e});if(!t.ok)throw Error(`Failed to fetch desktop releases: ${t.status}`);return t.json()};getPlatformDownloadUrl=e=>{if("ios"===e)return"https://apps.apple.com/app/id6749615954";if("android"===e)return"https://play.google.com/store/apps/details?id=com.lobehub.app";let t=this.getApiType(e);return t?n.default.stringifyUrl({query:{type:t},url:this.latestEndpoint}):"/downloads"};getPlatformDownloadPage=e=>{switch(e.platform){case"ios":return"https://apps.apple.com/app/id6749615954";case"android":return"https://play.google.com/store/apps/details?id=com.lobehub.app";case"mac":return"/downloads/mac";case"win":return"/downloads/win";case"linux":return"/downloads/linux";default:return"/downloads"}};getPlatformDownloadPageLegacy=e=>{switch(e){case"mac":return"/downloads/mac";case"win":return"/downloads/win";case"linux":return"/downloads/linux";default:return"/downloads"}};getRecommendedDownloadPlatform=e=>{switch(e.platform){case"ios":return"ios";case"android":return"android";case"mac":if("intel"===e.macArchitecture)return"macosIntel";if("apple-silicon"===e.macArchitecture);return"macosAppleSilicon";case"win":return"windows";case"linux":return"linux";default:return null}};getRecommendedDownloadPlatformLegacy=e=>{switch(e){case"mac":return"macosAppleSilicon";case"win":return"windows";case"linux":return"linux";default:return null}};getPlatformDisplayName=e=>{switch(e.platform){case"ios":return"iOS";case"android":return"Android";case"mac":if("intel"===e.macArchitecture)return"macOS";if("apple-silicon"===e.macArchitecture);return"macOS";case"win":return"Windows";case"linux":return"Linux";default:return"Unknown Platform"}};getPlatformDisplayNameLegacy=e=>{switch(e){case"mac":return"macOS";case"win":return"Windows";case"linux":return"Linux";default:return"Unknown Platform"}}};e.s(["DownloadPlatforms",()=>r,"downloadService",0,l],576792)},813097,263543,e=>{"use strict";var t=e.i(247167),i=e.i(843476),a=e.i(450354),n=e.i(123243),r=e.i(184283),l=e.i(271645);e.i(785269);var o=e.i(322831),s=e.i(923388),c=e.i(347782),d=e.i(924886),u=e.i(576792);let p=(0,l.memo)(({...e})=>{let{t}=(0,o.useTranslation)("downloads"),n=(0,d.usePlatformDetection)(),{text:r,url:p,isLoading:m,isExternal:f}=(0,l.useMemo)(()=>{if("unknown"===n.platform)return{isExternal:!1,isLoading:!0,text:t("page.downloadLatest"),url:"/downloads"};let e=u.downloadService.getPlatformDisplayName(n),i=u.downloadService.getPlatformDownloadPage(n);return{isExternal:"ios"===n.platform||"android"===n.platform,isLoading:!1,text:t("page.downloadFor",{platform:e}),url:i}},[t,n]);return f?(0,i.jsx)(a.Button,{href:p,icon:s.DownloadIcon,iconPlacement:"end",loading:m,size:"large",target:"_blank",...e,children:r}):(0,i.jsx)(c.default,{href:p,children:(0,i.jsx)(a.Button,{icon:s.DownloadIcon,iconPlacement:"end",loading:m,size:"large",...e,children:r})})});e.s(["default",0,p],263543);var m=e.i(892766),f=e.i(889515);let h=(0,r.createStaticStyles)(({css:e,cssVar:t})=>({button:e`
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
  `})),g=(0,l.memo)(({cloudCtaUtm:e,mobile:l,utmTerm:s})=>{let{t:d}=(0,o.useTranslation)(["landing","blog"]),u=e?.utmContent&&e.utmMedium?e:(t.default,{utmContent:f.UTM_CONTENT.callbackFooterDiscover,utmMedium:f.UTM_MEDIUM.discover});return(0,i.jsxs)(n.Center,{gap:16,horizontal:!l,children:[(0,i.jsx)(c.default,{href:(0,m.urlWithUTM)(m.LOBE_CHAT_URL,{utmContent:u.utmContent,utmMedium:u.utmMedium,...s?{utmTerm:s}:{}}),children:(0,i.jsx)(a.Button,{block:l,className:h.button,size:"large",type:"primary",children:d("buttons.getStartedForFree",{ns:"common"})})}),!l&&(0,i.jsx)(p,{className:(0,r.cx)(h.button,h.downloadButton),variant:"filled"})]})});e.s(["default",0,g],813097)},486642,e=>{"use strict";var t=e.i(843476),i=e.i(128709),a=e.i(184283),n=e.i(271645);let r=(0,a.createStaticStyles)(({css:e,cssVar:t})=>({desc:e`
    font-size: 16px;
    color: ${t.colorTextDescription};
    ${a.responsive.sm} {
      text-align: center;
    }
  `,subtitle:e`
    font-size: 20px;
    font-weight: 400;
    line-height: 1.6;
    ${a.responsive.sm} {
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
    ${a.responsive.sm} {
      font-size: 24px;
    }
  `})),l=(0,n.memo)(({children:e,className:n,...l})=>(0,t.jsx)(i.Text,{className:(0,a.cx)(r.subtitle,n),...l,children:e}));e.s(["default",0,l],486642)},748619,e=>{"use strict";var t=e.i(843476),i=e.i(128709),a=e.i(184283),n=e.i(271645);let r=(0,a.createStaticStyles)(({css:e})=>({container:e`
    flex-wrap: wrap;
    column-gap: 0.3em;

    min-height: 60px;

    font-size: 48px;
    font-weight: bold;
    line-height: 1.2;
    ${a.responsive.sm} {
      font-size: 32px;
    }
  `})),l=(0,n.memo)(({as:e="h2",children:n,className:l,...o})=>(0,t.jsx)(i.Text,{as:e,className:(0,a.cx)(r.container,l),...o,children:n}));e.s(["default",0,l])},619964,254968,e=>{"use strict";var t=e.i(382162),i=e.i(297169),a=e.i(184283);let n={path:"assets/logo-3d.webp",pkg:"@lobehub/assets-logo",version:"1.2.0"},r=(0,a.createStaticStyles)(({css:e})=>({extraTitle:e`
      font-weight: 300;
      white-space: nowrap;
    `}));e.s(["LOGO_3D",0,n,"styles",0,r],254968);var l=e.i(843476);let o=({size:e="1em",style:a,alt:r="LobeHub",...o})=>(0,l.jsx)(i.default,{alt:r,height:e,src:(0,t.useCdnFn)()(n),style:a,width:e,...o});o.displayName="LobeHubLogo3d",e.s(["default",0,o],619964)},172651,e=>{"use strict";var t=e.i(843476);e.s(["default",0,({size:e="1em",style:i,...a})=>(0,t.jsx)("svg",{fill:"none",height:e,shapeRendering:"geometricPrecision",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",style:{flex:"none",lineHeight:1,...i},viewBox:"0 0 24 24",width:e,...a,children:(0,t.jsx)("path",{d:"M16.88 3.549L7.12 20.451"})})])},35716,329150,e=>{"use strict";var t=e.i(714928),i=t.LobeHub.Color;e.s(["default",0,i],35716),e.s(["icons_default",()=>t.LobeHub],329150)},201175,664033,e=>{"use strict";var t=e.i(206868),i=e.i(172651),a=e.i(254968),n=e.i(619964),r=e.i(35716),l=e.i(329150),o=e.i(843476);let s=({size:e="1em",style:t,...i})=>(0,o.jsxs)("svg",{fill:"currentColor",fillRule:"evenodd",height:e,style:{flex:"none",lineHeight:1,...t},viewBox:"0 0 940 320",xmlns:"http://www.w3.org/2000/svg",...i,children:[(0,o.jsx)("title",{children:"LobeHub"}),(0,o.jsx)("path",{d:"M15 240.035V87.172h39.24V205.75h66.192v34.285H15zM183.731 242c-11.759 0-22.196-2.621-31.313-7.862-9.116-5.241-16.317-12.447-21.601-21.619-5.153-9.317-7.729-19.945-7.729-31.883 0-11.937 2.576-22.492 7.729-31.664 5.164-8.963 12.159-15.98 20.982-21.05l.619-.351c9.117-5.241 19.554-7.861 31.313-7.861s22.196 2.62 31.313 7.861c9.248 5.096 16.449 12.229 21.601 21.401 5.153 9.172 7.729 19.727 7.729 31.664 0 11.938-2.576 22.566-7.729 31.883-5.152 9.172-12.353 16.378-21.601 21.619-9.117 5.241-19.554 7.862-31.313 7.862zm0-32.975c4.36 0 8.191-1.092 11.494-3.275 3.436-2.184 6.144-5.387 8.126-9.609 1.982-4.367 2.973-9.536 2.973-15.505 0-5.968-.991-10.991-2.973-15.067-1.906-4.06-4.483-7.177-7.733-9.352l-.393-.257c-3.303-2.184-7.134-3.276-11.494-3.276-4.228 0-8.059 1.092-11.495 3.276-3.303 2.184-6.011 5.387-8.125 9.609-1.982 4.076-2.973 9.099-2.973 15.067 0 5.969.991 11.138 2.973 15.505 2.114 4.222 4.822 7.425 8.125 9.609 3.436 2.183 7.267 3.275 11.495 3.275zM295.508 78l-.001 54.042a34.071 34.071 0 016.541-5.781c6.474-4.367 14.269-6.551 23.385-6.551 9.777 0 18.629 2.475 26.557 7.424 7.872 4.835 14.105 11.684 18.7 20.546l.325.637c4.756 9.026 7.135 19.799 7.135 32.319 0 12.666-2.379 23.585-7.135 32.757-4.624 9.026-10.966 16.087-19.025 21.182-7.928 4.95-16.78 7.425-26.557 7.425-9.644 0-17.704-2.184-24.178-6.551-2.825-1.946-5.336-4.355-7.532-7.226l.001 11.812h-35.87V78h37.654zm21.998 74.684c-4.228 0-8.059 1.092-11.494 3.276-3.303 2.184-6.012 5.387-8.126 9.609-1.982 4.076-2.972 9.099-2.972 15.067 0 5.969.99 11.138 2.972 15.505 2.114 4.222 4.823 7.425 8.126 9.609 3.435 2.183 7.266 3.275 11.494 3.275s7.994-1.092 11.297-3.275c3.435-2.184 6.143-5.387 8.125-9.609 2.114-4.367 3.171-9.536 3.171-15.505 0-5.968-1.057-10.991-3.171-15.067-1.906-4.06-4.483-7.177-7.732-9.352l-.393-.257c-3.303-2.184-7.069-3.276-11.297-3.276zm105.335 38.653l.084.337a27.857 27.857 0 002.057 5.559c2.246 4.222 5.417 7.498 9.513 9.827 4.096 2.184 8.984 3.276 14.665 3.276 5.285 0 9.777-.801 13.477-2.403 3.579-1.632 7.1-4.025 10.564-7.182l.732-.679 19.818 22.711c-5.153 6.26-11.494 11.064-19.025 14.413-7.531 3.203-16.449 4.804-26.755 4.804-12.683 0-23.782-2.621-33.294-7.862-9.381-5.386-16.713-12.665-21.998-21.837-5.153-9.317-7.729-19.872-7.729-31.665 0-11.792 2.51-22.274 7.53-31.446 5.036-9.105 11.902-16.195 20.596-21.268l.61-.351c8.984-5.241 19.091-7.861 30.322-7.861 10.311 0 19.743 2.286 28.294 6.859l.64.347c8.72 4.659 15.656 11.574 20.809 20.746 5.153 9.172 7.729 20.309 7.729 33.411 0 1.294-.052 2.761-.156 4.4l-.042.623-.17 2.353c-.075 1.01-.151 1.973-.227 2.888h-78.044zm21.365-42.147c-4.492 0-8.456 1.092-11.891 3.276-3.303 2.184-5.879 5.314-7.729 9.39a26.04 26.04 0 00-1.117 2.79 30.164 30.164 0 00-1.121 4.499l-.058.354h43.96l-.015-.106c-.401-2.638-1.122-5.055-2.163-7.252l-.246-.503c-1.776-3.774-4.282-6.742-7.519-8.906l-.409-.266c-3.303-2.184-7.2-3.276-11.692-3.276zm111.695-62.018l-.001 57.432h53.51V87.172h39.24v152.863h-39.24v-59.617H555.9l.001 59.617h-39.24V87.172h39.24zM715.766 242c-8.72 0-16.581-1.893-23.583-5.678-6.87-3.785-12.287-9.681-16.251-17.688-3.832-8.153-5.747-18.417-5.747-30.791v-66.168h37.654v59.398c0 9.172 1.519 15.723 4.558 19.654 3.171 3.931 7.597 5.896 13.278 5.896 3.7 0 7.069-.946 10.108-2.839 3.038-1.892 5.483-4.877 7.332-8.953 1.85-4.222 2.775-9.609 2.775-16.16v-56.996h37.654v118.36h-35.871l.004-12.38c-2.642 3.197-5.682 5.868-9.12 8.012-7.002 4.222-14.599 6.333-22.791 6.333zM841.489 78l-.001 54.041a34.1 34.1 0 016.541-5.78c6.474-4.367 14.269-6.551 23.385-6.551 9.777 0 18.629 2.475 26.556 7.424 7.873 4.835 14.106 11.684 18.701 20.546l.325.637c4.756 9.026 7.134 19.799 7.134 32.319 0 12.666-2.378 23.585-7.134 32.757-4.624 9.026-10.966 16.087-19.026 21.182-7.927 4.95-16.779 7.425-26.556 7.425-9.645 0-17.704-2.184-24.178-6.551-2.825-1.946-5.336-4.354-7.531-7.224v11.81h-35.87V78h37.654zm21.998 74.684c-4.228 0-8.059 1.092-11.495 3.276-3.303 2.184-6.011 5.387-8.125 9.609-1.982 4.076-2.973 9.099-2.973 15.067 0 5.969.991 11.138 2.973 15.505 2.114 4.222 4.822 7.425 8.125 9.609 3.436 2.183 7.267 3.275 11.495 3.275 4.228 0 7.993-1.092 11.296-3.275 3.435-2.184 6.144-5.387 8.126-9.609 2.114-4.367 3.171-9.536 3.171-15.505 0-5.968-1.057-10.991-3.171-15.067-1.906-4.06-4.484-7.177-7.733-9.352l-.393-.257c-3.303-2.184-7.068-3.276-11.296-3.276z"})]});s.displayName="LobeHubText",e.s(["default",0,s],664033);var c=e.i(271645),d=e.i(184283);let u=(0,c.memo)(({type:e="3d",size:c=32,style:u,extra:p,className:m,...f})=>{let h;switch(e){case"3d":h=(0,o.jsx)(n.default,{size:c,...f});break;case"flat":h=(0,o.jsx)(r.default,{size:c,style:u});break;case"mono":h=(0,o.jsx)(l.icons_default,{size:c,style:u});break;case"text":h=(0,o.jsx)(s,{className:m,size:c,style:u,...f});break;case"combine":h=(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.default,{alt:"LobeChat",size:c}),(0,o.jsx)(s,{size:c,style:{marginLeft:Math.round(c/4)}})]}),p||(h=(0,o.jsx)(t.default,{horizontal:!0,align:"center",className:m,flex:"none",style:u,children:h}))}if(!p)return h;let g=Math.round(c/3*1.9);return(0,o.jsxs)(t.default,{horizontal:!0,align:"center",className:m,flex:"none",style:u,...f,children:[h,(0,o.jsx)(i.default,{size:g,style:{color:d.cssVar.colorFill}}),(0,o.jsx)("div",{className:a.styles.extraTitle,style:{fontSize:g},children:p})]})});u.displayName="LobeHubBrand",e.s(["default",0,u],201175)},546061,e=>{"use strict";var t=e.i(201175);e.s(["LobeHub",()=>t.default])},404010,e=>{"use strict";let t=new Set(["agent","mcp","skills"]);e.s(["getDiscoverResourceIdFromPathname",0,e=>{let i=e.split("/").filter(Boolean);for(let e=0;e<i.length;e+=1)if(t.has(i[e])&&e+1<i.length)return decodeURIComponent(i.slice(e+1).join("/"))},"getIconsResourceIdFromPathname",0,e=>{let t=e.split("/").filter(Boolean),i=t.indexOf("icons");if(!(i<0)&&!(i+1>=t.length))return decodeURIComponent(t.slice(i+1).join("/"))}])},171858,e=>{"use strict";var t=e.i(843476),i=e.i(943243),a=e.i(123243),n=e.i(208544),r=e.i(638464),l=e.i(546061),o=e.i(184283),s=e.i(618566),c=e.i(271645);e.i(785269);var d=e.i(322831),u=e.i(813097),p=e.i(748619),m=e.i(486642),f=e.i(889515),h=e.i(404010);let g=(0,o.createStaticStyles)(({css:e,cssVar:t})=>({container:e`
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
      ${o.responsive.sm} {
        margin-block-end: 24px;
        font-size: 16px;
        text-align: center;
      }
    `,hightlight:(0,o.cx)(r.lobeStaticStylish.gradientAnimation,e`
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
      ${o.responsive.sm} {
        font-size: 26px;
        text-align: center;
      }
    `})),b=(0,c.memo)(({actions:e,description:r,mobile:o,style:b,title:y,variant:x})=>{let{t:w}=(0,d.useTranslation)("landing"),v=(0,s.usePathname)(),k=f.CALLBACK_FOOTER_CLOUD_UTM[x]??f.CALLBACK_FOOTER_CLOUD_UTM.discover,S=(0,c.useMemo)(()=>"discover"===x?(0,h.getDiscoverResourceIdFromPathname)(v)??void 0:"icons"===x?(0,h.getIconsResourceIdFromPathname)(v)??void 0:void 0,[x,v]);return(0,t.jsxs)(a.Center,{className:g.container,gap:32,style:b,children:[(0,t.jsx)(i.Block,{align:"center",height:128,justify:"center",style:{borderRadius:28,boxShadow:"0 8px 32px rgba(0, 0, 0, 0.05)",zIndex:10},variant:"outlined",width:128,children:(0,t.jsx)(l.LobeHub,{size:100})}),(0,t.jsxs)(n.Flexbox,{align:"center",style:{zIndex:1},children:[(0,t.jsx)(p.default,{align:o?"center":void 0,style:{letterSpacing:"-0.04em",minHeight:"unset"},weight:"bolder",children:y??"Agent teammates that grow with you"}),(0,t.jsx)(m.default,{align:o?"center":void 0,as:"h3",children:r??w("footer.desc")})]}),e||(0,t.jsx)(u.default,{cloudCtaUtm:k,mobile:o,utmTerm:S})]})});e.s(["default",0,b,"styles",0,g])},770990,e=>{"use strict";let t=(0,e.i(456420).default)("image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);e.s(["ImageIcon",0,t],770990)},953552,e=>{"use strict";var t=e.i(843476),i=e.i(128709),a=e.i(184283),n=e.i(271645);let r=(0,a.createStaticStyles)(({css:e})=>({container:e`
    width: min(100%, 560px);

    font-size: 44px;
    font-weight: bold;
    line-height: 1.4;
    letter-spacing: -0.04em;
    ${a.responsive.sm} {
      font-size: 28px;
    }
  `})),l=(0,n.memo)(({children:e,className:n,...l})=>(0,t.jsx)(i.Text,{as:"h2",className:(0,a.cx)(r.container,n),...l,children:e}));e.s(["default",0,l])},126021,e=>{"use strict";var t=e.i(206868),i=e.i(492435),a=e.i(58125),n=e.i(184283),r=e.i(225913);let l="12px 16px",o=e=>e||0===e?`${"string"==typeof e?e:`${e}px`} !important`:l,s=(0,n.createStaticStyles)(({css:e,cssVar:t})=>({borderless:e`
      &.${"ant"}-collapse {
        .${"ant"}-collapse-header {
          padding-inline: 0;
        }
        .${"ant"}-collapse-panel {
          padding-inline: 0;
          .${"ant"}-collapse-body {
            padding-inline: 0;
          }
        }
      }
    `,desc:e`
      font-size: 12px;
      color: ${t.colorTextDescription};
    `,filledDark:e`
      &.${"ant"}-collapse {
        .${"ant"}-collapse-item {
          background: ${t.colorBgLayout};
          .${"ant"}-collapse-panel {
            margin-inline: 3px;
            margin-block-end: 3px;
            border-radius: ${t.borderRadius};
            ${a.staticStylish.variantOutlinedWithoutHover};
          }
        }
      }
    `,filledLight:e`
      &.${"ant"}-collapse {
        .${"ant"}-collapse-item {
          background: ${t.colorFillQuaternary};
          .${"ant"}-collapse-panel {
            margin-inline: 3px;
            margin-block-end: 3px;
            border-radius: ${t.borderRadius};
            ${a.staticStylish.variantOutlinedWithoutHover};
            background: ${t.colorBgContainer};
            ${a.staticStylish.shadow};
          }
        }
      }
    `,gapOutlined:e`
      &.${"ant"}-collapse {
        border: none;
        background: transparent;
        .${"ant"}-collapse-item {
          border: 1px solid ${t.colorFillSecondary};
          background: ${t.colorBgContainer};
        }

        .${"ant"}-collapse-item:not(:first-child) {
          .${"ant"}-collapse-header {
            border-block-start: none;
          }
        }
      }
    `,gapRoot:e`
      &.${"ant"}-collapse {
        display: flex;
        flex-direction: column;
        border: none;
        box-shadow: none;
        .${"ant"}-collapse-item {
          border: none;
          border-radius: ${t.borderRadiusLG};
        }
      }
    `,hideCollapsibleIcon:e`
      .${"ant"}-collapse-expand-icon {
        display: none !important;
      }
    `,icon:e`
      cursor: pointer;
      transition: all 100ms ${t.motionEaseOut};
    `,outlined:e`
      &.${"ant"}-collapse {
        border: 1px solid ${t.colorFillSecondary};
        background: ${t.colorBgContainer};
        .${"ant"}-collapse-item .${"ant"}-collapse-header {
          transition: none;
        }
        .${"ant"}-collapse-item-active .${"ant"}-collapse-header {
          border-block-end: 1px solid ${t.colorFillTertiary};
        }
        .${"ant"}-collapse-item:not(:first-child) {
          .${"ant"}-collapse-header {
            border-block-start: 1px solid ${t.colorFillTertiary};
          }
        }
      }
    `,root:e`
      &.${"ant"}-collapse {
        display: flex;
        flex-direction: column;
        background: transparent;

        .${"ant"}-collapse-header {
          overflow: hidden;
          display: flex;
          flex: none;
          gap: 0.75em;
          align-items: flex-start;

          border-radius: 0 !important;

          .${"ant"}-collapse-header-text {
            flex: 1;
          }

          .${"ant"}-collapse-expand-icon {
            align-items: center;
            min-height: 28px;
            margin: 0;
            padding: 0;
          }

          .${"ant"}-collapse-extra {
            display: flex;
            align-items: center;
            min-height: 28px;
          }
        }

        .${"ant"}-collapse-panel {
          background: transparent;
        }
      }
    `,title:e`
      font-size: 16px;
      font-weight: 500;
      line-height: 28px;
    `})),c=(0,r.cva)(s.root,{compoundVariants:[{class:s.gapOutlined,gap:!0,variant:"outlined"},{class:s.filledDark,isDarkMode:!0,variant:"filled"},{class:s.filledLight,isDarkMode:!1,variant:"filled"}],defaultVariants:{collapsible:!0,gap:!1,isDarkMode:!1},variants:{collapsible:{false:s.hideCollapsibleIcon,true:null},gap:{false:null,true:s.gapRoot},isDarkMode:{false:null,true:null},variant:{borderless:s.borderless,filled:null,outlined:s.outlined}}});var d=e.i(271645),u=e.i(843476),p=e.i(988122),p=p,m=e.i(592143),f=e.i(639007),h=e.i(716327);let g=(0,d.memo)(({style:e,variant:a="filled",gap:r=0,className:g,padding:b=l,size:y,collapsible:x=!0,items:w,styles:v,classNames:k,ref:S,...$})=>{let{isDarkMode:C}=(0,f.useThemeMode)(),j=(0,d.useMemo)(()=>w.map(({icon:e,desc:a,label:r,...l})=>{let o=(0,u.jsx)("div",{className:(0,n.cx)(s.title,!e&&!a&&k?.header,k?.title),style:{...!e&&!a?v?.header:{},...v?.title},children:r});return e&&(o=(0,u.jsxs)(t.default,{horizontal:!0,className:(0,n.cx)(s.title,!a&&k?.header),gap:8,style:a?void 0:v?.header,children:[(0,d.isValidElement)(e)?e:(0,u.jsx)(i.default,{icon:e,size:{size:"1.1em"}}),o]})),a&&(o=(0,u.jsxs)(t.default,{className:k?.header,style:v?.header,children:[o,(0,u.jsx)("div",{className:(0,n.cx)(s.desc,k?.desc),style:v?.desc,children:a})]})),{label:o,...l}}),[w,k,v,s]);return(0,u.jsx)(m.ConfigProvider,{theme:{components:{Collapse:{contentPadding:o("object"==typeof b?b?.body:b),headerPadding:o("object"==typeof b?b?.header:b)}}},children:(0,u.jsx)(p.default,{ghost:!0,className:(0,n.cx)(c({collapsible:x,gap:!!r,isDarkMode:C,variant:a}),g),collapsible:x?"header":"icon",items:j,ref:S,size:y,expandIcon:({isActive:e})=>(0,u.jsx)(i.default,{className:s.icon,icon:h.ChevronDown,size:16,style:{rotate:e?void 0:"-90deg"}}),style:{gap:r,...e},...$})})});g.displayName="Collapse",e.s(["default",0,g],126021)},765812,e=>{"use strict";var t=e.i(126021);e.s(["Collapse",()=>t.default])},790882,e=>{"use strict";var t=e.i(843476),i=e.i(184283),a=e.i(271645);let n=(0,i.createStaticStyles)(({css:e})=>({bg1:e`
    position: absolute;
    inset-block-start: 25%;
    inset-inline-end: 0;

    aspect-ratio: 1;
    width: 50%;
    border-radius: 50%;

    background: var(--bg1-color);
  `,bg2:e`
    position: absolute;
    inset-block-end: 0;
    inset-inline-start: 0;

    aspect-ratio: 1;
    width: 50%;
    border-radius: 50%;

    background: var(--bg2-color);
  `,container:e`
    position: absolute;
    z-index: 0;
    inset-block-start: 16vh;
    inset-inline-start: 0;
    transform: scale(1.2);

    width: 100%;
    height: 100vh;

    opacity: 0.5;
    filter: blur(320px);
  `})),r=(0,a.memo)(({colors:e=[i.cssVar.purple,i.cssVar.gold]})=>(0,t.jsxs)("div",{className:n.container,style:{"--bg1-color":e[0],"--bg2-color":e[1]},children:[(0,t.jsx)("div",{className:n.bg1}),(0,t.jsx)("div",{className:n.bg2})]}));e.s(["default",0,r])},593698,e=>{"use strict";var t=e.i(643957);e.s(["CheckIcon",()=>t.default])},463134,e=>{"use strict";let t=(0,e.i(456420).default)("video",[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",key:"ftymec"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2",key:"158x01"}]]);e.s(["default",0,t])},438583,e=>{"use strict";var t=e.i(463134);e.s(["Video",()=>t.default])},643957,e=>{"use strict";let t=(0,e.i(456420).default)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);e.s(["default",0,t])},689664,e=>{"use strict";var t=e.i(643957);e.s(["Check",()=>t.default])},328235,e=>{"use strict";var t=e.i(649637),i=e.i(232839),a=e.i(207670),n=e.i(271645),r=e.i(830731),l=e.i(737434);let{ESC:o,TAB:s}=r.default,c=(0,n.forwardRef)((e,t)=>{let{overlay:a,arrow:r,prefixCls:l}=e,o=(0,n.useMemo)(()=>"function"==typeof a?a():a,[a]),s=(0,i.composeRef)(t,(0,i.getNodeRef)(o));return n.default.createElement(n.default.Fragment,null,r&&n.default.createElement("div",{className:`${l}-arrow`}),n.default.cloneElement(o,{ref:(0,i.supportRef)(o)?s:void 0}))}),d={adjustX:1,adjustY:1},u=[0,0],p={topLeft:{points:["bl","tl"],overflow:d,offset:[0,-4],targetOffset:u},top:{points:["bc","tc"],overflow:d,offset:[0,-4],targetOffset:u},topRight:{points:["br","tr"],overflow:d,offset:[0,-4],targetOffset:u},bottomLeft:{points:["tl","bl"],overflow:d,offset:[0,4],targetOffset:u},bottom:{points:["tc","bc"],overflow:d,offset:[0,4],targetOffset:u},bottomRight:{points:["tr","br"],overflow:d,offset:[0,4],targetOffset:u}};function m(){return(m=Object.assign.bind()).apply(this,arguments)}let f=n.default.forwardRef((e,r)=>{let{arrow:d=!1,prefixCls:u="rc-dropdown",transitionName:f,animation:h,align:g,placement:b="bottomLeft",placements:y=p,getPopupContainer:x,showAction:w,hideAction:v,overlayClassName:k,overlayStyle:S,visible:$,trigger:C=["hover"],autoFocus:j,overlay:T,children:N,onVisibleChange:P,...I}=e,[A,R]=n.default.useState(),O="visible"in e?$:A,E=h?`${u}-${h}`:f,M=n.default.useRef(null),L=n.default.useRef(null),z=n.default.useRef(null);n.default.useImperativeHandle(r,()=>M.current);let F=e=>{R(e),P?.(e)};!function({visible:e,triggerRef:t,onVisibleChange:i,autoFocus:a,overlayRef:r}){let c=n.useRef(!1),d=()=>{e&&(t.current?.focus?.(),i?.(!1))},u=()=>!!r.current?.focus&&(r.current.focus(),c.current=!0,!0),p=e=>{switch(e.keyCode){case o:d();break;case s:{let t=!1;c.current||(t=u()),t?e.preventDefault():d()}}};n.useEffect(()=>e?(window.addEventListener("keydown",p),a&&(0,l.default)(u,3),()=>{window.removeEventListener("keydown",p),c.current=!1}):()=>{c.current=!1},[e])}({visible:O,triggerRef:z,onVisibleChange:F,autoFocus:j,overlayRef:L});let H=()=>n.default.createElement(c,{ref:L,overlay:T,prefixCls:u,arrow:d}),D=n.default.cloneElement(N,{className:(0,a.clsx)(N.props?.className,O&&(()=>{let{openClassName:t}=e;return void 0!==t?t:`${u}-open`})()),ref:(0,i.supportRef)(N)?(0,i.composeRef)(z,(0,i.getNodeRef)(N)):void 0}),B=v;return B||-1===C.indexOf("contextMenu")||(B=["click"]),n.default.createElement(t.default,m({builtinPlacements:y},I,{prefixCls:u,ref:M,popupClassName:(0,a.clsx)(k,{[`${u}-show-arrow`]:d}),popupStyle:S,action:C,showAction:w,hideAction:B,popupPlacement:b,popupAlign:g,popupMotion:{motionName:E},popupVisible:O,stretch:(()=>{let{minOverlayWidthMatchTrigger:t,alignPoint:i}=e;return"minOverlayWidthMatchTrigger"in e?t:!i})()?"minWidth":"",popup:"function"==typeof T?H:H(),onOpenChange:F,onPopupClick:t=>{let{onOverlayClick:i}=e;R(!1),i&&i(t)},getPopupContainer:x}),D)});e.s(["default",0,f],328235)},135193,e=>{"use strict";e.s(["easeInOutCubic",0,function(e,t,i,a){let n=i-t;return(e/=a/2)<1?n/2*e*e*e+t:n/2*((e-=2)*e*e+2)+t}])},375147,e=>{"use strict";var t=e.i(806520);let i=e=>(0,t.isNonNullable)(e)&&e===e.window;e.s(["default",0,e=>{if("u"<typeof window)return 0;let t=0;return i(e)?t=e.pageYOffset:e instanceof Document?t=e.documentElement.scrollTop:e instanceof HTMLElement?t=e.scrollTop:e&&(t=e.scrollTop),e&&!i(e)&&"number"!=typeof t&&(t=(e.ownerDocument??e).documentElement?.scrollTop),t},"isWindow",0,i])},451961,e=>{"use strict";var t=e.i(737434),i=e.i(135193),a=e.i(375147);e.s(["default",0,function(e,n={}){let r,{getContainer:l=()=>window,callback:o,duration:s=450}=n,c=l(),d=(0,a.default)(c),u=Date.now(),p=()=>{let n=Date.now()-u,l=(0,i.easeInOutCubic)(n>s?s:n,d,e,s);(0,a.isWindow)(c)?c.scrollTo(window.pageXOffset,l):c instanceof Document||"HTMLDocument"===c.constructor.name?c.documentElement.scrollTop=l:c.scrollTop=l,n<s?r=(0,t.default)(p):"function"==typeof o&&o()};return r=(0,t.default)(p),()=>{t.default.cancel(r)}}])},21539,e=>{"use strict";var t=e.i(618316);e.i(247167);var i=e.i(271645),a=e.i(867384),n=e.i(207670),r=e.i(920228),l=e.i(242064),o=e.i(38243),s=e.i(249616);let c=e=>{let{getPopupContainer:c,getPrefixCls:d,direction:u}=i.useContext(l.ConfigContext),{prefixCls:p,type:m="default",danger:f,disabled:h,loading:g,onClick:b,htmlType:y,children:x,className:w,menu:v,arrow:k,autoFocus:S,trigger:$,align:C,open:j,onOpenChange:T,placement:N,getPopupContainer:P,href:I,icon:A=i.createElement(a.default,null),title:R,buttonsRender:O=e=>e,mouseEnterDelay:E,mouseLeaveDelay:M,overlayClassName:L,overlayStyle:z,destroyOnHidden:F,destroyPopupOnHide:H,dropdownRender:D,popupRender:B,...U}=e,W=d("dropdown",p),q=`${W}-button`,G={menu:v,arrow:k,autoFocus:S,align:C,disabled:h,trigger:h?[]:$,onOpenChange:T,getPopupContainer:P||c,mouseEnterDelay:E,mouseLeaveDelay:M,classNames:{root:L},styles:{root:z},destroyOnHidden:F,popupRender:B||D},{compactSize:_,compactItemClassnames:V}=(0,s.useCompactItemContext)(W,u),K=(0,n.clsx)(q,V,w);"destroyPopupOnHide"in e&&(G.destroyPopupOnHide=H),"open"in e&&(G.open=j),"placement"in e?G.placement=N:G.placement="rtl"===u?"bottomLeft":"bottomRight";let[X,Y]=O([i.createElement(r.default,{type:m,danger:f,disabled:h,loading:g,onClick:b,htmlType:y,href:I,title:R},x),i.createElement(r.default,{type:m,danger:f,icon:A})]);return i.createElement(o.default.Compact,{className:K,size:_,block:!0,...U},X,i.createElement(t.default,{...G},Y))};c.__ANT_BUTTON=!0;let d=t.default;d.Button=c,e.s(["default",0,d],21539)},291542,e=>{"use strict";var t=e.i(221479);e.s(["Table",()=>t.default])},33612,658726,302670,e=>{"use strict";e.i(822315);var t,i,a,n,r=e.i(643289);(t={}).Payment="payment",t.Subscription="subscription";var l=((i={}).Free="free",i.Premium="premium",i.Starter="starter",i.Ultimate="ultimate",i),o=((a={}).Monthly="monthly",a.Yearly="yearly",a);e.s(["Plans",()=>l,"Recurring",()=>o],658726),(n={})[n.Active=0]="Active",n[n.Cancelled=1]="Cancelled",n[n.Inactive=2]="Inactive";let s={[l.Free]:{id:l.Free,limit:{credit:.5,embeddingStorage:100,fileStorage:0xa00000},price:{monthly:0,yearly:0}},[l.Starter]:{id:l.Starter,limit:{credit:5,embeddingStorage:5e3,fileStorage:0x40000000},price:{monthly:12.9,yearly:9.9}},[l.Premium]:{id:l.Premium,limit:{credit:15,embeddingStorage:1e4,fileStorage:0x80000000},price:{monthly:24.9,yearly:19.9}},[l.Ultimate]:{id:l.Ultimate,limit:{credit:35,embeddingStorage:2e4,fileStorage:0x100000000},price:{monthly:49.9,yearly:39.9}}};s[l.Free].limit.credit,e.s(["CREDIT_UNIT",0,1e6,"TOKEN_PER_MESSAGE",0,2500,"subscriptionPlan",0,s],302670);var c=e.i(352455);let d=e=>(0,r.default)(e).format("0,0");e.s(["format",0,d,"formatCredit",0,e=>d(1e6*e),"formatCreditPerKToken",0,e=>d(1e3*e),"formatModelMessageCount",0,(e,t,i)=>(0,c.formatIntergerNumber)(100*Math.round(1e6*e/(2500*(.3*i+.7*t))/100))],33612)},235056,275043,e=>{"use strict";let t=(0,e.i(456420).default)("circle-question-mark",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);e.s(["default",0,t],275043),e.s(["CircleHelp",0,t],235056)},522571,e=>{"use strict";var t=e.i(843476),i=e.i(208544),a=e.i(215648);let n=(0,e.i(271645).memo)(({children:e,tag:n,...r})=>(0,t.jsxs)(i.Flexbox,{align:"center",flex:"none",gap:12,horizontal:!0,style:{textWrap:"nowrap"},...r,children:[e,n&&(0,t.jsx)(a.Tag,{style:{margin:0},children:n})]}));e.s(["default",0,n])},52655,928051,770225,e=>{"use strict";var t=e.i(843476),i=e.i(836516);e.s(["ModelIcon",()=>i.default],928051);var i=i,a=e.i(291542);let n={chatModels:[{abilities:{functionCall:!0,vision:!0},contextWindowTokens:1047576,description:"GPT-4.1 是我们用于复杂任务的旗舰模型。它非常适合跨领域解决问题。",displayName:"GPT-4.1",enabled:!0,id:"gpt-4.1",maxOutput:32768,pricing:{cachedInput:.5,input:2,output:8},releasedAt:"2025-04-14",type:"chat"},{abilities:{functionCall:!0,vision:!0},contextWindowTokens:1047576,description:"GPT-4.1 mini 提供了智能、速度和成本之间的平衡，使其成为许多用例中有吸引力的模型。",displayName:"GPT-4.1 mini",enabled:!0,id:"gpt-4.1-mini",maxOutput:32768,pricing:{cachedInput:.1,input:.4,output:1.6},releasedAt:"2025-04-14",type:"chat"},{abilities:{functionCall:!0,vision:!0},contextWindowTokens:1047576,description:"GPT-4.1 mini 提供了智能、速度和成本之间的平衡，使其成为许多用例中有吸引力的模型。",displayName:"GPT-4.1 nano",enabled:!0,id:"gpt-4.1-nano",maxOutput:32768,pricing:{cachedInput:.025,input:.1,output:.4},releasedAt:"2025-04-14",type:"chat"},{abilities:{functionCall:!0,vision:!0},contextWindowTokens:128e3,description:"GPT-4o mini是OpenAI在GPT-4 Omni之后推出的最新模型，支持图文输入并输出文本。作为他们最先进的小型模型，它比其他近期的前沿模型便宜很多，并且比GPT-3.5 Turbo便宜超过60%。它保持了最先进的智能，同时具有显著的性价比。GPT-4o mini在MMLU测试中获得了 82% 的得分，目前在聊天偏好上排名高于 GPT-4。",displayName:"GPT-4o mini",id:"gpt-4o-mini",maxOutput:16385,pricing:{cachedInput:.075,input:.15,output:.6},releasedAt:"2024-07-18",type:"chat"},{abilities:{functionCall:!0,vision:!0},contextWindowTokens:128e3,description:"ChatGPT-4o 是一款动态模型，实时更新以保持当前最新版本。它结合了强大的语言理解与生成能力，适合于大规模应用场景，包括客户服务、教育和技术支持。",displayName:"GPT-4o",enabled:!0,id:"gpt-4o",pricing:{cachedInput:1.25,input:2.5,output:10},releasedAt:"2024-05-13",type:"chat"},{abilities:{vision:!0},contextWindowTokens:128e3,description:"ChatGPT-4o 是一款动态模型，实时更新以保持当前最新版本。它结合了强大的语言理解与生成能力，适合于大规模应用场景，包括客户服务、教育和技术支持。",displayName:"ChatGPT-4o",enabled:!0,id:"chatgpt-4o-latest",pricing:{input:5,output:15},releasedAt:"2024-08-14",type:"chat"},{abilities:{functionCall:!0,vision:!0},contextWindowTokens:128e3,description:"最新的 GPT-4 Turbo 模型具备视觉功能。现在，视觉请求可以使用 JSON 模式和函数调用。 GPT-4 Turbo 是一个增强版本，为多模态任务提供成本效益高的支持。它在准确性和效率之间找到平衡，适合需要进行实时交互的应用程序场景。",displayName:"GPT-4 Turbo",id:"gpt-4-turbo",pricing:{input:10,output:30},type:"chat"},{contextWindowTokens:128e3,description:"o1-mini是一款针对编程、数学和科学应用场景而设计的快速、经济高效的推理模型。该模型具有128K上下文和2023年10月的知识截止日期。",displayName:"OpenAI o1-mini",enabled:!0,id:"o1-mini",maxOutput:65536,pricing:{cachedInput:.55,input:1.1,output:4.4},releasedAt:"2024-09-12",type:"chat"},{abilities:{functionCall:!0,reasoning:!0,vision:!0},contextWindowTokens:2e5,description:"Claude 3.7 Sonnet 是 Anthropic 迄今为止最智能的模型，也是市场上首个混合推理模型。Claude 3.7 Sonnet 可以产生近乎即时的响应或延长的逐步思考，用户可以清晰地看到这些过程。API 用户还可以对模型思考的时间进行细致的控制",displayName:"Claude 3.7 Sonnet",enabled:!0,id:"claude-3-7-sonnet-latest",maxOutput:8192,pricing:{cachedInput:.3,input:3,output:15,writeCacheInput:3.75},settings:{extendParams:["disableContextCaching","enableReasoning","reasoningBudgetToken"]},type:"chat"},{abilities:{functionCall:!0,vision:!0},contextWindowTokens:2e5,description:"Claude 3.5 Sonnet 提供了超越 Opus 的能力和比 Sonnet 更快的速度，同时保持与 Sonnet 相同的价格。Sonnet 特别擅长编程、数据科学、视觉处理、代理任务。",displayName:"Claude 3.5 Sonnet New",enabled:!0,id:"claude-3-5-sonnet-latest",maxOutput:8192,pricing:{cachedInput:.3,input:3,output:15,writeCacheInput:3.75},settings:{extendParams:["disableContextCaching"]},type:"chat"},{abilities:{functionCall:!0,vision:!0},contextWindowTokens:2e5,description:"Claude 3.5 Sonnet 提供了超越 Opus 的能力和比 Sonnet 更快的速度，同时保持与 Sonnet 相同的价格。Sonnet 特别擅长编程、数据科学、视觉处理、代理任务。",displayName:"Claude 3.5 Sonnet 0620",id:"claude-3-5-sonnet-20240620",maxOutput:8192,pricing:{cachedInput:.3,input:3,output:15,writeCacheInput:3.75},releasedAt:"2024-06-20",settings:{extendParams:["disableContextCaching"]},type:"chat"},{abilities:{functionCall:!0},contextWindowTokens:2e5,description:"Claude 3.5 Haiku 是 Anthropic 最快的下一代模型。与 Claude 3 Haiku 相比，Claude 3.5 Haiku 在各项技能上都有所提升，并在许多智力基准测试中超越了上一代最大的模型 Claude 3 Opus。",displayName:"Claude 3.5 Haiku",enabled:!0,id:"claude-3-5-haiku-latest",maxOutput:8192,pricing:{cachedInput:.1,input:1,output:5,writeCacheInput:1.25},releasedAt:"2024-11-05",settings:{extendParams:["disableContextCaching"]},type:"chat"},{abilities:{functionCall:!0,vision:!0},contextWindowTokens:2e5,description:"Claude 3 Opus 是 Anthropic 用于处理高度复杂任务的最强大模型。它在性能、智能、流畅性和理解力方面表现卓越。",displayName:"Claude 3 Opus",enabled:!0,id:"claude-3-opus-20240229",maxOutput:4096,pricing:{input:15,output:75},releasedAt:"2024-02-29",type:"chat"},{abilities:{functionCall:!0,vision:!0},contextWindowTokens:2e5,description:"Claude 3 Haiku 是 Anthropic 的最快且最紧凑的模型，旨在实现近乎即时的响应。它具有快速且准确的定向性能。",displayName:"Claude 3 Haiku",id:"claude-3-haiku-20240307",maxOutput:4096,pricing:{input:.25,output:1.25},releasedAt:"2024-03-07",type:"chat"},{abilities:{vision:!0},contextWindowTokens:1048576,displayName:"Gemini 2.5 Pro Preview",enabled:!0,id:"gemini-2.5-pro-preview-03-25",maxOutput:8192,pricing:{cachedInput:.875,input:1.25,output:10},releasedAt:"2025-03-25",type:"chat"},{abilities:{imageOutput:!0,vision:!0},contextWindowTokens:32768,description:"Gemini 2.0 Flash 实验模型，支持图像生成",displayName:"Gemini 2.0 Flash (Image Generation) Experimental",enabled:!0,id:"gemini-2.0-flash-exp-image-generation",maxOutput:8192,pricing:{input:0,output:0},releasedAt:"2025-03-14",type:"chat"},{abilities:{functionCall:!0,vision:!0},contextWindowTokens:1056768,description:"Gemini 2.0 Flash 提供下一代功能和改进，包括卓越的速度、原生工具使用、多模态生成和1M令牌上下文窗口。",displayName:"Gemini 2.0 Flash",enabled:!0,id:"gemini-2.0-flash",maxOutput:8192,pricing:{cachedInput:.025,input:.1,output:.4},releasedAt:"2025-02-05",type:"chat"},{abilities:{functionCall:!0},contextWindowTokens:65536,description:"最新模型 DeepSeek-V3 多项评测成绩超越 Qwen2.5-72B 和 Llama-3.1-405B 等开源模型，性能对齐领军闭源模型 GPT-4o 与 Claude-3.5-Sonnet。",displayName:"DeepSeek V3",enabled:!0,id:"deepseek-chat",pricing:{cachedInput:.07,input:.28,output:1.1},releasedAt:"2024-12-26",type:"chat"},{abilities:{reasoning:!0},contextWindowTokens:65536,description:"DeepSeek 推出的推理模型。在输出最终回答之前，模型会先输出一段思维链内容，以提升最终答案的准确性。",displayName:"DeepSeek R1",enabled:!0,id:"deepseek-reasoner",pricing:{cachedInput:.14,input:.55,output:2.19},releasedAt:"2025-01-20",type:"chat"}],description:"LobeHub Cloud 通过官方部署的 API 来实现 AI 模型的调用，并采用 Credits 计算积分的方式来衡量 AI 模型的用量，对应大模型使用的 Tokens。",enabled:!0,id:"lobehub",modelsUrl:"https://lobehub.com/zh/docs/usage/subscription/model-pricing",name:"LobeHub",smoothing:{text:!0},url:"https://lobehub.com"};e.s(["default",0,n],770225);var r=e.i(352455),l=e.i(522571);e.s(["default",0,({locale:e="en",style:o,...s})=>{let c="en"===e,d=[{dataIndex:"displayName",key:"displayName",render:(e,a)=>(0,t.jsxs)(l.default,{children:[(0,t.jsx)(i.default,{model:a.id,size:24}),`${e} (${(0,r.formatTokenNumber)(a.contextWindowTokens)})`]}),title:c?"Modals":"模型",width:250},{align:"right",dataIndex:"pricing",key:"input",render:e=>(0,t.jsx)(l.default,{justify:"flex-end",tag:c?"Credits":"计算积分",children:(0,t.jsx)("span",{style:{fontWeight:500},children:(0,r.formatNumber)(e?.input)+"M"})}),title:(0,t.jsx)(l.default,{justify:"flex-end",tag:"1M Tokens",children:c?"Input":"输入"}),width:180},{align:"right",dataIndex:"pricing",key:"output",render:e=>(0,t.jsx)(l.default,{justify:"flex-end",tag:c?"Credits":"计算积分",children:(0,t.jsx)("span",{style:{fontWeight:500},children:(0,r.formatNumber)(e?.output)+"M"})}),title:(0,t.jsx)(l.default,{justify:"flex-end",tag:"1M Tokens",children:c?"Output":"输出"}),width:180}];return(0,t.jsx)(a.Table,{columns:d,dataSource:n.chatModels,pagination:!1,rowKey:"id",style:{width:"fit-content",...o},...s})}],52655)},262633,e=>{"use strict";var t=e.i(425444);e.s(["Brain",()=>t.default])},809584,e=>{"use strict";let t=(0,e.i(456420).default)("database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);e.s(["Database",0,t],809584)},150285,e=>{"use strict";let t=(0,e.i(456420).default)("hard-drive",[["path",{d:"M10 16h.01",key:"1bzywj"}],["path",{d:"M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"18tbho"}],["path",{d:"M21.946 12.013H2.054",key:"zqlbp7"}],["path",{d:"M6 16h.01",key:"1pmjb7"}]]);e.s(["HardDrive",0,t],150285)},328623,e=>{"use strict";var t=e.i(188873);e.s(["Sparkles",()=>t.default])},176699,e=>{"use strict";let t=(0,e.i(456420).default)("minus",[["path",{d:"M5 12h14",key:"1ays0h"}]]);e.s(["default",0,t])},420985,e=>{"use strict";let t=(0,e.i(456420).default)("life-buoy",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m4.93 4.93 4.24 4.24",key:"1ymg45"}],["path",{d:"m14.83 9.17 4.24-4.24",key:"1cb5xl"}],["path",{d:"m14.83 14.83 4.24 4.24",key:"q42g0n"}],["path",{d:"m9.17 14.83-4.24 4.24",key:"bqpfvv"}],["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}]]);e.s(["default",0,t])},520469,e=>{"use strict";var t=e.i(843476),i=e.i(450354),a=e.i(765812),n=e.i(208544),r=e.i(128709),l=e.i(184283);let o=(0,e.i(456420).default)("mail",[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]]);var s=e.i(271645);e.i(785269);var c=e.i(345771),d=e.i(322831),u=e.i(953552),p=e.i(347782),m=e.i(892766);let f="LobeHub Cloud",h=(0,l.createStaticStyles)(({css:e,cssVar:t})=>({icon:e`
    transition: all 100ms ${t.motionEaseOut};
  `,itemTitle:e`
    .ant-collapse-title {
      flex: 1 !important;
    }
  `,title:e`
    margin-block-end: 0.5em;
    font-size: 32px;
    font-weight: bold;
    line-height: 1.2;
    ${l.responsive.sm} {
      font-size: 26px;
      text-align: center;
    }
  `})),g=(0,s.memo)(({mobile:e})=>{let{t:l}=(0,d.useTranslation)("subscription"),s=[{children:l("qa.list.whatIs.a"),key:"whatIs",label:l("qa.list.whatIs.q")},{children:l("qa.list.howToUse.a"),key:"howToUse",label:l("qa.list.howToUse.q")},{children:l("qa.list.cost.a",{cloud:f}),key:"cost",label:l("qa.list.cost.q")},{children:l("qa.list.credit.a",{cloud:f}),key:"credit",label:l("qa.list.credit.q",{cloud:f})},{children:l("qa.list.community.a"),key:"community",label:l("qa.list.community.q")},{children:l("qa.list.opensource.a"),key:"opensource",label:l("qa.list.opensource.q")}];return(0,t.jsxs)(n.Flexbox,{gap:32,horizontal:!e,paddingBlock:16,width:"100%",wrap:"wrap",children:[(0,t.jsxs)(n.Flexbox,{flex:1,gap:16,children:[(0,t.jsx)(u.default,{children:l("qa.title")}),(0,t.jsx)(r.Text,{as:"p",fontSize:16,children:(0,t.jsxs)(c.Trans,{i18nKey:"qa.desc",ns:"subscription",children:["若没有回答到您想了解的问题, 可以查阅",(0,t.jsx)(p.default,{href:"/docs/usage/subscription/model-pricing",children:"产品文档"}),"获取更多常见问题，同时欢迎与我们联系。"]})}),(0,t.jsxs)(n.Flexbox,{gap:8,horizontal:!e,paddingBlock:24,children:[(0,t.jsx)(p.default,{href:(0,m.mailTo)(m.SUPPORT_MAIL),style:e?{flex:1}:{},target:"_blank",children:(0,t.jsx)(i.Button,{block:e,icon:o,size:"large",style:{minWidth:144},children:l("qa.support.email")})}),(0,t.jsx)(p.default,{href:m.DISCORD_URL,style:e?{flex:1}:{},target:"_blank",children:(0,t.jsx)(i.Button,{block:e,size:"large",style:{minWidth:144},children:l("qa.support.community")})})]})]}),(0,t.jsx)(n.Flexbox,{flex:2,children:(0,t.jsx)(a.Collapse,{accordion:!0,className:h.itemTitle,expandIconPlacement:"end",gap:12,items:s,variant:"outlined"})})]})});e.s(["default",0,g],520469)}]);
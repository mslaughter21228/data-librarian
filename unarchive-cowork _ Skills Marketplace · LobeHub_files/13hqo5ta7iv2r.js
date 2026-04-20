(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,739217,e=>{"use strict";e.i(247167);var t=e.i(271645),r=e.i(247153);e.i(63335);var i=e.i(943081),a=e.i(50824),o=e.i(207670),l=e.i(711517),n=e.i(763731),s=e.i(242064);let u=t.default.createContext({});var c=e.i(806520),d=e.i(618316);let p=({children:e})=>{let{getPrefixCls:r}=t.useContext(s.ConfigContext),i=r("breadcrumb"),{classNames:a,styles:l}=t.useContext(u);return t.createElement("li",{className:(0,o.clsx)(`${i}-separator`,a?.separator),style:l?.separator,"aria-hidden":"true"},""===e?e:e||"/")};function m(e,r,i,l){if(!(0,c.isNonNullable)(i))return null;let{className:n,onClick:s,...u}=r,d={...(0,a.default)(u,{data:!0,aria:!0}),onClick:s};return void 0!==l?t.createElement("a",{...d,className:(0,o.clsx)(`${e}-link`,n),href:l},i):t.createElement("span",{...d,className:(0,o.clsx)(`${e}-link`,n)},i)}p.__ANT_BREADCRUMB_SEPARATOR=!0;let f=e=>{let{prefixCls:r,separator:i="/",children:a,menu:l,dropdownProps:n,href:s,dropdownIcon:m}=e,{classNames:f,styles:h}=t.useContext(u),y=(e=>{if(l){let i={...n};if(l){let{items:e,...r}=l||{};i.menu={...r,items:e?.map(({key:e,title:r,label:i,path:a,...o},l)=>{let n=i??r;return a&&(n=t.createElement("a",{href:`${s}${a}`},n)),{...o,key:e??l,label:n}})}}return t.createElement(d.default,{placement:"bottom",...i},t.createElement("span",{className:`${r}-overlay-link`},e,m))}return e})(a);return(0,c.isNonNullable)(y)?t.createElement(t.Fragment,null,t.createElement("li",{className:(0,o.clsx)(`${r}-item`,f?.item),style:h?.item},y),i&&t.createElement(p,null,i)):null},h=e=>{let{prefixCls:r,children:i,href:a,...o}=e,{getPrefixCls:l}=t.useContext(s.ConfigContext),n=l("breadcrumb",r);return t.createElement(f,{...o,prefixCls:n},m(n,o,i,a))};h.__ANT_BREADCRUMB_ITEM=!0,e.i(296059);var y=e.i(915654),v=e.i(183293),g=e.i(246422),b=e.i(838378);let x=(0,g.genStyleHooks)("Breadcrumb",e=>(e=>{let{componentCls:t,iconCls:r,calc:i}=e;return{[t]:{...(0,v.resetComponent)(e),color:e.itemColor,fontSize:e.fontSize,[r]:{fontSize:e.iconFontSize},ol:{display:"flex",flexWrap:"wrap",margin:0,padding:0,listStyle:"none"},[`${t}-item a`]:{color:e.linkColor,transition:`color ${e.motionDurationMid}`,padding:`0 ${(0,y.unit)(e.paddingXXS)}`,borderRadius:e.borderRadiusSM,height:e.fontHeight,display:"inline-block",marginInline:i(e.marginXXS).mul(-1).equal(),"&:hover":{color:e.linkHoverColor,backgroundColor:e.colorBgTextHover},...(0,v.genFocusStyle)(e)},[`${t}-item:last-child`]:{color:e.lastItemColor},[`${t}-separator`]:{marginInline:e.separatorMargin,color:e.separatorColor},[`${t}-link`]:{[`
          > ${r} + span,
          > ${r} + a
        `]:{marginInlineStart:e.marginXXS}},[`${t}-overlay-link`]:{borderRadius:e.borderRadiusSM,height:e.fontHeight,display:"inline-block",padding:`0 ${(0,y.unit)(e.paddingXXS)}`,marginInline:i(e.marginXXS).mul(-1).equal(),[`> ${r}`]:{marginInlineStart:e.marginXXS,fontSize:e.fontSizeIcon},"&:hover":{color:e.linkHoverColor,backgroundColor:e.colorBgTextHover,a:{color:e.linkHoverColor}},a:{"&:hover":{backgroundColor:"transparent"}}},[`&${e.componentCls}-rtl`]:{direction:"rtl"}}}})((0,b.mergeToken)(e,{})),e=>({itemColor:e.colorTextDescription,lastItemColor:e.colorText,iconFontSize:e.fontSize,linkColor:e.colorTextDescription,linkHoverColor:e.colorText,separatorColor:e.colorTextDescription,separatorMargin:e.marginXS}));function k(e){let{breadcrumbName:t,children:r,...i}=e,a={title:t,...i};return r&&(a.menu={items:r.map(({breadcrumbName:e,...t})=>({...t,title:e}))}),a}let S=e=>{let d,{prefixCls:h,separator:y,style:v,className:g,rootClassName:b,routes:S,items:C,children:w,itemRender:E,params:T={},classNames:$,styles:L,dropdownIcon:N,...O}=e,{getPrefixCls:R,direction:j,className:A,style:M,classNames:P,styles:K,separator:B,dropdownIcon:z}=(0,s.useComponentConfig)("breadcrumb"),D=y??B??"/",H=N??z??t.createElement(r.default,null),I=R("breadcrumb",h),[X,q]=x(I),F=(0,t.useMemo)(()=>C||(S?S.map(k):null),[C,S]),_=t.useMemo(()=>({...e,separator:D}),[e,D]),[Q,W]=(0,l.useMergeSemantic)([P,$],[K,L],{props:_}),U=(e,t,r,i,a)=>{if(E)return E(e,t,r,i);let o=function(e,t){if(!(0,c.isNonNullable)(e.title))return null;let r=Object.keys(t).join("|");return(0,c.isPlainObject)(e.title)?e.title:String(e.title).replace(RegExp(`:(${r})`,"g"),(e,r)=>t[r]||e)}(e,t);return m(I,e,o,a)};if(F&&F.length>0){let e=[],r=C||S;d=F.map((i,o)=>{let{path:l,key:n,type:s,menu:u,onClick:c,className:d,style:m,separator:h,dropdownProps:y}=i,v=((e,t)=>{if(void 0===t)return t;let r=(t||"").replace(/^\//,"");return Object.keys(e).forEach(t=>{r=r.replace(`:${t}`,e[t])}),r})(T,l);void 0!==v&&e.push(v);let g=n??o;if("separator"===s)return t.createElement(p,{key:g},h);let b={},x=o===F.length-1;u&&(b.menu=u);let{href:k}=i;return e.length&&void 0!==v&&(k=`#/${e.join("/")}`),t.createElement(f,{key:g,...b,...(0,a.default)(i,{data:!0,aria:!0}),className:d,style:m,dropdownProps:y,dropdownIcon:H,href:k,separator:x?"":D,onClick:c,prefixCls:I},U(i,T,r,e,k))})}else if(w){let e=(0,i.toArray)(w).length;d=(0,i.toArray)(w).map((t,r)=>{if(!t)return t;let i=r===e-1;return(0,n.cloneElement)(t,{separator:i?"":D,key:r})})}let V=(0,o.clsx)(I,A,{[`${I}-rtl`]:"rtl"===j},g,b,Q.root,X,q),Y={...W.root,...M,...v},G=t.useMemo(()=>({classNames:Q,styles:W}),[Q,W]);return t.createElement(u.Provider,{value:G},t.createElement("nav",{className:V,style:Y,...O},t.createElement("ol",null,d)))};S.Item=h,S.Separator=p,e.s(["default",0,S],739217)},690036,e=>{"use strict";var t=e.i(709939);e.s(["CopyButton",()=>t.default])},266894,e=>{"use strict";var t=e.i(184283);let r=(0,t.createStaticStyles)(({css:e,cssVar:t})=>({spotlightDark:e`
    pointer-events: none;

    position: absolute;
    z-index: 1;
    inset: 0;

    border-radius: inherit;

    opacity: var(--spotlight-opacity, 0.1);
    background: radial-gradient(
      var(--spotlight-size, 64px) circle at var(--spotlight-x, 0) var(--spotlight-y, 0),
      ${t.colorText},
      transparent
    );

    transition: all 0.2s;
  `,spotlightDarkOutside:e`
    pointer-events: none;

    position: absolute;
    z-index: 1;
    inset: 0;

    border-radius: inherit;

    opacity: 0;
    background: radial-gradient(
      var(--spotlight-size, 64px) circle at var(--spotlight-x, 0) var(--spotlight-y, 0),
      ${t.colorText},
      transparent
    );

    transition: all 0.2s;
  `,spotlightLight:e`
    pointer-events: none;

    position: absolute;
    z-index: 1;
    inset: 0;

    border-radius: inherit;

    opacity: var(--spotlight-opacity, 0.1);
    background: radial-gradient(
      var(--spotlight-size, 64px) circle at var(--spotlight-x, 0) var(--spotlight-y, 0),
      #fff,
      ${t.colorTextQuaternary}
    );

    transition: all 0.2s;
  `,spotlightLightOutside:e`
    pointer-events: none;

    position: absolute;
    z-index: 1;
    inset: 0;

    border-radius: inherit;

    opacity: 0;
    background: radial-gradient(
      var(--spotlight-size, 64px) circle at var(--spotlight-x, 0) var(--spotlight-y, 0),
      #fff,
      ${t.colorTextQuaternary}
    );

    transition: all 0.2s;
  `}));var i=e.i(271645),a=e.i(843476),o=e.i(639007);let l=(0,i.memo)(({className:e,size:l=64,...n})=>{let[s,u,c]=(()=>{let[e,t]=(0,i.useState)(),[r,a]=(0,i.useState)(!0),o=(0,i.useRef)(null);return(0,i.useEffect)(()=>{if(o.current&&o.current.parentElement){let e=o.current.parentElement,r=r=>{let i=e.getBoundingClientRect();t({x:r.clientX-i.x,y:r.clientY-i.y}),a(!1)},i=()=>{a(!0)};return e.addEventListener("mousemove",r),e.addEventListener("mouseleave",i),()=>{e.removeEventListener("mousemove",r),e.removeEventListener("mouseleave",i)}}},[]),[e,r,o]})(),{isDarkMode:d}=(0,o.useThemeMode)(),p=(0,i.useMemo)(()=>({"--spotlight-opacity":u?"0":"0.1","--spotlight-size":`${l}px`,"--spotlight-x":`${s?.x??0}px`,"--spotlight-y":`${s?.y??0}px`}),[s,l,u]);return(0,a.jsx)("div",{className:(0,t.cx)(d?u?r.spotlightDarkOutside:r.spotlightDark:u?r.spotlightLightOutside:r.spotlightLight,e),ref:c,style:p,...n})});l.displayName="Spotlight",e.s(["default",0,l],266894)},526347,e=>{"use strict";let t=(0,e.i(456420).default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);e.s(["default",0,t])},508734,e=>{"use strict";var t=e.i(526347);e.s(["Copy",()=>t.default])},643957,e=>{"use strict";let t=(0,e.i(456420).default)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);e.s(["default",0,t])},689664,e=>{"use strict";var t=e.i(643957);e.s(["Check",()=>t.default])},709939,373167,e=>{"use strict";var t=e.i(149167),r=e.i(271645);let i=async e=>{try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,document.body.append(t),t.focus(),t.select(),document.execCommand("copy"),t.remove()}};e.s(["copyToClipboard",0,i],373167);var a=e.i(843476),o=e.i(689664),l=e.i(508734);let n=(0,r.memo)(({active:e,content:n,size:s,icon:u,glass:c=!0,onClick:d,...p})=>{let{copied:m,setCopied:f}=(()=>{let[e,t]=(0,r.useState)(!1);(0,r.useEffect)(()=>{if(!e)return;let r=setTimeout(()=>{t(!1)},2e3);return()=>{clearTimeout(r)}},[e]);let i=(0,r.useCallback)(()=>t(!0),[]);return(0,r.useMemo)(()=>({copied:e,setCopied:i}),[e])})(),h=u||l.Copy;return(0,a.jsx)(t.default,{glass:c,size:s,title:"Copy",...p,active:e||m,icon:m?o.Check:h,onClick:async e=>{await i("function"==typeof n?n():n),f(),d?.(e)}})});n.displayName="CopyButton",e.s(["default",0,n],709939)},630299,e=>{"use strict";let t=(0,e.i(456420).default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);e.s(["default",0,t])},649466,872238,e=>{"use strict";var t=e.i(58125),r=e.i(184283),i=e.i(225913);let a=(0,r.createStaticStyles)(({css:e,cssVar:i})=>({borderless:e`
      &[class*='ant-input'] {
        ${t.staticStylish.variantBorderless}
        &:hover {
          ${t.staticStylish.variantBorderlessWithoutHover}
        }
      }
    `,borderlessOPT:e`
      &[class*='ant-otp'] {
        [class*='ant-otp-input'] {
          ${t.staticStylish.variantBorderless};
        }
      }
    `,filled:(0,r.cx)(t.staticStylish.variantFilled,e`
        &:focus-within {
          ${t.staticStylish.variantFilledWithoutHover}
        }
      `),filledOPT:e`
      &[class*='ant-otp'] {
        [class*='ant-otp-input'] {
          ${t.staticStylish.variantFilled};
        }
      }
    `,outlined:t.staticStylish.variantOutlined,outlinedOPT:e`
      &[class*='ant-otp'] {
        [class*='ant-otp-input'] {
          ${t.staticStylish.variantOutlined};
        }
      }
    `,root:e``,rootOPT:e`
      &[class*='ant-otp'] {
        [class*='ant-otp-input'] {
          &:focus-within {
            border-color: ${i.colorBorder};
          }
        }
      }
    `,shadow:t.staticStylish.shadow,shadowOPT:e`
      &[class*='ant-otp'] {
        [class*='ant-otp-input'] {
          ${t.staticStylish.shadow};
        }
      }
    `})),o=(0,i.cva)(a.root,{defaultVariants:{shadow:!1},variants:{variant:{filled:a.filled,outlined:a.outlined,borderless:a.borderless,underlined:null},shadow:{false:null,true:a.shadow}}});(0,i.cva)(a.rootOPT,{defaultVariants:{shadow:!1},variants:{variant:{filled:a.filledOPT,outlined:a.outlinedOPT,borderless:a.borderlessOPT,underlined:null},shadow:{false:null,true:a.shadowOPT}}}),e.s(["variants",0,o],649466);var l=e.i(644099);e.s(["Input",()=>l.default],872238)},848357,e=>{"use strict";var t=e.i(649466),r=e.i(271645),i=e.i(843476),a=e.i(872238),o=e.i(184283),l=e.i(639007);let n=(0,r.memo)(({ref:e,variant:r,shadow:n,className:s,...u})=>{let{isDarkMode:c}=(0,l.useThemeMode)();return(0,i.jsx)(a.Input,{ref:e,variant:r||(c?"filled":"outlined"),className:(0,o.cx)((0,t.variants)({shadow:n,variant:r||(c?"filled":"outlined")}),s),...u})});n.displayName="Input",e.s(["default",0,n])},424814,e=>{"use strict";var t=e.i(271645);e.i(843476);let r=["shift","alt","meta","mod","ctrl","control"],i={esc:"escape",return:"enter",left:"arrowleft",right:"arrowright",up:"arrowup",down:"arrowdown",ShiftLeft:"shift",ShiftRight:"shift",AltLeft:"alt",AltRight:"alt",MetaLeft:"meta",MetaRight:"meta",OSLeft:"meta",OSRight:"meta",ControlLeft:"ctrl",ControlRight:"ctrl"};function a(e){return(i[e.trim()]||e.trim()).toLowerCase().replace(/key|digit|numpad/,"")}function o(e){return r.includes(e)}function l(e,t=","){return e.toLowerCase().split(t)}function n(e,t="+",i=">",o=!1,l,s){let u=[],c=!1;(e=e.trim()).includes(i)?(c=!0,u=e.toLocaleLowerCase().split(i).map(e=>a(e))):u=e.toLocaleLowerCase().split(t).map(e=>a(e));let d={alt:u.includes("alt"),ctrl:u.includes("ctrl")||u.includes("control"),shift:u.includes("shift"),meta:u.includes("meta"),mod:u.includes("mod"),useKey:o},p=u.filter(e=>!r.includes(e));return{...d,keys:p,description:l,isSequence:c,hotkey:e,metadata:s}}"u">typeof document&&(document.addEventListener("keydown",e=>{void 0!==e.code&&c([a(e.code)])}),document.addEventListener("keyup",e=>{void 0!==e.code&&d([a(e.code)])})),"u">typeof window&&(window.addEventListener("blur",()=>{s.clear()}),window.addEventListener("focus",()=>{s.clear()}),window.addEventListener("contextmenu",()=>{setTimeout(()=>{s.clear()},0)})),"u">typeof document&&document.addEventListener("visibilitychange",()=>{s.clear()});let s=new Set;function u(e){return Array.isArray(e)}function c(e){let t=Array.isArray(e)?e:[e];s.has("meta")&&s.forEach(e=>{o(e)||s.delete(e.toLowerCase())}),t.forEach(e=>{s.add(e.toLowerCase())})}function d(e){let t=Array.isArray(e)?e:[e];"meta"===e?s.clear():t.forEach(e=>{s.delete(e.toLowerCase())})}let p=["input","textarea","select","searchbox","slider","spinbutton","menuitem","menuitemcheckbox","menuitemradio","option","radio","textbox"];function m(e,t=!1){var r;let i,a,{target:o,composed:l}=e;return(r=o).tagName&&!r.tagName.startsWith("-")&&r.tagName.includes("-")&&l?(i=e.composedPath()[0]&&e.composedPath()[0].tagName,a=e.composedPath()[0]&&e.composedPath()[0].role):(i=o&&o.tagName,a=o&&o.role),u(t)?!!(i&&t?.some(e=>e.toLowerCase()===i.toLowerCase()||e===a)):!!(i&&t&&t)}let f=(0,t.createContext)(void 0),h=(0,t.createContext)({hotkeys:[],activeScopes:[],toggleScope:()=>{},enableScope:()=>{},disableScope:()=>{}}),y="u">typeof window?t.useLayoutEffect:t.useEffect;e.s(["useHotkeys",0,function(e,r,i,v){var g;let b,[x,k]=(0,t.useState)(null),S=(0,t.useCallback)(e=>(k(e),()=>k(null)),[]),C=(0,t.useRef)(!1),w=Array.isArray(i)?Array.isArray(v)?void 0:v:i,E=u(e)?e.join(w?.delimiter):e,T=Array.isArray(i)?i:Array.isArray(v)?v:void 0,$=(0,t.useCallback)(r,T??[]),L=(0,t.useRef)($);T?L.current=$:L.current=r;let N=(g=function(e){if(!e)return;let{enabled:t,preventDefault:r,ignoreEventWhen:i,...a}=e;return"function"==typeof t?a:{...a,enabled:t}}(w),function e(t,r){return t&&r&&"object"==typeof t&&"object"==typeof r?Object.keys(t).length===Object.keys(r).length&&Object.keys(t).reduce((i,a)=>i&&e(t[a],r[a]),!0):t===r}((b=(0,t.useRef)(void 0)).current,g)||(b.current=g),b.current),O=(0,t.useRef)(w?.enabled);O.current=w?.enabled;let R=(0,t.useRef)(w?.preventDefault);R.current=w?.preventDefault;let j=(0,t.useRef)(w?.ignoreEventWhen);j.current=w?.ignoreEventWhen;let{activeScopes:A}=(0,t.useContext)(h),M=(0,t.useContext)(f);return y(()=>{var e;if(!1===O.current||(e=N?.scopes,!((0!==A.length||!e)&&(!e||A.some(t=>e.includes(t))||A.includes("*")))))return;let t=[],r,i=(e,i=!1)=>{if(!(m(e,p)&&!m(e,N?.enableOnFormTags))){if(null!==x){let t=x.getRootNode();if((t instanceof Document||t instanceof ShadowRoot)&&t.activeElement!==x&&!x.contains(t.activeElement))return void(e.stopPropagation(),e.preventDefault(),e.stopImmediatePropagation())}e.target?.isContentEditable&&!N?.enableOnContentEditable||l(E,N?.delimiter).forEach(l=>{if(l.includes(N?.splitKey??"+")&&l.includes(N?.sequenceSplitKey??">"))return void console.warn(`Hotkey ${l} contains both ${N?.splitKey??"+"} and ${N?.sequenceSplitKey??">"} which is not supported.`);let c=n(l,N?.splitKey,N?.sequenceSplitKey,N?.useKey,N?.description,N?.metadata);if(c.isSequence){r=setTimeout(()=>{t=[]},N?.sequenceTimeoutMs??1e3);let i=c.useKey?e.key:a(e.code);if(o(i.toLowerCase()))return;if(t.push(i),i!==c.keys?.[t.length-1]){t=[],r&&clearTimeout(r);return}t.length===c.keys?.length&&(L.current(e,c),r&&clearTimeout(r),t=[])}else if(((e,t,r=!1)=>{let{alt:i,meta:o,mod:l,shift:n,ctrl:c,keys:d,useKey:p}=t,{code:m,key:f,ctrlKey:h,metaKey:y,shiftKey:v,altKey:g}=e,b=a(m);if(p&&d?.length===1&&d.includes(f.toLowerCase()))return!0;if(!d?.includes(b)&&!["ctrl","control","unknown","meta","alt","shift","os"].includes(b))return!1;if(!r){if(i!==g&&"alt"!==b||n!==v&&"shift"!==b)return!1;if(l){if(!(typeof navigator>"u")&&/mac/i.test(navigator.userAgent)&&!/iphone|ipad|ipod/i.test(navigator.userAgent)?!y:!h)return!1}else if(o!==y&&"meta"!==b&&"os"!==b||c!==h&&"ctrl"!==b&&"control"!==b)return!1}return!!(d&&1===d.length&&d.includes(b))||(d&&d.length>0?!!d.includes(b)&&function(e,t=","){return(u(e)?e:e.split(t)).every(e=>s.has(e.trim().toLowerCase()))}(d):!d||0===d.length)})(e,c,N?.ignoreModifiers)||c.keys?.includes("*")){var d,p;if(j.current?.(e)||i&&C.current||(("function"==typeof(d=R.current)&&d(e,c)||!0===d)&&e.preventDefault(),"function"==typeof(p=O.current)?!p(e,c):!0!==p&&void 0!==p))return;L.current(e,c),i||(C.current=!0)}})}},f=e=>{void 0!==e.code&&(c(a(e.code)),(N?.keydown===void 0&&N?.keyup!==!0||N?.keydown)&&i(e))},h=e=>{void 0!==e.code&&(d(a(e.code)),C.current=!1,N?.keyup&&i(e,!0))},y=x||w?.document||document;return y.addEventListener("keyup",h,w?.eventListenerOptions),y.addEventListener("keydown",f,w?.eventListenerOptions),M&&l(E,N?.delimiter).forEach(e=>{M.addHotkey(n(e,N?.splitKey,N?.sequenceSplitKey,N?.useKey,N?.description,N?.metadata))}),()=>{y.removeEventListener("keyup",h,w?.eventListenerOptions),y.removeEventListener("keydown",f,w?.eventListenerOptions),M&&l(E,N?.delimiter).forEach(e=>{M.removeHotkey(n(e,N?.splitKey,N?.sequenceSplitKey,N?.useKey,N?.description,N?.metadata))}),t=[],r&&clearTimeout(r)}},[x,N,A,E]),S}])},566595,e=>{"use strict";var t=e.i(630299);e.s(["Search",()=>t.default])},164858,e=>{"use strict";var t=e.i(492435),r=e.i(140449),i=e.i(848357),a=e.i(266894),o=e.i(58125),l=e.i(184283);let n=(0,l.createStaticStyles)(({css:e,cssVar:t})=>({icon:e`
    color: ${t.colorTextPlaceholder};
  `,search:e`
    position: relative;
    max-width: 100%;
  `,tag:(0,l.cx)(o.staticStylish.blur,e`
      position: absolute;
      inset-block-start: 50%;
      inset-inline-end: 6px;
      transform: translateY(-50%);

      color: ${t.colorTextDescription};

      kbd {
        color: inherit;
      }
    `)}));var s=e.i(271645),u=e.i(843476),c=e.i(760035),d=e.i(758379),d=d,p=e.i(566595),m=e.i(424814);let f=(0,s.memo)(({defaultValue:e="",spotlight:o,className:f,value:h,onInputChange:y,placeholder:v,enableShortKey:g,shortKey:b="mod+k",onSearch:x,loading:k,style:S,onChange:C,onBlur:w,onPressEnter:E,onFocus:T,styles:{input:$,shortKey:L}={},classNames:{input:N,shortKey:O}={},...R})=>{let[j,A]=(0,c.default)(e,{defaultValue:e,onChange:y,value:h}),[M,P]=(0,s.useState)(!0),K=(0,s.useRef)(null),B=(0,s.useMemo)(()=>b.includes("+")?b:`mod+${b}`,[b]);return(0,m.useHotkeys)(B,()=>{g&&K.current?.focus()},{enableOnFormTags:!0,enabled:!!g&&!!b,preventDefault:!0}),(0,u.jsxs)("div",{className:(0,l.cx)(n.search,f),style:S,children:[o&&(0,u.jsx)(a.default,{}),(0,u.jsx)(i.default,{allowClear:!0,className:N,placeholder:v??"Type keywords...",ref:K,style:$,value:j,prefix:(0,u.jsx)(t.default,{className:n.icon,icon:k?d.default:p.Search,size:"small",spin:k,style:{marginRight:4}}),onBlur:e=>{w?.(e),A(e.target.value),P(!0)},onChange:e=>{A(e.target.value),C?.(e)},onFocus:e=>{T?.(e),P(!1)},onPressEnter:e=>{E?.(e),x?.(j)},...R}),g&&M&&!j&&(0,u.jsx)(r.default,{compact:!0,className:(0,l.cx)(n.tag,O),keys:B,style:L})]})});f.displayName="SearchBar",e.s(["SearchBar",0,f],164858)},739041,e=>{"use strict";var t=e.i(618566),r=e.i(297355),i=e.i(271645);e.s(["useQuery",0,()=>{let e=(0,t.useSearchParams)();return(0,i.useMemo)(()=>r.default.parse(e.toString()),[e])}])},580367,e=>{"use strict";var t=e.i(813560),r=e.i(297355),i=e.i(271645),a=e.i(739041),o=e.i(498660);let l=({hash:e,replace:t,url:i,prevQuery:a={},query:l={}})=>{let n=r.default.stringifyUrl({query:t?l:{...a,...l},url:i},{skipNull:!0});return!o.isOnServerSide&&e&&(n=[n,e||location?.hash?.slice(1)].filter(Boolean).join("#")),n};e.s(["useQueryRoute",0,()=>{let e=(0,t.useRouter)(),r=(0,a.useQuery)();return(0,i.useMemo)(()=>({push:(t,i={})=>e.push(l({prevQuery:r,url:t,...i})),replace:(t,i={})=>e.replace(l({prevQuery:r,url:t,...i}))}),[r])}])},623423,e=>{"use strict";var t=e.i(843476),r=e.i(164858),i=e.i(271645);e.i(785269);var a=e.i(322831),o=e.i(739041),l=e.i(580367);let n=(0,i.memo)(({path:e})=>{let{t:n}=(0,a.useTranslation)("discover"),{q:s}=(0,o.useQuery)(),u=(0,l.useQueryRoute)(),[c,d]=(0,i.useState)(s||""),p=t=>{u.push(e,{query:t?{q:t}:{},replace:!0})};return(0,t.jsx)(r.SearchBar,{defaultValue:s,enableShortKey:!0,onInputChange:e=>{d(e),e||p("")},onSearch:p,placeholder:n("search.placeholder"),style:{width:"100%"},value:c,variant:"outlined"})});e.s(["default",0,n])},293733,640063,e=>{"use strict";var t,r=e.i(739217);e.s(["Breadcrumb",()=>r.default],293733);var i=((t={}).Assistants="agent",t.Mcp="mcp",t.Skills="skills",t);e.s(["DiscoverTab",()=>i],640063)},300825,e=>{"use strict";var t=e.i(843476),r=e.i(690036),i=e.i(208544),a=e.i(293733),o=e.i(184283),l=e.i(618566),n=e.i(271645);e.i(785269);var s=e.i(322831),u=e.i(347782),c=e.i(640063);let d=(0,n.memo)(({tab:e})=>{let{t:n}=(0,s.useTranslation)("discover"),d=(0,l.usePathname)(),p=(0,o.useTheme)(),m=d.split(`/${e}/`)[1];return(0,t.jsx)(a.Breadcrumb,{items:[{title:(0,t.jsx)(u.default,{href:"/",children:"LobeHub"})},{title:(0,t.jsx)(u.default,{href:`/${e}`,children:e===c.DiscoverTab.Mcp?"MCP Servers":n(`tab.${e}`)})},{title:(0,t.jsxs)(i.Flexbox,{align:"center",gap:4,horizontal:!0,style:{color:p.colorTextSecondary},children:[m,(0,t.jsx)(r.CopyButton,{content:m,size:{blockSize:22,size:14}})]})}]})});e.s(["default",0,d])}]);
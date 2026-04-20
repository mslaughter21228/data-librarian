(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,578379,e=>{"use strict";var t=e.i(206868),r=e.i(184283);let i=(0,r.createStaticStyles)(({css:e})=>e`
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
  `);var o=e.i(271645),n=e.i(843476);function a(e){return"string"==typeof e||e instanceof String}let l=({className:e,gap:l="1em",rows:s=3,children:c,maxItemWidth:u=240,ref:d,style:p,...m})=>{let h=(0,o.useMemo)(()=>({"--grid-gap":a(l)?l:`${l}px`,"--grid-max-item-width":a(u)?u:`${u}px`,"--grid-rows":`${s}`}),[l,u,s]);return(0,n.jsx)(t.default,{className:(0,r.cx)(i,e),gap:l,ref:d,style:{...h,...p},...m,children:c})};l.displayName="Grid",e.s(["default",0,l],578379)},43884,e=>{"use strict";var t=e.i(578379);e.s(["Grid",()=>t.default])},459817,e=>{"use strict";e.i(247167);var t=e.i(271645),r=e.i(931067),i=e.i(440383),o=e.i(180573),n=e.i(232839),a=e.i(207670),l=e.i(128473),s=e.i(401676);let c=(e,t)=>{if(!e)return null;let r={left:e.offsetLeft,right:e.parentElement.clientWidth-e.clientWidth-e.offsetLeft,width:e.clientWidth,top:e.offsetTop,bottom:e.parentElement.clientHeight-e.clientHeight-e.offsetTop,height:e.clientHeight};return t?{left:0,right:0,width:0,top:r.top,bottom:r.bottom,height:r.height}:{left:r.left,right:r.right,width:r.width,top:0,bottom:0,height:0}},u=e=>void 0!==e?`${e}px`:void 0;function d(e){let{prefixCls:r,containerRef:i,value:o,getValueIndex:d,motionName:p,onMotionStart:m,onMotionEnd:h,direction:g,vertical:f=!1}=e,b=t.useRef(null),[v,y]=t.useState(o),x=e=>{let t=d(e),o=i.current?.querySelectorAll(`.${r}-item`)[t];return o?.offsetParent&&o},[w,j]=t.useState(null),[k,S]=t.useState(null);(0,s.default)(()=>{if(v!==o){let e=x(v),t=x(o),r=c(e,f),i=c(t,f);y(o),j(r),S(i),e&&t?m():h()}},[o]);let C=t.useMemo(()=>f?u(w?.top??0):"rtl"===g?u(-w?.right):u(w?.left),[f,g,w]),T=t.useMemo(()=>f?u(k?.top??0):"rtl"===g?u(-k?.right):u(k?.left),[f,g,k]);return w&&k?t.createElement(l.default,{visible:!0,motionName:p,motionAppear:!0,onAppearStart:()=>f?{transform:"translateY(var(--thumb-start-top))",height:"var(--thumb-start-height)"}:{transform:"translateX(var(--thumb-start-left))",width:"var(--thumb-start-width)"},onAppearActive:()=>f?{transform:"translateY(var(--thumb-active-top))",height:"var(--thumb-active-height)"}:{transform:"translateX(var(--thumb-active-left))",width:"var(--thumb-active-width)"},onVisibleChanged:()=>{j(null),S(null),h()}},({className:e,style:i},o)=>{let l={...i,"--thumb-start-left":C,"--thumb-start-width":u(w?.width),"--thumb-active-left":T,"--thumb-active-width":u(k?.width),"--thumb-start-top":C,"--thumb-start-height":u(w?.height),"--thumb-active-top":T,"--thumb-active-height":u(k?.height)},s={ref:(0,n.composeRef)(b,o),style:l,className:(0,a.clsx)(`${r}-thumb`,e)};return t.createElement("div",s)}):null}let p=({prefixCls:e,className:r,style:i,styles:o,classNames:n,data:l,disabled:s,checked:c,label:u,title:d,value:p,name:m,onChange:h,onFocus:g,onBlur:f,onKeyDown:b,onKeyUp:v,onMouseDown:y,itemRender:x=e=>e})=>x(t.createElement("label",{className:(0,a.clsx)(r,{[`${e}-item-disabled`]:s}),style:i,onMouseDown:y},t.createElement("input",{name:m,className:`${e}-item-input`,type:"radio",disabled:s,checked:c,onChange:e=>{s||h(e,p)},onFocus:g,onBlur:f,onKeyDown:b,onKeyUp:v}),t.createElement("div",{className:(0,a.clsx)(`${e}-item-label`,n?.label),title:d,style:o?.label},u)),{item:l}),m=t.forwardRef((e,l)=>{let{prefixCls:s="rc-segmented",direction:c,vertical:u,options:m=[],disabled:h,defaultValue:g,value:f,name:b,onChange:v,className:y="",style:x,styles:w,classNames:j,motionName:k="thumb-motion",itemRender:S,...C}=e,T=t.useRef(null),$=t.useMemo(()=>(0,n.composeRef)(T,l),[T,l]),O=t.useMemo(()=>m.map(e=>{if("object"==typeof e&&null!==e){let t=void 0!==e.title?e.title:"object"!=typeof e.label?e.label?.toString():void 0;return{...e,title:t}}return{label:e?.toString(),title:e?.toString(),value:e}}),[m]),[A,E]=(0,i.default)(g??O[0]?.value,f),[z,M]=t.useState(!1),P=(e,t)=>{E(t),v?.(t)},R=(0,o.default)(C,["children"]),[I,L]=t.useState(!1),[N,B]=t.useState(!1),_=()=>{B(!0)},H=()=>{B(!1)},U=()=>{L(!1)},F=e=>{"Tab"===e.key&&L(!0)},D=e=>{let t=O.findIndex(e=>e.value===A),r=O.length,i=O[(t+e+r)%r];i&&(E(i.value),v?.(i.value))},V=e=>{switch(e.key){case"ArrowLeft":case"ArrowUp":D(-1);break;case"ArrowRight":case"ArrowDown":D(1)}};return t.createElement("div",(0,r.default)({role:"radiogroup","aria-label":"segmented control",tabIndex:h?void 0:0,"aria-orientation":u?"vertical":"horizontal",style:x},R,{className:(0,a.clsx)(s,{[`${s}-rtl`]:"rtl"===c,[`${s}-disabled`]:h,[`${s}-vertical`]:u},y),ref:$}),t.createElement("div",{className:`${s}-group`},t.createElement(d,{vertical:u,prefixCls:s,value:A,containerRef:T,motionName:`${s}-${k}`,direction:c,getValueIndex:e=>O.findIndex(t=>t.value===e),onMotionStart:()=>{M(!0)},onMotionEnd:()=>{M(!1)}}),O.map(e=>{let{value:i,disabled:o}=e;return t.createElement(p,(0,r.default)({},e,{name:b,data:e,itemRender:S,key:i,prefixCls:s,className:(0,a.clsx)(e.className,`${s}-item`,j?.item,{[`${s}-item-selected`]:i===A&&!z,[`${s}-item-focused`]:N&&I&&i===A}),style:w?.item,classNames:j,styles:w,checked:i===A,onChange:P,onFocus:_,onBlur:H,onKeyDown:V,onKeyUp:F,onMouseDown:U,disabled:!!h||!!o}))})))});var h=e.i(987225),g=e.i(711517),f=e.i(548817),b=e.i(806520),v=e.i(242064),y=e.i(517455),x=e.i(491816);e.i(296059);var w=e.i(915654),j=e.i(183293),k=e.i(246422),S=e.i(838378);function C(e,t){return{[`${e}, ${e}:hover, ${e}:focus`]:{color:t.colorTextDisabled,cursor:"not-allowed"}}}let T=e=>({background:e.itemSelectedBg,boxShadow:e.boxShadowTertiary}),$={overflow:"hidden",...j.textEllipsis},O=(0,k.genStyleHooks)("Segmented",e=>{let{lineWidth:t,calc:r}=e;return(e=>{let{componentCls:t,motionDurationSlow:r,motionEaseInOut:i,motionDurationMid:o}=e,n=e.calc(e.controlHeight).sub(e.calc(e.trackPadding).mul(2)).equal(),a=e.calc(e.controlHeightLG).sub(e.calc(e.trackPadding).mul(2)).equal(),l=e.calc(e.controlHeightSM).sub(e.calc(e.trackPadding).mul(2)).equal();return{[t]:{...(0,j.resetComponent)(e),display:"inline-block",padding:e.trackPadding,color:e.itemColor,background:e.trackBg,borderRadius:e.borderRadius,transition:`all ${o}`,...(0,j.genFocusStyle)(e),[`${t}-group`]:{position:"relative",display:"flex",alignItems:"stretch",justifyItems:"flex-start",flexDirection:"row",width:"100%"},[`&${t}-rtl`]:{direction:"rtl"},[`&${t}-vertical`]:{[`${t}-group`]:{flexDirection:"column"},[`${t}-thumb`]:{width:"100%",height:0,padding:`0 ${(0,w.unit)(e.paddingXXS)}`}},[`&${t}-block`]:{display:"flex"},[`&${t}-block ${t}-item`]:{flex:1,minWidth:0},[`${t}-item`]:{position:"relative",textAlign:"center",cursor:"pointer",transition:`color ${o}`,borderRadius:e.borderRadiusSM,transform:"translateZ(0)","&-selected":{...T(e),color:e.itemSelectedColor},"&-focused":(0,j.genFocusOutline)(e),"&::after":{content:'""',position:"absolute",zIndex:-1,width:"100%",height:"100%",top:0,insetInlineStart:0,borderRadius:"inherit",opacity:0,pointerEvents:"none",transition:["opacity","background-color"].map(e=>`${e} ${o}`).join(", ")},[`&:not(${t}-item-selected):not(${t}-item-disabled)`]:{"&:hover, &:active":{color:e.itemHoverColor},"&:hover::after":{opacity:1,backgroundColor:e.itemHoverBg},"&:active::after":{opacity:1,backgroundColor:e.itemActiveBg}},"&-label":{minHeight:n,lineHeight:(0,w.unit)(n),padding:`0 ${(0,w.unit)(e.segmentedPaddingHorizontal)}`,...$},"&-icon + *":{marginInlineStart:e.calc(e.marginSM).div(2).equal()},"&-input":{position:"absolute",insetBlockStart:0,insetInlineStart:0,width:0,height:0,opacity:0,pointerEvents:"none"}},[`${t}-thumb`]:{...T(e),position:"absolute",insetBlockStart:0,insetInlineStart:0,width:0,height:"100%",padding:`${(0,w.unit)(e.paddingXXS)} 0`,borderRadius:e.borderRadiusSM,[`& ~ ${t}-item:not(${t}-item-selected):not(${t}-item-disabled)::after`]:{backgroundColor:"transparent"}},[`&${t}-lg`]:{borderRadius:e.borderRadiusLG,[`${t}-item-label`]:{minHeight:a,lineHeight:(0,w.unit)(a),padding:`0 ${(0,w.unit)(e.segmentedPaddingHorizontal)}`,fontSize:e.fontSizeLG},[`${t}-item, ${t}-thumb`]:{borderRadius:e.borderRadius}},[`&${t}-sm`]:{borderRadius:e.borderRadiusSM,[`${t}-item-label`]:{minHeight:l,lineHeight:(0,w.unit)(l),padding:`0 ${(0,w.unit)(e.segmentedPaddingHorizontalSM)}`},[`${t}-item, ${t}-thumb`]:{borderRadius:e.borderRadiusXS}},...C(`&-disabled ${t}-item`,e),...C(`${t}-item-disabled`,e),[`${t}-thumb-motion-appear-active`]:{willChange:"transform, width",transition:["transform","width"].map(e=>`${e} ${r} ${i}`).join(", ")},[`&${t}-shape-round`]:{borderRadius:9999,[`${t}-item, ${t}-thumb`]:{borderRadius:9999}}}}})((0,S.mergeToken)(e,{segmentedPaddingHorizontal:r(e.controlPaddingHorizontal).sub(t).equal(),segmentedPaddingHorizontalSM:r(e.controlPaddingHorizontalSM).sub(t).equal()}))},e=>{let{colorTextLabel:t,colorText:r,colorFillSecondary:i,colorBgElevated:o,colorFill:n,lineWidthBold:a,colorBgLayout:l}=e;return{trackPadding:a,trackBg:l,itemColor:t,itemHoverColor:r,itemHoverBg:i,itemSelectedBg:o,itemActiveBg:n,itemSelectedColor:r}}),A=t.forwardRef((e,r)=>{let i=(0,h.default)(),{prefixCls:o,className:n,rootClassName:l,block:s,options:c=[],size:u,style:d,vertical:p,orientation:w,shape:j="default",name:k=i,styles:S,classNames:C,...T}=e,{getPrefixCls:$,direction:A,className:E,style:z,classNames:M,styles:P}=(0,v.useComponentConfig)("segmented"),R={...e,options:c,size:u,shape:j},[I,L]=(0,g.useMergeSemantic)([M,C],[P,S],{props:R}),N=$("segmented",o),[B,_]=O(N),H=(0,y.default)(u),U=t.useMemo(()=>c.map(e=>{if((0,b.isPlainObject)(e)&&e?.icon){let{icon:r,label:i,...o}=e;return{...o,label:t.createElement(t.Fragment,null,t.createElement("span",{className:(0,a.clsx)(`${N}-item-icon`,I.icon),style:L.icon},r),i&&t.createElement("span",null,i))}}return e}),[c,N,I.icon,L.icon]),[,F]=(0,f.useOrientation)(w,p),D=(0,a.clsx)(n,l,E,I.root,{[`${N}-block`]:s,[`${N}-sm`]:"small"===H,[`${N}-lg`]:"large"===H,[`${N}-vertical`]:F,[`${N}-shape-${j}`]:"round"===j},B,_),V={...L.root,...z,...d};return t.createElement(m,{...T,name:k,className:D,style:V,classNames:I,styles:L,itemRender:(e,{item:r})=>{if(!r.tooltip)return e;let i=(0,b.isPlainObject)(r.tooltip)?r.tooltip:{title:r.tooltip};return t.createElement(x.default,{...i},e)},options:U,ref:r,prefixCls:N,direction:A,vertical:F})});e.s(["default",0,A],459817)},256017,560025,e=>{"use strict";var t=e.i(58125),r=e.i(184283),i=e.i(225913);let o=(0,r.createStaticStyles)(({css:e,cssVar:r})=>({borderless:t.staticStylish.variantBorderlessWithoutHover,filled:e`
      border: 1px solid ${r.colorFillQuaternary};
      background: ${r.colorBgLayout};
    `,glass:t.staticStylish.blur,outlined:e`
      border: 1px solid ${r.colorBorderSecondary};
      background: transparent;
    `,root:e``,shadow:t.staticStylish.shadow})),n=(0,i.cva)(o.root,{defaultVariants:{glass:!1,shadow:!1,variant:"filled"},variants:{variant:{filled:o.filled,outlined:o.outlined,borderless:o.borderless},glass:{false:null,true:o.glass},shadow:{false:null,true:o.shadow}}});var a=e.i(271645),l=e.i(843476),s=e.i(459817);e.s(["Segmented",()=>s.default],560025);var s=s;let c=(0,a.memo)(({ref:e,padding:t,style:i,className:o,variant:a="filled",shadow:c,glass:u,...d})=>(0,l.jsx)(s.default,{className:(0,r.cx)(n({glass:u,shadow:c,variant:a}),o),ref:e,style:{padding:t,...i},...d}));c.displayName="Segmented",e.s(["Segmented",0,c],256017)},908206,e=>{"use strict";var t=e.i(271645),r=e.i(104458);let i=["xxxl","xxl","xl","lg","md","sm","xs"],o=[].concat(i).reverse();e.s(["default",0,()=>{let e,[,o]=(0,r.useToken)(),n=((e=[].concat(i).reverse()).forEach((t,r)=>{let i=t.toUpperCase(),n=`screen${i}Min`,a=`screen${i}`;if(!(o[n]<=o[a]))throw Error(`${n}<=${a} fails : !(${o[n]}<=${o[a]})`);if(r<e.length-1){let t=`screen${i}Max`;if(!(o[a]<=o[t]))throw Error(`${a}<=${t} fails : !(${o[a]}<=${o[t]})`);let n=e[r+1].toUpperCase(),l=`screen${n}Min`;if(!(o[t]<=o[l]))throw Error(`${t}<=${l} fails : !(${o[t]}<=${o[l]})`)}}),{xs:`(max-width: ${o.screenXSMax}px)`,sm:`(min-width: ${o.screenSM}px)`,md:`(min-width: ${o.screenMD}px)`,lg:`(min-width: ${o.screenLG}px)`,xl:`(min-width: ${o.screenXL}px)`,xxl:`(min-width: ${o.screenXXL}px)`,xxxl:`(min-width: ${o.screenXXXL}px)`});return t.default.useMemo(()=>{let e=new Map,t=-1,r={};return{responsiveMap:n,matchHandlers:{},dispatch:t=>(r=t,e.forEach(e=>{e(r)}),e.size>=1),subscribe(i){return e.size||this.register(),t+=1,e.set(t,i),i(r),t},unsubscribe(t){e.delete(t),e.size||this.unregister()},register(){Object.entries(n).forEach(([e,t])=>{let i=({matches:t})=>{this.dispatch({...r,[e]:t})},o=window.matchMedia(t);"function"==typeof o?.addEventListener&&o.addEventListener("change",i),this.matchHandlers[t]={mql:o,listener:i},i(o)})},unregister(){Object.values(n).forEach(e=>{let t=this.matchHandlers[e];"function"==typeof t?.mql?.removeEventListener&&t.mql.removeEventListener("change",t?.listener)}),e.clear()}}},[n])},"matchScreen",0,(e,t)=>{if(t){for(let r of i)if(e[r]&&t?.[r]!==void 0)return t[r]}},"responsiveArray",0,i,"responsiveArrayReversed",0,o])},149809,e=>{"use strict";var t=e.i(271645);e.s(["useForceUpdate",0,()=>t.default.useReducer(e=>e+1,0)])},150073,e=>{"use strict";var t=e.i(271645),r=e.i(401676),i=e.i(149809),o=e.i(908206);e.s(["default",0,function(e=!0,n={}){let a=(0,t.useRef)(n),[,l]=(0,i.useForceUpdate)(),s=(0,o.default)();return(0,r.default)(()=>{let t=s.subscribe(t=>{a.current=t,e&&l()});return()=>s.unsubscribe(t)},[]),a.current}])},708262,131757,39874,401188,e=>{"use strict";e.i(247167);var t=e.i(271645),r=e.i(207670),i=e.i(806520),o=e.i(908206),n=e.i(242064),a=e.i(246422);let l=(0,t.createContext)({});var s=e.i(756570);function c(e){return"auto"===e?"1 1 auto":(0,i.isNumber)(e)?`${e} ${e} auto`:/^\d+(\.\d+)?(px|em|rem|%)$/.test(e)?`0 0 ${e}`:e}let u=t.forwardRef((e,u)=>{let{getPrefixCls:d,direction:p}=t.useContext(n.ConfigContext),{gutter:m,wrap:h}=t.useContext(l),{prefixCls:g,span:f,order:b,offset:v,push:y,pull:x,className:w,children:j,flex:k,style:S,...C}=e,T=d("col",g),$=d(),[O,A]=(0,s.useColStyle)(T),[E]=(0,a.genCssVar)($,"col"),z={},M={};o.responsiveArrayReversed.forEach(t=>{let r={},o=e[t];(0,i.isNumber)(o)?r.span=o:(0,i.isPlainObject)(o)&&(r=o||{}),delete C[t],M={...M,[`${T}-${t}-${r.span}`]:(0,i.isNonNullable)(r.span),[`${T}-${t}-order-${r.order}`]:r.order||0===r.order,[`${T}-${t}-offset-${r.offset}`]:r.offset||0===r.offset,[`${T}-${t}-push-${r.push}`]:r.push||0===r.push,[`${T}-${t}-pull-${r.pull}`]:r.pull||0===r.pull,[`${T}-rtl`]:"rtl"===p},r.flex&&(M[`${T}-${t}-flex`]=!0,z[E(`${t}-flex`)]=c(r.flex))});let P=(0,r.clsx)(T,{[`${T}-${f}`]:void 0!==f,[`${T}-order-${b}`]:b,[`${T}-offset-${v}`]:v,[`${T}-push-${y}`]:y,[`${T}-pull-${x}`]:x},w,M,O,A),R={};return m?.[0]&&(R.paddingInline=(0,i.isNumber)(m[0])?`${m[0]/2}px`:`calc(${m[0]} / 2)`),k&&(R.flex=c(k),!1!==h||R.minWidth||(R.minWidth=0)),t.createElement("div",{...C,style:{...R,...S,...z},className:P,ref:u},j)});e.s(["default",0,u],131757);var d=e.i(150073);function p(e,t){let r=[void 0,void 0],n=Array.isArray(e)?e:[e,void 0],a=t||{xs:!0,sm:!0,md:!0,lg:!0,xl:!0,xxl:!0,xxxl:!0};return n.forEach((e,t)=>{if((0,i.isPlainObject)(e))for(let i=0;i<o.responsiveArray.length;i++){let n=o.responsiveArray[i];if(a[n]&&void 0!==e[n]){r[t]=e[n];break}}else r[t]=e}),r}e.s(["default",0,p],39874);let m=(e,r)=>{let[n,a]=t.useState(()=>(0,i.isString)(e)?e:"");return t.useEffect(()=>{(()=>{if((0,i.isString)(e)&&a(e),(0,i.isPlainObject)(e))for(let t=0;t<o.responsiveArray.length;t++){let i=o.responsiveArray[t];if(!r||!r[i])continue;let n=e[i];if(void 0!==n)return void a(n)}})()},[JSON.stringify(e),r]),n},h=t.forwardRef((e,o)=>{let{prefixCls:a,justify:c,align:u,className:h,style:g,children:f,gutter:b=0,wrap:v,...y}=e,{getPrefixCls:x,direction:w}=t.useContext(n.ConfigContext),j=(0,d.default)(!0,null),k=m(u,j),S=m(c,j),C=x("row",a),[T,$]=(0,s.useRowStyle)(C),O=p(b,j),A=(0,r.clsx)(C,{[`${C}-no-wrap`]:!1===v,[`${C}-${S}`]:S,[`${C}-${k}`]:k,[`${C}-rtl`]:"rtl"===w},h,T,$),E={};O?.[0]&&(E.marginInline=(0,i.isNumber)(O[0])?`${-(O[0]/2)}px`:`calc(${O[0]} / -2)`);let[z,M]=O;E.rowGap=M;let P=t.useMemo(()=>({gutter:[z,M],wrap:v}),[z,M,v]);return t.createElement(l.Provider,{value:P},t.createElement("div",{...y,className:A,style:{...E,...g},ref:o},f))});e.s(["default",0,h],401188),e.s(["default",0,{useBreakpoint:function(){return(0,d.default)()}}],708262)},829672,836938,310730,e=>{"use strict";e.i(247167);var t=e.i(271645);e.i(63335);var r=e.i(30294),i=e.i(207670);let o=e=>e?"function"==typeof e?e():e:null;e.s(["getRenderPropValue",0,o],836938);var n=e.i(711517),a=e.i(613541),l=e.i(242064),s=e.i(491816),c=e.i(496158);e.i(337908);var u=e.i(492656),d=e.i(183293),p=e.i(717356),m=e.i(320560),h=e.i(307358),g=e.i(246422),f=e.i(838378),b=e.i(617933);let v=(0,g.genStyleHooks)("Popover",e=>{let{colorBgElevated:t,colorText:r}=e,i=(0,f.mergeToken)(e,{popoverBg:t,popoverColor:r});return[(e=>{let{componentCls:t,popoverColor:r,titleMinWidth:i,fontWeightStrong:o,innerPadding:n,boxShadowSecondary:a,colorTextHeading:l,borderRadiusLG:s,zIndexPopup:c,titleMarginBottom:u,colorBgElevated:p,popoverBg:h,titleBorderBottom:f,innerContentPadding:b,titlePadding:v,antCls:y}=e,[x,w]=(0,g.genCssVar)(y,"tooltip");return[{[t]:{...(0,d.resetComponent)(e),position:"absolute",top:0,left:{_skip_check_:!0,value:0},zIndex:c,fontWeight:"normal",whiteSpace:"normal",textAlign:"start",cursor:"auto",userSelect:"text",[x("valid-offset-x")]:w("arrow-offset-x","var(--arrow-x)"),transformOrigin:[w("valid-offset-x","50%"),"var(--arrow-y, 50%)"].join(" "),[x("arrow-background-color")]:p,width:"max-content",maxWidth:"100vw","&-rtl":{direction:"rtl"},"&-hidden":{display:"none"},[`${t}-content`]:{position:"relative"},[`${t}-container`]:{backgroundColor:h,backgroundClip:"padding-box",borderRadius:s,boxShadow:a,padding:n},[`${t}-title`]:{minWidth:i,marginBottom:u,color:l,fontWeight:o,borderBottom:f,padding:v},[`${t}-content`]:{color:r,padding:b}}},(0,m.default)(e,w("arrow-background-color")),{[`${t}-pure`]:{position:"relative",maxWidth:"none",margin:e.sizePopupArrow,display:"inline-block"}}]})(i),(e=>{let{componentCls:t,antCls:r}=e,[i]=(0,g.genCssVar)(r,"tooltip");return{[t]:b.PresetColors.map(r=>{let o=e[`${r}6`];return{[`&${t}-${r}`]:{[i("arrow-background-color")]:o,[`${t}-inner`]:{backgroundColor:o},[`${t}-arrow`]:{background:"transparent"}}}})}})(i),(0,p.initZoomMotion)(i,"zoom-big")]},e=>{let{lineWidth:t,controlHeight:r,fontHeight:i,padding:o,wireframe:n,zIndexPopupBase:a,borderRadiusLG:l,marginXS:s,lineType:c,colorSplit:u,paddingSM:d}=e,p=r-i;return{titleMinWidth:177,zIndexPopup:a+30,...(0,h.getArrowToken)(e),...(0,m.getArrowOffsetToken)({contentRadius:l,limitVerticalRadius:!0}),innerPadding:12*!n,titleMarginBottom:n?0:s,titlePadding:n?`${p/2}px ${o}px ${p/2-t}px`:0,titleBorderBottom:n?`${t}px ${c} ${u}`:"none",innerContentPadding:n?`${d}px ${o}px`:0}},{resetStyle:!1,deprecatedTokens:[["width","titleMinWidth"],["minWidth","titleMinWidth"]]}),y=e=>{let{title:r,content:o,prefixCls:n,classNames:a,styles:l}=e;return r||o?t.createElement(t.Fragment,null,r&&t.createElement("div",{className:(0,i.clsx)(`${n}-title`,a?.title),style:l?.title},r),o&&t.createElement("div",{className:(0,i.clsx)(`${n}-content`,a?.content),style:l?.content},o)):null},x=e=>{let{hashId:r,prefixCls:a,className:l,style:s,placement:c="top",title:d,content:p,children:m,classNames:h,styles:g}=e,f=o(d),b=o(p),v={...e,placement:c},[x,w]=(0,n.useMergeSemantic)([h],[g],{props:v}),j=(0,i.clsx)(r,a,`${a}-pure`,`${a}-placement-${c}`,l);return t.createElement("div",{className:j,style:s},t.createElement("div",{className:`${a}-arrow`}),t.createElement(u.Popup,{...e,className:r,prefixCls:a,classNames:x,styles:w},m||t.createElement(y,{prefixCls:a,title:f,content:b,classNames:x,styles:w})))},w=e=>{let{prefixCls:r,className:o,...n}=e,{getPrefixCls:a}=t.useContext(l.ConfigContext),s=a("popover",r),[c,u]=v(s);return t.createElement(x,{...n,prefixCls:s,hashId:c,className:(0,i.clsx)(o,u)})};e.s(["Overlay",0,y,"RawPurePanel",0,x,"default",0,w],310730);let j=t.forwardRef((e,u)=>{let{prefixCls:d,title:p,content:m,overlayClassName:h,placement:g="top",trigger:f,children:b,mouseEnterDelay:x=.1,mouseLeaveDelay:w=.1,onOpenChange:j,overlayStyle:k={},styles:S,classNames:C,motion:T,arrow:$,...O}=e,{getPrefixCls:A,className:E,style:z,classNames:M,styles:P,arrow:R,trigger:I}=(0,l.useComponentConfig)("popover"),L=A("popover",d),[N,B]=v(L),_=A(),H=(0,c.default)($,R),U=f||I||"hover",F={...e,placement:g,trigger:U,mouseEnterDelay:x,mouseLeaveDelay:w,overlayStyle:k,styles:S,classNames:C},[D,V]=(0,n.useMergeSemantic)([M,C],[P,S],{props:F}),W=(0,i.clsx)(h,N,B,E,D.root),[q,G]=(0,r.useControlledState)(e.defaultOpen??!1,e.open),X=o(p),K=o(m);return t.createElement(s.default,{unique:!1,arrow:H,placement:g,trigger:U,mouseEnterDelay:x,mouseLeaveDelay:w,...O,prefixCls:L,classNames:{root:W,container:D.container,arrow:D.arrow},styles:{root:{...V.root,...z,...k},container:V.container,arrow:V.arrow},ref:u,open:q,onOpenChange:e=>{G(e),j?.(e)},overlay:X||K?t.createElement(y,{prefixCls:L,title:X,content:K,classNames:D,styles:V}):null,motion:{motionName:(0,a.getTransitionName)(_,"zoom-big","string"==typeof T?.motionName?T?.motionName:void 0)},"data-popover-inject":!0},b)});j._InternalPanelDoNotUseOrYouWillBeFired=w,e.s(["default",0,j],829672)},965760,e=>{"use strict";e.i(247167);var t=e.i(271645),r=e.i(978052),i=e.i(232839),o=e.i(207670),n=e.i(806520),a=e.i(908206),l=e.i(242064),s=e.i(321883),c=e.i(517455),u=e.i(150073);let d=t.createContext({});e.i(296059);var p=e.i(915654),m=e.i(183293),h=e.i(246422),g=e.i(838378);let f=(0,h.genStyleHooks)("Avatar",e=>{let{colorTextLightSolid:t,colorTextPlaceholder:r}=e,i=(0,g.mergeToken)(e,{avatarBg:r,avatarColor:t});return[(e=>{let{antCls:t,componentCls:r,iconCls:i,avatarBg:o,avatarColor:n,containerSize:a,containerSizeLG:l,containerSizeSM:s,textFontSize:c,textFontSizeLG:u,textFontSizeSM:d,iconFontSize:h,iconFontSizeLG:g,iconFontSizeSM:f,borderRadius:b,borderRadiusLG:v,borderRadiusSM:y,lineWidth:x,lineType:w}=e,j=(e,t,o,n)=>({width:e,height:e,borderRadius:"50%",fontSize:t,[`&${r}-square`]:{borderRadius:n},[`&${r}-icon`]:{fontSize:o,[`> ${i}`]:{margin:0}}});return{[r]:{...(0,m.resetComponent)(e),position:"relative",display:"inline-flex",justifyContent:"center",alignItems:"center",overflow:"hidden",color:n,whiteSpace:"nowrap",textAlign:"center",verticalAlign:"middle",background:o,border:`${(0,p.unit)(x)} ${w} transparent`,"&-image":{background:"transparent"},[`${t}-image-img`]:{display:"block"},...j(a,c,h,b),"&-lg":{...j(l,u,g,v)},"&-sm":{...j(s,d,f,y)},"> img":{display:"block",width:"100%",height:"100%",objectFit:"cover"}}}})(i),(e=>{let{componentCls:t,groupBorderColor:r,groupOverlapping:i,groupSpace:o}=e;return{[`${t}-group`]:{display:"inline-flex",[t]:{borderColor:r},"> *:not(:first-child)":{marginInlineStart:i}},[`${t}-group-popover`]:{[`${t} + ${t}`]:{marginInlineStart:o}}}})(i)]},e=>{let{controlHeight:t,controlHeightLG:r,controlHeightSM:i,fontSize:o,fontSizeLG:n,fontSizeXL:a,fontSizeHeading3:l,marginXS:s,marginXXS:c,colorBorderBg:u}=e;return{containerSize:t,containerSizeLG:r,containerSizeSM:i,textFontSize:o,textFontSizeLG:o,textFontSizeSM:o,iconFontSize:Math.round((n+a)/2),iconFontSizeLG:l,iconFontSizeSM:o,groupSpace:c,groupOverlapping:-s,groupBorderColor:u}}),b=t.forwardRef((e,p)=>{let m,{prefixCls:h,shape:g,size:b,src:v,srcSet:y,icon:x,className:w,rootClassName:j,style:k,alt:S,draggable:C,children:T,crossOrigin:$,gap:O=4,onError:A,...E}=e,[z,M]=t.useState(1),[P,R]=t.useState(!1),[I,L]=t.useState(!0),N=t.useRef(null),B=t.useRef(null),_=(0,i.composeRef)(p,N),{getPrefixCls:H,className:U,style:F}=(0,l.useComponentConfig)("avatar"),D=t.useContext(d),V=()=>{if(!B.current||!N.current)return;let e=B.current.offsetWidth,t=N.current.offsetWidth;0!==e&&0!==t&&2*O<t&&M(t-2*O<e?(t-2*O)/e:1)};t.useEffect(()=>{R(!0)},[]),t.useEffect(()=>{L(!0),M(1)},[v]),t.useEffect(V,[O]);let W=(0,c.default)(e=>b??D?.size??e??"medium"),q=Object.keys((0,n.isPlainObject)(W)&&W||{}).some(e=>a.responsiveArray.includes(e)),G=(0,u.default)(q),X=t.useMemo(()=>{if(!(0,n.isPlainObject)(W))return{};let e=W[a.responsiveArray.find(e=>G[e])];return e?{width:e,height:e,fontSize:e&&(x||T)?e/2:18}:{}},[G,W,x,T]),K=H("avatar",h),Y=(0,s.default)(K),[Z,Q]=f(K,Y),J=(0,o.clsx)({[`${K}-lg`]:"large"===W,[`${K}-sm`]:"small"===W}),ee=t.isValidElement(v),et=g||D?.shape||"circle",er=(0,o.clsx)(K,J,U,`${K}-${et}`,{[`${K}-image`]:ee||v&&I,[`${K}-icon`]:!!x},Q,Y,w,j,Z),ei=(0,n.isNumber)(W)?{width:W,height:W,fontSize:x?W/2:18}:{};if("string"==typeof v&&I)m=t.createElement("img",{src:v,draggable:C,srcSet:y,onError:()=>{!1!==A?.()&&L(!1)},alt:S,crossOrigin:$});else if(ee)m=v;else if(x)m=x;else if(P||1!==z){let e=`scale(${z})`;m=t.createElement(r.default,{onResize:V},t.createElement("span",{className:`${K}-string`,ref:B,style:{msTransform:e,WebkitTransform:e,transform:e}},T))}else m=t.createElement("span",{className:`${K}-string`,style:{opacity:0},ref:B},T);return t.createElement("span",{...E,style:{...ei,...X,...F,...k},className:er,ref:_},m)});e.i(63335);var v=e.i(943081),y=e.i(763731),x=e.i(829672);let w=e=>{let{size:r,shape:i}=t.useContext(d),o=t.useMemo(()=>({size:e.size||r,shape:e.shape||i}),[e.size,e.shape,r,i]);return t.createElement(d.Provider,{value:o},e.children)};b.Group=e=>{let{getPrefixCls:r,direction:i}=t.useContext(l.ConfigContext),{prefixCls:n,className:a,rootClassName:c,style:u,maxCount:d,maxStyle:p,size:m,shape:h,maxPopoverPlacement:g,maxPopoverTrigger:j,children:k,max:S}=e,C=r("avatar",n),T=`${C}-group`,$=(0,s.default)(C),[O,A]=f(C,$),E=(0,o.clsx)(T,{[`${T}-rtl`]:"rtl"===i},A,$,a,c,O),z=(0,v.toArray)(k).map((e,t)=>(0,y.cloneElement)(e,{key:`avatar-key-${t}`})),M=S?.count||d,P=z.length;if(M&&M<P){let e=z.slice(0,M),r=z.slice(M,P),i=S?.style||p,n=S?.popover?.trigger||j||"hover",a=S?.popover?.placement||g||"top",l={content:r,...S?.popover,placement:a,trigger:n,rootClassName:(0,o.clsx)(`${T}-popover`,S?.popover?.rootClassName)};return e.push(t.createElement(x.default,{key:"avatar-popover-key",destroyOnHidden:!0,...l},t.createElement(b,{style:i},`+${P-M}`))),t.createElement(w,{shape:h,size:m},t.createElement("div",{className:E,style:u},e))}return t.createElement(w,{shape:h,size:m},t.createElement("div",{className:E,style:u},z))},e.s(["default",0,b],965760)},486642,e=>{"use strict";var t=e.i(843476),r=e.i(128709),i=e.i(184283),o=e.i(271645);let n=(0,i.createStaticStyles)(({css:e,cssVar:t})=>({desc:e`
    font-size: 16px;
    color: ${t.colorTextDescription};
    ${i.responsive.sm} {
      text-align: center;
    }
  `,subtitle:e`
    font-size: 20px;
    font-weight: 400;
    line-height: 1.6;
    ${i.responsive.sm} {
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
    ${i.responsive.sm} {
      font-size: 24px;
    }
  `})),a=(0,o.memo)(({children:e,className:o,...a})=>(0,t.jsx)(r.Text,{className:(0,i.cx)(n.subtitle,o),...a,children:e}));e.s(["default",0,a],486642)},748619,e=>{"use strict";var t=e.i(843476),r=e.i(128709),i=e.i(184283),o=e.i(271645);let n=(0,i.createStaticStyles)(({css:e})=>({container:e`
    flex-wrap: wrap;
    column-gap: 0.3em;

    min-height: 60px;

    font-size: 48px;
    font-weight: bold;
    line-height: 1.2;
    ${i.responsive.sm} {
      font-size: 32px;
    }
  `})),a=(0,o.memo)(({as:e="h2",children:o,className:a,...l})=>(0,t.jsx)(r.Text,{as:e,className:(0,i.cx)(n.container,a),...l,children:o}));e.s(["default",0,a])},347782,e=>{"use strict";var t=e.i(843476),r=e.i(522016),i=e.i(271645);e.s(["default",0,({prefetch:e,onMouseEnter:o,...n})=>{let a=(0,i.useRef)(!1),[,l]=(0,i.useState)(0),s=(0,i.useCallback)(e=>{a.current||l(e=>e+1),a.current=!0,o?.(e)},[o]);return(0,t.jsx)(r.default,{...n,onMouseEnter:s,prefetch:e??(!!a.current&&null)})}])},297355,e=>{"use strict";let t="%[a-f0-9]{2}",r=RegExp("("+t+")|([^%]+?)","gi"),i=RegExp("("+t+")+","gi");function o(e,t){if("string"!=typeof e||"string"!=typeof t)throw TypeError("Expected the arguments to be of type `string`");if(""===e||""===t)return[];let r=e.indexOf(t);return -1===r?[]:[e.slice(0,r),e.slice(r+t.length)]}let n=Symbol("encodeFragmentIdentifier");function a(e){if("string"!=typeof e||1!==e.length)throw TypeError("arrayFormatSeparator must be single character string")}function l(e,t){return t.encode?t.strict?encodeURIComponent(e).replaceAll(/[!'()*]/g,e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`):encodeURIComponent(e):e}function s(e,t){if(t.decode){if("string"!=typeof e)throw TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return decodeURIComponent(e)}catch{var o=e;let t={"%FE%FF":"��","%FF%FE":"��"},n=i.exec(o);for(;n;){try{t[n[0]]=decodeURIComponent(n[0])}catch{let e=function(e){try{return decodeURIComponent(e)}catch{let t=e.match(r)||[];for(let i=1;i<t.length;i++)t=(e=(function e(t,r){try{return[decodeURIComponent(t.join(""))]}catch{}if(1===t.length)return t;r=r||1;let i=t.slice(0,r),o=t.slice(r);return Array.prototype.concat.call([],e(i),e(o))})(t,i).join("")).match(r)||[];return e}}(n[0]);e!==n[0]&&(t[n[0]]=e)}n=i.exec(o)}for(let e of(t["%C2"]="�",Object.keys(t)))o=o.replace(RegExp(e,"g"),t[e]);return o}}return e}function c(e){let t=e.indexOf("#");return -1!==t&&(e=e.slice(0,t)),e}function u(e,t,r){return"string"===r&&"string"==typeof e?e:"function"==typeof r&&"string"==typeof e?r(e):"boolean"===r&&null===e||("boolean"===r&&null!==e&&("true"===e.toLowerCase()||"false"===e.toLowerCase())?"true"===e.toLowerCase():"boolean"===r&&null!==e&&("1"===e.toLowerCase()||"0"===e.toLowerCase())?"1"===e.toLowerCase():"string[]"===r&&"none"!==t.arrayFormat&&"string"==typeof e?[e]:"number[]"!==r||"none"===t.arrayFormat||Number.isNaN(Number(e))||"string"!=typeof e||""===e.trim()?"number"!==r||Number.isNaN(Number(e))||"string"!=typeof e||""===e.trim()?t.parseBooleans&&null!==e&&("true"===e.toLowerCase()||"false"===e.toLowerCase())?"true"===e.toLowerCase():t.parseNumbers&&!Number.isNaN(Number(e))&&"string"==typeof e&&""!==e.trim()?Number(e):e:Number(e):[Number(e)])}function d(e){let t=(e=c(e)).indexOf("?");return -1===t?"":e.slice(t+1)}function p(e,t){a((t={decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1,types:Object.create(null),...t}).arrayFormatSeparator);let r=function(e){let t;switch(e.arrayFormat){case"index":return(e,r,i)=>{if(t=/\[(\d*)]$/.exec(e),e=e.replace(/\[\d*]$/,""),!t){i[e]=r;return}void 0===i[e]&&(i[e]={}),i[e][t[1]]=r};case"bracket":return(e,r,i)=>{if(t=/(\[])$/.exec(e),e=e.replace(/\[]$/,""),!t){i[e]=r;return}if(void 0===i[e]){i[e]=[r];return}i[e]=[...i[e],r]};case"colon-list-separator":return(e,r,i)=>{if(t=/(:list)$/.exec(e),e=e.replace(/:list$/,""),!t){i[e]=r;return}if(void 0===i[e]){i[e]=[r];return}i[e]=[...i[e],r]};case"comma":case"separator":return(t,r,i)=>{let o="string"==typeof r&&r.includes(e.arrayFormatSeparator)?r.split(e.arrayFormatSeparator).map(t=>s(t,e)):null===r?r:s(r,e);i[t]=o};case"bracket-separator":return(t,r,i)=>{let o=/(\[])$/.test(t);if(t=t.replace(/\[]$/,""),!o){i[t]=r?s(r,e):r;return}let n=null===r?[]:s(r,e).split(e.arrayFormatSeparator);if(void 0===i[t]){i[t]=n;return}i[t]=[...i[t],...n]};default:return(e,t,r)=>{if(void 0===r[e]){r[e]=t;return}r[e]=[...[r[e]].flat(),t]}}}(t),i=Object.create(null);if("string"!=typeof e||!(e=e.trim().replace(/^[?#&]/,"")))return i;for(let n of e.split("&")){if(""===n)continue;let e=t.decode?n.replaceAll("+"," "):n,[a,l]=o(e,"=");void 0===a&&(a=e),l=void 0===l?null:["comma","separator","bracket-separator"].includes(t.arrayFormat)?l:s(l,t),r(s(a,t),l,i)}for(let[e,r]of Object.entries(i))if("object"==typeof r&&null!==r&&"string"!==t.types[e])for(let[i,o]of Object.entries(r)){let n=t.types[e],a="function"==typeof n?n:n?n.replace("[]",""):void 0;r[i]=u(o,t,a)}else"object"==typeof r&&null!==r&&"string"===t.types[e]?i[e]=Object.values(r).join(t.arrayFormatSeparator):i[e]=u(r,t,t.types[e]);return!1===t.sort?i:(!0===t.sort?Object.keys(i).sort():Object.keys(i).sort(t.sort)).reduce((e,t)=>{let r=i[t];return e[t]=r&&"object"==typeof r&&!Array.isArray(r)?function e(t){return Array.isArray(t)?t.sort():"object"==typeof t?e(Object.keys(t)).sort((e,t)=>Number(e)-Number(t)).map(e=>t[e]):t}(r):r,e},Object.create(null))}function m(e,t){if(!e)return"";a((t={encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:",",...t}).arrayFormatSeparator);let r=r=>t.skipNull&&null==e[r]||t.skipEmptyString&&""===e[r],i=function(e){switch(e.arrayFormat){case"index":return t=>(r,i)=>{let o=r.length;return void 0===i||e.skipNull&&null===i||e.skipEmptyString&&""===i?r:null===i?[...r,l(t,e)+"["+o+"]"]:[...r,l(t,e)+"["+l(o,e)+"]="+l(i,e)]};case"bracket":return t=>(r,i)=>void 0===i||e.skipNull&&null===i||e.skipEmptyString&&""===i?r:null===i?[...r,l(t,e)+"[]"]:[...r,l(t,e)+"[]="+l(i,e)];case"colon-list-separator":return t=>(r,i)=>void 0===i||e.skipNull&&null===i||e.skipEmptyString&&""===i?r:null===i?[...r,l(t,e)+":list="]:[...r,l(t,e)+":list="+l(i,e)];case"comma":case"separator":case"bracket-separator":{let t="bracket-separator"===e.arrayFormat?"[]=":"=";return r=>(i,o)=>void 0===o||e.skipNull&&null===o||e.skipEmptyString&&""===o?i:(o=null===o?"":o,0===i.length)?[[l(r,e),t,l(o,e)].join("")]:[[i,l(o,e)].join(e.arrayFormatSeparator)]}default:return t=>(r,i)=>void 0===i||e.skipNull&&null===i||e.skipEmptyString&&""===i?r:null===i?[...r,l(t,e)]:[...r,l(t,e)+"="+l(i,e)]}}(t),o={};for(let[t,i]of Object.entries(e))r(t)||(o[t]=i);let n=Object.keys(o);return!1!==t.sort&&n.sort(t.sort),n.map(r=>{let o=e[r];if(t.replacer&&void 0===(o=t.replacer(r,o))||void 0===o)return"";if(null===o)return l(r,t);if(Array.isArray(o)){if(0===o.length&&"bracket-separator"===t.arrayFormat)return l(r,t)+"[]";let e=o;return t.replacer&&(e=o.map((e,i)=>t.replacer(`${r}[${i}]`,e)).filter(e=>void 0!==e)),e.reduce(i(r),[]).join("&")}return l(r,t)+"="+l(o,t)}).filter(e=>e.length>0).join("&")}function h(e,t){t={decode:!0,...t};let[r,i]=o(e,"#");return void 0===r&&(r=e),{url:r?.split("?")?.[0]??"",query:p(d(e),t),...t&&t.parseFragmentIdentifier&&i?{fragmentIdentifier:s(i,t)}:{}}}function g(e,t){var r;let i,o;t={encode:!0,strict:!0,[n]:!0,...t};let a=c(e.url).split("?")[0]||"",l=m({...p(d(e.url),{sort:!1,...t}),...e.query},t);l&&=`?${l}`;let s=(r=e.url,i="",-1!==(o=r.indexOf("#"))&&(i=r.slice(o)),i);if("string"==typeof e.fragmentIdentifier){let r=new URL(a);r.hash=e.fragmentIdentifier,s=t[n]?r.hash:`#${e.fragmentIdentifier}`}return`${a}${l}${s}`}function f(e,t,r){let{url:i,query:o,fragmentIdentifier:a}=h(e,r={parseFragmentIdentifier:!0,[n]:!1,...r});return g({url:i,query:function(e,t){let r={};if(Array.isArray(t))for(let i of t){let t=Object.getOwnPropertyDescriptor(e,i);t?.enumerable&&Object.defineProperty(r,i,t)}else for(let i of Reflect.ownKeys(e)){let o=Object.getOwnPropertyDescriptor(e,i);if(o.enumerable){let n=e[i];t(i,n,e)&&Object.defineProperty(r,i,o)}}return r}(o,t),fragmentIdentifier:a},r)}e.s(["exclude",0,function(e,t,r){return f(e,Array.isArray(t)?e=>!t.includes(e):(e,r)=>!t(e,r),r)},"extract",0,d,"parse",0,p,"parseUrl",0,h,"pick",0,f,"stringify",0,m,"stringifyUrl",0,g],681324);var b=e.i(681324);e.s(["default",0,b],297355)},484479,e=>{"use strict";let t=(0,e.i(456420).default)("download",[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]);e.s(["default",0,t])},923388,e=>{"use strict";var t=e.i(484479);e.s(["DownloadIcon",()=>t.default])},924886,576792,e=>{"use strict";var t,r=e.i(271645);let i=async()=>{try{let e=navigator.userAgentData;if(!e?.getHighEntropyValues)return"unknown";let t=await e.getHighEntropyValues(["architecture"]),r=String(t.architecture||"").toLowerCase();if(r.includes("arm"))return"apple-silicon";if(r.includes("x86"))return"intel"}catch{}return"unknown"};e.s(["usePlatformDetection",0,()=>{let[e,t]=(0,r.useState)({macArchitecture:"unknown",platform:"unknown"});return(0,r.useEffect)(()=>{let e,r,o=!1,n=(e=window.navigator.userAgent.toLowerCase(),r=window.navigator.platform?.toLowerCase()||"",/iphone|ipad|ipod/.test(e)||r.includes("mac")&&"ontouchend"in document?{platform:"ios"}:e.includes("android")?{platform:"android"}:e.includes("mac")||r.includes("mac")||e.includes("darwin")?{macArchitecture:"unknown",platform:"mac"}:e.includes("win")||r.includes("win")||e.includes("windows")?{platform:"win"}:e.includes("linux")||r.includes("linux")||e.includes("x11")?{platform:"linux"}:{platform:"unknown"});return t(n),"mac"===n.platform&&(async()=>{let e=await i(),r="unknown"!==e?e:(()=>{try{let e=document.createElement("canvas"),t=e.getContext("webgl")||e.getContext("experimental-webgl");if(!t)return"unknown";let r=t.getExtension("WEBGL_debug_renderer_info");if(!r)return"unknown";let i=String(t.getParameter(r.UNMASKED_RENDERER_WEBGL)||"");if(/apple\s*(m\d|gpu|silicon)/i.test(i))return"apple-silicon";if(/intel/i.test(i)||/(amd|radeon|ati)/i.test(i))return"intel"}catch{}return"unknown"})();o||"unknown"!==r&&t(e=>"mac"===e.platform?{...e,macArchitecture:r}:e)})(),()=>{o=!0}},[]),e}],924886);var o=e.i(297355),n=((t={}).Android="android",t.Linux="linux",t.MacosAppleSilicon="macosAppleSilicon",t.MacosIntel="macosIntel",t.Windows="windows",t.iOS="ios",t);let a=new class{latestEndpoint="https://app.lobehub.com/api/desktop/latest";getApiType=e=>{switch(e){case"macosAppleSilicon":return"mac-arm";case"macosIntel":return"mac-intel";case"windows":return"windows";case"linux":return"linux";case"ios":case"android":return null}};getLatestDesktopRelease=async e=>{let t=await fetch(o.default.stringifyUrl({query:{as_json:1},url:this.latestEndpoint}),{signal:e});if(!t.ok)throw Error(`Failed to fetch desktop releases: ${t.status}`);return t.json()};getPlatformDownloadUrl=e=>{if("ios"===e)return"https://apps.apple.com/app/id6749615954";if("android"===e)return"https://play.google.com/store/apps/details?id=com.lobehub.app";let t=this.getApiType(e);return t?o.default.stringifyUrl({query:{type:t},url:this.latestEndpoint}):"/downloads"};getPlatformDownloadPage=e=>{switch(e.platform){case"ios":return"https://apps.apple.com/app/id6749615954";case"android":return"https://play.google.com/store/apps/details?id=com.lobehub.app";case"mac":return"/downloads/mac";case"win":return"/downloads/win";case"linux":return"/downloads/linux";default:return"/downloads"}};getPlatformDownloadPageLegacy=e=>{switch(e){case"mac":return"/downloads/mac";case"win":return"/downloads/win";case"linux":return"/downloads/linux";default:return"/downloads"}};getRecommendedDownloadPlatform=e=>{switch(e.platform){case"ios":return"ios";case"android":return"android";case"mac":if("intel"===e.macArchitecture)return"macosIntel";if("apple-silicon"===e.macArchitecture);return"macosAppleSilicon";case"win":return"windows";case"linux":return"linux";default:return null}};getRecommendedDownloadPlatformLegacy=e=>{switch(e){case"mac":return"macosAppleSilicon";case"win":return"windows";case"linux":return"linux";default:return null}};getPlatformDisplayName=e=>{switch(e.platform){case"ios":return"iOS";case"android":return"Android";case"mac":if("intel"===e.macArchitecture)return"macOS";if("apple-silicon"===e.macArchitecture);return"macOS";case"win":return"Windows";case"linux":return"Linux";default:return"Unknown Platform"}};getPlatformDisplayNameLegacy=e=>{switch(e){case"mac":return"macOS";case"win":return"Windows";case"linux":return"Linux";default:return"Unknown Platform"}}};e.s(["DownloadPlatforms",()=>n,"downloadService",0,a],576792)},813097,263543,e=>{"use strict";var t=e.i(247167),r=e.i(843476),i=e.i(450354),o=e.i(123243),n=e.i(184283),a=e.i(271645);e.i(785269);var l=e.i(322831),s=e.i(923388),c=e.i(347782),u=e.i(924886),d=e.i(576792);let p=(0,a.memo)(({...e})=>{let{t}=(0,l.useTranslation)("downloads"),o=(0,u.usePlatformDetection)(),{text:n,url:p,isLoading:m,isExternal:h}=(0,a.useMemo)(()=>{if("unknown"===o.platform)return{isExternal:!1,isLoading:!0,text:t("page.downloadLatest"),url:"/downloads"};let e=d.downloadService.getPlatformDisplayName(o),r=d.downloadService.getPlatformDownloadPage(o);return{isExternal:"ios"===o.platform||"android"===o.platform,isLoading:!1,text:t("page.downloadFor",{platform:e}),url:r}},[t,o]);return h?(0,r.jsx)(i.Button,{href:p,icon:s.DownloadIcon,iconPlacement:"end",loading:m,size:"large",target:"_blank",...e,children:n}):(0,r.jsx)(c.default,{href:p,children:(0,r.jsx)(i.Button,{icon:s.DownloadIcon,iconPlacement:"end",loading:m,size:"large",...e,children:n})})});e.s(["default",0,p],263543);var m=e.i(892766),h=e.i(889515);let g=(0,n.createStaticStyles)(({css:e,cssVar:t})=>({button:e`
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
  `})),f=(0,a.memo)(({cloudCtaUtm:e,mobile:a,utmTerm:s})=>{let{t:u}=(0,l.useTranslation)(["landing","blog"]),d=e?.utmContent&&e.utmMedium?e:(t.default,{utmContent:h.UTM_CONTENT.callbackFooterDiscover,utmMedium:h.UTM_MEDIUM.discover});return(0,r.jsxs)(o.Center,{gap:16,horizontal:!a,children:[(0,r.jsx)(c.default,{href:(0,m.urlWithUTM)(m.LOBE_CHAT_URL,{utmContent:d.utmContent,utmMedium:d.utmMedium,...s?{utmTerm:s}:{}}),children:(0,r.jsx)(i.Button,{block:a,className:g.button,size:"large",type:"primary",children:u("buttons.getStartedForFree",{ns:"common"})})}),!a&&(0,r.jsx)(p,{className:(0,n.cx)(g.button,g.downloadButton),variant:"filled"})]})});e.s(["default",0,f],813097)},642623,e=>{"use strict";var t=e.i(806928);e.s(["div",()=>t.MotionDiv])},398777,e=>{"use strict";var t=e.i(806928);e.s(["p",()=>t.MotionP])},457606,e=>{"use strict";var t=e.i(843476);let r=e.i(271645).forwardRef(function({title:e="GitHub",color:r="currentColor",size:i=24,...o},n){return"default"===r&&(r="#181717"),(0,t.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:i,height:i,fill:r,viewBox:"0 0 24 24",ref:n,...o,children:[(0,t.jsx)("title",{children:e}),(0,t.jsx)("path",{d:"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"})]})});e.s(["SiGithub",0,r],457606)},474134,e=>{"use strict";var t=e.i(267820),r=e.i(708262),r=r,i=e.i(271645);e.s(["useResponsive",0,function(){var e=r.default.useBreakpoint();return(0,i.useMemo)(function(){return(0,t.convertBreakpointToResponsive)(e)},[e])}],474134)},650246,302467,e=>{"use strict";var t=e.i(492435),r=e.i(149167),i=e.i(184283);let o=(0,i.createStaticStyles)(({css:e,cssVar:t})=>({content:e`
      [class*='ant-modal-footer'] {
        margin: 0;
        padding: 16px;
      }

      [class*='ant-modal-header'] {
        display: flex;
        gap: 4px;
        align-items: center;
        justify-content: center;

        height: 56px;
        margin-block-end: 0;
        padding: 16px;
      }

      [class*='ant-modal-container'] {
        overflow: hidden;
        padding: 0;
        border: 1px solid ${t.colorSplit};
        border-radius: ${t.borderRadiusLG};
      }
    `,drawerContent:e`
      [class*='ant-drawer-close'] {
        padding: 0;
      }

      [class*='ant-drawer-header'] {
        flex: none;
        height: ${56}px !important;
        padding-block: 0;
        padding-inline: 16px;
      }

      [class*='ant-drawer-footer'] {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        padding: 16px;
        border: none;
      }
    `,wrap:e`
      overflow: hidden auto;
    `}));var n=e.i(271645),a=e.i(843476),l=e.i(464571),s=e.i(592143),c=e.i(608856),u=e.i(212931),d=e.i(474134),p=e.i(456420);let m=(0,p.default)("maximize-2",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]]),h=(0,p.default)("minimize-2",[["path",{d:"m14 10 7-7",key:"oa77jy"}],["path",{d:"M20 10h-6V4",key:"mjg0md"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M4 14h6v6",key:"rmj7iw"}]]);var g=e.i(263676);let f=(0,n.memo)(({panelRef:e,allowFullscreen:p,children:f,title:b=" ",className:v,classNames:y,width:x=700,onCancel:w,open:j,destroyOnHidden:k,paddings:S,height:C="75dvh",enableResponsive:T=!0,footer:$,styles:O,okText:A,onOk:E,cancelText:z,okButtonProps:M,cancelButtonProps:P,confirmLoading:R,...I})=>{let[L,N]=(0,n.useState)(!1),{mobile:B}=(0,d.useResponsive)(),_=!1===$||null===$;return T&&B?(0,a.jsx)(s.ConfigProvider,{theme:{token:{colorBgElevated:i.cssVar.colorBgContainer}},children:(0,a.jsx)(c.Drawer,{className:(0,i.cx)(o.drawerContent,v),closeIcon:(0,a.jsx)(r.default,{icon:g.X}),destroyOnHidden:k,height:L?"calc(100% - env(safe-area-inset-top))":C,open:j,panelRef:e,placement:"bottom",title:b,classNames:"function"==typeof y?y:{...y,wrapper:(0,i.cx)(o.wrap,y?.wrapper)},extra:p&&(0,a.jsx)(r.default,{icon:L?h:m,onClick:()=>N(!L)}),footer:_?null:$||(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l.Button,{color:"default",variant:"filled",onClick:w,...P,children:z||"Cancel"}),(0,a.jsx)(l.Button,{loading:R,type:"primary",onClick:E,...M,style:{marginInlineStart:8,...M?.style},children:A||"OK"})]}),styles:"function"==typeof O?O:{...O,body:{paddingBlock:`16px ${$?0:"16px"}`,paddingInline:S?.desktop??16,...O?.body}},onClose:w,...I,children:f})}):(0,a.jsx)(s.ConfigProvider,{theme:{token:{colorBgElevated:i.cssVar.colorBgContainer}},children:(0,a.jsx)(u.Modal,{closable:!0,cancelText:z,className:(0,i.cx)(o.content,v),closeIcon:(0,a.jsx)(t.default,{icon:g.X,size:20}),confirmLoading:R,destroyOnHidden:k,footer:_?null:$,mask:{closable:!0},okButtonProps:M,okText:A,open:j,panelRef:e,title:b,width:x,cancelButtonProps:{color:"default",variant:"filled",...P},classNames:"function"==typeof y?y:{...y,wrapper:(0,i.cx)(o.wrap,y?.wrapper)},styles:"function"==typeof O?O:{...O,body:{maxHeight:C,overflow:"hidden auto",paddingBlock:`0 ${null===$?"16px":0}`,paddingInline:S?.desktop??16,...O?.body}},onCancel:w,onOk:E,...I,children:f})})});f.displayName="Modal",e.s(["default",0,f],302467),e.s(["Modal",0,f],650246)},986253,e=>{"use strict";let t=(0,e.i(456420).default)("chevron-right",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);e.s(["default",0,t])},867927,e=>{"use strict";var t=e.i(986253);e.s(["ChevronRight",()=>t.default])},581461,e=>{"use strict";var t=e.i(529273),r=e.i(216795),i=e.i(956283),o=e.i(836877),n=e.i(152701),a=e.i(235917),l=e.i(605019),s=e.i(830341),c=e.i(271645),u=e.i(843476),d=e.i(184283),p=e.i(558860);let m=({children:e,disableDestroyOnInvalidTrigger:m=!1,disableZeroOriginGuard:h=!1,layoutAnimation:g=!1,popupContainer:f,...b})=>{let[{handle:v,key:y},x]=(0,c.useState)(()=>({handle:p.Tooltip.createHandle(),key:0})),w=(0,c.useRef)(null),j=(0,c.useCallback)(()=>{w.current=null,x(({key:e})=>({handle:p.Tooltip.createHandle(),key:e+1}))},[]),k=(0,c.useCallback)(e=>{w.current?.onOpenChange?.(e)},[]),S=(0,i.useAppElement)(),C=(0,r.useFloatingLayer)()??S;return(0,s.useDestroyOnInvalidActiveTriggerElement)(v.store,j,{enabled:!m}),(0,s.useHidePopupWhenPositionerAtOrigin)(v.store,{enabled:!h}),(0,u.jsx)(t.TooltipGroupHandleContext,{value:v,children:(0,u.jsxs)(t.TooltipGroupPropsContext,{value:b,children:[e,(0,u.jsx)(p.Tooltip.Root,{handle:v,onOpenChange:k,children:({payload:e})=>{let t=e??null;if(w.current=t,!t||null==t.title&&!t.hotkey)return null;let r=t.arrow??!1,i=t.placement??"top",s=o.placementMap[i]??o.placementMap.top,c={arrow:(0,d.cx)(a.styles.arrow,t.classNames?.arrow),popup:(0,d.cx)(a.styles.popup,t.className,t.classNames?.root,t.classNames?.container),positioner:a.styles.positioner,viewport:(0,d.cx)(a.styles.viewport,t.classNames?.content)},m=(()=>{if("function"!=typeof t.styles)return t.styles})(),h={arrow:m?.arrow,popup:{...m?.root,...m?.container},positioner:{zIndex:t.zIndex??114514},viewport:m?.content},b=g?(0,u.jsx)(p.Tooltip.Viewport,{className:c.viewport,style:h.viewport,children:(0,u.jsx)(l.default,{hotkey:t.hotkey,hotkeyProps:t.hotkeyProps,title:t.title})}):(0,u.jsx)("div",{className:c.viewport,style:h.viewport,children:(0,u.jsx)(l.default,{hotkey:t.hotkey,hotkeyProps:t.hotkeyProps,title:t.title})}),v=(0,u.jsx)(p.Tooltip.Positioner,{align:s.align,className:c.positioner,"data-layout-animation":g||void 0,"data-placement":i,side:s.side,sideOffset:r?8:6,style:h.positioner,...t.positionerProps,children:(0,u.jsxs)(p.Tooltip.Popup,{className:c.popup,"data-layout-animation":g||void 0,style:h.popup,...t.popupProps,children:[r&&(0,u.jsx)(p.Tooltip.Arrow,{className:c.arrow,style:h.arrow,children:n.TooltipArrowIcon}),b]})}),y=t.popupContainer??f??C;return y?(0,u.jsx)(p.Tooltip.Portal,{container:y,children:v}):null}},y)]})})};m.displayName="TooltipGroup",e.s(["default",0,m])},737623,e=>{"use strict";let t=(0,e.i(456420).default)("play",[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]);e.s(["default",0,t])},57095,e=>{"use strict";var t=e.i(737623);e.s(["PlayIcon",()=>t.default])},712225,e=>{"use strict";var t=e.i(206868),r=e.i(184283),i=e.i(225913);let o=(0,r.createStaticStyles)(({css:e})=>({bottomShadow:e`
      mask-image: linear-gradient(
        180deg,
        #000 calc(100% - var(--scroll-shadow-size, 40%)),
        transparent
      );
    `,hideScrollBar:e`
      scrollbar-width: none;

      -ms-overflow-style: none;

      &::-webkit-scrollbar {
        display: none;
      }
    `,horizontal:e`
      overflow-x: auto;
    `,leftRightShadow:e`
      mask-image: linear-gradient(
        to right,
        #000,
        #000,
        transparent 0,
        #000 var(--scroll-shadow-size, 40%),
        #000 calc(100% - var(--scroll-shadow-size, 40%)),
        transparent
      );
    `,leftShadow:e`
      mask-image: linear-gradient(
        270deg,
        #000 calc(100% - var(--scroll-shadow-size, 40%)),
        transparent
      );
    `,rightShadow:e`
      mask-image: linear-gradient(
        90deg,
        #000 calc(100% - var(--scroll-shadow-size, 40%)),
        transparent
      );
    `,root:e`
      position: relative;
      overflow: hidden;
    `,topBottomShadow:e`
      mask-image: linear-gradient(
        #000,
        #000,
        transparent 0,
        #000 var(--scroll-shadow-size, 40%),
        #000 calc(100% - var(--scroll-shadow-size, 40%)),
        transparent
      );
    `,topShadow:e`
      mask-image: linear-gradient(
        0deg,
        #000 calc(100% - var(--scroll-shadow-size, 40%)),
        transparent
      );
    `,vertical:e`
      overflow-y: auto;
    `})),n=(0,i.cva)(o.root,{defaultVariants:{hideScrollBar:!1,orientation:"vertical",scrollPosition:"none"},variants:{orientation:{horizontal:o.horizontal,vertical:o.vertical},hideScrollBar:{true:o.hideScrollBar,false:null},scrollPosition:{none:null,top:o.topShadow,bottom:o.bottomShadow,"top-bottom":o.topBottomShadow,left:o.leftShadow,right:o.rightShadow,"left-right":o.leftRightShadow}}});var a=e.i(271645),l=e.i(843476),s=e.i(346554);let c=({className:e,children:i,orientation:o="vertical",hideScrollBar:c=!1,size:u=16,offset:d=8,visibility:p="auto",isEnabled:m=!0,onVisibilityChange:h,style:g,ref:f,...b})=>{let v=(0,a.useMemo)(()=>({"--scroll-shadow-size":`${u}%`}),[u]),y=(0,a.useRef)(null),x=(({domRef:e,offset:t=0,orientation:r="vertical",isEnabled:i=!0,onVisibilityChange:o,updateDeps:n=[]})=>{let[l,s]=(0,a.useState)({bottom:!1,left:!1,right:!1,top:!1});return(0,a.useEffect)(()=>{let n=e.current;if(!n||!i)return;let a=()=>{let e={...l};"vertical"===r?n.scrollHeight>n.clientHeight?(e.top=n.scrollTop>t,e.bottom=n.scrollTop+n.clientHeight<n.scrollHeight-t):(e.top=!1,e.bottom=!1):n.scrollWidth>n.clientWidth?(e.left=n.scrollLeft>t,e.right=n.scrollLeft+n.clientWidth<n.scrollWidth-t):(e.left=!1,e.right=!1),s(e),o?.(e)};a(),n.addEventListener("scroll",a),window.addEventListener("resize",a);let c=new ResizeObserver(a);return c.observe(n),()=>{n.removeEventListener("scroll",a),window.removeEventListener("resize",a),c.disconnect()}},[e,t,r,i,o,...n]),l})({domRef:y,isEnabled:m&&"auto"===p,offset:d,onVisibilityChange:h,orientation:o,updateDeps:[i]}),w=(0,a.useMemo)(()=>"always"===p?{bottom:!0,left:!0,right:!0,top:!0}:"never"===p?{bottom:!1,left:!1,right:!1,top:!1}:x,[p,x]),j=(0,a.useMemo)(()=>{let e={"data-orientation":o};return"vertical"===o?w.top&&w.bottom?e["data-top-bottom-scroll"]=!0:w.top?e["data-top-scroll"]=!0:w.bottom&&(e["data-bottom-scroll"]=!0):w.left&&w.right?e["data-left-right-scroll"]=!0:w.left?e["data-left-scroll"]=!0:w.right&&(e["data-right-scroll"]=!0),e},[o,w]);return(0,l.jsx)(t.default,{className:(0,r.cx)(n({hideScrollBar:c,orientation:o,scrollPosition:(0,a.useMemo)(()=>{if("vertical"===o){if(w.top&&w.bottom)return"top-bottom";if(w.top)return"top";if(w.bottom)return"bottom"}else{if(w.left&&w.right)return"left-right";if(w.left)return"left";if(w.right)return"right"}return"none"},[o,w])}),e),ref:(0,s.mergeRefs)([y,f]),style:{...v,...g},...j,...b,children:i})};c.displayName="ScrollShadow",e.s(["default",0,c],712225)},164998,e=>{"use strict";var t=e.i(712225);e.s(["ScrollShadow",()=>t.default])},217611,e=>{"use strict";let t=(0,e.i(456420).default)("dot",[["circle",{cx:"12.1",cy:"12.1",r:"1",key:"18d7e5"}]]);e.s(["default",0,t])},953552,e=>{"use strict";var t=e.i(843476),r=e.i(128709),i=e.i(184283),o=e.i(271645);let n=(0,i.createStaticStyles)(({css:e})=>({container:e`
    width: min(100%, 560px);

    font-size: 44px;
    font-weight: bold;
    line-height: 1.4;
    letter-spacing: -0.04em;
    ${i.responsive.sm} {
      font-size: 28px;
    }
  `})),a=(0,o.memo)(({children:e,className:o,...a})=>(0,t.jsx)(r.Text,{as:"h2",className:(0,i.cx)(n.container,o),...a,children:e}));e.s(["default",0,a])},126021,e=>{"use strict";var t=e.i(206868),r=e.i(492435),i=e.i(58125),o=e.i(184283),n=e.i(225913);let a="12px 16px",l=e=>e||0===e?`${"string"==typeof e?e:`${e}px`} !important`:a,s=(0,o.createStaticStyles)(({css:e,cssVar:t})=>({borderless:e`
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
            ${i.staticStylish.variantOutlinedWithoutHover};
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
            ${i.staticStylish.variantOutlinedWithoutHover};
            background: ${t.colorBgContainer};
            ${i.staticStylish.shadow};
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
    `})),c=(0,n.cva)(s.root,{compoundVariants:[{class:s.gapOutlined,gap:!0,variant:"outlined"},{class:s.filledDark,isDarkMode:!0,variant:"filled"},{class:s.filledLight,isDarkMode:!1,variant:"filled"}],defaultVariants:{collapsible:!0,gap:!1,isDarkMode:!1},variants:{collapsible:{false:s.hideCollapsibleIcon,true:null},gap:{false:null,true:s.gapRoot},isDarkMode:{false:null,true:null},variant:{borderless:s.borderless,filled:null,outlined:s.outlined}}});var u=e.i(271645),d=e.i(843476),p=e.i(988122),p=p,m=e.i(592143),h=e.i(639007),g=e.i(716327);let f=(0,u.memo)(({style:e,variant:i="filled",gap:n=0,className:f,padding:b=a,size:v,collapsible:y=!0,items:x,styles:w,classNames:j,ref:k,...S})=>{let{isDarkMode:C}=(0,h.useThemeMode)(),T=(0,u.useMemo)(()=>x.map(({icon:e,desc:i,label:n,...a})=>{let l=(0,d.jsx)("div",{className:(0,o.cx)(s.title,!e&&!i&&j?.header,j?.title),style:{...!e&&!i?w?.header:{},...w?.title},children:n});return e&&(l=(0,d.jsxs)(t.default,{horizontal:!0,className:(0,o.cx)(s.title,!i&&j?.header),gap:8,style:i?void 0:w?.header,children:[(0,u.isValidElement)(e)?e:(0,d.jsx)(r.default,{icon:e,size:{size:"1.1em"}}),l]})),i&&(l=(0,d.jsxs)(t.default,{className:j?.header,style:w?.header,children:[l,(0,d.jsx)("div",{className:(0,o.cx)(s.desc,j?.desc),style:w?.desc,children:i})]})),{label:l,...a}}),[x,j,w,s]);return(0,d.jsx)(m.ConfigProvider,{theme:{components:{Collapse:{contentPadding:l("object"==typeof b?b?.body:b),headerPadding:l("object"==typeof b?b?.header:b)}}},children:(0,d.jsx)(p.default,{ghost:!0,className:(0,o.cx)(c({collapsible:y,gap:!!n,isDarkMode:C,variant:i}),f),collapsible:y?"header":"icon",items:T,ref:k,size:v,expandIcon:({isActive:e})=>(0,d.jsx)(r.default,{className:s.icon,icon:g.ChevronDown,size:16,style:{rotate:e?void 0:"-90deg"}}),style:{gap:n,...e},...S})})});f.displayName="Collapse",e.s(["default",0,f],126021)},765812,e=>{"use strict";var t=e.i(126021);e.s(["Collapse",()=>t.default])},810379,30058,512320,e=>{"use strict";var t=e.i(843476),r=e.i(943243),i=e.i(43884),o=e.i(184283),n=e.i(271645);let a=(0,o.createStaticStyles)(({css:e,cssVar:t})=>({container:e`
    overflow: hidden;
    border-radius: ${t.borderRadiusLG};
  `})),l=(0,n.memo)(({grid:e=!0,children:n,className:l,...s})=>e?(0,t.jsx)(i.Grid,{as:r.Block,className:(0,o.cx)(a.container,l),gap:16,rows:2,variant:"outlined",...s,children:n}):(0,t.jsx)(r.Block,{className:(0,o.cx)(a.container,l),gap:16,horizontal:!0,variant:"outlined",...s,children:n}));e.s(["default",0,l],810379);var s=e.i(208544),c=e.i(128709);let u=(0,o.createStaticStyles)(({css:e})=>({container:e`
    margin: 0;
    font-size: 24px;
    font-weight: 500;
    line-height: 1.4;
    ${o.responsive.sm} {
      font-size: 18px;
    }
  `})),d=(0,n.memo)(({children:e,className:r,...i})=>(0,t.jsx)(c.Text,{as:"h3",className:(0,o.cx)(u.container,r),...i,children:e}));e.s(["default",0,d],30058);let p=(0,o.createStaticStyles)(({css:e})=>({container:e`
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.4;
    ${o.responsive.sm} {
      font-size: 14px;
    }
  `})),m=(0,n.memo)(({children:e,className:r,...i})=>(0,t.jsx)(c.Text,{as:"h3",className:(0,o.cx)(p.container,r),...i,children:e})),h=(0,n.memo)(({title:e,subTitle:r})=>(0,t.jsxs)(s.Flexbox,{gap:12,style:{paddingBottom:8,paddingTop:4},children:[(0,t.jsx)(m,{children:e}),(0,t.jsx)(d,{children:r})]}));e.s(["default",0,h],512320)},859634,e=>{"use strict";var t=e.i(892766);let r={adaptiveBehavior:{dark:(0,t.getHubApacPublicUrl)("images/home/adaptive-behavior-dark.webp"),light:(0,t.getHubApacPublicUrl)("images/home/adaptive-behavior-light.webp"),size:[640,475]},agentBuilder:{dark:(0,t.getHubApacPublicUrl)("images/home/agent-builder-dark.webp"),light:(0,t.getHubApacPublicUrl)("images/home/agent-builder-light.webp"),size:[2048,1365]},collaborateBg:{dark:"linear-gradient(113.3deg, #38B6FF 0%, #1B67FF 100%)",light:"linear-gradient(113.3deg, #38B6FF 0%, #6875FF 100%)",size:[768,512]},community:{dark:(0,t.getHubApacPublicUrl)("images/home/community-dark.webp"),light:(0,t.getHubApacPublicUrl)("images/home/community-light.webp"),size:[2048,1365]},continualLearning:{dark:(0,t.getHubApacPublicUrl)("images/home/continual-learning-dark.webp"),light:(0,t.getHubApacPublicUrl)("images/home/continual-learning-light.webp"),size:[640,475]},createBg:{dark:"linear-gradient(113.3deg, #FFCF58 0%, #FF6A01 100%)",light:"linear-gradient(113.3deg, #FFCF58 0%, #FFA15E 100%)",size:[768,512]},discordMultiServer:{dark:(0,t.getHubApacPublicUrl)("images/im-integration/discord-multi-server.webp"),light:(0,t.getHubApacPublicUrl)("images/im-integration/discord-multi-server.webp"),size:[520,386]},discordServerIntegration:{dark:(0,t.getHubApacPublicUrl)("images/im-integration/discord-chat.webp"),light:(0,t.getHubApacPublicUrl)("images/im-integration/discord-chat.webp"),size:[520,386]},discordSlashCommands:{dark:(0,t.getHubApacPublicUrl)("images/im-integration/discord-slash.webp"),light:(0,t.getHubApacPublicUrl)("images/im-integration/discord-slash.webp"),size:[520,386]},discordThreadAware:{dark:(0,t.getHubApacPublicUrl)("images/im-integration/discord-thread.webp"),light:(0,t.getHubApacPublicUrl)("images/im-integration/discord-thread.webp"),size:[520,386]},intelligence:{dark:(0,t.getHubApacPublicUrl)("images/home/intelligence-dark.webp"),light:(0,t.getHubApacPublicUrl)("images/home/intelligence-light.webp"),size:[520,372]},multiAgent:{dark:(0,t.getHubApacPublicUrl)("images/home/group-dark.webp"),light:(0,t.getHubApacPublicUrl)("images/home/group-light.webp"),size:[2048,1365]},overviewCover:{dark:(0,t.getHubApacPublicUrl)("images/home/overview-dark.webp"),light:(0,t.getHubApacPublicUrl)("images/home/overview-light.webp"),size:[2900,1632]},pages:{dark:(0,t.getHubApacPublicUrl)("images/home/pages-dark.webp"),light:(0,t.getHubApacPublicUrl)("images/home/pages-light.webp"),size:[520,386]},personalMemory:{dark:(0,t.getHubApacPublicUrl)("images/home/personal-memory-dark.webp"),light:(0,t.getHubApacPublicUrl)("images/home/personal-memory-light.webp"),size:[640,475]},project:{dark:(0,t.getHubApacPublicUrl)("images/home/project-dark.webp"),light:(0,t.getHubApacPublicUrl)("images/home/project-light.webp"),size:[520,386]},schedule:{dark:(0,t.getHubApacPublicUrl)("images/home/schedule-dark.webp"),light:(0,t.getHubApacPublicUrl)("images/home/schedule-light.webp"),size:[520,386]},skills:{dark:(0,t.getHubApacPublicUrl)("images/home/skills-dark.webp"),light:(0,t.getHubApacPublicUrl)("images/home/skills-light.webp"),size:[520,597]},slackChannelIntegration:{dark:(0,t.getHubApacPublicUrl)("images/im-integration/slack-channel-dark.webp"),light:(0,t.getHubApacPublicUrl)("images/im-integration/slack-channel-light.webp"),size:[520,386]},slackCustomize:{dark:(0,t.getHubApacPublicUrl)("images/im-integration/slack-customize.webp"),light:(0,t.getHubApacPublicUrl)("images/im-integration/slack-customize.webp"),size:[600,450]},slackDirectMessaging:{dark:(0,t.getHubApacPublicUrl)("images/im-integration/slack-chat-dark.webp"),light:(0,t.getHubApacPublicUrl)("images/im-integration/slack-chat-light.webp"),size:[520,386]},slackHero:{dark:(0,t.getHubApacPublicUrl)("images/im-integration/slack-hero-dark.webp"),light:(0,t.getHubApacPublicUrl)("images/im-integration/slack-hero-light.webp"),size:[960,540]},slackSlashCommands:{dark:(0,t.getHubApacPublicUrl)("images/im-integration/slack-slash-dark.webp"),light:(0,t.getHubApacPublicUrl)("images/im-integration/slack-slash-light.webp"),size:[520,386]},slackThreadAware:{dark:(0,t.getHubApacPublicUrl)("images/im-integration/slack-thread-dark.webp"),light:(0,t.getHubApacPublicUrl)("images/im-integration/slack-thread-light.webp"),size:[520,386]},telegramBotConversations:{dark:(0,t.getHubApacPublicUrl)("images/im-integration/teleram-chat-dark.webp"),light:(0,t.getHubApacPublicUrl)("images/im-integration/teleram-chat-light.webp"),size:[520,386]},telegramGroupChat:{dark:(0,t.getHubApacPublicUrl)("images/im-integration/teleram-topic-dark.webp"),light:(0,t.getHubApacPublicUrl)("images/im-integration/telegram-topic-light.webp"),size:[520,386]},telegramInlineQueries:{dark:(0,t.getHubApacPublicUrl)("images/im-integration/teleram-slash-dark.webp"),light:(0,t.getHubApacPublicUrl)("images/im-integration/telegram-slash-light.webp"),size:[520,386]},telegramRichMedia:{dark:(0,t.getHubApacPublicUrl)("images/im-integration/teleram-profile-dark.webp"),light:(0,t.getHubApacPublicUrl)("images/im-integration/telegram-profile-light.webp"),size:[520,386]},whiteBox:{dark:(0,t.getHubApacPublicUrl)("images/home/white-box-dark.webp"),light:(0,t.getHubApacPublicUrl)("images/home/white-box-light.webp"),size:[640,475]},workspace:{dark:(0,t.getHubApacPublicUrl)("images/home/workspace-dark.webp"),light:(0,t.getHubApacPublicUrl)("images/home/workspace-light.webp"),size:[520,386]}},i={agentBuilder:{dark:(0,t.getHubApacPublicUrl)("images/home/agent-builder-dark.webm"),light:(0,t.getHubApacPublicUrl)("images/home/agent-builder-light.webm"),maker:[0,3,14]},community:{dark:(0,t.getHubApacPublicUrl)("images/home/community-dark.webm"),light:(0,t.getHubApacPublicUrl)("images/home/community-light.webm"),maker:[0,7,11,18]},multiAgent:{dark:(0,t.getHubApacPublicUrl)("images/home/group-dark.webm"),light:(0,t.getHubApacPublicUrl)("images/home/group-light.webm"),maker:[0,15,23,28]}};e.s(["getAssets",0,(e,t)=>{let i=r[e];return t?i.dark:i.light},"getRatio",0,e=>{let t=r[e];return t.size[0]/t.size[1]},"getVideoAssets",0,(e,t)=>{let r=i[e];return t?r.dark:r.light},"getVideoMarkers",0,e=>i[e].maker])},585230,e=>{"use strict";var t=e.i(206868),r=e.i(184283),i=e.i(225913);let o=(0,r.createStaticStyles)(({css:e})=>({bottomShadow:e`
      mask-image: linear-gradient(
        180deg,
        #000 calc(100% - var(--mask-shadow-size, 40%)),
        transparent
      );
    `,leftShadow:e`
      mask-image: linear-gradient(
        270deg,
        #000 calc(100% - var(--mask-shadow-size, 40%)),
        transparent
      );
    `,rightShadow:e`
      mask-image: linear-gradient(
        90deg,
        #000 calc(100% - var(--mask-shadow-size, 40%)),
        transparent
      );
    `,root:e`
      scrollbar-width: none;
      position: relative;
      overflow: hidden;

      -ms-overflow-style: none;

      &::-webkit-scrollbar {
        display: none;
      }
    `,topShadow:e`
      mask-image: linear-gradient(
        0deg,
        #000 calc(100% - var(--mask-shadow-size, 40%)),
        transparent
      );
    `})),n=(0,i.cva)(o.root,{defaultVariants:{position:"bottom"},variants:{position:{top:o.topShadow,bottom:o.bottomShadow,left:o.leftShadow,right:o.rightShadow}}});var a=e.i(271645),l=e.i(843476);let s=(0,a.memo)(({className:e,children:i,position:o="bottom",size:s=40,...c})=>{let u=(0,a.useMemo)(()=>({"--mask-shadow-size":`${s}%`}),[s]);return(0,l.jsx)(t.default,{className:(0,r.cx)(n({position:o}),e),style:{...u,...c.style},...c,children:i})});s.displayName="MaskShadow",e.s(["MaskShadow",0,s],585230)},642485,e=>{"use strict";var t=e.i(511450),r=e.i(191710),i=e.i(964285),o=e.i(993371),n=e.i(701937),a=e.i(952388),l=o.default;l.Color=r.default,l.Text=n.default,l.Combine=i.default,l.Avatar=t.default,l.colorPrimary=a.COLOR_PRIMARY,l.title=a.TITLE,e.s(["default",0,l])},271881,e=>{"use strict";var t=e.i(642485);e.s(["Zeabur",()=>t.default])},520469,e=>{"use strict";var t=e.i(843476),r=e.i(450354),i=e.i(765812),o=e.i(208544),n=e.i(128709),a=e.i(184283);let l=(0,e.i(456420).default)("mail",[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]]);var s=e.i(271645);e.i(785269);var c=e.i(345771),u=e.i(322831),d=e.i(953552),p=e.i(347782),m=e.i(892766);let h="LobeHub Cloud",g=(0,a.createStaticStyles)(({css:e,cssVar:t})=>({icon:e`
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
    ${a.responsive.sm} {
      font-size: 26px;
      text-align: center;
    }
  `})),f=(0,s.memo)(({mobile:e})=>{let{t:a}=(0,u.useTranslation)("subscription"),s=[{children:a("qa.list.whatIs.a"),key:"whatIs",label:a("qa.list.whatIs.q")},{children:a("qa.list.howToUse.a"),key:"howToUse",label:a("qa.list.howToUse.q")},{children:a("qa.list.cost.a",{cloud:h}),key:"cost",label:a("qa.list.cost.q")},{children:a("qa.list.credit.a",{cloud:h}),key:"credit",label:a("qa.list.credit.q",{cloud:h})},{children:a("qa.list.community.a"),key:"community",label:a("qa.list.community.q")},{children:a("qa.list.opensource.a"),key:"opensource",label:a("qa.list.opensource.q")}];return(0,t.jsxs)(o.Flexbox,{gap:32,horizontal:!e,paddingBlock:16,width:"100%",wrap:"wrap",children:[(0,t.jsxs)(o.Flexbox,{flex:1,gap:16,children:[(0,t.jsx)(d.default,{children:a("qa.title")}),(0,t.jsx)(n.Text,{as:"p",fontSize:16,children:(0,t.jsxs)(c.Trans,{i18nKey:"qa.desc",ns:"subscription",children:["若没有回答到您想了解的问题, 可以查阅",(0,t.jsx)(p.default,{href:"/docs/usage/subscription/model-pricing",children:"产品文档"}),"获取更多常见问题，同时欢迎与我们联系。"]})}),(0,t.jsxs)(o.Flexbox,{gap:8,horizontal:!e,paddingBlock:24,children:[(0,t.jsx)(p.default,{href:(0,m.mailTo)(m.SUPPORT_MAIL),style:e?{flex:1}:{},target:"_blank",children:(0,t.jsx)(r.Button,{block:e,icon:l,size:"large",style:{minWidth:144},children:a("qa.support.email")})}),(0,t.jsx)(p.default,{href:m.DISCORD_URL,style:e?{flex:1}:{},target:"_blank",children:(0,t.jsx)(r.Button,{block:e,size:"large",style:{minWidth:144},children:a("qa.support.community")})})]})]}),(0,t.jsx)(o.Flexbox,{flex:2,children:(0,t.jsx)(i.Collapse,{accordion:!0,className:g.itemTitle,expandIconPlacement:"end",gap:12,items:s,variant:"outlined"})})]})});e.s(["default",0,f],520469)},681165,e=>{"use strict";var t="#1B1917";e.s(["AVATAR_BACKGROUND",0,t,"AVATAR_COLOR",0,"#fff","AVATAR_ICON_MULTIPLE",0,.75,"COLOR_PRIMARY",0,t,"COMBINE_SPACE_MULTIPLE",0,.1,"COMBINE_TEXT_MULTIPLE",0,.85,"TITLE",0,"Langfuse"])},106497,e=>{"use strict";var t=e.i(271645),r=e.i(681165),i=e.i(843476);function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var n=["size","style"];function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,i)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach(function(t){var i,n,a;i=e,n=t,a=r[t],(n=function(e){var t=function(e,t){if("object"!=o(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var i=r.call(e,t||"default");if("object"!=o(i))return i;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==o(t)?t:String(t)}(n))in i?Object.defineProperty(i,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):i[n]=a}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var s=(0,t.memo)(function(e){var t=e.size,o=void 0===t?"1em":t,a=e.style,s=function(e,t){if(null==e)return{};var r,i,o=function(e,t){if(null==e)return{};var r,i,o={},n=Object.keys(e);for(i=0;i<n.length;i++)r=n[i],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(i=0;i<n.length;i++)r=n[i],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}(e,n);return(0,i.jsxs)("svg",l(l({fill:"currentColor",fillRule:"evenodd",height:o,style:l({flex:"none",lineHeight:1},a),viewBox:"0 0 24 24",width:o,xmlns:"http://www.w3.org/2000/svg"},s),{},{children:[(0,i.jsx)("title",{children:r.TITLE}),(0,i.jsx)("path",{d:"M11.925 14.781l1.823 1.465s1.395-1.036 2.421-1.188c1.076-.16 2.224.44 3.288 1.155 1.607 1.08 2.959 2.451 2.959 2.451L24 17.11s-4.367-4.732-7.83-4.304c-2.272.281-4.245 1.975-4.245 1.975z"}),(0,i.jsx)("path",{d:"M1.494 5.757L0 7.401s4.164 3.886 7.442 3.886c1.494 0 3.567-1.171 5.35-2.692 1.016-.867 2.152-1.851 3.288-1.851.763 0 1.77.404 2.72 1.466 0 0 .612-.368.986-.632.328-.232.816-.627.816-.627-1.366-1.458-3.342-2.524-4.522-2.419-1.913 0-3.288 1.191-4.992 2.568-1.703 1.377-2.42 1.945-3.646 1.945-2.062 0-5.948-3.288-5.948-3.288zM1.494 18.278L0 16.635s4.164-3.886 7.442-3.886c1.494 0 3.567 1.17 5.35 2.692 1.016.866 2.152 1.851 3.288 1.851.767 0 1.766-.421 2.72-1.494 0 0 .573.353.926.597.363.252.897.667.897.667-1.367 1.47-3.357 2.547-4.543 2.442-1.913 0-3.049-1.014-4.752-2.391-1.704-1.377-2.66-2.122-3.886-2.122-2.062 0-5.948 3.287-5.948 3.287zM20.981 9.461c-.389.269-1.016.658-1.016.658s.359.777.359 1.823c0 1.046-.329 1.943-.329 1.943s.563.351.927.597c.377.256.956.688.956.688s.687-1.435.687-3.228c0-1.793-.687-3.138-.687-3.138s-.54.41-.897.657z"}),(0,i.jsx)("path",{d:"M12.015 9.222l1.733-1.434s1.395 1.003 2.421 1.155c1.076.16 2.224-.44 3.288-1.155 1.607-1.08 2.959-2.451 2.959-2.451L24 6.89s-4.367 4.732-7.83 4.304c-2.272-.28-4.155-1.973-4.155-1.973zM7.83 4.5c2.242 0 4.125 1.913 4.125 1.913s-.524.413-.867.687c-.357.286-.926.747-.926.747S9.176 6.801 7.83 6.801c-.552 0-1.268.332-2.033.987-.59.505-1.203 1.133-1.613 1.912-.356.674-.55 1.468-.568 2.302-.024 1.047.347 2.145.956 3.018.408.586.895 1.027 1.405 1.405.661.491 1.351.837 1.853.837.536 0 1.017-.186 1.375-.358.568-.33 1.016-.718 1.016-.718l1.763 1.465s-.717.717-1.703 1.255c-.638.314-1.456.628-2.451.628-.994 0-2.148-.528-3.228-1.345-.698-.528-1.382-1.154-1.913-1.913-.87-1.244-1.318-2.758-1.315-4.274A7.568 7.568 0 012.75 7.698C4.125 5.905 6.158 4.5 7.83 4.5z"})]}))});e.s(["default",0,s])},273233,e=>{"use strict";var t=e.i(271645),r=e.i(339816),i=e.i(681165),o=e.i(106497),n=e.i(843476);function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,i)}return r}var s=(0,t.memo)(function(e){var t=Object.assign({},(function(e){if(null==e)throw TypeError("Cannot destructure "+e)}(e),e));return(0,n.jsx)(r.default,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach(function(t){var i,o,n;i=e,o=t,n=r[t],(o=function(e){var t=function(e,t){if("object"!=a(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var i=r.call(e,t||"default");if("object"!=a(i))return i;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==a(t)?t:String(t)}(o))in i?Object.defineProperty(i,o,{value:n,enumerable:!0,configurable:!0,writable:!0}):i[o]=n}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({Icon:o.default,"aria-label":i.TITLE,background:i.AVATAR_BACKGROUND,color:i.AVATAR_COLOR,iconMultiple:i.AVATAR_ICON_MULTIPLE},t))});e.s(["default",0,s])},509476,e=>{"use strict";var t=e.i(271645),r=e.i(681165),i=e.i(843476);function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var n=["size","style"];function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,i)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach(function(t){var i,n,a;i=e,n=t,a=r[t],(n=function(e){var t=function(e,t){if("object"!=o(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var i=r.call(e,t||"default");if("object"!=o(i))return i;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==o(t)?t:String(t)}(n))in i?Object.defineProperty(i,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):i[n]=a}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var s=(0,t.memo)(function(e){var t=e.size,o=void 0===t?"1em":t,a=e.style,s=function(e,t){if(null==e)return{};var r,i,o=function(e,t){if(null==e)return{};var r,i,o={},n=Object.keys(e);for(i=0;i<n.length;i++)r=n[i],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(i=0;i<n.length;i++)r=n[i],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}(e,n);return(0,i.jsxs)("svg",l(l({height:o,style:l({flex:"none",lineHeight:1},a),viewBox:"0 0 24 24",width:o,xmlns:"http://www.w3.org/2000/svg"},s),{},{children:[(0,i.jsx)("title",{children:r.TITLE}),(0,i.jsx)("path",{d:"M11.925 14.781l1.823 1.465s1.395-1.036 2.421-1.188c1.076-.16 2.224.44 3.288 1.155 1.607 1.08 2.959 2.451 2.959 2.451L24 17.11s-4.367-4.732-7.83-4.304c-2.272.281-4.245 1.975-4.245 1.975z",fill:"#FF5D5F"}),(0,i.jsx)("path",{d:"M1.494 5.757L0 7.401s4.164 3.886 7.442 3.886c1.494 0 3.567-1.171 5.35-2.692 1.016-.867 2.152-1.851 3.288-1.851.763 0 1.77.404 2.72 1.466 0 0 .612-.368.986-.632.328-.232.816-.627.816-.627-1.366-1.458-3.342-2.524-4.522-2.419-1.913 0-3.288 1.191-4.992 2.568-1.703 1.377-2.42 1.945-3.646 1.945-2.062 0-5.948-3.288-5.948-3.288zM1.494 18.278L0 16.635s4.164-3.886 7.442-3.886c1.494 0 3.567 1.17 5.35 2.692 1.016.866 2.152 1.851 3.288 1.851.767 0 1.766-.421 2.72-1.494 0 0 .573.353.926.597.363.252.897.667.897.667-1.367 1.47-3.357 2.547-4.543 2.442-1.913 0-3.049-1.014-4.752-2.391-1.704-1.377-2.66-2.122-3.886-2.122-2.062 0-5.948 3.287-5.948 3.287zM20.981 9.461c-.389.269-1.016.658-1.016.658s.359.777.359 1.823c0 1.046-.329 1.943-.329 1.943s.563.351.927.597c.377.256.956.688.956.688s.687-1.435.687-3.228c0-1.793-.687-3.138-.687-3.138s-.54.41-.897.657z",fill:"#4E9CFF"}),(0,i.jsx)("path",{d:"M12.015 9.222l1.733-1.434s1.395 1.003 2.421 1.155c1.076.16 2.224-.44 3.288-1.155 1.607-1.08 2.959-2.451 2.959-2.451L24 6.89s-4.367 4.732-7.83 4.304c-2.272-.28-4.155-1.973-4.155-1.973zM7.83 4.5c2.242 0 4.125 1.913 4.125 1.913s-.524.413-.867.687c-.357.286-.926.747-.926.747S9.176 6.801 7.83 6.801c-.552 0-1.268.332-2.033.987-.59.505-1.203 1.133-1.613 1.912-.356.674-.55 1.468-.568 2.302-.024 1.047.347 2.145.956 3.018.408.586.895 1.027 1.405 1.405.661.491 1.351.837 1.853.837.536 0 1.017-.186 1.375-.358.568-.33 1.016-.718 1.016-.718l1.763 1.465s-.717.717-1.703 1.255c-.638.314-1.456.628-2.451.628-.994 0-2.148-.528-3.228-1.345-.698-.528-1.382-1.154-1.913-1.913-.87-1.244-1.318-2.758-1.315-4.274A7.568 7.568 0 012.75 7.698C4.125 5.905 6.158 4.5 7.83 4.5z",fill:"#FF5D5F"})]}))});e.s(["default",0,s])},994148,e=>{"use strict";var t=e.i(271645),r=e.i(681165),i=e.i(843476);function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var n=["size","style"];function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,i)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach(function(t){var i,n,a;i=e,n=t,a=r[t],(n=function(e){var t=function(e,t){if("object"!=o(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var i=r.call(e,t||"default");if("object"!=o(i))return i;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==o(t)?t:String(t)}(n))in i?Object.defineProperty(i,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):i[n]=a}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var s=(0,t.memo)(function(e){var t=e.size,o=e.style,a=function(e,t){if(null==e)return{};var r,i,o=function(e,t){if(null==e)return{};var r,i,o={},n=Object.keys(e);for(i=0;i<n.length;i++)r=n[i],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(i=0;i<n.length;i++)r=n[i],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}(e,n);return(0,i.jsxs)("svg",l(l({fill:"currentColor",fillRule:"evenodd",height:void 0===t?"1em":t,style:l({flex:"none",lineHeight:1},o),viewBox:"0 0 89 24",xmlns:"http://www.w3.org/2000/svg"},a),{},{children:[(0,i.jsx)("title",{children:r.TITLE}),(0,i.jsx)("path",{d:"M3.469 5.05a.947.947 0 00-.97-.97H1V2h4.753v17.1H3.469V5.05zM11.652 19.286c-2.146 0-3.9-1.48-3.9-3.721 0-2.218 1.546-3.767 4.592-3.767h2.145a.68.68 0 00.692-.693v-.462c0-1.387-1.107-2.103-2.191-2.103-.992 0-1.8.439-2.261 1.456H8.26c.646-2.404 2.492-3.536 4.776-3.536 2.192 0 4.452 1.202 4.452 4.206V19.1h-2.306v-.763c0-.277-.3-.416-.531-.254-.9.647-1.754 1.202-3 1.202zm.323-2.08c1.015 0 1.868-.509 2.837-1.48.254-.253.37-.577.37-.924v-.346a.68.68 0 00-.693-.694h-2.214c-1.5 0-2.215.67-2.215 1.71 0 .971.669 1.734 1.915 1.734zM20.181 19.1V6.738h2.284V7.8c0 .278.346.37.554.162.715-.693 1.708-1.502 3.276-1.502 1.984 0 3.83 1.248 3.83 4.09v8.55H27.84v-8.064c0-1.595-.97-2.473-2.146-2.473-1.13 0-1.892.647-2.699 1.594-.392.486-.53 1.04-.53 1.641v7.303H20.18zM37.783 24c-2.838 0-4.638-1.34-5.168-3.42h2.491c.392.855 1.085 1.386 2.47 1.386 1.844 0 2.998-1.086 2.998-3.559v-.392c0-.278-.23-.416-.508-.185-.76.67-1.73 1.086-2.653 1.086-3.137 0-5.213-2.427-5.213-6.217 0-3.79 2.399-6.239 5.306-6.239.853 0 1.638.231 2.399.809.323.23.67.046.67-.324v-.208h2.283v11.67c0 3.929-2.376 5.593-5.075 5.593zm-.139-7.187c1.038 0 1.8-.462 2.422-1.132.393-.44.508-.74.508-1.433V10.92c0-.693-.115-1.132-.577-1.571-.507-.486-1.222-.81-2.145-.81-1.892 0-3.345 1.572-3.345 4.16 0 2.589 1.338 4.114 3.137 4.114zM46.888 9.534a.72.72 0 00-.715-.717h-1.754v-2.08h1.754a.72.72 0 00.715-.716v-.324C46.888 3.225 48.157 2 50.625 2h1.57v2.08h-1.593c-.946 0-1.43.531-1.43 1.617v.324a.72.72 0 00.715.716h2.307v2.08h-2.307a.72.72 0 00-.715.717V19.1h-2.284V9.534zM57.487 19.378c-1.937 0-3.737-1.248-3.737-4.09v-8.55h2.284v8.11c0 1.595.923 2.427 2.007 2.427 1.177 0 1.938-.647 2.745-1.594.393-.486.531-1.04.531-1.641V6.737h2.284v12.364h-2.284v-1.063c0-.278-.346-.37-.553-.162-.716.693-1.708 1.502-3.277 1.502zM70.544 19.378c-2.1 0-4.291-1.04-4.868-3.559h2.354c.346.948 1.292 1.595 2.422 1.595 1.246 0 2.007-.74 2.007-1.641 0-.878-.6-1.364-1.545-1.64l-1.962-.555c-1.706-.486-2.976-1.595-2.976-3.49 0-2.057 1.915-3.628 4.084-3.628 1.73 0 3.83.786 4.383 3.536h-2.192c-.3-.948-1.084-1.572-2.191-1.572-1.084 0-1.87.67-1.87 1.525 0 .717.44 1.248 1.478 1.549l1.846.531c1.752.509 3.16 1.572 3.16 3.605 0 2.126-1.846 3.744-4.13 3.744zM81.624 19.378c-3.322 0-5.514-2.796-5.514-6.47 0-3.675 2.33-6.448 5.49-6.448 3.438 0 5.238 2.773 5.238 5.939v1.248H79.04c-.323 0-.462.208-.393.74.254 1.733 1.639 2.934 3 2.934 1.015 0 1.892-.508 2.469-1.502h2.422c-.877 2.172-2.7 3.559-4.914 3.559zm2.33-7.65c.37 0 .508-.184.415-.762-.253-1.433-1.315-2.45-2.769-2.45-1.383 0-2.56 1.017-2.93 2.473-.138.532.047.74.37.74h4.914z"})]}))});e.s(["default",0,s])},111220,e=>{"use strict";var t=e.i(271645),r=e.i(5436),i=e.i(681165),o=e.i(509476),n=e.i(106497),a=e.i(994148),l=e.i(843476);function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var c=["type"];function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,i)}return r}var d=(0,t.memo)(function(e){var t=e.type,d=function(e,t){if(null==e)return{};var r,i,o=function(e,t){if(null==e)return{};var r,i,o={},n=Object.keys(e);for(i=0;i<n.length;i++)r=n[i],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(i=0;i<n.length;i++)r=n[i],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}(e,c),p="color"===(void 0===t?"mono":t)?o.default:n.default;return(0,l.jsx)(r.default,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach(function(t){var i,o,n;i=e,o=t,n=r[t],(o=function(e){var t=function(e,t){if("object"!=s(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var i=r.call(e,t||"default");if("object"!=s(i))return i;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==s(t)?t:String(t)}(o))in i?Object.defineProperty(i,o,{value:n,enumerable:!0,configurable:!0,writable:!0}):i[o]=n}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({Icon:p,Text:a.default,"aria-label":i.TITLE,spaceMultiple:i.COMBINE_SPACE_MULTIPLE,textMultiple:i.COMBINE_TEXT_MULTIPLE},d))});e.s(["default",0,d])},384131,e=>{"use strict";var t=e.i(273233),r=e.i(509476),i=e.i(111220),o=e.i(106497),n=e.i(994148),a=e.i(681165),l=o.default;l.Color=r.default,l.Text=n.default,l.Combine=i.default,l.Avatar=t.default,l.colorPrimary=a.COLOR_PRIMARY,l.title=a.TITLE,e.s(["default",0,l])},686190,e=>{"use strict";let t=(0,e.i(456420).default)("chevron-left",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);e.s(["default",0,t])},24071,e=>{"use strict";var t=e.i(686190);e.s(["ChevronLeft",()=>t.default])},815225,e=>{"use strict";var t=e.i(843476),r=e.i(450354),i=e.i(208544),o=e.i(164998),n=e.i(184283),a=e.i(24071),l=e.i(867927),s=e.i(271645);let c=(0,n.createStaticStyles)(({css:e,cssVar:t})=>({button:e`
    position: absolute;
    z-index: 10;
    inset-block-start: 50%;
    transform: translateY(-50%);

    color: ${t.colorTextSecondary};

    opacity: 0;

    transition: opacity ${t.motionDurationMid} ${t.motionEaseInOut};

    &:hover {
      border-color: ${t.colorBorder} !important;
      box-shadow: ${t.boxShadowTertiary} !important;
    }
  `,container:e`
    position: relative;

    &:hover .scroll-button {
      opacity: 1;
    }
  `,leftButton:e`
    inset-inline-start: 0;
  `,rightButton:e`
    inset-inline-end: 0;
  `})),u=(0,s.memo)(({children:e,...u})=>{let d=(0,s.useRef)(null),[p,m]=(0,s.useState)(!1),[h,g]=(0,s.useState)(!0),f=(0,s.useCallback)(()=>{let e=d.current;if(!e)return;let{scrollLeft:t,scrollWidth:r,clientWidth:i}=e;m(t>0),g(t+i<r-1)},[]),b=(0,s.useCallback)(e=>{let t=d.current;if(!t)return;let r=t.clientWidth/1.5,i="left"===e?t.scrollLeft-r:t.scrollLeft+r;t.scrollTo({behavior:"smooth",left:i}),setTimeout(f,300)},[f]);return(0,s.useEffect)(()=>{f()},[]),(0,t.jsxs)(i.Flexbox,{className:c.container,horizontal:!0,width:"100%",...u,children:[p&&(0,t.jsx)(r.Button,{className:(0,n.cx)(c.button,c.leftButton,"scroll-button"),icon:a.ChevronLeft,onClick:()=>b("left"),shape:"circle",type:"default"}),(0,t.jsx)(o.ScrollShadow,{hideScrollBar:!0,offset:16,onScroll:f,onScrollCapture:f,orientation:"horizontal",ref:d,size:16,children:(0,t.jsx)(i.Flexbox,{gap:12,horizontal:!0,children:e})}),h&&(0,t.jsx)(r.Button,{className:(0,n.cx)(c.button,c.rightButton,"scroll-button"),icon:l.ChevronRight,onClick:()=>b("right"),shape:"circle",type:"default"})]})});e.s(["default",0,u])},574988,e=>{"use strict";var t,r=e.i(843476),i=e.i(642623),o=e.i(398777),n=e.i(770703),a=e.i(271645);e.i(785269);var l=e.i(322831),s=e.i(523357),c=e.i(889515),u=e.i(813097),d=e.i(585230),p=e.i(184283),m=e.i(639007);let h=(0,p.createStaticStyles)(({css:e,cssVar:t})=>({container:e`
    pointer-events: none;

    position: absolute;
    inset: 0;

    width: 100%;
    height: 110vh;

    background: ${t.colorBgContainer};
  `,dark:e`
    height: 140vh;
    opacity: 0.75;
  `,gradient:e`
    position: absolute;
    inset: 0;

    width: 100%;
    height: 100%;

    background: radial-gradient(
      ellipse 80% 50% at 50% 0%,
      ${t.colorPrimary}15,
      transparent 70%
    );
  `,gradientDark:e`
    background: radial-gradient(
      ellipse 80% 50% at 50% 0%,
      ${t.colorPrimary}25,
      transparent 70%
    );
  `,light:e`
    transform: scale(1.2);
    opacity: 0.75;
  `})),g=(0,a.memo)(()=>{let{isDarkMode:e}=(0,m.useThemeMode)();return(0,r.jsx)(d.MaskShadow,{className:(0,p.cx)(h.container,e?h.dark:h.light),size:50,children:(0,r.jsx)("div",{className:(0,p.cx)(h.gradient,e&&h.gradientDark),style:{height:"100%"}})})});g.displayName="BackgroundFallback";var f=e.i(123243),b=e.i(806928),b=b,b=b,v=Object.defineProperty,y=new Map,x=new WeakMap;a.Component,null!=(null!=(t="useInsertionEffect"in a?a.useInsertionEffect:void 0)?t:a.useLayoutEffect)||a.useEffect;let w={hidden:{opacity:0,rotateX:-60,rotateY:-20,rotateZ:-10,x:"-20%",y:"80%"},visible:{opacity:1,rotateX:0,rotateY:0,rotateZ:0,x:"0%",y:"0%"}},j=(0,a.memo)(({delay:e=0,onAnimationComplete:t,children:o,className:n,style:l})=>{let[s,c]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{setTimeout(()=>{c(!0)},1e3*e)},[]),(0,r.jsx)(i.div,{animate:s?"visible":"hidden",className:n,initial:"hidden",onAnimationComplete:t,style:l,transition:{staggerChildren:.03},children:o.split("").map((e,t)=>(0,r.jsx)(b.MotionSpan,{style:{display:"inline-block"},transition:{duration:.8,ease:"easeOut"},variants:w,children:" "===e?(0,r.jsx)(r.Fragment,{children:" "}):e},t))})}),k=(0,p.createStaticStyles)(({css:e})=>({container:e`
      ${p.responsive.sm} {
        gap: 0.5em;
        margin-block: 0.5em;
      }
    `,large:e`
      display: flex;

      @media (max-width: 1280px) {
        display: none;
      }
    `,slogan:e`
      font-size: min(9vw, ${72}px);
      font-weight: 900;
      font-style: italic;
      line-height: 1;
      text-align: center;
      letter-spacing: -0.06em;
    `,small:e`
      display: none;

      @media (max-width: 1280px) {
        display: flex;
      }
    `})),S=(0,a.memo)(()=>(0,r.jsxs)(f.Center,{as:"h1",className:k.container,dir:"ltr",children:[(0,r.jsxs)(f.Center,{className:k.small,children:[(0,r.jsx)(j,{className:k.slogan,children:"Agent teammates that"}),(0,r.jsx)(j,{className:k.slogan,children:"grow with you"})]}),(0,r.jsx)(j,{className:(0,p.cx)(k.slogan,k.large),children:"Agent teammates that grow with you"})]})),C=(0,p.createStaticStyles)(({css:e})=>({button:e`
    padding-inline: 24px !important;
  `,buttonGroup:e`
    transition: all 0.5s ease-in-out;
  `,container:e`
    transition: opacity 2s ease-in-out;
  `,floatLogo:e`
    position: absolute !important;
    inset: 0;
  `,group:e`
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;

    ${p.responsive.sm} {
      gap: 8px;
    }
  `,logo:e`
    pointer-events: none;
    z-index: 2;
    ${p.responsive.sm} {
      margin-block-end: -24px;
    }
  `,subSlogan:e`
    width: 80%;
    max-width: 1024px;
    margin-block: 16px;

    font-size: 20px;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    text-wrap: balance;

    ${p.responsive.sm} {
      width: 100%;
      min-height: 24px;
      margin-block: 0.5em 1em;
      font-size: 16px;
    }
  `})),T=(0,n.default)(()=>e.A(746632),{loadableGenerated:{modules:[18474]},loading:()=>(0,r.jsx)(g,{}),ssr:!1}),$={hidden:{filter:"blur(16px)",opacity:0,y:80},visible:{filter:"blur(0px)",opacity:1,y:0}},O=(0,a.memo)(({id:e,mobile:t,post:n})=>{let{t:a}=(0,l.useTranslation)("landing"),d=!t&&n&&(0,r.jsx)("div",{style:{height:48}});return(0,r.jsxs)(s.default,{align:"center",backgroundRender:(0,r.jsx)(T,{mobile:t}),gap:24,id:e,justify:"center",style:{paddingBottom:64,paddingTop:160},children:[(0,r.jsxs)(i.div,{animate:"visible",className:C.group,initial:"hidden",style:{width:"100%"},transition:{staggerChildren:.4},children:[(0,r.jsx)(i.div,{transition:{duration:.8,ease:"easeOut"},variants:$,children:(0,r.jsx)(S,{})}),(0,r.jsx)(o.p,{className:C.subSlogan,id:"hero-speakable",transition:{duration:.8,ease:"easeOut"},variants:$,children:a("hero.slogan",{name:"LobeHub"})}),(0,r.jsx)(i.div,{style:{width:"100%"},transition:{duration:.8,ease:"easeOut"},variants:$,children:(0,r.jsx)(u.default,{cloudCtaUtm:c.HOME_LANDING_HERO_CLOUD_CTA,mobile:t})})]}),d]})});e.s(["default",0,O,"defaultAnimations",0,$],574988)},81613,e=>{"use strict";var t=e.i(843476),r=e.i(208544),i=e.i(271645);e.i(785269);var o=e.i(322831),n=e.i(523357),a=e.i(486642),l=e.i(389591),s=e.i(943243),c=e.i(650246),u=e.i(184283),d=e.i(639007),p=e.i(57095),m=e.i(859634),h=e.i(892766);let g=(0,u.createStaticStyles)(({cx:e,css:t,cssVar:r})=>({button:e("play-button",t`
      position: absolute;

      border-radius: 16px !important;

      color: ${r.colorBgLayout};

      background: ${r.colorText} !important;

      transition: opacity 0.15s ease-in-out;
    `),preview:t`
    cursor: pointer;

    position: relative;

    overflow: hidden;

    border-color: ${r.colorFill};
    border-radius: 16px;

    box-shadow:
      0 20px 50px #00000014,
      0 6px 16px #0000000a;

    .play-button {
      opacity: 0;
    }

    ${u.responsive.sm} {
      border-radius: 8px;
    }

    &:hover {
      .play-button {
        opacity: 1;
      }
    }
  `})),f=(0,i.memo)(()=>{let{isDarkMode:e}=(0,d.useThemeMode)(),[r,o]=(0,i.useState)(!1);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(s.Block,{align:"center",className:g.preview,clickable:!0,justify:"center",onClick:()=>o(!0),shadow:!0,variant:"outlined",width:"100%",children:[(0,t.jsx)(l.ActionIcon,{className:g.button,icon:p.PlayIcon,size:32,variant:"filled"}),(0,t.jsx)("img",{alt:"LobeHub Overview",loading:"lazy",src:(0,m.getAssets)("overviewCover",e),style:{aspectRatio:(0,m.getRatio)("overviewCover"),width:"100%"}})]}),(0,t.jsx)(c.Modal,{centered:!0,destroyOnHidden:!0,footer:!1,onCancel:()=>o(!1),open:r,paddings:{desktop:0,mobile:0},styles:{container:{aspectRatio:1920/1080}},title:!1,width:"min(90vw, 1440px)",children:(0,t.jsx)("video",{autoPlay:!0,controls:!0,poster:(0,h.getR2Url)("/video/lobehub.webp"),src:(0,h.getR2Url)("/video/lobehub.webm"),style:{aspectRatio:1920/1080},width:"100%"})})]})});var b=e.i(347782),v=e.i(815225),y=e.i(834101),x=e.i(128709),w=e.i(411541);let j=(0,i.memo)(({title:e,desc:r})=>(0,t.jsxs)(s.Block,{clickable:!0,flex:"none",gap:8,height:172,padding:16,style:{borderRadius:u.cssVar.borderRadiusLG,overflow:"hidden"},variant:"outlined",width:240,children:[(0,t.jsx)(x.Text,{ellipsis:{rows:2},style:{fontSize:16,lineHeight:1.4},weight:500,children:e}),(0,t.jsxs)(x.Text,{ellipsis:{rows:4},fontSize:14,style:{lineHeight:1.5},type:"secondary",children:[r,(0,t.jsx)(y.Icon,{color:u.cssVar.colorTextQuaternary,icon:w.SquareArrowOutUpRight,size:14,style:{marginLeft:6}})]})]}));var k=e.i(889515);let S=(0,i.memo)(()=>{let e=(()=>{let{t:e}=(0,o.useTranslation)("landing");return(0,i.useMemo)(()=>[{desc:"Anyone can build and team up with agent teammates into a group to deliver work end to end.",id:"1",title:"Job Application Agent Group",url:(0,h.urlWithUTM)("https://app.lobehub.com/share/t/jiXUiw9s",{utmContent:"use_case_1",utmMedium:k.UTM_MEDIUM.homeOverview,utmTerm:"jiXUiw9s"})},{desc:"Summarize 299 transcripts",id:"2",title:"Lenny's Podcast Product Building Insights",url:(0,h.urlWithUTM)("https://app.lobehub.com/share/t/U9qYluq2",{utmContent:"use_case_2",utmMedium:k.UTM_MEDIUM.homeOverview,utmTerm:"U9qYluq2"})},{desc:"Understanding videos without subtitles and summarize transcripts",id:"3",title:"Understanding Videos",url:(0,h.urlWithUTM)("https://app.lobehub.com/share/t/U9qYluq2",{utmContent:"use_case_3",utmMedium:k.UTM_MEDIUM.homeOverview,utmTerm:"U9qYluq2"})},{desc:"generate a visual narrative academic comic for the DeepSeek-OCR 2 research paper",id:"4",title:"DeepSeek-OCR 2 Comic Storyboard",url:(0,h.urlWithUTM)("https://app.lobehub.com/share/t/7jcf3pjL",{utmContent:"use_case_4",utmMedium:k.UTM_MEDIUM.homeOverview,utmTerm:"7jcf3pjL"})},{desc:"An agent group for stock trading that collaborates to analyze market signals, draft strategies, and surface key risks for better decision-making.",id:"5",title:"Stock Trading Team",url:(0,h.urlWithUTM)("https://app.lobehub.com/share/t/hN8F3d3M",{utmContent:"use_case_5",utmMedium:k.UTM_MEDIUM.homeOverview,utmTerm:"hN8F3d3M"})},{desc:"An agent group that reads papers and produces structured summaries with core ideas, methods, and key takeaways for faster literature review.",id:"6",title:"Paper Summary Generation",url:(0,h.urlWithUTM)("https://app.lobehub.com/share/t/UWMNjIRG",{utmContent:"use_case_6",utmMedium:k.UTM_MEDIUM.homeOverview,utmTerm:"UWMNjIRG"})},{desc:"Converts meeting notes or transcripts into a clear recap with key decisions, action items, and owners for easy follow-up.",id:"7",title:"Meeting Summary",url:(0,h.urlWithUTM)("https://app.lobehub.com/share/t/kvp57cet",{utmContent:"use_case_7",utmMedium:k.UTM_MEDIUM.homeOverview,utmTerm:"kvp57cet"})}],[e])})();return(0,t.jsx)(v.default,{children:e.map(e=>(0,t.jsx)(b.default,{href:e.url,style:{color:"inherit",textDecoration:"none"},target:"_blank",children:(0,t.jsx)(j,{...e})},e.id))})}),C=(0,i.memo)(({id:e,mobile:i})=>{let{t:l}=(0,o.useTranslation)("landing");return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.default,{align:"center",gap:i?44:88,id:e,justify:"center",maxWidth:1500,style:{paddingBottom:i?48:96},children:(0,t.jsx)(f,{})}),(0,t.jsx)(n.default,{align:"center",gap:i?44:88,id:e,justify:"center",style:{paddingBottom:i?48:96},children:(0,t.jsxs)(r.Flexbox,{gap:16,width:"100%",children:[(0,t.jsx)(a.default,{align:"center",as:"h3",children:l("overview.usecase")}),(0,t.jsx)(S,{})]})})]})});e.s(["default",0,C],81613)},818744,e=>{"use strict";var t=e.i(843476),r=e.i(271645),i=e.i(389591),o=e.i(208544),n=e.i(581461),n=n,a=e.i(184283),l=e.i(217611),l=l,s=e.i(834101);let c=(0,a.createStaticStyles)(({css:e,cssVar:t})=>({baseBlock:e`
    position: absolute;

    width: calc(var(--icon-size, 24px) / 3);
    height: calc(var(--icon-size, 24px) / 3);
    border: 1px solid ${t.colorText};

    opacity: 0.25;
  `,container:e`
    position: relative;
    padding: calc(var(--icon-size, 24px) / 8);
  `,leftBottom:e`
    inset-block-end: 0;
    inset-inline-start: 0;

    border-block-start: none;
    border-inline-end: none;
    border-end-start-radius: ${t.borderRadiusLG};
  `,rightTop:e`
    inset-block-start: 0;
    inset-inline-end: 0;

    border-block-end: none;
    border-inline-start: none;
    border-start-end-radius: ${t.borderRadiusLG};
  `})),u=(0,r.memo)(({style:e,className:i,iconClassName:n,iconStyle:l,icon:u,size:d=24})=>{let p=(0,r.useMemo)(()=>({"--icon-size":`${d}px`}),[d]);return(0,t.jsxs)(o.Flexbox,{align:"center",className:(0,a.cx)(c.container,i),flex:"none",justify:"center",style:{...p,...e},children:[(0,t.jsx)("div",{className:(0,a.cx)(c.baseBlock,c.rightTop)}),(0,t.jsx)("div",{className:(0,a.cx)(c.baseBlock,c.leftBottom)}),(0,t.jsx)("div",{}),(0,t.jsx)(s.Icon,{className:n,icon:u,size:d,style:l})]})});var d=e.i(113987),p=e.i(990325);let m=(0,a.createStaticStyles)(({css:e})=>({container:e`
    position: fixed;
    inset-block-start: 0;
    inset-inline-end: 24px;
    height: 100%;
  `})),h=(0,r.memo)(({items:e,defaultActive:s,className:c})=>{let{scrollTo:h,active:g}=(({items:e,bounds:t=24,defaultActive:i})=>{let[o,n]=(0,r.useState)(i);return(0,d.useScroll)(()=>{let r;for(let i of e){let e=document.getElementById(i);if(!e)continue;let o=e.getBoundingClientRect();if(o.top+t>=0&&o.top+t<=window.innerHeight/2){r=i;break}}r&&n(r)}),{active:o,scrollTo:p.scrollTo}})({defaultActive:s,items:e.map(e=>e.id)});return(0,t.jsx)(n.default,{positionerProps:{positionMethod:"fixed"},children:(0,t.jsx)(o.Flexbox,{align:"flex-end",className:(0,a.cx)(m.container,c),justify:"center",children:(0,t.jsx)(o.Flexbox,{align:"flex-end",gap:4,children:e.map(({id:e,label:r})=>{let n=g===e;return(0,t.jsx)(o.Flexbox,{align:"flex-end",gap:4,onClick:()=>h(e),children:n?(0,t.jsx)(u,{icon:l.default}):(0,t.jsx)(i.ActionIcon,{icon:l.default,size:{blockSize:30,borderRadius:8,size:24},title:r,tooltipProps:{placement:"left"}})},e)})})})})}),g=(0,a.createStaticStyles)(({css:e})=>({container:e`
    @media (max-width: 1599px) {
      display: none;
    }
  `}));var f=e.i(613518);e.i(785269);var b=e.i(322831);let v=(0,r.memo)(()=>{let e=(()=>{let{t:e}=(0,b.useTranslation)("landing");return[{id:f.AnchorType.Hero,label:e("anchor.hero")},{id:f.AnchorType.Overview,label:e("anchor.overview")},{id:f.AnchorType.Create,label:e("anchor.create")},{id:f.AnchorType.Collaborate,label:e("anchor.collaborate")},{id:f.AnchorType.Evolve,label:e("anchor.evolve")},{id:f.AnchorType.Community,label:e("anchor.community")},{id:f.AnchorType.FAQ,label:"FAQ"}]})();return(0,t.jsx)(h,{className:g.container,defaultActive:f.AnchorType.Hero,items:e})});e.s(["default",0,v],818744)},290571,e=>{"use strict";var t=function(){return(t=Object.assign||function(e){for(var t,r=1,i=arguments.length;r<i;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};"function"==typeof SuppressedError&&SuppressedError,e.s(["__assign",()=>t,"__read",0,function(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var i,o,n=r.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(i=n.next()).done;)a.push(i.value)}catch(e){o={error:e}}finally{try{i&&!i.done&&(r=n.return)&&r.call(n)}finally{if(o)throw o.error}}return a},"__rest",0,function(e,t){var r={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&0>t.indexOf(i)&&(r[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,i=Object.getOwnPropertySymbols(e);o<i.length;o++)0>t.indexOf(i[o])&&Object.prototype.propertyIsEnumerable.call(e,i[o])&&(r[i[o]]=e[i[o]]);return r},"__values",0,function(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],i=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&i>=e.length&&(e=void 0),{value:e&&e[i++],done:!e}}};throw TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}])},223778,266457,31097,e=>{"use strict";var t=function(e){return"function"==typeof e};e.s(["isFunction",0,t,"isUndef",0,function(e){return void 0===e}],266457);var r=!!("u">typeof window&&window.document&&window.document.createElement);e.s(["default",0,r],31097),e.s(["getTargetElement",0,function(e,i){if(r)return e?t(e)?e():"current"in e?e.current:e:i}],223778)},350629,e=>{"use strict";var t=e.i(271645);e.s(["default",0,function(e){var r=(0,t.useRef)(e);return r.current=e,r}])},196928,100424,e=>{"use strict";var t,r=e.i(271645),i=e.i(350629);e.i(266457),e.i(247167),e.s(["default",0,!1],100424);let o=function(e){var t=(0,i.default)(e);(0,r.useEffect)(function(){return function(){t.current()}},[])},n=function(e,t){if(e===t)return!0;for(var r=0;r<e.length;r++)if(!Object.is(e[r],t[r]))return!1;return!0};var a=e.i(223778),l=(t=r.useEffect,function(e,i,l){var s=(0,r.useRef)(!1),c=(0,r.useRef)([]),u=(0,r.useRef)([]),d=(0,r.useRef)(void 0);t(function(){var t,r=(Array.isArray(l)?l:[l]).map(function(e){return(0,a.getTargetElement)(e)});if(!s.current){s.current=!0,c.current=r,u.current=i,d.current=e();return}r.length===c.current.length&&n(c.current,r)&&n(u.current,i)||(null==(t=d.current)||t.call(d),c.current=r,u.current=i,d.current=e())}),o(function(){var e;null==(e=d.current)||e.call(d),s.current=!1})});e.s(["default",0,l],196928)},523679,e=>{"use strict";var t=e.i(843476),r=e.i(184283),i=e.i(271645);let o=(0,r.createStaticStyles)(({css:e,cssVar:t})=>({tag:e`
    align-self: flex-start;

    margin: 0;
    padding-block: 6px;
    padding-inline: 16px;
    border-radius: 32px;

    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
    color: color-mix(in srgb, var(--tag-color) 33%, ${t.colorText});

    background: ${t.colorFillSecondary};
    background: color-mix(in srgb, var(--tag-color) 25%, transparent);
    filter: saturate(150%);
  `})),n=(0,i.memo)(({color:e,children:r})=>(0,t.jsx)("h2",{className:o.tag,style:{"--tag-color":e},children:r}));e.s(["default",0,n])},712378,(e,t,r)=>{!function(){"use strict";if("object"==typeof window){if("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype){"isIntersecting"in window.IntersectionObserverEntry.prototype||Object.defineProperty(window.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return this.intersectionRatio>0}});return}var e=function(e){for(var t=e,r=o(t);r;)r=o(t=r.ownerDocument);return t}(window.document),t=[],r=null,i=null;a.prototype.THROTTLE_TIMEOUT=100,a.prototype.POLL_INTERVAL=null,a.prototype.USE_MUTATION_OBSERVER=!0,a._setupCrossOriginUpdater=function(){return r||(r=function(e,r){i=e&&r?p(e,r):u(),t.forEach(function(e){e._checkForIntersections()})}),r},a._resetCrossOriginUpdater=function(){r=null,i=null},a.prototype.observe=function(e){if(!this._observationTargets.some(function(t){return t.element==e})){if(!(e&&1==e.nodeType))throw Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:e,entry:null}),this._monitorIntersections(e.ownerDocument),this._checkForIntersections()}},a.prototype.unobserve=function(e){this._observationTargets=this._observationTargets.filter(function(t){return t.element!=e}),this._unmonitorIntersections(e.ownerDocument),0==this._observationTargets.length&&this._unregisterInstance()},a.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorAllIntersections(),this._unregisterInstance()},a.prototype.takeRecords=function(){var e=this._queuedEntries.slice();return this._queuedEntries=[],e},a.prototype._initThresholds=function(e){var t=e||[0];return Array.isArray(t)||(t=[t]),t.sort().filter(function(e,t,r){if("number"!=typeof e||isNaN(e)||e<0||e>1)throw Error("threshold must be a number between 0 and 1 inclusively");return e!==r[t-1]})},a.prototype._parseRootMargin=function(e){var t=(e||"0px").split(/\s+/).map(function(e){var t=/^(-?\d*\.?\d+)(px|%)$/.exec(e);if(!t)throw Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(t[1]),unit:t[2]}});return t[1]=t[1]||t[0],t[2]=t[2]||t[0],t[3]=t[3]||t[1],t},a.prototype._monitorIntersections=function(t){var r=t.defaultView;if(r&&-1==this._monitoringDocuments.indexOf(t)){var i=this._checkForIntersections,n=null,a=null;if(this.POLL_INTERVAL?n=r.setInterval(i,this.POLL_INTERVAL):(l(r,"resize",i,!0),l(t,"scroll",i,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in r&&(a=new r.MutationObserver(i)).observe(t,{attributes:!0,childList:!0,characterData:!0,subtree:!0})),this._monitoringDocuments.push(t),this._monitoringUnsubscribes.push(function(){var e=t.defaultView;e&&(n&&e.clearInterval(n),s(e,"resize",i,!0)),s(t,"scroll",i,!0),a&&a.disconnect()}),t!=(this.root&&(this.root.ownerDocument||this.root)||e)){var c=o(t);c&&this._monitorIntersections(c.ownerDocument)}}},a.prototype._unmonitorIntersections=function(t){var r=this._monitoringDocuments.indexOf(t);if(-1!=r){var i=this.root&&(this.root.ownerDocument||this.root)||e;if(!this._observationTargets.some(function(e){var r=e.element.ownerDocument;if(r==t)return!0;for(;r&&r!=i;){var n=o(r);if((r=n&&n.ownerDocument)==t)return!0}return!1})){var n=this._monitoringUnsubscribes[r];if(this._monitoringDocuments.splice(r,1),this._monitoringUnsubscribes.splice(r,1),n(),t!=i){var a=o(t);a&&this._unmonitorIntersections(a.ownerDocument)}}}},a.prototype._unmonitorAllIntersections=function(){var e=this._monitoringUnsubscribes.slice(0);this._monitoringDocuments.length=0,this._monitoringUnsubscribes.length=0;for(var t=0;t<e.length;t++)e[t]()},a.prototype._checkForIntersections=function(){if(this.root||!r||i){var e=this._rootIsInDom(),t=e?this._getRootRect():u();this._observationTargets.forEach(function(i){var o=i.element,a=c(o),l=this._rootContainsTarget(o),s=i.entry,d=e&&l&&this._computeTargetAndRootIntersection(o,a,t),p=null;this._rootContainsTarget(o)?(!r||this.root)&&(p=t):p=u();var m=i.entry=new n({time:window.performance&&performance.now&&performance.now(),target:o,boundingClientRect:a,rootBounds:p,intersectionRect:d});s?e&&l?this._hasCrossedThreshold(s,m)&&this._queuedEntries.push(m):s&&s.isIntersecting&&this._queuedEntries.push(m):this._queuedEntries.push(m)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)}},a.prototype._computeTargetAndRootIntersection=function(t,o,n){if("none"!=window.getComputedStyle(t).display){for(var a=o,l=h(t),s=!1;!s&&l;){var u=null,d=1==l.nodeType?window.getComputedStyle(l):{};if("none"==d.display)return null;if(l==this.root||9==l.nodeType)if(s=!0,l==this.root||l==e)r&&!this.root?i&&(0!=i.width||0!=i.height)?u=i:(l=null,u=null,a=null):u=n;else{var m=h(l),g=m&&c(m),f=m&&this._computeTargetAndRootIntersection(m,g,n);g&&f?(l=m,u=p(g,f)):(l=null,a=null)}else{var b=l.ownerDocument;l!=b.body&&l!=b.documentElement&&"visible"!=d.overflow&&(u=c(l))}if(u&&(a=function(e,t){var r=Math.max(e.top,t.top),i=Math.min(e.bottom,t.bottom),o=Math.max(e.left,t.left),n=Math.min(e.right,t.right),a=n-o,l=i-r;return a>=0&&l>=0&&{top:r,bottom:i,left:o,right:n,width:a,height:l}||null}(u,a)),!a)break;l=l&&h(l)}return a}},a.prototype._getRootRect=function(){var t;if(this.root&&!g(this.root))t=c(this.root);else{var r=g(this.root)?this.root:e,i=r.documentElement,o=r.body;t={top:0,left:0,right:i.clientWidth||o.clientWidth,width:i.clientWidth||o.clientWidth,bottom:i.clientHeight||o.clientHeight,height:i.clientHeight||o.clientHeight}}return this._expandRectByRootMargin(t)},a.prototype._expandRectByRootMargin=function(e){var t=this._rootMarginValues.map(function(t,r){return"px"==t.unit?t.value:t.value*(r%2?e.width:e.height)/100}),r={top:e.top-t[0],right:e.right+t[1],bottom:e.bottom+t[2],left:e.left-t[3]};return r.width=r.right-r.left,r.height=r.bottom-r.top,r},a.prototype._hasCrossedThreshold=function(e,t){var r=e&&e.isIntersecting?e.intersectionRatio||0:-1,i=t.isIntersecting?t.intersectionRatio||0:-1;if(r!==i)for(var o=0;o<this.thresholds.length;o++){var n=this.thresholds[o];if(n==r||n==i||n<r!=n<i)return!0}},a.prototype._rootIsInDom=function(){return!this.root||m(e,this.root)},a.prototype._rootContainsTarget=function(t){var r=this.root&&(this.root.ownerDocument||this.root)||e;return m(r,t)&&(!this.root||r==t.ownerDocument)},a.prototype._registerInstance=function(){0>t.indexOf(this)&&t.push(this)},a.prototype._unregisterInstance=function(){var e=t.indexOf(this);-1!=e&&t.splice(e,1)},window.IntersectionObserver=a,window.IntersectionObserverEntry=n}function o(e){try{return e.defaultView&&e.defaultView.frameElement||null}catch(e){return null}}function n(e){this.time=e.time,this.target=e.target,this.rootBounds=d(e.rootBounds),this.boundingClientRect=d(e.boundingClientRect),this.intersectionRect=d(e.intersectionRect||u()),this.isIntersecting=!!e.intersectionRect;var t=this.boundingClientRect,r=t.width*t.height,i=this.intersectionRect,o=i.width*i.height;r?this.intersectionRatio=Number((o/r).toFixed(4)):this.intersectionRatio=+!!this.isIntersecting}function a(e,t){var r,i,o,n=t||{};if("function"!=typeof e)throw Error("callback must be a function");if(n.root&&1!=n.root.nodeType&&9!=n.root.nodeType)throw Error("root must be a Document or Element");this._checkForIntersections=(r=this._checkForIntersections.bind(this),i=this.THROTTLE_TIMEOUT,o=null,function(){o||(o=setTimeout(function(){r(),o=null},i))}),this._callback=e,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(n.rootMargin),this.thresholds=this._initThresholds(n.threshold),this.root=n.root||null,this.rootMargin=this._rootMarginValues.map(function(e){return e.value+e.unit}).join(" "),this._monitoringDocuments=[],this._monitoringUnsubscribes=[]}function l(e,t,r,i){"function"==typeof e.addEventListener?e.addEventListener(t,r,i||!1):"function"==typeof e.attachEvent&&e.attachEvent("on"+t,r)}function s(e,t,r,i){"function"==typeof e.removeEventListener?e.removeEventListener(t,r,i||!1):"function"==typeof e.detachEvent&&e.detachEvent("on"+t,r)}function c(e){var t;try{t=e.getBoundingClientRect()}catch(e){}return t?(t.width&&t.height||(t={top:t.top,right:t.right,bottom:t.bottom,left:t.left,width:t.right-t.left,height:t.bottom-t.top}),t):u()}function u(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}function d(e){return!e||"x"in e?e:{top:e.top,y:e.top,bottom:e.bottom,left:e.left,x:e.left,right:e.right,width:e.width,height:e.height}}function p(e,t){var r=t.top-e.top,i=t.left-e.left;return{top:r,left:i,height:t.height,width:t.width,bottom:r+t.height,right:i+t.width}}function m(e,t){for(var r=t;r;){if(r==e)return!0;r=h(r)}return!1}function h(t){var r=t.parentNode;return 9==t.nodeType&&t!=e?o(t):(r&&r.assignedSlot&&(r=r.assignedSlot.parentNode),r&&11==r.nodeType&&r.host)?r.host:r}function g(e){return e&&9===e.nodeType}}()},132829,125017,e=>{"use strict";var t=e.i(843476),r=e.i(943243),i=e.i(208544),o=e.i(184283),n=e.i(639007),a=e.i(271645),l=e.i(859634);let s=(0,o.createStaticStyles)(({css:e})=>({container:e`
    position: relative;

    overflow: hidden;
    grid-column: span 2;

    width: 100%;
    min-width: min(100%, 560px);
    padding-block-start: 24px;
    padding-inline-start: 24px;

    background-size: cover;
  `,inner:e`
    overflow: hidden;

    width: 100%;
    border-block-end: none;
    border-inline-end: none;
    border-start-end-radius: 0;
    border-end-start-radius: 0;

    box-shadow: 0 8px 24px -12px rgba(0, 0, 0, 40%);
  `})),c=(0,a.memo)(({backgroundKey:e,posterKey:o,ratioKey:a,videoKey:c,videoRef:u})=>{let{isDarkMode:d}=(0,n.useThemeMode)(),p=(0,l.getAssets)(e,d);return(0,t.jsx)(i.Flexbox,{align:"flex-end",className:s.container,flex:2,justify:"flex-end",style:{backgroundImage:p.startsWith("linear")?p:`url(${p})`},children:(0,t.jsx)(r.Block,{className:s.inner,style:{aspectRatio:(0,l.getRatio)(a)},variant:"outlined",children:(0,t.jsx)("video",{loop:!0,muted:!0,playsInline:!0,poster:(0,l.getAssets)(o,d),preload:"metadata",ref:u,src:(0,l.getVideoAssets)(c,d),width:"100%"})})})});e.s(["default",0,c],132829);var u=e.i(290571);e.i(712378);var d=e.i(223778),p=e.i(196928);let m=function(e,t){var r=t||{},i=r.callback,o=(0,u.__rest)(r,["callback"]),n=(0,u.__read)((0,a.useState)(),2),l=n[0],s=n[1],c=(0,u.__read)((0,a.useState)(),2),m=c[0],h=c[1];return(0,p.default)(function(){var r=(Array.isArray(e)?e:[e]).map(function(e){return(0,d.getTargetElement)(e)}).filter(Boolean);if(r.length){var n=new IntersectionObserver(function(e){var t,r;try{for(var o=(0,u.__values)(e),n=o.next();!n.done;n=o.next()){var a=n.value;h(a.intersectionRatio),s(a.isIntersecting),null==i||i(a)}}catch(e){t={error:e}}finally{try{n&&!n.done&&(r=o.return)&&r.call(o)}finally{if(t)throw t.error}}},(0,u.__assign)((0,u.__assign)({},o),{root:(0,d.getTargetElement)(null==t?void 0:t.root)}));return r.forEach(function(e){return n.observe(e)}),function(){n.disconnect()}}},[null==t?void 0:t.rootMargin,null==t?void 0:t.threshold,i],e),[l,m]};e.s(["useVideoCollapseSync",0,({markers:e,defaultActiveKey:t="1"})=>{let r=(0,a.useRef)(null),[i]=m(r),o=(0,a.useRef)(null),[n,l]=(0,a.useState)([t]),s=(0,a.useRef)(t),c=(0,a.useCallback)(e=>{if(!e)return;let t=e.play();t?.catch&&t.catch(()=>{})},[]),u=(0,a.useCallback)(r=>{if(0===e.length)return t;let i=0;for(let[t,o]of e.entries())if(r>=o)i=t;else break;return String(i+1)},[t,e]);return(0,a.useEffect)(()=>{s.current=n[0]??t},[n,t]),(0,a.useEffect)(()=>{let e=o.current;e&&(i?c(e):e.pause())},[i,c]),(0,a.useEffect)(()=>{let e=o.current;if(!e)return;let t=()=>{let t=u(e.currentTime);s.current!==t&&l([t])};return e.addEventListener("timeupdate",t),()=>e.removeEventListener("timeupdate",t)},[u]),(0,a.useEffect)(()=>{let r=o.current;r&&0!==e.length&&(r.currentTime=e[0],l([t]),i&&c(r))},[t,i,e,c]),{activeKeys:n,containerRef:r,onCollapseChange:(0,a.useCallback)(t=>{let r=Array.isArray(t)?t:[String(t)];l(r);let i=e[Math.max(0,Number.parseInt(r[0],10)-1)];o.current&&Number.isFinite(i)&&(o.current.currentTime=i)},[e]),setActiveKeys:l,videoRef:o}}],125017)},636644,e=>{"use strict";var t=e.i(843476),r=e.i(184283),i=e.i(271645),o=e.i(520469),n=e.i(523357);let a=(0,i.memo)(({id:e,mobile:i})=>(0,t.jsx)(n.default,{align:"center",id:e,justify:"center",outerStyle:{background:`linear-gradient(to bottom, ${r.cssVar.colorBgLayout} 0%, ${r.cssVar.colorBgContainer} 100%)`},style:{marginTop:i?120:160},children:(0,t.jsx)(o.default,{mobile:i})}));e.s(["default",0,a])},623427,e=>{"use strict";var t=e.i(843476),r=e.i(184283),i=e.i(271645),o=e.i(523357),n=e.i(943243),a=e.i(123243),l=e.i(208544),s=e.i(128709),c=e.i(770703);e.i(785269);var u=e.i(322831),d=e.i(813097),p=e.i(347782),m=e.i(748619),h=e.i(486642),g=e.i(892766),f=e.i(889515);let b=(0,r.createStaticStyles)(({css:e,cssVar:t})=>({background:e`
    position: absolute;
    inset: 0;

    overflow: hidden;

    width: 100%;
    height: 100%;
  `,button:e`
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;

    height: 36px;
    border-radius: ${t.borderRadius};

    font-weight: 500;
    ${r.responsive.sm} {
      width: 36px;
    }
  `,container:e`
    position: relative;

    overflow: hidden;

    width: 100%;
    margin-block-end: 24px;
    padding-block: 88px 48px;
    padding-inline: 48px;
    border-radius: calc(${t.borderRadiusLG} * 2);

    box-shadow: 0 0 48px -16px rgba(0, 0, 0, 8%);
  `,desc:e`
    font-size: 14px;
    line-height: 1.5;
    color: color-mix(in srgb, ${t.colorText} 60%, transparent);
  `,modalDesc:e`
    font-size: 14px;
    line-height: 1.5;
    text-align: center;
  `,outter:e`
    position: relative;
    width: 100%;
  `})),v=(0,c.default)(()=>e.A(602960).then(e=>e.LogoThree),{loadableGenerated:{modules:[567574]},loading:()=>(0,t.jsx)("div",{style:{height:200,marginBottom:-10,marginTop:-120,width:200}}),ssr:!1}),y=(0,i.memo)(({mobile:e})=>{let{t:r}=(0,u.useTranslation)(["landing","blog"]);return(0,t.jsxs)(a.Center,{className:b.outter,children:[(0,t.jsx)(v,{size:e?160:200,style:{marginBottom:-100,pointerEvents:"none",zIndex:10}}),(0,t.jsxs)(n.Block,{align:"center",className:b.container,gap:32,style:{backgroundImage:`url(${(0,g.getR2Url)("waitlist-bg.webp")})`},variant:"outlined",width:"100%",children:[(0,t.jsxs)(l.Flexbox,{align:"center",style:{zIndex:1},children:[(0,t.jsx)(m.default,{align:e?"center":void 0,style:{letterSpacing:"-0.04em",minHeight:"unset"},weight:"bolder",children:"Agent teammates that grow with you"}),(0,t.jsx)(h.default,{align:e?"center":void 0,as:"h3",children:r("footer.desc")})]}),(0,t.jsx)(d.default,{cloudCtaUtm:f.HOME_LANDING_HERO_CLOUD_CTA,mobile:e})]}),(0,t.jsxs)(s.Text,{style:{fontSize:12,lineHeight:1.5,opacity:.5,textAlign:"left"},type:"secondary",children:["* ",r("footer.description",{ns:"common"})," ",r("footer.aiTransparency.notice",{ns:"common"})," ",(0,t.jsx)(p.default,{href:"/privacy",style:{opacity:2},children:r("footer.aiTransparency.learnMore",{ns:"common"})})]})]})}),x=(0,i.memo)(({id:e,mobile:i})=>(0,t.jsx)(o.default,{align:"center",id:e,justify:"center",outerStyle:{background:r.cssVar.colorBgContainer},style:{marginBottom:i?24:48,marginTop:i?48:96},children:(0,t.jsx)(y,{mobile:i})}));e.s(["default",0,x],623427)},561391,e=>{"use strict";var t=e.i(843476),r=e.i(43884),i=e.i(184283),o=e.i(271645);e.i(785269);var n=e.i(322831),a=e.i(523679),l=e.i(953552),s=e.i(523357),c=e.i(208544),u=e.i(639007),d=e.i(810379),p=e.i(512320),m=e.i(859634);let h=(0,o.memo)(()=>{let{t:e}=(0,n.useTranslation)("landing"),{isDarkMode:r}=(0,u.useThemeMode)();return(0,t.jsxs)(d.default,{children:[(0,t.jsx)(c.Flexbox,{flex:1,padding:24,children:(0,t.jsx)(p.default,{subTitle:e("evolve.features.adaptiveBehavior.subTitle"),title:e("evolve.features.adaptiveBehavior.title")})}),(0,t.jsx)("img",{alt:e("evolve.features.adaptiveBehavior.title"),src:(0,m.getAssets)("adaptiveBehavior",r),style:{alignSelf:"flex-end",aspectRatio:(0,m.getRatio)("adaptiveBehavior"),position:"relative",width:"100%"}})]})}),g=(0,o.memo)(()=>{let{t:e}=(0,n.useTranslation)("landing"),{isDarkMode:r}=(0,u.useThemeMode)();return(0,t.jsxs)(d.default,{children:[(0,t.jsx)(c.Flexbox,{flex:1,padding:24,children:(0,t.jsx)(p.default,{subTitle:e("evolve.features.learning.subTitle"),title:e("evolve.features.learning.title")})}),(0,t.jsx)("img",{alt:e("evolve.features.learning.title"),src:(0,m.getAssets)("continualLearning",r),style:{alignSelf:"flex-end",aspectRatio:(0,m.getRatio)("continualLearning"),position:"relative",width:"100%"}})]})}),f=(0,o.memo)(()=>{let{t:e}=(0,n.useTranslation)("landing"),{isDarkMode:r}=(0,u.useThemeMode)();return(0,t.jsxs)(d.default,{children:[(0,t.jsx)(c.Flexbox,{flex:1,padding:24,children:(0,t.jsx)(p.default,{subTitle:e("evolve.features.management.subTitle"),title:e("evolve.features.management.title")})}),(0,t.jsx)("img",{alt:e("evolve.features.management.title"),src:(0,m.getAssets)("whiteBox",r),style:{alignSelf:"flex-end",aspectRatio:(0,m.getRatio)("whiteBox"),position:"relative",width:"100%"}})]})}),b=(0,o.memo)(()=>{let{t:e}=(0,n.useTranslation)("landing"),{isDarkMode:r}=(0,u.useThemeMode)();return(0,t.jsxs)(d.default,{children:[(0,t.jsx)(c.Flexbox,{flex:1,padding:24,children:(0,t.jsx)(p.default,{subTitle:e("evolve.features.personalMemory.subTitle"),title:e("evolve.features.personalMemory.title")})}),(0,t.jsx)("img",{alt:e("evolve.features.personalMemory.title"),src:(0,m.getAssets)("personalMemory",r),style:{alignSelf:"flex-end",aspectRatio:(0,m.getRatio)("personalMemory"),position:"relative",width:"100%"}})]})}),v=(0,o.memo)(({id:e,mobile:o})=>{let{t:c}=(0,n.useTranslation)("landing");return(0,t.jsxs)(s.default,{gap:16,id:e,paddingBlock:o?48:96,children:[(0,t.jsx)(a.default,{color:i.cssVar.colorSuccess,children:c("evolve.tag")}),(0,t.jsx)(l.default,{children:c("evolve.title")}),(0,t.jsxs)(r.Grid,{gap:16,rows:2,children:[(0,t.jsx)(b,{}),(0,t.jsx)(g,{}),(0,t.jsx)(h,{}),(0,t.jsx)(f,{})]})]})});e.s(["default",0,v],561391)},550970,e=>{"use strict";var t=e.i(843476),r=e.i(450354),i=e.i(208544),o=e.i(43884),n=e.i(184283),a=e.i(466664),l=e.i(271645);e.i(785269);var s=e.i(322831),c=e.i(347782),u=e.i(523357),d=e.i(523679),p=e.i(953552),m=e.i(765812),h=e.i(256017),g=e.i(128709),f=e.i(312361),b=e.i(810379),v=e.i(30058),y=e.i(132829),x=e.i(859634),w=e.i(125017);let j=(0,l.memo)(({mobile:e})=>{let[r,o]=(0,l.useState)("builder"),{steps:n,subTitle:a}=(e=>{let{t}=(0,s.useTranslation)("landing"),r={steps:[{children:t("create.features.agentBuilder.builder.items.onePromptToStart.children"),key:"1",label:t("create.features.agentBuilder.builder.items.onePromptToStart.label")},{children:t("create.features.agentBuilder.builder.items.autoConfiguredByDefault.children"),key:"2",label:t("create.features.agentBuilder.builder.items.autoConfiguredByDefault.label")},{children:t("create.features.agentBuilder.builder.items.useInstantly.children"),key:"3",label:t("create.features.agentBuilder.builder.items.useInstantly.label")}],subTitle:t("create.features.agentBuilder.builder.subTitle")},i={steps:[{children:t("create.features.agentBuilder.community.items.findAgentsThatAlreadyWork.children"),key:"1",label:t("create.features.agentBuilder.community.items.findAgentsThatAlreadyWork.label")},{children:t("create.features.agentBuilder.community.items.checkWhatAnAgentCanDo.children"),key:"2",label:t("create.features.agentBuilder.community.items.checkWhatAnAgentCanDo.label")},{children:t("create.features.agentBuilder.community.items.customizeAnytime.children"),key:"3",label:t("create.features.agentBuilder.community.items.customizeAnytime.label")},{children:t("create.features.agentBuilder.community.items.editAndReshapeItAnytime.children"),key:"4",label:t("create.features.agentBuilder.community.items.editAndReshapeItAnytime.label")}],subTitle:t("create.features.agentBuilder.community.subTitle")};return"builder"===e?r:i})(r),{t:c}=(0,s.useTranslation)("landing"),u=(0,x.getVideoMarkers)("builder"===r?"agentBuilder":"community"),{activeKeys:d,containerRef:p,onCollapseChange:j,setActiveKeys:k,videoRef:S}=(0,w.useVideoCollapseSync)({markers:u}),C="builder"===r?"agentBuilder":"community";return(0,t.jsxs)(b.default,{grid:!1,ref:p,style:{flexDirection:e?"column-reverse":"row"},wrap:"wrap",children:[(0,t.jsxs)(i.Flexbox,{flex:1,gap:32,justify:"space-between",padding:24,children:[(0,t.jsxs)(i.Flexbox,{gap:16,children:[(0,t.jsx)(h.Segmented,{onChange:e=>{o(e),k(["1"])},options:[{label:c("create.features.agentBuilder.builder.title"),value:"builder"},{label:c("create.features.agentBuilder.community.title"),value:"community"}],style:{alignSelf:"flex-start",marginTop:4},value:r,variant:"filled"}),(0,t.jsx)(v.default,{children:a})]}),(0,t.jsx)(m.Collapse,{accordion:!0,activeKey:d,bordered:!1,expandIcon:()=>null,gap:14,items:n.map((e,r)=>({...e,children:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(g.Text,{fontSize:16,type:"secondary",weight:400,children:e.children}),r<n.length-1&&(0,t.jsx)(f.Divider,{style:{marginBlock:"24px 0"}})]}),label:(0,t.jsx)(g.Text,{fontSize:16,children:e.label})})),onChange:j,padding:0,variant:"borderless"})]}),(0,t.jsx)(y.default,{backgroundKey:"createBg",posterKey:C,ratioKey:"agentBuilder",videoKey:C,videoRef:S})]})});var k=e.i(639007),S=e.i(512320);let C=(0,l.memo)(()=>{let{t:e}=(0,s.useTranslation)("landing"),{isDarkMode:r}=(0,k.useThemeMode)();return(0,t.jsxs)(b.default,{children:[(0,t.jsx)(i.Flexbox,{flex:1,padding:24,children:(0,t.jsx)(S.default,{subTitle:e("create.features.intelligence.subTitle"),title:e("create.features.intelligence.title")})}),(0,t.jsx)("img",{alt:e("create.features.intelligence.title"),src:(0,x.getAssets)("intelligence",r),style:{alignSelf:"flex-end",aspectRatio:(0,x.getRatio)("intelligence"),position:"relative",width:"100%"}})]})});var T=e.i(585230),$=e.i(61367),O=e.i(80587),A=e.i(352455);let E=n.keyframes`
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 0% 10000%;
  }
`,z=(0,n.createStaticStyles)(({css:e})=>({cover:e`
    aspect-ratio: ${(0,x.getRatio)("intelligence")};
    width: 100%;
    background-size: 100% auto;
    animation: ${E} 600s linear infinite;
  `})),M=(0,l.memo)(({skillCount:e=0,mcpCount:o=0})=>{let{t:n}=(0,s.useTranslation)("landing"),{isDarkMode:a}=(0,k.useThemeMode)();return(0,t.jsxs)(b.default,{children:[(0,t.jsxs)(i.Flexbox,{gap:16,padding:24,children:[(0,t.jsx)(S.default,{subTitle:n("create.features.skills.subTitle"),title:`${(0,A.formatMarketCount)(e)}+ SKILLs`}),(0,t.jsxs)(i.Flexbox,{gap:8,horizontal:!0,wrap:"wrap",children:[(0,t.jsx)(c.default,{href:"/skills",children:(0,t.jsx)(r.Button,{icon:(0,t.jsx)(O.SkillsIcon,{size:14}),size:"small",type:"default",children:n("create.features.skills.linkSkills")})}),(0,t.jsx)(c.default,{href:"/mcp",children:(0,t.jsx)(r.Button,{icon:(0,t.jsx)($.McpIcon,{size:14}),size:"small",type:"default",children:n("create.features.skills.linkMcp",{count:(0,A.formatMarketCount)(o)})})})]})]}),(0,t.jsx)(T.MaskShadow,{className:z.cover,position:"top",style:{alignSelf:"flex-end",backgroundImage:`url(${(0,x.getAssets)("skills",a)})`}})]})}),P=(0,l.memo)(({id:e,mobile:l,skillCount:m=0,mcpCount:h=0})=>{let{t:g}=(0,s.useTranslation)("landing");return(0,t.jsxs)(u.default,{gap:16,id:e,paddingBlock:l?48:96,children:[(0,t.jsx)(d.default,{color:n.cssVar.colorWarning,children:g("create.tag")}),(0,t.jsxs)(i.Flexbox,{align:"center",gap:16,horizontal:!l,justify:"space-between",wrap:"wrap",children:[(0,t.jsx)(p.default,{children:g("create.title")}),(0,t.jsx)(c.default,{href:"/agent",children:(0,t.jsx)(r.Button,{icon:a.BotIcon,size:"large",style:{fontWeight:500,minWidth:200},variant:"filled",children:g("create.marketBtn")})})]}),(0,t.jsx)(j,{mobile:l}),(0,t.jsxs)(o.Grid,{gap:16,rows:2,children:[(0,t.jsx)(M,{mcpCount:h,skillCount:m}),(0,t.jsx)(C,{})]})]})});e.s(["default",0,P],550970)},196599,e=>{"use strict";var t=e.i(843476),r=e.i(184283),i=e.i(271645);e.i(785269);var o=e.i(322831),n=e.i(523679),a=e.i(953552),l=e.i(523357),s=e.i(765812),c=e.i(208544),u=e.i(128709),d=e.i(312361),p=e.i(810379),m=e.i(512320),h=e.i(132829),g=e.i(859634),f=e.i(125017);let b=(0,i.memo)(({mobile:e})=>{let{t:r}=(0,o.useTranslation)("landing"),n=(0,g.getVideoMarkers)("multiAgent"),{activeKeys:a,containerRef:l,onCollapseChange:b,videoRef:v}=(0,f.useVideoCollapseSync)({markers:n}),y=(0,i.useMemo)(()=>{let e=[{children:r("collaborate.features.multiAgent.items.automaticTeamFormation.children"),key:"1",label:r("collaborate.features.multiAgent.items.automaticTeamFormation.label")},{children:r("collaborate.features.multiAgent.items.parallelCollaboration.children"),key:"2",label:r("collaborate.features.multiAgent.items.parallelCollaboration.label")},{children:r("collaborate.features.multiAgent.items.multiTaskExecution.children"),key:"3",label:r("collaborate.features.multiAgent.items.multiTaskExecution.label")},{children:r("collaborate.features.multiAgent.items.iterativeImprovement.children"),key:"4",label:r("collaborate.features.multiAgent.items.iterativeImprovement.label")}];return e.map((r,i)=>({...r,children:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(u.Text,{fontSize:16,type:"secondary",weight:400,children:r.children}),i<e.length-1&&(0,t.jsx)(d.Divider,{style:{marginBlock:"24px 0"}})]}),label:(0,t.jsx)(u.Text,{fontSize:16,children:r.label})}))},[r]);return(0,t.jsxs)(p.default,{grid:!1,ref:l,style:{flexDirection:e?"column-reverse":"row"},wrap:"wrap",children:[(0,t.jsxs)(c.Flexbox,{flex:1,gap:32,justify:"space-between",padding:24,children:[(0,t.jsx)(m.default,{subTitle:r("collaborate.features.multiAgent.subTitle"),title:r("collaborate.features.multiAgent.title")}),(0,t.jsx)(s.Collapse,{accordion:!0,activeKey:a,bordered:!1,expandIcon:()=>null,gap:14,items:y,onChange:b,padding:0,variant:"borderless"})]}),(0,t.jsx)(h.default,{backgroundKey:"collaborateBg",posterKey:"multiAgent",ratioKey:"agentBuilder",videoKey:"multiAgent",videoRef:v})]})});var v=e.i(43884),y=e.i(639007);let x=(0,i.memo)(({mobile:e,title:r,desc:i,cover:o})=>e?(0,t.jsxs)(c.Flexbox,{gap:8,children:[(0,t.jsx)(u.Text,{as:"h4",fontSize:16,weight:500,children:r}),(0,t.jsx)(u.Text,{as:"p",fontSize:e?14:16,style:{lineHeight:1.4},type:"secondary",weight:400,children:i}),(0,t.jsx)("img",{alt:r,src:o,style:{aspectRatio:(0,g.getRatio)("pages"),marginLeft:-16,width:"100%"}})]}):(0,t.jsxs)(c.Flexbox,{gap:4,children:[(0,t.jsx)("img",{alt:r,src:o,style:{aspectRatio:(0,g.getRatio)("pages"),marginBottom:24,marginLeft:-16,width:"100%"}}),(0,t.jsx)(u.Text,{as:"h4",fontSize:16,weight:500,children:r}),(0,t.jsx)(u.Text,{as:"p",fontSize:e?14:16,style:{lineHeight:1.4},type:"secondary",weight:400,children:i})]})),w=(0,i.memo)(({mobile:e})=>{let{t:r}=(0,o.useTranslation)("landing"),{isDarkMode:n}=(0,y.useThemeMode)(),a=[{cover:(0,g.getAssets)("pages",n),desc:r("collaborate.features.workEffortlessly.items.pages.desc"),title:r("collaborate.features.workEffortlessly.items.pages.title")},{cover:(0,g.getAssets)("schedule",n),desc:r("collaborate.features.workEffortlessly.items.schedule.desc"),title:r("collaborate.features.workEffortlessly.items.schedule.title")},{cover:(0,g.getAssets)("project",n),desc:r("collaborate.features.workEffortlessly.items.project.desc"),title:r("collaborate.features.workEffortlessly.items.project.title")},{cover:(0,g.getAssets)("workspace",n),desc:r("collaborate.features.workEffortlessly.items.workspace.desc"),title:r("collaborate.features.workEffortlessly.items.workspace.title")}];return e?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(p.default,{gap:32,grid:!1,horizontal:!1,padding:24,children:(0,t.jsx)(m.default,{subTitle:r("collaborate.features.workEffortlessly.subTitle"),title:r("collaborate.features.workEffortlessly.title")})}),a.map((r,i)=>(0,t.jsx)(p.default,{gap:32,grid:!1,horizontal:!1,padding:24,children:(0,t.jsx)(x,{mobile:e,...r})},i))]}):(0,t.jsxs)(p.default,{gap:32,grid:!1,horizontal:!1,padding:24,children:[(0,t.jsx)(m.default,{subTitle:r("collaborate.features.workEffortlessly.subTitle"),title:r("collaborate.features.workEffortlessly.title")}),(0,t.jsx)(v.Grid,{gap:32,rows:4,style:{paddingBottom:16},children:a.map((r,o)=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsx)(x,{mobile:e,...r}),e&&o<a.length-1&&(0,t.jsx)(d.Divider,{dashed:!0,style:{margin:0}})]},o))})]})}),j=(0,i.memo)(({id:e,mobile:i})=>{let{t:s}=(0,o.useTranslation)("landing");return(0,t.jsxs)(l.default,{gap:16,id:e,paddingBlock:i?48:96,children:[(0,t.jsx)(n.default,{color:r.cssVar.colorInfo,children:s("collaborate.tag")}),(0,t.jsx)(a.default,{children:s("collaborate.title")}),(0,t.jsx)(b,{mobile:i}),(0,t.jsx)(w,{mobile:i})]})});e.s(["default",0,j],196599)},312518,e=>{"use strict";let t,r,i;var o=e.i(843476),n=e.i(271645);e.i(785269);var a=e.i(322831),l=e.i(953552),s=e.i(523357),c=e.i(486642),u=e.i(943243),d=e.i(208544),p=e.i(184283);let m=(0,p.createStaticStyles)(({css:e})=>({logoloop:e`
    --logoloop-gap: 32px;
    --logoloop-logo-height: 28px;
    --logoloop-fade-color-auto: #fff;

    position: relative;
    overflow: hidden;

    &.logoloop-vertical {
      display: inline-block;
      height: 100%;
    }

    &.logoloop-scale-hover {
      padding-block: calc(var(--logoloop-logo-height) * 0.1);
    }

    &.logoloop-fade::before,
    &.logoloop-fade::after {
      pointer-events: none;
      content: '';

      position: absolute;
      z-index: 10;
      inset-block: 0;

      width: clamp(24px, 8%, 120px);
    }

    &.logoloop-fade::before {
      inset-inline-start: 0;
      background: linear-gradient(
        to right,
        var(--logoloop-fade-color, var(--logoloop-fade-color-auto)) 0%,
        rgba(0, 0, 0, 0%) 100%
      );
    }

    &.logoloop-fade::after {
      inset-inline-end: 0;
      background: linear-gradient(
        to left,
        var(--logoloop-fade-color, var(--logoloop-fade-color-auto)) 0%,
        rgba(0, 0, 0, 0%) 100%
      );
    }

    &.logoloop-vertical.logoloop-fade::before,
    &.logoloop-vertical.logoloop-fade::after {
      inset-inline: 0;
      width: 100%;
      height: clamp(24px, 8%, 120px);
    }

    &.logoloop-vertical.logoloop-fade::before {
      inset-block: 0 auto;
      background: linear-gradient(
        to bottom,
        var(--logoloop-fade-color, var(--logoloop-fade-color-auto)) 0%,
        rgba(0, 0, 0, 0%) 100%
      );
    }

    &.logoloop-vertical.logoloop-fade::after {
      inset-block: auto 0;
      background: linear-gradient(
        to top,
        var(--logoloop-fade-color, var(--logoloop-fade-color-auto)) 0%,
        rgba(0, 0, 0, 0%) 100%
      );
    }

    @media (prefers-color-scheme: dark) {
      --logoloop-fade-color-auto: #0b0b0b;
    }
  `,logoloopItem:e`
    flex: 0 0 auto;

    margin-inline-end: var(--logoloop-gap);

    font-size: var(--logoloop-logo-height);
    line-height: 1;
    list-style: none;

    &:last-child {
      margin-inline-end: var(--logoloop-gap);
    }

    .logoloop-scale-hover & {
      overflow: visible;

      &:hover img,
      &:hover .logoloop-node {
        transform-origin: center center;
        transform: scale(1.2);
      }
    }

    .logoloop-vertical & {
      margin-block-end: var(--logoloop-gap);
      margin-inline-end: 0;

      &:last-child {
        margin-block-end: var(--logoloop-gap);
        margin-inline-end: 0;
      }
    }
  `,logoloopLink:e`
    display: inline-flex;
    align-items: center;

    border-radius: 4px;

    text-decoration: none;

    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }

    &:focus-visible {
      outline: 2px solid currentcolor;
      outline-offset: 2px;
    }
  `,logoloopList:e`
    display: flex;
    align-items: center;

    margin: 0;
    padding: 0;

    list-style: none;

    .logoloop-vertical & {
      flex-direction: column;
    }
  `,logoloopNode:e`
    display: inline-flex;
    align-items: center;

    .logoloop-scale-hover & {
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .logoloop-scale-hover .logoloop-item:hover & {
      transform-origin: center center;
      transform: scale(1.2);
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none !important;
    }
  `,logoloopTrack:e`
    will-change: transform;
    user-select: none;

    position: relative;
    z-index: 0;

    display: flex;

    width: max-content;

    .logoloop-vertical & {
      flex-direction: column;
      width: 100%;
      height: max-content;
    }

    @media (prefers-reduced-motion: reduce) {
      transform: translate3d(0, 0, 0) !important;
    }
  `})),h=e=>"number"==typeof e?`${e}px`:e??void 0,g=n.default.memo(({logos:e,speed:t=48,direction:r="left",width:i="100%",logoHeight:a=28,gap:l=64,pauseOnHover:s=!1,hoverSpeed:c,fadeOut:u=!1,fadeOutColor:d=p.cssVar.colorBgLayout,scaleOnHover:g=!1,renderItem:f,ariaLabel:b="Partner logos",className:v,style:y})=>{var x,w,j;let k,S,C,T,$=(0,n.useRef)(null),O=(0,n.useRef)(null),A=(0,n.useRef)(null),[E,z]=(0,n.useState)(0),[M,P]=(0,n.useState)(0),[R,I]=(0,n.useState)(2),[L,N]=(0,n.useState)(!1),B=(0,n.useMemo)(()=>void 0!==c?c:!0===s||!1!==s?0:void 0,[c,s]),_="up"===r||"down"===r,H=(0,n.useMemo)(()=>Math.abs(t)*(_?"up"===r?1:-1:"left"===r?1:-1)*(t<0?-1:1),[t,r,_]),U=(0,n.useCallback)(()=>{let e=$.current?.clientWidth??0,t=A.current?.getBoundingClientRect?.(),r=t?.width??0,i=t?.height??0;if(_){let e=$.current?.parentElement?.clientHeight??0;if($.current&&e>0){let t=Math.ceil(e);$.current.style.height!==`${t}px`&&($.current.style.height=`${t}px`)}i>0&&(P(Math.ceil(i)),I(Math.max(2,Math.ceil(($.current?.clientHeight??e??i)/i)+2)))}else r>0&&(z(Math.ceil(r)),I(Math.max(2,Math.ceil(e/r)+2)))},[_]);x=[$,A],w=[e,l,a,_],(0,n.useEffect)(()=>{if(!window.ResizeObserver){let e=()=>U();return window.addEventListener("resize",e),U(),()=>window.removeEventListener("resize",e)}let e=x.map(e=>{if(!e.current)return null;let t=new ResizeObserver(U);return t.observe(e.current),t});return U(),()=>{e.forEach(e=>e?.disconnect())}},w),j=[e,l,a,_],(0,n.useEffect)(()=>{let e=A.current?.querySelectorAll("img")??[];if(0===e.length)return void U();let t=e.length,r=()=>{0==(t-=1)&&U()};return e.forEach(e=>{e.complete?r():(e.addEventListener("load",r,{once:!0}),e.addEventListener("error",r,{once:!0}))}),()=>{e.forEach(e=>{e.removeEventListener("load",r),e.removeEventListener("error",r)})}},j),k=(0,n.useRef)(null),S=(0,n.useRef)(null),C=(0,n.useRef)(0),T=(0,n.useRef)(0),(0,n.useEffect)(()=>{let e=O.current;if(!e)return;let t=_?M:E;if(t>0){C.current=(C.current%t+t)%t;let r=_?`translate3d(0, ${-C.current}px, 0)`:`translate3d(${-C.current}px, 0, 0)`;e.style.transform=r}let r=i=>{null===S.current&&(S.current=i);let o=Math.max(0,i-S.current)/1e3;S.current=i;let n=L&&void 0!==B?B:H,a=1-Math.exp(-o/.25);if(T.current+=(n-T.current)*a,t>0){let r=C.current+T.current*o;C.current=r=(r%t+t)%t;let i=_?`translate3d(0, ${-C.current}px, 0)`:`translate3d(${-C.current}px, 0, 0)`;e.style.transform=i}k.current=requestAnimationFrame(r)};return k.current=requestAnimationFrame(r),()=>{null!==k.current&&(cancelAnimationFrame(k.current),k.current=null),S.current=null}},[H,E,M,L,B,_]);let F=(0,n.useMemo)(()=>({"--logoloop-gap":`${l}px`,"--logoloop-logo-height":`${a}px`,...d&&{"--logoloop-fade-color":d}}),[l,a,d]),D=(0,n.useCallback)(()=>{void 0!==B&&N(!0)},[B]),V=(0,n.useCallback)(()=>{void 0!==B&&N(!1)},[B]),W=(0,n.useCallback)((e,t)=>{if(f)return(0,o.jsx)("li",{className:(0,p.cx)(m.logoloopItem,"logoloop-item"),role:"listitem",children:f(e,t)},t);let r="node"in e,i=r?(0,o.jsx)("span",{"aria-hidden":!!e.href&&!e.ariaLabel,className:(0,p.cx)(m.logoloopNode,"logoloop-node"),children:e.node}):(0,o.jsx)("img",{alt:e.alt??"",decoding:"async",draggable:!1,height:e.height,loading:"lazy",sizes:e.sizes,src:e.src,srcSet:e.srcSet,title:e.title,width:e.width}),n=r?e.ariaLabel??e.title:e.alt??e.title,a=e.href?(0,o.jsx)("a",{"aria-label":n||"logo link",className:(0,p.cx)(m.logoloopLink,"logoloop-link"),href:e.href,rel:"noreferrer noopener",target:"_blank",children:i}):i;return(0,o.jsx)("li",{className:(0,p.cx)(m.logoloopItem,"logoloop-item"),role:"listitem",children:a},t)},[f]),q=(0,n.useMemo)(()=>Array.from({length:R},(t,r)=>(0,o.jsx)("ul",{"aria-hidden":r>0,className:(0,p.cx)(m.logoloopList,"logoloop-list"),ref:0===r?A:void 0,role:"list",children:e.map((e,t)=>W(e,`${r}-${t}`))},`copy-${r}`)),[R,e,W]),G=(0,n.useMemo)(()=>({width:_?"100%"===h(i)?void 0:h(i):h(i)??"100%",...F,...y}),[i,F,y,_]);return(0,o.jsx)("div",{"aria-label":b,className:(0,p.cx)(m.logoloop,"logoloop",_?"logoloop-vertical":"logoloop-horizontal",u&&"logoloop-fade",g&&"logoloop-scale-hover",v),ref:$,role:"region",style:G,children:(0,o.jsx)("div",{className:(0,p.cx)(m.logoloopTrack,"logoloop-track"),onMouseEnter:D,onMouseLeave:V,ref:O,children:q})})});g.displayName="LogoLoop";var f=e.i(457606);let b=n.forwardRef(function({title:e="Open Collective",color:t="currentColor",size:r=24,...i},n){return"default"===t&&(t="#7FADF2"),(0,o.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:r,height:r,fill:t,viewBox:"0 0 24 24",ref:n,...i,children:[(0,o.jsx)("title",{children:e}),(0,o.jsx)("path",{d:"M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12c2.54 0 4.894-.79 6.834-2.135l-3.107-3.109a7.715 7.715 0 1 1 0-13.512l3.107-3.109A11.943 11.943 0 0 0 12 0zm9.865 5.166l-3.109 3.107A7.67 7.67 0 0 1 19.715 12a7.682 7.682 0 0 1-.959 3.727l3.109 3.107A11.943 11.943 0 0 0 24 12c0-2.54-.79-4.894-2.135-6.834z"})]})});var v=e.i(525212),y=e.i(740930);let x=[{avatar:"https://hub-apac-1.lobeobjects.space/landing/avatar/guillermo-rauch.webp",content:"This is 🔥. Open source Poe & ChatGPT UI",desc:"@vercel CEO",icon:v.SiX,name:"Guillermo Rauch",reference:"https://x.com/rauchg/status/1734310768403984509"},{avatar:"https://hub-apac-1.lobeobjects.space/landing/avatar/egoist.webp",content:"This open source ChatGPT API wrapper looks really great",desc:"#chatkit #koeapp",icon:v.SiX,name:"EGOIST",reference:"https://x.com/localhost_5173/status/1734186019426283658"},{avatar:"https://hub-apac-1.lobeobjects.space/landing/avatar/joe-davison.webp",content:"To the open source lovers: LobeHub is such a great project. Give them a follow! They deserve it.",desc:"Science & Technology",icon:v.SiX,name:"Joe Davison",reference:"https://x.com/joeddav/status/1739148562032967686"},{avatar:"https://hub-apac-1.lobeobjects.space/landing/avatar/cocktail-peanut.webp",content:"Run Any LLM with 1 Click! LobeHub is a Universal LLM Web UI. And now, you can run it with 1 click on ANY local machine (Windows, Mac, Linux)",icon:v.SiX,name:"cocktail peanut",reference:"https://x.com/cocktailpeanut/status/1762875271013638251"},{avatar:"https://hub-apac-1.lobeobjects.space/landing/avatar/ℕ-𝔸-🇷🇸-🇵🇸.webp",content:"I've just contributed to LobeHub. Consider supporting them too — every little helps! via @opencollect",icon:v.SiX,name:"#ℕ/𝔸🇷🇸🇵🇸",reference:"https://x.com/limfoo/status/1734085248256737576"},{avatar:"https://hub-apac-1.lobeobjects.space/landing/avatar/xueliang-chen.webp",content:"Good jobs! I sincerely hope that you could make the Lobe series projects even better ❤️",icon:v.SiX,name:"Xueliang Chen"},{avatar:"https://hub-apac-1.lobeobjects.space/landing/avatar/mushan-0-x-0.webp",content:"This is an AI dialogue project that is very forward-looking in both design and technology",desc:"#AI 0x0",icon:b,name:"mushan0x0"},{avatar:"https://hub-apac-1.lobeobjects.space/landing/avatar/sangmin-eth.webp",content:"ローカルでチャットボットを運営したい全ての方にお勧めしたいのがLobeHub。OpenAIに加え、PerplexityやAnthropic、Mistralのモデルとも繋げられる。Function Callingを活用した拡張機能やエイジェントが登録できるのも大変便利。",icon:v.SiX,name:"sangmin.eth",reference:"https://x.com/gijigae/status/1763074693094097217"},{avatar:"https://www.gravatar.com/avatar/49f834bfccff7b276d195a6bdaf6f360?default=404",content:"What an amazing open source project.️",icon:b,name:"hash070"},{avatar:"https://hub-apac-1.lobeobjects.space/landing/avatar/raymond-thurman.webp",content:"Check out LobeHub.Self Deployable GUI that has agents and everything built in.Just has a bit more than needed for me.",desc:"AI Enthusiast",icon:v.SiX,name:"Raymond Thurman",reference:"https://x.com/hrithikt_/status/1766738683557015854"},{avatar:"https://hub-apac-1.lobeobjects.space/landing/avatar/eliane-mertz.webp",content:"This is a game-changer! LobeHub makes running LLMs so convenient and accessible. It's amazing to see how technology is advancing to simplify complex tasks like this. Kudos to @lobehub for such an innovative solution! ",icon:v.SiX,name:"Eliane Mertz"},{avatar:"https://hub-apac-1.lobeobjects.space/landing/avatar/frontend-gijela.webp",content:"LobeHub 的插件系统，真的很能打，市面上目前只看到这一家具备如此丰富的插件。",icon:v.SiX,name:"frontendGijela",reference:"https://x.com/frontendGijela/status/1768988567194538343"},{avatar:"https://hub-apac-1.lobeobjects.space/landing/avatar/kim-possible.webp",content:"LobeHub Agent、ChatGPTのGPTsと同じInstructionsで作成すれば同じ使い方ができるのか！これはいい！",icon:v.SiX,name:"Kim Possible",reference:"https://x.com/ttekun/status/1766722398760657221"},{avatar:"https://hub-apac-1.lobeobjects.space/landing/avatar/jerlin.webp",content:`更好用的本地大模型体验：LobeHub

🪄 要点：✦ 成年人不做选择，开源、闭源「我全都要」。]
✦ 命令行用着别扭，用户界面解君愁。✦ 海量 Agent，支持自定义。
✦ 方便的本地 LLM 支持，Ollama 用户狂喜。（敲重点：最新版能够正确拉取自定义的 Ollama 模型啦！）

本地推荐 Docker 部署非常简单：啪啪 2 下，Enter，启动🚀传送门：`,icon:v.SiX,name:"Jerlin",reference:"https://x.com/eviljer/status/1787713986894647800"},{avatar:"https://hub-apac-1.lobeobjects.space/landing/avatar/karminski-牙医.webp",content:`来个本地 RAG 框架 LobeHub，这个框架在 Github 上已经有59K Star了。

LobeHub 上常用的本地AI功能都有，包括各个服务商的接口，文件上传、知识管理、 RAG、多模态、生成动态 SVG 图形、构建并渲染交互式 HTML 页面、生成多种格式的文档等等`,icon:v.SiX,name:"karminski-牙医",reference:"https://x.com/karminski3/status/1915210582598308261"},{avatar:"https://hub-apac-1.lobeobjects.space/landing/avatar/larry-leo-bro-eagle-of-full-stack.webp",content:`高强度用了一天自部署的 LobeHub + claude 3.7，不得不说，真香！早就该用了。 @arvin17x 团队太棒了

但已经 180$ 买了一年 Claude 会员了，怎么破？`,icon:v.SiX,name:"Larry & Leo Bro - Eagle of Full Stack",reference:"https://x.com/xqliu/status/1908783010419273781"},{avatar:"https://hub-apac-1.lobeobjects.space/landing/avatar/xiaoxuan.webp",content:`看到 LobeHub 万级的 star ，意识到可能真的有很多人是在用第三方 webui 现在自己也在用了 😇 像 claude 那样激进的封号策略，用第三方 api + webui 才是上策`,icon:v.SiX,name:"不游",reference:"https://twitter.com/fengbuyou/status/1768226822804914651"},{avatar:"https://hub-apac-1.lobeobjects.space/landing/avatar/elestio.webp",content:`Discover LobeHub, a free open source Large Language Model (LLM) Platform to create advanced custom chatbots
We'll start by installing it with Elestio then we will explore the different features of LobeHub through a platform overview.`,desc:"DevOps platform",icon:y.SiYoutube,name:"Elestio",reference:"https://www.youtube.com/watch?v=2bjkx3QFOQo"},{avatar:"https://hub-apac-1.lobeobjects.space/landing/avatar/oss-insight.webp",content:`🚀 The following TypeScript repositories are trending this week:

lobehub/lobehub ↑2645`,desc:"@OSSInsight",icon:v.SiX,name:"OSS Insight",reference:"https://twitter.com/OSSInsight/status/1762121046214541340"},{avatar:"https://hub-apac-1.lobeobjects.space/landing/avatar/歸藏.webp",content:"这个首页效果也太酷了，期待一手。LobeHub只要把部署门槛降低还是很能打的。",icon:v.SiX,name:"歸藏",reference:"https://x.com/op7418/status/1767058230415630722"},{avatar:"https://hub-apac-1.lobeobjects.space/landing/avatar/leo-quote.webp",content:"Looking forward to the LobeHub with simple and quick share function! The code quality is much better than other products, 93% coverage, beautiful graphics, really appreciated all the developers’ work!",icon:f.SiGithub,name:"LeoQuote",reference:"https://github.com/lobehub/lobehub/discussions/1768#discussioncomment-8930812"},{avatar:"https://hub-apac-1.lobeobjects.space/landing/avatar/sen-ca-poo.webp",content:"LobeHub 的開源精神，讓我們得以見證一個產品從雛形到成熟的過程，這個過程中充滿了來自全球各地的智慧與熱情。每一位貢獻者的辛勞與創意，讓 LobeHub 得以進化成為今日這樣強大而靈活的工具。",icon:f.SiGithub,name:"Sen-CaPoo",reference:"https://github.com/lobehub/lobehub/discussions/1768#discussioncomment-8931131"},{avatar:"https://hub-apac-1.lobeobjects.space/landing/avatar/root-ftw.webp",content:"I could write a huge text thanking you and telling a boring story of how I got to LobeHub and I don't plan to leave ever, but I will just say THANKS FOR EVERYTHING",icon:f.SiGithub,name:"Root-FTW",reference:"https://github.com/lobehub/lobehub/discussions/1768#discussioncomment-8931215"}];var w=e.i(473913),j=e.i(834101),k=e.i(128709),S=e.i(347782);let C=(0,n.memo)(({avatar:e,name:t,desc:r,content:i,icon:n,reference:l})=>{let{t:s}=(0,a.useTranslation)("landing"),c=(0,o.jsxs)(d.Flexbox,{gap:16,children:[(0,o.jsxs)(d.Flexbox,{align:"flex-start",gap:12,horizontal:!0,justify:"space-between",children:[(0,o.jsxs)(d.Flexbox,{align:"center",gap:12,horizontal:!0,children:[(0,o.jsx)(w.Avatar,{alt:t,avatar:e||t,background:p.cssVar.colorBgElevated,size:36}),(0,o.jsxs)(d.Flexbox,{flex:1,gap:6,style:{overflow:"hidden"},children:[(0,o.jsx)(k.Text,{ellipsis:!0,fontSize:16,weight:500,children:t}),(0,o.jsxs)(k.Text,{ellipsis:!0,fontSize:12,type:"secondary",children:["#",r||s("community.defaultDesc")]})]})]}),(0,o.jsx)(j.Icon,{fill:p.cssVar.colorTextDescription,icon:n,size:16,style:{flex:"none",opacity:.25}})]}),(0,o.jsx)(k.Text,{as:"p",ellipsis:{rows:5},fontSize:15,style:{lineHeight:1.6},weight:400,children:i})]});return l?(0,o.jsx)(S.default,{href:l,style:{color:p.cssVar.colorText,height:"100%"},target:"_blank",children:c}):c}),[T,$,O]=(r=2*(t=Math.floor(x.length/3)),i=x.slice(0,t),[i,x.slice(t,r),x.slice(r)]),A=(0,n.memo)(()=>{let e=(0,n.useCallback)(e=>e.map(e=>({ariaLabel:e.name,node:(0,o.jsx)(u.Block,{clickable:!0,height:216,padding:16,style:{overflow:"hidden"},variant:"outlined",width:320,children:(0,o.jsx)(C,{...e})}),title:e.name})),[]),t=(0,n.useCallback)(e=>"node"in e?e.node:null,[]),r=(0,n.useMemo)(()=>e(T),[e]),i=(0,n.useMemo)(()=>e($),[e]),a=(0,n.useMemo)(()=>e(O),[e]);return(0,o.jsxs)(d.Flexbox,{gap:8,style:{position:"relative"},width:"100%",children:[(0,o.jsx)(g,{direction:"right",fadeOut:!0,gap:8,logos:r,renderItem:t,speed:16,width:"100%"}),(0,o.jsx)(g,{direction:"left",fadeOut:!0,gap:8,logos:i,renderItem:t,speed:16,width:"100%"}),(0,o.jsx)(g,{direction:"right",fadeOut:!0,gap:8,logos:a,renderItem:t,speed:16,width:"100%"})]})});var E=e.i(450354);let z=(0,e.i(660655).createLucideIcon)("Discord",[["path",{d:"M19.277 4.946C17.9157 4.32101 16.479 3.87529 15.003 3.62C14.9895 3.6175 14.9755 3.61935 14.9631 3.62528C14.9507 3.63121 14.9405 3.64091 14.934 3.653C14.75 3.981 14.545 4.409 14.402 4.746C12.8108 4.50432 11.1922 4.50432 9.601 4.746C9.44123 4.37202 9.26096 4.00713 9.061 3.653C9.05418 3.64093 9.04378 3.63128 9.03125 3.62537C9.01871 3.61946 9.00465 3.61758 8.991 3.62C7.516 3.875 6.079 4.32 4.717 4.946C4.70541 4.95092 4.69563 4.9593 4.689 4.97C1.967 9.038 1.221 13.005 1.587 16.923C1.58787 16.9327 1.59072 16.9422 1.59536 16.9508C1.6 16.9594 1.60634 16.9669 1.614 16.973C3.19925 18.147 4.97249 19.0431 6.858 19.623C6.87131 19.627 6.88554 19.6269 6.89877 19.6226C6.912 19.6183 6.9236 19.6101 6.932 19.599C7.335 19.047 7.696 18.465 8.004 17.854C8.01039 17.8413 8.01257 17.8269 8.01023 17.8129C8.0079 17.7989 8.00116 17.7859 7.991 17.776C7.98445 17.7695 7.97662 17.7644 7.968 17.761C7.40226 17.5447 6.85455 17.2838 6.33 16.981C6.32051 16.9753 6.31254 16.9674 6.30679 16.958C6.30103 16.9486 6.29766 16.9379 6.29697 16.9268C6.29628 16.9158 6.29829 16.9048 6.30283 16.8947C6.30736 16.8846 6.31429 16.8758 6.323 16.869C6.433 16.786 6.543 16.701 6.648 16.614C6.65732 16.6062 6.6686 16.6012 6.6806 16.5994C6.69259 16.5977 6.70484 16.5993 6.716 16.604C10.153 18.174 13.874 18.174 17.27 16.604C17.2811 16.5987 17.2936 16.5967 17.3058 16.5983C17.3181 16.5999 17.3296 16.605 17.339 16.613C17.444 16.7 17.554 16.786 17.665 16.869C17.678 16.8791 17.6869 16.8936 17.69 16.9098C17.6932 16.926 17.6903 16.9428 17.682 16.957C17.6763 16.9664 17.6684 16.9743 17.659 16.98C17.136 17.286 16.587 17.547 16.02 17.76C16.0067 17.7649 15.9953 17.774 15.9876 17.7859C15.9798 17.7978 15.9761 17.8118 15.977 17.826C15.977 17.836 15.98 17.846 15.985 17.854C16.3 18.464 16.66 19.046 17.057 19.598C17.0651 19.6092 17.0765 19.6176 17.0895 19.6221C17.1026 19.6265 17.1167 19.6269 17.13 19.623C19.0187 19.045 20.7949 18.1487 22.382 16.973C22.3901 16.9673 22.3968 16.9598 22.4016 16.9511C22.4065 16.9425 22.4093 16.9329 22.41 16.923C22.847 12.393 21.676 8.459 19.305 4.971C19.299 4.95959 19.289 4.95072 19.277 4.946Z",key:"1"}],["path",{d:"M8.588 13.197C9.023 13.197 9.375 12.845 9.375 12.41 9.375 11.975 9.023 11.623 8.588 11.623 8.153 11.623 7.801 11.975 7.801 12.41 7.801 12.845 8.153 13.197 8.588 13.197ZM15.412 13.197C15.847 13.197 16.199 12.845 16.199 12.41 16.199 11.975 15.847 11.623 15.412 11.623 14.977 11.623 14.625 11.975 14.625 12.41 14.625 12.845 14.977 13.197 15.412 13.197Z",key:"2"}]]);z.displayName="DiscordIcon";var M=e.i(892766);let P=(0,n.memo)(()=>{let{t:e}=(0,a.useTranslation)("common");return(0,o.jsx)(E.Button,{href:M.DISCORD_URL,icon:z,rel:"noreferrer",size:"large",style:{fontWeight:500,minWidth:200},target:"_blank",variant:"filled",children:e("buttons.joinDiscord")})});var R=e.i(386830),R=R,I=e.i(697691),I=I,L=e.i(401981),L=L,N=e.i(77883),N=N,B=e.i(34895),B=B,_=e.i(886801),_=_,H=e.i(230218),H=H,U=e.i(433036),U=U,F=e.i(384131),F=F,D=e.i(244065),D=D,V=e.i(271881),W=e.i(780307),W=W,q=e.i(474134);(0,p.createStaticStyles)(({css:e})=>({container:e`
    flex-wrap: wrap;
    gap: 32px 64px;
    max-width: 1024px;
    ${p.responsive.sm} {
      gap: 32px;
    }
  `}));let G=(0,n.memo)(()=>{let{mobile:e}=(0,q.useResponsive)(),t=e?24:32,r=[{node:(0,o.jsx)(_.default.Brand,{size:t}),title:_.default.title},{node:(0,o.jsxs)(d.Flexbox,{align:"center",gap:12,horizontal:!0,children:[(0,o.jsx)(I.default,{size:1.4*t}),(0,o.jsx)(L.default.Combine,{size:1.2*t})]}),title:L.default.title},{node:(0,o.jsx)(H.default.Combine,{size:t}),title:H.default.title},{node:(0,o.jsx)(B.default.Combine,{size:1.2*t}),title:B.default.title},{node:(0,o.jsx)(D.default.Combine,{size:t}),title:D.default.title},{node:(0,o.jsx)(R.default.Combine,{size:1.2*t}),title:R.default.title},{node:(0,o.jsx)(U.default.Text,{size:t}),title:U.default.title},{node:(0,o.jsx)(N.default.Brand,{size:t}),title:N.default.title},{node:(0,o.jsx)(W.default.Combine,{size:1.4*t}),title:W.default.title},{node:(0,o.jsx)(F.default.Combine,{size:t}),title:F.default.title},{node:(0,o.jsx)(V.Zeabur.Combine,{size:t}),title:V.Zeabur.title}];return(0,o.jsx)(g,{fadeOut:!0,logos:r,style:{color:p.cssVar.colorTextDescription},width:"100%"})}),X=(0,n.memo)(({id:e,mobile:t})=>{let{t:r}=(0,a.useTranslation)("landing");return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(s.default,{align:"center",gap:16,horizontal:!t,id:e,justify:"space-between",style:{paddingTop:t?48:96},children:[(0,o.jsx)(l.default,{align:t?"center":void 0,children:r("community.title")}),(0,o.jsx)(P,{})]}),(0,o.jsx)(s.default,{gap:16,maxWidth:1500,paddingBlock:"64px 100px",style:{zoom:t?.75:1},children:(0,o.jsx)(A,{})}),(0,o.jsxs)(s.default,{gap:64,style:{paddingBottom:t?48:96},children:[(0,o.jsx)(c.default,{align:"center",as:"h3",style:{opacity:.6},children:r("community.team")}),(0,o.jsx)(G,{})]})]})});e.s(["default",0,X],312518)},746632,e=>{e.v(t=>Promise.all(["static/chunks/17.-nb-iv-.k4.js"].map(t=>e.l(t))).then(()=>t(18474)))},602960,e=>{e.v(t=>Promise.all(["static/chunks/0k25w605zr~9v.js","static/chunks/0w4e1gyc~w3gl.js"].map(t=>e.l(t))).then(()=>t(567574)))}]);
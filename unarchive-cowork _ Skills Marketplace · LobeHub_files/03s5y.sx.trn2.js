(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,728436,252856,e=>{"use strict";var a=e.i(591479),t=e.i(184283);let l=t.keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
  100% {
    opacity: 1;
  }
`,s=(0,t.createStaticStyles)(({css:e,cssVar:a})=>({active:e`
      background: ${a.colorFillSecondary};
      animation: ${l} 2s linear infinite;
    `,avatar:e`
      flex-shrink: 0;
    `,base:e`
      user-select: none;

      position: relative;

      overflow: hidden;

      border-radius: ${a.borderRadius};

      background: ${a.colorFillTertiary};
    `,text:e`
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: ${a.paddingXS};

      width: 100%;
    `}));e.s(["styles",0,s],252856);var i=e.i(843476);let r=({width:e="100%",height:l="1em",active:r,style:d,className:c})=>(0,i.jsx)(a.default,{className:(0,t.cx)(s.base,r&&s.active,c),height:l,style:d,variant:"filled",width:e});r.displayName="SkeletonBlock",e.s(["default",0,r],728436)},569852,e=>{"use strict";var a=e.i(252856),t=e.i(728436),l=e.i(843476),s=e.i(184283);let i=({active:e,shape:i="square",size:r,width:d,height:c,style:o,className:u,...n})=>{let y=r??40,f=d??y,m=c??y,h="circle"===i?"50%":s.cssVar.borderRadius;return(0,l.jsx)(t.default,{active:e,className:(0,s.cx)(a.styles.avatar,u),height:m,style:{borderRadius:h,...o},width:f,...n})};i.displayName="SkeletonAvatar",e.s(["default",0,i])},363688,e=>{"use strict";var a=e.i(206868),t=e.i(728436),l=e.i(843476);let s=3,i=({active:e,rows:i=s,gap:r,width:d,height:c,fontSize:o,lineHeight:u,style:n,className:y,...f})=>{let m=Math.max(i,1),h=o??14,p=(c||Math.round(h*(u??1.6)))-h,v=Array.isArray(d)?d:null,x={gap:r,...n};return(0,l.jsx)(a.default,{className:y,gap:r||p,style:x,width:"100%",...f,children:Array.from({length:m}).map((a,s)=>(0,l.jsx)(t.default,{active:e,height:h,width:v?v[s]??v.at(-1)??"100%":void 0!==d?d:s===m-1?"66%":"100%"},s))})};i.displayName="SkeletonParagraph",e.s(["default",0,i])},384050,e=>{"use strict";var a=e.i(728436),t=e.i(843476),l=e.i(184283);let s=({active:e,fontSize:s,lineHeight:i,height:r,width:d="60%",style:c,className:o,...u})=>{let n=i??1.6,y=void 0!==s?`${s}px`:l.cssVar.fontSize;return(0,t.jsx)(a.default,{active:e,className:o,height:r??`round(calc(${y} * ${1+(n-1)*.5}), 1px)`,width:d,style:{marginBlock:`round(calc(${y} * ${(n-1)*.25}), 1px)`,...c},...u})};s.displayName="SkeletonTitle",e.s(["default",0,s])},750362,e=>{"use strict";var a=e.i(206868),t=e.i(252856),l=e.i(569852),s=e.i(363688),i=e.i(384050),r=e.i(843476),d=e.i(184283);let c=({active:e,avatar:c=!1,title:o=!0,paragraph:u=!0,className:n,classNames:y,styles:f,style:m,width:h,height:p,gap:v=16,...x})=>{let g=!!u,b="object"==typeof c?c:void 0,j="object"==typeof o?o:void 0,S="object"==typeof u?u:void 0,N={...m,...f?.root,...void 0!==h?{width:h}:{},...void 0!==p?{height:p}:{}},k=b?.active??e,R=j?.active??e,$=S?.active??e;return(0,r.jsxs)(a.default,{horizontal:!0,align:g?"flex-start":"center",className:(0,d.cx)(n,y?.root),gap:v,style:N,width:"100%",...x,children:[!!c&&(0,r.jsx)(l.default,{...b,active:k,className:(0,d.cx)(t.styles.avatar,y?.avatar,b?.className),style:{...b?.style,...f?.avatar}}),(0,r.jsxs)(a.default,{gap:v,width:"100%",children:[!!o&&(0,r.jsx)(i.default,{...j,active:R,className:(0,d.cx)(y?.title,j?.className),style:{...j?.style,...f?.title}}),g&&(0,r.jsx)(s.default,{...S,active:$,className:(0,d.cx)(y?.paragraph,S?.className),style:{...S?.style,...f?.paragraph}})]})]})};c.displayName="Skeleton",e.s(["default",0,c])},505650,e=>{"use strict";var a=e.i(728436),t=e.i(843476),l=e.i(184283);let s={default:36,large:46,small:28},i=({active:e,block:i=!1,shape:r="default",size:d="default",width:c,height:o,style:u,className:n,...y})=>{let f=d??"default",m=o??s[f],h=c??(i?"100%":"circle"===r?m:80),p={default:l.cssVar.borderRadius,large:l.cssVar.borderRadiusLG,small:l.cssVar.borderRadiusSM};return(0,t.jsx)(a.default,{active:e,className:n,height:m,style:{borderRadius:"circle"===r?"50%":"round"===r?`calc(${l.cssVar.borderRadius} * 2)`:p[f],...u},width:h,...y})};i.displayName="SkeletonButton",e.s(["default",0,i])},956392,e=>{"use strict";var a=e.i(206868),t=e.i(728436),l=e.i(843476),s=e.i(184283);let i=1,r={large:28,middle:22,small:20},d={large:64,middle:48,small:36},c=({active:e,className:c,count:o=i,gap:u,height:n,size:y="middle",style:f,width:m,...h})=>{let p=void 0!==u?`${u}px`:s.cssVar.paddingXS,v=Math.max(o,1),x=n??r[y],g=Array.isArray(m)?m:null,b=d[y],j={large:s.cssVar.borderRadius,middle:s.cssVar.borderRadiusSM,small:s.cssVar.borderRadiusXS};return(0,l.jsx)(a.default,{horizontal:!0,className:c,style:{gap:p,...f},...h,children:Array.from({length:v}).map((a,s)=>(0,l.jsx)(t.default,{active:e,height:x,width:g?g[s]??g.at(-1)??b:void 0!==m?m:b,style:{borderRadius:j[y]}},s))})};c.displayName="SkeletonTags",e.s(["default",0,c])}]);
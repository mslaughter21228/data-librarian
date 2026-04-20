(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,581461,e=>{"use strict";var t=e.i(529273),a=e.i(216795),i=e.i(956283),r=e.i(836877),o=e.i(152701),l=e.i(235917),n=e.i(605019),s=e.i(830341),d=e.i(271645),c=e.i(843476),u=e.i(184283),p=e.i(558860);let m=({children:e,disableDestroyOnInvalidTrigger:m=!1,disableZeroOriginGuard:h=!1,layoutAnimation:g=!1,popupContainer:y,...x})=>{let[{handle:f,key:b},M]=(0,d.useState)(()=>({handle:p.Tooltip.createHandle(),key:0})),v=(0,d.useRef)(null),j=(0,d.useCallback)(()=>{v.current=null,M(({key:e})=>({handle:p.Tooltip.createHandle(),key:e+1}))},[]),k=(0,d.useCallback)(e=>{v.current?.onOpenChange?.(e)},[]),w=(0,i.useAppElement)(),N=(0,a.useFloatingLayer)()??w;return(0,s.useDestroyOnInvalidActiveTriggerElement)(f.store,j,{enabled:!m}),(0,s.useHidePopupWhenPositionerAtOrigin)(f.store,{enabled:!h}),(0,c.jsx)(t.TooltipGroupHandleContext,{value:f,children:(0,c.jsxs)(t.TooltipGroupPropsContext,{value:x,children:[e,(0,c.jsx)(p.Tooltip.Root,{handle:f,onOpenChange:k,children:({payload:e})=>{let t=e??null;if(v.current=t,!t||null==t.title&&!t.hotkey)return null;let a=t.arrow??!1,i=t.placement??"top",s=r.placementMap[i]??r.placementMap.top,d={arrow:(0,u.cx)(l.styles.arrow,t.classNames?.arrow),popup:(0,u.cx)(l.styles.popup,t.className,t.classNames?.root,t.classNames?.container),positioner:l.styles.positioner,viewport:(0,u.cx)(l.styles.viewport,t.classNames?.content)},m=(()=>{if("function"!=typeof t.styles)return t.styles})(),h={arrow:m?.arrow,popup:{...m?.root,...m?.container},positioner:{zIndex:t.zIndex??114514},viewport:m?.content},x=g?(0,c.jsx)(p.Tooltip.Viewport,{className:d.viewport,style:h.viewport,children:(0,c.jsx)(n.default,{hotkey:t.hotkey,hotkeyProps:t.hotkeyProps,title:t.title})}):(0,c.jsx)("div",{className:d.viewport,style:h.viewport,children:(0,c.jsx)(n.default,{hotkey:t.hotkey,hotkeyProps:t.hotkeyProps,title:t.title})}),f=(0,c.jsx)(p.Tooltip.Positioner,{align:s.align,className:d.positioner,"data-layout-animation":g||void 0,"data-placement":i,side:s.side,sideOffset:a?8:6,style:h.positioner,...t.positionerProps,children:(0,c.jsxs)(p.Tooltip.Popup,{className:d.popup,"data-layout-animation":g||void 0,style:h.popup,...t.popupProps,children:[a&&(0,c.jsx)(p.Tooltip.Arrow,{className:d.arrow,style:h.arrow,children:o.TooltipArrowIcon}),x]})}),b=t.popupContainer??y??N;return b?(0,c.jsx)(p.Tooltip.Portal,{container:b,children:f}):null}},b)]})})};m.displayName="TooltipGroup",e.s(["default",0,m])},73575,549793,825398,169382,e=>{"use strict";var t=e.i(58125),a=e.i(184283),i=e.i(225913);let r=(0,a.createStaticStyles)(({css:e,cssVar:a})=>({actionsHidden:e`
      cursor: pointer;

      position: absolute;
      z-index: 1;
      inset-block-start: 0;
      inset-inline-end: 0;

      opacity: 0;
    `,actionsVisible:e`
      cursor: pointer;

      position: absolute;
      z-index: 1;
      inset-block-start: 0;
      inset-inline-end: 0;

      opacity: 1;
    `,borderless:t.staticStylish.variantBorderlessWithoutHover,filled:e`
      ${t.staticStylish.variantOutlinedWithoutHover};
      ${t.staticStylish.variantFilledWithoutHover};
    `,image:e`
      display: flex;
      align-items: center;
      justify-content: center;

      width: auto;
      height: auto;
    `,mask:e`
      ${t.staticStylish.blur};
      backdrop-filter: blur(8px);
    `,outlined:t.staticStylish.variantOutlinedWithoutHover,preview:e`
      .${"ant"}-image-preview-mask {
        background: color-mix(in srgb, ${a.colorBgLayout} 90%, transparent);
      }

      .${"ant"}-image-preview-close {
        color: ${a.colorTextDescription};
        background: ${a.colorBgContainer};
        box-shadow: ${a.boxShadowTertiary};

        svg {
          stroke: ${a.colorTextDescription};
        }

        &:hover {
          color: ${a.colorText};
          background: ${a.colorBgContainer};

          svg {
            stroke: ${a.colorText};
          }
        }
      }

      .${"ant"}-image-preview-img {
        width: 100%;
      }

      .${"ant"}-image-preview-switch {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 32px;
        height: 32px;
        padding: 0;

        color: ${a.colorTextDescription};

        background: ${a.colorBgContainer};
        box-shadow: ${a.boxShadowTertiary};

        svg {
          transform: scale(0.75);
        }

        &:hover {
          color: ${a.colorText};
          background: ${a.colorBgContainer};
        }
      }

      .${"ant"}-image-preview-switch-disabled {
        display: none;
      }

      .ant-image-preview-progress {
        color: ${a.colorTextDescription};
      }

      img {
        min-width: 100%;
      }
    `,root:e`
      cursor: pointer;
      user-select: none;

      position: relative;

      overflow: hidden;

      width: fit-content;
      border-radius: ${a.borderRadius};

      line-height: 1;

      .${"ant"}-image-cover {
        display: none !important;
      }

      &:hover {
        .actions-hidden {
          opacity: 1;
        }
      }
    `,toolbar:e`
      ${t.staticStylish.variantOutlinedWithoutHover};
      padding: 4px;
      border-color: ${a.colorFillTertiary};
      border-radius: ${a.borderRadiusLG};
    `,wrapper:e`
      position: relative;
      overflow: hidden;
      max-width: 100%;
      height: auto;
    `})),o=(0,i.cva)(r.root,{defaultVariants:{variant:"filled"},variants:{variant:{filled:r.filled,outlined:r.outlined,borderless:r.borderless}}});e.s(["FALLBACK_DARK",0,"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjM0IzQjNCIi8+CjxwYXRoIGQ9Ik0xNTYuODg4IDkxLjAwMkgxMDAuMTEyQzk1LjYzMjkgOTEuMDAyIDkyLjAwMTUgOTQuNjMzNCA5Mi4wMDE1IDk5LjExMjdWMTU1Ljg4OEM5Mi4wMDE1IDE2MC4zNjcgOTUuNjMyOSAxNjMuOTk5IDEwMC4xMTIgMTYzLjk5OUgxNTYuODg4QzE2MS4zNjcgMTYzLjk5OSAxNjQuOTk4IDE2MC4zNjcgMTY0Ljk5OCAxNTUuODg4Vjk5LjExMjdDMTY0Ljk5OCA5NC42MzM0IDE2MS4zNjcgOTEuMDAyIDE1Ni44ODggOTEuMDAyWiIgc3Ryb2tlPSIjNjI2MjYyIiBzdHJva2Utd2lkdGg9IjguMTEwNzciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTY0Ljk5OCAxMzkuNjY4TDE1Mi40ODQgMTI3LjE1M0MxNTAuOTYyIDEyNS42MzIgMTQ4LjkgMTI0Ljc3OCAxNDYuNzQ5IDEyNC43NzhDMTQ0LjU5OSAxMjQuNzc4IDE0Mi41MzYgMTI1LjYzMiAxNDEuMDE1IDEyNy4xNTNMMTA0LjE2OCAxNjRNMTE2LjMzNCAxMjMuNDQ1QzEyMC44MTMgMTIzLjQ0NSAxMjQuNDQ1IDExOS44MTQgMTI0LjQ0NSAxMTUuMzM0QzEyNC40NDUgMTEwLjg1NSAxMjAuODEzIDEwNy4yMjQgMTE2LjMzNCAxMDcuMjI0QzExMS44NTUgMTA3LjIyNCAxMDguMjIzIDExMC44NTUgMTA4LjIyMyAxMTUuMzM0QzEwOC4yMjMgMTE5LjgxNCAxMTEuODU1IDEyMy40NDUgMTE2LjMzNCAxMjMuNDQ1WiIgc3Ryb2tlPSIjNjI2MjYyIiBzdHJva2Utd2lkdGg9IjguMTEwNzciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K","FALLBACK_LIGHT",0,"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjRUNFQ0VDIi8+CjxwYXRoIGQ9Ik0xNTYuODg4IDkxLjAwMkgxMDAuMTEyQzk1LjYzMjkgOTEuMDAyIDkyLjAwMTUgOTQuNjMzNCA5Mi4wMDE1IDk5LjExMjdWMTU1Ljg4OEM5Mi4wMDE1IDE2MC4zNjcgOTUuNjMyOSAxNjMuOTk5IDEwMC4xMTIgMTYzLjk5OUgxNTYuODg4QzE2MS4zNjcgMTYzLjk5OSAxNjQuOTk4IDE2MC4zNjcgMTY0Ljk5OCAxNTUuODg4Vjk5LjExMjdDMTY0Ljk5OCA5NC42MzM0IDE2MS4zNjcgOTEuMDAyIDE1Ni44ODggOTEuMDAyWiIgc3Ryb2tlPSIjRDdEN0Q3IiBzdHJva2Utd2lkdGg9IjguMTEwNzciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTY0Ljk5OCAxMzkuNjY4TDE1Mi40ODQgMTI3LjE1M0MxNTAuOTYyIDEyNS42MzIgMTQ4LjkgMTI0Ljc3OCAxNDYuNzQ5IDEyNC43NzhDMTQ0LjU5OSAxMjQuNzc4IDE0Mi41MzYgMTI1LjYzMiAxNDEuMDE1IDEyNy4xNTNMMTA0LjE2OCAxNjRNMTE2LjMzNCAxMjMuNDQ1QzEyMC44MTMgMTIzLjQ0NSAxMjQuNDQ1IDExOS44MTQgMTI0LjQ0NSAxMTUuMzM0QzEyNC40NDUgMTEwLjg1NSAxMjAuODEzIDEwNy4yMjQgMTE2LjMzNCAxMDcuMjI0QzExMS44NTUgMTA3LjIyNCAxMDguMjIzIDExMC44NTUgMTA4LjIyMyAxMTUuMzM0QzEwOC4yMjMgMTE5LjgxNCAxMTEuODU1IDEyMy40NDUgMTE2LjMzNCAxMjMuNDQ1WiIgc3Ryb2tlPSIjRDdEN0Q3IiBzdHJva2Utd2lkdGg9IjguMTEwNzciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K","styles",0,r,"variants",0,o],73575);var l=e.i(271645),n=e.i(843476);let s=(0,l.memo)(({children:e,visible:t})=>{let a=(0,l.useRef)(null);return(0,l.useEffect)(()=>{if(!a.current)return;let e=e=>{e.preventDefault()};t?a.current.addEventListener("wheel",e,{passive:!1}):a.current.removeEventListener("wheel",e)},[t]),(0,n.jsx)("div",{ref:a,children:e})});e.s(["default",0,s],549793);var d=e.i(206868),c=e.i(581461),u=e.i(149167),p=e.i(28662);let m=async(e,t)=>new Promise((a,i)=>{try{let i=document.createElement("a");i.href=e,i.download=t,i.style.display="none",document.body.append(i),i.click(),i.remove(),a()}catch(e){i(e)}});var h={"image.copy":"Copy","image.copyFailed":"Copy Failed","image.copySuccess":"Copy Success","image.download":"Download","image.downloadFailed":"Download Failed","image.downloadSuccess":"Download Success","image.flipHorizontal":"Flip Horizontal","image.flipVertical":"Flip Vertical","image.rotateLeft":"Rotate Left","image.rotateRight":"Rotate Right","image.zoomIn":"Zoom In","image.zoomOut":"Zoom Out"};let g=async e=>{let t=(e.type||"").toLowerCase();return"image/png"===t||"image/svg+xml"===t?{[t]:e}:{"image/png":await new Promise((t,a)=>{let i=new Image,r=URL.createObjectURL(e);i.onload=()=>{URL.revokeObjectURL(r);let e=document.createElement("canvas");e.width=i.naturalWidth,e.height=i.naturalHeight;let o=e.getContext("2d");o?(o.drawImage(i,0,0),e.toBlob(e=>{e?t(e):a(Error("Failed to convert to PNG"))},"image/png",1)):a(Error("Canvas context not available"))},i.onerror=()=>{URL.revokeObjectURL(r),a(Error("Failed to load image"))},i.src=r})}};var y=e.i(998573),x=e.i(508734),f=e.i(484479),f=f,b=e.i(456420);let M=(0,b.default)("square-centerline-dashed-horizontal",[["path",{d:"M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3",key:"1i73f7"}],["path",{d:"M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3",key:"saxlbk"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 14v2",key:"8jcxud"}],["path",{d:"M12 8v2",key:"1woqiv"}],["path",{d:"M12 2v2",key:"tus03m"}]]),v=(0,b.default)("square-centerline-dashed-vertical",[["path",{d:"M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3",key:"14bfxa"}],["path",{d:"M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3",key:"14rx03"}],["path",{d:"M4 12H2",key:"rhcxmi"}],["path",{d:"M10 12H8",key:"s88cx1"}],["path",{d:"M16 12h-2",key:"10asgb"}],["path",{d:"M22 12h-2",key:"14jgyd"}]]),j=(0,b.default)("rotate-ccw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]),k=(0,b.default)("rotate-cw",[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]);e.s(["RotateCw",0,k],825398);let w=(0,b.default)("zoom-in",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]),N=(0,b.default)("zoom-out",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]),T=(0,l.memo)(({children:e,info:t,minScale:a,maxScale:i})=>{let{t:o}=(0,p.useTranslation)(h),[s,b]=(0,l.useState)(null),[T,I]=(0,l.useState)(!1),[C,S]=(0,l.useState)(!1),{transform:{scale:z},actions:{onFlipY:L,onFlipX:D,onRotateLeft:A,onRotateRight:E,onZoomOut:O,onZoomIn:$},image:{url:R}}=t,B=(0,l.useCallback)(async()=>{S(!0);try{let e,t=await (await fetch(R,{mode:"cors"})).blob(),a=URL.createObjectURL(t),i=(e=>{try{let t=new URL(e).pathname.match(/\/([^/]+)$/);return t?decodeURIComponent(t[1]):"image"}catch{return"image"}})(R),r=(e=t.type,({"image/svg+xml":"svg","image/png":"png","image/jpeg":"jpg","image/jpg":"jpg","image/webp":"webp","image/gif":"gif"})[e?.toLowerCase()]||e?.split("/")[1]?.split("+")[0]||"png");i.includes(".")?i.endsWith(".svg+xml")&&(i=i.replace(/\.svg\+xml$/i,".svg")):i=`${i}.${r}`,await m(a,i),URL.revokeObjectURL(a),y.message.success(o("image.downloadSuccess"))}catch{y.message.error(o("image.downloadFailed"))}finally{S(!1)}},[R,o]),P=(0,l.useCallback)(async()=>{I(!0);try{let e=await g(await (await fetch(R,{mode:"cors"})).blob());await navigator.clipboard.write([new ClipboardItem(e)]),y.message.success(o("image.copySuccess"))}catch{y.message.error(o("image.copyFailed"))}finally{I(!1)}},[R,o]);return(0,n.jsx)(c.default,{popupContainer:s??void 0,children:(0,n.jsxs)(d.default,{horizontal:!0,className:r.toolbar,gap:4,ref:b,children:[(0,n.jsx)(u.default,{icon:M,title:o("image.flipHorizontal"),onClick:D}),(0,n.jsx)(u.default,{icon:v,title:o("image.flipVertical"),onClick:L}),(0,n.jsx)(u.default,{icon:j,title:o("image.rotateLeft"),onClick:A}),(0,n.jsx)(u.default,{icon:k,title:o("image.rotateRight"),onClick:E}),(0,n.jsx)(u.default,{disabled:z===a,icon:N,title:o("image.zoomOut"),onClick:O}),(0,n.jsx)(u.default,{disabled:z===i,icon:w,title:o("image.zoomIn"),onClick:$}),(0,n.jsx)(u.default,{icon:x.Copy,loading:T,title:o("image.copy"),onClick:P}),(0,n.jsx)(u.default,{icon:f.default,loading:C,title:o("image.download"),onClick:B}),e]})})});e.s(["default",0,T],169382)},677810,e=>{"use strict";var t=e.i(492435),a=e.i(73575),i=e.i(549793),r=e.i(169382),o=e.i(271645),l=e.i(843476),n=e.i(184283),s=e.i(263676);e.s(["default",0,e=>{let[d,c]=(0,o.useState)(!1);return(0,o.useMemo)(()=>{if(!1===e)return e;let{onVisibleChange:o,onOpenChange:u,minScale:p=.32,maxScale:m=32,toolbarAddon:h,rootClassName:g,imageRender:y,toolbarRender:x,actionsRender:f,...b}=!0===e?{}:e||{};return{actionsRender:f||((e,t)=>{let a=(0,l.jsx)(r.default,{info:t,maxScale:m,minScale:p,children:h});return x?x(a,t):a}),closeIcon:(0,l.jsx)(t.default,{color:"#fff",icon:s.X}),imageRender:(e,t)=>{let a=(0,l.jsx)(i.default,{visible:d,children:e});return y?y(a,t):a},maxScale:m,minScale:p,onOpenChange:e=>{c(e),u?.(e),o?.(e,!e)},rootClassName:(0,n.cx)(a.styles.preview,g),styles:{mask:{backdropFilter:"blur(8px)"}},...b}},[e,d,a.styles])}])},560844,e=>{"use strict";var t=e.i(839598);e.s(["Image",()=>t.default])},981339,e=>{"use strict";var t=e.i(185793);e.s(["Skeleton",()=>t.default])},233073,e=>{"use strict";var t=e.i(206868),a=e.i(73575),i=e.i(677810),r=e.i(271645),o=e.i(843476),l=e.i(560844),n=e.i(981339),s=e.i(184283),d=e.i(639007);let c=(0,r.memo)(({ref:e,style:r,preview:c,isLoading:u,maxHeight:p="100%",maxWidth:m="100%",minHeight:h,minWidth:g,actions:y,className:x,alwaysShowActions:f,variant:b="filled",objectFit:M="cover",classNames:v,styles:j,onClick:k,width:w,height:N,...T})=>{let{isDarkMode:I}=(0,d.useThemeMode)(),C=f?a.styles.actionsVisible:a.styles.actionsHidden,S=(0,i.default)(c);return u?(0,o.jsx)("div",{onClick:k,children:(0,o.jsx)(n.Skeleton.Avatar,{active:!0,style:{borderRadius:s.cssVar.borderRadius,height:N,maxHeight:p,maxWidth:m,minHeight:h,minWidth:g,width:w}})}):(0,o.jsxs)(t.default,{className:(0,s.cx)((0,a.variants)({variant:b}),x),ref:e,style:r,children:[y&&(0,o.jsx)("div",{className:(0,s.cx)(C,f?"":"actions-hidden"),children:y}),(0,o.jsx)(l.Image,{className:(0,s.cx)(a.styles.image,v?.image),fallback:I?a.FALLBACK_DARK:a.FALLBACK_LIGHT,height:N,loading:"lazy",preview:!1!==c&&S,width:w,classNames:{root:(0,s.cx)(a.styles.wrapper,v?.wrapper)},style:{maxHeight:p,maxWidth:m,minHeight:h,minWidth:g,objectFit:M||"cover",...j?.image},styles:{root:j?.wrapper},onClick:k,...T})]})});c.displayName="Image",e.s(["default",0,c])},989106,e=>{"use strict";var t=e.i(492435),a=e.i(73575),i=e.i(549793),r=e.i(169382),o=e.i(271645),l=e.i(843476),n=e.i(184283),s=e.i(263676);e.s(["default",0,e=>{let[d,c]=(0,o.useState)(!1);return(0,o.useMemo)(()=>{if(!1===e)return e;let{onVisibleChange:o,onOpenChange:u,minScale:p=.32,maxScale:m=32,toolbarAddon:h,rootClassName:g,imageRender:y,toolbarRender:x,...f}=!0===e?{}:e||{};return{actionsRender:(e,t)=>{let a=(0,l.jsx)(r.default,{info:t,maxScale:m,minScale:p,children:h});return x?x(a,t):a},closeIcon:(0,l.jsx)(t.default,{color:"#fff",icon:s.X}),imageRender:(e,t)=>{let a=(0,l.jsx)(i.default,{visible:d,children:e});return y?y(a,t):a},maxScale:m,minScale:p,onOpenChange:(e,t)=>{c(e),u?.(e,t),o?.(e,!e,t.current)},rootClassName:(0,n.cx)(a.styles.preview,g),...f}},[e,d,a.styles])}])},414990,e=>{"use strict";var t=e.i(989106),a=e.i(271645),i=e.i(843476);let{PreviewGroup:r}=e.i(560844).Image,o=(0,a.memo)(({items:e,children:a,enable:o=!0,preview:l})=>{let n=(0,t.default)(l);return o?(0,i.jsx)(r,{items:e,preview:n,children:a}):a});o.displayName="PreviewGroup",e.s(["default",0,o])},869712,e=>{"use strict";var t=e.i(233073),a=e.i(414990);let i=t.default;i.PreviewGroup=a.default,e.s(["default",0,i])},633500,e=>{"use strict";var t=e.i(869712),a=e.i(843476);let i=({style:e,alt:i="img",...r})=>(0,a.jsx)(t.default,{alt:i,style:{borderRadius:"calc(var(--lobe-markdown-border-radius) * 1px)",marginBlock:"calc(var(--lobe-markdown-margin-multiple) * 1em)",...e},...r});i.displayName="MdxImage",e.s(["default",0,i])},450156,e=>{"use strict";var t=e.i(206868),a=e.i(74152),i=e.i(709939),r=e.i(266894),o=e.i(58125),l=e.i(184283),n=e.i(225913);let s=(0,l.createStaticStyles)(({css:e,cssVar:t})=>({borderless:o.staticStylish.variantBorderlessWithoutHover,filled:o.staticStylish.variantFilledWithoutHover,hightlight:e`
      overflow: auto hidden;
      flex: 1;
      height: 100%;
      padding: 0;

      pre {
        display: flex;
        align-items: center;
        height: 100%;
      }
    `,outlined:o.staticStylish.variantOutlinedWithoutHover,root:e`
      position: relative;

      overflow: hidden;

      max-width: 100%;
      height: 38px;
      padding-block: 0;
      padding-inline: 12px 8px;
      border-radius: ${t.borderRadius};
    `,shadow:o.staticStylish.shadow})),d=(0,n.cva)(s.root,{defaultVariants:{shadow:!1,variant:"filled"},variants:{variant:{filled:s.filled,outlined:s.outlined,borderless:s.borderless},shadow:{false:null,true:s.shadow}}});var c=e.i(843476);let u=({ref:e,prefix:o,language:n="tsx",children:u,copyable:p=!0,variant:m="filled",spotlight:h,shadow:g,className:y,...x})=>{let f=u.trim();return(0,c.jsxs)(t.default,{horizontal:!0,align:"center",className:(0,l.cx)(d({shadow:g,variant:m}),y),"data-code-type":"highlighter",gap:8,ref:e,...x,children:[h&&(0,c.jsx)(r.default,{}),(0,c.jsx)(a.default,{className:s.hightlight,language:n,children:[o,f].filter(Boolean).join(" ")}),p&&(0,c.jsx)(i.default,{content:f,size:"small"})]})};u.displayName="Snippet",e.s(["default",0,u],450156)},28662,e=>{"use strict";var t=e.i(382162),a=e.i(271645);e.s(["useTranslation",0,e=>{let{t:i,locale:r}=(0,t.useI18n)();return{locale:r,t:(0,a.useMemo)(()=>e?t=>{let a=i(t),r=e[t];return a===t&&r?r:a}:i,[i,e])}}])},343420,e=>{"use strict";let t=(0,e.i(456420).default)("info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);e.s(["default",0,t])},452019,e=>{"use strict";e.s(["isPrototype",0,function(e){let t=e?.constructor;return e===("function"==typeof t?t.prototype:Object.prototype)}])},986253,e=>{"use strict";let t=(0,e.i(456420).default)("chevron-right",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);e.s(["default",0,t])},867927,e=>{"use strict";var t=e.i(986253);e.s(["ChevronRight",()=>t.default])},737623,e=>{"use strict";let t=(0,e.i(456420).default)("play",[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]);e.s(["default",0,t])},57095,e=>{"use strict";var t=e.i(737623);e.s(["PlayIcon",()=>t.default])},619928,560972,e=>{"use strict";let t=(0,e.i(456420).default)("ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);e.s(["default",0,t],560972),e.s(["MoreHorizontalIcon",0,t],619928)},757871,e=>{"use strict";var t=e.i(149167),a=e.i(184283),i=e.i(225913);let r=(0,a.createStaticStyles)(({css:e,cssVar:t})=>({compact:e`
      &.${"ant"}-tabs {
        .${"ant"}-tabs-tab {
          margin: 4px;

          + [class*='ant-tabs-tab'] {
            margin: 4px;
          }
        }
      }
    `,dropdown:e`
      .${"ant"}-tabs-dropdown-menu {
        padding: 4px;
        border: 1px solid ${t.colorBorderSecondary};

        .${"ant"}-tabs-dropdown-menu-item {
          border-radius: ${t.borderRadius};
        }
      }
    `,hideHolder:e`
      &.${"ant"}-tabs {
        .${"ant"}-tabs-content-holder {
          display: none;
        }

        .${"ant"}-tabs-nav {
          margin: 0;

          &::before {
            display: none;
          }
        }
      }
    `,margin:e`
      &.${"ant"}-tabs {
        .${"ant"}-tabs-tab {
          margin: 8px;

          + .${"ant"}-tabs-tab {
            margin: 8px;
          }
        }
      }
    `,point:e`
      &.${"ant"}-tabs {
        &.${"ant"}-tabs-top {
          .${"ant"}-tabs-ink-bar {
            width: 8px !important;
            height: 4px;
            border-start-start-radius: 4px;
            border-start-end-radius: 4px;
          }
        }

        &.${"ant"}-tabs-bottom {
          .${"ant"}-tabs-ink-bar {
            width: 8px !important;
            height: 4px;
            border-end-start-radius: 4px;
            border-end-end-radius: 4px;
          }
        }

        &.${"ant"}-tabs-left {
          .${"ant"}-tabs-ink-bar {
            width: 4px;
            height: 8px !important;
            border-start-start-radius: 4px;
            border-end-start-radius: 4px;
          }
        }

        &.${"ant"}-tabs-right {
          .${"ant"}-tabs-ink-bar {
            width: 4px;
            height: 8px !important;
            border-start-end-radius: 4px;
            border-end-end-radius: 4px;
          }
        }
      }
    `,root:e`
      &.${"ant"}-tabs {
        .${"ant"}-tabs-tab {
          padding-block: 8px;
          padding-inline: 12px;
          color: ${t.colorTextSecondary};
          transition: background-color 100ms ease-out;

          &:hover {
            border-radius: ${t.borderRadius};
            color: ${t.colorText};
            background: ${t.colorFillTertiary};
          }
        }
      }
    `,rounded:e`
      &.${"ant"}-tabs {
        &.${"ant"}-tabs-top {
          .${"ant"}-tabs-ink-bar {
            height: 3px;
            border-start-start-radius: 3px;
            border-start-end-radius: 3px;
          }
        }

        &.${"ant"}-tabs-bottom {
          .${"ant"}-tabs-ink-bar {
            height: 3px;
            border-end-start-radius: 3px;
            border-end-end-radius: 3px;
          }
        }

        &.${"ant"}-tabs-left {
          .${"ant"}-tabs-ink-bar {
            width: 3px;
            border-start-start-radius: 3px;
            border-end-start-radius: 3px;
          }
        }

        &.${"ant"}-tabs-right {
          .${"ant"}-tabs-ink-bar {
            width: 3px;
            border-start-end-radius: 3px;
            border-end-end-radius: 3px;
          }
        }
      }
    `})),o=(0,i.cva)(r.root,{defaultVariants:{compact:!1,underlined:!1,variant:"rounded"},variants:{variant:{square:null,rounded:r.rounded,point:r.point},compact:{false:r.margin,true:r.compact},underlined:{false:r.hideHolder,true:null}}});var l=e.i(843476),n=e.i(721369),n=n,s=e.i(619928);let d=({className:e,compact:i,variant:d="rounded",items:c,...u})=>{let p=c?.some(e=>!!e.children);return(0,l.jsx)(n.default,{className:(0,a.cx)(o({compact:i,underlined:p,variant:d}),e),items:c,...u,classNames:{...u?.classNames,popup:{root:r.dropdown,...u?.classNames?.popup}},more:{icon:(0,l.jsx)(t.default,{icon:s.MoreHorizontalIcon}),...u?.more}})};d.displayName="Tabs",e.s(["default",0,d],757871)},58687,e=>{"use strict";var t=e.i(843476),a=e.i(113464),i=e.i(48608),r=e.i(361902),o=e.i(861749),l=e.i(271645);let n=(0,l.createContext)({isLoading:!0,setFinished:()=>{},setToc:()=>{},toc:[]});e.s(["TocProvider",0,({children:e})=>{let[a,i]=(0,l.useState)(!0),[r,o]=(0,l.useState)([]);return(0,t.jsx)(n.Provider,{value:{isLoading:a,setFinished:()=>i(!1),setToc:e=>{o(e)},toc:r},children:e})},"createTOCTree",0,function(e){let t=[],l=1;for(let n of function(...e){let t=e[e.length-1],l=function(e){let t=[];for(let a=0;a<e.length;a++){let i=e[a];if((0,r.isArrayLikeObject)(i))for(let e=0;e<i.length;e++)t.push(i[e])}return t}(e);return(0,r.isArrayLikeObject)(t)||null==t?[...new Set(l)]:(0,a.uniqBy)(l,(0,i.ary)((0,o.iteratee)(t),1))}(e,"href")){let e={href:n.href,key:l,title:n.title},a=t.at(-1);2===n.level?t.push({...e,children:[]}):a&&a.children?a.children.push(e):t.push(e),l++}return t},"useToc",0,()=>(0,l.useContext)(n)],58687)},975409,e=>{"use strict";var t=e.i(757023),a=e.i(654128),i=e.i(206868),r=e.i(709939),o=e.i(185345),l=e.i(619963),n=e.i(302573),s=e.i(767093),d=e.i(149167),c=e.i(585151),u=e.i(271645),p=e.i(843476),m=e.i(184283),h=e.i(716327),g=e.i(867927);let y=(0,u.memo)(({fileName:e,language:t,showLanguage:a})=>a?(0,p.jsxs)(i.default,{horizontal:!0,align:"center",className:"languageTitle",flex:1,gap:4,justify:"flex-start",paddingInline:8,children:[(0,p.jsx)(c.default,{fallbackUnknownType:!1,filename:e||t,size:18,type:"file",variant:"raw"}),(0,p.jsx)(n.default,{ellipsis:!0,fontSize:13,children:e||"Mermaid"})]}):null,(e,t)=>e.fileName===t.fileName&&e.language===t.language&&e.showLanguage===t.showLanguage),x=(0,u.memo)(({showLanguage:e,styles:t,classNames:a,content:o,children:n,className:c,copyable:x,actionsRender:f,style:b,variant:M,shadow:v,language:j="mermaid",fileName:k,defaultExpand:w=!0,...N})=>{let[T,I]=(0,u.useState)(w),C=(0,u.useRef)(o);(0,u.useEffect)(()=>{C.current=o},[o]);let S=(0,u.useCallback)(()=>C.current,[]),z=(0,u.useMemo)(()=>x?(0,p.jsx)(r.default,{content:S,size:"small"}):null,[x,S]),L=(0,u.useMemo)(()=>f?f({actionIconSize:"small",content:o,getContent:S,originalNode:z}):z,[f,o,S,z]),D=(0,u.useCallback)(()=>{I(e=>!e)},[]);return(0,p.jsxs)(i.default,{className:(0,m.cx)((0,l.variants)({shadow:v,variant:M}),c),"data-code-type":"mermaid",style:b,...N,children:[(0,p.jsxs)(i.default,{horizontal:!0,align:"center",className:(0,m.cx)((0,l.headerVariants)({variant:M}),a?.header),justify:"space-between",style:t?.header,onClick:D,children:[(0,p.jsx)(y,{fileName:k,language:j,showLanguage:e}),(0,p.jsxs)(i.default,{horizontal:!0,align:"center",flex:"none",gap:4,onClick:s.stopPropagation,children:[(0,p.jsx)(i.default,{horizontal:!0,align:"center",className:"panel-actions",flex:"none",gap:4,children:L}),(0,p.jsx)(d.default,{icon:T?h.ChevronDown:g.ChevronRight,size:"small",onClick:D})]})]}),(0,p.jsx)(i.default,{className:(0,m.cx)((0,l.bodyVariants)({expand:T}),a?.body),style:t?.body,children:n})]})});var f=e.i(869712);let b=[{displayName:"Lobe Theme",id:"lobe-theme"},{background:"#fbf9ff",displayName:"Mermaid Default",id:"default"},{background:"#fffcf8",displayName:"Mermaid Base",id:"base"},{background:"#000",displayName:"Mermaid Dark",id:"dark"},{background:"#f9ffeb",displayName:"Mermaid Forest",id:"forest"},{background:"#fff",displayName:"Mermaid Neutral",id:"neutral"}];var M=e.i(168726);let v=new Map,j=null,k=()=>"u"<typeof window?Promise.resolve(null):(j||(j=e.A(695802).then(e=>e.default)),j),w=(e,t,a="strict")=>({fontFamily:e.fontFamilyCode,gantt:{useWidth:1920},securityLevel:a,startOnLoad:!1,theme:t||(e.isDarkMode?"dark":"neutral"),themeVariables:t?void 0:{errorBkgColor:e.colorTextDescription,errorTextColor:e.colorTextDescription,fontFamily:e.fontFamily,lineColor:e.colorTextSecondary,mainBkg:e.colorBgContainer,noteBkgColor:e.colorInfoBg,noteTextColor:e.colorInfoText,pie1:e.geekblue,pie2:e.colorWarning,pie3:e.colorSuccess,pie4:e.colorError,primaryBorderColor:e.colorBorder,primaryColor:e.colorBgContainer,primaryTextColor:e.colorText,secondaryBorderColor:e.colorInfoBorder,secondaryColor:e.colorInfoBg,secondaryTextColor:e.colorInfoText,tertiaryBorderColor:e.colorSuccessBorder,tertiaryColor:e.colorSuccessBg,tertiaryTextColor:e.colorSuccessText,textColor:e.colorText}});var N=e.i(851197),T=e.i(172345),I=e.i(248857);function C(e){return(0,T.kebabCase)((0,I.normalizeForCase)((0,N.deburr)(e)))}let S=(0,u.memo)(({children:e,className:t,fallbackClassName:a,ref:i,style:r,theme:o,variant:l})=>{let n="lobe-theme"===o||!o,s=(0,u.useMemo)(()=>{if(!n)return b.find(e=>e.id===o)?.background},[n,o]),d=((e,{id:t,theme:a,securityLevel:i})=>{let r=(0,m.useTheme)(),[o,l]=(0,u.useState)(""),n=(0,u.useMemo)(()=>w(r,a,i),[r.fontFamilyCode,r.isDarkMode,r.colorTextDescription,r.fontFamily,r.colorTextSecondary,r.colorBgContainer,r.colorInfoBg,r.colorInfoText,r.geekblue,r.colorWarning,r.colorSuccess,r.colorError,r.colorBorder,r.colorInfoBorder,r.colorSuccessBorder,r.colorSuccessBg,r.colorSuccessText,r.colorText,a,i]),s=(0,u.useMemo)(()=>{let i=e.length<1e4?e:M.Md5.hashStr(e);return[t,a||(r.isDarkMode?"d":"l"),i].filter(Boolean).join("-")},[e,t,r.isDarkMode,a]);return(0,u.useEffect)(()=>{let a=v.get(s);if(a)return void a.then(e=>{l(e)}).catch(()=>{});let i=(async()=>{try{let a=await k();if(!a)return"";if(await a.parse(e)){a.initialize(n);let{svg:i}=await a.render(t,e);return i}throw Error("Mermaid 语法无效")}catch(e){return console.error("Mermaid 解析错误:",e),""}})();if(v.set(s,i),v.size>500){let e=Math.floor(100);for(let t of Array.from(v.keys()).slice(0,e))v.delete(t)}i.then(e=>{v.get(s)===i&&l(e)}).catch(()=>{v.get(s)===i&&v.delete(s)})},[s,e,t,n]),o})(e??"",{id:C(`mermaid-${(0,u.useId)()}`),theme:n?void 0:o}),c=!d,[h,g]=(0,u.useState)();(0,u.useEffect)(()=>()=>{h&&URL.revokeObjectURL(h)},[h]),(0,u.useEffect)(()=>{if(c||!d)return;let e=d;if("u">typeof window&&"u">typeof navigator&&navigator.userAgent.includes("Firefox")){let t=new DOMParser().parseFromString(d,"image/svg+xml"),a=t.documentElement;if(a&&a.hasAttribute("viewBox")){let i=a.getAttribute("viewBox").split(" ");Array.isArray(i)&&4===i.length&&(a.setAttribute("width",i[2]),a.setAttribute("height",i[3])),e=new XMLSerializer().serializeToString(t)}}let t=new Blob([e],{type:"image/svg+xml"});g(URL.createObjectURL(t))},[c,d]);let y={background:"filled"===l?s:void 0,margin:0,minWidth:300,padding:16*("borderless"!==l),position:"relative",width:"100%",...r};return h?(0,p.jsx)(f.default,{alt:"mermaid",className:t,maxHeight:480,minWidth:300,objectFit:"contain",ref:i,src:h,style:y,variant:"borderless",width:"100%"}):(0,p.jsx)("div",{className:a,style:r,children:(0,p.jsx)("div",{style:{padding:16},children:"Loading..."})})});S.displayName="StaticMermaid";let z=(0,u.memo)(({children:e,className:t,fallbackClassName:a,ref:i,style:r,theme:o,variant:l})=>{let n="lobe-theme"===o||!o,s=(0,u.useMemo)(()=>{if(!n)return b.find(e=>e.id===o)?.background},[n,o]),d=((e,{enabled:t=!0,id:a,theme:i})=>{let r=(0,m.useTheme)(),[o,l]=(0,u.useState)(""),n=(0,u.useRef)(""),s=(0,u.useRef)(e),d=(0,u.useRef)(void 0),c=(0,u.useMemo)(()=>w(r,i),[r.fontFamilyCode,r.isDarkMode,r.colorTextDescription,r.fontFamily,r.colorTextSecondary,r.colorBgContainer,r.colorInfoBg,r.colorInfoText,r.geekblue,r.colorWarning,r.colorSuccess,r.colorError,r.colorBorder,r.colorInfoBorder,r.colorSuccessBorder,r.colorSuccessBg,r.colorSuccessText,r.colorText,i]);return(0,u.useEffect)(()=>{s.current=e},[e]),(0,u.useEffect)(()=>{if(!t){l(""),n.current="";let e=d.current;e&&clearTimeout(e);return}let e=s.current;if(e===n.current&&o)return;let i=d.current;return i&&clearTimeout(i),d.current=setTimeout(async()=>{let t=s.current;if(t===e)try{let e=await k();if(!e)return;if(await e.parse(t)){e.initialize(c);let{svg:i}=await e.render(a,t);s.current===t&&(l(i),n.current=t)}}catch(e){t===s.current&&console.error("Mermaid 解析错误:",e)}},300),()=>{let e=d.current;e&&clearTimeout(e)}},[t,e,a,c,o]),o})(e??"",{enabled:!0,id:C(`mermaid-${(0,u.useId)()}`),theme:n?void 0:o}),c=!d,[h,g]=(0,u.useState)();(0,u.useEffect)(()=>()=>{h&&URL.revokeObjectURL(h)},[h]),(0,u.useEffect)(()=>{if(c||!d)return void g(void 0);let e=d;if("u">typeof window&&"u">typeof navigator&&navigator.userAgent.includes("Firefox")){let t=new DOMParser().parseFromString(d,"image/svg+xml"),a=t.documentElement;if(a&&a.hasAttribute("viewBox")){let i=a.getAttribute("viewBox").split(" ");Array.isArray(i)&&4===i.length&&(a.setAttribute("width",i[2]),a.setAttribute("height",i[3])),e=new XMLSerializer().serializeToString(t)}}let t=new Blob([e],{type:"image/svg+xml"});g(URL.createObjectURL(t))},[c,d]);let y={background:"filled"===l?s:void 0,margin:0,minWidth:300,padding:16*("borderless"!==l),position:"relative",width:"100%",...r};return h?(0,p.jsx)(f.default,{alt:"mermaid",className:t,maxHeight:480,minWidth:300,objectFit:"contain",ref:i,src:h,style:y,variant:"borderless",width:"100%"}):(0,p.jsx)("div",{className:a,style:r,children:(0,p.jsx)("div",{style:{padding:16},children:"Rendering..."})})});z.displayName="StreamMermaid";var L=e.i(225913);let D=m.keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`,A=(0,m.createStaticStyles)(({css:e,cssVar:t})=>({animated:e`
      img {
        opacity: 1;
        animation: ${D} 0.5s ease-in-out;
      }
    `,mermaid:(0,m.cx)("ant-mermaid-mermaid",e`
        img {
          display: block;
          width: 100%;
          height: auto;
        }
      `),noBackground:e`
      img {
        background: transparent !important;
      }
    `,noPadding:e`
      padding: 0;
    `,padding:e`
      padding: 16px;
    `,root:e`
      direction: ltr;
      margin: 0;
      padding: 0;
      text-align: start;
    `,unmermaid:e`
      color: ${t.colorTextDescription};
    `})),E=(0,L.cva)(A.root,{defaultVariants:{animated:!1,mermaid:!0,showBackground:!1,variant:"borderless"},variants:{mermaid:{false:A.unmermaid,true:A.mermaid},showBackground:{false:A.noBackground,true:null},animated:{true:A.animated,false:null},variant:{filled:A.padding,outlined:A.padding,borderless:A.noPadding}}}),O=(0,u.memo)(({animated:e,children:t,className:a,fallbackClassName:i,ref:r,style:o,theme:l,variant:n="borderless"})=>{let s="lobe-theme"===l||!l,d=!s&&"filled"===n,c=s?void 0:l,u=(0,m.cx)(E({animated:e,mermaid:!0,showBackground:d,variant:n}),a),h=(0,m.cx)(E({animated:e,mermaid:!1,showBackground:d,variant:n}),i);return e?(0,p.jsx)(z,{className:u,fallbackClassName:h,ref:r,style:o,theme:c,variant:n,children:t}):(0,p.jsx)(S,{className:u,fallbackClassName:h,ref:r,style:o,theme:c,variant:n,children:t})},(e,t)=>e.children===t.children&&e.animated===t.animated);O.displayName="SyntaxMermaid";let $=(0,u.memo)(({actionIconSize:e,animated:t,bodyRender:a,children:n,classNames:s,className:d,copyable:c=!0,defaultExpand:h=!0,fileName:g,fullFeatured:y,language:f="mermaid",actionsRender:b,shadow:M,showLanguage:v=!0,style:j,styles:k,theme:w,variant:N="filled",...T})=>{let I=n.trim(),C=(0,u.useRef)(I);(0,u.useEffect)(()=>{C.current=I},[I]);let S=(0,u.useCallback)(()=>C.current,[]),z=(0,u.useMemo)(()=>c?(0,p.jsx)(r.default,{content:S,size:e||{blockSize:28,size:16}}):null,[e,c,S]),L=(0,u.useMemo)(()=>b?b({actionIconSize:e,content:I,getContent:S,originalNode:z}):z,[e,b,S,z,I]),D=(0,u.useMemo)(()=>(0,p.jsx)(O,{animated:t,className:s?.content,style:k?.content,theme:w,variant:N,children:I}),[t,w,I,N,s?.content,k?.content]),A=(0,u.useMemo)(()=>a?a({content:I,originalNode:D}):D,[a,D,I]);return y?(0,p.jsx)(x,{actionsRender:b,className:d,classNames:s,content:I,copyable:c,defaultExpand:h,fileName:g,language:f,shadow:M,showLanguage:v,style:j,styles:k,variant:N,...T,children:A}):(0,p.jsxs)("div",{className:(0,m.cx)((0,l.variants)({shadow:M,variant:N}),d),"data-code-type":"mermaid",style:j,...T,children:[(0,p.jsx)(i.default,{horizontal:!0,align:"center",className:l.styles.actions,flex:"none",gap:4,children:L}),v&&(0,p.jsx)(o.default,{className:l.styles.lang,children:f.toLowerCase()}),A]})});$.displayName="Mermaid";var R=e.i(450156);let B=(0,m.createStaticStyles)(({css:e})=>({container:e`
    overflow: hidden;
    margin-block: calc(var(--lobe-markdown-margin-multiple) * 0.5em);
    border-radius: calc(var(--lobe-markdown-border-radius) * 1px);
    box-shadow: 0 0 0 1px var(--lobe-markdown-border-color) inset;
  `})),P=({fullFeatured:e,fileName:i,allowChangeLanguage:r,language:o=t.FALLBACK_LANG,children:l,className:n,style:s,variant:d="filled",icon:c,theme:u,...h})=>(0,p.jsx)(a.default,{allowChangeLanguage:r,className:(0,m.cx)(B.container,n),fileName:i,fullFeatured:e,icon:c,language:o,style:s,theme:u,variant:d,...h,children:l});P.displayName="MdxPre",e.s(["PreMermaid",0,({animated:e,fullFeatured:t,children:a,className:i,style:r,variant:o="filled",theme:l,...n})=>(0,p.jsx)($,{animated:e,className:(0,m.cx)(B.container,i),fullFeatured:t,style:r,theme:l,variant:o,...n,children:a}),"PreSingleLine",0,({language:e=t.FALLBACK_LANG,children:a,className:i,style:r,variant:o="filled",...l})=>(0,p.jsx)(R.default,{className:(0,m.cx)(B.container,i),"data-code-type":"highlighter",language:e,style:r,variant:o,...l,children:a}),"default",0,P],975409)},513650,e=>{"use strict";var t=e.i(382162),a=e.i(271645),i=e.i(843476);let r=e=>{let r=(0,a.use)(t.ConfigContext)?.aAs||"a";return(0,i.jsx)((0,a.useMemo)(()=>(0,a.memo)(e=>(0,a.createElement)(r,e)),[r]),{...e})};r.displayName="A",e.s(["default",0,r])},42184,282786,e=>{"use strict";var t=e.i(513650),a=e.i(184283);let i=(0,a.createStaticStyles)(({css:e,cssVar:t})=>({container:e`
    display: inline-flex;
    line-height: var(--lobe-markdown-line-height);
    vertical-align: baseline;

    a {
      color: inherit;
    }
  `,link:e`
    cursor: pointer;
    color: ${t.colorTextSecondary};

    :hover {
      color: ${t.colorText};
    }
  `,supContainer:e`
    vertical-align: super;
  `,url:e`
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;

    max-width: 400px;

    text-overflow: ellipsis;
  `}));var r=e.i(206868),o=e.i(492435),l=e.i(271645),n=e.i(843476),s=e.i(829672);e.s(["Popover",()=>s.default],282786);var s=s,d=e.i(732176);let c=({children:e,usePopover:t,title:a,alt:c,url:u})=>{let[p,m,h]=(0,l.useMemo)(()=>{try{let e=new URL(u),t=e.host,i=a;a===u&&(i="");let r=e.hostname.replace("www.","");return i||(r=u),[i,r,t]}catch{return[a,u,u]}},[u,a]);return t&&u?(0,n.jsx)(s.default,{arrow:!1,trigger:"hover",content:(0,n.jsxs)(r.default,{gap:8,children:[(0,n.jsxs)(r.default,{horizontal:!0,className:i.link,gap:12,justify:"space-between",onClick:()=>{window.open(u,"_blank")},children:[(0,n.jsxs)(r.default,{horizontal:!0,align:"center",gap:4,children:[(0,n.jsx)("img",{alt:c||a||u,height:14,src:`https://icons.duckduckgo.com/ip3/${h}.ico`,style:{borderRadius:4},width:14}),(0,n.jsx)("span",{className:i.url,children:m})]}),(0,n.jsx)(o.default,{icon:d.ArrowRightIcon})]}),p]}),children:e}):e};c.displayName="MdxPopoverPanel";var u=e.i(568482),p=e.i(532780),m=e.i(338489),h=e.i(647608),g=e.i(452019);let y=({children:e,href:t,inSup:r,id:o,citationDetail:l})=>{let s=!function(e){if(null==e)return!0;if((0,p.isArrayLike)(e))return("function"==typeof e.splice||"string"==typeof e||!!(0,h.isBuffer)(e)||!!(0,m.isTypedArray)(e)||!!(0,u.isArguments)(e))&&0===e.length;if("object"==typeof e){if(e instanceof Map||e instanceof Set)return 0===e.size;let t=Object.keys(e);return(0,g.isPrototype)(e)?0===t.filter(e=>"constructor"!==e).length:0===t.length}return!0}(l),d=l?.url||t;return r?(0,n.jsx)(c,{...l,usePopover:s,children:(0,n.jsx)("span",{className:i.container,children:(0,n.jsx)("a",{"aria-describedby":"footnote-label","data-footnote-ref":"true",href:d,id:o,rel:"noreferrer",target:l?.url?"_blank":void 0,children:e})})}):(0,n.jsx)(c,{...l,usePopover:s,children:(0,n.jsx)("sup",{className:(0,a.cx)(i.container,i.supContainer),children:d?(0,n.jsx)("a",{"aria-describedby":"footnote-label","data-footnote-ref":!0,href:d,rel:"noreferrer",target:"_blank",children:e}):(0,n.jsx)("span",{"aria-describedby":"footnote-label","data-footnote-ref":!0,children:e})})})};y.displayName="MdxCitation";let x=({href:e,target:a,citations:i,...r})=>{if(r["data-footnote-ref"])return(0,n.jsx)(y,{inSup:!0,citationDetail:(e=>{let t;if("string"==typeof e){try{t=JSON.parse(e)}catch{return}return t}})(r["data-link"]),href:e,id:r.id,children:r.children});let o=e?.match(/citation-(\d+)/);if(o){let e=Number.parseInt(o[1])-1,t=i?.[e];return(0,n.jsx)(y,{citationDetail:t,id:o[1],children:o[1]})}let l=e?.startsWith("http");return(0,n.jsx)(t.default,{href:e,target:a||l?"_blank":void 0,...r})};x.displayName="MdxLink",e.s(["default",0,x],42184)},743426,e=>{"use strict";var t=e.i(206868),a=e.i(149167),i=e.i(58125),r=e.i(184283),o=e.i(225913);let l="lobe-video-mask",n=(0,r.createStaticStyles)(({css:e,cssVar:t})=>{let a=e`
    pointer-events: none;

    position: absolute;
    z-index: 1;
    inset: 0;

    width: 100%;
    height: 100%;

    opacity: 0;
    background: ${t.colorBgMask};

    transition: opacity 0.2s ease;
  `;return{borderless:i.staticStylish.variantBorderlessWithoutHover,filled:(0,r.cx)(i.staticStylish.variantOutlinedWithoutHover,i.staticStylish.variantFilledWithoutHover),mask:(0,r.cx)(l,a),outlined:i.staticStylish.variantOutlinedWithoutHover,root:e`
      position: relative;

      overflow: hidden;

      width: 100%;
      min-width: var(--video-min-width, unset);
      max-width: var(--video-max-width, 100%);
      height: auto;
      min-height: var(--video-min-height, unset);
      max-height: var(--video-max-height, 100%);
      margin-block: 0 1em;
      border-radius: ${t.borderRadius};

      background: ${t.colorFillTertiary};

      &:hover {
        [class*='${l}'] {
          opacity: 1;
        }
      }
    `,video:e`
      cursor: pointer;
      width: 100%;
    `}}),s=(0,o.cva)(n.root,{defaultVariants:{variant:"filled"},variants:{variant:{filled:n.filled,outlined:n.outlined,borderless:n.borderless}}});var d=e.i(271645),c=e.i(843476),u=e.i(981339),p=e.i(57095);let m=(0,d.memo)(({ref:e,preload:i="auto",src:o,style:l,classNames:m,className:h,maxHeight:g="100%",maxWidth:y="100%",minHeight:x,minWidth:f,onEnded:b,onPause:M,onPlay:v,onPlaying:j,width:k,height:w,onMouseEnter:N,styles:T,onMouseLeave:I,preview:C=!0,isLoading:S,variant:z="filled",autoPlay:L,...D})=>{let[A,E]=(0,d.useState)(!1),[O,$]=(0,d.useState)(!1),R=(0,d.useMemo)(()=>{let e={};return void 0!==g&&(e["--video-max-height"]="number"==typeof g?`${g}px`:g),void 0!==y&&(e["--video-max-width"]="number"==typeof y?`${y}px`:y),void 0!==x&&(e["--video-min-height"]="number"==typeof x?`${x}px`:x),void 0!==f&&(e["--video-min-width"]="number"==typeof f?`${f}px`:f),e},[g,y,x,f]);return S?(0,c.jsx)(u.Skeleton.Avatar,{active:!0,style:{borderRadius:r.cssVar.borderRadiusLG,height:w,maxHeight:g,maxWidth:y,minHeight:x,minWidth:f,width:k}}):(0,c.jsxs)(t.default,{className:(0,r.cx)(s({variant:z}),h,m?.wrapper),height:w,ref:e,width:k,style:{...R,...l,...T?.wrapper},children:[C&&!A&&(0,c.jsx)(t.default,{align:"center",className:(0,r.cx)(n.mask,m?.mask),justify:"center",style:T?.mask,children:(0,c.jsx)(a.default,{color:"#fff",icon:p.PlayIcon,variant:"filled"})}),(0,c.jsx)("video",{autoPlay:L,className:(0,r.cx)(n.video,m?.video),controls:O,height:w,preload:i,width:k,style:{height:"auto",maxWidth:"100%",...T?.video},onEnded:e=>{E(!1),b?.(e)},onMouseEnter:e=>{$(!0),N?.(e)},onMouseLeave:e=>{$(!1),I?.(e)},onPause:e=>{E(!1),M?.(e)},onPlay:e=>{E(!0),v?.(e)},onPlaying:e=>{E(!0),j?.(e)},...D,children:(0,c.jsx)("source",{src:o})})]})});m.displayName="Video";let h=({style:e,...t})=>(0,c.jsx)(m,{preview:!1,style:{borderRadius:"calc(var(--lobe-markdown-border-radius) * 1px)",marginBlock:"calc(var(--lobe-markdown-margin-multiple) * 1em)",...e},...t});h.displayName="MdxVdieo",e.s(["default",0,h],743426)},853138,810818,e=>{"use strict";let t=(0,e.i(456420).default)("triangle-alert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);e.s(["AlertTriangle",0,t],853138);var a=e.i(343420);e.s(["Info",()=>a.default],810818)},108926,e=>{"use strict";var t=e.i(843476),a=e.i(834101),i=e.i(184283),r=e.i(172345),o=e.i(456420);let l=(0,o.default)("heading-2",[["path",{d:"M4 12h8",key:"17cfdx"}],["path",{d:"M4 18V6",key:"1rz3zl"}],["path",{d:"M12 18V6",key:"zqpxq5"}],["path",{d:"M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1",key:"9jr5yi"}]]),n=(0,o.default)("heading-3",[["path",{d:"M4 12h8",key:"17cfdx"}],["path",{d:"M4 18V6",key:"1rz3zl"}],["path",{d:"M12 18V6",key:"zqpxq5"}],["path",{d:"M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2",key:"68ncm8"}],["path",{d:"M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2",key:"1ejuhz"}]]),s=(0,o.default)("heading-4",[["path",{d:"M12 18V6",key:"zqpxq5"}],["path",{d:"M17 10v3a1 1 0 0 0 1 1h3",key:"tj5zdr"}],["path",{d:"M21 10v8",key:"1kdml4"}],["path",{d:"M4 12h8",key:"17cfdx"}],["path",{d:"M4 18V6",key:"1rz3zl"}]]),d=(0,o.default)("heading-5",[["path",{d:"M4 12h8",key:"17cfdx"}],["path",{d:"M4 18V6",key:"1rz3zl"}],["path",{d:"M12 18V6",key:"zqpxq5"}],["path",{d:"M17 13v-3h4",key:"1nvgqp"}],["path",{d:"M17 17.7c.4.2.8.3 1.3.3 1.5 0 2.7-1.1 2.7-2.5S19.8 13 18.3 13H17",key:"2nebdn"}]]);var c=e.i(271645),u=e.i(347782),p=e.i(58687);let m=e=>{let t="";return c.Children.forEach(e,e=>{"string"==typeof e||"number"==typeof e?t+=e:(0,c.isValidElement)(e)&&e.props.children&&(t+=m(e.props.children))}),t},h={h2:l,h3:n,h4:s,h5:d},g=(0,i.createStaticStyles)(({css:e,cx:t})=>({anchor:t("title-anchor",e`
        display: none;
        margin-inline-start: 0.5rem;
        color: ${i.cssVar.colorTextDescription} !important;
      `),container:e`
      &:hover {
        .title-anchor {
          display: inline;
        }
      }
    `})),y=e=>({children:o,className:l,style:n,...s})=>{let{setToc:d,setFinished:y}=(0,p.useToc)(),x=(0,c.useMemo)(()=>m(o),[o]),f=(0,r.kebabCase)(x);return((0,c.useEffect)(()=>{d&&(("h2"===e||"h3"===e)&&d?.((t=[])=>[...t,{href:`#${f}`,level:"h2"===e?2:3,title:x}]),y())},[f]),"h1"===e)?(0,t.jsx)(e,{style:{color:i.cssVar.colorText,...n},...s,id:f,children:o}):(0,t.jsxs)(e,{className:(0,i.cx)(g.container,l),style:{color:i.cssVar.colorText,...n},...s,id:f,children:[o,(0,t.jsx)(u.default,{"aria-label":"Permalink for this section",className:g.anchor,href:`#${f}`,style:{scrollMarginTop:96},children:(0,t.jsx)(a.Icon,{icon:h[e]})})]})},x=y("h1"),f=y("h2"),b=y("h3"),M=y("h4"),v=y("h5");e.s(["H1",0,x,"H2",0,f,"H3",0,b,"H4",0,M,"H5",0,v,"styles",0,g],108926)}]);
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,438847,e=>{"use strict";var t=e.i(680902),r=e.i(622289),l=e.i(271645);function a(e,t,l){try{return e(t)}catch(e){return(0,r.l)("[nuqs] Error while parsing value `%s`: %O"+(l?" (for key `%s`)":""),t,e,l),null}}function i(e){function t(t){if(void 0===t)return null;let r="";if(Array.isArray(t)){if(void 0===t[0])return null;r=t[0]}return"string"==typeof t&&(r=t),a(e.parse,r)}return{type:"single",eq:(e,t)=>e===t,...e,parseServerSide:t,withDefault(e){return{...this,defaultValue:e,parseServerSide:r=>t(r)??e}},withOptions(e){return{...this,...e}}}}function s(e,t){return e.valueOf()===t.valueOf()}i({parse:e=>e,serialize:String}),i({parse:e=>{let t=parseInt(e);return t==t?t:null},serialize:e=>""+Math.round(e)}),i({parse:e=>{let t=parseInt(e);return t==t?t-1:null},serialize:e=>""+Math.round(e+1)}),i({parse:e=>{let t=parseInt(e,16);return t==t?t:null},serialize:e=>{let t=Math.round(e).toString(16);return(1&t.length?"0":"")+t}}),i({parse:e=>{let t=parseFloat(e);return t==t?t:null},serialize:String}),i({parse:e=>"true"===e.toLowerCase(),serialize:String}),i({parse:e=>{let t=parseInt(e);return t==t?new Date(t):null},serialize:e=>""+e.valueOf(),eq:s}),i({parse:e=>{let t=new Date(e);return t.valueOf()==t.valueOf()?t:null},serialize:e=>e.toISOString(),eq:s}),i({parse:e=>{let t=new Date(e.slice(0,10));return t.valueOf()==t.valueOf()?t:null},serialize:e=>e.toISOString().slice(0,10),eq:s});let o=(0,t.r)(),n={};function c(e,r,l,i,s,o){let n=!1,c=Object.entries(e).reduce((e,[c,u])=>{var d;let h=r?.[c]??c,f=i[h],p="multi"===u.type?[]:null,m=void 0===f?("multi"===u.type?l?.getAll(h):l?.get(h))??p:f;return s&&o&&((d=s[h]??p)===m||null!==d&&null!==m&&"string"!=typeof d&&"string"!=typeof m&&d.length===m.length&&d.every((e,t)=>e===m[t]))?e[c]=o[c]??null:(n=!0,e[c]=((0,t.i)(m)?null:a(u.parse,m,h))??null,s&&(s[h]=m)),e},{});if(!n){let t=Object.keys(e),r=Object.keys(o??{});n=t.length!==r.length||t.some(e=>!r.includes(e))}return{state:c,hasChanged:n}}function u(e,t){return Object.fromEntries(Object.keys(e).map(r=>[r,e[r]??t[r]??null]))}e.s(["useQueryState",0,function(e,a={}){let{parse:i,type:s,serialize:d,eq:h,defaultValue:f,...p}=a,[{[e]:m},g]=function(e,a={}){let i=(0,l.useId)(),s=(0,r.i)(),d=(0,r.a)(),{history:h="replace",scroll:f=s?.scroll??!1,shallow:p=s?.shallow??!0,throttleMs:m=t.s.timeMs,limitUrlUpdates:g=s?.limitUrlUpdates,clearOnDefault:v=s?.clearOnDefault??!0,startTransition:w,urlKeys:x=n}=a,y=Object.keys(e).join(","),j=(0,l.useMemo)(()=>Object.fromEntries(Object.keys(e).map(e=>[e,x[e]??e])),[y,JSON.stringify(x)]),b=(0,r.r)(Object.values(j)),S=b.searchParams,k=(0,l.useRef)({}),O=(0,l.useMemo)(()=>Object.fromEntries(Object.keys(e).map(t=>[t,e[t].defaultValue??null])),[Object.values(e).map(({defaultValue:e})=>e).join(",")]),M=t.t.useQueuedQueries(Object.values(j)),[z,C]=(0,l.useState)(()=>c(e,x,S??new URLSearchParams,M).state),B=(0,l.useRef)(z);if((0,r.c)("[nuq+ %s `%s`] render - state: %O, iSP: %s",i,y,z,S),Object.keys(k.current).join("&")!==Object.values(j).join("&")){let{state:t,hasChanged:l}=c(e,x,S,M,k.current,B.current);l&&((0,r.c)("[nuq+ %s `%s`] State changed: %O",i,y,{state:t,initialSearchParams:S,queuedQueries:M,queryRef:k.current,stateRef:B.current}),B.current=t,C(t)),k.current=Object.fromEntries(Object.entries(j).map(([t,r])=>[r,e[t]?.type==="multi"?S?.getAll(r):S?.get(r)??null]))}(0,l.useEffect)(()=>{let{state:t,hasChanged:l}=c(e,x,S,M,k.current,B.current);l&&((0,r.c)("[nuq+ %s `%s`] State changed: %O",i,y,{state:t,initialSearchParams:S,queuedQueries:M,queryRef:k.current,stateRef:B.current}),B.current=t,C(t))},[Object.values(j).map(e=>`${e}=${S?.getAll(e)}`).join("&"),JSON.stringify(M)]),(0,l.useEffect)(()=>{let t=Object.keys(e).reduce((t,l)=>(t[l]=({state:t,query:a})=>{C(s=>{let{defaultValue:o}=e[l],n=j[l],c=t??o??null;return Object.is(s[l]??o??null,c)?((0,r.c)("[nuq+ %s `%s`] Cross-hook key sync %s: %O (default: %O). no change, skipping, resolved: %O",i,y,n,t,o,B.current),s):(B.current={...B.current,[l]:c},k.current[n]=a,(0,r.c)("[nuq+ %s `%s`] Cross-hook key sync %s: %O (default: %O). updateInternalState, resolved: %O",i,y,n,t,o,B.current),B.current)})},t),{});for(let l of Object.keys(e)){let e=j[l];(0,r.c)("[nuq+ %s `%s`] Subscribing to sync for `%s`",i,e,y),o.on(e,t[l])}return()=>{for(let l of Object.keys(e)){let e=j[l];(0,r.c)("[nuq+ %s `%s`] Unsubscribing to sync for `%s`",i,e,y),o.off(e,t[l])}}},[y,j]);let L=(0,l.useCallback)((l,a={})=>{let s,n=Object.fromEntries(Object.keys(e).map(e=>[e,null])),c="function"==typeof l?l(u(B.current,O))??n:l??n;(0,r.c)("[nuq+ %s `%s`] setState: %O",i,y,c);let x=0,S=!1,k=[];for(let[l,i]of Object.entries(c)){let n=e[l],c=j[l];if(!n||void 0===i)continue;(a.clearOnDefault??n.clearOnDefault??v)&&null!==i&&void 0!==n.defaultValue&&(n.eq??((e,t)=>e===t))(i,n.defaultValue)&&(i=null);let u=null===i?null:(n.serialize??String)(i);o.emit(c,{state:i,query:u});let y={key:c,query:u,options:{history:a.history??n.history??h,shallow:a.shallow??n.shallow??p,scroll:a.scroll??n.scroll??f,startTransition:a.startTransition??n.startTransition??w}};if(a?.limitUrlUpdates?.method==="debounce"||g?.method==="debounce"||n.limitUrlUpdates?.method==="debounce"){!0===y.options.shallow&&console.warn((0,r.s)(422));let e=a?.limitUrlUpdates?.timeMs??g?.timeMs??n.limitUrlUpdates?.timeMs??t.s.timeMs,l=t.t.push(y,e,b,d);x<e&&(s=l,x=e)}else{let e=a?.limitUrlUpdates?.timeMs??n?.limitUrlUpdates?.timeMs??g?.timeMs??a.throttleMs??n.throttleMs??m;k.push(t.t.abort(c)),t.n.push(y,e),S=!0}}let M=k.reduce((e,t)=>t(e),S?t.n.flush(b,d):t.n.getPendingPromise(b));return s??M},[y,h,p,f,m,g?.method,g?.timeMs,w,j,b.updateUrl,b.getSearchParamsSnapshot,b.rateLimitFactor,d,O]);return[(0,l.useMemo)(()=>u(z,O),[z,O]),L]}({[e]:{parse:i??(e=>e),type:s,serialize:d,eq:h,defaultValue:f}},p);return[m,(0,l.useCallback)((t,r={})=>g(r=>({[e]:"function"==typeof t?t(r[e]):t}),r),[e,g])]}],438847)},339904,e=>{"use strict";var t=e.i(843476),r=e.i(377760),r=r,l=e.i(184283),a=e.i(271645),i=e.i(58687);let s=(0,l.createStaticStyles)(({css:e,cssVar:t})=>({toc:e`
      a {
        line-height: 1.4 !important;
        white-space: normal !important;
      }

      .${"ant"}-anchor {
        display: flex;
        flex-direction: column;
        gap: 8px;

        &::before {
          display: none;
        }

        .${"ant"}-anchor-ink {
          display: none !important;
        }

        .${"ant"}-anchor-link-title {
          overflow: hidden;
          display: box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;

          word-break: break-word;
        }

        .${"ant"}-anchor-link-title,.${"ant"}-anchor-link {
          margin: 0 !important;
          padding-block: 0 !important;
        }

        > .${"ant"}-anchor-link {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-inline-start: 0 !important;
        }

        .${"ant"}-anchor-link-title-active {
          color: ${t.colorText} !important;
        }

        .${"ant"}-anchor-link-title:not(.${"ant"}-anchor-link-title-active) {
          color: ${t.colorTextSecondary};

          &:hover {
            color: ${t.colorText};
          }
        }
      }

      ${l.responsive.lg} {
        display: none;
      }
    `})),o=(0,a.memo)(({items:e,className:o,...n})=>{let c=(0,a.useMemo)(()=>(0,i.createTOCTree)(e),[e]);return(0,t.jsx)(r.default,{affix:!1,className:(0,l.cx)(o,s.toc),items:c,...n})});e.s(["default",0,o],339904)},909592,e=>{"use strict";let t=(0,e.i(456420).default)("link",[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]]);e.s(["LinkIcon",0,t],909592)},16251,550197,751259,118812,658453,719255,e=>{"use strict";var t=e.i(843476),r=e.i(271645);let l=r.forwardRef(function({title:e="LinkedIn",color:r="currentColor",size:l=24,...a},i){return"default"===r&&(r="#0A66C2"),(0,t.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:l,height:l,fill:r,viewBox:"0 0 24 24",ref:i,...a,children:[(0,t.jsx)("title",{children:e}),(0,t.jsx)("path",{d:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"})]})});e.s(["SiLinkedin",0,l],16251);let a=r.forwardRef(function({title:e="Mastodon",color:r="currentColor",size:l=24,...a},i){return"default"===r&&(r="#6364FF"),(0,t.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:l,height:l,fill:r,viewBox:"0 0 24 24",ref:i,...a,children:[(0,t.jsx)("title",{children:e}),(0,t.jsx)("path",{d:"M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z"})]})});e.s(["SiMastodon",0,a],550197);let i=r.forwardRef(function({title:e="Sina Weibo",color:r="currentColor",size:l=24,...a},i){return"default"===r&&(r="#E6162D"),(0,t.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:l,height:l,fill:r,viewBox:"0 0 24 24",ref:i,...a,children:[(0,t.jsx)("title",{children:e}),(0,t.jsx)("path",{d:"M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.737 5.439l-.002.004zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.861 1.793-.601.622.263.82.972.442 1.592zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.09-.313-.361-.177-.586.138-.227.436-.346.672-.24.239.09.315.36.18.601l.014-.028zm.176-2.719c-1.893-.493-4.033.45-4.857 2.118-.836 1.704-.026 3.591 1.886 4.21 1.983.64 4.318-.341 5.132-2.179.8-1.793-.201-3.642-2.161-4.149zm7.563-1.224c-.346-.105-.57-.18-.405-.615.375-.977.42-1.804 0-2.404-.781-1.112-2.915-1.053-5.364-.03 0 0-.766.331-.571-.271.376-1.217.315-2.224-.27-2.809-1.338-1.337-4.869.045-7.888 3.08C1.309 10.87 0 13.273 0 15.348c0 3.981 5.099 6.395 10.086 6.395 6.536 0 10.888-3.801 10.888-6.82 0-1.822-1.547-2.854-2.915-3.284v.01zm1.908-5.092c-.766-.856-1.908-1.187-2.96-.962-.436.09-.706.511-.616.932.09.42.511.691.932.602.511-.105 1.067.044 1.442.465.376.421.466.977.316 1.473-.136.406.089.856.51.992.405.119.857-.105.992-.512.33-1.021.12-2.178-.646-3.035l.03.045zm2.418-2.195c-1.576-1.757-3.905-2.419-6.054-1.968-.496.104-.812.587-.706 1.081.104.496.586.813 1.082.707 1.532-.331 3.185.15 4.296 1.383 1.112 1.246 1.429 2.943.947 4.416-.165.48.106 1.007.586 1.157.479.165.991-.104 1.157-.586.675-2.088.241-4.478-1.338-6.235l.03.045z"})]})});e.s(["SiSinaweibo",0,i],751259);let s=r.forwardRef(function({title:e="Telegram",color:r="currentColor",size:l=24,...a},i){return"default"===r&&(r="#26A5E4"),(0,t.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:l,height:l,fill:r,viewBox:"0 0 24 24",ref:i,...a,children:[(0,t.jsx)("title",{children:e}),(0,t.jsx)("path",{d:"M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"})]})});e.s(["SiTelegram",0,s],118812);let o=r.forwardRef(function({title:e="WhatsApp",color:r="currentColor",size:l=24,...a},i){return"default"===r&&(r="#25D366"),(0,t.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:l,height:l,fill:r,viewBox:"0 0 24 24",ref:i,...a,children:[(0,t.jsx)("title",{children:e}),(0,t.jsx)("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"})]})});e.s(["SiWhatsapp",0,o],658453),e.s(["pickBy",0,function(e,t){let r={},l=Object.keys(e);for(let a=0;a<l.length;a++){let i=l[a],s=e[i];t(s,i)&&(r[i]=s)}return r}],719255)},712225,e=>{"use strict";var t=e.i(206868),r=e.i(184283),l=e.i(225913);let a=(0,r.createStaticStyles)(({css:e})=>({bottomShadow:e`
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
    `})),i=(0,l.cva)(a.root,{defaultVariants:{hideScrollBar:!1,orientation:"vertical",scrollPosition:"none"},variants:{orientation:{horizontal:a.horizontal,vertical:a.vertical},hideScrollBar:{true:a.hideScrollBar,false:null},scrollPosition:{none:null,top:a.topShadow,bottom:a.bottomShadow,"top-bottom":a.topBottomShadow,left:a.leftShadow,right:a.rightShadow,"left-right":a.leftRightShadow}}});var s=e.i(271645),o=e.i(843476),n=e.i(346554);let c=({className:e,children:l,orientation:a="vertical",hideScrollBar:c=!1,size:u=16,offset:d=8,visibility:h="auto",isEnabled:f=!0,onVisibilityChange:p,style:m,ref:g,...v})=>{let w=(0,s.useMemo)(()=>({"--scroll-shadow-size":`${u}%`}),[u]),x=(0,s.useRef)(null),y=(({domRef:e,offset:t=0,orientation:r="vertical",isEnabled:l=!0,onVisibilityChange:a,updateDeps:i=[]})=>{let[o,n]=(0,s.useState)({bottom:!1,left:!1,right:!1,top:!1});return(0,s.useEffect)(()=>{let i=e.current;if(!i||!l)return;let s=()=>{let e={...o};"vertical"===r?i.scrollHeight>i.clientHeight?(e.top=i.scrollTop>t,e.bottom=i.scrollTop+i.clientHeight<i.scrollHeight-t):(e.top=!1,e.bottom=!1):i.scrollWidth>i.clientWidth?(e.left=i.scrollLeft>t,e.right=i.scrollLeft+i.clientWidth<i.scrollWidth-t):(e.left=!1,e.right=!1),n(e),a?.(e)};s(),i.addEventListener("scroll",s),window.addEventListener("resize",s);let c=new ResizeObserver(s);return c.observe(i),()=>{i.removeEventListener("scroll",s),window.removeEventListener("resize",s),c.disconnect()}},[e,t,r,l,a,...i]),o})({domRef:x,isEnabled:f&&"auto"===h,offset:d,onVisibilityChange:p,orientation:a,updateDeps:[l]}),j=(0,s.useMemo)(()=>"always"===h?{bottom:!0,left:!0,right:!0,top:!0}:"never"===h?{bottom:!1,left:!1,right:!1,top:!1}:y,[h,y]),b=(0,s.useMemo)(()=>{let e={"data-orientation":a};return"vertical"===a?j.top&&j.bottom?e["data-top-bottom-scroll"]=!0:j.top?e["data-top-scroll"]=!0:j.bottom&&(e["data-bottom-scroll"]=!0):j.left&&j.right?e["data-left-right-scroll"]=!0:j.left?e["data-left-scroll"]=!0:j.right&&(e["data-right-scroll"]=!0),e},[a,j]);return(0,o.jsx)(t.default,{className:(0,r.cx)(i({hideScrollBar:c,orientation:a,scrollPosition:(0,s.useMemo)(()=>{if("vertical"===a){if(j.top&&j.bottom)return"top-bottom";if(j.top)return"top";if(j.bottom)return"bottom"}else{if(j.left&&j.right)return"left-right";if(j.left)return"left";if(j.right)return"right"}return"none"},[a,j])}),e),ref:(0,n.mergeRefs)([x,g]),style:{...w,...m},...b,...v,children:l})};c.displayName="ScrollShadow",e.s(["default",0,c],712225)},164998,e=>{"use strict";var t=e.i(712225);e.s(["ScrollShadow",()=>t.default])},217611,e=>{"use strict";let t=(0,e.i(456420).default)("dot",[["circle",{cx:"12.1",cy:"12.1",r:"1",key:"18d7e5"}]]);e.s(["default",0,t])},951437,e=>{"use strict";let t=(0,e.i(456420).default)("book-open",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]]);e.s(["default",0,t])},458928,e=>{"use strict";var t=e.i(951437);e.s(["BookOpenIcon",()=>t.default])},579944,e=>{"use strict";var t=e.i(885335);e.s(["ListIcon",()=>t.default])},885335,e=>{"use strict";let t=(0,e.i(456420).default)("list",[["path",{d:"M3 5h.01",key:"18ugdj"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 19h.01",key:"noohij"}],["path",{d:"M8 5h13",key:"1pao27"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 19h13",key:"m83p4d"}]]);e.s(["default",0,t])},924722,e=>{"use strict";var t=e.i(757871);e.s(["Tabs",()=>t.default])},429336,320146,822623,e=>{"use strict";var t=e.i(388797);e.s(["Claude",()=>t.default],429336);var r=e.i(858364);e.s(["Cline",()=>r.default],320146);var l=e.i(843476),a=e.i(409743);let i=(0,e.i(271645).memo)(({size:e="1em",style:t,...r})=>{let[i,s,o,n]=(0,a.useFillIds)("vscode",4);return(0,l.jsxs)("svg",{height:e,style:{flex:"none",lineHeight:1,...t},viewBox:"0 0 100 100",width:e,xmlns:"http://www.w3.org/2000/svg",...r,children:[(0,l.jsx)("mask",{height:"100",id:i.id,maskUnits:"userSpaceOnUse",width:"100",x:"0",y:"0",children:(0,l.jsx)("path",{clipRule:"evenodd",d:"M70.912 99.317a6.223 6.223 0 004.96-.19l20.589-9.907A6.25 6.25 0 00100 83.587V16.413a6.25 6.25 0 00-3.54-5.632L75.874.874a6.226 6.226 0 00-7.104 1.21L29.355 38.04 12.187 25.01a4.162 4.162 0 00-5.318.236l-5.506 5.009a4.168 4.168 0 00-.004 6.162L16.247 50 1.36 63.583a4.168 4.168 0 00.004 6.162l5.506 5.01a4.162 4.162 0 005.318.236l17.168-13.032L68.77 97.917a6.217 6.217 0 002.143 1.4zM75.015 27.3L45.11 50l29.906 22.701V27.3z",fill:"#fff",fillRule:"evenodd"})}),(0,l.jsxs)("g",{mask:i.fill,children:[(0,l.jsx)("path",{d:"M96.461 10.796L75.857.876a6.23 6.23 0 00-7.107 1.207l-67.451 61.5a4.167 4.167 0 00.004 6.162l5.51 5.009a4.167 4.167 0 005.32.236l81.228-61.62c2.725-2.067 6.639-.124 6.639 3.297v-.24a6.25 6.25 0 00-3.539-5.63z",fill:"#0065A9"}),(0,l.jsx)("g",{filter:s.fill,children:(0,l.jsx)("path",{d:"M96.461 89.204l-20.604 9.92a6.229 6.229 0 01-7.107-1.207l-67.451-61.5a4.167 4.167 0 01.004-6.162l5.51-5.009a4.167 4.167 0 015.32-.236l81.228 61.62c2.725 2.067 6.639.124 6.639-3.297v.24a6.25 6.25 0 01-3.539 5.63z",fill:"#007ACC"})}),(0,l.jsx)("g",{filter:o.fill,children:(0,l.jsx)("path",{d:"M75.858 99.126a6.232 6.232 0 01-7.108-1.21c2.306 2.307 6.25.674 6.25-2.588V4.672c0-3.262-3.944-4.895-6.25-2.589a6.232 6.232 0 017.108-1.21l20.6 9.908A6.25 6.25 0 01100 16.413v67.174a6.25 6.25 0 01-3.541 5.633l-20.601 9.906z",fill:"#1F9CF0"})}),(0,l.jsx)("path",{clipRule:"evenodd",d:"M70.851 99.317a6.224 6.224 0 004.96-.19L96.4 89.22a6.25 6.25 0 003.54-5.633V16.413a6.25 6.25 0 00-3.54-5.632L75.812.874a6.226 6.226 0 00-7.104 1.21L29.294 38.04 12.126 25.01a4.162 4.162 0 00-5.317.236l-5.507 5.009a4.168 4.168 0 00-.004 6.162L16.186 50 1.298 63.583a4.168 4.168 0 00.004 6.162l5.507 5.009a4.162 4.162 0 005.317.236L29.294 61.96l39.414 35.958a6.218 6.218 0 002.143 1.4zM74.954 27.3L45.048 50l29.906 22.701V27.3z",fill:n.fill,fillRule:"evenodd",opacity:".25"})]}),(0,l.jsxs)("defs",{children:[(0,l.jsxs)("filter",{filterUnits:"userSpaceOnUse",height:"92.246",id:s.id,width:"116.727",x:"-8.394",y:"15.829",children:[(0,l.jsx)("feFlood",{floodOpacity:"0",result:"BackgroundImageFix"}),(0,l.jsx)("feColorMatrix",{in:"SourceAlpha",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"}),(0,l.jsx)("feOffset",{}),(0,l.jsx)("feGaussianBlur",{stdDeviation:"4.167"}),(0,l.jsx)("feColorMatrix",{values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"}),(0,l.jsx)("feBlend",{in2:"BackgroundImageFix",mode:"overlay",result:"effect1_dropShadow"}),(0,l.jsx)("feBlend",{in:"SourceGraphic",in2:"effect1_dropShadow",result:"shape"})]}),(0,l.jsxs)("filter",{filterUnits:"userSpaceOnUse",height:"116.151",id:o.id,width:"47.917",x:"60.417",y:"-8.076",children:[(0,l.jsx)("feFlood",{floodOpacity:"0",result:"BackgroundImageFix"}),(0,l.jsx)("feColorMatrix",{in:"SourceAlpha",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"}),(0,l.jsx)("feOffset",{}),(0,l.jsx)("feGaussianBlur",{stdDeviation:"4.167"}),(0,l.jsx)("feColorMatrix",{values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"}),(0,l.jsx)("feBlend",{in2:"BackgroundImageFix",mode:"overlay",result:"effect1_dropShadow"}),(0,l.jsx)("feBlend",{in:"SourceGraphic",in2:"effect1_dropShadow",result:"shape"})]}),(0,l.jsxs)("linearGradient",{gradientUnits:"userSpaceOnUse",id:n.id,x1:"49.939",x2:"49.939",y1:".258",y2:"99.742",children:[(0,l.jsx)("stop",{stopColor:"#fff"}),(0,l.jsx)("stop",{offset:"1",stopColor:"#fff",stopOpacity:"0"})]})]})]})});e.s(["default",0,i],822623)},825781,497650,e=>{"use strict";let t=(0,e.i(456420).default)("history",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]]);e.s(["HistoryIcon",0,t],825781);var r=e.i(309821);e.s(["Progress",()=>r.default],497650)},957476,e=>{"use strict";var t=e.i(843476),r=e.i(592143),l=e.i(291542),a=e.i(184283),i=e.i(271645);let s=(0,a.createStaticStyles)(({css:e})=>({hoverToActive:e`
    opacity: 0.6;

    &:hover {
      opacity: 1;
    }
  `,table:e`
    .${"ant"}-table {
      background: transparent;

      th,
      td {
        border: none !important;
        font-size: 13px;
      }

      .${"ant"}-table-cell:before {
        display: none;
      }
    }

    tr {
      td:first-child,
      th:first-child {
        padding-inline-start: 24px !important;
      }

      td:last-child,
      th:last-child {
        padding-inline-end: 24px !important;
      }
    }
  `})),o=(0,i.memo)(({hoverToActive:e,className:i,...o})=>(0,t.jsx)(r.ConfigProvider,{theme:{components:{Table:{headerBg:a.cssVar.colorFillQuaternary,headerBorderRadius:0}}},children:(0,t.jsx)(l.Table,{bordered:!1,className:(0,a.cx)(s.table,e&&s.hoverToActive,i),pagination:!1,scroll:{x:"max-content"},size:"small",...o})}));e.s(["default",0,o])},778908,e=>{"use strict";var t=e.i(571974);e.s(["ScaleIcon",()=>t.default])}]);
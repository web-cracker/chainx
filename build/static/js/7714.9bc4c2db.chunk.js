/*! For license information please see 7714.9bc4c2db.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkweb3_telegram_mini_app=self.webpackChunkweb3_telegram_mini_app||[]).push([[7714],{90342:(t,e,i)=>{i(88110)},89572:(t,e,i)=>{i(27111)},3634:(t,e,i)=>{i(2160)},27111:(t,e,i)=>{var a=i(5217),n=i(86971),o=i(22912),r=i(88504),s=i(48873);class c{constructor(t){this.G=t}disconnect(){this.G=void 0}reconnect(t){this.G=t}deref(){return this.G}}class l{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??=new Promise((t=>this.Z=t))}resume(){this.Z?.(),this.Y=this.Z=void 0}}var h=i(46700);const d=t=>!(0,r.sO)(t)&&"function"==typeof t.then,g=1073741823;class w extends s.Kq{constructor(){super(...arguments),this._$Cwt=g,this._$Cbt=[],this._$CK=new c(this),this._$CX=new l}render(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return e.find((t=>!d(t)))??o.c0}update(t,e){const i=this._$Cbt;let a=i.length;this._$Cbt=e;const n=this._$CK,r=this._$CX;this.isConnected||this.disconnected();for(let o=0;o<e.length&&!(o>this._$Cwt);o++){const t=e[o];if(!d(t))return this._$Cwt=o,t;o<a&&t===i[o]||(this._$Cwt=g,a=0,Promise.resolve(t).then((async e=>{for(;r.get();)await r.get();const i=n.deref();if(void 0!==i){const a=i._$Cbt.indexOf(t);a>-1&&a<i._$Cwt&&(i._$Cwt=a,i.setValue(e))}})))}return o.c0}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}}const p=(0,h.u$)(w);const v=new class{constructor(){this.cache=new Map}set(t,e){this.cache.set(t,e)}get(t){return this.cache.get(t)}has(t){return this.cache.has(t)}delete(t){this.cache.delete(t)}clear(){this.cache.clear()}};var u=i(90509),f=i(1046);const y=a.AH`
  :host {
    display: flex;
    aspect-ratio: var(--local-aspect-ratio);
    color: var(--local-color);
    width: var(--local-width);
  }

  svg {
    width: inherit;
    height: inherit;
    object-fit: contain;
    object-position: center;
  }

  .fallback {
    width: var(--local-width);
    height: var(--local-height);
  }
`;var b=function(t,e,i,a){var n,o=arguments.length,r=o<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,e,i,a);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};const m={add:async()=>(await i.e(7748).then(i.bind(i,17748))).addSvg,allWallets:async()=>(await i.e(2715).then(i.bind(i,72715))).allWalletsSvg,arrowBottomCircle:async()=>(await i.e(1853).then(i.bind(i,41853))).arrowBottomCircleSvg,appStore:async()=>(await i.e(6372).then(i.bind(i,66372))).appStoreSvg,apple:async()=>(await i.e(7611).then(i.bind(i,57611))).appleSvg,arrowBottom:async()=>(await i.e(4800).then(i.bind(i,54800))).arrowBottomSvg,arrowLeft:async()=>(await i.e(3338).then(i.bind(i,3338))).arrowLeftSvg,arrowRight:async()=>(await i.e(429).then(i.bind(i,20429))).arrowRightSvg,arrowTop:async()=>(await i.e(2968).then(i.bind(i,22968))).arrowTopSvg,bank:async()=>(await i.e(1173).then(i.bind(i,61173))).bankSvg,browser:async()=>(await i.e(2787).then(i.bind(i,12787))).browserSvg,card:async()=>(await i.e(8165).then(i.bind(i,88165))).cardSvg,checkmark:async()=>(await i.e(5086).then(i.bind(i,75086))).checkmarkSvg,checkmarkBold:async()=>(await i.e(1104).then(i.bind(i,51104))).checkmarkBoldSvg,chevronBottom:async()=>(await i.e(6942).then(i.bind(i,96942))).chevronBottomSvg,chevronLeft:async()=>(await i.e(9584).then(i.bind(i,29584))).chevronLeftSvg,chevronRight:async()=>(await i.e(1603).then(i.bind(i,51603))).chevronRightSvg,chevronTop:async()=>(await i.e(3770).then(i.bind(i,63770))).chevronTopSvg,chromeStore:async()=>(await i.e(7605).then(i.bind(i,67605))).chromeStoreSvg,clock:async()=>(await i.e(5885).then(i.bind(i,25885))).clockSvg,close:async()=>(await i.e(2871).then(i.bind(i,72871))).closeSvg,compass:async()=>(await i.e(2507).then(i.bind(i,92507))).compassSvg,coinPlaceholder:async()=>(await i.e(2369).then(i.bind(i,12369))).coinPlaceholderSvg,copy:async()=>(await i.e(2058).then(i.bind(i,32058))).copySvg,cursor:async()=>(await i.e(7985).then(i.bind(i,77985))).cursorSvg,cursorTransparent:async()=>(await i.e(3262).then(i.bind(i,73262))).cursorTransparentSvg,desktop:async()=>(await i.e(7987).then(i.bind(i,87987))).desktopSvg,disconnect:async()=>(await i.e(8774).then(i.bind(i,86393))).disconnectSvg,discord:async()=>(await i.e(8283).then(i.bind(i,58283))).discordSvg,etherscan:async()=>(await i.e(5142).then(i.bind(i,45142))).etherscanSvg,extension:async()=>(await i.e(5498).then(i.bind(i,75498))).extensionSvg,externalLink:async()=>(await i.e(4445).then(i.bind(i,64445))).externalLinkSvg,facebook:async()=>(await i.e(4231).then(i.bind(i,14231))).facebookSvg,farcaster:async()=>(await i.e(3298).then(i.bind(i,33298))).farcasterSvg,filters:async()=>(await i.e(3748).then(i.bind(i,23748))).filtersSvg,github:async()=>(await i.e(2456).then(i.bind(i,62456))).githubSvg,google:async()=>(await i.e(9784).then(i.bind(i,9784))).googleSvg,helpCircle:async()=>(await i.e(7185).then(i.bind(i,87185))).helpCircleSvg,image:async()=>(await i.e(4970).then(i.bind(i,34970))).imageSvg,id:async()=>(await i.e(1194).then(i.bind(i,91194))).idSvg,infoCircle:async()=>(await i.e(3628).then(i.bind(i,33628))).infoCircleSvg,lightbulb:async()=>(await i.e(1052).then(i.bind(i,91052))).lightbulbSvg,mail:async()=>(await i.e(7280).then(i.bind(i,57280))).mailSvg,mobile:async()=>(await i.e(8185).then(i.bind(i,88185))).mobileSvg,more:async()=>(await i.e(5558).then(i.bind(i,35558))).moreSvg,networkPlaceholder:async()=>(await i.e(5445).then(i.bind(i,65445))).networkPlaceholderSvg,nftPlaceholder:async()=>(await i.e(882).then(i.bind(i,90882))).nftPlaceholderSvg,off:async()=>(await i.e(3810).then(i.bind(i,83810))).offSvg,playStore:async()=>(await i.e(541).then(i.bind(i,50541))).playStoreSvg,plus:async()=>(await i.e(9883).then(i.bind(i,39883))).plusSvg,qrCode:async()=>(await i.e(3504).then(i.bind(i,53504))).qrCodeIcon,recycleHorizontal:async()=>(await i.e(5435).then(i.bind(i,75435))).recycleHorizontalSvg,refresh:async()=>(await i.e(6476).then(i.bind(i,96476))).refreshSvg,search:async()=>(await i.e(2863).then(i.bind(i,92863))).searchSvg,send:async()=>(await i.e(5557).then(i.bind(i,65557))).sendSvg,swapHorizontal:async()=>(await i.e(6220).then(i.bind(i,76220))).swapHorizontalSvg,swapHorizontalMedium:async()=>(await i.e(4343).then(i.bind(i,24343))).swapHorizontalMediumSvg,swapHorizontalBold:async()=>(await i.e(4847).then(i.bind(i,64847))).swapHorizontalBoldSvg,swapHorizontalRoundedBold:async()=>(await i.e(9100).then(i.bind(i,19100))).swapHorizontalRoundedBoldSvg,swapVertical:async()=>(await i.e(2578).then(i.bind(i,72578))).swapVerticalSvg,telegram:async()=>(await i.e(5844).then(i.bind(i,15844))).telegramSvg,threeDots:async()=>(await i.e(636).then(i.bind(i,40636))).threeDotsSvg,twitch:async()=>(await i.e(3296).then(i.bind(i,3296))).twitchSvg,twitter:async()=>(await i.e(4755).then(i.bind(i,4755))).xSvg,twitterIcon:async()=>(await i.e(4525).then(i.bind(i,54525))).twitterIconSvg,verify:async()=>(await i.e(8394).then(i.bind(i,98394))).verifySvg,verifyFilled:async()=>(await i.e(9715).then(i.bind(i,89715))).verifyFilledSvg,wallet:async()=>(await i.e(7362).then(i.bind(i,17362))).walletSvg,walletConnect:async()=>(await i.e(3310).then(i.bind(i,93310))).walletConnectSvg,walletConnectLightBrown:async()=>(await i.e(3310).then(i.bind(i,93310))).walletConnectLightBrownSvg,walletConnectBrown:async()=>(await i.e(3310).then(i.bind(i,93310))).walletConnectBrownSvg,walletPlaceholder:async()=>(await i.e(5658).then(i.bind(i,75658))).walletPlaceholderSvg,warningCircle:async()=>(await i.e(8428).then(i.bind(i,88428))).warningCircleSvg,x:async()=>(await i.e(4755).then(i.bind(i,4755))).xSvg,info:async()=>(await i.e(239).then(i.bind(i,50239))).infoSvg,exclamationTriangle:async()=>(await i.e(9291).then(i.bind(i,39291))).exclamationTriangleSvg,reown:async()=>(await i.e(7754).then(i.bind(i,77754))).reownSvg};let S=class extends a.WF{constructor(){super(...arguments),this.size="md",this.name="copy",this.color="fg-300",this.aspectRatio="1 / 1"}render(){return this.style.cssText=`\n      --local-color: var(--wui-color-${this.color});\n      --local-width: var(--wui-icon-size-${this.size});\n      --local-aspect-ratio: ${this.aspectRatio}\n    `,a.qy`${p(async function(t){if(v.has(t))return v.get(t);const e=(m[t]??m.copy)();return v.set(t,e),e}(this.name),a.qy`<div class="fallback"></div>`)}`}};S.styles=[u.W5,u.ck,y],b([(0,n.MZ)()],S.prototype,"size",void 0),b([(0,n.MZ)()],S.prototype,"name",void 0),b([(0,n.MZ)()],S.prototype,"color",void 0),b([(0,n.MZ)()],S.prototype,"aspectRatio",void 0),S=b([(0,f.E)("wui-icon")],S)},1910:(t,e,i)=>{var a=i(5217),n=i(86971),o=i(90509),r=i(1046);const s=a.AH`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: inherit;
  }
`;var c=function(t,e,i,a){var n,o=arguments.length,r=o<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,e,i,a);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};let l=class extends a.WF{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0}render(){return this.style.cssText=`\n      --local-width: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};\n      --local-height: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};\n      `,a.qy`<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent("onLoadError",{bubbles:!0,composed:!0}))}};l.styles=[o.W5,o.ck,s],c([(0,n.MZ)()],l.prototype,"src",void 0),c([(0,n.MZ)()],l.prototype,"alt",void 0),c([(0,n.MZ)()],l.prototype,"size",void 0),l=c([(0,r.E)("wui-image")],l)},94833:(t,e,i)=>{var a=i(5217),n=i(86971),o=i(90509),r=i(1046);const s=a.AH`
  :host {
    display: flex;
  }

  :host([data-size='sm']) > svg {
    width: 12px;
    height: 12px;
  }

  :host([data-size='md']) > svg {
    width: 16px;
    height: 16px;
  }

  :host([data-size='lg']) > svg {
    width: 24px;
    height: 24px;
  }

  :host([data-size='xl']) > svg {
    width: 32px;
    height: 32px;
  }

  svg {
    animation: rotate 2s linear infinite;
  }

  circle {
    fill: none;
    stroke: var(--local-color);
    stroke-width: 4px;
    stroke-dasharray: 1, 124;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  :host([data-size='md']) > svg > circle {
    stroke-width: 6px;
  }

  :host([data-size='sm']) > svg > circle {
    stroke-width: 8px;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 124;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 124;
      stroke-dashoffset: -35;
    }

    100% {
      stroke-dashoffset: -125;
    }
  }
`;var c=function(t,e,i,a){var n,o=arguments.length,r=o<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,e,i,a);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};let l=class extends a.WF{constructor(){super(...arguments),this.color="accent-100",this.size="lg"}render(){return this.style.cssText="--local-color: "+("inherit"===this.color?"inherit":`var(--wui-color-${this.color})`),this.dataset.size=this.size,a.qy`<svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>`}};l.styles=[o.W5,s],c([(0,n.MZ)()],l.prototype,"color",void 0),c([(0,n.MZ)()],l.prototype,"size",void 0),l=c([(0,r.E)("wui-loading-spinner")],l)},2160:(t,e,i)=>{var a=i(5217),n=i(86971),o=i(66755),r=i(90509),s=i(1046);const c=a.AH`
  :host {
    display: inline-flex !important;
  }

  slot {
    width: 100%;
    display: inline-block;
    font-style: normal;
    font-family: var(--wui-font-family);
    font-feature-settings:
      'tnum' on,
      'lnum' on,
      'case' on;
    line-height: 130%;
    font-weight: var(--wui-font-weight-regular);
    overflow: inherit;
    text-overflow: inherit;
    text-align: var(--local-align);
    color: var(--local-color);
  }

  .wui-line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .wui-line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .wui-font-medium-400 {
    font-size: var(--wui-font-size-medium);
    font-weight: var(--wui-font-weight-light);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-medium-600 {
    font-size: var(--wui-font-size-medium);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-title-600 {
    font-size: var(--wui-font-size-title);
    letter-spacing: var(--wui-letter-spacing-title);
  }

  .wui-font-title-6-600 {
    font-size: var(--wui-font-size-title-6);
    letter-spacing: var(--wui-letter-spacing-title-6);
  }

  .wui-font-mini-700 {
    font-size: var(--wui-font-size-mini);
    letter-spacing: var(--wui-letter-spacing-mini);
    text-transform: uppercase;
  }

  .wui-font-large-500,
  .wui-font-large-600,
  .wui-font-large-700 {
    font-size: var(--wui-font-size-large);
    letter-spacing: var(--wui-letter-spacing-large);
  }

  .wui-font-2xl-500,
  .wui-font-2xl-600,
  .wui-font-2xl-700 {
    font-size: var(--wui-font-size-2xl);
    letter-spacing: var(--wui-letter-spacing-2xl);
  }

  .wui-font-paragraph-400,
  .wui-font-paragraph-500,
  .wui-font-paragraph-600,
  .wui-font-paragraph-700 {
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
  }

  .wui-font-small-400,
  .wui-font-small-500,
  .wui-font-small-600 {
    font-size: var(--wui-font-size-small);
    letter-spacing: var(--wui-letter-spacing-small);
  }

  .wui-font-tiny-400,
  .wui-font-tiny-500,
  .wui-font-tiny-600 {
    font-size: var(--wui-font-size-tiny);
    letter-spacing: var(--wui-letter-spacing-tiny);
  }

  .wui-font-micro-700,
  .wui-font-micro-600 {
    font-size: var(--wui-font-size-micro);
    letter-spacing: var(--wui-letter-spacing-micro);
    text-transform: uppercase;
  }

  .wui-font-tiny-400,
  .wui-font-small-400,
  .wui-font-medium-400,
  .wui-font-paragraph-400 {
    font-weight: var(--wui-font-weight-light);
  }

  .wui-font-large-700,
  .wui-font-paragraph-700,
  .wui-font-micro-700,
  .wui-font-mini-700 {
    font-weight: var(--wui-font-weight-bold);
  }

  .wui-font-medium-600,
  .wui-font-medium-title-600,
  .wui-font-title-6-600,
  .wui-font-large-600,
  .wui-font-paragraph-600,
  .wui-font-small-600,
  .wui-font-tiny-600,
  .wui-font-micro-600 {
    font-weight: var(--wui-font-weight-medium);
  }

  :host([disabled]) {
    opacity: 0.4;
  }
`;var l=function(t,e,i,a){var n,o=arguments.length,r=o<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,e,i,a);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};let h=class extends a.WF{constructor(){super(...arguments),this.variant="paragraph-500",this.color="fg-300",this.align="left",this.lineClamp=void 0}render(){const t={[`wui-font-${this.variant}`]:!0,[`wui-color-${this.color}`]:!0,[`wui-line-clamp-${this.lineClamp}`]:!!this.lineClamp};return this.style.cssText=`\n      --local-align: ${this.align};\n      --local-color: var(--wui-color-${this.color});\n    `,a.qy`<slot class=${(0,o.H)(t)}></slot>`}};h.styles=[r.W5,c],l([(0,n.MZ)()],h.prototype,"variant",void 0),l([(0,n.MZ)()],h.prototype,"color",void 0),l([(0,n.MZ)()],h.prototype,"align",void 0),l([(0,n.MZ)()],h.prototype,"lineClamp",void 0),h=l([(0,s.E)("wui-text")],h)},44138:(t,e,i)=>{var a=i(5217),n=i(86971),o=(i(27111),i(90509)),r=i(1046);const s=a.AH`
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-color: var(--wui-color-gray-glass-020);
    border-radius: var(--local-border-radius);
    border: var(--local-border);
    box-sizing: content-box;
    width: var(--local-size);
    height: var(--local-size);
    min-height: var(--local-size);
    min-width: var(--local-size);
  }

  @supports (background: color-mix(in srgb, white 50%, black)) {
    :host {
      background-color: color-mix(in srgb, var(--local-bg-value) var(--local-bg-mix), transparent);
    }
  }
`;var c=function(t,e,i,a){var n,o=arguments.length,r=o<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,e,i,a);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};let l=class extends a.WF{constructor(){super(...arguments),this.size="md",this.backgroundColor="accent-100",this.iconColor="accent-100",this.background="transparent",this.border=!1,this.borderColor="wui-color-bg-125",this.icon="copy"}render(){const t=this.iconSize||this.size,e="lg"===this.size,i="xl"===this.size,n=e?"12%":"16%",o=e?"xxs":i?"s":"3xl",r="gray"===this.background,s="opaque"===this.background,c="accent-100"===this.backgroundColor&&s||"success-100"===this.backgroundColor&&s||"error-100"===this.backgroundColor&&s||"inverse-100"===this.backgroundColor&&s;let l=`var(--wui-color-${this.backgroundColor})`;return c?l=`var(--wui-icon-box-bg-${this.backgroundColor})`:r&&(l=`var(--wui-color-gray-${this.backgroundColor})`),this.style.cssText=`\n       --local-bg-value: ${l};\n       --local-bg-mix: ${c||r?"100%":n};\n       --local-border-radius: var(--wui-border-radius-${o});\n       --local-size: var(--wui-icon-box-size-${this.size});\n       --local-border: ${"wui-color-bg-125"===this.borderColor?"2px":"1px"} solid ${this.border?`var(--${this.borderColor})`:"transparent"}\n   `,a.qy` <wui-icon color=${this.iconColor} size=${t} name=${this.icon}></wui-icon> `}};l.styles=[o.W5,o.fD,s],c([(0,n.MZ)()],l.prototype,"size",void 0),c([(0,n.MZ)()],l.prototype,"backgroundColor",void 0),c([(0,n.MZ)()],l.prototype,"iconColor",void 0),c([(0,n.MZ)()],l.prototype,"iconSize",void 0),c([(0,n.MZ)()],l.prototype,"background",void 0),c([(0,n.MZ)({type:Boolean})],l.prototype,"border",void 0),c([(0,n.MZ)()],l.prototype,"borderColor",void 0),c([(0,n.MZ)()],l.prototype,"icon",void 0),l=c([(0,r.E)("wui-icon-box")],l)},92985:(t,e,i)=>{var a=i(5217),n=i(86971),o=(i(2160),i(90509)),r=i(1046);const s=a.AH`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--wui-spacing-m);
    padding: 0 var(--wui-spacing-3xs) !important;
    border-radius: var(--wui-border-radius-5xs);
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host > wui-text {
    transform: translateY(5%);
  }

  :host([data-variant='main']) {
    background-color: var(--wui-color-accent-glass-015);
    color: var(--wui-color-accent-100);
  }

  :host([data-variant='shade']) {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-200);
  }

  :host([data-variant='success']) {
    background-color: var(--wui-icon-box-bg-success-100);
    color: var(--wui-color-success-100);
  }

  :host([data-variant='error']) {
    background-color: var(--wui-icon-box-bg-error-100);
    color: var(--wui-color-error-100);
  }

  :host([data-size='lg']) {
    padding: 11px 5px !important;
  }

  :host([data-size='lg']) > wui-text {
    transform: translateY(2%);
  }
`;var c=function(t,e,i,a){var n,o=arguments.length,r=o<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,e,i,a);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};let l=class extends a.WF{constructor(){super(...arguments),this.variant="main",this.size="lg"}render(){this.dataset.variant=this.variant,this.dataset.size=this.size;const t="md"===this.size?"mini-700":"micro-700";return a.qy`
      <wui-text data-variant=${this.variant} variant=${t} color="inherit">
        <slot></slot>
      </wui-text>
    `}};l.styles=[o.W5,s],c([(0,n.MZ)()],l.prototype,"variant",void 0),c([(0,n.MZ)()],l.prototype,"size",void 0),l=c([(0,r.E)("wui-tag")],l)},88110:(t,e,i)=>{var a=i(5217),n=i(86971),o=i(90509),r=i(28364),s=i(1046);const c=a.AH`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
  }
`;var l=function(t,e,i,a){var n,o=arguments.length,r=o<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,e,i,a);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};let h=class extends a.WF{render(){return this.style.cssText=`\n      flex-direction: ${this.flexDirection};\n      flex-wrap: ${this.flexWrap};\n      flex-basis: ${this.flexBasis};\n      flex-grow: ${this.flexGrow};\n      flex-shrink: ${this.flexShrink};\n      align-items: ${this.alignItems};\n      justify-content: ${this.justifyContent};\n      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};\n      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};\n      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};\n      padding-top: ${this.padding&&r.Z.getSpacingStyles(this.padding,0)};\n      padding-right: ${this.padding&&r.Z.getSpacingStyles(this.padding,1)};\n      padding-bottom: ${this.padding&&r.Z.getSpacingStyles(this.padding,2)};\n      padding-left: ${this.padding&&r.Z.getSpacingStyles(this.padding,3)};\n      margin-top: ${this.margin&&r.Z.getSpacingStyles(this.margin,0)};\n      margin-right: ${this.margin&&r.Z.getSpacingStyles(this.margin,1)};\n      margin-bottom: ${this.margin&&r.Z.getSpacingStyles(this.margin,2)};\n      margin-left: ${this.margin&&r.Z.getSpacingStyles(this.margin,3)};\n    `,a.qy`<slot></slot>`}};h.styles=[o.W5,c],l([(0,n.MZ)()],h.prototype,"flexDirection",void 0),l([(0,n.MZ)()],h.prototype,"flexWrap",void 0),l([(0,n.MZ)()],h.prototype,"flexBasis",void 0),l([(0,n.MZ)()],h.prototype,"flexGrow",void 0),l([(0,n.MZ)()],h.prototype,"flexShrink",void 0),l([(0,n.MZ)()],h.prototype,"alignItems",void 0),l([(0,n.MZ)()],h.prototype,"justifyContent",void 0),l([(0,n.MZ)()],h.prototype,"columnGap",void 0),l([(0,n.MZ)()],h.prototype,"rowGap",void 0),l([(0,n.MZ)()],h.prototype,"gap",void 0),l([(0,n.MZ)()],h.prototype,"padding",void 0),l([(0,n.MZ)()],h.prototype,"margin",void 0),h=l([(0,s.E)("wui-flex")],h)},86971:(t,e,i)=>{i.d(e,{MZ:()=>a.M,wk:()=>n.w});var a=i(25598),n=i(77202)},66755:(t,e,i)=>{i.d(e,{H:()=>a.H});var a=i(80427)},43445:(t,e,i)=>{i.d(e,{J:()=>a.J});var a=i(24637)}}]);
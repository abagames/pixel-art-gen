!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.pag=e():t.pag=e()}(window,function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.defaultOptions={isMirrorX:!1,isMirrorY:!1,seed:0,hue:null,saturation:.8,value:1,rotationNum:1,scale:null,scaleX:null,scaleY:null,scalePattern:1,scalePatternX:null,scalePatternY:null,isRotatingRight:!1,isRotatingLeft:!1,isReverseX:!1,isReverseY:!1,isAddingEdgeFirst:!1,isInnerEdge:!1,colorNoise:.1,colorLighting:1,edgeDarkness:.4,isShowingEdge:!0,isShowingBody:!0,isLimitingColors:!1,isUsingLetterForm:!1,letterFormChar:"x",letterFormFontFamily:"monospace",letterFormFontSize:16,letterWidthRatio:.8,letterHeightRatio:.9};let r={},o={},i=0;function s(t,n={}){n.baseSeed=i;let o=Array.isArray(t)?t:t.split("\n");const s=JSON.stringify({patterns:o,options:n});if(r[s])return r[s];let l={};m(e.defaultOptions,(t,e)=>{l[e]=t}),m(n,(t,e)=>{l[e]=t});const a=new p;let u=i+function(t){let e=0;const n=t.length;for(let r=0;r<n;r++){const n=t.charCodeAt(r);e=(e<<5)-e+n,e|=0}return e}(o.join());null!=l.seed&&(u+=l.seed),a.setSeed(u),null==l.hue&&(l.hue=a.get()),null==l.scalePatternX&&(l.scalePatternX=l.scalePattern),null==l.scalePatternY&&(l.scalePatternY=l.scalePattern),l.isUsingLetterForm&&(o=function(t,e){const n=y(t,(t,e)=>Math.max(t,e.length),0),r=t.length,o=e.letterFormFontSize,i=Math.round(n*o*e.letterWidthRatio),s=Math.round(r*o*1.2*e.letterHeightRatio),l=document.createElement("canvas");l.width=i,l.height=s;const a=l.getContext("2d");a.font=`${o}px ${e.letterFormFontFamily}`,a.textBaseline="top",g(n,n=>{g(r,r=>{a.fillText(t[r][n],n*o*e.letterWidthRatio,r*o*1.2*e.letterHeightRatio)})});const u=a.getImageData(0,0,i,s).data,h=function(t,e,n){let r=e,o=-1,i=n,s=-1,l=3;return g(n,n=>{g(e,e=>{t[l]>0&&(r=e<r?e:r,o=e>o?e:o,i=n<i?n:i,s=n>s?n:s),l+=4})}),{bx:r,ex:o,by:i,ey:s}}(u,i,s),c=h.ex-h.bx+1;let f=[];return g(h.ey-h.by+1,t=>{let n="";g(c,r=>{const o=4*(r+h.bx+(t+h.by)*i)+3;n+=u[o]>.5?e.letterFormChar:" "}),f.push(n)}),f}(o,l));let b,x=function(t,e,n){let r=y(t,(t,e)=>Math.max(t,e.length),0),o=t.length,i=Math.round(r*e.scalePatternX),s=Math.round(o*e.scalePatternY);i+=e.isMirrorX?1:2,s+=e.isMirrorY?1:2;let l=function(t,e,n,r,o,i,s,l,a,u){let c=d(r,r=>{const a=Math.floor((r-1)/i);return d(o,r=>{const o=Math.floor((r-1)/s);if(a<0||a>=e||o<0||o>=n)return 0;const i=a<t[o].length?t[o][a]:" ";let h=0;return"-"===i?h=u.get()<.5?1:l?.5:0:"x"===i||"X"===i?h=u.get()<.5?1:-1:"o"===i||"O"===i?h=-1:"*"===i&&(h=1),h})});l&&(c=M(c=h(c,r,o,l,a),t=>M(t,t=>Math.floor(t))));return c}(t,r,o,i,s,e.scalePatternX,e.scalePatternY,e.isAddingEdgeFirst,e.isInnerEdge,n);e.isMirrorX&&(l=function(t,e,n){return d(2*e,r=>d(n,n=>r<e?t[r][n]:t[2*e-r-1][n]))}(l,i,s),i*=2);e.isMirrorY&&(l=function(t,e,n){return d(e,e=>d(2*n,r=>r<n?t[e][r]:t[e][2*n-r-1]))}(l,i,s),s*=2);if(e.isRotatingRight||e.isRotatingLeft){l=function(t,e,n,r){return d(n,r?r=>d(e,e=>t[e][n-1-r]):n=>d(e,r=>t[e-1-r][n]))}(l,i,s,e.isRotatingRight);const t=i;i=s,s=t}(e.isReverseX||e.isReverseY)&&(l=function(t,e,n,r){return d(e,r?r=>d(n,n=>t[e-1-r][n]):e=>d(n,r=>t[e][n-1-r]))}(l,i,s,e.isReverseX));l=h(l,i,s,!1,e.isInnerEdge),(null!=e.scale||null!=e.scaleX||null!=e.scaleY)&&(l=function(t,e,n,r){const o=null!=r.scaleX?r.scaleX:null!=r.scale?r.scale:1,i=null!=r.scaleY?r.scaleY:null!=r.scale?r.scale:1,s=Math.round(e*o),l=Math.round(n*i);let a=d(s,r=>{const s=Math.floor((r-1)/o);return d(l,r=>{const o=Math.floor((r-1)/i);return s<0||s>=e||o<0||o>=n?0:t[s][o]})});const u=(o+i)/2;return g(Math.floor((u-1)/2),()=>{a=function(t,e,n){return d(e,r=>d(n,o=>-1===t[r][o]&&c(t,e,n,0,r,o)?0:-1===t[r][o]&&c(t,e,n,1,r,o)?1:t[r][o]))}(a,s,l)}),h(a,s,l,!1,r.isInnerEdge)}(l,i,s,e));return l}(o,l,a);return b=l.rotationNum>1?M(function(t,e){const n=t.length,r=t[0].length,o=n/2,i=r/2,s=Math.max(n,r),l=2*Math.round(1.5*s/2),a=2*Math.round(1.5*s/2),u=l/2,h=a/2;let c={x:0,y:0};return d(e,s=>{const f=-s*Math.PI*2/e;return d(l,e=>d(a,s=>{c.x=e-u,c.y=s-h,function(t,e){const n=t.x;t.x=Math.cos(e)*n-Math.sin(e)*t.y,t.y=Math.sin(e)*n+Math.cos(e)*t.y}(c,f);const l=Math.round(c.x+o),a=Math.round(c.y+i);return l<0||l>=n||a<0||a>=r?0:t[l][a]}))})}(x,l.rotationNum),t=>f(t,l)):[f(x,l)],r[s]=b,b}function l(t,e={},n=!1){e.baseSeed=i;let r=Array.isArray(t)?t:t.split("\n");const l=JSON.stringify({patterns:r,options:e});if(o[l])return n?Promise.resolve(o[l]):o[l];const a=s(r,e),h=a[0].length,c=a[0][0].length,f=document.createElement("canvas");f.width=h,f.height=c;const g=f.getContext("2d");let d=[],m=[];for(let t=0;t<a.length;t++){g.clearRect(0,0,h,c),u(g,a,h/2,c/2,t);const e=new Image;n&&m.push(new Promise((t,n)=>{e.onload=(n=>{t(e)})})),e.src=f.toDataURL(),d.push(e)}return o[l]=d,n?Promise.all(m):d}e.generate=s,e.generateImages=function(t,e={}){return l(t,e)},e.generateImagesPromise=function(t,e={}){return l(t,e,!0)},e.setSeed=function(t=0){i=t},e.setDefaultOptions=function(t){m(t,(t,n)=>{e.defaultOptions[n]=t})};class a{constructor(){this.r=0,this.g=0,this.b=0,this.isEmpty=!0}setFromHsv(t,e,n,r=!1){this.isEmpty=!1,this.r=n,this.g=n,this.b=n;const o=6*t,i=Math.floor(o),s=o-i;switch(i){case 0:this.g*=1-e*(1-s),this.b*=1-e;break;case 1:this.b*=1-e,this.r*=1-e*s;break;case 2:this.b*=1-e*(1-s),this.r*=1-e;break;case 3:this.r*=1-e,this.g*=1-e*s;break;case 4:this.r*=1-e*(1-s),this.g*=1-e;break;case 5:this.g*=1-e,this.b*=1-e*s}!0===r&&(this.r=this.limitColor(this.r),this.g=this.limitColor(this.g),this.b=this.limitColor(this.b)),this.setStyle()}setStyle(){const t=Math.floor(255*this.r),e=Math.floor(255*this.g),n=Math.floor(255*this.b);this.style=`rgb(${t},${e},${n})`}limitColor(t){return t<.25?0:t<.75?.5:1}}function u(t,e,n,r,o=0){const i=e[o],s=i.length,l=i[0].length,a=Math.floor(n-s/2),u=Math.floor(r-l/2);for(let e=0,n=u;e<l;e++,n++)for(let r=0,o=a;r<s;r++,o++){const s=i[r][e];s.isEmpty||(t.fillStyle=s.style,t.fillRect(o,n,1,1))}}function h(t,e,n,r,o){let i;return i=r?o?(r,o)=>1===Math.ceil(t[r][o])&&c(t,e,n,0,r,o):(r,o)=>0===t[r][o]&&c(t,e,n,null,r,o,t=>0!==t):o?(r,o)=>1===t[r][o]&&c(t,e,n,0,r,o):(r,o)=>0===t[r][o]&&c(t,e,n,1,r,o),d(e,e=>d(n,n=>i(e,n)?-1:t[e][n]))}function c(t,e,n,r,o,i,s=null){return[[-1,0],[1,0],[0,-1],[0,1]].some(l=>{const a=o+l[0],u=i+l[1];return!(a<0||a>=e||u<0||u>=n)&&(null==s?t[a][u]===r:s(t[a][u]))})}function f(t,e){const n=t.length,r=t[0].length;let o=0,i=!1;for(let e=0;e<r/2;e++){for(let o=0;o<n;o++)if(0!==t[o][e]||0!==t[o][r-1-e]){i=!0;break}if(i)break;o++}let s=r-2*o;s<=0&&(s=1);const l=new p;return l.setSeed(e.seed),d(n,n=>d(r,r=>{const i=t[n][r];if(1===i&&!e.isShowingBody||-1===i&&!e.isShowingEdge)return new a;if(0!==i){let t=((Math.sin((r-o)/s*Math.PI)*e.colorLighting+(1-e.colorLighting))*(1-e.colorNoise)+l.get()*e.colorNoise)*e.value;t=t>=0?t<=1?t:1:0,-1===i&&(t*=1-e.edgeDarkness);const n=new a;return n.setFromHsv(e.hue,e.saturation,t,e.isLimitingColors),n}return new a}))}function g(t,e){for(let n=0;n<t;n++)e(n)}function d(t,e){let n=[];for(let r=0;r<t;r++)n.push(e(r));return n}function m(t,e){for(let n in t)e(t[n],n)}function M(t,e){let n=[];for(let r=0;r<t.length;r++)n.push(e(t[r],r));return n}function y(t,e,n){let r=n;for(let n=0;n<t.length;n++)r=e(r,t[n],n);return r}e.Pixel=a,e.draw=u,e.drawImage=function(t,e,n,r,o=0){const i=e[o];t.drawImage(i,Math.floor(n-i.width/2),Math.floor(r-i.height/2))};class p{get(t=1,e=null){return null==e&&(e=t,t=0),this.getToMaxInt()/4294967295*(e-t)+t}getInt(t,e=null){return null==e&&(e=t,t=0),this.getToMaxInt()%(e-t)+t}getPm(){return 2*this.getInt(2)-1}select(t){return t[this.getInt(t.length)]}setSeed(t=null,e=123456789,n=362436069,r=521288629,o=32){this.w=null!=t?t>>>0:Math.floor(4294967295*Math.random())>>>0,this.x=e>>>0,this.y=n>>>0,this.z=r>>>0;for(let t=0;t<o;t++)this.getToMaxInt();return this}getToMaxInt(){const t=this.x^this.x<<11;return this.x=this.y,this.y=this.z,this.z=this.w,this.w=(this.w^this.w>>>19^t^t>>>8)>>>0,this.w}constructor(){this.setSeed(),this.get=this.get.bind(this),this.getToMaxInt=this.getToMaxInt.bind(this)}}}])});
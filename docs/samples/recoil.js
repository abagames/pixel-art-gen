!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){window,e.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){var n;!function(e){"use strict";String.fromCharCode;var t=2*+Math.PI,n=16,r=1,o=Math.sin,a=Math.pow,i=Math.abs;e.SampleRate=0,e.Sec=0,e.SetSampleRate=function(t){e.SampleRate=0|t,e.Sec=0|t},e.SetSampleRate(void 0!==s?(new s).sampleRate:44100),e.Sound=function(t){var n=new c(t,e.DefaultModules),r=F(n.getSamplesLeft());return n.generate(r),g(r)},e.Sounds=function(t,n,r){var o={},a={};a._audio=o;var i=[];M(t,function(e,t){a[t]=function(){void 0!==o[t]&&(o[t].currentTime=0,o[t].play())},i.push(t)});var s=0,l=i.length;return function a(){if(0!=i.length){var u=i.shift();o[u]=e.Sound(t[u]),r&&r(u,++s,l),window.setTimeout(a,30)}else n&&n(sounds)}(),a},e.SoundsImmediate=function(t){var n={},r={};return r._audio=n,M(t,function(t,o){n[o]=e.Sound(t),r[o]=function(){void 0!==n[o]&&(n[o].currentTime=0,n[o].play())}}),r};var s=window.AudioContext||window.webkitAudioContext;void 0!==s?(e.Node=function(t,n,r,o,a){var i=t.createScriptProcessor(o,0,1),s=new c(n,r||e.DefaultModules);return i.onaudioprocess=function(e){var t=e.outputBuffer.getChannelData(0);s.generate(t),!a&&s.finished&&setTimeout(function(){i.disconnect()},30)},i},e.Live=function(t,n,r){r=r||2048;var o={},a=new s,i=a.createGain();function l(e,t){var n=a.createBufferSource();return n.buffer=e,null!=t&&(n.detune.value=t),n.start=n.start||n.noteOn,n}return i.connect(a.destination),o._context=a,o._volume=i,M(t,function(t,s){o[s]=function(){e.Node(a,t,n,r).connect(i)}}),o._close=function(){a.close()},o._play=function(t){e.Node(a,t,n,r).connect(i)},o._createBuffer=function(t){var n=new c(t,e.DefaultModules),r=F(n.getSamplesLeft());return n.generate(r),o._createBufferFromBlock(r)},o._createEmptyBuffer=function(){return o._createBufferFromBlock([0])},o._createBufferFromBlock=function(t){var n=a.createBuffer(1,t.length,e.SampleRate);return n.getChannelData(0).set(t),n},o._playBuffer=function(e,t,n){var r=l(e,n);r.connect(i),r.start(t)},o._playBufferAndConnect=function(e,t,n,r){var o=l(e,r);o.connect(n),n.connect(i),o.start(t)},o._createGain=function(){return a.createGain()},o}):e.Live=function(e,t,n){return null},e.Module={},e.G={};var l=e.stage={PhaseSpeed:0,PhaseSpeedMod:10,Generator:20,SampleMod:30,Volume:40};function u(e,t){return e.stage-t.stage}function h(e,t){for(var n=0;n<t.length;n+=1){var r=t[n],o=e[r.name]||{};M(r.params,function(e,t){void 0===o[t]&&(o[t]=e.D)}),e[r.name]=o}}function c(t,n){t=t||{},n=n||e.DefaultModules,t="function"==typeof t?t():JSON.parse(JSON.stringify(t)),this.finished=!1,this.state={SampleRate:t.SampleRate||e.SampleRate},(n=n.slice()).sort(u),this.modules=n,h(t,n);for(var r=0;r<this.modules.length;r+=1){var o=this.modules[r];this.modules[r].setup(this.state,t[o.name])}}function f(){return M(e.Module,function(){return{}})}function p(e){for(var t in e)0==b(e[t]).length&&delete e[t]}function d(e){return new Function("$","block","var TAU = Math.PI * 2;\nvar sample;\nvar phase = +$.generatorPhase,\n\tA = +$.generatorA, ASlide = +$.generatorASlide,\n\tB = +$.generatorB, BSlide = +$.generatorBSlide;\n\nfor(var i = 0; i < block.length; i++){\n\tvar phaseSpeed = block[i];\n\tphase += phaseSpeed;\n\tif(phase > TAU){ phase -= TAU };\n\tA += ASlide; B += BSlide;\n   A = A < 0 ? 0 : A > 1 ? 1 : A;\n   B = B < 0 ? 0 : B > 1 ? 1 : B;\n"+e+"\tblock[i] = sample;\n}\n\n$.generatorPhase = phase;\n$.generatorA = A;\n$.generatorB = B;\nreturn block.length;\n")}function g(t){"undefined"!=typeof Float32Array&&y(t instanceof Float32Array,"data must be an Float32Array");var o=r*n>>3,a=e.SampleRate*o,i=function(e){if("undefined"==typeof Uint8Array)for(var t=new Array(e),n=0;n<t.length;n++)t[n]=0;return new Uint8Array(e)}(44+2*t.length),s=0;function l(e){for(var t=0;t<e.length;t+=1)i[s]=e.charCodeAt(t),s++}function u(e,t){t<=0||(i[s]=255&e,s++,u(e>>8,t-1))}return l("RIFF"),u(36+2*t.length,4),l("WAVEfmt "),u(16,4),u(1,2),u(r,2),u(e.SampleRate,4),u(a,4),u(o,2),u(n,2),l("data"),u(2*t.length,4),m(i.subarray(s),t),new Audio("data:audio/wav;base64,"+function(e){for(var t="",n=0;n<e.length;n+=32768){var r=Math.min(n+32768,e.length);t+=String.fromCharCode.apply(null,e.subarray(n,r))}return btoa(t)}(i))}function m(e,t){y(e.length/2==t.length,"the target buffer must be twice as large as the iinput");for(var n=0,r=0;r<t.length;r++){var o=32767*+t[r]|0;o=o<-32768?-32768:32767<o?32767:o,o+=o<0?65536:0,e[n]=255&o,e[++n]=o>>8,n++}}function y(e,t){if(!e)throw new Error(t)}function S(e,t,n){return n=+n,(e=+e)<(t=+t)?+t:e>n?+n:+e}function v(e){return(e=+e)<0?0:e>1?1:+e}function M(e,t){var n={};for(var r in e)e.hasOwnProperty(r)&&(n[r]=t(e[r],r));return n}function P(e,t){var n=w();return void 0!==e&&(n*=e),void 0!==t&&(n+=t),n}function x(e){return e[e.length*w()|0]}function b(e){var t=[];for(var n in e)t.push(n);return t}function F(e){if("undefined"==typeof Float32Array)for(var t=new Array(e),n=0;n<t.length;n++)t[n]=0;return new Float32Array(e)}e.InitDefaultParams=h,e.Processor=c,c.prototype={generate:function(e){for(var t=0;t<e.length;t+=1)e[t]=0;if(!this.finished){var n=this.state,r=0|e.length;for(t=0;t<this.modules.length;t+=1){var o=0|this.modules[t].process(n,e.subarray(0,r));r=Math.min(r,o)}for(r<e.length&&(this.finished=!0),t=r;t<e.length;t++)e[t]=0}},getSamplesLeft:function(){for(var e=0,t=0;t<this.state.envelopes.length;t+=1)e+=this.state.envelopes[t].N;return 0===e&&(e=3*this.state.SampleRate),e}},e.Module.Frequency={name:"Frequency",params:{Start:{L:30,H:1800,D:440},Min:{L:30,H:1800,D:30},Max:{L:30,H:1800,D:1800},Slide:{L:-1,H:1,D:0},DeltaSlide:{L:-1,H:1,D:0},RepeatSpeed:{L:0,H:3,D:0},ChangeAmount:{L:-12,H:12,D:0},ChangeSpeed:{L:0,H:1,D:0}},stage:l.PhaseSpeed,setup:function(e,n){var r=e.SampleRate;e.phaseParams=n,e.phaseSpeed=n.Start*t/r,e.phaseSpeedMax=n.Max*t/r,e.phaseSpeedMin=n.Min*t/r,e.phaseSpeedMin=Math.min(e.phaseSpeedMin,e.phaseSpeed),e.phaseSpeedMax=Math.max(e.phaseSpeedMax,e.phaseSpeed),e.phaseSlide=1+64*a(n.Slide,3)/r,e.phaseDeltaSlide=a(n.DeltaSlide,3)/(1e3*r),e.repeatTime=0,e.repeatLimit=1/0,n.RepeatSpeed>0&&(e.repeatLimit=n.RepeatSpeed*r),e.arpeggiatorTime=0,e.arpeggiatorLimit=n.ChangeSpeed*r,0==n.ChangeAmount&&(e.arpeggiatorLimit=1/0),e.arpeggiatorMod=1+n.ChangeAmount/12},process:function(e,t){for(var n=+e.phaseSpeed,r=+e.phaseSpeedMin,o=+e.phaseSpeedMax,a=+e.phaseSlide,i=+e.phaseDeltaSlide,s=e.repeatTime,l=e.repeatLimit,u=e.arpeggiatorTime,h=e.arpeggiatorLimit,c=e.arpeggiatorMod,f=0;f<t.length;f++){if(n=(n*=a+=i)<r?r:n>o?o:n,s>l)return this.setup(e,e.phaseParams),f+this.process(e,t.subarray(f))-1;s++,u>h&&(n*=c,u=0,h=1/0),u++,t[f]+=n}return e.repeatTime=s,e.arpeggiatorTime=u,e.arpeggiatorLimit=h,e.phaseSpeed=n,e.phaseSlide=a,t.length}},e.Module.Vibrato={name:"Vibrato",params:{Depth:{L:0,H:1,D:0},DepthSlide:{L:-1,H:1,D:0},Frequency:{L:.01,H:48,D:0},FrequencySlide:{L:-1,H:1,D:0}},stage:l.PhaseSpeedMod,setup:function(e,n){var r=e.SampleRate;e.vibratoPhase=0,e.vibratoDepth=n.Depth,e.vibratoPhaseSpeed=n.Frequency*t/r,e.vibratoPhaseSpeedSlide=1+3*a(n.FrequencySlide,3)/r,e.vibratoDepthSlide=n.DepthSlide/r},process:function(e,n){var r=+e.vibratoPhase,a=+e.vibratoDepth,i=+e.vibratoPhaseSpeed,s=+e.vibratoPhaseSpeedSlide,l=+e.vibratoDepthSlide;if(0==a&&l<=0)return n.length;for(var u=0;u<n.length;u++)(r+=i)>t&&(r-=t),n[u]+=n[u]*o(r)*a,i*=s,a=v(a+=l);return e.vibratoPhase=r,e.vibratoDepth=a,e.vibratoPhaseSpeed=i,n.length}},e.Module.Generator={name:"Generator",params:{Func:{C:e.G,D:"square"},A:{L:0,H:1,D:0},B:{L:0,H:1,D:0},ASlide:{L:-1,H:1,D:0},BSlide:{L:-1,H:1,D:0}},stage:l.Generator,setup:function(t,n){t.generatorPhase=0,"string"==typeof n.Func?t.generator=e.G[n.Func]:t.generator=n.Func,"object"==typeof t.generator&&(t.generator=t.generator.create()),y("function"==typeof t.generator,"generator must be a function"),t.generatorA=n.A,t.generatorASlide=n.ASlide,t.generatorB=n.B,t.generatorBSlide=n.BSlide},process:function(e,t){return e.generator(e,t)}},e.Module.Guitar={name:"Guitar",params:{A:{L:0,H:1,D:1},B:{L:0,H:1,D:1},C:{L:0,H:1,D:1}},stage:l.Generator,setup:function(e,t){e.guitarA=t.A,e.guitarB=t.B,e.guitarC=t.C,e.guitarBuffer=F(65536),e.guitarHead=0;for(var n=e.guitarBuffer,r=0;r<n.length;r++)n[r]=2*w()-1},process:function(e,n){for(var r=65536,o=r-1,a=+e.guitarA,i=+e.guitarB,s=+e.guitarC,l=a+i+s,u=e.guitarHead,h=e.guitarBuffer,c=0;c<n.length;c++){var f=t/n[c]|0,p=u-(f=f>r?r:f)+r&o;h[u]=(h[p-0+r&o]*a+h[p-1+r&o]*i+h[p-2+r&o]*s)/l,n[c]=h[u],u=u+1&o}return e.guitarHead=u,n.length}},e.Module.Filter={name:"Filter",params:{LP:{L:0,H:1,D:1},LPSlide:{L:-1,H:1,D:0},LPResonance:{L:0,H:1,D:0},HP:{L:0,H:1,D:0},HPSlide:{L:-1,H:1,D:0}},stage:l.SampleMod+0,setup:function(e,t){e.FilterEnabled=t.HP>1e-6||t.LP<1-1e-6,e.LPEnabled=t.LP<1-1e-6,e.LP=a(t.LP,3)/10,e.LPSlide=1+100*t.LPSlide/e.SampleRate,e.LPPos=0,e.LPPosSlide=0,e.LPDamping=5/(1+20*a(t.LPResonance,2))*(.01+t.LP),e.LPDamping=1-Math.min(e.LPDamping,.8),e.HP=a(t.HP,2)/10,e.HPPos=0,e.HPSlide=1+100*t.HPSlide/e.SampleRate},enabled:function(e){return e.FilterEnabled},process:function(e,t){if(!this.enabled(e))return t.length;for(var n=+e.LP,r=+e.LPPos,o=+e.LPPosSlide,a=+e.LPSlide,i=+e.LPDamping,s=+e.LPEnabled,l=+e.HP,u=+e.HPPos,h=+e.HPSlide,c=0;c<t.length;c++){(l>1e-6||l<-1e-6)&&(l=(l*=h)<1e-6?1e-6:l>.1?.1:l);var f=r;n=(n*=a)<0?n=0:n>.1?.1:n;var p=t[c];s?(o+=(p-r)*n,o*=i):(r=p,o=0),u+=(r+=o)-f,u*=1-l,t[c]=u}return e.LPPos=r,e.LPPosSlide=o,e.LP=n,e.HP=l,e.HPPos=u,t.length}},e.Module.Phaser={name:"Phaser",params:{Offset:{L:-1,H:1,D:0},Sweep:{L:-1,H:1,D:0}},stage:l.SampleMod+1,setup:function(e,t){e.phaserBuffer=F(1024),e.phaserPos=0,e.phaserOffset=1020*a(t.Offset,2),e.phaserOffsetSlide=4e3*a(t.Sweep,3)/e.SampleRate},enabled:function(e){return i(e.phaserOffsetSlide)>1e-6||i(e.phaserOffset)>1e-6},process:function(e,t){if(!this.enabled(e))return t.length;for(var n=e.phaserBuffer,r=0|e.phaserPos,o=+e.phaserOffset,a=+e.phaserOffsetSlide,i=0;i<t.length;i++){(o+=a)<0&&(o=-o,a=-a),o>1023&&(o=1023,a=0),n[r]=t[i];var s=r-(0|o)+1024&1023;t[i]+=n[s],r=r+1&1023|0}return e.phaserPos=r,e.phaserOffset=o,t.length}},e.Module.Volume={name:"Volume",params:{Master:{L:0,H:1,D:.5},Attack:{L:.001,H:1,D:.01},Sustain:{L:0,H:2,D:.3},Punch:{L:0,H:3,D:1},Decay:{L:.001,H:2,D:1}},stage:l.Volume,setup:function(e,t){var n=e.SampleRate,r=t.Master,o=r*(1+t.Punch);e.envelopes=[{S:0,E:r,N:t.Attack*n|0},{S:o,E:r,N:t.Sustain*n|0},{S:r,E:0,N:t.Decay*n|0}];for(var a=0;a<e.envelopes.length;a+=1){var i=e.envelopes[a];i.G=(i.E-i.S)/i.N}},process:function(e,t){for(var n=0;e.envelopes.length>0&&n<t.length;){for(var r=e.envelopes[0],o=r.S,a=r.G,i=0|Math.min(t.length-n,r.N),s=n+i|0;n<s;n+=1)t[n]*=o,o=S(o+=a,0,10);r.S=o,r.N-=i,r.N<=0&&e.envelopes.shift()}return n}},e.DefaultModules=[e.Module.Frequency,e.Module.Vibrato,e.Module.Generator,e.Module.Filter,e.Module.Phaser,e.Module.Volume],e.DefaultModules.sort(u),e.EmptyParams=f,e._RemoveEmptyParams=p,e.Preset={Reset:function(){return f()},Coin:function(){var e=f();return e.Frequency.Start=P(880,660),e.Volume.Sustain=P(.1),e.Volume.Decay=P(.4,.1),e.Volume.Punch=P(.3,.3),P()<.5&&(e.Frequency.ChangeSpeed=P(.15,.1),e.Frequency.ChangeAmount=P(8,4)),p(e),e},Laser:function(){var e=f();return e.Generator.Func=x(["square","saw","sine"]),P()<.33?(e.Frequency.Start=P(880,440),e.Frequency.Min=P(.1),e.Frequency.Slide=P(.3,-.8)):(e.Frequency.Start=P(1200,440),e.Frequency.Min=e.Frequency.Start-P(880,440),e.Frequency.Min<110&&(e.Frequency.Min=110),e.Frequency.Slide=P(.3,-1)),P()<.5?(e.Generator.A=P(.5),e.Generator.ASlide=P(.2)):(e.Generator.A=P(.5,.4),e.Generator.ASlide=P(.7)),e.Volume.Sustain=P(.2,.1),e.Volume.Decay=P(.4),P()<.5&&(e.Volume.Punch=P(.3)),P()<.33&&(e.Phaser.Offset=P(.2),e.Phaser.Sweep=P(.2)),P()<.5&&(e.Filter.HP=P(.3)),p(e),e},Explosion:function(){var e=f();return e.Generator.Func="noise",P()<.5?(e.Frequency.Start=P(440,40),e.Frequency.Slide=P(.4,-.1)):(e.Frequency.Start=P(1600,220),e.Frequency.Slide=P(-.2,-.2)),P()<.2&&(e.Frequency.Slide=0),P()<.3&&(e.Frequency.RepeatSpeed=P(.5,.3)),e.Volume.Sustain=P(.3,.1),e.Volume.Decay=P(.5),e.Volume.Punch=P(.6,.2),P()<.5&&(e.Phaser.Offset=P(.9,-.3),e.Phaser.Sweep=P(-.3)),P()<.33&&(e.Frequency.ChangeSpeed=P(.3,.6),e.Frequency.ChangeAmount=P(24,-12)),p(e),e},Powerup:function(){var e=f();return P()<.5?e.Generator.Func="saw":e.Generator.A=P(.6),e.Frequency.Start=P(220,440),P()<.5?(e.Frequency.Slide=P(.5,.2),e.Frequency.RepeatSpeed=P(.4,.4)):(e.Frequency.Slide=P(.2,.05),P()<.5&&(e.Vibrato.Depth=P(.6,.1),e.Vibrato.Frequency=P(30,10))),e.Volume.Sustain=P(.4),e.Volume.Decay=P(.4,.1),p(e),e},Hit:function(){var e=f();return e.Generator.Func=x(["square","saw","noise"]),e.Generator.A=P(.6),e.Generator.ASlide=P(1,-.5),e.Frequency.Start=P(880,220),e.Frequency.Slide=-P(.4,.3),e.Volume.Sustain=P(.1),e.Volume.Decay=P(.2,.1),P()<.5&&(e.Filter.HP=P(.3)),p(e),e},Jump:function(){var e=f();return e.Generator.Func="square",e.Generator.A=P(.6),e.Frequency.Start=P(330,330),e.Frequency.Slide=P(.4,.2),e.Volume.Sustain=P(.3,.1),e.Volume.Decay=P(.2,.1),P()<.5&&(e.Filter.HP=P(.3)),P()<.3&&(e.Filter.LP=P(-.6,1)),p(e),e},Select:function(){var e=f();return e.Generator.Func=x(["square","saw"]),e.Generator.A=P(.6),e.Frequency.Start=P(660,220),e.Volume.Sustain=P(.1,.1),e.Volume.Decay=P(.2),e.Filter.HP=.2,p(e),e},Lucky:function(){var t=f();return M(t,function(t,n){M(e.Module[n].params,function(e,n){if(e.C){var r=b(e.C);t[n]=r[r.length*w()|0]}else t[n]=w()*(e.H-e.L)+e.L})}),t.Volume.Master=.4,t.Filter={},p(t),t}},e.G.unoise=d("sample = Math.random();"),e.G.sine=d("sample = Math.sin(phase);"),e.G.saw=d("sample = 2*(phase/TAU - ((phase/TAU + 0.5)|0));"),e.G.triangle=d("sample = Math.abs(4 * ((phase/TAU - 0.25)%1) - 2) - 1;"),e.G.square=d("var s = Math.sin(phase); sample = s > A ? 1.0 : s < A ? -1.0 : A;"),e.G.synth=d("sample = Math.sin(phase) + .5*Math.sin(phase/2) + .3*Math.sin(phase/4);"),e.G.noise=d("if(phase % TAU < 4){__noiseLast = Math.random() * 2 - 1;} sample = __noiseLast;"),e.G.string={create:function(){for(var e=65536,t=e-1,n=F(e),r=0;r<n.length;r++)n[r]=2*w()-1;var o=0;return function(r,a){for(var i=2*Math.PI,s=+r.generatorA,l=+r.generatorASlide,u=+r.generatorB,h=+r.generatorBSlide,c=n,f=0;f<a.length;f++){var p=a[f];u+=h,s=(s+=l)<0?0:s>1?1:s,u=u<0?0:u>1?1:u;var d=o-(i/p|0)+e&t,g=(1*c[d-0+e&t]+c[d-1+e&t]*s+c[d-2+e&t]*u)/(1+s+u);c[o]=g,a[f]=c[o],o=o+1&t}return r.generatorA=s,r.generatorB=u,a.length}}},e.CreateAudio=g,e.DownloadAsFile=function(e){y(e instanceof Audio,"input must be an Audio object"),document.location.href=e.src},e.Util={},e.Util.CopyFToU8=m,e._createFloatArray=F;var L=Math.random;function w(){return L()}e.setRandomFunc=function(e){L=e}}(n={}),e.exports=n},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0);let o,a;t.Preset=r.Preset;let i,s,l={},u={},h=[];const c={c:t.Preset.Coin,l:t.Preset.Laser,e:t.Preset.Explosion,p:t.Preset.Powerup,h:t.Preset.Hit,j:t.Preset.Jump,s:t.Preset.Select,u:t.Preset.Lucky},f=function(e){let t=[];for(let n in e)e.hasOwnProperty(n)&&t.push(e[n]);return t}(c);let p,d=.5,g=!1;function m(e){null!=o&&(o._volume.gain.value=e)}function y(){null!=o&&B(h,e=>e.stop())}function S(e=32,t=.25,n,r=60,o=1,i=0,s=0,l=1,u=!1,h=!1,c=!1,f=!1,d=null){const g=new w(n,v(r),o);if(g.noteInterval=t,null!=p&&u)g.noteRatios=p.noteRatios;else{const t=null!=d?function(e,t){return I(e,()=>a.get()>=t)}(e,d):function(e){let t=D(e,!1),n=4;for(;n<=e;)t=M(t,n),n*=2;return t}(e);g.noteRatios=function(e,t,n,r,o){let i=a.get(),s=a.get(-.5,.5),l=e.length/b.length,u=[];return e.forEach((e,n)=>{let h=Math.floor(n/l),c=n%l;if(o&&h===Math.floor(b.length/2))return u.push(u[c]),void(i=u[c]);e?(u.push(i),s+=a.get(-.25,.25),i+=s*r,(a.get()<.2||i<=t||i>=1)&&(i-=2*s,s*=-1)):u.push(null)}),u}(t,h?0:-1,0,l,f)}return g.notes=function(e,t,n,r){let o=e.length/b.length;return e.map((e,i)=>{if(null==e)return null;let s=Math.floor(i/o),l=b[s][0],u=P[b[s][1]],h=e;r&&(h=Math.floor(2*h)/2);let c=Math.floor(h),f=Math.floor((h-c)*u.length);for(f+=t+a.getInt(-n,n+1);f>=u.length;)f-=u.length,c++;for(;f<0;)f+=u.length,c--;return 100*(l+12*c+u[f])})}(g.noteRatios,i,s,c),p=g,g}function v(e){return 440*Math.pow(2,(e-69)/12)}function M(e,t){let n=D(t,!1);const r=Math.floor(4*Math.abs(a.get()+a.get()-1));for(let e=0;e<r;e++)n[a.getInt(t-1)]=!0;return T(e,(e,r)=>n[r%t]?!e:e)}t.init=function(e=0,n=120,l=60){o=r.Live({}),m(.1),s=e,a=new class{get(e=1,t=null){return null==t&&(t=e,e=0),this.getToMaxInt()/4294967295*(t-e)+e}getInt(e,t=null){return Math.floor(this.get(e,t))}getPm(){return 2*this.getInt(2)-1}select(e){return e[this.getInt(e.length)]}setSeed(e=null){return this.w=null!=e?e:Math.floor(4294967295*Math.random()),this.x=(0|this.w<<13)>>>0,this.y=(0|this.w>>>9^this.x<<6)>>>0,this.z=(0|this.y>>>7)>>>0,this}getToMaxInt(){const e=this.x^this.x<<11;return this.x=this.y,this.y=this.z,this.z=this.w,this.w=(this.w^this.w>>>19^e^e>>>8)>>>0,this.w}constructor(){this.setSeed(),this.get=this.get.bind(this),this.getToMaxInt=this.getToMaxInt.bind(this)}},r.setRandomFunc(a.get),t.playInterval=60/n,i=1/l*2},t.setSeed=function(e=0){s=e},t.play=function(e="0",t=2,n=null,r=null,i=null){if(null==o)return;if(null!=l[e])return void l[e].play(i);if(a.setSeed(s+A(e)),null==r){let n=c[e[0]];void 0===n&&(n=a.select(f)),r=D(t,n)}const u=null==n?null:v(n);l[e]=new L(r,u),l[e].play(i)},t.playJingle=function(e="0",t=!1,n=57,r=16,i=.25,l=4,h=null,d=null){if(null==o)return;if(null!=u[e])return void u[e].forEach(e=>e.play(d));if(a.setSeed(s+A(e)),F(),p=null,null==h){let t=c[e[0]];void 0===t&&(t=a.select(f)),h=t}let g=.8;t&&(i/=4,g/=2),u[e]=I(l,()=>{const e=Math.floor(3*Math.abs(a.get()+a.get()-1)),o=Math.floor(10*(a.get()+a.get()-1)),s=t?2:Math.abs(a.get()+a.get()-1),l=a.get()<.25,u=!t&&a.get()<.5,c=a.get()<.5,f=t?a.get()<.25:a.get()<.9,p=a.get(.5),d=S(r,i,h,n,g,e,o,s,l,u,c,f,p);return d.isLooping=!1,d}),u[e].forEach(e=>e.play(d))},t.stopJingles=function(){H(u,e=>B(e,e=>e.stop()))},t.setVolume=m,t.setQuantize=function(e){d=e},t.update=function(){if(null==o)return;const e=o._context.currentTime,t=e+i;return H(l,n=>n.update(e,t)),H(u,n=>B(n,n=>n.update(e,t))),B(h,n=>n.update(e,t)),e},t.reset=function(){y(),l={},u={},h=[]},t.playEmpty=function(){if(null==o)return;if(g)return;const e=o._createEmptyBuffer();o._playBuffer(e,0),g=!0},t.playParam=function(e){null!=o&&o._play(e)},t.playBgm=function(e="0",n=45,r=32,i=.25,l=4,u=[t.Preset.Laser,t.Preset.Select,t.Preset.Hit,t.Preset.Hit],c=null){if(null==o)return;y(),a.setSeed(s+A(e)),F(),p=null;let f=a.select(u);B(h=I(l,()=>{const e=Math.floor(3*Math.abs(a.get()+a.get()-1)),t=Math.floor(10*(a.get()+a.get()-1)),o=Math.abs(a.get()+a.get()-1),s=a.get()<.25;s||(f=a.select(u));const l=a.get()<.5,h=a.get()<.5,c=a.get()<.9;return S(r,i,f,n,.7,e,t,o,s,l,h,c)}),e=>e.play(c))},t.stopBgm=y,t.createTrack=S;const P=[[0,4,7],[0,3,7],[0,4,7,10],[0,4,7,11],[0,3,7,10]],x=[[[0,0],[7,0],[9,1],[4,1]],[[5,0],[0,0],[5,0],[7,0]],[[5,3],[7,2],[4,4],[9,1]],[[9,1],[2,1],[7,0],[0,0]],[[9,1],[5,0],[7,0],[0,0]]];let b;function F(){const e=a.select(x);b=e.map((e,t)=>[a.get()<.7?e[0]:x[a.getInt(x.length)][t][0],a.get()<.7?e[1]:a.getInt(P.length)])}class L{constructor(e,t=null,n=1){this.isPlaying=!1,this.playedTime=null,Array.isArray(e)||(e=[e]),this.buffers=T(e,e=>(e instanceof Function&&(e=e()),e.Volume.Sustain*=n,e.Volume.Decay*=n,null!=t&&(e.Frequency.Start=t),o._createBuffer(e))),this.gainNode=o._createGain()}play(e=null){this.isPlaying=!0,this.volume=e}stop(){this.isPlaying=!1}update(e,n){if(!this.isPlaying)return;this.isPlaying=!1;const r=t.playInterval*d,o=r>0?Math.ceil(e/r)*r:e;(null==this.playedTime||o>this.playedTime)&&(this.playLater(o),this.playedTime=o)}playLater(e,t=null){null==this.volume?B(this.buffers,n=>o._playBuffer(n,e,t)):(this.gainNode.gain.value=this.volume,B(this.buffers,n=>o._playBufferAndConnect(n,e,this.gainNode,t)))}}class w extends L{constructor(){super(...arguments),this.noteIndex=0,this.noteInterval=.25,this.scheduledTime=null,this.isLooping=!0}play(e=null){super.play(e),this.scheduledTime=null}update(e,t){if(this.isPlaying){null==this.scheduledTime&&this.calcFirstScheduledTime(e);for(let t=0;t<99&&!(this.scheduledTime>=e);t++)this.calcNextScheduledTime();if(this.scheduledTime<e)this.scheduledTime=null;else for(;this.scheduledTime<=t;){if(null!=this.nextNote&&this.playLater(this.scheduledTime,this.nextNote),!this.isLooping&&0===this.noteIndex)return void this.stop();this.calcNextScheduledTime()}}}calcFirstScheduledTime(e){this.scheduledTime=Math.ceil(e/t.playInterval)*t.playInterval-t.playInterval*this.noteInterval,this.noteIndex=0,this.calcNextScheduledTime()}calcNextScheduledTime(){const e=this.notes.length,n=t.playInterval*this.noteInterval;for(let t=0;t<e&&(this.scheduledTime+=n,this.nextNote=this.notes[this.noteIndex],this.noteIndex++,!(this.noteIndex>=e)||(this.noteIndex=0,this.isLooping))&&null==this.nextNote;t++);}}function A(e){let t=0;const n=e.length;for(let r=0;r<n;r++)t=(t<<5)-t+e.charCodeAt(r),t|=0;return t}function D(e,t){let n=[];for(let r=0;r<e;r++)n.push(t);return n}function I(e,t){let n=[];for(let r=0;r<e;r++)n.push(t(r));return n}function B(e,t){for(let n=0;n<e.length;n++)t(e[n])}function H(e,t){for(let n in e)t(e[n])}function T(e,t){let n=[];for(let r=0;r<e.length;r++)n.push(t(e[r],r));return n}}])},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.initSeedUi=function(e){var t=document.createElement("p");t.innerHTML='<button id="change">change</button>random seed: <input type="number" id="seed" value="0"></input><button id="set">set</button>',document.getElementsByTagName("body")[0].appendChild(t);var n=document.getElementById("change"),r=document.getElementById("seed"),o=document.getElementById("set");function a(){e(Number(r.value))}n.onclick=function(){r.value=Math.floor(9999999*Math.random()).toString(),a()},o.onclick=a},t.enableShowingErrors=function(){var e=document.createElement("pre");e.setAttribute("id","result"),document.getElementsByTagName("body")[0].appendChild(e),window.addEventListener("error",function(t){var n=[t.filename,"@",t.lineno,":\n",t.message].join("");return e.textContent+="\n"+n,!1})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaultOptions={isMirrorX:!1,isMirrorY:!1,seed:0,hue:null,saturation:.8,value:1,rotationNum:1,scale:null,scaleX:null,scaleY:null,scalePattern:1,scalePatternX:null,scalePatternY:null,colorNoise:.1,colorLighting:1,edgeDarkness:.4,isShowingEdge:!0,isShowingBody:!0,isLimitingColors:!1,isUsingLetterForm:!1,letterFormChar:"x",letterFormFontFamily:"monospace",letterFormFontSize:8,isRotatingLetterForm:!1};let r={},o=0;function a(e,n={}){n.baseSeed=o;let a=Array.isArray(e)?e:e.split("\n");const i=JSON.stringify({patterns:a,options:n});if(r[i])return r[i];let s={};p(t.defaultOptions,(e,t)=>{s[t]=e}),p(n,(e,t)=>{s[t]=e});const m=new g;let y=o+function(e){let t=0;const n=e.length;for(let r=0;r<n;r++){const n=e.charCodeAt(r);t=(t<<5)-t+n,t|=0}return t}(a.join());null!=s.seed&&(y+=s.seed),m.setSeed(y),null==s.hue&&(s.hue=m.get()),null==s.scalePatternX&&(s.scalePatternX=s.scalePattern),null==s.scalePatternY&&(s.scalePatternY=s.scalePattern),s.isUsingLetterForm&&(a=function(e,t){const n=d(e,(e,t)=>Math.max(e,t.length),0),r=e.length,o=t.letterFormFontSize,a=Math.round(n*o),i=Math.round(r*o*1.2),s=document.createElement("canvas");s.width=a,s.height=i;const l=s.getContext("2d");l.font=`${o}px ${t.letterFormFontFamily}`,l.textBaseline="top",c(n,t=>{c(r,n=>{l.fillText(e[n][t],t*o,n*o*1.2)})});const u=l.getImageData(0,0,a,i).data,h=function(e,t,n){let r=t,o=-1,a=n,i=-1,s=3;return c(n,n=>{c(t,t=>{e[s]>0&&(r=t<r?t:r,o=t>o?t:o,a=n<a?n:a,i=n>i?n:i),s+=4})}),{bx:r,ex:o,by:a,ey:i}}(u,a,i),f=h.ex-h.bx+1,p=h.ey-h.by+1;let g=[];t.isRotatingLetterForm?c(f,e=>{let n="";c(p,r=>{const o=4*(e+h.bx+(h.ey-r)*a)+3;n+=u[o]>.5?t.letterFormChar:" "}),g.push(n)}):c(p,e=>{let n="";c(f,r=>{const o=4*(r+h.bx+(e+h.by)*a)+3;n+=u[o]>.5?t.letterFormChar:" "}),g.push(n)});return g}(a,s));let S,v=function(e,t,n){let r=d(e,(e,t)=>Math.max(e,t.length),0),o=e.length,a=Math.round(r*t.scalePatternX),i=Math.round(o*t.scalePatternY);a+=t.isMirrorX?1:2,i+=t.isMirrorY?1:2;let s=function(e,t,n,r,o,a,i,s){return f(r,r=>{const l=Math.floor((r-1)/a);return f(o,r=>{const o=Math.floor((r-1)/i);if(l<0||l>=t||o<0||o>=n)return 0;const a=l<e[o].length?e[o][l]:" ";let u=0;return"-"===a?u=s.get()<.5?1:0:"x"===a||"X"===a?u=s.get()<.5?1:-1:"o"===a||"O"===a?u=-1:"*"===a&&(u=1),u})})}(e,r,o,a,i,t.scalePatternX,t.scalePatternY,n);t.isMirrorX&&(s=function(e,t,n){return f(2*t,r=>f(n,n=>r<t?e[r][n]:e[2*t-r-1][n]))}(s,a,i),a*=2);t.isMirrorY&&(s=function(e,t,n){return f(t,t=>f(2*n,r=>r<n?e[t][r]:e[t][2*n-r-1]))}(s,a,i),i*=2);s=l(s,a,i),(null!=t.scale||null!=t.scaleX||null!=t.scaleY)&&(s=function(e,t,n,r){const o=null!=r.scaleX?r.scaleX:null!=r.scale?r.scale:1,a=null!=r.scaleY?r.scaleY:null!=r.scale?r.scale:1,i=Math.round(t*o),s=Math.round(n*a);let h=f(i,r=>{const i=Math.floor((r-1)/o);return f(s,r=>{const o=Math.floor((r-1)/a);return i<0||i>=t||o<0||o>=n?0:e[i][o]})});const p=(o+a)/2;return c(Math.floor((p-1)/2),()=>{h=function(e,t,n){return f(t,r=>f(n,o=>-1===e[r][o]&&u(e,t,n,0,r,o)?0:-1===e[r][o]&&u(e,t,n,1,r,o)?1:e[r][o]))}(h,i,s)}),l(h,i,s)}(s,a,i,t));return s}(a,s,m);return S=s.rotationNum>1?function(e,t){let n=[];for(let r=0;r<e.length;r++)n.push(t(e[r],r));return n}(function(e,t){const n=e.length,r=e[0].length,o=n/2,a=r/2,i=Math.max(n,r),s=2*Math.round(1.5*i/2),l=2*Math.round(1.5*i/2),u=s/2,h=l/2;let c={x:0,y:0};return f(t,i=>{const p=-i*Math.PI*2/t;return f(s,t=>f(l,i=>{c.x=t-u,c.y=i-h,function(e,t){const n=e.x;e.x=Math.cos(t)*n-Math.sin(t)*e.y,e.y=Math.sin(t)*n+Math.cos(t)*e.y}(c,p);const s=Math.round(c.x+o),l=Math.round(c.y+a);return s<0||s>=n||l<0||l>=r?0:e[s][l]}))})}(v,s.rotationNum),e=>h(e,s)):[h(v,s)],r[i]=S,S}t.generate=a,t.generateImages=function(e,t={}){const n=a(e,t),r=n[0].length,o=n[0][0].length,i=document.createElement("canvas");i.width=r,i.height=o;const l=i.getContext("2d");let u=[];for(let e=0;e<n.length;e++){l.clearRect(0,0,r,o),s(l,n,r/2,o/2,e);const t=new Image;t.src=i.toDataURL(),u.push(t)}return u},t.setSeed=function(e=0){o=e},t.setDefaultOptions=function(e){p(e,(e,n)=>{t.defaultOptions[n]=e})};class i{constructor(){this.r=0,this.g=0,this.b=0,this.isEmpty=!0}setFromHsv(e,t,n,r=!1){this.isEmpty=!1,this.r=n,this.g=n,this.b=n;const o=6*e,a=Math.floor(o),i=o-a;switch(a){case 0:this.g*=1-t*(1-i),this.b*=1-t;break;case 1:this.b*=1-t,this.r*=1-t*i;break;case 2:this.b*=1-t*(1-i),this.r*=1-t;break;case 3:this.r*=1-t,this.g*=1-t*i;break;case 4:this.r*=1-t*(1-i),this.g*=1-t;break;case 5:this.g*=1-t,this.b*=1-t*i}!0===r&&(this.r=this.limitColor(this.r),this.g=this.limitColor(this.g),this.b=this.limitColor(this.b)),this.setStyle()}setStyle(){const e=Math.floor(255*this.r),t=Math.floor(255*this.g),n=Math.floor(255*this.b);this.style=`rgb(${e},${t},${n})`}limitColor(e){return e<.25?0:e<.75?.5:1}}function s(e,t,n,r,o=0){const a=t[o],i=a.length,s=a[0].length,l=Math.floor(n-i/2),u=Math.floor(r-s/2);for(let t=0,n=u;t<s;t++,n++)for(let r=0,o=l;r<i;r++,o++){const i=a[r][t];i.isEmpty||(e.fillStyle=i.style,e.fillRect(o,n,1,1))}}function l(e,t,n){return f(t,r=>f(n,o=>0===e[r][o]&&u(e,t,n,1,r,o)?-1:e[r][o]))}function u(e,t,n,r,o,a){return[[-1,0],[1,0],[0,-1],[0,1]].some(i=>{const s=o+i[0],l=a+i[1];return!(s<0||s>=t||l<0||l>=n)&&e[s][l]===r})}function h(e,t){const n=e.length,r=e[0].length;let o=0,a=!1;for(let t=0;t<r/2;t++){for(let o=0;o<n;o++)if(0!==e[o][t]||0!==e[o][r-1-t]){a=!0;break}if(a)break;o++}let s=r-2*o;s<=0&&(s=1);const l=new g;return l.setSeed(t.seed),f(n,n=>f(r,r=>{const a=e[n][r];if(1===a&&!t.isShowingBody||-1===a&&!t.isShowingEdge)return new i;if(0!==a){let e=((Math.sin((r-o)/s*Math.PI)*t.colorLighting+(1-t.colorLighting))*(1-t.colorNoise)+l.get()*t.colorNoise)*t.value;e=e>=0?e<=1?e:1:0,-1===a&&(e*=1-t.edgeDarkness);const n=new i;return n.setFromHsv(t.hue,t.saturation,e,t.isLimitingColors),n}return new i}))}function c(e,t){for(let n=0;n<e;n++)t(n)}function f(e,t){let n=[];for(let r=0;r<e;r++)n.push(t(r));return n}function p(e,t){for(let n in e)t(e[n],n)}function d(e,t,n){let r=n;for(let n=0;n<e.length;n++)r=t(r,e[n],n);return r}t.Pixel=i,t.draw=s,t.drawImage=function(e,t,n,r,o=0){const a=t[o];e.drawImage(a,Math.floor(n-a.width/2),Math.floor(r-a.height/2))};class g{get(e=1,t=null){return null==t&&(t=e,e=0),this.getToMaxInt()/4294967295*(t-e)+e}getInt(e,t=null){return Math.floor(this.get(e,t))}getPm(){return 2*this.getInt(2)-1}select(e){return e[this.getInt(e.length)]}setSeed(e=null){return this.w=null!=e?e:Math.floor(4294967295*Math.random()),this.x=(0|this.w<<13)>>>0,this.y=(0|this.w>>>9^this.x<<6)>>>0,this.z=(0|this.y>>>7)>>>0,this}getToMaxInt(){const e=this.x^this.x<<11;return this.x=this.y,this.y=this.z,this.z=this.w,this.w=(this.w^this.w>>>19^e^e>>>8)>>>0,this.w}constructor(){this.setSeed(),this.get=this.get.bind(this),this.getToMaxInt=this.getToMaxInt.bind(this)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(2),o=n(1),a=n(0);let i=!1;const s=16;let l,u,h,c=[],f=null,p=0,d=0,g=1,m=!1;const y=128,S=512;let v={x:0,y:0};function M(){r.setSeed(9682886),a.init(9682886),o.enableShowingErrors(),o.initSeedUi(I),(l=document.createElement("canvas")).width=l.height=y,l.style.width=l.style.height=`${S}px`,document.body.appendChild(l),u=l.getContext("2d"),r.setDefaultOptions({isMirrorY:!0,rotationNum:s,scalePattern:2}),h=r.generateImages("RECOIL",{isUsingLetterForm:!0,letterFormFontFamily:"'Inconsolata', monospace",letterFormChar:"*",isMirrorY:!1,rotationNum:1}),function(){for(let e=0;e<32;e++){const e={};e.images=r.generateImages(["o"],{isMirrorY:!1,hue:Math.random(),saturation:.4}),e.pos={x:D(-16,144),y:D(-16,144)},e.vel={x:0,y:0},e.angle=0,e.update=function(){this.pos.x<-16&&(this.pos.x=160+this.pos.x),this.pos.x>132&&(this.pos.x=-160+this.pos.x),this.pos.y<-16&&(this.pos.y=160+this.pos.y),this.pos.y>132&&(this.pos.y=-160+this.pos.y)},e.priority=-3,c.push(e)}}(),document.onmousedown=P,document.ontouchstart=P,document.onmousemove=(e=>{x(e.clientX,e.clientY)}),document.ontouchmove=(e=>{e.preventDefault(),x(e.touches[0].clientX,e.touches[0].clientY)}),document.onmouseup=b,document.ontouchend=b,F()}function P(e){a.playEmpty(),!i&&p>0&&(i=!0,d=p=0,g=1,a.playJingle("s1"),L()),m=!0}function x(e,t){v.x=(e-l.offsetLeft)*y/S,v.y=(t-l.offsetTop)*y/S}function b(e){e.preventDefault()}function F(){requestAnimationFrame(F),a.update(),i&&180===p&&a.playBgm(),u.fillStyle="black",u.fillRect(0,0,y,y);const e=Math.sqrt(p/1e3+1);Math.random()<.03*e&&function(){const e={};if(e.images=r.generateImages([" x","xx"],{isMirrorX:!0}),e.pos={x:D(-32,160),y:Math.random()<.5?-32:160},Math.random()<.5){let t=e.pos.x;e.pos.x=e.pos.y,e.pos.y=t}e.vel={x:D(-.1,.1),y:D(-.1,.1)},e.angle=0,e.update=function(){if(null!=f){const e=Math.sqrt(p/1e3+1);this.vel.x+=1e-4*(f.pos.x-this.pos.x)*e,this.vel.y+=1e-4*(f.pos.y-this.pos.y)*e;const t=this.pos.x-f.pos.x,n=this.pos.y-f.pos.y;Math.sqrt(t*t+n*n)<10&&(i=!1,w(30,f.pos),a.playJingle("s3",!0,60,24),a.stopBgm(),f.isAlive=!1,f=null,p=-60)}else this.vel.y+=.01;this.vel.x*=.99,this.vel.y*=.99},e.name="enemy",e.priority=1,c.push(e)}(),c.sort((e,t)=>e.priority-t.priority),A(c,e=>{e.update(),e.pos.x+=e.vel.x,e.pos.y+=e.vel.y,(e.pos.x<-48||e.pos.x>176||e.pos.y<-48||e.pos.y>176)&&(e.isAlive=!1,"shot"===e.name&&(g=1)),function(e){let t=e.angle;t<0&&(t=2*Math.PI-Math.abs(t));const n=Math.round(t/(2*Math.PI/s))%s;r.drawImage(u,e.images,e.pos.x,e.pos.y,n)}(e)});for(let e=0;e<c.length;)!1===c[e].isAlive?c.splice(e,1):e++;i||r.drawImage(u,h,64,40),u.fillStyle="#ace",u.font="9px 'Inconsolata', monospace",u.fillText(`${d}`,5,10),u.fillText(`+${g}`,5,20),p++}function L(){null!=f&&(f.isAlive=!1),(f={}).images=r.generateImages([" x","xxxx"]),f.pos={x:64,y:64},f.vel={x:0,y:0},f.angle=0,f.update=function(){if(this.angle=Math.atan2(v.y-this.pos.y,v.x-this.pos.x),m){m=!1;const e={};e.images=r.generateImages(["xxx"],{isMirrorY:!1}),e.pos={x:this.pos.x,y:this.pos.y},e.angle=this.angle;const t=3;e.vel={x:Math.cos(this.angle)*t,y:Math.sin(this.angle)*t},e.update=function(){A(function(e){let t=[];return A(c,n=>{n.name===e&&t.push(n)}),t}("enemy"),e=>{let t=e.pos.x-this.pos.x,n=e.pos.y-this.pos.y;Math.sqrt(t*t+n*n)<10&&(this.isAlive=!1,e.isAlive=!1,w(5,e.pos),a.playJingle("l2",!0,69,12),d+=g,g++)})},e.name="shot",e.priority=-1,c.push(e),w(2,this.pos,this.angle),a.play("s1"),this.vel.x=-e.vel.x,this.vel.y=-e.vel.y}this.vel.x*=.7,this.vel.y*=.7;var e=.1*(64-this.pos.x),t=.1*(64-this.pos.y);A(c,n=>{n.pos.x+=e,n.pos.y+=t})},f.priority=0,c.push(f)}function w(e,t,n=null){for(var o=0;o<e;o++){const e={};e.images=r.generateImages(["x"],{isMirrorX:!0,colorLighting:.5,edgeDarkness:.8,value:.8}),e.pos={x:t.x,y:t.y},e.angle=null==n?D(0,2*Math.PI):n+D(-.5,.5);const o=D(.5,1);e.vel={x:Math.cos(e.angle)*o,y:Math.sin(e.angle)*o},e.ticks=D(15,30),e.update=function(){this.vel.x*=.98,this.vel.y*=.98,this.ticks--<0&&(this.isAlive=!1)},e.priority=-2,c.push(e)}}function A(e,t){for(let n=0;n<e.length;n++)t(e[n])}function D(e,t){return Math.random()*(t-e)+e}function I(e){r.setSeed(e),a.reset(),a.setSeed(e),i&&(a.playBgm(),L())}window.onload=(()=>{WebFont.load({google:{families:["Inconsolata"]},active:M,inactive:M,timeout:2e3})})}]);
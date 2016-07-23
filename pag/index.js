(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pag"] = factory();
	else
		root["pag"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	"use strict";
	exports.defaultOptions = {
	    isMirrorX: false,
	    isMirrorY: false,
	    seed: 0,
	    hue: null,
	    saturation: 0.8,
	    value: 1,
	    rotationNum: 1,
	    scale: 1,
	    scaleX: null,
	    scaleY: null,
	    colorNoise: 0.1,
	    colorLighting: 1,
	    edgeDarkness: 0.4,
	    isShowingEdge: true,
	    isShowingBody: true,
	};
	var generatedPixels = {};
	var seed = 0;
	function setSeed(_seed) {
	    if (_seed === void 0) { _seed = 0; }
	    seed = _seed;
	}
	exports.setSeed = setSeed;
	function generate(patterns, _options) {
	    if (_options === void 0) { _options = {}; }
	    _options.baseSeed = seed;
	    var jso = JSON.stringify({ patterns: patterns, options: _options });
	    if (generatedPixels[jso]) {
	        return generatedPixels[jso];
	    }
	    var options = {};
	    forOwn(exports.defaultOptions, function (v, k) {
	        options[k] = v;
	    });
	    forOwn(_options, function (v, k) {
	        options[k] = v;
	    });
	    var random = new Random();
	    var rndSeed = seed + getHashFromString(patterns.join());
	    if (options.seed != null) {
	        rndSeed += options.seed;
	    }
	    random.setSeed(rndSeed);
	    if (options.hue == null) {
	        options.hue = random.get01();
	    }
	    if (options.scaleX == null) {
	        options.scaleX = options.scale;
	    }
	    if (options.scaleY == null) {
	        options.scaleY = options.scale;
	    }
	    var pixels = generatePixels(patterns, options, random);
	    var result;
	    if (options.rotationNum > 1) {
	        result = map(createRotated(pixels, options.rotationNum), function (p) {
	            return createColored(p, options);
	        });
	    }
	    else {
	        result = [createColored(pixels, options)];
	    }
	    generatedPixels[jso] = result;
	    return result;
	}
	exports.generate = generate;
	var Pixel = (function () {
	    function Pixel() {
	        this.r = 0;
	        this.g = 0;
	        this.b = 0;
	        this.isEmpty = true;
	    }
	    Pixel.prototype.setFromHsv = function (hue, saturation, value) {
	        this.isEmpty = false;
	        this.r = value;
	        this.g = value;
	        this.b = value;
	        var h = hue * 6;
	        var i = Math.floor(h);
	        var f = h - i;
	        switch (i) {
	            case 0:
	                this.g *= 1 - saturation * (1 - f);
	                this.b *= 1 - saturation;
	                break;
	            case 1:
	                this.b *= 1 - saturation;
	                this.r *= 1 - saturation * f;
	                break;
	            case 2:
	                this.b *= 1 - saturation * (1 - f);
	                this.r *= 1 - saturation;
	                break;
	            case 3:
	                this.r *= 1 - saturation;
	                this.g *= 1 - saturation * f;
	                break;
	            case 4:
	                this.r *= 1 - saturation * (1 - f);
	                this.g *= 1 - saturation;
	                break;
	            case 5:
	                this.g *= 1 - saturation;
	                this.b *= 1 - saturation * f;
	                break;
	        }
	        this.setStyle();
	    };
	    Pixel.prototype.setStyle = function () {
	        var r = Math.floor(this.r * 255);
	        var g = Math.floor(this.g * 255);
	        var b = Math.floor(this.b * 255);
	        this.style = "rgb(" + r + "," + g + "," + b + ")";
	    };
	    return Pixel;
	}());
	exports.Pixel = Pixel;
	function generatePixels(patterns, options, random) {
	    var pw = reduce(patterns, function (w, p) { return Math.max(w, p.length); }, 0);
	    var ph = patterns.length;
	    var w = Math.round(pw * options.scaleX);
	    var h = Math.round(ph * options.scaleY);
	    w += options.isMirrorX ? 1 : 2;
	    h += options.isMirrorY ? 1 : 2;
	    var pixels = createPixels(patterns, pw, ph, w, h, options.scaleX, options.scaleY, random);
	    if (options.isMirrorX) {
	        pixels = mirrorX(pixels, w, h);
	        w *= 2;
	    }
	    if (options.isMirrorY) {
	        pixels = mirrorY(pixels, w, h);
	        h *= 2;
	    }
	    pixels = createEdge(pixels, w, h);
	    return pixels;
	}
	function createPixels(patterns, pw, ph, w, h, scaleX, scaleY, random) {
	    return timesMap(w, function (x) {
	        var px = Math.floor((x - 1) / scaleX);
	        return timesMap(h, function (y) {
	            var py = Math.floor((y - 1) / scaleY);
	            if (px < 0 || px >= pw || py < 0 || py >= ph) {
	                return 0;
	            }
	            var c = px < patterns[py].length ? patterns[py][px] : ' ';
	            var m = 0;
	            if (c === '-') {
	                m = random.get01() < 0.5 ? 1 : 0;
	            }
	            else if (c === 'x' || c === 'X') {
	                m = random.get01() < 0.5 ? 1 : -1;
	            }
	            else if (c === 'o' || c === 'O') {
	                m = -1;
	            }
	            else if (c === '*') {
	                m = 1;
	            }
	            return m;
	        });
	    });
	}
	function mirrorX(pixels, w, h) {
	    return timesMap(w * 2, function (x) { return timesMap(h, function (y) {
	        return x < w ? pixels[x][y] : pixels[w * 2 - x - 1][y];
	    }); });
	}
	function mirrorY(pixels, w, h) {
	    return timesMap(w, function (x) { return timesMap(h * 2, function (y) {
	        return y < h ? pixels[x][y] : pixels[x][h * 2 - y - 1];
	    }); });
	}
	function createEdge(pixels, w, h) {
	    return timesMap(w, function (x) { return timesMap(h, function (y) {
	        return ((pixels[x][y] === 0 &&
	            ((x - 1 >= 0 && pixels[x - 1][y] > 0) ||
	                (x + 1 < w && pixels[x + 1][y] > 0) ||
	                (y - 1 >= 0 && pixels[x][y - 1] > 0) ||
	                (y + 1 < h && pixels[x][y + 1] > 0))) ?
	            -1 : pixels[x][y]);
	    }); });
	}
	function createRotated(pixels, rotationNum) {
	    var pw = pixels.length;
	    var ph = pixels[0].length;
	    var pcx = pw / 2;
	    var pcy = ph / 2;
	    var w = Math.round(pw * 1.5 / 2) * 2;
	    var h = Math.round(ph * 1.5 / 2) * 2;
	    var cx = w / 2;
	    var cy = h / 2;
	    var offset = { x: 0, y: 0 };
	    return timesMap(rotationNum, function (ai) {
	        var angle = -ai * Math.PI * 2 / rotationNum;
	        return timesMap(w, function (x) { return timesMap(h, function (y) {
	            offset.x = x - cx;
	            offset.y = y - cy;
	            rotateVector(offset, angle);
	            var px = Math.round(offset.x + pcx);
	            var py = Math.round(offset.y + pcy);
	            return (px < 0 || px >= pw || py < 0 || py >= ph) ?
	                0 : pixels[px][py];
	        }); });
	    });
	}
	function rotateVector(v, angle) {
	    var vx = v.x;
	    v.x = Math.cos(angle) * vx - Math.sin(angle) * v.y;
	    v.y = Math.sin(angle) * vx + Math.cos(angle) * v.y;
	}
	function createColored(pixels, options) {
	    var w = pixels.length;
	    var h = pixels[0].length;
	    var random = new Random();
	    random.setSeed(options.seed);
	    return timesMap(w, function (x) { return timesMap(h, function (y) {
	        var p = pixels[x][y];
	        if ((p === 1 && !options.isShowingBody) ||
	            (p === -1 && !options.isShowingEdge)) {
	            return new Pixel();
	        }
	        if (p !== 0) {
	            var l = Math.sin(y / h * Math.PI) * options.colorLighting +
	                (1 - options.colorLighting);
	            var v = (l * (1 - options.colorNoise) +
	                random.get01() * options.colorNoise) * options.value;
	            v = v >= 0 ? (v <= 1 ? v : 1) : 0;
	            if (p === -1) {
	                v *= (1 - options.edgeDarkness);
	            }
	            var px = new Pixel();
	            px.setFromHsv(options.hue, options.saturation, v);
	            return px;
	        }
	        else {
	            return new Pixel();
	        }
	    }); });
	}
	function getHashFromString(str) {
	    var hash = 0;
	    var len = str.length;
	    for (var i = 0; i < len; i++) {
	        var chr = str.charCodeAt(i);
	        hash = ((hash << 5) - hash) + chr;
	        hash |= 0;
	    }
	    return hash;
	}
	function nArray(n, v) {
	    var a = [];
	    for (var i = 0; i < n; i++) {
	        a.push(v);
	    }
	    return a;
	}
	function times(n, func) {
	    for (var i = 0; i < n; i++) {
	        func(i);
	    }
	}
	function timesMap(n, func) {
	    var result = [];
	    for (var i = 0; i < n; i++) {
	        result.push(func(i));
	    }
	    return result;
	}
	function forEach(array, func) {
	    for (var i = 0; i < array.length; i++) {
	        func(array[i]);
	    }
	}
	function forOwn(obj, func) {
	    for (var p in obj) {
	        func(obj[p], p);
	    }
	}
	function map(array, func) {
	    var result = [];
	    for (var i = 0; i < array.length; i++) {
	        result.push(func(array[i], i));
	    }
	    return result;
	}
	function reduce(array, func, initValue) {
	    var result = initValue;
	    for (var i = 0; i < array.length; i++) {
	        result = func(result, array[i], i);
	    }
	    return result;
	}
	var Random = (function () {
	    function Random() {
	        this.setSeed();
	        this.get01 = this.get01.bind(this);
	    }
	    Random.prototype.setSeed = function (v) {
	        if (v === void 0) { v = -0x7fffffff; }
	        if (v === -0x7fffffff) {
	            v = Math.floor(Math.random() * 0x7fffffff);
	        }
	        this.x = v = 1812433253 * (v ^ (v >> 30));
	        this.y = v = 1812433253 * (v ^ (v >> 30)) + 1;
	        this.z = v = 1812433253 * (v ^ (v >> 30)) + 2;
	        this.w = v = 1812433253 * (v ^ (v >> 30)) + 3;
	        return this;
	    };
	    Random.prototype.getInt = function () {
	        var t = this.x ^ (this.x << 11);
	        this.x = this.y;
	        this.y = this.z;
	        this.z = this.w;
	        this.w = (this.w ^ (this.w >> 19)) ^ (t ^ (t >> 8));
	        return this.w;
	    };
	    Random.prototype.get01 = function () {
	        return this.getInt() / 0x7fffffff;
	    };
	    return Random;
	}());


/***/ }
/******/ ])
});
;
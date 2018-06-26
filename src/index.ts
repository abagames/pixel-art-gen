import { PagOptions } from "pixel-art-gen";

export let defaultOptions: PagOptions = {
  isMirrorX: false, // mirror the pattern in the x-axis
  isMirrorY: false, // mirror the pattern in the y-axis
  seed: 0, // random seed
  hue: null, // base color (hue changes randomly when hue = null)
  saturation: 0.8,
  value: 1,
  rotationNum: 1, // create rotated patterns
  scalePattern: 1, // scale the pattern
  scalePatternX: null,
  scalePatternY: null,
  colorNoise: 0.1, // how often the color changes randomly
  colorLighting: 1, // lighting effect for the color
  edgeDarkness: 0.4, // darkness of the edge pixels
  isShowingEdge: true, // show the edge pixels
  isShowingBody: true, // show the body pixels
  isLimitingColors: false // limit the using colors
};
let generatedPixels = {};
let seed = 0;

export function generate(patterns: string[], _options: PagOptions = {}) {
  (<any>_options).baseSeed = seed;
  const jso = JSON.stringify({ patterns, options: _options });
  if (generatedPixels[jso]) {
    return generatedPixels[jso];
  }
  let options: PagOptions = {};
  forOwn(defaultOptions, (v, k) => {
    options[k] = v;
  });
  forOwn(_options, (v, k) => {
    options[k] = v;
  });
  const random = new Random();
  let rndSeed = seed + getHashFromString(patterns.join());
  if (options.seed != null) {
    rndSeed += options.seed;
  }
  random.setSeed(rndSeed);
  if (options.hue == null) {
    options.hue = random.get01();
  }
  if (options.scalePatternX == null) {
    options.scalePatternX = options.scalePattern;
  }
  if (options.scalePatternY == null) {
    options.scalePatternY = options.scalePattern;
  }
  let pixels = generatePixels(patterns, options, random);
  let result;
  if (options.rotationNum > 1) {
    result = map(createRotated(pixels, options.rotationNum), p =>
      createColored(p, options)
    );
  } else {
    result = [createColored(pixels, options)];
  }
  generatedPixels[jso] = result;
  return result;
}

export function generateImages(patterns: string[], _options = {}) {
  const pixels = generate(patterns, _options);
  const width = pixels[0].length;
  const height = pixels[0][0].length;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  let images = [];
  for (let i = 0; i < pixels.length; i++) {
    context.clearRect(0, 0, width, height);
    draw(context, pixels, width / 2, height / 2, i);
    const image = new Image();
    image.src = canvas.toDataURL();
    images.push(image);
  }
  return images;
}

export function setSeed(_seed: number = 0) {
  seed = _seed;
}

export function setDefaultOptions(_defaultOptions) {
  forOwn(_defaultOptions, (v, k) => {
    defaultOptions[k] = v;
  });
}

export class Pixel {
  r = 0;
  g = 0;
  b = 0;
  isEmpty = true;
  style: string;

  setFromHsv(hue, saturation, value, isLimitingColors = false) {
    this.isEmpty = false;
    this.r = value;
    this.g = value;
    this.b = value;
    const h = hue * 6;
    const i = Math.floor(h);
    const f = h - i;
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
    if (isLimitingColors === true) {
      this.r = this.limitColor(this.r);
      this.g = this.limitColor(this.g);
      this.b = this.limitColor(this.b);
    }
    this.setStyle();
  }

  setStyle() {
    const r = Math.floor(this.r * 255);
    const g = Math.floor(this.g * 255);
    const b = Math.floor(this.b * 255);
    this.style = `rgb(${r},${g},${b})`;
  }

  limitColor(v) {
    return v < 0.25 ? 0 : v < 0.75 ? 0.5 : 1;
  }
}

export function draw(
  context: CanvasRenderingContext2D,
  pixels: Pixel[][][],
  x: number,
  y: number,
  rotationIndex: number = 0
) {
  const pxs = pixels[rotationIndex];
  const pw = pxs.length;
  const ph = pxs[0].length;
  const sbx = Math.floor(x - pw / 2);
  const sby = Math.floor(y - ph / 2);
  for (let y = 0, sy = sby; y < ph; y++, sy++) {
    for (let x = 0, sx = sbx; x < pw; x++, sx++) {
      var px = pxs[x][y];
      if (!px.isEmpty) {
        context.fillStyle = px.style;
        context.fillRect(sx, sy, 1, 1);
      }
    }
  }
}

export function drawImage(
  context: CanvasRenderingContext2D,
  images: HTMLImageElement[],
  x: number,
  y: number,
  rotationIndex: number = 0
) {
  const img = images[rotationIndex];
  context.drawImage(
    img,
    Math.floor(x - img.width / 2),
    Math.floor(y - img.height / 2)
  );
}

function generatePixels(patterns: string[], options, random: Random) {
  let pw = reduce(patterns, (w, p) => Math.max(w, p.length), 0);
  let ph = patterns.length;
  var w = Math.round(pw * options.scalePatternX);
  var h = Math.round(ph * options.scalePatternY);
  w += options.isMirrorX ? 1 : 2;
  h += options.isMirrorY ? 1 : 2;
  let pixels = createPixels(
    patterns,
    pw,
    ph,
    w,
    h,
    options.scalePatternX,
    options.scalePatternY,
    random
  );
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

function createPixels(
  patterns: string[],
  pw,
  ph,
  w,
  h,
  scalePatternX,
  scalePatternY,
  random: Random
) {
  return timesMap(w, x => {
    const px = Math.floor((x - 1) / scalePatternX);
    return timesMap(h, y => {
      const py = Math.floor((y - 1) / scalePatternY);
      if (px < 0 || px >= pw || py < 0 || py >= ph) {
        return 0;
      }
      const c = px < patterns[py].length ? patterns[py][px] : " ";
      let m = 0;
      if (c === "-") {
        m = random.get01() < 0.5 ? 1 : 0;
      } else if (c === "x" || c === "X") {
        m = random.get01() < 0.5 ? 1 : -1;
      } else if (c === "o" || c === "O") {
        m = -1;
      } else if (c === "*") {
        m = 1;
      }
      return m;
    });
  });
}

function mirrorX(pixels: number[][], w, h) {
  return timesMap(w * 2, x =>
    timesMap(h, y => (x < w ? pixels[x][y] : pixels[w * 2 - x - 1][y]))
  );
}

function mirrorY(pixels: number[][], w, h) {
  return timesMap(w, x =>
    timesMap(h * 2, y => (y < h ? pixels[x][y] : pixels[x][h * 2 - y - 1]))
  );
}

function createEdge(pixels: number[][], w, h) {
  return timesMap(w, x =>
    timesMap(
      h,
      y =>
        pixels[x][y] === 0 &&
        ((x - 1 >= 0 && pixels[x - 1][y] > 0) ||
          (x + 1 < w && pixels[x + 1][y] > 0) ||
          (y - 1 >= 0 && pixels[x][y - 1] > 0) ||
          (y + 1 < h && pixels[x][y + 1] > 0))
          ? -1
          : pixels[x][y]
    )
  );
}

function createRotated(pixels: number[][], rotationNum: number) {
  const pw = pixels.length;
  const ph = pixels[0].length;
  const pcx = pw / 2;
  const pcy = ph / 2;
  const s = Math.max(pw, ph);
  const w = Math.round((s * 1.5) / 2) * 2;
  const h = Math.round((s * 1.5) / 2) * 2;
  const cx = w / 2;
  const cy = h / 2;
  let offset = { x: 0, y: 0 };
  return timesMap(rotationNum, ai => {
    const angle = (-ai * Math.PI * 2) / rotationNum;
    return timesMap(w, x =>
      timesMap(h, y => {
        offset.x = x - cx;
        offset.y = y - cy;
        rotateVector(offset, angle);
        const px = Math.round(offset.x + pcx);
        const py = Math.round(offset.y + pcy);
        return px < 0 || px >= pw || py < 0 || py >= ph ? 0 : pixels[px][py];
      })
    );
  });
}

function rotateVector(v, angle) {
  const vx = v.x;
  v.x = Math.cos(angle) * vx - Math.sin(angle) * v.y;
  v.y = Math.sin(angle) * vx + Math.cos(angle) * v.y;
}

function createColored(pixels: number[][], options) {
  const w = pixels.length;
  const h = pixels[0].length;
  let lightingStartY = 0;
  let hasPixel = false;
  for (let y = 0; y < h / 2; y++) {
    for (let x = 0; x < w; x++) {
      if (pixels[x][y] !== 0 || pixels[x][h - 1 - y] !== 0) {
        hasPixel = true;
        break;
      }
    }
    if (hasPixel) {
      break;
    }
    lightingStartY++;
  }
  let lightingHeight = h - lightingStartY * 2;
  if (lightingHeight <= 0) {
    lightingHeight = 1;
  }
  const random = new Random();
  random.setSeed(options.seed);
  return timesMap(w, x =>
    timesMap(h, y => {
      const p = pixels[x][y];
      if (
        (p === 1 && !options.isShowingBody) ||
        (p === -1 && !options.isShowingEdge)
      ) {
        return new Pixel();
      }
      if (p !== 0) {
        var l =
          Math.sin(((y - lightingStartY) / lightingHeight) * Math.PI) *
            options.colorLighting +
          (1 - options.colorLighting);
        let v =
          (l * (1 - options.colorNoise) + random.get01() * options.colorNoise) *
          options.value;
        v = v >= 0 ? (v <= 1 ? v : 1) : 0;
        if (p === -1) {
          v *= 1 - options.edgeDarkness;
        }
        const px = new Pixel();
        px.setFromHsv(
          options.hue,
          options.saturation,
          v,
          options.isLimitingColors
        );
        return px;
      } else {
        return new Pixel();
      }
    })
  );
}

function getHashFromString(str: string) {
  let hash = 0;
  const len = str.length;
  for (let i = 0; i < len; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
}

function nArray(n: number, v: any) {
  let a = [];
  for (let i = 0; i < n; i++) {
    a.push(v);
  }
  return a;
}

function times(n: number, func: Function) {
  for (let i = 0; i < n; i++) {
    func(i);
  }
}

function timesMap(n: number, func: Function) {
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push(func(i));
  }
  return result;
}

function forEach(array: any[], func: Function) {
  for (let i = 0; i < array.length; i++) {
    func(array[i]);
  }
}

function forOwn(obj: any, func: Function) {
  for (let p in obj) {
    func(obj[p], p);
  }
}

function map(array: any[], func: Function) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(func(array[i], i));
  }
  return result;
}

function reduce(array: any[], func: Function, initValue: number) {
  let result = initValue;
  for (let i = 0; i < array.length; i++) {
    result = func(result, array[i], i);
  }
  return result;
}

class Random {
  x: number;
  y: number;
  z: number;
  w: number;

  setSeed(v: number = -0x7fffffff) {
    if (v === -0x7fffffff) {
      v = Math.floor(Math.random() * 0x7fffffff);
    }
    this.x = v = 1812433253 * (v ^ (v >> 30));
    this.y = v = 1812433253 * (v ^ (v >> 30)) + 1;
    this.z = v = 1812433253 * (v ^ (v >> 30)) + 2;
    this.w = v = 1812433253 * (v ^ (v >> 30)) + 3;
    return this;
  }

  getInt() {
    var t = this.x ^ (this.x << 11);
    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    this.w = this.w ^ (this.w >> 19) ^ (t ^ (t >> 8));
    return this.w;
  }

  get01() {
    return this.getInt() / 0x7fffffff;
  }

  constructor() {
    this.setSeed();
    this.get01 = this.get01.bind(this);
  }
}

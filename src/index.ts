export let defaultOptions: PagOptions = {
  isMirrorX: false, // mirror the pattern in the x-axis
  isMirrorY: false, // mirror the pattern in the y-axis
  seed: 0, // random seed
  hue: null, // base color (hue changes randomly when hue = null)
  saturation: 0.8,
  value: 1,
  rotationNum: 1, // create rotated patterns
  scale: null, // scaling
  scaleX: null,
  scaleY: null,
  scalePattern: 1, // scale the pattern
  scalePatternX: null,
  scalePatternY: null,
  isRotatingRight: false, // rotate the pattern
  isRotatingLeft: false,
  isReverseX: false, // reverse the pattern
  isReverseY: false,
  isAddingEdgeFirst: false, // add an edge before randomize
  isInnerEdge: false, // add an edge inside
  colorNoise: 0.1, // how often the color changes randomly
  colorLighting: 1, // lighting effect for the color
  edgeDarkness: 0.4, // darkness of the edge pixels
  isShowingEdge: true, // show the edge pixels
  isShowingBody: true, // show the body pixels
  isLimitingColors: false, // limit the using colors
  isUsingLetterForm: false, // using the letter form for the pattern
  letterFormChar: "x", // the pattern letter for the letter form
  letterFormFontFamily: "monospace", // font for the letter form
  letterFormFontSize: 16,
  letterWidthRatio: 0.8, // for adjusting letter spacing
  letterHeightRatio: 0.9
};
let generatedPixels = {};
let generatedImages = {};
let seed = 0;

export function generate(
  _patterns: string | string[],
  _options: PagOptions = {}
): Pixel[][][] {
  (<any>_options).baseSeed = seed;
  let patterns = Array.isArray(_patterns) ? _patterns : _patterns.split("\n");
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
    options.hue = random.get();
  }
  if (options.scalePatternX == null) {
    options.scalePatternX = options.scalePattern;
  }
  if (options.scalePatternY == null) {
    options.scalePatternY = options.scalePattern;
  }
  if (options.isUsingLetterForm) {
    patterns = generatePatternsFromLetterForm(patterns, options);
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

export function generateImages(
  _patterns: string | string[],
  _options: PagOptions = {}
): HTMLImageElement[] {
  return _generateImages(_patterns, _options);
}

export function generateImagesPromise(
  _patterns: string | string[],
  _options: PagOptions = {}
): Promise<HTMLImageElement[]> {
  return _generateImages(_patterns, _options, true);
}

function _generateImages(
  _patterns: string | string[],
  _options: PagOptions = {},
  isUsingPromise = false
) {
  (<any>_options).baseSeed = seed;
  let patterns = Array.isArray(_patterns) ? _patterns : _patterns.split("\n");
  const jso = JSON.stringify({ patterns, options: _options });
  if (generatedImages[jso]) {
    return isUsingPromise ? Promise.resolve(generatedImages[jso]) : generatedImages[jso];
  }
  const pixels = generate(patterns, _options);
  const width = pixels[0].length;
  const height = pixels[0][0].length;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  let images = [];
  let imagePromises = [];
  for (let i = 0; i < pixels.length; i++) {
    context.clearRect(0, 0, width, height);
    draw(context, pixels, width / 2, height / 2, i);
    const image = new Image();
    if (isUsingPromise) {
      imagePromises.push(
        new Promise((resolve, reject) => {
          image.onload = e => {
            resolve(image);
          };
        })
      );
    }
    image.src = canvas.toDataURL();
    images.push(image);
  }
  generatedImages[jso] = images;
  return isUsingPromise ? Promise.all(imagePromises) : images;
}

export function setSeed(_seed: number = 0) {
  seed = _seed;
}

export function setDefaultOptions(_defaultOptions: PagOptions) {
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
      const px = pxs[x][y];
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

function generatePatternsFromLetterForm(
  letters: string[],
  options: PagOptions
) {
  const pw = reduce(letters, (w, p) => Math.max(w, p.length), 0);
  const ph = letters.length;
  const fontSize = options.letterFormFontSize;
  const w = Math.round(pw * fontSize * options.letterWidthRatio);
  const h = Math.round(ph * fontSize * 1.2 * options.letterHeightRatio);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const context = canvas.getContext("2d");
  context.font = `${fontSize}px ${options.letterFormFontFamily}`;
  context.textBaseline = "top";
  times(pw, x => {
    times(ph, y => {
      context.fillText(
        letters[y][x],
        x * fontSize * options.letterWidthRatio,
        y * fontSize * 1.2 * options.letterHeightRatio
      );
    });
  });
  const pixels = context.getImageData(0, 0, w, h).data;
  const rect = getPixelSize(pixels, w, h);
  const lw = rect.ex - rect.bx + 1;
  const lh = rect.ey - rect.by + 1;
  let patterns = [];
  times(lh, y => {
    let line = "";
    times(lw, x => {
      const pi = (x + rect.bx + (y + rect.by) * w) * 4 + 3;
      line += pixels[pi] > 0.5 ? options.letterFormChar : " ";
    });
    patterns.push(line);
  });
  return patterns;
}

function getPixelSize(pixels, w, h) {
  let bx = w;
  let ex = -1;
  let by = h;
  let ey = -1;
  let pi = 3;
  times(h, y => {
    times(w, x => {
      if (pixels[pi] > 0) {
        bx = x < bx ? x : bx;
        ex = x > ex ? x : ex;
        by = y < by ? y : by;
        ey = y > ey ? y : ey;
      }
      pi += 4;
    });
  });
  return { bx, ex, by, ey };
}

function generatePixels(patterns: string[], options, random: Random) {
  let pw = reduce(patterns, (w, p) => Math.max(w, p.length), 0);
  let ph = patterns.length;
  let w = Math.round(pw * options.scalePatternX);
  let h = Math.round(ph * options.scalePatternY);
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
    options.isAddingEdgeFirst,
    options.isInnerEdge,
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
  if (options.isRotatingRight || options.isRotatingLeft) {
    pixels = rotate(pixels, w, h, options.isRotatingRight);
    const t = w;
    w = h;
    h = t;
  }
  if (options.isReverseX || options.isReverseY) {
    pixels = reverse(pixels, w, h, options.isReverseX);
  }
  pixels = createEdge(pixels, w, h, false, options.isInnerEdge);
  if (
    options.scale != null ||
    options.scaleX != null ||
    options.scaleY != null
  ) {
    pixels = scalePixels(pixels, w, h, options);
  }
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
  isAddingEdgeFirst,
  isInnerEdge,
  random: Random
) {
  let pixels = timesMap(w, x => {
    const px = Math.floor((x - 1) / scalePatternX);
    return timesMap(h, y => {
      const py = Math.floor((y - 1) / scalePatternY);
      if (px < 0 || px >= pw || py < 0 || py >= ph) {
        return 0;
      }
      const c = px < patterns[py].length ? patterns[py][px] : " ";
      let m = 0;
      if (c === "-") {
        m = random.get() < 0.5 ? 1 : isAddingEdgeFirst ? 0.5 : 0;
      } else if (c === "x" || c === "X") {
        m = random.get() < 0.5 ? 1 : -1;
      } else if (c === "o" || c === "O") {
        m = -1;
      } else if (c === "*") {
        m = 1;
      }
      return m;
    });
  });
  if (isAddingEdgeFirst) {
    pixels = createEdge(pixels, w, h, isAddingEdgeFirst, isInnerEdge);
    pixels = map(pixels, l => map(l, p => Math.floor(p)));
  }
  return pixels;
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

function rotate(pixels: number[][], w, h, toRight) {
  return toRight
    ? timesMap(h, x => timesMap(w, y => pixels[y][h - 1 - x]))
    : timesMap(h, x => timesMap(w, y => pixels[w - 1 - y][x]));
}

function reverse(pixels: number[][], w, h, isX) {
  return isX
    ? timesMap(w, x => timesMap(h, y => pixels[w - 1 - x][y]))
    : timesMap(w, x => timesMap(h, y => pixels[x][h - 1 - y]));
}

function createEdge(pixels: number[][], w, h, isFirst, isInner) {
  let cond;
  if (isFirst) {
    if (isInner) {
      cond = (x, y) =>
        Math.ceil(pixels[x][y]) === 1 &&
        checkAroundPixels(pixels, w, h, 0, x, y);
    } else {
      cond = (x, y) =>
        pixels[x][y] === 0 &&
        checkAroundPixels(pixels, w, h, null, x, y, p => p !== 0);
    }
  } else {
    if (isInner) {
      cond = (x, y) =>
        pixels[x][y] === 1 && checkAroundPixels(pixels, w, h, 0, x, y);
    } else {
      cond = (x, y) =>
        pixels[x][y] === 0 && checkAroundPixels(pixels, w, h, 1, x, y);
    }
  }
  return timesMap(w, x => timesMap(h, y => (cond(x, y) ? -1 : pixels[x][y])));
}

function scalePixels(pixels: number[][], pw, ph, options) {
  const scaleX =
    options.scaleX != null
      ? options.scaleX
      : options.scale != null
        ? options.scale
        : 1;
  const scaleY =
    options.scaleY != null
      ? options.scaleY
      : options.scale != null
        ? options.scale
        : 1;
  const w = Math.round(pw * scaleX);
  const h = Math.round(ph * scaleY);
  let scaledPixels = timesMap(w, x => {
    const px = Math.floor((x - 1) / scaleX);
    return timesMap(h, y => {
      const py = Math.floor((y - 1) / scaleY);
      if (px < 0 || px >= pw || py < 0 || py >= ph) {
        return 0;
      }
      return pixels[px][py];
    });
  });
  const scale = (scaleX + scaleY) / 2;
  times(Math.floor((scale - 1) / 2), () => {
    scaledPixels = scrapeEdge(scaledPixels, w, h);
  });
  return createEdge(scaledPixels, w, h, false, options.isInnerEdge);
}

function scrapeEdge(pixels: number[][], w, h) {
  return timesMap(w, x =>
    timesMap(
      h,
      y =>
        pixels[x][y] === -1 && checkAroundPixels(pixels, w, h, 0, x, y)
          ? 0
          : pixels[x][y] === -1 && checkAroundPixels(pixels, w, h, 1, x, y)
            ? 1
            : pixels[x][y]
    )
  );
}

function checkAroundPixels(
  pixels: number[][],
  w,
  h,
  value,
  cx,
  cy,
  func = null
) {
  const offsets = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  return offsets.some(o => {
    const x = cx + o[0];
    const y = cy + o[1];
    if (x < 0 || x >= w || y < 0 || y >= h) {
      return false;
    }
    return func == null ? pixels[x][y] === value : func(pixels[x][y]);
  });
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
        const l =
          Math.sin(((y - lightingStartY) / lightingHeight) * Math.PI) *
            options.colorLighting +
          (1 - options.colorLighting);
        let v =
          (l * (1 - options.colorNoise) + random.get() * options.colorNoise) *
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

  get(fromOrTo: number = 1, to: number = null) {
    if (to == null) {
      to = fromOrTo;
      fromOrTo = 0;
    }
    return (this.getToMaxInt() / 0xffffffff) * (to - fromOrTo) + fromOrTo;
  }

  getInt(fromOrTo: number, to: number = null) {
    if (to == null) {
      to = fromOrTo;
      fromOrTo = 0;
    }
    return (this.getToMaxInt() % (to - fromOrTo)) + fromOrTo;
  }

  getPm() {
    return this.getInt(2) * 2 - 1;
  }

  select(values: any[]) {
    return values[this.getInt(values.length)];
  }

  setSeed(
    w: number = null,
    x = 123456789,
    y = 362436069,
    z = 521288629,
    loopCount = 32
  ) {
    this.w = w != null ? w >>> 0 : Math.floor(Math.random() * 0xffffffff) >>> 0;
    this.x = x >>> 0;
    this.y = y >>> 0;
    this.z = z >>> 0;
    for (let i = 0; i < loopCount; i++) {
      this.getToMaxInt();
    }
    return this;
  }

  getToMaxInt() {
    const t = this.x ^ (this.x << 11);
    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    this.w = (this.w ^ (this.w >>> 19) ^ (t ^ (t >>> 8))) >>> 0;
    return this.w;
  }

  constructor() {
    this.setSeed();
    this.get = this.get.bind(this);
    this.getToMaxInt = this.getToMaxInt.bind(this);
  }
}

export interface PagOptions {
  isMirrorX?: boolean;
  isMirrorY?: boolean;
  seed?: number;
  hue?: number;
  saturation?: number;
  value?: number;
  rotationNum?: number;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  scalePattern?: number;
  scalePatternX?: number;
  scalePatternY?: number;
  isRotatingRight?: boolean;
  isRotatingLeft?: boolean;
  isReverseX?: boolean;
  isReverseY?: boolean;
  isAddingEdgeFirst?: boolean;
  isInnerEdge?: boolean;
  colorNoise?: number;
  colorLighting?: number;
  edgeDarkness?: number;
  isShowingEdge?: boolean;
  isShowingBody?: boolean;
  isLimitingColors?: boolean;
  isUsingLetterForm?: boolean;
  letterFormChar?: string;
  letterFormFontFamily?: string;
  letterFormFontSize?: number;
  letterWidthRatio?: number;
  letterHeightRatio?: number;
}

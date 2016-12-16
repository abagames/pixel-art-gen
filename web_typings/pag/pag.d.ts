declare module 'pag' {
  function generate(pattern: string[], options?: PagOptions): Pixel[][][];
  function generateImages
    (pattern: string[], options?: PagOptions): HTMLImageElement[];
  function setSeed(seed?: number);
  function setDefaultOptions(_defaultOptions: PagOptions);
  function draw(context: CanvasRenderingContext2D, pixels: Pixel[][][],
    x: number, y: number, rotationIndex?: number);
  function drawImage(context: CanvasRenderingContext2D, images: HTMLImageElement[],
    x: number, y: number, rotationIndex?: number);

  const defaultOptions: PagOptions;

  interface Pixel {
    r: number;
    g: number;
    b: number;
    isEmpty: boolean;
    style: string;
  }

  interface PagOptions {
    isMirrorX?: boolean;
    isMirrorY?: boolean;
    seed?: number;
    hue?: number;
    saturation?: number,
    value?: number,
    rotationNum?: number,
    scale?: number,
    scaleX?: number,
    scaleY?: number,
    colorNoise?: number,
    colorLighting?: number,
    edgeDarkness?: number,
    isShowingEdge?: boolean,
    isShowingBody?: boolean,
    isLimitingColors?: boolean
  }
}

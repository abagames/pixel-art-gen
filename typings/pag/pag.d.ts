declare module 'pag' {
  function generate(pattern: string[], options?: PagOptions): Pixel[][][];
  function setSeed(seed?: number);
  const defaultOptions: PagOptions;
  interface Pixel {
    r: number;
    g: number;
    b: number;
    isEmpty: boolean;
    style: string;
  }
}

declare interface PagOptions {
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
}

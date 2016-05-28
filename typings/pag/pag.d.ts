declare module 'pag' {
  function generate(pattern: string[], options?: PagOptions);
  const defaultOptions: PagOptions;
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

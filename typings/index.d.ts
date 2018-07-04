export declare let defaultOptions: PagOptions;
export declare function generate(_patterns: string | string[], _options?: PagOptions): Pixel[][][];
export declare function generateImages(_patterns: string | string[], _options?: PagOptions): HTMLImageElement[];
export declare function setSeed(_seed?: number): void;
export declare function setDefaultOptions(_defaultOptions: any): void;
export declare class Pixel {
    r: number;
    g: number;
    b: number;
    isEmpty: boolean;
    style: string;
    setFromHsv(hue: any, saturation: any, value: any, isLimitingColors?: boolean): void;
    setStyle(): void;
    limitColor(v: any): 0 | 1 | 0.5;
}
export declare function draw(context: CanvasRenderingContext2D, pixels: Pixel[][][], x: number, y: number, rotationIndex?: number): void;
export declare function drawImage(context: CanvasRenderingContext2D, images: HTMLImageElement[], x: number, y: number, rotationIndex?: number): void;
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
    isRotatingLetterForm?: boolean;
}

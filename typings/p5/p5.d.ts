declare var width: number;
declare var height: number;
declare var mouseX: number;
declare var mouseY: number;
declare const TWO_PI: number;
declare const PI: number;
declare const HALF_PI: number;
declare const QUARTER_PI: number;
declare const LEFT_ARROW: number;
declare const RIGHT_ARROW: number;
declare const UP_ARROW: number;
declare const DOWN_ARROW: number;
declare const ESCAPE: number;
declare function createCanvas(width: number, height: number, option?: any);
declare function background(r: number | string, g?: number, b?: number);
declare function stroke(r: number | string, g?: number, b?: number);
declare function strokeWeight(w: number);
declare function noStroke();
declare function fill(r: number | string, g?: number, b?: number);
declare function noFill();
declare function color(r: number | string, g?: number, b?: number);
declare function rect(x: number, y: number, width: number, height: number);
declare function ellipse(x: number, y: number, width: number, height: number);
declare function line(x1: number, y1: number, x2: number, y2: number);
declare function textSize(size: number);
declare function text(str: string, x: number, y: number, x2?: number, y2?: number);
declare function textWidth(str: string): number;
declare function push();
declare function pop();
declare function translate(x: number, y: number);
declare function rotate(angel: number);
declare function scale(x: number, y?: number);
declare function keyIsDown(code: number): boolean;
declare function random(min?: number, max?: number): number;
declare function randomSeed(seed: number);
declare function abs(v: number): number;
declare function ceil(v: number): number;
declare function constrain(v: number, low: number, high: number): number;
declare function floor(v: number): number;
declare function lerp(start: number, stop: number, amt: number): number;
declare function max(v: number): number;
declare function min(v: number): number;
declare function pow(v: number): number;
declare function round(v: number): number;
declare function sqrt(v: number): number;
declare function atan2(y: number, x: number): number;
declare function cos(v: number): number;
declare function sin(v: number): number;

declare module p5 {
  class Vector {
    x: number;
    y: number;
    z: number;

    constructor(x?: number, y?: number, z?: number);
    toString(): string;
    set(x?: number | Vector | number[], y?: number, z?: number);
    copy(): Vector;
    add(x?: number | Vector | number[], y?: number, z?: number);
    sub(x?: number | Vector | number[], y?: number, z?: number);
    mult(v: number);
    div(v: number);
    mag(): number;
    magSq(): number;
    dot(x?: number | Vector | number[], y?: number, z?: number): number;
    cross(v: Vector): Vector;
    dist(v: Vector): number;
    normalize();
    limit(v: number);
    setMag(v: number);
    heading(): number;
    rotate(angle: number);
    lerp(x: number, y?: number, z?: number, amt?: number);
    array(): number[];
    equals(x?: number | Vector | number[], y?: number, z?: number): boolean;
    static fromAngle(angle: number): p5.Vector;
    static angleBetween(v1: p5.Vector, v2: p5.Vector): number;

    constrain(minX?: number, maxX?: number, minY?: number, maxY?: number);
    wrap(minX?: number, maxX?: number, minY?: number, maxY?: number);
    isIn(minX?: number, maxX?: number, minY?: number, maxY?: number,
    paddingX?: number, paddingY?: number): boolean;
    
    _set(x?: number | Vector | number[], y?: number, z?: number);    
  }
}

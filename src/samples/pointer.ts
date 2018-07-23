import * as PIXI from "pixi.js";

export let pos: PIXI.Point;
export let move: PIXI.Point;
export let pressedPos: PIXI.Point;
export let isPressed = false;
export let isJustPressed = false;
export let isDown = false;

let screen: HTMLElement;
let pixelSize: PIXI.Point;
let isInitialized = false;
let padding: PIXI.Point;
let prevPos: PIXI.Point;

export function init(
  _screen: HTMLElement,
  _pixelSize: PIXI.Point,
  _padding: PIXI.Point = new PIXI.Point(),
  playEmptySound: Function
) {
  screen = _screen;
  pixelSize = _pixelSize;
  padding = _padding;
  document.addEventListener("mousedown", e => {
    onDown(e.pageX, e.pageY);
  });
  document.addEventListener("touchstart", e => {
    playEmptySound();
    onDown(e.touches[0].pageX, e.touches[0].pageY);
  });
  document.addEventListener("mousemove", e => {
    onMove(e.pageX, e.pageY);
  });
  document.addEventListener(
    "touchmove",
    e => {
      e.preventDefault();
      onMove(e.touches[0].pageX, e.touches[0].pageY);
    },
    { passive: false }
  );
  document.addEventListener("mouseup", e => {
    onUp(e);
  });
  document.addEventListener(
    "touchend",
    e => {
      e.preventDefault();
      (e.target as any).click();
      onUp(e);
    },
    { passive: false }
  );
  pos = new PIXI.Point();
  move = new PIXI.Point();
  pressedPos = new PIXI.Point();
  prevPos = new PIXI.Point();
  isInitialized = true;
}

export function update() {
  if (!isInitialized) {
    return;
  }
  move.set(pos.x - prevPos.x, pos.y - prevPos.y);
  prevPos.set(pos.x, pos.y);
  const pp = isPressed;
  isPressed = isDown;
  isJustPressed = !pp && isPressed;
}

export function clearJustPressed() {
  isJustPressed = false;
  isPressed = true;
}

export function resetPressedPointerPos(ratio = 1) {
  pressedPos.x += (pos.x - pressedPos.x) * ratio;
  pressedPos.y += (pos.y - pressedPos.y) * ratio;
}

function calcPointerPos(x, y, v) {
  v.x =
    ((x - screen.offsetLeft) / screen.clientWidth + 0.5) * pixelSize.x -
    padding.x;
  v.y =
    ((y - screen.offsetTop) / screen.clientHeight + 0.5) * pixelSize.y -
    padding.y;
}

function onDown(x, y) {
  calcPointerPos(x, y, pos);
  pressedPos.set(pos.x, pos.y);
  isDown = true;
}

function onMove(x, y) {
  calcPointerPos(x, y, pos);
}

function onUp(e) {
  isDown = false;
}

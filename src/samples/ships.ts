import * as pag from "../index";
import * as debug from "./debug";

let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
const screenSize = 128;

window.onload = init;

function init() {
  const seed = 0;
  pag.setSeed(seed);
  debug.enableShowingErrors();
  debug.initSeedUi(onSeedChanged);
  canvas = document.createElement("canvas");
  canvas.width = canvas.height = screenSize;
  document.body.appendChild(canvas);
  context = canvas.getContext("2d");
  pag.setDefaultOptions({
    isMirrorY: true
  });
  draw();
}

function onSeedChanged(seed: number) {
  pag.setSeed(seed);
  draw();
}

const pattern = `
 ----
---
-x--
-x-----`;

async function draw() {
  context.fillStyle = "black";
  context.fillRect(0, 0, screenSize, screenSize);
  for (let i = 0; i < 8; i++) {
    const ps = await pag.generateImagesPromise(pattern, {
      scalePattern: 2,
      seed: (i + 7) * 1001
    });
    pag.drawImage(context, ps, (i + 0.5) * 16, 8);
  }
  for (let i = 0; i < 4; i++) {
    const ps = await pag.generateImagesPromise(pattern, {
      scale: 2,
      scalePattern: 2,
      seed: (i + 17) * 2002
    });
    pag.drawImage(context, ps, (i + 0.5) * 32, 36);
  }
  for (let i = 0; i < 2; i++) {
    const ps = await pag.generateImagesPromise(pattern, {
      scale: 4,
      scalePattern: 2,
      seed: (i + 27) * 4004
    });
    pag.drawImage(context, ps, (i + 0.5) * 64, 92);
  }
}

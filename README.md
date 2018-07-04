# pixel-art-gen

Generate a pixel art from a simple pattern string.
(based on [pixel-sprite-generator](https://github.com/zfedoran/pixel-sprite-generator))

### Demo

[ships](https://abagames.github.io/pixel-art-gen/index.html?ships)

![ships screenshot](https://abagames.github.io/pixel-art-gen/ships.gif)

[recoil](https://abagames.github.io/pixel-art-gen/index.html?recoil)

![recoil screenshot](https://abagames.github.io/pixel-art-gen/recoil.gif)

### How to use

See the [sample code](https://github.com/abagames/pixel-art-gen/blob/master/src/samples/recoil.ts).

Include [build/index.js](https://github.com/abagames/pixel-art-gen/blob/master/build/index.js) script or install from npm.

```
% npm i pixel-art-gen
```

`pag.generate` function returns a generated pixel art in a `Pixel` array ([rotated pattern index][x][y]),

```js
// generate a pixel art
// (with the default options {isMirrorY: true, rotationNum: 16, scale: 2})
// each character in the string array of the 1st arg represents a pixel type
// 'x': a body or an edge
// '-': a body or an empty
// 'o': an edge
// '*': a body
player.pixels = pag.generate([" x", "xxxx"]);
```

or use `pag.generateImages` to get images.

```js
player.images = pag.generateImages([" x", "xxxx"]);
```

`Pixel` instance consists of rgb colors, an isEmpty boolean value and a style string.

```js
class Pixel {
  r = 0;
  g = 0;
  b = 0;
  isEmpty = true;
  style: string;
}
```

Use the `pag.draw` function to draw the generated pixel art,

```js
// draw a generated pixels
function drawPixels(actor) {
  var a = actor.angle;
  if (a < 0) {
    a = Math.PI * 2 - Math.abs(a);
  }
  const ri = Math.round(a / ((Math.PI * 2) / rotationNum)) % rotationNum;
  pag.draw(context, actor.pixels, actor.pos.x, actor.pos.y, ri);
}
```

or use `pag.drawImages` to draw images.

```js
pag.drawImage(context, actor.images, actor.pos.x, actor.pos.y, ri);
```

Options can be specified in the 2nd arg of the `pag.generate` (or `pag.generateImages`) function.

```js
// specify the options in the 2nd arg
enemy.pixels = pag.generate([" x", "xx"], { isMirrorX: true });
```

Options described below are available.

```js
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
  colorNoise: 0.1, // how often the color changes randomly
  colorLighting: 1, // lighting effect for the color
  edgeDarkness: 0.4, // darkness of the edge pixels
  isShowingEdge: true, // show the edge pixels
  isShowingBody: true, // show the body pixels
  isLimitingColors: false, // limit the using colors
  isUsingLetterForm: false, // using the letter form for the pattern
  letterFormChar: "x", // the pattern letter for the letter form
  letterFormFontFamily: "monospace", // font for the letter form
  letterFormFontSize: 8,
  isRotatingLetterForm: false // rotate the letter form to the right
```

You can set the default options of the library.

```js
// set the default options
pag.setDefaultOptions({
  isMirrorY: true,
  rotationNum,
  scale: 2
});
```

Set the random seed by the `pag.setSeed` function to change a generated pixel art.

```js
// set the random seed to change a generated pixel art
pag.setSeed(seed);
```

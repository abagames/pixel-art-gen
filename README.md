# pixel-art-gen ([Demo](https://abagames.github.io/pixel-art-gen/samples/index.html?shot))

Generate a pixel art from a simple pattern string.
(based on [pixel-sprite-generator](https://github.com/zfedoran/pixel-sprite-generator))

### How to use

See the [sample code](https://github.com/abagames/pixel-art-gen/blob/master/src/samples/shot.ts).

Include [pixel-art-gen/index.js](https://github.com/abagames/pixel-art-gen/blob/master/docs/pixel-art-gen/index.js) script.

`pag.generate` function returns a generated pixel art in a 3d `Pixel` array.
([rotated pattern index][x][y])

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

Use the 'pag.draw' function to draw the generated pixel art.

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

Options can be specified in the 2nd arg of the `pag.generate` function.

```js
// specify the options in the 2nd arg
enemy.pixels = pag.generate([" x", "xx"], { isMirrorX: true });
```

Options described below are available.

```js
  isMirrorX: false,    // mirror the pattern in the x-axis
  isMirrorY: false,    // mirror the pattern in the y-axis
  seed: 0,             // random seed
  hue: null,           // base color (hue changes randomly when hue = null)
  saturation: 0.8,
  value: 1,
  rotationNum: 1,      // create rotated patterns
  scale: 1,            // scaling
  scaleX: null,
  scaleY: null,
  colorNoise: 0.1,     // how often the color changes randomly
  colorLighting: 1,    // lighting effect for the color
  edgeDarkness: 0.4,   // darkness of the edge pixels
  isShowingEdge: true, // show the edge pixels
  isShowingBody: true, // show the body pixels
  isLimitingColors: false, // limit the using colors
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

pixel-art-gen
======================
Generete a pixel art from a simple pattern string.
(based on [pixel-sprite-generator](https://github.com/zfedoran/pixel-sprite-generator))

Play [the demo](http://abagames.sakura.ne.jp/16/pag/) of the sample code.

### How to use

See the [sample code](https://github.com/abagames/pixel-art-gen/blob/master/www/index.html).
([p5.js](https://p5js.org/) is used for drawing.)

Include pag/index.js script.
```html
  <script src="./libs/pag/index.js"></script>
```

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
  player.pixels = pag.generate([
    ' x',
    'xxxx'
  ]);
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

Check each value of the `Pixel` array to render the generated pixel art.
```js
// draw a generated pixels
function drawPixels(actor) {
  var a = actor.angle;
  if (a < 0) {
    a = Math.PI * 2 - Math.abs(a);
  }
  var pxs = actor.pixels[Math.round(a / (Math.PI * 2 / rotationNum)) % rotationNum];
  var pw = pxs.length;
  var ph = pxs[0].length;
  var sbx = Math.floor(actor.pos.x - pw / 2);
  var sby = Math.floor(actor.pos.y - ph / 2);
  for (var y = 0, sy = sby; y < ph; y++ , sy++) {
    for (var x = 0, sx = sbx; x < pw; x++ , sx++) {
      var px = pxs[x][y];
      if (!px.isEmpty) {
        context.fillStyle = px.style;
        context.fillRect(sx, sy, 1, 1);
      }
    }
  }
}
```

Options can be specified in the 2nd arg of the `pag.generate` function.
```js
  // specify the options in the 2nd arg
  enemy.pixels = pag.generate([
    ' x',
    'xx',
  ], { isMirrorX: true });
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
```

You can set the default options of the library.
```js
  // set the default options
  pag.defaultOptions.isMirrorY = true;
  pag.defaultOptions.rotationNum = rotationNum;
  pag.defaultOptions.scale = 2;
```

Set the random seed by the `pag.setSeed` function to change a generated pixel art.
```js
  // set the random seed to change a generated pixel art
  pag.setSeed(seed);
```

License
----------
MIT

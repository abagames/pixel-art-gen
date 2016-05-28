import * as pag from './pag/index';
import * as debug from './debug';
import * as sss from 'sss';
declare const require: any;
const p5 = require('p5');

new p5(p => {
  let isInGame = false;
  const rotationNum = 16;
  let actors = [];
  let player: any = null;
  let ticks = 0;
  let score = 0;
  let addingScore = 1;
  let isTouched = false;
  let context;
  p.setup = () => {
    sss.init(10);
    debug.enableShowingErrors()
    debug.initSeedUi(onSeedChanged);
    const canvas = p.createCanvas(128, 128).canvas;
    canvas.style.width = canvas.style.height = '512px';
    context = canvas.getContext('2d');
    p.noStroke();
    pag.defaultOptions.isMirrorY = true;
    pag.defaultOptions.rotationNum = rotationNum;
    pag.defaultOptions.scale = 2;
    setStars();
  };
  p.touchStarted = () => {
    sss.playEmpty();
    if (!isInGame && ticks > 0) {
      isInGame = true;
      score = ticks = 0;
      addingScore = 1;
      sss.playBgm();
      setPlayer();
    }
    isTouched = true;
  };
  p.touchMoved = () => {
    return false;
  };
  p.draw = () => {
    sss.update();
    p.background(0);
    const df = Math.sqrt(ticks / 1000 + 1);
    if (p.random() < 0.03 * df) {
      setEnemy();
    }
    actors.sort((a, b) => a.priority - b.priority);
    forEach(actors, a => {
      a.update();
      a.pos.x += a.vel.x;
      a.pos.y += a.vel.y;
      if (a.pos.x < -48 || a.pos.x > 176 || a.pos.y < -48 || a.pos.y > 176) {
        a.isAlive = false;
        if (a.name === 'shot') {
          addingScore = 1;
        }
      }
      drawPixels(a);
    });
    for (let i = 0; i < actors.length;) {
      if (actors[i].isAlive === false) {
        actors.splice(i, 1);
      } else {
        i++;
      }
    }
    p.fill('#ace');
    p.textSize(9);
    p.text(score, 5, 10);
    p.text(`+${addingScore}`, 5, 20);
    ticks++;
  };
  const setPlayer = () => {
    if (player != null) {
      player.isAlive = false;
    }
    player = {};
    player.pixels = pag.generate([
      ' x',
      'xxxx'
    ]);
    player.pos = { x: 64, y: 64 };
    player.vel = { x: 0, y: 0 };
    player.angle = 0;
    player.update = function () {
      this.angle = Math.atan2(p.mouseY / 4 - this.pos.y, p.mouseX / 4 - this.pos.x);
      if (isTouched) {
        isTouched = false;
        const shot: any = {};
        shot.pixels = pag.generate([
          'xxx'
        ], { isMirrorY: false });
        shot.pos = { x: this.pos.x, y: this.pos.y };
        shot.angle = this.angle;
        const speed = 3;
        shot.vel = { x: Math.cos(this.angle) * speed, y: Math.sin(this.angle) * speed };
        shot.update = function () {
          forEach(getActors('enemy'), e => {
            let ox = e.pos.x - this.pos.x;
            let oy = e.pos.y - this.pos.y;
            if (Math.sqrt(ox * ox + oy * oy) < 10) {
              this.isAlive = false;
              e.isAlive = false;
              setParticles(5, e.pos);
              sss.play('h1', 4);
              score += addingScore;
              addingScore++;
            }
          });
        };
        shot.name = 'shot';
        shot.priority = -1;
        actors.push(shot);
        setParticles(2, this.pos, this.angle);
        sss.play('s1');
        this.vel.x = -shot.vel.x;
        this.vel.y = -shot.vel.y;
      }
      this.vel.x *= 0.7;
      this.vel.y *= 0.7;
      var vx = (64 - this.pos.x) * 0.1;
      var vy = (64 - this.pos.y) * 0.1;
      forEach(actors, a => {
        a.pos.x += vx;
        a.pos.y += vy;
      });
    };
    player.priority = 0;
    actors.push(player);
  };
  const setEnemy = () => {
    const enemy: any = {};
    enemy.pixels = pag.generate([
      ' x',
      'xx',
    ], { isMirrorX: true });
    enemy.pos = { x: p.random(-32, 160), y: p.random() < 0.5 ? -32 : 160 };
    if (p.random() < 0.5) {
      let tx = enemy.pos.x;
      enemy.pos.x = enemy.pos.y;
      enemy.pos.y = tx;
    }
    enemy.vel = { x: p.random(-0.1, 0.1), y: p.random(-0.1, 0.1) };
    enemy.angle = 0;
    enemy.update = function () {
      if (player != null) {
        const df = Math.sqrt(ticks / 1000 + 1);
        this.vel.x += (player.pos.x - this.pos.x) * 0.0001 * df;
        this.vel.y += (player.pos.y - this.pos.y) * 0.0001 * df;
        const ox = this.pos.x - player.pos.x;
        const oy = this.pos.y - player.pos.y;
        if (Math.sqrt(ox * ox + oy * oy) < 10) {
          isInGame = false;
          setParticles(30, player.pos);
          sss.play('u1', 5);
          sss.stopBgm();
          player.isAlive = false;
          player = null;
          ticks = -60;
        }
      } else {
        this.vel.y += 0.01;
      }
      this.vel.x *= 0.99;
      this.vel.y *= 0.99;
    };
    enemy.name = 'enemy';
    enemy.priority = 1;
    actors.push(enemy);
  };
  const setParticles = (num, pos, angle = null) => {
    for (var i = 0; i < num; i++) {
      const part: any = {};
      part.pixels = pag.generate([
        'x',
      ], { isMirrorX: true, colorLighting: 0.5, edgeDarkness: 0.8, value: 0.8 });
      part.pos = { x: pos.x, y: pos.y };
      if (angle == null) {
        part.angle = p.random(Math.PI * 2);
      } else {
        part.angle = angle + p.random(-0.5, 0.5);
      }
      const speed = p.random(0.5, 1);
      part.vel = { x: Math.cos(part.angle) * speed, y: Math.sin(part.angle) * speed };
      part.ticks = p.random(15, 30);
      part.update = function () {
        this.vel.x *= 0.98;
        this.vel.y *= 0.98;
        if (this.ticks-- < 0) {
          this.isAlive = false;
        }
      }
      part.priority = -2;
      actors.push(part);
    }
  };
  const setStars = () => {
    for (let i = 0; i < 32; i++) {
      const star: any = {};
      star.pixels = pag.generate([
        'o'
      ], { isMirrorY: false, hue: p.random(), saturation: 0.4 });
      star.pos = { x: p.random(-16, 132), y: p.random(-16, 132) };
      star.vel = { x: 0, y: 0 };
      star.angle = 0;
      star.update = function () {
        if (this.pos.x < -16) {
          this.pos.x = 160 + this.pos.x;
        }
        if (this.pos.x > 132) {
          this.pos.x = -160 + this.pos.x;
        }
        if (this.pos.y < -16) {
          this.pos.y = 160 + this.pos.y;
        }
        if (this.pos.y > 132) {
          this.pos.y = -160 + this.pos.y;
        }
      };
      star.priority = -3;
      actors.push(star);
    }
  };
  function drawPixels(actor) {
    let a = actor.angle;
    if (a < 0) {
      a = Math.PI * 2 - Math.abs(a);
    }
    const pxs = actor.pixels[Math.round(a / (Math.PI * 2 / rotationNum)) % rotationNum];
    const pw = pxs.length;
    const ph = pxs[0].length;
    const sbx = Math.floor(actor.pos.x - pw / 2);
    const sby = Math.floor(actor.pos.y - ph / 2);
    for (let y = 0, sy = sby; y < ph; y++ , sy++) {
      for (let x = 0, sx = sbx; x < pw; x++ , sx++) {
        var px = pxs[x][y];
        if (!px.isEmpty) {
          context.fillStyle = px.style;
          context.fillRect(sx, sy, 1, 1);
        }
      }
    }
  }
  function getActors(name: string) {
    let result = [];
    forEach(actors, a => {
      if (a.name === name) {
        result.push(a);
      }
    });
    return result;
  }
  function forEach(array: any[], func: Function) {
    for (let i = 0; i < array.length; i++) {
      func(array[i]);
    }
  }
  const onSeedChanged = (seed: number) => {
    pag.setSeed(seed);
    sss.reset();
    sss.setSeed(seed);
    if (isInGame) {
      sss.playBgm();
      setPlayer();
    }
  }
});

import * as pag from "../index";
import * as debug from "./debug";
import * as sss from "sounds-some-sounds";
declare const require: any;

let isInGame = false;
const rotationNum = 16;
let actors = [];
let player: any = null;
let ticks = 0;
let score = 0;
let addingScore = 1;
let isTouched = false;
let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
let titleImages: HTMLImageElement[];
const screenSize = 128;
let cursorPos = { x: 0, y: 0 };
declare const WebFont: any;

window.onload = () => {
  WebFont.load({
    google: {
      families: ["Inconsolata"]
    },
    active: init,
    inactive: init,
    timeout: 2000
  });
};

function init() {
  const seed = 9682886;
  pag.setSeed(seed);
  sss.init(seed);
  debug.enableShowingErrors();
  debug.initSeedUi(onSeedChanged);
  canvas = document.createElement("canvas");
  canvas.width = canvas.height = screenSize;
  document.body.appendChild(canvas);
  context = canvas.getContext("2d");
  pag.setDefaultOptions({
    isMirrorY: true,
    rotationNum,
    scalePattern: 2
  });
  titleImages = pag.generateImages("RECOIL", {
    isUsingLetterForm: true,
    letterFormFontFamily: "'Inconsolata', monospace",
    letterFormChar: "*",
    isMirrorY: false,
    rotationNum: 1
  });
  setStars();
  document.addEventListener("mousedown", e => {
    onCursorDown(e.clientX, e.clientY);
  });
  document.addEventListener("touchstart", e => {
    onCursorDown(e.touches[0].clientX, e.touches[0].clientY);
  });
  document.addEventListener("mousemove", e => {
    onCursorMove(e.clientX, e.clientY);
  });
  document.addEventListener(
    "touchmove",
    e => {
      e.preventDefault();
      onCursorMove(e.touches[0].clientX, e.touches[0].clientY);
    },
    { passive: false }
  );
  document.addEventListener(
    "touchend",
    e => {
      e.preventDefault();
      (e.target as any).click();
    },
    { passive: false }
  );
  update();
}

function onCursorDown(x: number, y: number) {
  sss.playEmpty();
  if (!isInGame && ticks > 0) {
    isInGame = true;
    score = ticks = 0;
    addingScore = 1;
    sss.playJingle("s1");
    setPlayer();
  }
  isTouched = true;
  onCursorMove(x, y);
}

function onCursorMove(x: number, y: number) {
  cursorPos.x =
    ((x - canvas.offsetLeft) / canvas.clientWidth + 0.5) * screenSize;
  cursorPos.y =
    ((y - canvas.offsetTop) / canvas.clientHeight + 0.5) * screenSize;
}

function update() {
  requestAnimationFrame(update);
  sss.update();
  if (isInGame && ticks === 180) {
    sss.playBgm();
  }
  context.fillStyle = "black";
  context.fillRect(0, 0, screenSize, screenSize);
  const df = Math.sqrt(ticks / 1000 + 1);
  if (Math.random() < 0.03 * df) {
    setEnemy();
  }
  actors.sort((a, b) => a.priority - b.priority);
  forEach(actors, a => {
    a.update();
    a.pos.x += a.vel.x;
    a.pos.y += a.vel.y;
    if (a.pos.x < -48 || a.pos.x > 176 || a.pos.y < -48 || a.pos.y > 176) {
      a.isAlive = false;
      if (a.name === "shot") {
        addingScore = 1;
      }
    }
    if (a.images != null) {
      drawPixels(a);
    }
    if (a.rectColor != null) {
      const rc = a.rectColor;
      context.fillStyle = `rgb(${rc.r}, ${rc.g}, ${rc.b})`;
      context.fillRect(a.pos.x, a.pos.y, 1, 1);
    }
  });
  for (let i = 0; i < actors.length; ) {
    if (actors[i].isAlive === false) {
      actors.splice(i, 1);
    } else {
      i++;
    }
  }
  if (!isInGame) {
    pag.drawImage(context, titleImages, 64, 40);
  }
  context.fillStyle = "#ace";
  context.font = "9px 'Inconsolata', monospace";
  context.fillText(`${score}`, 5, 10);
  context.fillText(`+${addingScore}`, 5, 20);
  ticks++;
}

function setPlayer() {
  if (player != null) {
    player.isAlive = false;
  }
  player = {};
  player.images = pag.generateImages([" x", "xxxx"]);
  player.pos = { x: 64, y: 64 };
  player.vel = { x: 0, y: 0 };
  player.angle = 0;
  player.update = function() {
    this.angle = Math.atan2(cursorPos.y - this.pos.y, cursorPos.x - this.pos.x);
    if (isTouched) {
      isTouched = false;
      const shot: any = {};
      shot.images = pag.generateImages(["xxx"], { isMirrorY: false });
      shot.pos = { x: this.pos.x, y: this.pos.y };
      shot.angle = this.angle;
      const speed = 3;
      shot.vel = {
        x: Math.cos(this.angle) * speed,
        y: Math.sin(this.angle) * speed
      };
      shot.update = function() {
        forEach(getActors("enemy"), e => {
          let ox = e.pos.x - this.pos.x;
          let oy = e.pos.y - this.pos.y;
          if (Math.sqrt(ox * ox + oy * oy) < 10) {
            this.isAlive = false;
            e.isAlive = false;
            setParticles(5, e.pos);
            sss.playJingle("l2", true, 69, 12);
            score += addingScore;
            addingScore++;
          }
        });
      };
      shot.name = "shot";
      shot.priority = -1;
      actors.push(shot);
      setParticles(2, this.pos, this.angle);
      sss.play("s1");
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
}

function setEnemy() {
  const enemy: any = {};
  enemy.images = pag.generateImages([" x", "xx"], { isMirrorX: true });
  enemy.pos = { x: randomFromTo(-32, 160), y: Math.random() < 0.5 ? -32 : 160 };
  if (Math.random() < 0.5) {
    let tx = enemy.pos.x;
    enemy.pos.x = enemy.pos.y;
    enemy.pos.y = tx;
  }
  enemy.vel = { x: randomFromTo(-0.1, 0.1), y: randomFromTo(-0.1, 0.1) };
  enemy.angle = 0;
  enemy.update = function() {
    if (player != null) {
      const df = Math.sqrt(ticks / 1000 + 1);
      this.vel.x += (player.pos.x - this.pos.x) * 0.0001 * df;
      this.vel.y += (player.pos.y - this.pos.y) * 0.0001 * df;
      const ox = this.pos.x - player.pos.x;
      const oy = this.pos.y - player.pos.y;
      if (Math.sqrt(ox * ox + oy * oy) < 10) {
        isInGame = false;
        setParticles(30, player.pos);
        sss.playJingle("s3", true, 60, 24);
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
  enemy.name = "enemy";
  enemy.priority = 1;
  actors.push(enemy);
}

function setParticles(num, pos, angle = null) {
  for (var i = 0; i < num; i++) {
    const part: any = {};
    part.images = pag.generateImages(["x"], {
      isMirrorX: true,
      colorLighting: 0.5,
      edgeDarkness: 0.8,
      value: 0.8
    });
    part.pos = { x: pos.x, y: pos.y };
    if (angle == null) {
      part.angle = randomFromTo(0, Math.PI * 2);
    } else {
      part.angle = angle + randomFromTo(-0.5, 0.5);
    }
    const speed = randomFromTo(0.5, 1);
    part.vel = {
      x: Math.cos(part.angle) * speed,
      y: Math.sin(part.angle) * speed
    };
    part.ticks = randomFromTo(15, 30);
    part.update = function() {
      this.vel.x *= 0.98;
      this.vel.y *= 0.98;
      if (this.ticks-- < 0) {
        this.isAlive = false;
      }
    };
    part.priority = -2;
    actors.push(part);
  }
}

function setStars() {
  for (let i = 0; i < 32; i++) {
    const star: any = {};
    star.rectColor = {
      r: Math.floor(randomFromTo(128, 256)),
      g: Math.floor(randomFromTo(128, 256)),
      b: Math.floor(randomFromTo(128, 256))
    };
    star.pos = { x: randomFromTo(-16, 144), y: randomFromTo(-16, 144) };
    star.vel = { x: 0, y: 0 };
    star.angle = 0;
    star.update = function() {
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
}

function drawPixels(actor) {
  let a = actor.angle;
  if (a < 0) {
    a = Math.PI * 2 - Math.abs(a);
  }
  const ri = Math.round(a / ((Math.PI * 2) / rotationNum)) % rotationNum;
  pag.drawImage(context, actor.images, actor.pos.x, actor.pos.y, ri);
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

function randomFromTo(from: number, to: number) {
  return Math.random() * (to - from) + from;
}

function onSeedChanged(seed: number) {
  pag.setSeed(seed);
  sss.reset();
  sss.setSeed(seed);
  if (isInGame) {
    sss.playBgm();
    setPlayer();
  }
}

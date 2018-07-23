import * as pag from "../index";
import * as debug from "./debug";
import * as pointer from "./pointer";
import Collider from "./collider";
import * as PIXI from "pixi.js";
import * as PIXIFilters from "pixi-filters";
import * as sss from "sounds-some-sounds";
import * as ppe from "particle-pattern-emitter";
import * as WebFont from "webfontloader";

const fontFamily = "Hannari";
const fontUrl = "https://fonts.googleapis.com/earlyaccess/hannari.css";
let isInGame = false;
let ticks = 0;
let score = 0;
let multiplier = 1;
let app: PIXI.Application;
let screen: PIXI.Container;
const screenSize = 256;
const screenPadding = 20;
let title: Actor;
let scoreText: PIXI.Text;
let multiplierText: PIXI.Text;
let ufoScoreText: PIXI.Text;
let ufoScoreTicks = 0;

window.onload = () => {
  WebFont.load({
    custom: {
      families: [fontFamily],
      urls: [fontUrl]
    },
    active: init,
    inactive: init
  });
};

function init() {
  (document.body as any).style = "background:black";
  initScreen(screenSize, screenPadding, 0x111111, 0);
  const ss = screenSize + screenPadding * 2;
  pointer.init(
    app.view,
    new PIXI.Point(ss, ss),
    new PIXI.Point(screenPadding, screenPadding),
    () => {
      sss.playEmpty();
    }
  );
  const seed = 5067072;
  pag.setSeed(seed);
  ppe.setSeed(seed);
  sss.init(seed);
  debug.enableShowingErrors();
  debug.initSeedUi(onSeedChanged);
  const p = document.createElement("p");
  p.innerText = "[Click/Touch Left/Right]: move";
  document.body.appendChild(p);
  pag.setDefaultOptions({
    isLimitingColors: true,
    colorLighting: 0.5,
    colorNoise: 0,
    isAddingEdgeFirst: true,
    isUsingLetterForm: true,
    letterFormChar: "*",
    letterFormFontFamily: fontFamily,
    letterWidthRatio: 1.1,
    letterHeightRatio: 1.1
  });
  ppe.setOptions({
    scaleRatio: 2,
    isLimitingColors: true
  });
  scoreText = initText(5, 2);
  multiplierText = initText(5, 18);
  ufoScoreText = initText(-99, -99);
  ufoScoreText.visible = false;
  ufoScoreText.anchor.x = ufoScoreText.anchor.y = 0.5;
  beginTitle();
  update();
}

function initText(x, y) {
  const text = new PIXI.Text("", {
    fontFamily,
    fontSize: 14,
    fill: "white"
  });
  text.x = x;
  text.y = y;
  screen.addChild(text);
  return text;
}

function beginTitle() {
  sss.stopBgm();
  isInGame = false;
  title = new Actor();
  title.pos.x = 128;
  title.pos.y = 80;
  title.setImage(
    pag.generateImages("VADER", {
      isInnerEdge: true,
      scalePattern: 1.5,
      scale: 2
    })[0],
    "Title",
    false
  );
}

let turret: Turret;
let ufoTicks = 0;

function beginGame() {
  removeActors();
  isInGame = true;
  score = ticks = 0;
  sss.playBgm();
  turret = new Turret();
  turret.init();
  ufoTicks = 400 + Math.random() * 100;
  stage = 0;
  beginStage();
}

let stage = 0;
let vaderSpeed = 3;
let vaderShotFreq = 1;
let bulletSpeed = 1.5;

function beginStage() {
  sss.playJingle("s_bs", true);
  stage++;
  vaderSpeed = 2 + stage;
  vaderShotFreq = 1 / Math.sqrt(stage);
  bulletSpeed = 1 + Math.sqrt(Math.sqrt(stage)) * 0.5;
  initVaders();
  multiplier = 1;
}

function update() {
  requestAnimationFrame(update);
  pointer.update();
  sss.update();
  updateParticles();
  if (isInGame) {
    ufoTicks--;
    if (ufoTicks <= 0) {
      ufoTicks = 400 + Math.random() * 100;
      new Ufo().init();
    }
    updateVaders();
    updateActors();
    if (getActors("Vader").length <= 0) {
      beginStage();
    }
    scoreText.text = `${score}`;
    multiplierText.text = `x${multiplier}`;
  } else {
    if (pointer.isJustPressed) {
      beginGame();
    }
  }
  ufoScoreTicks--;
  if (ufoScoreTicks === 0) {
    ufoScoreText.visible = false;
  }
  ticks++;
}

let actors: Actor[] = [];
let textures = {};

function updateActors() {
  for (let i = 0; i < actors.length; ) {
    const a = actors[i];
    if (a.isAlive) {
      a.update();
    }
    if (!a.isAlive) {
      actors.splice(i, 1);
    } else {
      i++;
    }
  }
}

function getActors(name: string) {
  let result: Actor[] = [];
  actors.forEach(a => {
    if (a.name === name) {
      result.push(a);
    }
  });
  return result;
}

function removeActors() {
  actors.forEach(a => {
    a.remove();
  });
  actors = [];
}

class Actor {
  pos = { x: 0, y: 0 };
  size = { x: 0, y: 0 };
  sprite: PIXI.Sprite;
  collider: Collider;
  colliders: { [key: string]: Collider } = {};
  name;
  isAlive = true;

  constructor() {
    actors.push(this);
  }

  setImage(image: HTMLImageElement, name: string, isAddingCollider = true) {
    let texture;
    if (textures[name] != null) {
      texture = textures[name];
    } else {
      texture = PIXI.Texture.fromLoader(image, name);
      textures[name] = texture;
    }
    if (this.sprite == null) {
      this.sprite = new PIXI.Sprite(texture);
      this.sprite.anchor.x = 0.5;
      this.sprite.anchor.y = 0.5;
      this.sprite.x = this.pos.x;
      this.sprite.y = this.pos.y;
      screen.addChild(this.sprite);
    } else {
      this.sprite.texture = texture;
    }
    this.size.x = image.width;
    this.size.y = image.height;
    if (isAddingCollider) {
      const c = this.colliders[name];
      if (c != null) {
        this.collider = c;
      } else {
        this.collider = new Collider(image);
        this.collider.anchor.x = this.collider.anchor.y = 0.5;
        this.colliders[name] = this.collider;
      }
    }
  }

  update() {
    if (this.sprite != null) {
      this.sprite.x = this.pos.x;
      this.sprite.y = this.pos.y;
    }
    if (this.collider != null) {
      this.collider.setPos(this.pos.x, this.pos.y);
    }
    if (
      this.pos.x < -32 ||
      this.pos.x > 288 ||
      this.pos.y < -32 ||
      this.pos.y > 288
    ) {
      this.remove();
    }
  }

  remove() {
    if (!this.isAlive) {
      return;
    }
    this.isAlive = false;
    if (this.sprite != null) {
      screen.removeChild(this.sprite);
    }
  }
}

class Turret extends Actor {
  async init() {
    this.pos = { x: 128, y: 240 };
    this.name = "Turret";
    const images = await pag.generateImagesPromise("凸");
    this.setImage(images[0], "Turret");
  }

  update() {
    const speed = 3;
    let cx = Math.max(8, Math.min(248, pointer.pos.x));
    let o = cx - this.pos.x;
    if (Math.abs(o) < speed) {
      this.pos.x = cx;
    } else if (o > 0) {
      this.pos.x += speed;
    } else {
      this.pos.x -= speed;
    }
    if (getActors("Shot").length <= 0) {
      sss.play("s_s", 2, 60, null, 0.5);
      new Shot().init();
    }
    super.update();
  }

  destroy() {
    emitParticle(`e_Turret`, this.pos.x, this.pos.y, 0, {
      sizeScale: 2,
      countScale: 2
    });
    this.remove();
    getActors("Shot").forEach(a => {
      a.remove();
    });
    sss.playJingle("_end", true);
    beginTitle();
  }
}

let shotSpeed = 7;

class Shot extends Actor {
  images;

  async init() {
    this.pos = { x: turret.pos.x, y: turret.pos.y };
    this.name = "Shot";
    this.images = await pag.generateImagesPromise("][", {
      letterWidthRatio: 0.4
    });
  }

  update() {
    if (this.images != null) {
      this.setImage(this.images[0], "Shot");
      this.images = null;
    }
    this.pos.y -= shotSpeed;
    super.update();
    getActors("Vader").forEach((v: Vader) => {
      if (testCollide(this, v)) {
        sss.play("e_vd");
        v.destroy();
        this.remove();
      }
    });
    getActors("Bullet").forEach((b: Bullet) => {
      if (testCollide(this, b)) {
        sss.play("h_b");
        b.destroy();
        this.remove();
      }
    });
    getActors("Ufo").forEach((u: Ufo) => {
      if (testCollide(this, u)) {
        sss.playJingle("_ufo", true);
        u.destroy();
        this.remove();
      }
    });
  }
}

const vaderLetters = ["興", "呉", "只"];
const vaderXCount = 7;
const vaderYCount = 3;
let vaders: Vader[] = [];
let vaderIndex = -1;
let vaderMinX, vaderMaxX;
let vaderVel = { x: vaderSpeed, y: 0 };

function initVaders() {
  vaders = [];
  range(vaderYCount).forEach(y =>
    range(vaderXCount).forEach(x => {
      new Vader().init(x, y);
    })
  );
  vaderIndex = -1;
  vaderVel = { x: vaderSpeed, y: 0 };
}

function updateVaders() {
  vaderIndex++;
  while (vaderIndex < vaders.length && !vaders[vaderIndex].isAlive) {
    vaderIndex++;
  }
  if (vaderIndex >= vaders.length) {
    vaderVel.y = 0;
    if (vaderVel.x > 0 && vaderMaxX > 244) {
      vaderVel.y = 14;
      vaderVel.x = -vaderSpeed;
    }
    if (vaderVel.x < 0 && vaderMinX < 12) {
      vaderVel.y = 14;
      vaderVel.x = vaderSpeed;
    }
    vaderIndex = -1;
  }
  vaderMaxX = 0;
  vaderMinX = 256;
}

class Vader extends Actor {
  index;
  imageAnims;
  animIndex = 0;
  imageName;

  async init(lx, ly) {
    this.pos = { x: lx * 20 + 20, y: 120 - ly * 30 };
    this.name = "Vader";
    this.index = vaders.length;
    vaders.push(this);
    this.imageAnims = await Promise.all(
      range(2).map(i =>
        pag.generateImagesPromise(vaderLetters[ly], {
          isReverseX: i == 1
        })
      )
    );
    this.imageAnims = this.imageAnims.map(img => img[0]);
    this.imageName = `Vader${vaderLetters[ly]}`;
  }

  update() {
    if (vaderIndex === this.index) {
      if (vaderVel.y > 0) {
        this.pos.y += vaderVel.y;
      } else {
        this.pos.x += vaderVel.x;
      }
      this.animIndex++;
      const ai = this.animIndex % 2;
      if (this.imageAnims != null) {
        this.setImage(this.imageAnims[ai], `${this.imageName}_${ai}`);
      }
    }
    if (this.pos.x < vaderMinX) {
      vaderMinX = this.pos.x;
    }
    if (this.pos.x > vaderMaxX) {
      vaderMaxX = this.pos.x;
    }
    const vyi = Math.floor(this.index / vaderXCount);
    if (Math.random() * ((2 - vyi) * 60 + 30) * vaderShotFreq < 1) {
      const di = this.index - vaderXCount;
      if (di < 0 || !vaders[di].isAlive) {
        new Bullet().init(this.pos);
      }
    }
    if (this.pos.y > 240) {
      turret.destroy();
    }
    super.update();
  }

  destroy() {
    emitParticle(`e_${this.imageName}`, this.pos.x, this.pos.y);
    const vyi = Math.floor(this.index / vaderXCount);
    score += (vyi + 1) * 10;
    this.remove();
  }
}

class Bullet extends Actor {
  imageAnims;
  animIndex = 0;
  imageName;

  async init(p) {
    this.pos = { x: p.x, y: p.y + 16 };
    this.name = "Bullet";
    this.imageAnims = await Promise.all(
      range(2).map(i =>
        pag.generateImagesPromise("｛", {
          isReverseX: i == 1
        })
      )
    );
    this.imageAnims = this.imageAnims.map(img => img[0]);
    this.imageName = "Bullet";
  }

  update() {
    this.pos.y += bulletSpeed;
    if (ticks % 5 === 0) {
      this.animIndex++;
      const ai = this.animIndex % 2;
      if (this.imageAnims != null) {
        this.setImage(this.imageAnims[ai], `${this.imageName}_${ai}`);
      }
    }
    if (this.pos.y > 272) {
      this.remove();
    }
    super.update();
    if (testCollide(turret, this)) {
      turret.destroy();
    }
  }

  destroy() {
    multiplier++;
    emitParticle(`s_${this.imageName}`, this.pos.x, this.pos.y);
    this.remove();
  }
}

let ufoSpeed = 1;

class Ufo extends Actor {
  images;

  async init() {
    this.pos = { x: -16, y: 32 };
    this.name = "Ufo";
    this.images = await pag.generateImagesPromise("皿");
  }

  update() {
    if (this.images != null) {
      this.setImage(this.images[0], "Ufo");
      this.images = null;
    }
    this.pos.x += ufoSpeed;
    super.update();
  }

  destroy() {
    emitParticle(`e_ufo`, this.pos.x, this.pos.y);
    ufoScoreText.text = `100x${multiplier}`;
    ufoScoreText.x = this.pos.x;
    ufoScoreText.y = this.pos.y;
    ufoScoreText.visible = true;
    ufoScoreTicks = 100;
    score += 100 * multiplier;
    this.remove();
  }
}

let particles: Particle[] = [];
let particleContainer: PIXI.particles.ParticleContainer;
let particleTexture: PIXI.Texture;
const particleBaseSize = 16;

function initParticle(parent: PIXI.Container, padding) {
  particleContainer = new PIXI.particles.ParticleContainer(
    1000,
    {
      scale: true,
      position: true,
      alpha: true
    },
    1000
  );
  particleContainer.x = particleContainer.y = padding;
  parent.addChild(particleContainer);
  const g = new PIXI.Graphics();
  g.beginFill(0xffffff);
  g.drawRect(0, 0, particleBaseSize, particleBaseSize);
  g.endFill();
  particleTexture = app.renderer.generateTexture(g);
}

function emitParticle(
  patternName: string,
  x: number,
  y: number,
  angle = 0,
  emitOptions: ppe.EmitOptions = {}
) {
  ppe.emit(patternName, x, y, angle, emitOptions).forEach(p => {
    particles.push(new Particle(p));
  });
}

function updateParticles() {
  ppe.update();
  for (let i = 0; i < particles.length; ) {
    if (particles[i].update() === false) {
      particles.splice(i, 1);
    } else {
      i++;
    }
  }
}

function removeParticles() {
  particles.forEach(p => {
    p.remove();
  });
  particles = [];
}

class Particle {
  pos = { x: 0, y: 0 };
  sprite: PIXI.Sprite;
  baseSize = 16;
  scale = new PIXI.Point();

  constructor(public ppeParticle: ppe.Particle) {
    this.sprite = new PIXI.Sprite(particleTexture);
    this.sprite.anchor.x = this.sprite.anchor.y = 0.5;
    this.sprite.scale = this.scale;
    particleContainer.addChild(this.sprite);
  }

  update() {
    if (!this.ppeParticle.isAlive) {
      this.remove();
      return false;
    }
    const p = this.ppeParticle;
    this.sprite.x = p.pos.x;
    this.sprite.y = p.pos.y;
    this.sprite.tint =
      (Math.floor(p.color.r * 255) << 16) |
      (Math.floor(p.color.g * 255) << 8) |
      Math.floor(p.color.b * 255);
    this.scale.x = this.scale.y = p.size / this.baseSize;
    this.sprite.scale = this.scale;
  }

  remove() {
    particleContainer.removeChild(this.sprite);
  }
}

function onSeedChanged(seed: number) {
  textures = {};
  pag.setSeed(seed);
  removeParticles();
  ppe.reset();
  ppe.setSeed(seed);
  sss.reset();
  sss.setSeed(seed);
  if (isInGame) {
    sss.playBgm();
  }
}

function range(to: number) {
  return [...Array(to).keys()];
}

function testCollide(a1: Actor, a2: Actor) {
  if (a1.collider == null || a2.collider == null) {
    return false;
  }
  return a1.collider.test(a2.collider);
}

function initScreen(size, padding, backgroundColor, edgeColor) {
  const appSize = size + padding * 2;
  app = new PIXI.Application({ width: appSize, height: appSize });
  app.view.setAttribute("id", "screen");
  document.body.appendChild(app.view);
  const filterContainer = new PIXI.Container();
  filterContainer.filterArea = new PIXI.Rectangle(0, 0, appSize, appSize);
  app.stage.addChild(filterContainer);
  const bloomFilter = new PIXIFilters.AdvancedBloomFilter({
    threshold: 0.1,
    bloomScale: 1,
    brightness: 1,
    blur: 5
  });
  filterContainer.filters = [bloomFilter];
  const backgroundContainer = new PIXI.Container();
  const background = new PIXI.Graphics();
  background.beginFill(backgroundColor);
  background.drawRect(padding, padding, size, size);
  background.endFill();
  backgroundContainer.addChild(background);
  filterContainer.addChild(backgroundContainer);
  initParticle(filterContainer, padding);
  screen = new PIXI.Container();
  screen.x = screen.y = padding;
  filterContainer.addChild(screen);
  const edgeContainer = new PIXI.Container();
  const edge = new PIXI.Graphics();
  edge.beginFill(edgeColor);
  edge.drawRect(0, 0, padding, appSize);
  edge.drawRect(appSize - padding, 0, padding, appSize);
  edge.drawRect(0, 0, appSize, padding);
  edge.drawRect(0, appSize - padding, appSize, padding);
  edge.endFill();
  edgeContainer.addChild(edge);
  filterContainer.addChild(edgeContainer);
}

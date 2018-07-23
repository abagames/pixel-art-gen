export default class Collider {
  public anchor = { x: 0, y: 0 };
  private pos = { x: 0, y: 0 };
  private size = { x: 0, y: 0 };
  private pixelBits: number[][] = [];

  constructor(image: HTMLImageElement) {
    this.size.x = image.width;
    this.size.y = image.height;
    const canvas = document.createElement("canvas");
    canvas.width = this.size.x;
    canvas.height = this.size.y;
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);
    const pixelData = context.getImageData(0, 0, this.size.x, this.size.y).data;
    let pdIndex = 0;
    for (let y = 0; y < this.size.y; y++) {
      let bits = [];
      let bit = 0;
      let nextBit = (1 << 31) >>> 0;
      for (let x = 0; x < this.size.x; x++) {
        const rgb =
          pixelData[pdIndex] + pixelData[pdIndex + 1] + pixelData[pdIndex + 2];
        const alpha = pixelData[pdIndex + 3];
        if (rgb > 0 && alpha > 0) {
          bit |= nextBit;
        }
        nextBit >>>= 1;
        if (nextBit <= 0) {
          bits.push(bit);
          nextBit = (1 << 31) >>> 0;
          bit = 0;
        }
        pdIndex += 4;
      }
      if (nextBit < (1 << 31) >>> 0) {
        bits.push(bit);
      }
      this.pixelBits.push(bits);
    }
  }

  setPos(x: number, y: number) {
    this.pos.x = Math.floor(x - this.size.x * this.anchor.x);
    this.pos.y = Math.floor(y - this.size.y * this.anchor.y);
  }

  test(other: Collider) {
    const offset = { x: other.pos.x - this.pos.x, y: other.pos.y - this.pos.y };
    if (
      offset.x < -other.size.x ||
      offset.x > this.size.x ||
      offset.y < -other.size.y ||
      offset.y > this.size.y
    ) {
      return false;
    }
    const sx = offset.x > 0 ? offset.x : 0;
    const sy = offset.y > 0 ? offset.y : 0;
    const sox = offset.x > 0 ? 0 : -offset.x;
    const soy = offset.y > 0 ? 0 : -offset.y;
    for (let y = sy, oy = soy; y < this.size.y; y++, oy++) {
      if (oy >= other.size.y) {
        break;
      }
      for (let x = sx, ox = sox; x < this.size.x; x += 32, ox += 32) {
        if (ox >= other.size.x) {
          break;
        }
        let tb = createBit(this.pixelBits[y], x);
        let ob = createBit(other.pixelBits[oy], ox);
        if ((tb & ob) > 0) {
          return true;
        }
      }
    }
    return false;
  }
}

function createBit(bits: number[], x) {
  const xm = x % 32;
  const xi = Math.floor(x / 32);
  if (xm === 0) {
    return getBit(bits, xi);
  }
  return (
    ((getBit(bits, xi) << xm) >>> 0) | (getBit(bits, xi + 1) >>> (32 - xm))
  );
}

function getBit(bits: number[], i) {
  return i < 0 || i >= bits.length ? 0 : bits[i];
}

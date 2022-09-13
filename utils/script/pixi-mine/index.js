import * as PIXIORI from "@tbminiapp/pixi-miniprogram-engine";

export const PIXI = PIXIORI

const systemInfo = my.getSystemInfoSync();
const ratio = 750 / systemInfo.windowWidth
console.log(ratio)

export class Container extends PIXI.Container {
  constructor() {
    super()
  }
  size(w, h) {
    this.width = w / ratio
    this.height = h / ratio
  }
}
export class Sprite extends PIXI.Sprite {
  constructor(testTexture) {
    super(testTexture)
  }
  size(w, h) {
    this._width = w / ratio
    this._height = h / ratio
    this.height = h / ratio
    console.log(this.width, this.height)
  }
}
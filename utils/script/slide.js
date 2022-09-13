import PIXI from "../pixi/pixi"

class RjlxPixiSlide {
  constructor() {
    this._width = 0
    this._height = 0
    this._childWidth = 0
    this._childHeight = 0
    this.container = new PIXI.Container()
    this.container.interactive = true
    this.container.on('touchstart', this.slideTouchStart)
    this.container.on('touchmove', this.slideTouchMove)
    this.container.on('touchend', this.slideTouchEnd)
  }
  get width() {
    this.container.width = this._width
    return this._width
  }
  set width(val) {
    this.container.width = val
    this._width = val
  }
  get height() {
    this.container.width = this._height
    return this._height
  }
  set height(val) {
    this.container.width = val
    this._height = val
  }
  static slideList = new PIXI.Container()
  setItem(val) {
    const itemList = val.map((item, idx) => {
      const slideItem = new PIXI.Sprite(item.url)
      slideItem.width = this._childWidth
      slideItem.height = this._childHeight
      slideItem.y = 0
      slideItem.x = idx * slideItem.width
      return slideItem
    });
    this.slideList.addChild(...itemList)
    this.container.addChild(this.slideList)
  }
  setItemSize(w, h) {
    this._childWidth = w
    this._childHeight = h
  }
  // 滑动组件的鼠标触摸开始事件
  slideTouchStart() {
    
  }
  slideTouchMove() {

  }
  slideTouchEnd() {

  }
}

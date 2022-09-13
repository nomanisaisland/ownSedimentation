const stage = {
  width: 0,
  height: 0,
  size(w, h) {
    this.width = w
    this.height = h
  },
  scaleMode: "fixedwidth",
  alignV: "top",
  alignH: "left",
  startScene: "",
  sceneRoot: "",
  debug: false,
  stat: false,
  physicsDebug: false,
  exportSceneToJson: false,
  ctx: null,
  init(id) {
    this.ctx = my.createCanvasContext(id);
  },
  addChildren() {
    this.ctx.draw()
  }
}

class EventDispatcher {
  constructor() {
  }
}
class Node extends EventDispatcher {
  constructor() {
    super()
  }

  // [只读]是否已经销毁。对象销毁后不能再使用。
  get destroyed() {
    return false
  }

  // 名称节点
  name = null

  // 获取自身是否激活
  get active() {
    return false
  }
  // 设置是否激活
  set active(val) {
    this.active = val
  }

  // 父节点。
  get parent() {
    return false
  }
  set parent(value) {
    this.parent = value
  }
  // 批量增加子节点
  addChildren() {

  }

  // 销毁此对象。destroy对象默认会把自己从父节点移除，并且清理自身引用关系，等待js自动垃圾回收机制回收。destroy后不能再使用。
  // destroy时会移除自身的事情监听，自身的timer监听，移除子对象及从父节点移除自己。
  //   Parameters
  //      Default value destroyChild: boolean = true
  //    （可选）是否同时销毁子节点，若值为true,则销毁子节点，否则不销毁子节点。
  destroy(node) {

  }
  // 销毁所有子对象，不销毁自己本身
  destroyChildren() {

  }
  // 增加事件侦听器，以使侦听器能够接收事件通知。
  // 如果侦听鼠标事件，则会自动设置自己和父亲节点的属性 mouseEnabled 的值为 true(如果父节点mouseEnabled=false，则停止设置父节点mouseEnabled属性)。
  on(type, callback) {

  }
  // 删除对应的子节点
  removeChild(node) { }
}

class Sprite extends Node {
  constructor() {
    super()
  }
  // 指定是否自动计算宽高数据。默认值为 false 。
  // Sprite宽高默认为0，并且不会随着绘制内容的变化而变化，如果想根据绘制内容获取宽高，可以设置本属性为true，或者通过getBounds方法获取。设置为true，对性能有一定影响。
  autoSize = false
  //   鼠标事件与此对象的碰撞检测是否可穿透。碰撞检测发生在鼠标事件的捕获阶段，此阶段引擎会从stage开始递归检测stage及其子对象，直到找到命中的目标对象或者未命中任何对象。

  //   穿透表示鼠标事件发生的位置处于本对象绘图区域内时，才算命中，而与对象宽高和值为Rectangle对象的hitArea属性无关。如果sprite.hitArea值是HitArea对象，表示显式声明了此对象的鼠标事件响应区域，而忽略对象的宽高、mouseThrough属性。

  //   影响对象鼠标事件响应区域的属性为：width、height、hitArea，优先级顺序为：hitArea(type: HitArea)> hitArea(type: Rectangle) > width / height。

  // default
  // false 不可穿透，此对象的鼠标响应区域由width、height、hitArea属性决定。
  hitTestPrior = false

  get alpha() {
    return 1
  }

  set alpha(val) {
    this.alpha = val
  }

  get height() {
    return 0
  }
  set height(val) {
    this.height = val
  }

  get mask() {
    return false
  }
  set mask(val) {
    this.mask = val
  }

  get mouseX() {
    return false
  }
  get mouseY() {
    return false
  }

  get pivotX() {
    return 0
  }
  set pivotX(val) {
    this.pivotX = val
  }
  get pivotY() {
    return 0
  }
  set pivotY(val) {
    this.pivotY = val
  }

  get rotation() {
    return 0
  }
  set rotation(val) {
    this.rotation = val
  }

  get scaleX() {
    return 1
  }
  set scaleX(val) {
    this.scaleX = val
  }
  get scaleY() {
    return 1
  }
  set scaleY(val) {
    this.scaleY = val
  }
  get scrollRect() {
    return false
  }
  set scrollRect(val) {
    this.scrollRect = val
  }
  get skewX() {
    return 1
  }
  set skewX(val) {
    this.skewX = val
  }
  get skewY() {
    return 1
  }
  set skewY(val) {
    this.skewY = val
  }
  get visible() {
    return 1
  }
  set visible(val) {
    this.visible = val
  }

  get width() {
    return 0
  }
  set width(val) {
    if (this.width !== val) {
      this.width = val
    } else {
      return true
    }
  }
  get x() {
    return 0
  }
  set x(val) {
    this.x = val
  }
  get y() {
    return 0
  }
  set y(val) {
    this.y = val
  }
  get zOrder() {
    return 0
  }
  set zOrder(val) {
    this.zOrder = val
  }
}

class Stage extends Sprite {
  constructor() {
    super()
  }
  loadImage(img) {
    stage.ctx.drawImage(img, this.x, this.y, this.width, this.height)
  }
  addChildren() {

  }
}

class Text extends Sprite {
  constructor() {
    super()
  }
}



export default {
  stage,
  EventDispatcher,
  Node,
  Sprite,
  Stage,
  Text
}

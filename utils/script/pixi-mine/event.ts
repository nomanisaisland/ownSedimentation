import { throttle, debounce } from "../debounce"
interface stage {
  on: (eventName: String, fn: Function) => {}
}
interface app {
  stage: stage
}
interface systemInfo {
  platform: String
}
// 只针对矩形
export default class EventListener {
  eventBus: Array<Object>
  idx: number
  app: app
  self: Object
  systemInfo: systemInfo
  constructor(app, self) {
    this.eventBus = []
    this.idx = 0
    app.stage.interactive = true
    this.app = app
    this.self = self
    // this.systemInfo = my.getSystemInfoSync();
  }
  add(sprite, event, fn, context) {
    sprite.interactive = true
    // 写好定位
    this.idx++
    // 唯一标志符
    const random = `${Date.now()}${Math.floor(Math.random() * 1000)}`
    // 拼接事件属性
    const spriteEvent = {
      id: random,
      idx: this.idx,
      touch: true,
      sprite,
      eventName: event
    }
    // 获得真实的位置信息
    const realPos = this.getRealPos(sprite.parent, {
      x: sprite.x,
      y: sprite.y
    })
    const realRange = {
      x: realPos.x,
      y: realPos.y,
      x2: realPos.x + sprite.width,
      y2: realPos.y + sprite.height
    }
    // 收集事件
    this.eventBus.push(spriteEvent)
    switch (event) {
      case 'tap':
        // this.tap(sprite, fn, realRange, context)
        break
      case 'longTap':
        this.longTap(sprite, fn, realRange, context)
        break
      case 'scroll':
        this.scroll(sprite, fn, realRange, context)
        break
      case 'touchstart':
        break
      case 'touchmove':
        break
      case 'touchend':
        break
      case 'touchout':
        break
      // case 'multiFinger':
      //     this.multiFinger(sprite, fn, realRange, context)
      //     break
      default:
        break
    }
  }
  getRealPos(parent, size) {
    if (!parent) {
      return size
    }
    const realSize = {
      x: size.x + parent.x,
      y: size.y + parent.y
    }
    if (!parent.parent) {
      return realSize
    } else {
      return this.getRealPos(parent.parent, realSize)
    }
  }
  longTap(sprite, fn, realRange, context) {
    // 长按计时
    let timer = null
    let moveStart = false
    let touchStartTimeStamp = 0
    let moveNum = 0
    let startNum = 0
    // 控制内部事件运行
    // sprite.on(event, fn, context)
    // touchstart可以监听到结束的事件类型
    sprite.on("touchstart", (e) => {
      startNum++
      touchStartTimeStamp = Date.now()
      // clearTimeout(timer)
      // 长按3秒触发事件
      timer = setTimeout(() => {
        fn(e, "longTap")
        moveStart = true
        clearTimeout(timer)
      }, 1200)
    })
    // touchmove 底层是tap
    sprite.on("touchmove", (e) => {
      moveNum++
      const stopStamp = Date.now() - touchStartTimeStamp
      if (stopStamp > 800 && touchStartTimeStamp !== 0 && moveNum > 50) {
        moveNum = 0
        startNum = 0
        touchStartTimeStamp = 0
        clearTimeout(timer)
      }
      if (!moveStart) return
      fn(e, "touchmove")
    })
    this.app.stage.on("touchend", (e) => {
      moveNum = 0
      startNum = 0
      touchStartTimeStamp = 0
      if (!!timer) {
        clearTimeout(timer)
      }
      timer = null
      if (!moveStart) return
      fn(e, "touchend")
      moveStart = false

    })
    // touchend 底层是tap，只会在精灵范围内放开才能触发，即使移出去再进来也可以
    // sprite.on("touchend", (e) => {
    //   if (eventState === false) return
    //   clearTimeout(timer)
    //   fn(e, "touchend")
    //   timer = null
    //   eventState = false

    // })
    // // touchendoutside 底层是touchend，只会在精灵范围外放开才能触发，即使移进来再出去也可以
    // sprite.on("touchendoutside", (e) => {
    //   if (eventState === false) return
    //   clearTimeout(timer)
    //   timer = null
    //   eventState = false
    //   fn(e, "touchend")
    // })

  }
  scroll(sprite, fn, realRange, context) {
    let eventState = true
    let mutilFingerState
    // 默认初始化数据
    let options = {
      finger1X: 0, // 手指1的X坐标
      finger1Y: 0, // 手指1的Y坐标
      finger2X: 0, // 手指2的X坐标
      finger2Y: 0, // 手指2的Y坐标
      pageX: 0, // 记录上次移动的位置
      pageY: 0, // 记录上次移动的位置
      startX: 0, // 记录start触发时的位置
      startY: 0, // 记录start触发时的位置
      offsetX: 0, // 记录移动的位置
      offsetY: 0, // 记录移动的位置
      lastFingerSpace: 0, // 上一次手指的距离
      originFigerSpace: null,
      desc: "nofinger",
      type: "init",
      scale: 1,
      pageCenterX: 0,
      pageCenterY: 0
    }
    this.app.stage.on("touchstart", (e) => {
      const {
        global,
        originalEvent
      } = e.data
      const {
        touches,
        changedTouches
      } = originalEvent
      if (!options.pageX && !options.pageY) {
        // touches[0].pageX 小程序和小部件返回值不同
        options.pageX = touches[0].x || touches[0].pageX
        options.pageY = touches[0].y || touches[0].pageY
        return
      }
    })
    // touchmove 底层是tap
    this.app.stage.on("touchmove", (e) => {
      const {
        global,
        originalEvent
      } = e.data
      const {
        touches,
        changedTouches
      } = originalEvent

      delete options.finger1X
      delete options.finger1Y
      delete options.finger2X
      delete options.finger2Y
      if (!options.pageX && !options.pageY) {
        // touches[0].pageX 小程序和小部件返回值不同
        options.pageX = touches[0].x || touches[0].pageX
        options.pageY = touches[0].y || touches[0].pageY
        return
      }
      options.offsetX = (touches[0].x || touches[0].pageX) - options.pageX
      options.offsetY = (touches[0].y || touches[0].pageY) - options.pageY
      options.pageX = touches[0].x || touches[0].pageX
      options.pageY = touches[0].y || touches[0].pageY
      // if (!!options.offsetX && !!options.offsetY) {

      // }
      options.type = "translate"
      options.desc = "单指移动"
      fn(options)
      // TODO 如果两只手指放上去会产生一个很大的移动距离
      // 如果只有一个手指放在屏幕上的话
    }
      // }
    )
    // 绑在舞台上面更精准
    this.app.stage.on("touchend", (e) => {
      const {
        global,
        originalEvent
      } = e.data
      const {
        touches,
        changedTouches
      } = originalEvent
      // e.data.originalEvent.timeStamp

      if (touches.length == 0 && (mutilFingerState == 'twoFinger' || mutilFingerState == 'oneFinger')) mutilFingerState = 'init'
      if (this.systemInfo.platform == 'ios' || this.systemInfo.platform == 'IOS' || this.systemInfo.platform == 'iOS') {
        mutilFingerState = 'init'
      }
      // if (eventState === false) return
      // eventState = false
      // 清空手指的所有数据
      options.lastFingerSpace = 0
      options.finger1X = 0
      options.finger1Y = 0
      options.finger2X = 0
      options.finger2Y = 0
      options.pageX = 0
      options.pageY = 0
      options.originFigerSpace = 0
      options.desc = "nofinger"
      options.type = "init"
    })
    this.app.stage.on("touchendoutside", (e) => {
      const {
        global,
        originalEvent
      } = e.data
      const {
        touches,
        changedTouches
      } = originalEvent
      // e.data.originalEvent.timeStamp

      if (touches.length == 0 && (mutilFingerState == 'twoFinger' || mutilFingerState == 'oneFinger')) mutilFingerState = 'init'
      if (this.systemInfo.platform == 'ios' || this.systemInfo.platform == 'IOS' || this.systemInfo.platform == 'iOS') {
        mutilFingerState = 'init'
      }
      // if (eventState === false) return
      // eventState = false
      // 清空手指的所有数据
      options.lastFingerSpace = 0
      options.finger1X = 0
      options.finger1Y = 0
      options.finger2X = 0
      options.finger2Y = 0
      options.pageX = 0
      options.pageY = 0
      options.originFigerSpace = 0
      options.desc = "nofinger"
      options.type = "init"
    })
  }
}

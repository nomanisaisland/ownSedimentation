/*
 * @Author: lujiafeng
 * @Date: 2022-01-25 10:55:59
 * @LastEditTime: 2022-03-14 16:04:15
 * @LastEditors: lujiafeng
 * @Description: 动画
 * @FilePath: \utils\script\createAnimation\index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

// this.aaa= my.create({

// })


interface AnimationControl {
  // duration 动画持续时间
  duration?: number,
  // timeFunction 动画运动效果
  timeFunction?: string,
  // delay 动画延迟执行时间
  delay?: number,
  // transformOrigin 动画锚点位置
  transformOrigin?: string,
  // loop 是否循环 默认为false
  loop?: boolean
}


export class CreateAnimate {

  // 动画保存器
  private animationTank: Array<{
    owner?: string,
    name: string,
    val: string | number
  }>

  // 动画参数
  private options: AnimationControl

  // 实例化构造函数的时候可以传入参数
  constructor(options: AnimationControl) {
    if (options) {
      this.options = options

    } else {
      this.options = {
        transformOrigin: "top right",
        duration: 3000,
        timeFunction: "ease-in-out",
        delay: 100,
      }
    }
    this.animationTank = []
    this.animationStep = []
    this.index = 0
  }

  // 设置透明度
  opacity(param: number) {
    this.animationTank.push({
      name: "opacity",
      val: param
    })
    return this
  }

  // 设置背景颜色
  backgroundColor(param: number | string) {
    this.animationTank.push({
      name: "backgroundColor",
      val: param
    })
    return this
  }

  // 设置长度
  width(param: string) {
    this.animationTank.push({
      name: "width",
      val: param
    })
    return this
  }
  height(param: string) {
    this.animationTank.push({
      name: "height",
      val: param
    })
    return this
  }
  top(param: string) {
    this.animationTank.push({
      name: "top",
      val: param
    })
    return this
  }
  left(param: string) {
    this.animationTank.push({
      name: "left",
      val: param
    })
    return this
  }

  bottom(param: string) {
    this.animationTank.push({
      name: "bottom",
      val: param
    })
    return this
  }
  right(param: string) {
    this.animationTank.push({
      name: "right",
      val: param
    })
    return this
  }
  rotate(param: string) {
    this.animationTank.push({
      name: "rotate",
      val: param
    })
    return this
  }
  rotateX(param: string) {
    this.animationTank.push({
      owner: 'transform',
      name: 'rotate',
      val: param
    })
    return this
  }
  rotateY(param: string) {
    this.animationTank.push({
      name: "rotate",
      val: param
    })
    return this
  }
  rotateZ(param: string) {
    this.animationTank.push({
      name: "rotate",
      val: param
    })
    return this
  }
  rotate3d(param: string) {
    this.animationTank.push({
      name: "rotate",
      val: param
    })
    return this
  }
  scale(param: string) {
    this.animationTank.push({
      name: "rotate",
      val: param
    })
    return this
  }
  scaleX(param: string) {
    this.animationTank.push({
      name: "rotate",
      val: param
    })
    return this
  }
  scaleY(param: string) {
    this.animationTank.push({
      name: "rotate",
      val: param
    })
    return this
  }
  scaleZ(param: string) {
    this.animationTank.push({
      name: "rotate",
      val: param
    })
    return this
  }
  scale3d(param: string) {
    this.animationTank.push({
      name: "rotate",
      val: param
    })
    return this
  }
  translate(param: string) {
    this.animationTank.push({
      name: "rotate",
      val: param
    })
    return this
  }
  translateX(param: string) {
    this.animationTank.push({
      name: "rotate",
      val: param
    })
    return this
  }
  translateY(param: string) {
    this.animationTank.push({
      name: "rotate",
      val: param
    })
    return this
  }
  translateZ(param: string) {
    this.animationTank.push({
      name: "rotate",
      val: param
    })
    return this
  }
  translate3d(param: string) {
    this.animationTank.push({
      name: "rotate",
      val: param
    })
    return this
  }
  skew(param: string) {
    this.animationTank.push({
      name: "rotate",
      val: param
    })
    return this
  }
  skewX(param: string) {
    this.animationTank.push({
      name: "rotate",
      val: param
    })
    return this
  }
  skewY(param: string) {
    this.animationTank.push({
      name: "rotate",
      val: param
    })
    return this
  }
  matrix(param: string) {
    this.animationTank.push({
      name: "rotate",
      val: param
    })
    return this
  }
  matrix3d(param: string) {
    this.animationTank.push({
      name: "rotate",
      val: param
    })
    return this
  }

  private animationStep
  private index
  // 动画步骤
  step() {
    // 将数据深拷贝下来
    const stepOptions = [...this.animationTank]
    // 将原数组清空
    this.animationTank = []
    let attr = {}
    // 将一个动画的属性转变为样式
    stepOptions.forEach(item => {
      if (item.owner) {
        attr[item.owner] = `${item.name}('${item.val}')`
      } else {
        attr[item.name] = `${item.val}`
      }
    })
    this.animationStep.push({
      num: this.index,
      attribute: attr
    })
  }
  // 拼装所有用户期望样式
  export(config: AnimationControl) {
    let animationConfig = config ? config : this.options
    // 将用户传入的参数处理成分段动画，并且导出样式
    // this.animationStep()
    // this.ticker(() => {
    //   console.log(11111111)
    // }, config)

    this.animationStep.forEach(item => {
      console.log(item)
      // item.attribute[]
    })
    return this.animationStep[0].attribute
  }
  ticker(fn, config: AnimationControl) {
    const ticker = setTimeout(() => {
      fn()
      if (config?.loop) {
        this.ticker(fn, config)
      }
      clearTimeout(ticker)
    }, config?.duration ? config?.duration : 1000)
  }
}
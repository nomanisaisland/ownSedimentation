/*
 * @Author: 卢加锋
 * @Date: 2021-11-12 15:12:42
 * @LastEditTime: 2021-11-25 17:32:13
 * @LastEditors: Please set LastEditors
 * @Description: 入口函数
 * @FilePath: \gameVDom\gameVDom\index.js
 */
import {
    initMixin
} from './init/index'
import {
    stateMixin
} from './state/index'

import {
    renderMixin
} from './render/index'

/**
 * 创建入口实例
 * 
 * 
 */
// const test = new PIXI.Container()
// const aaa = new PIXI.Sprite.from("https://img.alicdn.com/imgextra/i4/3377521498/O1CN01eJdMJY1Mw81KJCPMs_!!3377521498.png")
// app.stage.addChild(test)
// test.addChild(aaa)

function RjlxGame(options) {
    this._init(options)
}

// 设想从编译到渲染到画布上有四个步骤

// 1. 将模版处理为AST
initMixin(RjlxGame)
// 2. 处理好所有的状态（模版和响应式的数据对应上）
stateMixin(RjlxGame)

// 3. 准备好所有函数
// eventMixin()

// 4. 准备生命周期


// 5. 渲染到页面上
renderMixin(RjlxGame)
export default RjlxGame
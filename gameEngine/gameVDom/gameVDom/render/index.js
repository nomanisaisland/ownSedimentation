/*
 * @Author: 卢加锋
 * @Date: 2021-11-25 17:31:17
 * @LastEditTime: 2021-11-25 17:47:50
 * @LastEditors: Please set LastEditors
 * @Description: 将准备好的数据渲染到页面上
 * @FilePath: \gameVDom\gameVDom\render\index.js
 */

export function initRender(vm) {
  const parentNode = vm.$el
  const childNode = (vm.vNode || {}).node
  if (!parentNode) {
    throw new Error(`can not find canvas stage,please check "el" value`)
  }
  if (childNode) {
    parentNode.addChild(childNode)
  }
}

export function renderMixin(RjlxGame) {
  RjlxGame.prototype._render = function () {
    const vm = this
  }
}
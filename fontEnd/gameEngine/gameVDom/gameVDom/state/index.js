/*
 * @Author: 卢加锋
 * @Date: 2021-11-25 16:20:46
 * @LastEditTime: 2021-11-25 17:28:37
 * @LastEditors: Please set LastEditors
 * @Description: 初始化所有状态，初步绑定部分数据
 * @FilePath: \gameVDom\gameVDom\state\index.js
 */
import {
  isPlainObject,
  hasOwn
} from '../utils'
export function initState(vm) {
  if (initData) initData(vm)

  if (initMethods) initMethods(vm)
}
// 数据只能是对象，先做简单处理，不能是函数
function initData(vm) {
  const data = vm.$options.data
  const methods = vm.$options.methods
  const props = vm.$options.props

  if (!isPlainObject(data)) {
    throw new Error("data must be an object")
  }
  const keys = Object.keys(data)
  let i = keys.length
  while (i--) {
    const key = keys[i]
    if (methods && hasOwn(methods, key)) {
      throw new Error(`Method "${key}" has already been defined as a data property.`)
    }
    if (props && hasOwn(props, key)) {
      throw new Error(`Method "${key}" has already been defined as a data property.`)
    }
    vm[key] = data[key]
  }
}

function initMethods(vm) {
  const methods = vm.$options.methods
  const keys = Object.keys(methods)
  let i = keys.length
  while(i--){
    const key = keys[i]
    vm[key] = methods[key]
  }
}

export function stateMixin(RjlxGame) {
  RjlxGame.prototype.$watch = function () {

    console.log(11111111111111)
  }
}
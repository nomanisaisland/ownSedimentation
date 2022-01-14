/*
 * @Author: your name
 * @Date: 2021-11-25 15:06:15
 * @LastEditTime: 2021-11-25 15:21:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \gameVDom\gameVDom\observe.js
 */
export class Observe {
  constructor() {

  }
}


export function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() { // 获取当前属性的时候触发
      
    },
    set() { // 更改当前属性的时候触发
      
    }
  })
}
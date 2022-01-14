/*
 * @Author: your name
 * @Date: 2021-11-25 11:10:27
 * @LastEditTime: 2021-11-25 17:00:21
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE's
 * @FilePath: \gameVDom\gameVDom\utils.js
 */
export const attrName = ['style', 'loadImage']

export const splitString = (target,rule) => {
  return target.split(rule)
}

export function deepClone(obj) {
  if (Array.isArray(obj)) {
    return [...obj]
  } else if (Object.prototype.toString.call(obj) == '[object Object]') {
    return {
      ...obj
    }
  } else {
    throw new Error("type is wrong,place put in object or array!")
  }
}

const _toString = Object.prototype.toString

export function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]'
}


const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}
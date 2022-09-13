/*
 * @Author: lujiafeng
 * @Date: 2022-01-14 11:23:20
 * @LastEditTime: 2022-03-14 16:13:21
 * @LastEditors: lujiafeng
 * @Description: 数据操作
 * @FilePath: \utils\script\dataType\dataManipulation.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

// 序列化反序列化一个对象
export function strParse(obj: object): object {
  return objParse(objStr(obj))
}

// 序列化一个对象
export function objStr(obj: object): string {
  return JSON.stringify(obj)
}

//反序列化一个对象
export function objParse(str: string): object {
  return JSON.parse(str)
}


/**
 * 数组去重
 * @param {array} array
 * @return {array} array
 */
export function unique<T>(array: Array<T>): Array<T> {
  var obj = {};
  return array.filter(function (item, index, array) {
    return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
  })
}

/**
 * 数组分组
 * @param {Array} list 原数组
 * @param {func} fn 分组的依据
 * @return {Array} 分组后的数组
 */
export function groupBy(list: [], fn): [][] {
  let groups = []

  list.forEach(o => {
    // 只支持单个参数回传
    const group = JSON.stringify(fn(o))
    groups[group] = groups[group] || []
    groups[group].push(o)
  })
  return Object.keys(groups).map(function (group) {
    return groups[group]
  })
}

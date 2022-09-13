/**
 * @Author: lujiafeng
 * @Date: 2021-12-24 14:14:42
 * @LastEditTime: 2022-01-11 20:06:45
 * @LastEditors: lujiafeng
 * @Description: 
 * @FilePath: \rjlx\rjlx.tbwp.angpaohuahu\costom\widget\utils\time.js
 * @可以输入预定的版权声明、个性签名、空行等
 */
// 获取倒计时
function timeDownUp(time: number, nowTime: number): number {
  const leftTime = (time - nowTime) / 1000 / 60 / 60 / 24;
  if (leftTime < 0) {
    return 0
  } else {
    return leftTime
  }
}

/**
 * @description 将2022-01-10 00:00:00 处理成 2022/01/10 00:00:00
 * @param time 时间或者时间戳
 * @returns string
 */
function timeConversion(time: Date | number): string {
  const date = new Date(time);
  const year = date.getFullYear();
  const monthNum = date.getMonth() + 1;
  const dayNum = date.getDate();
  const monthStr = handleSingular(monthNum);
  const dayStr = handleSingular(dayNum);
  return year + "-" + monthStr + "-" + dayStr;
}

/**
 * @description 将2022-01-10 00:00:00 处理成 2022/01/10 00:00:00
 * @param time 时间或者时间戳
 * @param addTime 在time的基础上加多少时间
 * @returns string  2022-01-10 00:00:00
 */
function timeConversionOnly(time: Date | number, addTime: number): string {
  const timeStamp = new Date(time).getTime() + addTime;
  const timeLocal = new Date(timeStamp)
  const year = timeLocal.getFullYear();
  const month = handleSingular(timeLocal.getMonth() + 1);
  const day = handleSingular(timeLocal.getDate());
  const hour = handleSingular(timeLocal.getHours());
  const minute = handleSingular(timeLocal.getMinutes());
  const second = handleSingular(timeLocal.getSeconds())
  return year + "-" + month + "-" + day + ' ' + hour + ':' + minute + ':' + second;
}

// 处理大于零小于十的数
function handleSingular(param: number): string {
  if (param < 10) {
    return '0' + param.toString()
  } else {
    return String(param)
  }
}

/*
 * @Number
 * @Number
 */
function addZero(num: number): string {
  if (num < 10) {
    return '0' + num
  }
  return `${num}`
}
function showtime(nowTime: number, endTime: number): Array<string> {
  let leftTime = Math.floor((endTime - nowTime) / 1000)
  if (leftTime <= 0) leftTime = 0
  let d = Math.floor(leftTime / (24 * 60 * 60))
  let h = Math.floor((leftTime / (60 * 60)) % 24)
  let m = Math.floor((leftTime / 60) % 60)
  let s = Math.floor(leftTime % 60)
  let arr = []
  arr.push(addZero(d), ':', addZero(h), ':', addZero(m), ':', addZero(s))
  return arr
}


export { timeDownUp, timeConversion, handleSingular, timeConversionOnly, showtime }
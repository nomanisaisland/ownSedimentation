const { RandomUtil } = require("rjlx.base/value/RandomUtil");
import { SimpleIoc } from "rjlx.base/pack/SimpleIoc";
import { UsessionService } from "rjlx.base/albb/rjtbmpsv/client/UsessionService";
import cloud from "@tbmp/mp-cloud-sdk"

export const cloudFunctionInvoke = async (funName, data = {}, cloudName = "cloudData") => {
  const usessionService = SimpleIoc.resolve(UsessionService)
  const usessionImfo = await usessionService.detailTbUnauth()
  const usession = {
    userId: usessionImfo.user.id,
    shopId: usessionImfo.shop.id,
    miniappId: usessionImfo.miniapp.id
  }
  // 约定云函数报错后必须将code值订位2004
  const response = await cloud.function.invoke(cloudName, { ...data, usession }, funName)
  if (response.code === 2004) {
    // 收集所有的日志信息
    // 监听api异常信息
    const systemInfo = my.getSystemInfoSync() || {}
    const log = {
      id: RandomUtil.guidStringD(),
      miniappId: usession.miniapp.id,
      tbNickName: usession.user.tbNickName || null,
      shopId: usession.shop.id,
      userId: usession.user.id,
      // page: (page || {}).pageName || "接口错误",
      type: "api调用错误",
      errorApi: funName,
      cloudName: cloudName,
      operation: funName,
      addTime: Date.now(),
      message: response.message,
      errorMsg: response.errorMsg,
      systemInfo
    }
    cloud.function.invoke("cloudData", { log }, "errorLog")
  } else {
    return response
  }
}

export class Logger {
  constructor(pageName) {
    // 获取当前页面名字
    this.pageName = pageName
    this.loadUsession()
  }
  async loadUsession() {
    const usessionService = SimpleIoc.resolve(UsessionService)
    const usession = await usessionService.detailTbUnauth()
    this.usession = usession
  }
  // 定位方法内部错误
  async log(methodName, errMsg) {
    const log = {
      id: RandomUtil.guidStringD(),
      miniappId: this.usession.miniapp.id,
      tbNickName: this.usession.user.tbNickName || null,
      shopId: this.usession.shop.id,
      userId: this.usession.user.id,
      page: this.pageName,
      type: "api调用错误",
      methodName: methodName,
      addTime: Date.now(),
      errorMsg: errMsg,
      systemInfo
    }
    cloud.function.invoke("cloudData", { log }, "errorLog")
  }
}

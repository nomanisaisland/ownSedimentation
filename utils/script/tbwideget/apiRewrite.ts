/*
 * @Author: lujiafeng
 * @Date: 2021-12-24 14:14:42
 * @LastEditTime: 2022-03-14 16:02:24
 * @LastEditors: lujiafeng
 * @Description: 
 * @FilePath: \utils\script\tbwideget\apiRewrite.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
interface sceneInfo {
  /**
   * 小部件的orderId
   */
  sceneId: Number,
  isPreview: Boolean,
  schemaDataId: Number,
  sellerId: String,
  widgetRuntimeVersion: String
}




/**
 * @description 设置小部件的沉浸模式
 * @param mode inner：沉浸式交互，所有手势由小部件内部元素响应；  default：默认交互模式，横向手势由小部件内部响应，纵向手势由外部容器消费；
 */
export function setGestureMode(mode: String): void {
  if (my?.setGestureMode) {
    my.setGestureMode({ "gestureMode": mode })
  }
}

/**
 * @description 获取小部件场景信息
 * @returns
 * sceneParams={
 *  sceneId=8,
 *  isPreview = true,
 *  schemaDataId=64,
 *  widgetRuntimeVersion="2.0"
 * }
 */
export async function getSceneInfo(): Promise<object> {
  try {
    return await new Promise((resolve, reject) => {
      my.getSceneInfo({
        success: (res) => {
          resolve(res || 0);
          console.log(JSON.stringify(res))
        },
        fail: (err) => {
          reject(err)
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
}

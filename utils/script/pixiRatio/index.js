export default function (num) {
  const systemInfo = my.getSystemInfoSync()
  const ratio = systemInfo.windowWidth / 750
  const dpr = systemInfo.pixelRatio
  return ratio * num * dpr
}
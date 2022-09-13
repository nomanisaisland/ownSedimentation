谷歌扩展分为三个页面
1. background // 扩展的后台常驻页面，该页面可以用来处理popup和content中传过来的值
2. popup 弹窗界面，主要用来做一些简单的配置，最终结果传入background来使用
3. content 脚本界面，该代码会直接注入浏览器页面，来和浏览器界面交互
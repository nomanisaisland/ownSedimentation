commonjs 中有几个特别的变量，`module`、`exports`、`require`、`global`、`__filename`、`__dirname`。

在一个 js 文件中输入下面这行，你会发现可以打印出 5 个 argument。

```
console.log(arguments);
复制代码
```

它们分别对应的就是：`exports`、`require`、`module`、`__filename`、`__dirname`。

commonjs 的导出机制比较简单，只有 `module.exports` 和 `exports`。需要注意的是，他们指向的都是同一个对象。如果对 `module.exports` 赋值，则通过 `exports.xxx` 导出的所有变量都会失效，它所指向的对象和 `module.exports` 指向的不是同一个对象，而导出时是以 `module.exports` 指向的对象为准。

`require` 是动态导入模块的，只有执行到 `require` 语句的时候才会导入模块，它导入的是模块的一个拷贝。模块导入一次之后就会被缓存起来，后面再导入时都是使用的已缓存的版本。

举个简单例子，下面代码会先打印 `index` 再打印 `a`。如果把 `require` 换成 `import`，则会先打印 `a` 再打印 `index`。

```
// a.js
console.log('a')

// index.js
console.log('index')
require('./a')
复制代码
node index.js
复制代码
```

## ESM

### 常见导入导出

ESM 全称叫 ECMA Script Modules，是在 ES6 语言层面提出的一种模块化标准。

ES6 中主要有 `import`、`export` 两个关键词。要注意他们是语法层面的关键词，所以不能使用 	`console.log(import)` 这种方式来打印。而 commonjs 中的变量都是可以打印的。

常见的导入导出：

```
// 导入
import React from 'react'
import * as React from 'react'
import { Component } from 'react'
import {default as a} from 'react'
import {Button as Btn} from 'antd'
import 'index.less'

export default 1
export const name = 'lxfriday'
export { age }
export {name as nickname}
export { foo } from './foo-bar'
export * from './foo-bar'
复制代码
```

**ES6 模块在编译阶段就可以分析出导出的结果，同时它导出的是值的引用。**

- 编译阶段会导出意味着模块的导入会先于正常的执行流执行，即使 import 导入语句是在正常语句之后（见 commonjs 的例子）；
- ES6 导出的是一个引用，所以在对原模块做更改之后会影响新导入的值，导入时可以看做是从 getter 函数里面取值，获取的都是原模块内部的值；

下面是一个例子：



![image](D:\sedimentation\image\16e1da831c372259~tplv-t2oaga2asx-watermark.awebp)



### ESM 在浏览器中的应用

ESM 模块语法可以在[比较新](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FGuide%2FModules)的浏览器中使用，它的使用方式像下面的代码，需要使用 `type = module` 区分。浏览器对 script 标签默认的 type 是 `application/javascript`。

浏览器对 module 标签的脚本是异步加载并执行的，模块的加载不会阻塞浏览器渲染，等到整个页面渲染完成之后，module 才会执行，这种加载执行策略和 `defer` 属性相同（`async` 是异步加载完就会立即执行，会中断浏览器渲染）。

```
<script type="module" src="./index.js">xxx</script>
复制代码
```

下面是一个例子

```
// cc.js
export default { aa: "aaa", bb: "bbb" };
var value = 100;

// index.js
import cc from "./cc.js";
console.log("module in browser", cc);
console.log(value);
复制代码
<body>
  hello
  <script src="./index.js" type="module"></script>
</body>
复制代码
```

执行结果



![image](D:\sedimentation\image\16e1da82c4d5b558~tplv-t2oaga2asx-watermark.awebp)



可以看到，模块正常导入并打印了，但是在 `cc.js` 中定义的变量 `value`，在 `index.js` 中获取不到，这说明  `type=module` 有作用域限制。

## commonjs 和 ESM 混合使用

当它们混合使用的时候很容易产生混乱，在导入的时候，推荐把 `import` 语句都放在 `require` 语句前面。在不同时期，由于语法标准不完善，导入导出都存在差异，下面例子基于 webpack `4.41.2` 测试得出。

看看下面的例子：

```
// 对 import xx from './aa.js'

module.exports = xx
// 等同于 
export default xx
复制代码
// 对 import { aa, bb } from './cc.js' 或者 const { aa, bb } = require('./cc.js')

module.exports = { aa: 'aaa', bb: 'bbb' }
// 等同于
exports.aa = 'aaa'
exports.bb = 'bbb'
// 等同于
export const aa = 'aaa'
export const bb = 'bbb'
复制代码
```

下面两个例子要多加注意

```
// cc.js
module.exports = { aa: 'aaa', bb: 'bbb' }

// index.js
import cc from './cc.js'
import * as dd from './cc.js'

console.log(cc)
console.log(dd)
// 打印的结果相同，为 {aa: "aaa", bb: "bbb"}
复制代码
// cc.js
export default { aa: 'aaa', bb: 'bbb' }

// index.js
import cc from './cc.js'
import * as dd from './cc.js'

console.log(cc)
console.log(dd)
// 打印的结果不同
// cc => {aa: "aaa", bb: "bbb"}
// dd => Module {default: {…}, __esModule: true, Symbol(Symbol.toStringTag): "Module"}
复制代码
```

使用 `export default` 这种 ES6 方式导出的结果，`import * as` 可以准确的实现自身的语义，把模块里面所有导出的都挂载模块对象中。

ES6 模块中，`import a from './xx'` 是 `import { default as a } from './xx'` 的简写。表示把 `xx` 模块中用 `export default` 导出的变量导入。
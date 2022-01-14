### 术语

#### 1. jsdoc

从英文翻译而来-JSDoc是一种用于注释JavaScript源代码文件的标记语言。使用包含JSDoc的注释，程序员可以添加描述他们正在创建的代码的应用程序编程接口的文档。然后，通过各种工具对其进行处理，以生成HTML和RTF格式等可访问格式的文档。

#### 2. *tree shaking*

*tree shaking* 是一个术语，通常用于描述移除JavaScript 上下文中的未引用代码(dead-code)

#### 3. chunk 代码分割

chunk ，翻译成中文是 “大量，一块” 的意思，在 webpack 中打包之后生成的每个 JS 文件就是一个 chunk（一般打包之后只生成一个 JS 文件，但如果使用了 `多入口`、`动态引入` 等技术时会生成多个打包文件）。
生成多个 chunk （打包文件）的技术也叫做 `代码分割`。
代码分割的代码可以实现 `按需加载` 以提高性能。



#### 4. PostCSS

是一个平台，是一种软件开发工具，它使用基于JavaScript的插件来自动执行常规CSS操作。

加浏览器内核前缀和移动端适配都可以用到它

#### 5. CSS Modules

css 的模块化文件  `.module.css`

#### 6. Glob 导入

Vite 支持使用特殊的 `import.meta.glob` 函数从文件系统导入多个模块：

```javascript
const modules = import.meta.glob('./dir/*.js')

// 转换为
// vite 生成的代码
const modules = {
  './dir/foo.js': () => import('./dir/foo.js'),
  './dir/bar.js': () => import('./dir/bar.js')
}

// 访问对应模块
for (const path in modules) {
  modules[path]().then((mod) => {
    console.log(path, mod)
  })
}
// 匹配到的文件默认是懒加载的，通过动态导入实现，并会在构建时分离为独立的 chunk。如果你倾向于直接引入所有的模块（例如依赖于这些模块中的副作用首先被应用），你可以使用 import.meta.globEager 代替：


const modules = import.meta.globEager('./dir/*.js')

// vite 生成的代码
import * as __glob__0_0 from './dir/foo.js'
import * as __glob__0_1 from './dir/bar.js'
const modules = {
  './dir/foo.js': __glob__0_0,
  './dir/bar.js': __glob__0_1
}
```

- 这只是一个 Vite 独有的功能而不是一个 Web 或 ES 标准
- 该 Glob 模式会被当成导入标识符：必须是相对路径（以 `./` 开头）或绝对路径（以 `/` 开头，相对于项目根目录解析）。
- Glob 匹配是使用 `fast-glob` 来实现的 —— 阅读它的文档来查阅 [支持的 Glob 模式](https://github.com/mrmlnc/fast-glob#pattern-syntax)。
- 你还需注意，glob 的导入不接受变量，你应直接传递字符串模式。
- glob 模式不能包含与包裹引号相同的引号字符串（其中包括 `'`，`"`，```），例如，如果你想实现 `'/Tom\'s files/**'` 的效果，请使用 `"/Tom's files/**"` 代替。

https://cn.vitejs.dev/guide/



#### 7. WebAssembly

WebAssembly或称wasm是一个实验性的低级编程语言，应用于浏览器内的客户端。WebAssembly是便携式的抽象语法树，被设计来提供比JavaScript更快速的编译及运行。WebAssembly将让开发者能运用自己熟悉的编程语言编译，再藉虚拟机引擎在浏览器内运行



#### 8. Web Worker

Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。

Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。这样有利于随时响应主线程的通信。但是，这也造成了 Worker 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。



## vite配置

```typescript
// 基础配置 没有jsDoc需要自己写
/**
 * jsDoc 描述
 */
export default {
  // 配置选项
}

//函数配置  jsDoc自带
export default defineConfig({
  // ...
})

// 情景配置
export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    return {
      // dev 独有配置
    }
  } else {
    // command === 'build'
    return {
      // build 独有配置
    }
  }
})


interface CSSModulesOptions {
  scopeBehaviour?: 'global' | 'local'
  globalModulePaths?: RegExp[]
  generateScopedName?:
    | string
    | ((name: string, filename: string, css: string) => string)
  hashPrefix?: string
  /**
   * default: null
   */
  localsConvention?:
    | 'camelCase'
    | 'camelCaseOnly'
    | 'dashes'
    | 'dashesOnly'
    | null
}
// 异步配置
export default defineConfig(async ({ command, mode }) => {
  const data = await asyncFunction()
  return {
      // 构建模式所需的特有配置   以下都是参数数据类型和默认参数，如果有多个默认参数会备注下来
      
      // 共享配置
      root: process.cwd(), // string
      base: "/", // string
      mode："development", // string     默认参数 'development'（serve），'production'（build）
      define: "", // Record<string, string>
      
      
      // 官方插件  https://cn.vitejs.dev/plugins/
      plugins: [ // (Plugin | Plugin[])[]
      	{
          ...image(),
          enforce: 'pre', // pre：在 Vite 核心插件之前调用该插件, 默认：在 Vite 核心插件之后调用该插件 , post：在 Vite 构建插件之后调用该插件
          apply: 'build' // 默认情况下插件在开发 (serve) 和生产 (build) 模式中都会调用。如果插件在服务或构建期间按需使用，apply 属性可以指明它们仅在 'build' 或 'serve' 模式时调用
        }
      ], 
          
          
          
      publicDir: "public", // string | false
      cacheDir: "node_modules/.vite", // string
      resolve: {
          alias: "",   // Record<string, string> | Array<{ find: string | RegExp, replacement: string }>
          dedupe: [], // string[]
          conditions: [], // string[]
          mainFields: ['module', 'jsnext:main', 'jsnext'],  // string[]
          extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],  //  string[]
          preserveSymlinks: false, // boolean
      },
      css: {
          modules： {},  // CSSModulesOptions
          postcss: "", // string | (postcss.ProcessOptions & { plugins?: postcss.Plugin[] })
          preprocessorOptions: "", // Record<string, object>
      },
      json: {
          namedExports: true, // boolean
          stringify: false,  // boolean
      },
      esbuild: { // ESBuildOptions | false   配置文档 https://esbuild.github.io/api/#non-analyzable-imports
          
      },
      assetsInclude: "", // string | RegExp | (string | RegExp)[]
      logLevel: "info", // 'info' | 'warn' | 'error' | 'silent'
      clearScreen: true, //  boolean
      envDir: "", // string
      envPrefix: VITE_, // string | string[]
      
      // 开发服务器选项
      server: {
          host: "127.0.0.1",  // string | boolean
          port: 3000, //  number
          strictPort: false, // boolean
          https: false, // boolean | https.ServerOptions
          open: false, // boolean | string
          proxy: { // Record<string, string | ProxyOptions>
              // 字符串简写写法
              '/foo': 'http://localhost:4567',
              // 选项写法
              '/api': {
                target: 'http://jsonplaceholder.typicode.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
              },
              // 正则表达式写法
              '^/fallback/.*': {
                target: 'http://jsonplaceholder.typicode.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/fallback/, '')
              },
              // 使用 proxy 实例
              '/api': {
                target: 'http://jsonplaceholder.typicode.com',
                changeOrigin: true,
                configure: (proxy, options) => {
                  // proxy 是 'http-proxy' 的实例
                }
              }
          },
          cors: false, // boolean | CorsOptions
          force: true, //  boolean
          hmr: false, //  boolean | { protocol?: string, host?: string, port?: number, path?: string, timeout?: number, overlay?: boolean, clientPort?: number, server?: Server }
          watch: { // object
              ignored: ['!**/node_modules/your-package-name/**']
          },
          middlewareMode: 'html',  // 'ssr' | 'html'
          fs: {
              strict: true, //  boolean
              allow: [], // string[]
              deny: ['.env', '.env.*', '*.{pem,crt}'],  //  string[]
              
          },
          origin: 'http://127.0.0.1:8080/'， // string
      },
          
          
      // 构建选项
      build: {
          target: 'modules', //  string | string[]
          polyfillModulePreload: true, // boolean
          outDir: "dist", // string
          assetsDir: "assets", // string
          assetsInlineLimit: 4096, // number
          cssCodeSplit: true, // boolean
          cssTarget: "modules", // string | string[]
          sourcemap: false, // boolean | 'inline' | 'hidden'
          rollupOptions: {}, // RollupOptions   // https://rollupjs.org/guide/en/#big-list-of-options
          commonjsOptions: {}, // dynamicImportVarsOptions
          lib: {},  // { entry: string, name?: string, formats?: ('es' | 'cjs' | 'umd' | 'iife')[], fileName?: string | ((format: ModuleFormat) => string) }
          manifest: false, // boolean
          ssrManifest: false, // boolean
          ssr: undefined, // boolean | string
          minify: 'esbuild', // boolean | 'terser' | 'esbuild'
          terserOptions: {}, // TerserOptions
          write: true, //  boolean
          emptyOutDir: true, // boolean
          reportCompressedSize: true, // boolean
          chunkSizeWarningLimit: 500, // number
          watch: null, // WatcherOptions| null
      },
      
          
      // 预览选项
      preview: {
          host: server.host, // string | boolean
          port: 5000, // number
          strictPort: server.strictPort, // boolean
          https: server.https,  // boolean | https.ServerOptions
          open: server.open, // boolean | string
          proxy: server.proxy, // Record<string, string | ProxyOptions>
          cors: server.cors,  // boolean | CorsOptions
      }
          
          
      // 依赖优化选项
      optimizeDeps: {
          entries: [],  // string | string[]
          exclude: [],  // string[]
          include: [], // string[]
          esbuildOptions: {}, //  EsbuildBuildOptions
      }
          
          
          
      // ssr 选项
      ssr{
          external: [],  // string[]
          noExternal: [],  // string | RegExp | (string | RegExp)[] | true
          target: "node",  //  'node' | 'webworker'
      }
      
  }
})
```





## 依赖预构建

## 自定义行为

https://cn.vitejs.dev/guide/dep-pre-bundling.html#monorepos-and-linked-dependencies

## 浏览器缓存

https://cn.vitejs.dev/guide/dep-pre-bundling.html#file-system-cache

## 显式 URL 引入

未被包含在内部列表或 `assetsInclude` 中的资源，可以使用 `?url` 后缀显式导入为一个 URL。这十分有用

```javascript
import workletURL from 'extra-scalloped-border/worklet.js?url'
CSS.paintWorklet.addModule(workletURL)
```

## 将资源引入为字符串

```
import workletURL from 'extra-scalloped-border/worklet.js?url'
CSS.paintWorklet.addModule(workletURL)
```

## 导入脚本作为 Worker

```
// 在生产构建中将会分离出 chunk
import Worker from './shader.js?worker'
const worker = new Worker()
// sharedworker
import SharedWorker from './shader.js?sharedworker'
const sharedWorker = new SharedWorker()
// 内联为 base64 字符串
import InlineWorker from './shader.js?worker&inline'
```

## `public` [目录](https://cn.vitejs.dev/guide/assets.html#the-public-directory)

如果你有下列这些资源：

- 不会被源码引用（例如 `robots.txt`）
- 必须保持原有文件名（没有经过 hash）
- ...或者你压根不想引入该资源，只是想得到其 URL。

那么你可以将该资源放在指定的 `public` 目录中，它应位于你的项目根目录。该目录中的资源在开发时能直接通过 `/` 根路径访问到，并且打包时会被完整复制到目标目录的根目录下。

目录默认是 `<root>/public`，但可以通过 [`publicDir` 选项](https://cn.vitejs.dev/config/#publicdir) 来配置。

请注意：

- 引入 `public` 中的资源永远应该使用根绝对路径 —— 举个例子，`public/icon.png` 应该在源码中被引用为 `/icon.png`。
- `public` 中的资源不应该被 JavaScript 文件引用。

## new URL(url, import.meta.url)[#](https://cn.vitejs.dev/guide/assets.html#new-url-url-import-meta-url)

[import.meta.url](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import.meta) 是一个 ESM 的原生功能，会暴露当前模块的 URL。将它与原生的 [URL 构造器](https://developer.mozilla.org/en-US/docs/Web/API/URL) 组合使用，在一个 JavaScript 模块中，通过相对路径我们就能得到一个被完整解析的静态资源 URL：

```
const imgUrl = new URL('./img.png', import.meta.url).href

document.getElementById('hero-img').src = imgUrl
```

这在现代浏览器中能够原生使用 - 实际上，Vite 并不需要在开发阶段处理这些代码！

这个模式同样还可以通过字符串模板支持动态 URL：

```
function getImageUrl(name) {
  return new URL(`./dir/${name}.png`, import.meta.url).href
}
```

在生产构建时，Vite 才会进行必要的转换保证 URL 在打包和资源哈希后仍指向正确的地址。

## [环境变量](https://cn.vitejs.dev/guide/env-and-mode.html#env-variables)

Vite 在一个特殊的 **`import.meta.env`** 对象上暴露环境变量。这里有一些在所有情况下都可以使用的内建变量：

- **`import.meta.env.MODE`**: {string} 应用运行的[模式](https://cn.vitejs.dev/guide/env-and-mode.html#modes)。
- **`import.meta.env.BASE_URL`**: {string} 部署应用时的基本 URL。他由[`base` 配置项](https://cn.vitejs.dev/config/#base)决定。
- **`import.meta.env.PROD`**: {boolean} 应用是否运行在生产环境。
- **`import.meta.env.DEV`**: {boolean} 应用是否运行在开发环境 (永远与 `import.meta.env.PROD`相反)。

## `.env` [文件](https://cn.vitejs.dev/guide/env-and-mode.html#production-replacement)
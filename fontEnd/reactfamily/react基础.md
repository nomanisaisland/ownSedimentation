# 组件通信

## 父传子 

```react
// 父组件（中的子组件内容）：
constructor(props){
    super(props)
    this.state = {
        btn: "hhh"
    }
    this.test = this.test.bind(this)
}
test() {   // 父组件给子组件传函数，如果需要改变父组件的值需要绑定this
    conosle.log(1)
}
<List btn={this.state.btn} del={this.test}></List>
//子组件中的内容： 
<div onClick={this.props.test}>{this.props.btn}<div>
```



### 子传父

思路： 通过父组件把更改状态的函数和必要参数传递给子组件，子组件再通过传递过来的方法更改父组件的状态

```react
// 父组件
constructor(props) {
	super(props)
	this.state = {
		text: 'niu'
	}
    this.changeText = this.changeText.bind(this)
}
changeText(content) {
    this.setState(()=>{
        text: content
    })
}
<Child chageText="this.changeText"></Child>
// 子组件
changeParent() {
    this.props.chageText('hello')
}
<div onClick="this.changeParent.bind(this)"></div>
```

# react 基础

> jsx 全称JavaScript XML，是js的扩展语法 

## 1. 基本写法

```react
<div>
    {/* 我是注释 */}
    {name}  {/*可以写表达式，但是不可以写条件语句：for  if*/} 
    <div style={{width: '100px'}}>
    </div>
    {/*jsx也是表达式*/}
</div>
```



# 起步

## 上手

1. ```npm I -g create-react-app```   安装官方脚手架
2. ```create-react-app react01```  初始化
3. react的api很少，基本学一次，就不用看文档了，核心就是js功力

## 文件结构



## 事件传参

```react
<ul>
    {
        this.state.goods.map(good=>	{
            <li key="good.id">
                {good.text}
                <buttton onClick={()=> this.addToCart(good)}>加购</buttton>
            </li>
        })
    }
</ul>

// 参数传递成功 
addToCart = (good) => {
    
}
```

## Fiber架构（异步更新、异步渲染）



## react 中配置代理

```js
// proxy 一定要在script前面 字符串方式
"proxy": "http://127.0.0.1:8082/mock/10",
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  
 // 对象配置方向
// 需要安装一个中间件
npm install http-proxy-middleware --save
//然后创建一个新文件“ src / setupProxy.js”，然后键入
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:/8080',
      changeOrigin: true,
    })
  );
};
```

## 配置alias

```javascript
 npm install react-app-rewired customize-cra --save-dev
 
 "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom",
    "eject": "react-app eject"
  },
  
 // 新建config-overrides.js文件
  const path = require('path');
function resolve(dir) {
    return path.join(__dirname, '.', dir)
}
module.exports = function override(config, env) {
    config.resolve.alias = {
        '@': resolve('src')
    }
    return config;
}
```

```javascript

// config-overrides.js
// 本文件用于覆盖webpack默认配置

const path = require('path')

//  按需加载组件代码和样式的 babel 插件
const { override, fixBabelImports, addWebpackPlugin } = require('customize-cra')

//  使用 Day.js 替换 momentjs 优化打包大小
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')

//alias配置别名
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}
module.exports = function override(config, env) {
  config.resolve.alias = {
    '@': resolve('src'),
  }
  // vw适配方案
  require('react-app-rewire-postcss')(config, {
    plugins: (loader) => [
      require('postcss-flexbugs-fixes'),
      require('postcss-preset-env')({
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
      }),
      require('postcss-aspect-ratio-mini')({}),
      require('postcss-px-to-viewport')({
        viewportWidth: 750, // (Number) The width of the viewport.
        viewportHeight: 1334, // (Number) The height of the viewport.
        unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
        viewportUnit: 'vw', // (String) Expected units.
        selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
        minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
        mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
      }),
      require('postcss-write-svg')({
        utf8: false,
      }),
      require('postcss-viewport-units')({}),
      require('cssnano')({
        preset: 'advanced',
        autoprefixer: false,
        'postcss-zindex': false,
      }),
    ],
  })
  // ant自定义主题 以及 按需加载
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  },config),
  // 使用 Day.js 替换 momentjs 优化打包大小
  addWebpackPlugin(new AntdDayjsWebpackPlugin(), config)
  return config
}

// npm i cssnano-preset-advanced --save-dev
```

## 模块化路由

```javascript
// router.js
import login from '@/page/login/'

// path: '/',//首页默认加载的页面
// componentName: login,
// exact: true //是否为严格模式
// route:[{}]
let router = [
    {
        path: '/login',//首页默认加载的页面
        Component: login,
        exact: true //是否为严格模式
    }
];


export default router;


//app.jsx
import React, { Component } from 'react'
import router from '@/routers/index.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class pageApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      style: {}
    }
  }
  render () {
    return (
      <Router>
        <div className="App">
          {
            router.map(({ path, Component, exact = true, routes = [] }, key) => {
              return <Route
                exact={exact}
                key={key}
                path={path}
                render={props => (
                  //主要是为了传递嵌套路由到子组件 
                  //类似于 <User {...props} routes={routes} />
                  <Component {...props} routes={routes} />
                )}
              />
            })
          }
        </div>
      </Router>
    )
  }
}

export default pageApp
```

# 完整配置

```javascript
// 请注意less-loader 需要用5.0.0版本
// addLessLoader 需要将react-script 降级到3.2.0 否则不支持模块化
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addBabelPlugins,
  addWebpackPlugin,
  useBabelRc,
  disableChunk,
  adjustWorkbox,
  setWebpackPublicPath,
  addBundleVisualizer,
  disableEsLint,
  addWebpackExternals,
} = require('customize-cra')
const path = require('path')
const paths = require('react-scripts/config/paths')
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
//   const CompressionWebpackPlugin = require('compression-webpack-plugin')
const rewireCompressionPlugin = require('react-app-rewire-compression-plugin')
const rewireUglifyjs = require('react-app-rewire-uglifyjs')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 补充：对开发友好，打包完成桌面提醒
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
  const webpackConfig = require('./webpack.config.js')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// const Dashboard = require('webpack-dashboard')
// const DashboardPlugin = require('webpack-dashboard/plugin')
// const dashboard = new Dashboard()
const theme = require('./theme')
// SKIP_PREFLIGHT_CHECK = true
/**
 * 生产环境是否打包 Source Map 两种方法
 *
 */
const rewiredMap = () => (config) => {
  config.devtool =
    config.mode === 'development' ? 'cheap-module-source-map' : false
  return config
}
process.env.PORT = 8080
process.env.GENERATE_SOURCEMAP !== 'false'

/**
 * baocuo
 * @param {*} dir
 */
  const addWebpackModules = () => config => {
    const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf
    loaders[loaders.length - 4] = Object.assign(
      loaders[loaders.length - 4],
      webpackConfig.module.rules[0]
    )
    return config
  }

// path
const resolveAlias = (dir) => path.join(__dirname, '.', dir)
// 热跟新
const hotLoader = () => (config, env) => {
  config = rewireReactHotLoader(config, env)
  return config
}
const addPostCssVW = () => (config, env) => {
  config = require('react-app-rewire-postcss')(config, {
    plugins: (loader) => [
      require('postcss-flexbugs-fixes'),
      require('postcss-preset-env')({
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
      }),
      require('postcss-aspect-ratio-mini')({}),
      require('postcss-px-to-viewport')({
        viewportWidth: 750, // (Number) The width of the viewport.
        viewportHeight: 1334, // (Number) The height of the viewport.
        unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
        viewportUnit: 'vw', // (String) Expected units.
        selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
        minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
        mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
      }),
      require('postcss-write-svg')({
        utf8: false,
      }),
      // 过滤覆盖filterRule: rule => rule.nodes.findIndex(i => i.prop === 'content') === -1 防止报错
      require('postcss-viewport-units')({filterRule: rule => rule.nodes.findIndex(i => i.prop === 'content') === -1}),
      require('cssnano')({
        preset: 'advanced',
        autoprefixer: false,
        'postcss-zindex': false,
      }),
    ],
  })
  return config
}
// build--->prod --->文件设置
const appBuildPathFile = () => (config) => {
  if (config.mode === 'development') {
  } else if (config.mode === 'production') {
    // 关闭sourceMap
    config.devtool = false
    //  // 配置打包后的文件位置修改path目录
    paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist')
    config.output.path = path.join(path.dirname(config.output.path), 'dist')
    // 添加js打包gzip配置
    // config.plugins.push(
    //   new CompressionWebpackPlugin({
    //     test: /\.js$|\.css$/,
    //     threshold: 1024
    //   })
    // )
    // 更改生产模式输出的文件名
    // config.output.filename = 'static/js/[name].js?_v=[chunkhash:8]'
    // config.output.chunkFilename = 'static/js/[name].chunk.js?_v=[chunkhash:8]'
  }
  return config
}

//生产环境去除console.* functions
const dropConsole = () => {
  return (config) => {
    if (config.optimization.minimizer) {
      config.optimization.minimizer.forEach((minimizer) => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.terserOptions.compress.drop_console = true
        }
      })
    }
    return config
  }
}
/**
   *
   * @description 解决打包的时候如下报错
   * @url{https://github.com/ant-design/ant-design/issues/15696}
   * https://blog.csdn.net/peade/article/details/84890399
  chunk 3 [mini-css-extract-plugin]
  Conflicting order between:
   * css ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-7-1!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js??ref--6-oneOf-7-3!./node_modules/antd/es/input/style/index.less
   * css ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-7-1!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js??ref--6-oneOf-7-3!./node_modules/antd/es/message/style/index.less
   */
const delConflictingOrder = () => {
  return (config) => {
    for (let i = 0; i < config.plugins.length; i++) {
      const p = config.plugins[i]
      if (!!p.constructor && p.constructor.name === MiniCssExtractPlugin.name) {
        const miniCssExtractOptions = { ...p.options, ignoreOrder: true }
        config.plugins[i] = new MiniCssExtractPlugin(miniCssExtractOptions)
        break
      }
    }
  }
}
const addMiniCssExtractPlugin = () => {
  return (config) => {
    config.plugins.unshift(
      new FilterWarningsPlugin({
        // exclude: /any-warnings-matching-this-will-be-hidden/
        // exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
        exclude: /\[mini-css-extract-plugin\][^]*Conflicting order between:/,
      })
    )
  }
}

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    }),
    addLessLoader({
      // strictMath: true,
      lessOptions: {
        noIeCompat: true,
      javascriptEnabled: true,
      modifyVars: { ...theme },
      localIdentName: '[local]--[hash:base64:5]', // 自定义 CSS Modules 的 localIdentName
      }
    }),
    setWebpackPublicPath('/'), // 修改 publicPath
    addWebpackExternals({
      React: 'React',
      lodash: 'Lodash',
    }),
    //   addWebpackModules(),
    addWebpackAlias({
      '@': resolveAlias('src'),
      lib: resolveAlias('src/lib'),
      components: resolveAlias('src/components'),
      images: resolveAlias('src/assets/images'),
      styled: resolveAlias('src/assets/styled'),
      views: resolveAlias('src/views'),
      store: resolveAlias('src/store'),
      router: resolveAlias('src/router'),
      locale: resolveAlias('src/locale'),
      // 处理警告  React-Hot-Loader: react-🔥-dom patch is not detected. React 16.6+ features may not work.
      // 'react-dom': '@hot-loader/react-dom'
      // 解决antd 的icon图标打包体积大
      // '@ant-design/icons': 'purched-antd-icons'
    }),
    disableEsLint(),
    addPostCssVW(),
    appBuildPathFile(),
    disableChunk(),
    dropConsole(),
    // 关闭mapSource
    rewiredMap(),
    // 热跟新
    hotLoader(),
    // 配置babel解析器
    addBabelPlugins(['@babel/plugin-proposal-decorators', { legacy: true }]),
    //   //启用ES7的修改器语法（babel 7）
    //   // ['@babel/plugin-proposal-decorators', {legacy: true}],
    //   // ['@babel/plugin-proposal-class-properties', {loose: true}],
    //   // 打包编译完成提醒
    addWebpackPlugin(
      new WebpackBuildNotifierPlugin({
        title: '',
        logo: path.resolve('./public/logo.svg'),
        suppressSuccess: true,
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash].css',
        chunkFilename: 'static/css/[id].[contenthash].css',
        ignoreOrder: false,
        // moduleFilename: ({ name }) => `${name.replace('/js/', '/css/')}.css`
      }),
      // 美化控制台
      // new DashboardPlugin(dashboard.setData),
      // 进度条
      new ProgressBarPlugin(),
      delConflictingOrder(),
      addMiniCssExtractPlugin()
    ),
    rewireUglifyjs,
    rewireCompressionPlugin,
    // 允许使用.babelrc文件进行Babel配置。
    //   useBabelRc(),
    // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
    //   process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),
    //   adjustWorkbox(wb =>
    //     Object.assign(wb, {
    //       skipWaiting: true,
    //       exclude: (wb.exclude || []).concat('index.html')
    //     })
    //   )
    // addDecoratorsLegacy(), // 解析器,
  ),
}
```



## 1. 项目开发准备

    1). 项目描述: 整体业务功能/功能模块/主体的技术/开发模式
    2). 技术选型: 数据展现/用户交互/组件化, 后端, 前后台交互, 模块化, 项目构建/工程化, 其它
    3). API接口: 接口的4个组成部分, 接口文档, 对/调/测接口

## 2. git管理项目的常用操作

    1). 创建本地仓库
        创建.gitignore配置文件
        git init
        git add *
        git commit -m "xxx"
    2). 创建github远程仓库
        New Repository
        指定名称
        创建
    3). 将本地仓库推送到远程仓库
        git remote add origin https://github.com/zxfjd3g/170612_JSAdvance.git 关联远程仓库
        git push origin master
    
    4). push本地的更新 
        git add *
        git commit -m "xxx"
        git push origin master
    
    5). pull远程的更新
            git pull origin master
            
    6). 克隆github上的项目:
        git clone https://github.com/zxfjd3g/xxx.git

## 3. 搭建项目

    1). 使用create-react-app脚手架创建模板项目(工程化)
    2). 引入antd-mobile, 并实现按需打包和自定义主题
    3). 引入react-router-dom(v4): 
        HashRouter/Route/Switch
        history: push()/replace()
    4). 引入redux
        redux/react-redux/redux-thunk
        redux: createStore()/combineReducers()/applyMiddleware()
        react-redux: <Provider store={store}> / connect()(Xxx)
        4个重要模块: reducers/store/actions/action-types

## 4. 登陆/注册界面

    1). 创建3个1级路由: main/login/register
    2). 完成登陆/注册的静态组件
        antd组件: NavBar/WingBlank/WhiteSpace/List/InputItem/Radio/Button
        路由跳转: this.props.history.replace('/login')
        收集表单输入数据: state/onChange/变量属性名

## 5. 实现简单后台

    1). 使用webstorm创建基于node+express的后台应用
    2). 根据需求编写后台路由
    3). 使用postman测试后台接口
    4). 使用nodemon实现后台应用的自动重启动
    5). 路由回调函数的3步: 读取请求参数/处理/返回响应数据


​    

## 1. 使用mongoose操作数据库

    1). 连接数据库
    2). 定义schema和Model
    3). 通过Model函数对象或Model的实例的方法对集合数据进行CRUD操作 

## 2. 注册/登陆后台处理

    1). models.js
        连接数据库: mongoose.connect(url)
        定义文档结构: schema
        定义操作集合的model: UserModel
    2). routes/index.js
        根据接口编写路由的定义
        注册: 流程
        登陆: 流程
        响应数据结构: {code: 0, data: user}, {code: 1, msg: 'xxx'}

## 3. 注册/登陆前台处理

    1). ajax
        ajax请求函数(通用): 使用axios库, 返回的是promise对象
        后台接口请求函数: 针对具体接口定义的ajax请求函数, 返回的是promise对象
        代理: 跨域问题/配置代理解决
        await/async: 同步编码方式实现异步ajax请求 
    2). redux
        store.js
          生成并暴露一个store管理对象
        reducers.js
          包含n个reducer函数
          根据老state和指定action来产生返回一个新的state
        actions.js
          包含n个action creator函数
          同步action: 返回一个action对象({type: 'XXX', data: xxx})
          异步action: 返回一个函数: disptach => {执行异步代理, 结束时dispatch一个同步action}
        action-types.js
          action的type名称常量
    3). component
        UI组件: 
            组件内部没有使用任何redux相关的API
            通过props接收容器组件传入的从redux获取数据
            数据类型: 一般和函数
        容器组件
            connect(
              state => ({user: state.user}),
              {action1, action2}
            )(UI组件)



## 1. 实现user信息完善功能

    1). 用户信息完善界面路由组件: 
        组件: dashen-info/laoban-info/header-selector
        界面: Navbar/List/Grid/InputItem/Button/TextareaItem
        收集用户输入数据: onChange监听/state 
        注册2级路由: 在main路由组件
    2). 登陆/注册成功后的跳转路由计算
        定义工具函数
        计算逻辑分析
    3). 后台路由处理
    4). 前台接口请求函数
    5). 前台redux
        action-types
        异步action/同步action
        reducer
    6). 前台组件
        UI组件包装生成容器组件
        读取状态数据
        更新状态

## 2. 搭建整体界面(上)

    1). 登陆状态维护
        后台将userid保存到cookie中
        前台读取cookie中的userid
        redux中管理user信息状态
        
    2). 实现自动登陆
        整体逻辑分析
        ajax请求根据cookie中的userid查询获取对应的user信息



## 1. 搭建整体界面(下)

    封装导航路由相关数据(数组/对象)
    抽取底部导航组件
    非路由组件使用路由组件API

## 2. 个人中心

    读取user信息显示
    退出登陆

## 3. 用户列表

    为大神/老板列表组件抽取用户列表组件
    异步读取指定类型用户列表数据
        后台路由
        api
        redux
        component

## 4. socket.io

    实现实时聊天的库
    包装的H5 WebSocket和轮询---> 兼容性/编码简洁性
    包含2个包:
      socket.io: 用于服务器端
      socket.io-client: 用于客户端
    基本思想: 远程自定义事件机制
        on(name, function(data){}): 绑定监听
        emit(name, data): 发送消息
        
        io: 服务器端核心的管理对象
        socket: 客户端与服务器的连接对象



## 1. 聊天组件功能:

    后台接口
    chat静态组件
    发送消息与接收消息
    获取消息列表显示
    接收消息显示
    完善列表显示



## 1. 消息列表

    对消息进行分组保存, 且只保存每个组最后一条消息
    对于对象容器和数组容器的选择
    数组排序

## 2. 未读消息数量显示 

    每个组的未读数量统计
    总未读数量统计显示
    查看消息后, 更新未读数量

## 3. 自定义redux和react-redux

	理解redux模块
	    1). redux模块整体是一个对象模块
	    2). 内部包含几个函数
	        createStore(reducers)  // reducers: function(state, action){ return newState}
	        combineReducers(reducers)  // reducers: {reducer1, reducer2}  返回: function(state, action){ return newState}
	        applyMiddleware()  // 暂不实现
	    3). store对象的功能
	        getState()  // 返回当前state
	        dispatch(action)  // 分发action: 调用reducers()得到新的总state, 执行所有已注册的监听函数
	        subscibe(listener) // 订阅监听: 将监听函数保存起来
	理解react-redux模块
		1). react-redux模块整体是一个对象模块
		2). 包含2个重要属性: Provider和connect
		3). Provider
			值: 组件类
			作用: 向所有容器子组件提供全局store对象
			使用: <Provider store={store}><Xxx/></Provider>
		4). connect
			值: 高阶函数
			作用: 包装组件生成容器组件, 让被包装组件能与redux进行通信
			使用: connect(mapStateToProps, mapDispatchToProps)(Xxx)









# 1. React入门

	## 1.1. React基本认识
	## 1.2. React基本使用
	## 1.3. JSX的理解和使用
	## 1.4. 模块与模块化, 组件与组件化的理解

# 2. React组件化编程

	## 2.1. 组件的定义与使用
	## 2.2. 组件的3大属性: state, props, refs
	## 2.3. 组件中的事件处理
	## 2.4. 组件的组合使用
	## 2.5. 组件收集表单数据
	## 2.6. 组件的生命周期
	## 2.7. 虚拟DOM与DOM diff算法
	## 2.8. 命令式编程与声明式编程


# 1. React入门

## 1.1. React的基本认识

	1). Facebook开源的一个js库
	2). 一个用来动态构建用户界面的js库
	3). React的特点
		Declarative(声明式编码)
		Component-Based(组件化编码)
		Learn Once, Write Anywhere(支持客户端与服务器渲染)
		高效
		单向数据流
	4). React高效的原因
		虚拟(virtual)DOM, 不总是直接操作DOM(批量更新, 减少更新的次数) 
		高效的DOM Diff算法, 最小化页面重绘(减小页面更新的区域)

## 1.2. React的基本使用

	1). 导入相关js库文件(react.js, react-dom.js, babel.min.js)
	2). 编码:
		<div id="container"></div>
		<script type="text/babel">
			var aa = 123
			var bb = 'test'
			ReactDOM.render(<h1 id={bb}>{aa}</h1>, containerDOM)
		</script>

## 1.3. JSX的理解和使用

	1). 理解
		* 全称: JavaScript XML
		* react定义的一种类似于XML的JS扩展语法: XML+JS
		* 作用: 用来创建react虚拟DOM(元素)对象
	2). 编码相关
		* js中直接可以套标签, 但标签要套js需要放在{}中
		* 在解析显示js数组时, 会自动遍历显示
		* 把数据的数组转换为标签的数组: 
			var liArr = dataArr.map(function(item, index){
				return <li key={index}>{item}</li>
			})
	3). 注意:
	    * 标签必须有结束
	    * 标签的class属性必须改为className属性
	    * 标签的style属性值必须为: {{color:'red', width:12}}

## 1.4. 几个重要概念理解

### 1). 模块与组件

	1. 模块:
	  	理解: 向外提供特定功能的js程序, 一般就是一个js文件
	  	为什么: js代码更多更复杂
	  	作用: 复用js, 简化js的编写, 提高js运行效率
	2. 组件: 
		理解: 用来实现特定功能效果的代码集合(html/css/js)
	  	为什么: 一个界面的功能太复杂了
	  	作用: 复用编码, 简化项目界面编码, 提高运行效率

### 2). 模块化与组件化

    1. 模块化:
    	当应用的js都以模块来编写的, 这个应用就是一个模块化的应用
    2. 组件化:
    	当应用是以多组件的方式实现功能, 这上应用就是一个组件化的应用


# 2. react组件化开发

## 2.1. 基本理解和使用

	1). 自定义的标签: 组件类(函数)/标签
	2). 创建组件类
		//方式1: 无状态函数(简单组件, 推荐使用)
		function MyComponent1(props) {
			return <h1>自定义组件标题11111</h1>
		}
		//方式2: ES6类语法(复杂组件, 推荐使用)
		class MyComponent3 extends React.Component {
			render () {
			  return <h1>自定义组件标题33333</h1>
			}
		}
	3). 渲染组件标签
		ReactDOM.render(<MyComp />,  cotainerEle)
	4). ReactDOM.render()渲染组件标签的基本流程
		React内部会创建组件实例对象/调用组件函数, 得到虚拟DOM对象
		将虚拟DOM并解析为真实DOM
		插入到指定的页面元素内部

## 2.2. 组件的3大属性: state

	1. 组件被称为"状态机", 页面的显示是根据组件的state属性的数据来显示
	2. 初始化指定:
	    constructor() {
	      super()
	      this.state = {
	        stateName1 : stateValue1,
	        stateName2 : stateValue2
	      }
	    }
	3. 读取显示: 
	    this.state.stateName1
	4. 更新状态-->更新界面 : 
	    this.setState({stateName1 : newValue})

## 2.2. 组件的3大属性: props

	所有组件标签的属性的集合对象
	给标签指定属性, 保存外部数据(可能是一个function)
	在组件内部读取属性: this.props.propertyName
	作用: 从目标组件外部向组件内部传递数据
	对props中的属性值进行类型限制和必要性限制
		Person.propTypes = {
			name: React.PropTypes.string.isRequired,
			age: React.PropTypes.number.isRequired
		}
	扩展属性: 将对象的所有属性通过props传递
	    <Person {...person}/>

## 2.2. 组件的3大属性: refs

	组件内包含ref属性的标签元素的集合对象
	给操作目标标签指定ref属性, 打一个标识
	在组件内部获得标签对象: this.refs.refName(只是得到了标签元素对象)
	作用: 找到组件内部的真实dom元素对象, 进而操作它

## 2.3. 组件中的事件处理

	1. 给标签添加属性: onXxx={this.eventHandler}
	2. 在组件中添加事件处理方法
	    eventHandler(event) {
	                
	    }
	3. 使自定义方法中的this为组件对象
	  	在constructor()中bind(this)
	  	使用箭头函数定义方法(ES6模块化编码时才能使用)
	4. 事件监听
		绑定事件监听
			事件名
			回调函数
		触发事件
			用户对对应的界面做对应的操作
			编码

## 2.4. 组件的组合使用

	1)拆分组件: 拆分界面,抽取组件
	2)实现静态组件: 使用组件实现静态页面效果
	3)实现动态组件
		①　动态显示初始化数据
		②　交互功能(从绑定事件监听开始)

## 2.5. 组件收集表单数据

	受控组件
	非受控组件

## 2.6. 组件的生命周期

	1. 组件的三个生命周期状态:
		Mount：插入真实 DOM
		Update：被重新渲染
		Unmount：被移出真实 DOM
	2. 生命周期流程:
		* 第一次初始化显示: ReactDOM.render(<Xxx/>, containDom)
			constructor()
			componentWillMount() : 将要插入回调
			render() : 用于插入虚拟DOM回调
			componentDidMount() : 已经插入回调
		* 每次更新state: this.setState({})
		    componentWillReceiveProps(): 接收父组件新的属性
		    componentWillUpdate() : 将要更新回调
		    render() : 更新(重新渲染)
		    componentDidUpdate() : 已经更新回调
		* 删除组件: ReactDOM.unmountComponentAtNode(div): 移除组件
			componentWillUnmount() : 组件将要被移除回调
	3. 常用的方法
		render(): 必须重写, 返回一个自定义的虚拟DOM
	  	constructor(): 初始化状态, 绑定this(可以箭头函数代替)
	  	componentDidMount() : 只执行一次, 已经在dom树中, 适合启动/设置一些监听

![组件生命周期](http://i.imgur.com/h5khD9F.png)


## 2.7. 虚拟DOM与DOM diff算法

### 1). 虚拟DOM是什么?

	一个虚拟DOM(元素)是一个一般的js对象, 准确的说是一个对象树(倒立的)
	虚拟DOM保存了真实DOM的层次关系和一些基本属性，与真实DOM一一对应
	如果只是更新虚拟DOM, 页面是不会重绘的

### 2). Virtual DOM 算法的基本步骤

	用JS对象树表示DOM树的结构；然后用这个树构建一个真正的DOM树插到文档当中
	当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
	把差异应用到真实DOM树上，视图就更新了

### 3). 进一步理解

    Virtual DOM 本质上就是在 JS 和 DOM 之间做了一个缓存。
    可以类比 CPU 和硬盘，既然硬盘这么慢，我们就在它们之间加个缓存：既然 DOM 这么慢，我们就在它们 JS 和 DOM 之间加个缓存。CPU（JS）只操作内存（Virtual DOM），最后的时候再把变更写入硬盘（DOM）。

![](http://i.imgur.com/psaZdqN.png)


## 2.8. 命令式编程与声明式编程

	声明式编程
		只关注做什么, 而不关注怎么做(流程),  类似于填空题
	命令式编程
		要关注做什么和怎么做(流程), 类似于问答题
	
	var arr = [1, 3, 5, 7]
	// 需求: 得到一个新的数组, 数组中每个元素都比arr中对应的元素大10: [11, 13, 15, 17]
	// 命令式编程
	var arr2 = []
	for(var i =0;i<arr.length;i++) {
		arr2.push(arr[i]+10)
	}
	console.log(arr2)
	// 声明式编程
	var arr3 = arr.map(function(item){
		return item +10
	})
	// 声明式编程是建立命令式编程的基础上
	
	// 数组中常见声明式方法
		map() / forEach() / find() / findIndex()







# 1. 最流行的开源React UI组件库

## 1). material-ui(国外)

	官网: http://www.material-ui.com/#/
	github: https://github.com/callemall/material-ui

## 2). ant-design(国内蚂蚁金服)

	官网: https://ant.design/
	github: https://github.com/ant-design/ant-design/

# 2. ant-design使用入门

## 1). 使用create-react-app搭建react开发环境

	npm install create-react-app -g
	create-react-app antd-demo
	cd antd-demo
	npm start

## 2). 搭建antd的基本开发环境

	1. 下载
		npm install antd@2.7.4 --save
	2. src/App.js
	    import React, { Component } from 'react';
	    import { Button } from 'antd';
	    import './App.css';
	    
	    class App extends Component {
	      render() {
	        return (
	          <div className="app">
	            <Button type="primary">Button</Button>
	          </div>
	        );
	      }
	    }
		export default App;
	3. src/App.css
	    @import '~antd/dist/antd.css';
	    
	    .app {
	      text-align: center;
	    }

## 3). 实现按需加载(组件js/组件css)

1. 使用eject命令将所有内建的配置暴露出来
   npm run eject
2. 下载babel-plugin-import(用于按需加载组件代码和样式的 babel 插件)
   npm install babel-plugin-import --save-dev
3. 修改配置: config/webpack.config.dev.js
   // Process JS with Babel.
   {
     test: /\.(js|jsx)$/,
     include: paths.appSrc,
     loader: 'babel',
     options: {
     +   plugins: [
     +   ['import', { libraryName: 'antd', style: 'css' }],
     +   ],
         // This is a feature of `babel-loader` for webpack (not Babel itself).
         // It enables caching results in ./node_modules/.cache/babel-loader/
         // directory for faster rebuilds.
         cacheDirectory: true
         }
          },
4. 去除引入全量样式的语句: src/App.css
   @import '~antd/dist/antd.css' 









# 1. 使用React脚手架创建一个React应用

## 1). react脚手架

	1. xxx脚手架: 用来帮助程序员快速创建一个基于xxx库的模板项目
		* 包含了所有需要的配置
		* 指定好了所有的依赖
		* 可以直接安装/编译/运行一个简单效果
	2. react提供了一个专门用于创建react项目的脚手架库: create-react-app
	3. 项目的整体技术架构为: react + webpack + es6  + babel + eslint

## 2). 创建项目并启动

	npm install -g create-react-app
	create-react-app react-app
	cd react-app
	npm start

## 3). 使用脚手架开发的项目的特点

	模块化: js是一个一个模块编写的
	组件化: 界面是由多个组件组合编写实现的
	工程化: 实现了自动构建/运行/打包的项目

## 4). 组件化编写项目的流程

	拆分组件
	实现静态组件--->静态页面
	实现动态组件
		动态显示初始化数据
		交互

# 2. app1: 实现一个评论管理功能

## 1). 拆分组件:

	应用组件: App
	添加评论组件: CommentAdd
	评论项组件: CommentItem
	评论列表组件: CommentList

## 2). 确定组件的state和props:

	App: 
		* state: comments/array
	CommentAdd
		* state: username/string, content/string
		* props: add/func
	commentList
	  	* props: comments/array, delete/func
	CommentItem
		* props: comment/object, delete/func, index/number

## 3). 编写静态组件

	拆分页面
	拆分css

## 4). 实现动态组件

	1. 动态展示初始化数据
	  * 初始化状态数据
	  * 传递属性数据
	2. 响应用户操作, 更新组件界面
	  * 绑定事件监听, 并处理
	  * 更新state

# 3. app2: 实现github用户搜索功能

## 1). react应用中的ajax请求

	axios: 包装XMLHttpRequest对象, promise风格, 支持浏览端/node服务器端
	fetch: 浏览器内置语法, promise风格, 老浏览器不支持, 可以引入fetch.js兼容包

## 2). 拆分组件

    App
    	* state: searchName/string
    Search
      	* props: setSearchName/func
    List
      	* props: searchName/string
      	* state: firstView/bool, loading/bool, users/array, errMsg/string

## 3). 编写组件

	编写静态组件
	编写动态组件
		componentWillReceiveProps(nextProps): 监视接收到新的props, 发送ajax
		使用axios库发送ajax请求

# 4. 组件间通信总结

## 1). 方式一: 通过props传递

	共同的数据放在父组件上, 特有的数据放在自己组件内部(state)
	一般数据-->父组件传递数据给子组件-->子组件读取数据
	函数数据-->子组件传递数据给父组件-->子组件调用函数
	问题: 多层传递属性麻烦, 兄弟组件通信不方便

## 2). 方式二: 使用消息订阅(subscribe)-发布(publish)机制: 自定义事件机制

	工具库: PubSubJS
	下载: npm install pubsub-js --save
	使用: 
	  import PubSub from 'pubsub-js' //引入
	  PubSub.subscribe('delete', function(msg, data){ }); //订阅
	  PubSub.publish('delete', data) //发布消息
	优点: 可以支持任意关系组件之间的通信

## 3). 事件监听理解

	1. DOM事件
		* 绑定事件监听
			* 事件名(类型): 只有有限的几个, 不能随便写
			* 回调函数
		* 用户操作触发事件(event)
			* 事件名(类型)
			* 数据
	2. 自定义事件
		* 绑定事件监听
			* 事件名(类型): 任意
			* 回调函数: 通过形参接收数据, 在函数体处理事件
		* 触发事件(编码)
			* 事件名(类型): 与绑定的事件监听的事件名一致
			* 数据: 会自动传递给回调函数

# 5. ES6新语法总结

	定义变量/常量: const/let
	解构赋值: let {a, b} = this.props   import {aa} from 'xxx'
	对象的简洁表达: {a, b}
	箭头函数: 
		组件的自定义方法: xxx = () => {}
		map/filter的回调方法: (item, index) => {}
		优点:
			* 简洁
			* 没有自己的this,使用引用this查找的是外部this
	扩展运算符: ...
		拆解对象:  const MyProps = {}, <Xxx {...MyProps}>
	类: class/extends/constructor/super
	ES6模块化: export default | import

# 6. 项目打包运行

npm run build  //生成打包文件
npm install -g serve  //全局下载服务器包
serve build  //通过服务器命令运行打包项目
访问: http://localhost:5000  //浏览器访问

### 1. compileOnSave

`compileOnSave` 属性作用是**设置保存文件的时候自动编译，但需要编译器支持**。

```json
{
    // ...
  "compileOnSave": false,
}
```



### `2. compilerOptions` 

compilerOptions属性作用是**配置编译选项**，用于**控制编译过程和编译结果**

若 `compilerOptions` 属性被忽略，则编译器会使用默认值，可以查看[《官方完整的编译选项列表》](https://link.segmentfault.com/?enc=h6C6mE2olEx0PbHq5SG5BA%3D%3D.phMhQHaU9uO7sYlX%2BiYicw2Q1tyrQHjMsVDnZaYQLw4OIpFV2Goph3o173AE%2BK%2Fy5fv%2Fly84rKC7jewUMemkYvv%2FXobt5Dze3KSc6o9y1c4%3D)。
编译选项配置非常繁杂，有很多配置，这里只列出常用的配置。

```json
{
  // ...
  "compilerOptions": {
    "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
    "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
    "diagnostics": true, // 打印诊断信息 
    "target": "ES5", // 目标语言的版本
    "module": "CommonJS", // 生成代码的模板标准
    "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
    "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
    "allowJS": true, // 允许编译器编译JS，JSX文件
    "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
    "outDir": "./dist", // 指定输出目录
    "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
    "declaration": true, // 生成声明文件，开启后会自动生成声明文件
    "declarationDir": "./file", // 指定生成声明文件存放目录
    "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
    "sourceMap": true, // 生成目标文件的sourceMap文件   sourceMap就是一个信息文件，里面储存着打包前的位置信息也就是说，转换后的代码的每一个位置，所对应的转换前的位置
    "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
    "declarationMap": true, // 为声明文件生成sourceMap
    "typeRoots": [], // 声明文件目录，默认时node_modules/@types
    "types": [], // 加载的声明文件包
    "removeComments":true, // 删除注释 
    "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
    "noEmitOnError": true, // 发送错误时不输出任何文件
    "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
    "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
    "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
    "strict": true, // 开启所有严格的类型检查
    "alwaysStrict": true, // 在代码中注入'use strict'
    "noImplicitAny": true, // 不允许隐式的any类型
    "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
    "strictFunctionTypes": true, // 不允许函数参数双向协变
    "strictPropertyInitialization": true, // 类的实例属性必须初始化
    "strictBindCallApply": true, // 严格的bind/call/apply检查
    "noImplicitThis": true, // 不允许this有隐式的any类型
    "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
    "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
    "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
    "noImplicitReturns": true, //每个分支都会有返回值
    "esModuleInterop": true, // 允许export=导出，由import from 导入
    "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
    "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
    "baseUrl": "./", // 配合moduleResolution解析方式，如果没有找到，则会再到当前配置所在目录下的typings目录下查找
    "paths": { // 路径映射，相对于baseUrl
      // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
      "jquery": ["node_modules/jquery/dist/jquery.min.js"]
    },
    "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
    "listEmittedFiles": true, // 打印输出文件
    "preserveConstEnums": true, // 生成枚举的映射代码
    "listFiles": true// 打印编译的文件(包括引用的声明文件)
      
      
      
    "isolatedModules": true, // vite 创建的项目中要加这个 将每个文件作为单独的模块（与“ts.transpileModule”类似）
    "useDefineForClassFields": true,// vite 创建的项目中要加这个
  }
}
```

#### 2.1 moduleResolution

解析规则主要有两种，分别为**classic**和**node**。默认值为`module ==="amd" or "system" or "es6" or "es2015"?"classic" : "node"`，所以**其默认值和module的配置有关联**，由于module的默认值和target有关，而target默认值为es3，所以module的默认值commonjs，所以moduleResolution的默认值为node。

classic和node两种解析规则的不同:

假设用户主目录下有一个ts-test的项目，里面有一个src目录，src目录下有一个a.ts文件，即`/Users/**/ts-test/src/a.ts`

1. classic模块解析规则

```shell
# ① 对于相对路径模块: 只会在当前相对路径下查找是否存在该文件(.ts文件)，不会作进一步的解析，如"./src/a.ts"文件中，有一行import { b } from "./b"，那么其只会检测是否存在"./src/b.ts"，没有就算找不到。
# ② 对于非相对路径模块: 编译器则会从包含导入文件的目录开始依次向上级目录遍历，尝试定位匹配的ts文件或者d.ts类型声明文件，如果/Users/**/ts-test/src/a.ts文件中有一行import { b } from "b"，那么其查找过程如下:

/Users/**/ts-test/src/b.ts
/Users/**/ts-test/src/b.d.ts
/Users/**/ts-test/b.ts
/Users/**/ts-test/b.d.ts
/Users/**/b.ts
/Users/**/b.d.ts
/Users/b.ts
/Users/b.d.ts
/b.ts
/b.d.ts
```

2. **node模块解析规则**:

```shell
# ① 对于相对路径模块:除了会在当前相对路径下查找是否存在该文件(.ts文件)外，还会作进一步的解析，如果在相对目录下没有找到对应的.ts文件，那么就会看一下是否存在同名的目录，如果有，那么再看一下里面是否有package.json文件，然后看里面有没有配置，main属性，如果配置了，则加载main所指向的文件(.ts或者.d.ts),如果没有配置main属性，那么就会看一下目录里有没有index.ts或者index.d.ts，有则加载。
# ② 对于非相对路径模块: 对于非相对路径模块，那么会直接到a.ts所在目录下的node_modules目录下去查找，也是遵循逐层遍历的规则，查找规则同上，同上node模块解析规则查找如下:

/Users/**/ts-test/src/node_modules/b.ts
/Users/**/ts-test/src/node_modules/b.d.ts
/Users/**/ts-test/src/node_modules/b/package.json(如果指定了main)
/Users/**/ts-test/src/node_modules/b/index.ts
/Users/**/ts-test/src/node_modules/b/index.d.ts

/Users/**/ts-test/node_modules/b.ts
/Users/**/ts-test/node_modules/b.d.ts
/Users/**/ts-test/node_modules/b/package.json(如果指定了main)
/Users/**/ts-test/node_modules/index.ts
/Users/**/ts-test/node_modules/index.d.ts

/Users/**/node_modules/b.ts
/Users/**/node_modules/b.d.ts
/Users/**/node_modules/b/package.json(如果指定了main)
/Users/**/node_modules/index.ts
/Users/**/node_modules/index.d.ts

/Users/node_modules/b.ts
/Users/node_modules/b.d.ts
/Users/node_modules/b/package.json(如果指定了main)
/Users/node_modules/index.ts
/Users/node_modules/index.d.ts

/node_modules/b.ts
/node_modules/b.d.ts
/node_modules/b/package.json(如果指定了main)
/node_modules/index.ts
/node_modules/index.d.ts
```

#### 2.2 lib

这个是用于**指定要引入的库文件**，当ts文件中使用到了一些**全局的类库**的时候才会配置，**属性值为一个数组**，有**es5**、**es6**、**es7**、**dom**四个值可选，**如果不配置lib，那么其默认会引入dom库**，但是**如果配置了lib**，那么就**只会引入指定的库了**。如:

```typescript
// ts/index.ts
document.getElementById("#app");
```

```json
{
    "compilerOptions": {
        "lib": ["es6"], // 只引入es6的库文件，不引入dom的库文件
        "target": "es6"
    }
}
```

由于配置了lib，那么就只会引入es6的库文件，**不再引入dom相关的库文件了**，所以无法使用dom相关的东西，比如document，会提示`ts/index.ts:2:1 - error TS2584: Cannot find name 'document'. Do you need to change your target library? Try changing the `lib` compiler option to include 'dom'.`

lib的配置和target也有关，target默认值为es3，所以当ts文件中使用到了**Promise等全局类库**的时候，就无法解析了，这个时候我们可以**通过lib配置，引入es6的全局类库**；当然我们也可以**直接将target设置为es6**，那么就可以解析Promise了。

#### 2.3 module

这个用于**指定要使用的模块标准**，如果**不显式配置module**，那么**其值与target的配置有关**，其默认值为`target === "es3" or "es5" ?"commonjs" : "es6"`，所以当**target为es3或者es5**的时候，module的默认值为**commonjs**，当**target为其他的值**的时候，那么**module的默认值为es6**。当然可以显式的指定，如:

```awk
{
    "compilerOptions": {
        "module": "commonjs", // 指定使用的模块标准
    }
}
```

由于**模块标准与采用是es5语法还是es6语法没有关系**，也就是说，**模块标准可以与各种es语法相互配合**，比如，es5语法也可以采用es6的模块标准，所以module专门用于配置**输出结果中引入或导出模块时采用的语法标准**，是采用commonjs还是node。
为了支持CommonJS和AMD的exports, TypeScript提供了**`export =`**语法。所以ts源文件使用**`export =`**语法导出的时候，**module必须配置为commonjs**，同时**ts源文件中也必须使用`import module = require("module")`来导入此模块**。
也就是说，如果我们希望最终使用commonjs模块标准，那么**我们用`export =`语法导出，用`import module = require("module")`来导入**；如果我们希望最终使用ES6模块标准，那么我们就**使用ES6的模块标准进行导入导出**，二者不可混用。

#### 2.4 paths

这个是**配合baseUrl一起使用**的，因为其是**相对于baseUrl所在的路径的**，主要用于**到baseUrl所在目录下查找的时候进行的路径映射**。如:

```awk
// projectRoot/src/index.ts
import foo from "foo";
{
    "compilerOptions": {
        "baseUrl": "./typings",
        "paths": { // 路径映射，相对于baseUrl
            "foo": ["node_modules/foo"]
        }
    }
}
```

如果没有配置paths(**没有配置paths属性或者paths属性值为{}**)，那么当引入的非相对模块找不到的情况下，这里以classic模块解析规则为例，**编译器会到./typings目录下去查找有没有foo.ts或者foo.d.ts**，但是如果配置了paths(**至少配置了一项**)，那么编译器就不会到./typings目录下去查找有没有foo.ts或foo.d.ts了，即使./typings目录下有foo.ts或foo.d.ts也无法找到，因为**其只会到`baseUrl/映射路径`下查找**，即`./typings/node_modules/foo.ts`或者`./typings/node_modules/foo.d.ts`，**如果是node的解析规则，那么foo就可以是文件夹了**，主要取决于模块解析规则。

#### 2.5 typeRoots

这个用于**指定类型声明文件的查找路径**。默认值为**node_modules/@types**，即在node_modules下的@types里面查找。需要注意的是这里**仅仅是d.ts文件的查找路径**。同样，这个也是相当于在引入非相对模块的时候拓宽了类型声明文件的查找范围，其实就是**配置类型声明文件的查找目录**，如:

```awk
// projectRoot/src/index.ts
import foo from "foo";
{
    "compilerOptions": {
        "typeRoots": [
            "node_modules/@types", // 默认值
            "./typings"
        ]
    }
}
```

在其他情况都找不到foo模块的时候，编译器还会到项目根目录下的typings目录下去查找**有没有foo目录里面是否有一个index.d.ts类型声明文件**，并且**只能识别目录下的.d.ts文件，不能识别.ts文件**。

不管typeRoots怎么配置，编译器都会到node_modules/@types下查找类型配置文件，并且**不管是classic解析还是node解析，都会到node_modules/@types目录下查找类型声明文件**，即**typeRoots和types的配置与模块的解析规则无关**。

#### 2.6 types

这个需要**配合typeRoots来使用**，用于**指定需要包含的模块**，**只有在这里列出的模块的声明文件才会被加载进来**,其**属性值为一个数组**，如果将types设置为一个**空的数组**，那么typeRoots配置的目录里的声明文件都将不会被加载进来，比如此时如果源文件中使用到了node的内置模块，将会编译失败，如:

```javascript
// ts/index.ts
import http = require("http"); // 引入了node里的http模块
console.log(http);
{
    "compilerOptions": {
        "typeRoots": [
            "node_modules/@types" // 默认值
        ],
        "types": ["node"], // 将@types/node里的类型声明文件引入进来
    }
}
```

// 加载自己的类型声明文件

```prolog
{
     "compilerOptions": {
         "typeRoots": [
            "./typings"
         ],
         "types": ["foo"]
     }
}
```

可以到./typings目录下查找是否有foo目录，并且foo目录下是否有index.d.ts

再比如，源码中存在`import foo from "foo"`，因为编译器在node解析规则的情况下，既会到node_modules下面找也会到node_modules/@types下面找，但是如果这两个目录下都没有找到foo模块的定义，那么**编译器会看一下typeRoots和types的配置**，如果node_modules/@types目录下存在一个bar目录，并且bar目录里面有一个index.d.ts和foo.d.ts，具体配置如下:

```typescript
// node_modules/@types/bar/foo.d.ts
declare class Foo {

}
declare module "foo" {
    export default Foo;
}
// node_modules/@types/bar/index.d.ts
/// <reference path="foo.d.ts" />
{
    "types": ["bar"] // 引入bar模块的定义
}
```

由于源码中引入的是foo模块，但是**node_modules/@types目录下并没有foo模块的定义**，但是有bar模块的定义，但是bar模块中有foo模块的定义，那么就可以通过"types"配置，引入整个bar模块的定义，因为bar模块中引入了foo模块的定义，所以foo模块的定义也会被加载进来，当然不配置types，那么node_modules/@types目录下的所有模块的定义都会加载进来，所以**types的配置主要为了一次性加载某个包含了很多类型声明的模块**。

如果node_modules和node_modules/@type里找不到foo模块的定义，通过typeRoots和types的配置也找不到，那么**编译器就会根据baseUrl的配置，进一步查找**。所以非相对模块的查找顺序为，**根据moduleResolution的配置，确定是使用node还是classic模块进行基础解析，如果找不到，则查看typeRoots和types的配置，如果还是找不到，则查看baseUrl和paths的配置**，需要注意的是**typeRoots和types的配置只能是查找.d.ts类型声明文件**，如果还是找不到，那么**就在编译入口所在目录下查找有没有对应模块的定义了*。

### 3. exclude

`exclude` 属性作用是**指定编译器需要排除的文件或文件夹。**

默认排除 `node_modules` 文件夹下文件。

**exclude只对include中包含文件起到排除的作用**，**其无法排除files中配置的源文件**

exclude的适用场景，通常为，当所有的源文件被includes进来后，而**其中有一些是ts的测试文件，可以直接排除掉**

```json
{
    // ...
  "exclude": [
    "src/lib" // 排除src目录下的lib文件夹下的文件不会编译
  ]
}
```

和 `include` 属性一样，支持 glob 通配符：

- `*` 匹配0或多个字符（不包括目录分隔符）
- `?` 匹配一个任意字符（不包括目录分隔符）
- `**/` 递归匹配任意子目录

exclude只能排除include中包含的文件，并且**不是可编译文件的依赖文件**，也就是说，如果include配置为可编译ts目录下的所有ts文件，那么index.ts可以编译，虽然exclude了foo.ts文件，但是**index.ts依赖了foo.ts**，所以foo.ts还是会被编译。

### 4.extends

`extends` 属性作用是**引入其他配置文件，继承配置**。
默认包含当前目录和子目录下所有 TypeScript 文件。

```json
{
   // ...
  // 把基础配置抽离成tsconfig.base.json文件，然后引入
   "extends": "./tsconfig.base.json"
}
```

### 5. files

`files` 属性作用是**指定需要编译的单个文件列表**。
默认包含当前目录和子目录下所有 TypeScript 文件。

```json
{
    // ...
  "files": [
    // 指定编译文件是src目录下的leo.ts文件，不能使用通配符进行指定  "ts/**/*.ts" 错误示范
    "scr/leo.ts"
  ]
}
```

### 6. include

`include` 属性作用是**指定编译需要编译的文件或目录**。可以使用通配符指定

```json
{
    // ...
  "include": [
    // "scr" // 会编译src目录下的所有文件，包括子目录
    // "scr/*" // 只会编译scr一级目录下的文件
    "scr/*/*" // 只会编译scr二级目录下的文件
  ]
}
```

### 7. references

`references` 属性作用是**指定工程引用依赖。**
在项目开发中，有时候我们为了方便将前端项目和后端`node`项目放在同一个目录下开发，两个项目依赖同一个配置文件和通用文件，但我们希望前后端项目进行灵活的分别打包，那么我们可以进行如下配置：

```json
{
    // ...
  "references": [ // 指定依赖的工程
     {"path": "./common"}
  ]
}
```

### 8. typeAcquisition

`typeAcquisition` 属性作用是**设置自动引入库类型定义文件(.d.ts)相关。**
包含 3 个子属性：

- `enable` : 布尔类型，是否开启自动引入库类型定义文件(.d.ts)，默认为 false；
- `include` : 数组类型，允许自动引入的库名，如：["jquery", "lodash"]；
- `exculde` : 数组类型，排除的库名。

```json
{
    // ...
  "typeAcquisition": {
    "enable": false,
    "exclude": ["jquery"],
    "include": ["jest"]
  }
}
```




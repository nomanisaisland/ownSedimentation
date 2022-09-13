# Parameters

作用是用于获取函数 T 的参数类型

```typescript
type getImfor = (user: string) => ()
type imfor = Parameters<getImfor> //  type imfor = [user: string]
```

# keyof

 索引类型查询操作符

`keyof`操作符后面接一个类型，生成由`string`或者`number`组成的联合字面量类型。

keyof与Object.keys略有相似，只是 **keyof 是取 interface 的键**，**而且 keyof 取到键后会保存为联合类型。**

```typescript
 function getVal<T extends Object, K extends keyof T>(o: T, key: K): T[K] {
  return o[key]
}
getVal({ age: 1, name: "tom" }, "age")
```

## 基本用法

一个最基本的`keyof`用法如下，我们通过`keyof Person`得到一个`PersonKeys`类型，它是一个联合字面量类型，包含了`Person`所有的属性。所以我们在对类型为`PersonKeys`的变量赋值时，只能赋值为`'name'`或者`'age'`。

```typescript
type Person = {
  name: string;
  age: number;
};

type PersonKeys = keyof Person;

const key1: PersonKeys = 'name';
const key2: PersonKeys = 'age';
// Type '"addr"' is not assignable to type 'keyof Person'.
const key3: PersonKeys = 'addr';
```

## 与泛型一起使用

我们希望获取一个对象给定属性名的值，为此，我们需要确保我们不会获取 `obj` 上不存在的属性。所以我们在两个类型之间建立一个约束

```typescript
export const getProperty = <T, K extends keyof T>(obj: T, key: K) => {
  return obj[key];
};

const person = {
  name: 'CJ',
  age: 18
};

console.log(getProperty(person, 'name'));
// Argument of type '"addr"' is not assignable to parameter of type '"name" | "age"'.
console.log(getProperty(person, 'addr'));
```

`keyof T`返回`T`的联合字面量类型，`extends`用来对`K`进行约束，表示`K`为联合字面量类型中的一个。

由于我们使用了类型约束，这样我们在调用`getProperty`的时候，第二个参数`key`就必须为第一个参数`obj`中的属性。在尝试传入不存在的`addr`属性时 TypeScript 就会报错。

## 与映射类型一起使用

`keyof`运算符的另一个常见用途是映射类型，通过遍历键将现有类型转换为新类型。

下面是如何使用`OptionsFlags`映射类型转换`FeatureFlags`类型的示例。

```typescript
type OptionsFlags<T> = {
  [Property in keyof T]: boolean;
};
// use the OptionsFlags
type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<FeatureFlags>;
// 相当于
// type FeatureOptions = {
//   darkMode: boolean;
//   newUserProfile: boolean;
// };
```

在这个例子中，`OptionFlags`被定义为类型参数为`T`的一个泛型，`[Property in keyof T]`表示`T`所有属性名的迭代，方括号是索引签名语法。所以，`OptionFlags`包含`T`类型的所有属性，并将它们的值重新映射为`boolean`型。

## 与条件映射类型一起使用

在上一个例子中，我们把所有属性都映射成了`boolean`型。我们还可以更进一步，使用条件类型来进行类型映射。

在下面的例子中，我们只映射非函数属性为`boolean`型。

```typescript
type OptionsFlags<T> = {
  [Property in keyof T]: T[Property] extends Function ? T[Property] : boolean;
};

type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
  userManagement: string;
  resetPassword: string;
};

type FeatureOptions = OptionsFlags<Features>;
// 相当于
// type FeatureOptions = {
//   darkMode: () => void;
//   newUserProfile: () => void;
//   userManagement: boolean;
//   resetPassword: boolean;
// };
```

## 与 utility types 一起使用

TypeScript 内置了一些映射类型，叫做`utility types`。`Record`就是其中之一，为了理解`Record`类型如何工作，我们来看一下它的定义：

```typescript
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

可以看到，`Record`只是将所有属性映射为`T`类型之后返回的一个新类型。所以我们可以很容易通过`Record`实现上面映射类型中的例子。

```typescript
type FeatureOptions = Record<keyof FeatureFlags, boolean>; 
```

另外一个常见的用到`keyof`的类型是`Pick`。它允许从一个对象类型中选择一个或多个属性，并创建一个新类型。

```typescript
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```



# in

**in用于取联合类型的值。主要用于数组和对象的构造。**

**但切记不要用于 interface，否则会出错**

```typescript
type person = "age" | "name"
type man = {
  [Tkey in person]: string
}
// ===>
type man = {
    age: string;
    name: string;
}



type TbMyObjectMap<T> = {
  [TKey in keyof T]: T[TKey] extends (
    (
      options: {
        success?: (res: infer TRes) => void
      }
    ) => infer TRet
  ) ? TRet extends void ? (TbMyFunc<TRes, T[TKey]>) : T[TKey] : T[TKey];
}

```

# ReturnType

*作用*是用于获取函数的返回类型

```typescript
function getInt(a: string) {
  return parseInt(a);
}
type A = ReturnType<typeof getInt>;
```

# infer

`infer` 最早出现在此 [PR](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FMicrosoft%2FTypeScript%2Fpull%2F21496) 中，表示在 `extends` 条件语句中待推断的类型变量。

```typescript
type ParamType<T> = T extends (param: infer P) => any ? P : T;


//tuple 转 union ，如：[string, number] -> string | number
//解答之前，我们需要了解 tuple 类型在一定条件下，是可以赋值给数组类型：
type TTuple = [string, number];
type TArray = Array<string | number>;

type Res = TTuple extends TArray ? true : false;    // true
type ResO = TArray extends TTuple ? true : false;   // false
// 因此，在配合 infer 时，这很容做到：
type ElementOf<T> = T extends Array<infer E> ? E : never
type TTuple = [string, number];
type ToUnion = ElementOf<TTuple>; // string | number

```

# typeof

## 基本用法

`typeof`操作符用于获取变量的类型，因此操作符后面接的始终是一个变量。

```typescript
const p = {
  name: 'CJ',
  age: 18
};

type Person = typeof p;

// 等同于
type Person = {
  name: string;
  age: number;
}
```

## 从嵌套对象获取类型

如果对象是一个嵌套的对象，`typeof`也能够正确获取到它们的类型。

```typescript
const p = {
  name: 'CJ',
  age: 18,
  address: {
    city: 'SH'
  }
};

type Person = typeof p;

// 相当于
type Person = {
  name: string;
  age: number;
  address: {
    city: string;
  };
};

```

## 从数组获取类型

假如我们有一个字符串数组，可以把数组的所有元素组合成一个新的类型：

```typescript
const data = ['hello', 'world'] as const;
type Greeting = typeof data[number];

// type Greeting = "hello" | "world"
```

甚至我们可以从对象数组中获取我们想要的类型：

```typescript
export const locales = [
  {
    locale: 'se',
    language: 'Swedish'
  },
  {
    locale: 'en',
    language: 'English'
  }
] as const;

type Locale = typeof locales[number]['locale'];

// type Locale = "se" | "en"
```

# extends

## 接口继承

```typescript
 interface T1 {
    name: string
  }
  
  interface T2 {
    sex: number
  }
  
  // 多重继承，逗号隔开
  interface T3 extends T1,T2 {
    age: number
  }
  
  // 合法
  const t3: T3 = {
    name: 'xiaoming',
    sex: 1,
    age: 18
  }
```

## 条件判断

### 普通用法

```typescript
 // 示例1
  interface Animal {
    eat(): void
  }
  
  interface Dog extends Animal {
    bite(): void
  }
  
  // A的类型为string
  type A = Dog extends Animal ? string : number
  
  const a: A = 'this is string'
```

`extends`用来条件判断的语法和JS的三元表达是很相似，如果问号前面的判断为真，则将第一个类型string赋值给A，否则将第二个类型number赋值给A。

那么，接下来的问题就是，`extends`判断条件真假的逻辑是什么？

很简单，**如果extends前面的类型能够赋值给extends后面的类型，那么表达式判断为真，否则为假**。

上面的示例中，Dog是Animal的子类，父类比子类的限制更少，能满足子类，则一定能满足父类，Dog类型的值可以赋值给Animal类型的值，判断为真。

再看一个例子：

```ts
  // 示例2
interface A1 {
    name: string
  }

  interface A2 {
    name: string
    age: number
  }
  // A的类型为string
  type A = A2 extends A1 ? string : number
  
  const a: A = 'this is string'
```

A1，A2两个接口，满足A2的接口一定可以满足A1，所以条件为真，A的类型取string

到目前为止，`extends`的用法，平平无奇

### 泛型用法

#### 分配条件类型

还是先来看示例

```ts
  type A1 = 'x' extends 'x' ? string : number; // string
  type A2 = 'x' | 'y' extends 'x' ? string : number; // number
  
  type P<T> = T extends 'x' ? string : number;
  type A3 = P<'x' | 'y'> // ?
```

A1和A2是`extends`条件判断的普通用法，和上面的判断方法一样。

P是带参数T的泛型类型，其表达式和A1，A2的形式完全相同，A3是泛型类型P传入参数`'x' | 'y'`得到的类型，如果将`'x' | 'y'`带入泛型类的表达式，可以看到和A2类型的形式是完全一样的，那是不是说明，A3和A2的类型就是完全一样的呢？

有兴趣可以自己试一试，这里就直接给结论了

```typescript
  type P<T> = T extends 'x' ? string : number;
  type A3 = P<'x' | 'y'>  // A3的类型是 string | number
```



是不是很反直觉？这个反直觉结果的原因就是所谓的**分配条件类型**（Distributive Conditional Types）

> When conditional types act on a generic type, they become *distributive* when given a union type

这句话翻译过来也还是看不懂，我直接上大白话了

*对于使用extends关键字的条件类型（即上面的三元表达式类型），如果extends前面的参数是一个泛型类型，当传入该参数的是联合类型，则使用分配律计算最终的结果。分配律是指，将联合类型的联合项拆成单项，分别代入条件类型，然后将每个单项代入得到的结果再联合起来，得到最终的判断结果。*

还是用上面的例子说明

```typescript
type P<T> = T extends 'x' ? string : number;
type A3 = P<'x' | 'y'>  // A3的类型是 string | number
```

该例中，extends的前参为T，T是一个泛型参数。在A3的定义中，给T传入的是'x'和'y'的联合类型`'x' | 'y'`，满足分配律，于是'x'和'y'被拆开，分别代入`P<T>`

```typescript
P<'x' | 'y'> => P<'x'> | P<'y'>
```

'x'代入得到

```typescript
'x' extends 'x' ? string : number => string
```

'y'代入得到

```typescript
'y' extends 'x' ? string : number => number
```

然后将每一项代入得到的结果联合起来，得到`string | number`

总之，满足两个要点即可适用分配律：第一，参数是泛型类型，第二，代入参数的是联合类型

#### 特殊的never

```typescript
 // never是所有类型的子类型
  type A1 = never extends 'x' ? string : number; // string

  type P<T> = T extends 'x' ? string : number;
  type A2 = P<never> // never
```

上面的示例中，A2和A1的结果竟然不一样，看起来never并不是一个联合类型，所以直接代入条件类型的定义即可，获取的结果应该和A1一直才对啊？

实际上，这里还是条件分配类型在起作用。**never被认为是空的联合类型**，也就是说，没有联合项的联合类型，所以还是满足上面的分配律，然而因为没有联合项可以分配，所以`P<T>`的表达式其实根本就没有执行，所以A2的定义也就类似于永远没有返回的函数一样，是never类型的。

#### 防止条件判断中的分配

```typescript
type P<T> = [T] extends ['x'] ? string : number;
type A1 = P<'x' | 'y'> // number
type A2 = P<never> // string
```

在条件判断类型的定义中，将泛型参数使用`[]`括起来，即可阻断条件判断类型的分配，此时，传入参数T的类型将被当做一个整体，不再分配。



## 在高级类型中的应用

 ### Exclude

`Exclude`是TS中的一个高级类型，其作用是从第一个联合类型参数中，将第二个联合类型中出现的联合项全部排除，只留下没有出现过的参数。

示例：

```ts
type A = Exclude<'key1' | 'key2', 'key2'> // 'key1'
```

Exclude的定义是

```
type Exclude<T, U> = T extends U ? never : T
```

```typescript
// 这个定义就利用了条件类型中的分配原则，来尝试将实例拆开看看发生了什么：
type A = `Exclude<'key1' | 'key2', 'key2'>`

// 等价于

type A = `Exclude<'key1', 'key2'>` | `Exclude<'key2', 'key2'>`

// =>

type A = ('key1' extends 'key2' ? never : 'key1') | ('key'2 extends 'key2' ? never : 'key2')

// =>

// never是所有类型的子类型
type A = 'key1' | never = 'key1'

```

### **Extract**

高级类型`Extract`和上面的`Exclude`刚好相反，它是将第二个参数的联合项从第一个参数的联合项中提取出来，当然，第二个参数可以含有第一个参数没有的项。

下面是其定义和一个例子，有兴趣可以自己推导一下

```ts
type Extract<T, U> = T extends U ? T : never
type A = Extract<'key1' | 'key2', 'key1'> // 'key1'
```

### **Pick**

`extends`的条件判断，除了定义条件类型，还能在泛型表达式中用来约束泛型参数

```ts
// 高级类型Pick的定义
type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
}

interface A {
    name: string;
    age: number;
    sex: number;
}

type A1 = Pick<A, 'name'|'age'>
// 报错：类型“"key" | "noSuchKey"”不满足约束“keyof A”
type A2 = Pick<A, 'name'|'noSuchKey'>
复制代码
```

`Pick`的意思是，从接口T中，将联合类型K中涉及到的项挑选出来，形成一个新的接口，其中`K extends keyof T`则是用来约束K的条件，即，传入K的参数必须使得这个条件为真，否则ts就会报错，也就是说，K的联合项必须来自接口T的属性。



# Parameters 

**Parameters 获取函数的参数类型，将每个参数类型放在一个元组中。**

```typescript
/**
 * @desc 具体实现
 */
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

/**
 * @example
 * type Eg = [arg1: string, arg2: number];
 */
type Eg = Parameters<(arg1: string, arg2: number) => void>;
```

- `Parameters`首先约束参数`T`必须是个函数类型，所以`(...args: any) => any>`替换成`Function`也是可以的
- 具体实现就是，判断`T`是否是函数类型，如果是则使用`inter P`让ts自己推导出函数的参数类型，并将推导的结果存到类型`P`上，否则就返回`never`；




**敲重点！！！敲重点！！！敲重点！！！**

- `infer`关键词作用是让Ts自己推导类型，并将推导结果存储在其参数绑定的类型上。Eg:`infer P` 就是将结果存在类型`P`上，供使用。
- `infer`关键词只能在`extends`条件类型上使用，不能在其他地方使用。

**再敲重点！！！再敲重点！！！再敲重点！！！**

- `type Eg = [arg1: string, arg2: number]`这是一个元组，但是和我们常见的元组`type tuple = [string, number]`。官网未提到该部分文档说明，其实可以把这个作为类似命名元组，或者具名元组的意思去理解。实质上没有什么特殊的作用，比如无法通过这个具名去取值不行的。但是从语义化的角度，个人觉得多了语义化的表达罢了。
- 定义元祖的可选项，只能是最后的选项

```typescript
/**
 * 普通方式
 */
type Tuple1 = [string, number?];
const a: Tuple1 = ['aa', 11];
const a2: Tuple1 = ['aa'];

/**
 * 具名方式
 */
type Tuple2 = [name: string, age?: number];
const b: Tuple2 = ['aa', 11];
const b2: Tuple2 = ['aa'];
```

扩展：`infer`实现一个推导数组所有元素的类型：

```typescript
/**
 * 约束参数T为数组类型，
 * 判断T是否为数组，如果是数组类型则推导数组元素的类型
 */
type FalttenArray<T extends Array<any>> = T extends Array<infer P> ? P : never;

/**
 * type Eg1 = number | string;
 */
type Eg1 = FalttenArray<[number, string]>
/**
 * type Eg2 = 1 | 'asd';
 */
type Eg2 = FalttenArray<[1, 'asd']>
```


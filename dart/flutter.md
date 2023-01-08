## StatelessWidget 无状态组件

```dart
class App extends StatelessWidget {
    const App({Key? key}) : super(key: key);
    @override
    Widget build(BuildContext context) {
        //context是BuildContext类的一个实例，表示当前 widget 在 widget 树中的上下文，每一个 widget 都会对应一个 context 对象（因为每一个 widget 都是 widget 树上的一个节点）。实际上，context是当前 widget 在 widget 树中位置中执行”相关操作“的一个句柄(handle)，比如它提供了从当前 widget 开始向上遍历 widget 树以及按照 widget 类型查找父级 widget 的方法。
        return const Center(
            child: Text("hello")
        )
    }
}
```

## StatefulWidget 有状态组件

```dart
class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;
  
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
 ...
}
```



## 组件

### Container 

容器组件，用来布局，相当于div或者是引擎中的容器

```dart
@immutable // 不可变的
class App extends StatelessWidget {
    const App({Key? key}) : super(key: key);
    @override
    Widget build(BuildContext context) {
        return const Container(
        	
        )
    }
}
```

### Center

布局组件，用来控制位置



### Scaffold

Scaffold是 Material 库中提供的页面脚手架，它提供了默认的导航栏、标题和包含主屏幕 widget 树（后同“组件树”或“部件树”）的`body`属性，组件树可以很复杂。

### Text



### Column

`Column`的作用是将其所有子组件沿屏幕垂直方向依次排列,类似flex的column

### Icon



### Builder
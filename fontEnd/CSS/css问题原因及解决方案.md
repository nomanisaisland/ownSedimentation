## 1. 浏览器端

### 1.1 盒子边界重叠问题

边框重叠



## 2. 移动端

### 2.1 移动端1px边框问题（待真机测试）

为什么都在关注1px，那2px呢？不管了吗？

这就是这个1px问题很多人讨论的智障之处，如果按照1px存在问题的角度去理解那么所有dpr不是1的设备，直接按照设计稿中的尺寸去写对应的css像素，都会导致出来的效果是设计稿效果的dpr倍，直观点说就是按他们说的设计稿有个宽高100px的div，我们直接在css里写100px，如果在dpr为2的手机上我们看到的效果会是设计稿的2倍，所以为什么那些人不提这个呢，因为他们都已经做了对应的dpr转换方案，就是网上那些移动端适配的方案rem，vw之类的各种，所以在这个前提下其实1px是没有问题的，你写了1px的宽度，在dpr为2的设备上其实已经转换成了0.5px，问题就出在以前一些设备会把0.5px显示成1px，不支持0.5px（现在大部分手机浏览器都支持0.5px了），这才是根本问题，根本不是什么把1px变成了2px。而且真的那些设计师都搞600多的物理像素尺寸进行设计的？反正我目前碰到的UI都是用的iphone6的css像素 375宽度来设计的，感觉现在根本不需要纠结这种问题，直接1px就完事了。

#### 2.1.1该问题出现的原因
如果按照1px存在问题的角度去理解那么所有dpr不是1的设备，直接按照设计稿中的尺寸去写对应的css像素，都会导致出来的效果是设计稿效果的dpr倍，直观点说就是按他们说的设计稿有个宽高100px的div，我们直接在css里写100px，如果在dpr为2的手机上我们看到的效果会是设计稿的2倍，所以为什么那些人不提这个呢，因为他们都已经做了对应的dpr转换方案，就是网上那些移动端适配的方案rem，vw之类的各种，所以在这个前提下其实1px是没有问题的，你写了1px的宽度，在dpr为2的设备上其实已经转换成了0.5px，问题就出在以前一些设备会把0.5px显示成1px，不支持0.5px（现在大部分手机浏览器都支持0.5px了），这才是根本问题，根本不是什么把1px变成了2px。而且真的那些设计师都搞600多的物理像素尺寸进行设计的？反正我目前碰到的UI都是用的iphone6的css像素 375宽度来设计的，感觉现在根本不需要纠结这种问题，直接1px就完事了。

#### 2.1.2 解决方案

```markdown
viewport结合rem (推荐使用)
//devicePixelRatio=2设置meta
<meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">

//devicePixelRatio=3设置meta
<meta name="viewport" content="initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no">


使用 :before , :after 与 transform（推荐使用）
//第一种方法
//构建1个伪元素, 将它的长宽放大到2倍, 边框宽度设置为1px, 再以transform缩放到50%
.radius-border{
    position: relative;
}
@media screen and (-webkit-min-device-pixel-ratio: 2){
    .radius-border:before{
        content: "";
        pointer-events: none; /* 防止点击触发 */
        box-sizing: border-box;
        position: absolute;
        width: 200%;
        height: 200%;
        left: 0;
        top: 0;
        border-radius: 8px;
        border:1px solid #999;
        -webkit-transform(scale(0.5));
        -webkit-transform-origin: 0 0;
        transform(scale(0.5));
        transform-origin: 0 0;
    }
}

@media screen and (-webkit-min-device-pixel-ratio: 3) {
    .radius-border:before{
        content: "";
        pointer-events: none; /* 防止点击触发 */
        box-sizing: border-box;
        position: absolute;
        width: 200%;
        height: 200%;
        left: 0;
        top: 0;
        border-radius: 8px;
        border:1px solid #999;
        -webkit-transform(scale(0.3333));
        -webkit-transform-origin: 0 0;
        transform(scale(0.3333));
        transform-origin: 0 0;
    }
}
```



### 2.2 
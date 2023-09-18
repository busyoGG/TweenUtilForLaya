# TweenUtilForLaya
基于Laya开发的链式缓动工具类

## 使用方法

在使用之前调用TweenUtil.start()

to和from方法表示两个不同的缓动类型，to为从当前状态到目标状态，from为从目标状态到当前状态。这两个方法都会返回一个 subTween 对象，我们可以以这个 subTween 对象进行链式调用，以点的方法重复调用to、from等方法。

例如：
```typescript
  let obj = { x:0 };
  TweenUtil.to(obj,{ 
    x:1 
  },100).to({
    x:2 
  },100).to({ 
    x:3 
  },200);
```

同时，本项目也提供了循环执行缓动的功能，只需要在最后调用 loop() 方法，就可以对 loop 之前的所有步骤重复执行。另外，本项目也支持设置循环次数，只需要如下调用即可：

```typescript
  let obj = { x:0 };
  TweenUtil.to(obj,{ 
    x:1 
  },100).to({
    x:2 
  },100).to({ 
    x:3 
  },200).loop();

  let obj2 = { x:0 };
  TweenUtil.to(obj2,{ 
    x:1 
  },100).to({
    x:2 
  },100).to({ 
    x:3 
  },200).loop(3);
```

如果要清理缓动，有两种方法，
1. 调用 TweenUtil.clear(obj) 方法，传入一个缓动对象，则这个缓动对象会被清理。
2. 清理作用域上的所有缓动对象，调用 TweenUtil.clearAll(node) 方法，传入作用域，则该作用域上的所有缓动对象都会被清理。

特别注意，本项目目前不支持缓动对象池，因为有可能会出现引用bug，因此需要缓动对象池的话请自行实现。

详细说明见 [Js/Ts缓动系统](https://busyo.buzz/article/923369eacdd4/)
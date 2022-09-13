/* 事件总池 */
class EventBus {
  constructor() {
    this.bus = {};
  }
  // on 订阅  接受
  on(name, callback, ctx) {
    if (typeof callback !== 'function') {
      console.error('callback is not a function');
      return;
    }
    (this.bus[name] = this.bus[name] || []).push({
      fn: callback,
      ctx: ctx
    });
    return this
  }
  once(name, callback, ctx) {
    const self = this
    function listener() {
      self.off(name, listener);
      callback.apply(ctx, arguments)
    }
    listener._ = callback
    return this.on(name, listener, ctx)
  }
  // emit 发布
  emit(name, ...param) {
    let callbacks = this.bus[name]
    callbacks.forEach((cb) => {
      cb.apply(this, param)
    })
    return this
  }
  // off 释放
  off(name, callback) {
    let events = this.bus[name];
    if (!events) return;
    let i = 0,
      n = events.length;
    for (i; i < n; i++) {
      let event = events[i];
      if (callback === event) {
        events.splice(i, 1);
        break;
      }
    }
    return this
  }
}
export default new EventBus()

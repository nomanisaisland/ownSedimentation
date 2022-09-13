/* 事件总池 */
class EventBus {
    constructor() {
        this.bus = {};
    }
    // on 订阅  接受
    on(type, fun) {
        if (typeof fun !== 'function') {
            console.error('fun is not a function');
            return;
        }
        (this.bus[type] = this.bus[type] || []).push(fun);
    }
    // emit 发布
    emit(type, ...param) {
        let callbacks = this.bus[type]
        callbacks.forEach((cb) => {
            cb.apply(this, param)
        })
    }
    // off 释放
    off(type, fun) {
        let events = this.bus[type];
        if (!events) return;
        let i = 0,
            n = events.length;
        for (i; i < n; i++) {
            let event = events[i];
            if (fun === event) {
                events.splice(i, 1);
                break;
            }
        }
    }
}
export const eventBus = new EventBus()

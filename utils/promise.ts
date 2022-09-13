/*
 * @Author: lujiafeng
 * @Date: 2022-03-16 17:30:09
 * @LastEditTime: 2022-03-18 17:36:06
 * @LastEditors: lujiafeng
 * @Description: 
 * @FilePath: \utils\promise.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
// const aaa = new Promise((resolve, reject) => {
//   // resolve(true)
//   reject(123213123)
// })
// aaa.then((res) => {
//   console.log(res);
// }).catch()

/**
 * @description 判断是否是方法
 * @param obj 入参
 * @returns true | false
 */
function isFunction(obj: Array<any> | Object | string | number | boolean | Function): boolean {
  return toString.call(obj) === '[object Function]'
}

// “promise” is an object or function with a then method whose behavior conforms to this specification.
class MyPromise<T> {
  // “value” is any legal JavaScript value (including undefined, a thenable, or a promise). // 承诺的值
  private value: unknown = undefined
  // “exception” is a value that is thrown using the throw statement.   抛出的异常
  private exception: Error
  // “reason” is a value that indicates why a promise was rejected.  promise被拒绝的原因
  private reason: unknown
  // A promise must be in one of three states: pending, fulfilled, or rejected.
  private status: 'pending' | 'fulfilled' | 'rejected' = 'pending'

  private _fulfilledQueues: Array<(value: unknown) => unknown> = []

  private _rejectedQueues: Array<(reason: unknown) => unknown> = []

  constructor(executor: (resolve: (value: unknown) => void, reject?: (reason: unknown) => void) => void) {

    try {
      executor(this._resolve.bind(this), this._reject.bind(this))
    } catch (error) {
      this._reject(error)
    }
  }
  private _resolve(value: unknown) {
    const run = () => {
      if (this.status !== 'pending') return
      // 依次执行成功队列中的函数，并清空队列
      const runFulfilled = (val) => {
        let cb
        while (cb = this._fulfilledQueues.shift()) {
          cb(val)
        }
      }
      // 依次执行失败队列中的函数，并清空队列
      const runRejected = (reason) => {
        let cb
        while (cb = this._rejectedQueues.shift()) {
          cb(reason)
        }
      }
      if (value instanceof MyPromise) {
        value.then(value => {
          this.value = value
          this.status = 'fulfilled'
          runFulfilled(value)
        }, reason => {
          this.reason = reason
          this.status = 'rejected'
          runRejected(reason)
        })
      } else {
        this.value = value
        this.status = 'fulfilled'
        runFulfilled(value)
      }
    }
    setTimeout(run, 0)
  }
  private _reject(reason: unknown) {
    if (this.status !== 'pending') return
    const run = () => {
      this.reason = reason
      this.status = 'rejected'
      let cb
      while (cb = this._rejectedQueues) {
        cb(reason)
      }
    }
    setTimeout(() => {
      run()
    }, 0)
  }
  // “thenable” is an object or function that defines a then method. 带有then的方法是一个被定义的对象或者方法
  // Both onFulfilled and onRejected are optional arguments:    onFulfilled, onRejected方法都是可选的
  // If onFulfilled is not a function, it must be ignored.
  // If onRejected is not a function, it must be ignored.
  then(onfulfilled?: (value: unknown) => unknown, onrejected?: (reason: unknown) => unknown): MyPromise<unknown> {
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      let fulfilled = value => {
        try {
          if (!isFunction(onfulfilled)) {
            onFulfilledNext(value)
          } else {
            let res = onfulfilled(value)
            if (res instanceof MyPromise) {
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              onFulfilledNext(res)
            }
          }
        } catch (error) {
          onRejectedNext(error)
        }
      }

      let rejected = reason => {
        try {
          if (!isFunction(onrejected)) {
            onRejectedNext(reason)
          } else {
            let res = onrejected(reason)
            if (res instanceof MyPromise) {
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              onfulfilled(res)
            }
          }
        } catch (error) {
          onRejectedNext(error)
        }
      }
      switch (this.status) {
        case 'pending':
          this._fulfilledQueues.push(fulfilled)
          this._rejectedQueues.push(rejected)
          break;
        // 当状态已经改变时，立即执行对应的回调函数
        case 'fulfilled':
          // it must be called after promise is fulfilled, with promise’s value as its first argument.
          // it must not be called before promise is fulfilled.
          // it must not be called more than once.
          fulfilled(this.value)
          break;
        // If onRejected is a function,
        case 'rejected':
          // it must be called after promise is rejected, with promise’s reason as its first argument.
          // it must not be called before promise is rejected.
          // it must not be called more than once.
          rejected(this.reason)
          break;
        default:
          break;
      }
    })
  }
  catch(onrejected?: (reason: unknown) => unknown) {
    return this.then(undefined, onrejected)
  }
  finally(cb: () => void) {
    return this.then(
      value => MyPromise.resolve(cb()).then(() => value),
      reason => MyPromise.resolve(cb()).then(() => { throw reason })
    );
  }
  static resolve(value) {
    if (value instanceof MyPromise) return value
    return new MyPromise(resolve => {
      resolve(value)
    })
  }
  static reject(value) {
    return new MyPromise((resolve, reject) => {
      reject(value)
    })
  }
  static all(list: Array<typeof MyPromise>) {
    return new MyPromise((resolve, reject) => {
      let values = []
      let count = 0
      for (let [i, p] of list.entries()) {
        // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
        this.resolve(p).then(res => {
          values[i] = res
          count++
          // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
          if (count === list.length) resolve(values)
        }, err => {
          // 有一个被rejected时返回的MyPromise状态就变成rejected
          reject(err)
        })
      }
    })
  }

  static race(list) {
    return new MyPromise((resolve, reject) => {
      for (let p of list) {
        // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
        this.resolve(p).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      }
    })
  }
}
// “exception” is a value that is thrown using the throw statement.
const bbb = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(123213123)
  }, 2000)
})
bbb.then((res) => {
  console.log('catch', res)
})


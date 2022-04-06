/* promise/A+ 规范 实现.then 方法 */
class Promise {
  static #FULFILLED = 'fulfilled'
  static #REJECTED = 'rejected'
  static #PENDING = 'pending'

  static #resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      throw new TypeError('Chaining cycle detected for promise')
    }
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
      let called
      try {
        const then = x.then
        if (typeof then !== 'function') resolve(x)
        else {
          then.call(
            x,
            (value) => {
              if (called) return
              called = true
              Promise.#resolvePromise(promise2, value, resolve, reject)
            },
            (reason) => {
              if (called) return
              called = true
              reject(reason)
            }
          )
        }
      } catch (e) {
        if (called) return
        called = true
        reject(e)
      }
    } else {
      resolve(x)
    }
  }

  #state = Promise.#PENDING
  #result = null
  #onResolveCallbacks = []
  #onRejectCallbacks = []

  constructor(executor) {
    if (typeof executor !== 'function') {
      return new TypeError(`Promise resolver ${executor} is not a function`)
    }
    try {
      executor(this.#resolve.bind(this), this.#reject.bind(this))
    } catch (e) {
      this.#reject(e)
    }
  }

  #resolve(value) {
    if (this.#state === Promise.#PENDING) {
      this.#state = Promise.#FULFILLED
      this.#result = value
      this.#onResolveCallbacks.forEach((cb) => cb())
    }
  }
  #reject(reason) {
    if (this.#state === Promise.#PENDING) {
      this.#state = Promise.#REJECTED
      this.#result = reason
      this.#onRejectCallbacks.forEach((cb) => cb())
    }
  }
  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = (value) => value
    }
    if (typeof onRejected !== 'function') {
      onRejected = (reason) => {
        throw reason
      }
    }
    const promise2 = new Promise((resolve, reject) => {
      if (this.#state === Promise.#PENDING) {
        this.#onResolveCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onFulfilled(this.#result)
              Promise.#resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
        this.#onRejectCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onRejected(this.#result)
              Promise.#resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      }
      if (this.#state === Promise.#FULFILLED) {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.#result)
            Promise.#resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      if (this.#state === Promise.#REJECTED) {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.#result)
            Promise.#resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
    })
    return promise2
  }
}

// 实现以下功能，并且执行 npx promises-aplus-tests 4.手写Promise.js 进行测试
Promise.defer = Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = Promise

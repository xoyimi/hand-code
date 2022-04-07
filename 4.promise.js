/* promise/A+ 规范 实现.then 方法 */

const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    throw new TypeError('Chaining cycle detected for promise')
  }
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let called
    try {
      const then = x.then
      if (typeof then !== 'function') {
        resolve(x)
      } else {
        then.call(
          x,
          (value) => {
            if (called) return
            called = true
            resolvePromise(promise2, value, resolve, reject)
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
    console.log('resolve',x)
    resolve(x)
  }
}
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
const PENDING = 'pending'

class Promise {
  #state = PENDING
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
    if (this.#state === PENDING) {
      this.#state = FULFILLED
      this.#result = value
      this.#onResolveCallbacks.forEach((cb) => cb())
    }
  }
  #reject(reason) {
    if (this.#state === PENDING) {
      this.#state = REJECTED
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
      if (this.#state === PENDING) {
        this.#onResolveCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onFulfilled(this.#result)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
        this.#onRejectCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onRejected(this.#result)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      }
      if (this.#state === FULFILLED) {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.#result)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      if (this.#state === REJECTED) {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.#result)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
    })
    return promise2
  }
}

Promise.resolve = (value) => {
  if (value instanceof Promise) return value
  return new Promise((resolve, reject) => {
    resolve(value)
  })
}

Promise.reject = (value) => {
  return new Promise((resolve, reject) => {
    reject(value)
  })
}

Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

//  错误实现
// Promise.prototype.finally = (onFinally) => {
//   return this.then(onFinally, onFinally)
// }

Promise.prototype.finally = function (onFinally) {
  return new Promise((resolve, reject) => {
    this.then(
      (value) => {
        onFinally()
        resolve(value)
      },
      (reason) => {
        onFinally()
        reject(reason)
      }
    )
  })
}

// 实现一个 isIterator 函数，用来判断一个对象是否是可迭代的。
const isIterator = (value) => typeof value?.[Symbol.iterator] === 'function'

Promise.all = (iterable) => {
  return new Promise((resolve, reject) => {
    if (!isIterator(iterable)) {
      reject(new TypeError('Promise.all accepts an iterable object'))
      return
    }
    if (iterable.length === 0) {
      resolve([])
      return
    }

    let currentIndex = 0
    const results = []

    const processResult = (index, value) => {
      currentIndex++
      results[index] = value
      if (results.length === iterable.length) resolve(results)
    }

    for (let iterator of iterable) {
      if (!(iterator instanceof Promise)) {
        processResult(currentIndex, iterator)
        continue
      }
      iterator.then(
        (value) => {
          processResult(currentIndex, value)
        },
        (reason) => {
          reject(reason)
        }
      )
    }
  })
}

Promise.allSettled = function (iterable) {
  return new Promise((resolve, reject) => {
    if (!isIterator(iterable)) {
      reject(new TypeError('Promise.allSettled accepts an iterable object'))
      return
    }
    if (iterable.length === 0) {
      resolve([])
      return
    }
    let currentIndex = 0
    const results = []
    const processResult = (index, value) => {
      currentIndex++
      results[index] = value
      if (results.length === iterable.length) resolve(results)
    }

    for (let iterator of iterable) {
      if (!(iterator instanceof Promise)) {
        processResult(currentIndex, { status: 'fulfilled', value: iterator })
        continue
      }
      iterator.then(
        (value) => {
          processResult(currentIndex, { status: 'fulfilled', value })
        },
        (reason) => {
          processResult(currentIndex, { status: 'rejected', reason })
        }
      )
    }
  })
}

Promise.race = function (iterable) {
  return new Promise((resolve, reject) => {
    if (!isIterator(iterable)) {
      reject(new TypeError('Promise.allSettled accepts an iterable object'))
      return
    }
    for (let iterator of iterable) {
      if (!(iterator instanceof Promise)) {
        resolve(iterator)
        continue
      }
      iterator.then(resolve, reject)
    }
  })
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

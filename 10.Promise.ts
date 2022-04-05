enum State {
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
}
type Queue = any[]

interface lists{
}

class _Promise {
  #state = State.Pending
  #queue: Queue
  resolve(data) {
    if (this.#state !== State.Pending) return
    this.#state = State.Fulfilled
    const callbacks = this.#queue.shift()
    if (!callbacks || !callbacks[0]) return
    const x = callbacks[0].call(undefined, data)
    if (x instanceof _Promise) {
      x.then(
        (data) => {
          this.resolve(data)
        },
        (reason) => {
          this.reject(reason)
        }
      )
    } else {
      this.resolve(x)
    }
  }
  reject(reason) {
    if (this.#state !== State.Pending) return
    this.#state = State.Rejected
    const callbacks = this.#queue.shift()
    if (!callbacks || !callbacks[1]) return
    const x = callbacks[1].call(undefined, reason)
    if (x instanceof _Promise) {
      x.then(
        (data) => {
          this.resolve(data)
        },
        (reason) => {
          this.reject(reason)
        }
      )
    } else {
      this.resolve(x)
    }
  }
  constructor(executor) {
    executor(this.resolve.bind(this), this.reject.bind(this))
  }
  then(f1, f2) {
    this.#queue.push([f1, f2])
  }
}

const p = new _Promise(function (resolve, reject) {
  setTimeout(function () {
    reject('出错')
  }, 3000)
})

p.then(
  (data) => {
    console.log(data)
  },
  (r) => {
    console.error(r)
  }
)

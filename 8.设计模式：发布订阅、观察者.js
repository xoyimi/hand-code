export const eventBus = {
  // map: 存储事件队列的 map, 每个事件都有一个单独的队列，存放所有的事件处理函数
  map: new Map(),
  // on: 订阅事件的方法，根据传入的 eventName 事件名，将handler追加到新建或存在的事件队列中
  on(eventName, handler) {
    const handlers = this.map.get(eventName)
    if (handlers) {
      handlers.push(handler)
    } else {
      this.map.set(eventName, [handler])
    }
  },
  // emit: 触发事件的方法，根据传入事件名称、参数遍历事件队列并触发事件
  emit(eventName, args) {
    const handlers = this.map.get(eventName)
    console.log(handlers)
    if (!handlers) {
      throw new Error(`${eventName} is not exist`)
    }
    handlers.forEach((handler) => {
      handler(args)
    })
  },
  // off: 取消事件订阅，根据事件名和处理函数取消事件订阅，如不传入处理函数，则清空相应的事件队列
  off(eventName, handler) {
    if (!handler) {
      this.map.set(eventName, [])
      return
    }
    const handlers = this.map.get(eventName)
    const index = handlers.indexOf(handler)
    if (index >= 0) {
      handlers.splice(index, 1)
    }
  },
  // once: 执行单次事件订阅，触发后自动清除订阅
  once(eventName, handler) {
    const _handler = (args) => {
      this.off(eventName, _handler)
      handler(args)
    }
    this.on(eventName, _handler)
  },
}

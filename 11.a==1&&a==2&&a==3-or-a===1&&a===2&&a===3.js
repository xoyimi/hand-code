//利用 Object.defineProperty
const count = Symbol('count')
globalThis[count] = 1
Object.defineProperty(globalThis, 'a', {
  get() {
    return globalThis[count]++
  },
})
console.log(a === 1 && a === 2 && a === 3)

// 利用 JS 的对象 -> 原始值转换 toString() / valueOf()
const a = {
  count: 1,
  toString() {
    return this.count++
  },
}
console.log(a == 1 && a == 2 && a == 3)

// 利用 JS 的对象 -> 原始值转换 Symbol.toPrimitive

const a = {
  count: 1,
  [Symbol.toPrimitive]() {
    return this.count++
  },
}

console.log(a == 1 && a == 2 && a == 3)

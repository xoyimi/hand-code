// Object.defineProperty
globalThis.count = 1
Object.defineProperty(globalThis, 'a', {
  get() {
    return globalThis.count++
  },
})
console.log(a === 1 && a === 2 && a === 3)

// toString()
const a = {
  count: 1,
  toString() {
    return this.count++
  },
}
console.log(a == 1 && a == 2 && a == 3)

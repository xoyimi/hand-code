/* 简单版 */
function deepClone1(object) {
  JSON.parse(JSON.stringify(object))
}

/* 递归版 */
function deepClone(target) {
  if (Array.isArray(target)) {
    return target.map((e) => deepClone(e))
  }
  if (target === null) {
    return null
  }
  if (typeof target === 'object') {
    let cloneTarget = {}
    for (let key in target) {
      cloneTarget[key] = deepClone(target[key])
    }
    return cloneTarget
  }
  return target
}

let a = {
  a: null,
  b: 1,
  c: 2,
  d: [1, 2, 3, { dd: '123', ccc: [1, 2, 3, { a: [123] }] }],
  f: { a: 1 },
}

console.log(deepClone(a))

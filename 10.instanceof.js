/* 迭代 */
function instanceOf(obj, cls) {
  if (!['object', 'function'].includes(typeof obj)) return false
  if (Object.getPrototypeOf(obj) === cls.prototype) return true
  if (Object.getPrototypeOf(obj) === null) return false
  return instanceOf(Object.getPrototypeOf(obj), cls)
}

/* 遍历 */
function instanceOf2(obj, cls) {
  if (!['object', 'function'].includes(typeof obj)) return false

  let proto = Object.getPrototypeOf(obj)

  while (true) {
    if (proto === null) return false
    if (proto === cls.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}

/* 遍历2 */

function instanceOf3(obj, cls) {
  if (!['object', 'function'].includes(typeof obj)) return false

  let proto = obj
  while ((proto = Object.getPrototypeOf(proto))) {
    if (proto === cls.prototype) return true
  }
  return false
}

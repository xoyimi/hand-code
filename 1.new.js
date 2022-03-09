/* 手写 new 函数替代 new 操作符 
   对构造函数执行 new 操作时

1. 创建一个对象，将其继承构造函数的原型对象。
2. 将构造函数的 this 指向创建的对象，并将参数传递给构造函数，执行构造函数。
3. 如果构造函数返回一个 object，则返回这个 object，否则返回创建的对象。
*/

*/
// 方式一
function _new(constructor, args) {
  const instance = Object.create(constructor.prototype)
  const result = constructor.apply(instance, [args])
  return result instanceof Object ? result : instance
}

// 方式二
function _new(f) {
  const o = { __proto__: f.prototype }
  return (...params) => {
    let result = f.apply(o, params)
    return result instanceof Object ? result : o
  }
}

function Person(name) {
  this.name = name
}


// 方式一 使用方法
console.log(_new(Person,'zfpx'))

// 方式二 使用方法
console.log(_new(Person)('zfpx'))


Person.prototype.a = 1

console.log(_new(Person, '嘻嘻').a)

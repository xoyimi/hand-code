/* 手写 call函数 */
Function.prototype._call = function () {
  const fn = this // 函数的原型方法this指向调用它的对象（即函数）
  const context = arguments[0]
  context[Symbol.for('_call')] = fn // 使用Symbol属性名，避免和其他属性冲突
  const args = []
  for (let i = 1; i < arguments.length; i++) {
    args.push(arguments[i])
  }
  context[Symbol.for('_call')](args)
  delete context[Symbol.for('_call')]
}

/* 手写 apply 函数 */
Function.prototype._apply = function () {
  const fn = this
  const context = arguments[0]
  context[Symbol.for('_apply')] = fn
  context[Symbol.for('_apply')](arguments[1])
  delete context[Symbol.for('_apply')]
}

/* 手写 bind 函数 */
/* 当不允许使用apply时 基于 _apply 实现 bind */
Function.prototype._bind = function () {
  console.log('this', this)
  const context = arguments[0]
  const args = []
  for (let i = 1; i < arguments.length; i++) {
    args.push(arguments[i])
  }
  return () => {
    this._apply(context, args)
  }
}

var obj = {
  name: 'obj',
  age: 18,
}

const fun = function (a, b, c) {
  console.log(this.name)
}

const bindFun = fun._bind(obj)
bindFun() // obj

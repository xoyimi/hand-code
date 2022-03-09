/* 柯里化（Currying）：是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。 */
/* 函数柯里化提供了一种非常自然的方式来实现某些偏函数应用（Partial Application） */
/* 偏函数：偏函数应用是找一个函数，固定其中的几个参数值，从而得到一个新的函数 */
/* 局限：柯里化后的函数无法很简单对函数的第二个参数偏函数化(除非先偏函数化第一个参数)。 */

/* 柯里化 */
function curry(fn) {
  return function curried(...args) {
    // 如果参数数量不够
    if (args.length < fn.length) {
      // 返回一个新的柯里化函数
      return function (...args2) {
        // 将新的参数数组和旧的参数数组合并
        return curried(...args, ...args2) // 递归调用
      }
    } // 参数数量够了，返回函数的执行结果
    return fn(...args) // 将参数数组和原函数执行
  }
}

/* test */
function sum(a, b, c) {
  return a + b + c
}
let curriedSum = curry(sum)
let curriedSumAdd1 = curriedSum(1)
console.log(curriedSumAdd1(2)(3))

// 第二版

var _ = {}
function partial(fn, ...presetArgs) {
  return function () {
    var position = 0,
      len = presetArgs.length
    for (var i = 0; i < len; i++) {
      presetArgs[i] =
        presetArgs[i] === _ ? arguments[position++] : presetArgs[i]
    }
    while (position < arguments.length) presetArgs.push(arguments[position++])
    return fn.apply(this, presetArgs)
  }
}

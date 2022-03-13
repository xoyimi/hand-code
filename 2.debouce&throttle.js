/* 防抖函数 */
/* 定义：当一段时间内无重复触发，则执行函数 
 
/* 适用范围：文本框输入，按钮点击，调整屏幕尺寸 */

/* 定时器 简单版本 */
/* 可以传参，并且保留 this 指向 */

function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

/* 节流函数 */
/* 定义：控制函数以一定频率执行 */
/* 适用范围：滚动监听 */

/* 定时器 简单版本 */
function throttle(fn, interval = 1000, immediate = true) {
  let timer = null
  let executed = false
  return function (...args) {
    if (immediate && !executed) {
      fn.apply(this, args)
      executed = true
      return
    }
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, interval)
  }
}

const log = throttle(() => {
  console.log('11111')
})

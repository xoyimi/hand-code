/* 防抖函数 */
/* 定义：当一段时间内无重复触发，则执行函数 */
/* 适用范围：文本框输入，按钮点击，调整屏幕尺寸 */

/* 定时器 简单版本 */
function debounce(fn,delay){
  let timer=null 
  return ()=>{
    timer && clearTimeout(timer)
    timer=setTimeout(()=>{
      fn()
      timer=null
    },delay)
  }
}


/* 节流函数 */
/* 定义：控制函数以一定频率执行 */
/* 适用范围：滚动监听 */

/* 定时器 简单版本 */
function throttle(fn,interval){
  let timer=null
  return ()=>{
      console.log('timer:',timer)
    if(timer) return
   timer= setTimeout(()=>{
     fn()
     timer =null
   },interval)
  }
}
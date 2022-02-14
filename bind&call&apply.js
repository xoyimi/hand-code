Function.prototype._bind(){

var fn = this;

  return ()=>{

  }


}
/* 手写 call函数 */
Function.prototype._call=function(){
  const fn = this // 函数的原型方法this指向调用它的对象（即函数）
  const context = arguments[0]
  context[Symbol.for('fn')] = fn // 使用Symbol属性名，避免和其他属性冲突
  const args = []
  for(let i = 1; i < arguments.length; i++){
    args.push(arguments[i])
  }
  context[Symbol.for('fn')]()
  delete context[Symbol.for('fn')];
}

function showName (){
  console.log(this.name)
}
let obj = {
  name: 'this.obj',
  get name(){
    return 'XIXI'
  },
  set name(val){}
}
showName.call(obj)

Function.prototype._apply(){
  const fn = this
  const context = arguments[0]
  const args = []
  context.fn(args[1])
}

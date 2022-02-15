/* 手写 new 函数替代 new 操作符 */
/*  对构造函数执行 new 操作时
1. 一个新的空对象被创建并分配给 this。
2. 函数体执行。
3. 如果构造函数未显式的返回引用数据类型，则返回 this 
*/
function _new (constructor,args){
  const instance = Object.create(constructor.prototype)
  const result= constructor.apply(instance,[args])
  return result instanceof Object ? result : instance
}



function Person(name){  
  this.name=name
}

Person.prototype.a=1


console.log(_new(Person,'嘻嘻').a)
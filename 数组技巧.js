let arr=[1,2,3]
let arr2=[3,4,5]



/* 数组求交集 */
console.log(arr.filter((e) => arr2.includes(e)))


/* 数组降维 */
console.log(arr.flat(Infinity))
console.log(arr.toString().split(','))
console.log(arr.join('').split(','))

/* flatMap */

/* 去除空项 */
console.log([0,1,2,3].flatMap(e=>[e]))
let arr=[1,2,3]
let arr2=[3,4,5]



/* 数组求交集 */
console.log(arr.filter((e) => arr2.includes(e)))

/* 数组去重 */

// 利用两层循环

const arr = [1,1,1,2,2,2]
function unique(arr) {
  let res = []
  for(let i=0;i<arr.length;i++){
    for(let j=i+1;j<arr.length;j++){
      if(arr[i]===arr[j]){
        arr[j]=undefined
      }
    }
  }
  return res
}
  console.log(unique(arr))
// 利用语言特性
function unique(arr) {
    return [...new Set(arr)]
}

function unique (target){
  const map = new Map()
  target.forEach(e => {
  !map.has(e) && map.set(e,1)
  });
  return [...map.keys()]
}

/* 数组降维 */

// 降至一维
console.log(arr.flat(Infinity))
console.log(arr.toString().split(','))

/* flatMap */

/* 去除空项 */
console.log([0,1,2,3,,,,,,].flatMap(e=>[e]))
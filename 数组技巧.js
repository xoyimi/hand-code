let arr = [1, 2, 3]
let arr2 = [3, 4, 5]

/* 数组求交集 */
console.log(arr.filter((e) => arr2.includes(e)))

/* 数组去重 */
function unique(target) {
  let res = []
  target.forEach((e) => {
    if (!res.includes(e)) {
      res.push(e)
    }
  })
}
// 利用两层循环
function unique(arr) {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    let flag = true
    for (let j = 0; j < res.length; j++) {
      if (arr[i] === res[j]) {
        flag = false
        break
      }
    }
    if (flag) {
      res.push(arr[i])
    }
  }
  return res
}
const arr = [1, 1, 1, 2, 2, 2]
function unique(arr) {
  const res = []
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        j = ++i // 1. 外层循环控制i的更新，2. 内层循环跳过重复的元素
      }
    }
    res.push(arr[i])
  }
  return res
}
console.log(arr)
console.log(unique(arr))

const arr = [1, 1, 1, 2, 2, 2]

function unique(arr) {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1)
        j--
      }
    }
  }
  return arr
}
console.log(arr)
console.log(unique(arr))
// 利用语言特性
function unique(arr) {
  return [...new Set(arr)]
}

function unique(target) {
  const map = new Map()
  target.forEach((e) => {
    !map.has(e) && map.set(e, 1)
  })
  return [...map.keys()]
}

/* 数组降维 */

// 降至一维
console.log(arr.flat(Infinity))
console.log(arr.toString().split(','))

/* flatMap */

/* 去除空项 */
console.log([0, 1, 2, 3, , , , , ,].flatMap((e) => [e]))

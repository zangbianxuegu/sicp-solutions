// 3.3.1 Mutable List Structure

import { cons, car, cdr, list, isCons, length, memq } from '../utils.js'

function getNewCons() {
  return [null, null]
}

function setCar(x, y) {
  x[0] = y
}

function setCdr(x, y) {
  x[1] = y
}

function consMutator(x, y) {
  const newCons = getNewCons()
  setCar(newCons, x)
  setCdr(newCons, y)
  return newCons
}

// 練習 3.12
function append(x, y) {
  return x === null ? y : consMutator(car(x), append(cdr(x), y))
}
function appendMutator(x, y) {
  setCdr(lastCons(x), y)
  return x
}
function lastCons(x) {
  return cdr(x) === null ? x : lastCons(cdr(x))
}
const x = list('a', 'b')
const y = list('c', 'd')
const z = append(x, y)
console.log(z) // ['a', ['b', ['c', ['d', null]]]]
console.log(cdr(x)) // ['b', null]
const w = appendMutator(x, y)
console.log(w) // ['a', ['b', ['c', ['d', null]]]]
console.log(cdr(x))  // ['b', ['c', ['d', null]]]

// 練習 3.13
function makeCycle(x) {
  setCdr(lastCons(x), x)
  return x
}
const z = makeCycle(list('a', 'b', 'c'))
console.log(z) // ['a', ['b', ['c', ['a', ...]]]]
console.log(lastCons(z)) // Uncaught RangeError: Maximum call stack size exceeded

// 練習 3.14
function mystery(x) {
  function loop(x, y) {
    if (x === null) {
      return y
    }
    const temp = cdr(x)
    setCdr(x, y)
    return loop(temp, x)
  }
  return loop(x, list())
}
const v = list('a', 'b', 'c', 'd')
const w = mystery(v)
console.log(v) // ['a', null]
console.log(w) // ['d', ['c', ['b', ['a']]]]
// 這是一個 reverse 函數

// sharing and identity

const x = list('a', 'b')
const z1 = cons(x, x) 

// z1 ----> [.][.]
//           |  |
//           |  |
//           v  v
// x -----> [.][.] ---> [.][/]
//           |           |
//           |           |
//           v           v
//          [a]         [b]

const z2 = cons(list('a', 'b'), list('a', 'b'))

// z2 ----> [.][.] ---> [.][.] ---> [.][/]
//           |           |           |
//           |           |           |
//           |           v           v
//           |          [a]         [b]
//           |           ^           ^ 
//           |           |           |
//           |           |           |
//            --------- [.][.] ---> [.][/]

// [['a', ['b', null]], ['a', ['b', null]]]

function setToWow(x) {
  setCar(car(x), 'wow')
  return x
}
console.log(z1) // [['a', ['b', null]], ['a', ['b', null]]]
setToWow(z1) // [['wow', ['b', null]], ['wow', ['b', null]]]
console.log(z2) // [['a', ['b', null]], ['a', ['b', null]]]
setToWow(z2) // [['wow', ['b', null]], ['a', ['b', null]]]

// 練習 3.15

// [['wow', ['b', null]], ['wow', ['b', null]]]

// z1 ----> [.][.]
//           |  |
//           |  |
//           v  v
// x -----> [.][.] ---> [.][/]
//           |           |
//           |           |
//           v           v
//         [wow]       [wow]

// [['wow', ['b', null]], ['a', ['b', null]]]

// z2 ----> [.][.] ---> [.][.] ---> [.][/]
//           |           |           |
//           |           |           |
//           |           v           v
//           |          [a]         [b]
//           |                       ^ 
//           |                       |
//           |                       |
//            --------- [.][.] ---> [.][/]
//                       |
//                       |
//                       V
//                     [wow]

// 練習 3.16
function countPairs(x) {
  return !isCons(x) ? 0 : countPairs(car(x)) + countPairs(cdr(x)) + 1
}
// const x3 = list(list(1), 2) // [[1, null], [2, null]]
// console.log(countPairs(x3)) // 3
// const x4 = list(list(1), list(2)) // [[1, null], [[2, null], null]]
// console.log(countPairs(x4)) // 4
// const x4 = list(list(1, 2), 3) // [[1, [2, null]],[3, null]]
// console.log(countPairs(x4)) // 4
// const x7 = list(list(1), 2, list(1, 2, 3)) // [[1, null], [2, [[1, [2, [3, null]]], null]]]
// console.log(countPairs(x3)) // 7
// const xn = list(1, 2)
// setCdr(lastCons(xn), xn)
// console.log(countPairs(xn)) // Uncaught RangeError: Maximum call stack size exceeded


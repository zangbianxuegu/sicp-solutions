// 2.3.1 引号

import { cons, car, cdr, isCons, list } from './utils'

function memq(item, x) {
  return x === null ? false : item === car(x) ? x : memq(item, cdr(x))
}

console.log(memq('apple', list('pear', 'banana', 'prune'))) // false
console.log(
  memq('apple', list('x', list('apple', 'sauce'), 'y', 'apple', 'pear'))
) // ['apple', ['pear', null]]

console.log(list('a', 'b', 'c')) // ['a', ['b', ['c', null]]]
console.log(list(list('george'))) // [['george', null], null]
console.log(cdr(list(list('x1', 'x2'), list('y1', 'y2')))) // [['y1', ['y2', null]], null]
console.log(cdr(car(list(list('x1', 'x2'), list('y1', 'y2'))))) // ['x2', null]
console.log(memq('red', list(list('red', 'shoes'), list('blue', 'socks')))) // false
console.log(memq('red', list('red', 'shoes', 'blue', 'socks'))) // ['red', ['shoes', ['blue', ['socks', null]]]]

function equal(a, b) {
  return (
    a === b ||
    (isCons(a) && isCons(b) && equal(car(a), car(b)) && equal(cdr(a), cdr(b)))
  )
}
console.log(equal(list('a', 'b'), list('a', 'b'))) // true

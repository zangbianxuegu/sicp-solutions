// 求斐波那契數
function fib(n) {
  function fibIter(a, b, count) {
    if (count === 0) {
      return b
    }
    return fibIter(a + b, a, count - 1)
  }
  return fibIter(1, 0, n)
}

// 求最大公約數
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b)
}

// 求平方
function square(x) {
  return x * x
}

// 加
function plus(x, y) {
  return x + y
}

// 乘
function times(x, y) {
  return x * y
}

// 除
function divide(x, y) {
  return x / y
}

// 是否為奇數
function isOdd(x) {
  return x % 2 === 1
}

// 是否為偶數
function isEven(x) {
  return x % 2 === 0
}

// 是否為序對
function isCons(x) {
  return Array.isArray(x)
}

// 用 JavaScript 數組實現的 cons car cdr
function cons(n, d) {
  return [n, d]
}
function car(x) {
  return x[0]
}
function cdr(x) {
  return x[1]
}

// 實現 list
function list() {
  if (arguments.length) {
    return cons(arguments[0], list(...[...arguments].slice(1)) ?? null)
  }
  return null
}

// 第 n 項
function listRef(items, n) {
  return n === 0 ? car(items) : listRef(cdr(items), n - 1)
}

// length：迭代
function length(items) {
  function lengthIter(a, count) {
    return !a ? count : lengthIter(cdr(a), count + 1)
  }
  return lengthIter(items, 0)
}

// append
function append(list1, list2) {
  return !list1 ? list2 : cons(car(list1), append(cdr(list1), list2))
}

// map
function map(proc, items) {
  return !items ? null : cons(proc(car(items)), map(proc, cdr(items)))
}

// 是否在 list 中
function memq(item, x) {
  return x === null ? false : item === car(x) ? x : memq(item, cdr(x))
}

export {
  fib,
  gcd,
  square,
  plus,
  times,
  divide,
  isOdd,
  isEven,
  isCons,
  cons,
  car,
  cdr,
  list,
  listRef,
  length,
  append,
  map,
  memq,
}

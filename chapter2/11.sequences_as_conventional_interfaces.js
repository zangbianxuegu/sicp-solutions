// 2.2.3 序列作為一種約定的界面

import {
  fib,
  square,
  plus,
  times,
  isOdd,
  isEven,
  isCons,
  cons,
  car,
  cdr,
  list,
  map,
} from './utils.js'

// sum odd squares
function sumOddSquares(tree) {
  return !tree
    ? 0
    : !isCons(tree)
    ? isOdd(tree)
      ? square(tree)
      : 0
    : sumOddSquares(car(tree)) + sumOddSquares(cdr(tree))
}

console.log(sumOddSquares(list1)) // 10

// even fibs
function evenFibs(n) {
  function next(k) {
    if (k > n) {
      return null
    } else {
      const f = fib(k)
      if (isEven(f)) {
        return cons(f, next(k + 1))
      } else {
        return next(k + 1)
      }
    }
  }
  return next(0)
}
console.log(evenFibs(6)) // [0, [2, [8, null]]]

// filter
function filter(predicate, sequence) {
  return !sequence
    ? null
    : predicate(car(sequence))
    ? cons(car(sequence), filter(predicate, cdr(sequence)))
    : filter(predicate, cdr(sequence))
}
console.log(filter(isOdd, list(1, 2, 3, 4, 5))) // [1, [3, [5, null]]]

// accumulate
function accumulate(op, initial, sequence) {
  return !sequence
    ? initial
    : op(car(sequence), accumulate(op, initial, cdr(sequence)))
}
console.log(accumulate(plus, 0, list(1, 2, 3, 4, 5))) // 15

// enumerate interval
function enumerateInterval(low, high) {
  return low > high ? null : cons(low, enumerateInterval(low + 1, high))
}
console.log(enumerateInterval(2, 7)) // [2, [3, [4, [5, [6, [7, null]]]]]]

// enumerate tree
function enumerateTree(tree) {
  return !tree
    ? null
    : !isCons(tree)
    ? list(tree)
    : append(enumerateTree(car(tree)), enumerateTree(cdr(tree)))
}
console.log(enumerateTree(list(1, list(2, list(3, 4)), 5))) // [1, [2, [3, [4, [5, null]]]]]

// sum odd squares
function sumOddSquares(tree) {
  return accumulate(plus, 0, map(square, filter(isOdd, enumerateTree(tree))))
}
console.log(sumOddSquares(list(list(2, 3), list(4, 5)))) // 34

// even fibs
function evenFibs(n) {
  return accumulate(
    cons,
    null,
    filter(isEven, map(fib, enumerateInterval(0, n)))
  )
}
console.log(evenFibs(6)) // [0, [2, [8, null]]]

// a list of the squares of the first n+1 Fibonacci numbers
function listFibSqures(n) {
  return accumulate(cons, null, map(square, map(fib, enumerateInterval(0, n))))
}
console.log(listFibSqures(10)) // [0, [1, [1, [4, [9, [25, [64, [169, [441, [1156, [3025, null]]]]]]]]]]]

// the product of the squares of the odd integers in a sequence
function productOfSquaresOfOddElements(sequence) {
  return accumulate(times, 1, map(square, filter(isOdd, sequence)))
}
console.log(productOfSquaresOfOddElements(list(1, 2, 3, 4, 5))) // 255

// 練習 2.33
// 用 accumulate 實現 map
function map(p, sequence) {
  return accumulate((x, y) => cons(p(x), y), null, sequence)
}

// 用 accumulate 實現 append
function append(seq1, seq2) {
  return accumulate(cons, seq2, seq1)
}

// 用 accumulate 實現 length
function length(sequence) {
  return accumulate((x, y) => y + 1, 0, sequence)
}

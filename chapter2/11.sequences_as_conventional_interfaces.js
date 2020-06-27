// 2.2.3 序列作為一種約定的界面

import {
  fib,
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
  length,
  append,
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

// 練習 2.34: 多項式求值
// 1 + 3x + 5x^3 + x^5
function hornerEval(x, coefficientSequence) {
  return accumulate(
    (thisCoeff, higherTerm) => thisCoeff + x * higherTerm,
    0,
    coefficientSequence
  )
}
console.log(hornerEval(2, list(1, 3, 0, 5, 0, 1))) // 79

// 練習 2.35: 用 accumulate 實現 countLeaves
function countLeaves(t) {
  return accumulate(
    plus,
    0,
    map((subTree) => (isCons(subTree) ? countLeaves(subTree) : 1), t)
  )
}
console.log(countLeaves(list(1, list(2, list(3, 4)), 5))) // 5

// 練習 2.36: accumulateN
function accumulateN(op, init, seqs) {
  return car(seqs) === null
    ? null
    : cons(
        accumulate(
          op,
          init,
          map((x) => car(x), seqs)
        ),
        accumulateN(
          op,
          init,
          map((x) => cdr(x), seqs)
        )
      )
}
const s = list(list(1, 2, 3), list(4, 5, 6), list(7, 8, 9), list(10, 11, 12))
console.log(s) // [22, [26, [30, null]]]

// 練習 2.37: 矩陣運算
function dotProduct(v, w) {
  return accumulate(plus, 0, accumulateN(times, 1, list(v, w)))
}
function matrixTimesVector(m, v) {
  return map((row) => dotProduct(row, v), m)
}
function transpose(mat) {
  return accumulateN(cons, null, mat)
}
function matrixTimesMatrix(m, n) {
  const cols = transpose(n)
  return map((x) => map((y) => dotProduct(x, y), cols), m)
}

// 練習 2.38: fold left
const foldRight = accumulate
function foldLeft(op, initial, sequence) {
  function iter(result, rest) {
    return rest === null ? result : iter(op(result, car(rest)), cdr(rest))
  }
  return iter(initial, sequence)
}
console.log(foldRight(divide, 1, list(1, 2, 3))) // 1.5
console.log(foldLeft(divide, 1, list(1, 2, 3))) // 0.16666666666666666
console.log(foldRight(list, null, list(1, 2, 3))) // [1, [[2, [[3, [null, null]], null]], null]]
console.log(foldLeft(list, null, list(1, 2, 3))) // [[[null, [1, null]], [2, null]], [3, null]]

// 練習 2.39: 分別用 foldLeft 和 foldRight 實現 reverse
function reverse1(sequence) {
  return foldRight((x, y) => append(y, list(x)), null, sequence)
}
function reverse2(sequence) {
  return foldLeft((x, y) => cons(y, x), null, sequence)
}
console.log(reverse1(list(1, 2, 3, 4))) // [4, [3, [2, [1, null]]]]
console.log(reverse2(list(1, 2, 3, 4))) // [4, [3, [2, [1, null]]]]

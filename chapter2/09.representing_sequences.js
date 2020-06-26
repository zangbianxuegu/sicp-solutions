// 2.2.1 序列的表示

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
}
const list1 = list(1, 2, 3, 4)
console.log(list1)

// 第 n 項
function listRef(items, n) {
  return n === 0 ? car(items) : listRef(cdr(items), n - 1)
}
console.log(listRef(list1, 2))

// length：遞歸
function length(items) {
  return !items ? 0 : length(cdr(items)) + 1
}
console.log(length(list1))
const list2 = list()
console.log(length(list2))

// length：迭代
function length(items) {
  function lengthIter(a, count) {
    return !a ? count : lengthIter(cdr(a), count + 1)
  }
  return lengthIter(items, 0)
}
console.log(length(list1))

// append
function append(list1, list2) {
  return !list1 ? list2 : cons(car(list1), append(cdr(list1), list2))
}
const list3 = list(5, 6, 7, 8)
console.log(append(list1, list3))

// 練習 2.17
function lastPair(list) {
  return !cdr(list) ? car(list) : lastPair(cdr(list))
}
const list4 = list(23, 72, 149, 34)
console.log(lastPair(list4))

// 練習 2.18
function reverse(list) {
  return !list ? null : append(reverse(cdr(list)), cons(car(list), null))
}
function reverse(list) {
  function reverseIter(list, res) {
    return !list ? res : reverseIter(cdr(list), cons(car(list), res))
  }
  return reverseIter(list, null)
}
const list5 = list(1, 4, 9, 16, 25)
console.log(reverse(list5))

// 練習 2.19
function cc(amount, coinValues) {
  return amount === 0
    ? 1
    : amount < 0 || noMore(coinValues)
    ? 0
    : cc(amount, exceptFirstDenomination(coinValues)) +
      cc(amount - firstDenomination(coinValues), coinValues)
}
function firstDenomination(coinValues) {
  return car(coinValues)
}
function exceptFirstDenomination(coinValues) {
  return cdr(coinValues)
}
function noMore(coinValues) {
  return !coinValues
}
const us_coins = list(1, 25, 10, 5, 50)
const uk_coins = list(100, 50, 20, 10, 5, 2, 1, 0.5)
console.log(cc(100, us_coins))
console.log(cc(100, uk_coins))

// 對表的映射
// scale list
function scaleList(items, factor) {
  return !items
    ? null
    : cons(car(items) * factor, scaleList(cdr(items), factor))
}
const list6 = list(1, 2, 3, 4, 5)
console.log(scaleList(list6, 10))

// map
function map(proc, items) {
  return !items ? null : cons(proc(car(items)), map(proc, cdr(items)))
}
const list7 = list(-10, 2.5, -11.6, 17)
console.log(map(Math.abs, list7))
console.log(map((x) => x * x, list1))

// new scale list
function scaleList(items, factor) {
  return map((x) => x * factor, items)
}
console.log(scaleList(list6, 10))

// 練習 2.21
function squareList(list) {
  return list ? cons(Math.pow(car(list), 2), squareList(cdr(list))) : null
}
console.log(squareList(list1))
function squareList(list) {
  return map((x) => x * x, list)
}
console.log(squareList(list1))

// 練習 2.22
// 錯誤 1
function squareList(list) {
  function iter(things, ans) {
    return things ? iter(cdr(things), cons(Math.pow(car(things), 2), ans)) : ans
  }
  return iter(list, null)
}
console.log(squareList(list1))
// 錯誤 2
function squareList(list) {
  function iter(things, ans) {
    return things ? iter(cdr(things), cons(ans, Math.pow(car(things), 2))) : ans
  }
  return iter(list, null)
}
console.log(squareList(list1))
// 正確
function squareList(list) {
  function iter(things, ans) {
    return things
      ? iter(cdr(things), append(ans, cons(Math.pow(car(things), 2), null)))
      : ans
  }
  return iter(list, null)
}
console.log(squareList(list1))

// 練習 2.23
function forEach1(proc, list) {
  if (list) {
    proc(car(list))
    forEach1(proc, cdr(list))
  }
}

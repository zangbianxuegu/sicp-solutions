// 2.1.4 擴展練習：區間算術
// 練習 2.7 2.8 2.10 2.14

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

// make interval
// 構造函數
function makeInterval(a, b) {
  return cons(a, b)
}
// 選擇函數
function lowerBound(x) {
  return car(x)
}
function upperBound(x) {
  return cdr(x)
}
// 加法
function addInterval(x, y) {
  return makeInterval(
    lowerBound(x) + lowerBound(y),
    upperBound(x) + upperBound(y)
  )
}
// 減法
function subInterval(x, y) {
  return makeInterval(
    lowerBound(x) - upperBound(y),
    upperBound(x) - lowerBound(y)
  )
}
// 乘法
function mulInterval(x, y) {
  const p1 = lowerBound(x) * lowerBound(y)
  const p2 = lowerBound(x) * upperBound(y)
  const p3 = upperBound(x) * lowerBound(y)
  const p4 = upperBound(x) * upperBound(y)
  return makeInterval(Math.min(p1, p2, p3, p4), Math.max(p1, p2, p3, p4))
}
// 除法
function divInterval(x, y) {
  if (lowerBound(y) <= 0 && upperBound(y) >= 0) {
    throw 'Division error: interval spans 0'
  }
  return mulInterval(x, makeInterval(1 / upperBound(y), 1 / lowerBound(y)))
}

const i1 = makeInterval(1, 2)
const i2 = makeInterval(3, 4)
console.log(addInterval(i1, i2)) // [4, 6]
console.log(subInterval(i1, i2)) // [-3, -1]
console.log(mulInterval(i1, i2)) // [3, 8]
console.log(divInterval(i1, i2)) // [0.25, 0.6666666666666666]

// make center width
// constructor
function makeCenterWith(c, w) {
  return makeInterval(c - w, c + w)
}
// selector
function center(i) {
  return (upperBound(i) + lowerBound(i)) / 2
}
function width(i) {
  return (upperBound(i) - lowerBound(i)) / 2
}

// make center percent
// constructor
function makeCenterPercent(c, p) {
  return makeInterval(c - (c * p) / 100, c + (c * p) / 100)
}
// selector
function percent(i) {
  return (width(i) / center(i)) * 100
}

// 並聯電阻
function par1(r1, r2) {
  return divInterval(mulInterval(r1, r2), addInterval(r1, r2))
}
function par2(r1, r2) {
  const one = makeInterval(1, 1)
  return divInterval(
    one,
    addInterval(divInterval(one, r1), divInterval(one, r2))
  )
}
console.log(par1(i1, i2)) // [0.5, 2]
console.log(par2(i1, i2)) // [0.75, 1.3333333333333333]
const i5 = makeCenterWith(10000, 1)
const i6 = makeInterval(1, 2)
console.log(divInterval(i5, i5)) // [0.5, 2]
console.log(divInterval(i6, i6)) // [0.9998000199980003, 1.0002000200020003]

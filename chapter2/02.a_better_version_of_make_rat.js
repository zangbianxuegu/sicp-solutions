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
// 構造有理數
function makeRat(n, d) {
  return cons(n, d)
}
function numer(x) {
  return car(x)
}
function denom(x) {
  return cdr(x)
}
// 有理數運算
function addRat(x, y) {
  return makeRat(numer(x) * denom(y) + numer(y) * denom(x), denom(x) * denom(y))
}
function subRat(x, y) {
  return makeRat(numer(x) * denom(y) - numer(y) * denom(x), denom(x) * denom(y))
}
function mulRat(x, y) {
  return makeRat(numer(x) * numer(y), denom(x) * denom(y))
}
function divRat(x, y) {
  return makeRat(numer(x) * denom(y), denom(x) * numer(y))
}
function equalRat(x, y) {
  return numer(x) * denom(y) === numer(y) * denom(x)
}
// 打印
function printRat(x) {
  console.log(numer(x) + '/' + denom(x))
}
const oneHalf = makeRat(1, -2)
const oneThird = makeRat(-1, -3)
printRat(oneHalf) // -1/2
printRat(oneThird) // 1/3
printRat(addRat(oneHalf, oneThird)) // -1/6
printRat(mulRat(oneHalf, oneThird)) // -1/6
printRat(addRat(oneThird, oneThird)) // 2/3
// 求最大公約數
function gcd(a, b) {
  if (b === 0) {
    return a
  }
  return gcd(b, a % b)
}
// 一個更好的版本
function makeRat(n, d) {
  let g = gcd(n, d)
  if (g < 0) {
    g = -g
  }
  if (d < 0) {
    return cons(-n / g, -d / g)
  } else {
    return cons(n / g, d / g)
  }
}

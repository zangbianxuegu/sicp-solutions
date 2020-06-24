// 用非負整數和算術運算表示序對
function cons(a, b) {
  return Math.pow(2, a) * Math.pow(3, b)
}
function car(x) {
  return x % 2 === 0 ? car(x / 2) + 1 : 0
}
function cdr(x) {
  return x % 3 === 0 ? cdr(x / 3) + 1 : 0
}
const c1 = cons(4, 3)
console.log(car(c1)) // 4
console.log(cdr(c1)) // 3

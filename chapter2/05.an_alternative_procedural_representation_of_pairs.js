// 練習 2.4 序对的另一种过程性表示方式
function cons(x, y) {
  return (m) => m(x, y)
}
function car(z) {
  return z((p, q) => p)
}
function cdr(z) {
  return z((p, q) => q)
}
const c1 = cons(3, 4)
console.log(car(c1))
console.log(cdr(c1))

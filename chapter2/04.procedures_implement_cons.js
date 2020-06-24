// 过程实现序对
function cons(x, y) {
  return (m) => {
    if (m === 0) {
      return x
    } else if (m === 1) {
      return y
    } else {
      throw 'Argument not 0 or 1 -- CONS, ' + m
    }
  }
}
function car(z) {
  return z(0)
}
function cdr(z) {
  return z(1)
}
let c1 = cons(1, 2)
console.log(c1)
console.log(car(c1))
console.log(cdr(c1))

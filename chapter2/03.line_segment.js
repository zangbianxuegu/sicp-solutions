// 練習 2.2 平面线段中点
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
// constructor
function makePoint(x, y) {
  return cons(x, y)
}
// selector
function xPoint(p) {
  return car(p)
}
function yPoint(p) {
  return cdr(p)
}
// constructor
function makeSegment(start, end) {
  return cons(start, end)
}
// selector
function startSegment(segment) {
  return car(segment)
}
function endSegment(segment) {
  return cdr(segment)
}
function midPointSegment(segment) {
  const start = startSegment(segment)
  const end = endSegment(segment)
  return makePoint(
    (xPoint(start) + xPoint(end)) / 2,
    (yPoint(start) + yPoint(end)) / 2
  )
}
function printPoint(p) {
  console.log('(' + xPoint(p) + ',' + yPoint(p) + ')')
}
const point1 = makePoint(2, 3)
printPoint(point1) // (2,3)
const point2 = makePoint(4, 5)
const segment = makeSegment(point1, point2)
const point3 = midPointSegment(segment)
printPoint(point3) // (3,4)

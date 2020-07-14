// 2.4.1 複數的表示

import { square, car, cdr, cons } from './utils.js'

function addComplex(z1, z2) {
  return makeFromRealImag(
    realPart(z1) + realPart(z2),
    imagPart(z1) + imagPart(z2)
  )
}

function subComplex(z1, z2) {
  return makeFromRealImag(
    realPart(z1) - realPart(z2),
    imagPart(z1) - imagPart(z2)
  )
}

function mulComplex(z1, z2) {
  return makeFromMagAng(magnitude(z1) * magnitude(z2), angle(z1) + angle(z2))
}

function divComplex(z1, z2) {
  return makeFromMagAng(magnitude(z1) / magnitude(z2), angle(z1) - angle(z2))
}

// 直角坐標表示
function realPart(z) {
  return car(z)
}

function imagPart(z) {
  return cdr(z)
}

function magnitude(z) {
  return Math.sqrt(square(realPart(z)) + square(imagPart(z)))
}

function angle(z) {
  return Math.atan(imagPart(z), realPart(z))
}

function makeFromRealImag(x, y) {
  return cons(x, y)
}

function makeFromMagAng(r, a) {
  return cons(r * Math.cos(a), r * Math.sin(a))
}

// 極坐標表示
function realPart(z) {
  return magnitude(z) * Math.cos(angle(z))
}

function imagPart(z) {
  return magnitude(z) * Math.sin(angle(z))
}

function magnitude(z) {
  return car(z)
}

function angle(z) {
  return cdr(z)
}

function makeFromRealImag (x, y) {
  return cons(Math.sqrt(square(x), square(y)), Math.atan(y, x))
}

function makeFromMagAng(r, a) {
  return cons(r, a)
}


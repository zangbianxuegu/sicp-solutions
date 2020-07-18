// 2.4.1 帶標誌數據

import { square, car, cdr, cons, isCons } from '../utils.js'

function attachTag(typeTag, contents) {
  return cons(typeTag, contents)
}

function typeTag(datum) {
  if (isCons(datum)) {
    return car(datum)
  }
}

function contents(datum) {
  if (isCons(datum)) {
    return cdr(datum)
  }
}

function isRectangular(z) {
  return typeTag(z) === 'rectangular'
}

function isPolar(z) {
  return typeTag(z) === 'isPolar'
}

// 直角坐標表示
function realPartRectangular(z) {
  return car(z)
}

function imagPartRectangular(z) {
  return cdr(z)
}

function magnitudeRectangular(z) {
  return Math.sqrt(
    square(realPartRectangular(z)) + square(imagPartRectangular(z))
  )
}

function angleRectangular(z) {
  return Math.atan(imagPartRectangular(z), realPartRectangular(z))
}

function makeFromRealImagRectangular(x, y) {
  return attachTag('rectangular', cons(x, y))
}

function makeFromMagAngRectangular(r, a) {
  return attachTag('rectangular', cons(r * Math.cos(a), r * Math.sin(a)))
}

// 極坐標表示
function realPartPolar(z) {
  return magnitudePolar(z) * Math.cos(anglePolar(z))
}

function imagPartPolar(z) {
  return magnitudePolar(z) * Math.sin(anglePolar(z))
}

function magnitudePolar(z) {
  return car(z)
}

function anglePolar(z) {
  return cdr(z)
}

function makeFromRealImagPolar(x, y) {
  return attachTag(
    'isPolar',
    cons(Math.sqrt(square(x), square(y)), Math.atan(y, x))
  )
}

function makeFromMagAngPolar(r, a) {
  return attachTag('isPolar', cons(r, a))
}

function realPart(z) {
  if (isRectangular(z)) {
    return realPartRectangular(contents(z))
  } else if (isPolar(z)) {
    return realPartPolar(contents(z))
  } else {
    throw Error('Unknown type -- REAL-PART') 
  }
}

function imagPart(z) {
  if (isRectangular(z)) {
    return imagPartRectangular(contents(z))
  } else if (isPolar(z)) {
    return imagPartPolar(contents(z))
  } else {
    throw Error('Unknown type -- IMAG-PART')
  }
}

function magnitude(z) {
  if (isRectangular(z)) {
    return magnitudeRectangular(contents(z))
  } else if (isPolar(z)) {
    return magnitudePolar(contents(z))
  } else {
    throw Error('Unknown type -- MAGNITUDE')
  }
}

function angle(z) {
  if (isRectangular(z)) {
    return angleRectangular(contents(z))
  } else if (isPolar(z)) {
    return anglePolar(contents(z))
  } else {
    throw Error('Unknown type -- ANGLE')
  }
}
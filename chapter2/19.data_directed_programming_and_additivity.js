// 2.4.3 數據導向的程序設計和可加性

import { square, car, cdr, cons, isCons, map } from './utils.js'

// 直角坐標表示
function installRectangularPackage() {
  // internal procedures
  function realPart(z) {
    return car(z)
  }
  function imagPart(z) {
    return cdr(z)
  }
  function makeFromRealImag(x, y) {
    return cons(x, y)
  }
  function magnitude(z) {
    return Math.sqrt(square(realPart(z)) + square(imagPart(z)))
  }
  function angle(z) {
    return Math.atan(imagPart(z), realPart(z))
  }
  function makeFromMagAng(r, a) {
    return cons(r * Math.cos(a), r * Math.sin(a))
  }
  // interface to the rest of the system
  function tag(x) {
    return attachTag('rectangular', x)
  }
  put('realPart', list('rectangular'), realPart)
  put('imagPart', list('rectangular'), imagPart)
  put('magnitude', list('rectangular'), magnitude)
  put('angle', list('rectangular'), angle)
  put('makeFromRealImag', 'rectangular', (x, y) => tag(makeFromRealImag(x, y)))
  put('makeFromMagAng', 'rectangular', (r, a) => tag(makeFromMagAng(r, a)))
  return 'done'
}

// 極坐標表示
function installPolarPackage() {
  // internal procedures
  function magnitude(z) {
    return car(z)
  }
  function angle(z) {
    return cdr(z)
  }
  function makeFromMagAng(r, a) {
    return cons(r, a)
  }
  function realPart(z) {
    return magnitude(z) * Math.cos(angle(z))
  }
  function imagPart(z) {
    return magnitude(z) * Math.sin(angle(z))
  }
  function makeFromRealImag(x, y) {
    return cons(Math.sqrt(square(x), square(y)), Math.atan(y, x))
  }
  // interface to the rest of the system
  function tag(x) {
    return attachTag('polar', x)
  }
  put('realPart', list('polar'), realPart)
  put('imagPart', list('polar'), imagPart)
  put('magnitude', list('polar'), magnitude)
  put('angle', list('polar'), angle)
  put('makeFromRealImag', 'polar', (x, y) => tag(makeFromRealImag(x, y)))
  put('makeFromMagAng', 'polar', (r, a) => tag(makeFromMagAng(r, a)))
  return 'done'
}

function applyGeneric(op, args) {
  const typeTags = map(typeTag, args)
  const proc = get(op, typeTags)
  if (proc) {
    apply(proc, map(contents, args))
  } else {
    throw Error(
      'No method for these types -- APPLY-GENERIC',
      list(op, typeTags)
    )
  }
}

function makeFromRealImag(x, y) {
  function dispatch(op) {
    return op === 'realPart'
      ? x
      : op === 'imagPart'
      ? y
      : op === 'magnitude'
      ? Math.sqrt(square(x) + square(y))
      : op === 'angle'
      ? Math.atan(y, x)
      : error(op, 'Unknown op -- makeFromRealImag')
  }
  return dispatch
}

function makeFromMagAng(r, a) {
  function dispatch(op) {
    return op === 'realPart'
      ? r * Math.cos(a)
      : op === 'imagPart'
      ? r * Math.sin(a)
      : op === 'magnitude'
      ? r
      : op === 'angle'
      ? a
      : error(op, 'Unknown op -- makeFromRealImag')
  }
  return dispatch
}

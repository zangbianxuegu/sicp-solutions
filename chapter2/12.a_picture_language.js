// 2.2.4 一個圖形語言

import { cons, car, cdr, list, listRef } from './utils'

// const wave2 = beside(wave, flipVert(wave))
// const wave4 = below(wave2, wave2)

function flippedPairs(painter) {
  const painter2 = beside(painter, flipVert(painter))
  return below(painter2, painter2)
}
const wave4 = flippedPairs(wave)

function rightSplit(painter, n) {
  if (n === 0) {
    return painter
  } else {
    const smaller = rightSplit(painter, n - 1)
    return beside(painter, below(smaller, smaller))
  }
}

function upSplit(painter, n) {
  if (n === 0) {
    return painter
  } else {
    const smaller = upSplit(painter, n - 1)
    return below(painter, beside(smaller, smaller))
  }
}

function cornerSplit(painter, n) {
  if (n === 0) {
    return painter
  } else {
    const up = upSplit(painter, n - 1)
    const right = rightSplit(painter, n - 1)
    const topLeft = beside(up, up)
    const bottomRight = below(right, right)
    const corner = cornerSplit(painter, n - 1)
    return beside(below(painter, topLeft), below(bottomRight, corner))
  }
}

function squareLimit(painter, n) {
  const quarter = cornerSplit(painter, n)
  const half = beside(flipHoriz(quarter), quarter)
  return below(flipVert(half), half)
}

function squareOfFour(tl, tr, bl, br) {
  return (painter) => {
    const top = beside(tl(painter), tr(painter))
    const bottom = beside(bl(painter), br(painter))
    return below(bottom, top)
  }
}

function identity(painter) {
  return painter
}

function flippedPairs(painter) {
  return squareOfFour(identity, flipVert, identity, flipVert)
}

function squareLimit(painter, n) {
  const combine4 = squareOfFour(flipHoriz, identity, rotate180, flipVert)
  return combine4(cornerSplit(painter, n))
}

function split(proc1, proc2) {
  return splitHelper
  function splitHelper(painter, n) {
    if (n === 0) {
      return painter
    } else {
      const smaller = splitHelper(painter, n - 1)
      return proc1(painter, proc2(smaller, smaller))
    }
  }
}
const rightSplit = split(beside, below)
const upSplit = split(below, beside)

function makeFrame(origin, edge1, edge2) {
  return list(origin, edge11, edge2)
}

function originFrame(frame) {
  return listRef(frame, 0)
}

function edge1Frame(frame) {
  return listRef(frame, 1)
}

function edge2Frame(frame) {
  return listRef(frame, 2)
}

function makeFrame(origin, edge1, edge2) {
  return cons(origin, cons(edge1, edge2))
}

function originFrame(frame) {
  return car(frame)
}

function edge1Frame(frame) {
  return car(cdr(frame))
}

function edge2Frame(frame) {
  return cdr(cdr(frame))
}

function makeVect(x, y) {
  return cons(x, y)
}

function xcorVect(vect) {
  return car(vect)
}

function ycorVect(vect) {
  return cdr(vect)
}

function addVect(vect1, vect2) {
  return makeVect(
    xcorVect(vect1) + xcorVect(vect2),
    ycorVect(vect1) + ycorVect(vect2)
  )
}

function subVect(vect1, vect2) {
  return makeVect(
    xcorVect(vect1) - xcorVect(vect2),
    ycorVect(vect1) - ycorVect(vect2)
  )
}

function scaleVect(factor, vect) {
  return makeVect(factor * xcorVect(vect), factor * ycorVect(vect))
}

function frameCoordMap(frame) {
  return (v) => {
    addVect(
      originFrame(frame),
      addVect(
        scaleVect(xcorVect(v), edge1Frame(frame)),
        scaleVect(ycorVect(v), edge2Frame(frame))
      )
    )
  }
}
// frameCoordMap(aFrame)(makeVect(0, 0))

function makeSegment(start, end) {
  return cons(start, end)
}
function startSegment(segment) {
  return car(segment)
}
function endSegment(segment) {
  return cdr(segment)
}

function drawLine(start, end) {
  console.log(start)
  console.log(end)
}

function forEach(proc, list) {
  if (list) {
    proc(car(list))
    forEach(proc, cdr(list))
  }
}

function segmentsToPainter(segmentList) {
  return (frame) => {
    forEach((segment) => {
      drawLine(
        frameCoordMap(frame)(startSegment(segment)),
        frameCoordMap(frame)(endSegment(segment))
      )
    }, segmentList)
  }
}

function transformPainter(painter, origin, corner1, corner2) {
  return (frame) => {
    const m = frameCoordMap(frame)
    const newOrigin = m(origin)
    return painter(
      makeFrame(
        newOrigin,
        subVect(m(corner1), newOrigin),
        subVect(m(corner2), newOrigin)
      )
    )
  }
}

function flipVert(painter) {
  return transformPainter(
    painter,
    makeVect(0, 1),
    makeVect(1, 1),
    makeVect(0, 0)
  )
}

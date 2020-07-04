// 2.3.4 實例: Huffman 編碼樹

import { car, cdr, list, append, cons } from './utils.js'

function makeLeaf(symbol, weight) {
  return list('leaf', symbol, weight)
}

function isLeaf(object) {
  return car(object) === 'leaf'
}

function symbolLeaf(x) {
  return car(cdr(x))
}

function weightLeaf(x) {
  return car(cdr(cdr(x)))
}

function makeCodeTree(left, right) {
  return list(
    left,
    right,
    append(symbol(left), symbol(right)),
    weight(left) + weight(right)
  )
}

function leftBranch(tree) {
  return car(tree)
}

function rightBranch(tree) {
  return car(cdr(tree))
}

function symbols(tree) {
  return isLeaf(tree) ? list(symbolLeaf(tree)) : car(cdr(cdr(tree)))
}

function weight(tree) {
  return isLeaf(tree) ? weightLeaf(tree) : car(cdr(cdr(cdr(tree))))
}

function decode(bits, tree) {
  function decodeL(bits, currentBranch) {
    if (bits === null) {
      return list()
    }
    let nextBranch = chooseBranch(car(bits), currentBranch)
    if (isLeaf(nextBranch)) {
      return cons(symbolLeaf(nextBranch), decodeL(cdr(bits), nextBranch))
    } else {
      return decodeL(cdr(bits), nextBranch)
    }
  }
  function chooseBranch(bit, branch) {
    if (bit === 0) {
      return leftBranch(branch)
    } else if (bit === 1) {
      return rightBranch(branch)
    } else {
      throw Error('bad bit -- CHOOSE-BRANCH')
    }
  }
  return decodeL(bits, tree)
}

function adjoinSet(x, set) {
  return set === null
    ? list(x)
    : weight(x) < weight(car(set))
    ? cons(x, set)
    : cons(car(set), adjoinSet(x, cdr(set)))
}

function makeleafSet(pairs) {
  if (pairs === null) {
    return list()
  }
  const pair = car(pairs)
  return adjoinSet(makeLeaf(car(pair), car(cdr(pair))), makeleafSet(cdr(pairs)))
}

// 練習 2.67
const sampleTree = makeCodeTree(
  makeLeaf('A', 4),
  makeCodeTree(
    makeLeaf('B', 2),
    makeCodeTree(makeLeaf('D', 1), makeLeaf('C', 1))
  )
)

const sampleMessage = list(0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0)
console.log(decode(sampleMessage, sampleTree)) // ['A', ['D', ['A', ['B', ['B', ['C', ['A', null]]]]]]]

// 2.2.2 層次性結構

import {
  square,
  isCons,
  cons,
  car,
  cdr,
  list,
  length,
  append,
} from '../utils.js'

// 樹葉的數目
const x = cons(list(1, 2), list(3, 4))
console.log(length(x)) // 3
function countLeaves(x) {
  if (!x) {
    return 0
  } else if (!isCons(x)) {
    return 1
  } else {
    return countLeaves(car(x)) + countLeaves(cdr(x))
  }
}
console.log(countLeaves(x)) // 4

// 練習 2.24
const x1 = list(1, list(2, list(3, 4)))
console.log(x1) // [1, [[2, [[3, [4, null]], null]], null]]
//   [1, [[2, [[3, [4, null]], null]], null]]
//   /    \
//  /      \
// /        \
// 1        [[2, [[3, [4, null]], null]], null]
//           /    \
//          /      \
//         2       [[3, [4, null]], null]
//                  /    \
//                 /      \
//                3       [4, null]

// 練習 2.25
// 取出 7
const list2251 = list(1, 3, list(5, 7), 9)
const list2252 = list(list(7))
const list2253 = list(1, list(2, list(3, list(4, list(5, list(6, list(7)))))))
console.log(car(cdr(car(cdr(cdr(list2251)))))) // 7
console.log(car(car(list2252))) // 7
console.log(
  car(car(cdr(car(cdr(car(cdr(car(cdr(car(cdr(car(cdr(list2253)))))))))))))
) // 7

// 練習 2.26
// 打印結果
const list2261 = list(1, 2, 3)
const list2262 = list(4, 5, 6)
console.log(append(list2261, list2262)) // [1, [2, [3, [4, [5, [6, null]]]]]]
console.log(cons(list2261, list2262)) // [[1, [2, [3, null]]], [4, [5, [6, null]]]]
console.log(list(list2261, list2262)) // [[1, [2, [3, null]]], [[4, [5, [6, null]]], null]]

// 練習 2.27
// deep reverse
function reverse(list) {
  return !list ? null : append(reverse(cdr(list)), cons(car(list), null))
}
function deepReverse(list) {
  return !list
    ? null
    : isCons(list)
    ? append(deepReverse(cdr(list)), cons(deepReverse(car(list), null)))
    : list
}
const list227 = list(list(1, 2), list(3, 4))
console.log(reverse(list227))
console.log(deepReverse(list227))

// 練習 2.28
// 樹葉列表
function fringe(x) {
  return !x
    ? null
    : isCons(x)
    ? append(fringe(car(x)), fringe(cdr(x)))
    : list(x)
}
const list228 = list(list(1, 2), list(3, 4))
console.log(fringe(list228)) // [1, [2, [3, [4, null]]]]

// 練習 2.29
// 二叉活動體
function makeMobile(left, right) {
  return list(left, right)
}
function makeBranch(length, structure) {
  return list(length, structure)
}
function leftBranch(mobile) {
  return car(mobile)
}
function rightBranch(mobile) {
  return car(cdr(mobile))
}
function branchLength(branch) {
  return car(branch)
}
function branchStructure(branch) {
  return car(cdr(branch))
}
function isWeight(x) {
  return typeof x === 'number'
}
function totalWeight(mobile) {
  return isWeight(mobile)
    ? mobile
    : totalWeight(branchStructure(leftBranch(x))) +
        totalWeight(branchStructure(rightBranch(x)))
}
function isBalanced(mobile) {
  return (
    isWeight(mobile) ||
    (isBalanced(branchStructure(leftBranch(mobile))) &&
      isBalanced(branchStructure(rightBranch(mobile))) &&
      totalWeight(branchStructure(leftBranch(mobile))) *
        branchLength(leftBranch(mobile)) ===
        totalWeight(branchStructure(rightBranch(mobile))) *
          branchLength(rightBranch(mobile)))
  )
}
function makeMobile(left, right) {
  return cons(left, right)
}
function makeBranch(length, structure) {
  return cons(length, structure)
}
function leftBranch(mobile) {
  return car(mobile)
}
function rightBranch(mobile) {
  return cdr(mobile)
}
function branchLength(branch) {
  return car(branch)
}
function branchStructure(branch) {
  return cdr(branch)
}

// mapping over trees
function scaleTree(tree, factor) {
  return !tree
    ? null
    : !isCons(tree)
    ? tree * factor
    : cons(scaleTree(car(tree), factor), scaleTree(cdr(tree), factor))
}
const tree1 = list(1, list(2, list(3, 4), 5), list(6, 7))
console.log(scaleTree(tree1, 10))

// map
function map(proc, items) {
  return !items ? null : cons(proc(car(items)), map(proc, cdr(items)))
}

function scaleTree(tree, factor) {
  return map(
    (subTree) =>
      isCons(subTree) ? scaleTree(subTree, factor) : subTree * factor,
    tree
  )
}
console.log(scaleTree(tree1, 10))

// 練習 2.30
// square tree
function squareTree(tree) {
  return !tree
    ? null
    : isCons(tree)
    ? cons(squareTree(car(tree)), squareTree(cdr(tree)))
    : square(tree)
}
function squareTree(tree) {
  return map(
    (subTree) => (isCons(subTree) ? squareTree(subTree) : square(subTree)),
    tree
  )
}
console.log(squareTree(tree1))

// 練習 2.31
// 進一步抽象
function squareTree(tree) {
  function treeMap(proc, tree) {
    return map(
      (subTree) => (isCons(subTree) ? treeMap(proc, subTree) : proc(subTree)),
      tree
    )
  }
  return treeMap(square, tree)
}

// 練習 2.32
// all subsets
// (1 2 3)
// (null (3) (2) (2 3) (1) (1 3) (1 2) (1 2 3))
function subsets(s) {
  if (!s) {
    return list(null)
  } else {
    const rest = subsets(cdr(s))
    return append(
      rest,
      map((x) => cons(car(s), x), rest)
    )
  }
}
const list232 = list(1, 2, 3)
console.log(subsets(list232)) // [null, [[3, null], [[2, null], [[2, [3, null]], [[1, null], [[1, [3, null]], [[1, [2, null]], [[1, [2, [3, null]]], null]]]]]]]]

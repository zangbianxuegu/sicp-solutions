// 2.2.2 層次性結構

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

// 實現 list
function list() {
  if (arguments.length) {
    return cons(arguments[0], list(...[...arguments].slice(1)) ?? null)
  }
}
const list1 = list(1, 2, 3, 4)
console.log(list1)

// length：遞歸
function length(items) {
  return !items ? 0 : length(cdr(items)) + 1
}
console.log(length(list1))
const list2 = list()
console.log(length(list2))

// append
function append(list1, list2) {
  return !list1 ? list2 : cons(car(list1), append(cdr(list1), list2))
}
const list3 = list(5, 6, 7, 8)
console.log(append(list1, list3))

// 樹葉的數目
const x = cons(list(1, 2), list(3, 4))
console.log(length(x))
// 判斷是否為序對
function isCons(x) {
  return Array.isArray(x)
}
function countLeaves(x) {
  if (!x) {
    return 0
  } else if (!isCons(x)) {
    return 1
  } else {
    return countLeaves(car(x)) + countLeaves(cdr(x))
  }
}
console.log(countLeaves(x))

// 練習 2.24
const x1 = list(1, list(2, list(3, 4)))
console.log(x1) // [1, [[2, [[3, [4, null]], null]], null]]
//   [1, [[2, [[3, [4, null]], null]], null]]
//   /    \
//  /      \
// /        \
//   1      [[2, [[3, [4, null]], null]], null]
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

// 2.3.3 實例: 集合的表示

// sets as unordered list
function isElementOfSet(x, set) {
  return set !== null && (equal(x, car(set)) || isElementOfSet(x, cdr(set)))
}

console.log(isElementOfSet(list(1, 2), list(1, 2, list(1, 2)))) // true

function adjoinSet(x, set) {
  return isElementOfSet(x, set) ? set : cons(x, set)
}

function intersectionSet(set1, set2) {
  if (set1 === null || set2 === null) {
    return list()
  }
  return isElementOfSet(car(set1), set2)
    ? cons(car(set1), intersectionSet(cdr(set1), set2))
    : intersectionSet(cdr(set1), set2)
}

// 練習 2.59 union set
function unionSet(set1, set2) {
  if (set1 === null) {
    return set2
  }
  if (set2 === null) {
    return set1
  }
  return isElementOfSet(car(set1), set2)
    ? unionSet(cdr(set1), set2)
    : cons(car(set1), unionSet(cdr(set1), set2))
}
function unionSet(set1, set2) {
  return set1 === null ? set2 : adjoinSet(car(set1), unionSet(cdr(set1), set2))
}

console.log(intersectionSet(list(1, 2, 3), list(1, 3, 4)))
console.log(unionSet(list(1, 2, 3), list(1, 3, 4)))

// 練習 2.60
function adjoinSet(x, set) {
  return cons(x, set)
}
function unionSet(set1, set2) {
  return append(set1, set2)
}

// sets as ordered is element of set
function isElementOfSet(x, set) {
  return set === null
    ? false
    : x === car(set)
    ? true
    : x < car(set)
    ? false
    : isElementOfSet(x, cdr(set))
}
console.log(isElementOfSet(3, list(1, 2, 3, 4))) // true
console.log(isElementOfSet(list(1, 2), list(1, 2, list(1, 2)))) // false

function intersectionSet(set1, set2) {
  if (set1 === null || set2 === null) {
    return list()
  }
  const x1 = car(set1)
  const x2 = car(set2)
  if (x1 === x2) {
    return cons(x1, intersectionSet(cdr(set1), cdr(set2)))
  } else if (x1 < x2) {
    return intersectionSet(cdr(set1), set2)
  } else if (x1 > x2) {
    return intersectionSet(set1, cdr(set2))
  }
}

function adjoinSet(x, set) {
  return set === null
    ? list(x)
    : x === car(set)
    ? set
    : x < car(set)
    ? cons(x, set)
    : cons(car(set), adjoinSet(x, cdr(set)))
}

function unionSet(set1, set2) {
  return set1 === null
    ? set2
    : set2 === null
    ? set1
    : car(set1) === car(set2)
    ? cons(car(set1), unionSet(cdr(set1), cdr(set2)))
    : car(set1) < car(set2)
    ? cons(car(set1), unionSet(cdr(set1), set2))
    : cons(car(set2), unionSet(set1, cdr(set2)))
}

// sets as binary trees
function makeTree(entry, left, right) {
  return list(entry, left, right)
}

function entry(tree) {
  return car(tree)
}

function leftBranch(tree) {
  return car(cdr(tree))
}

function rightBranch(tree) {
  return car(cdr(cdr(tree)))
}

function isElementOfSet(x, set) {
  return set === null
    ? false
    : x === entry(set)
    ? true
    : x < entry(set)
    ? isElementOfSet(x, leftBranch(set))
    : isElementOfSet(x, rightBranch(set))
}

function adjoinSet(x, set) {
  return set === null
    ? makeTree(x, list(), list())
    : x === entry(tree)
    ? set
    : x < entry(set)
    ? makeTree(entry(set), adjoinSet(x, leftBranch(set)), rightBranch(set))
    : makeTree(entry(set), leftBranch(set), adjoinSet(x, rightBranch(set)))
}
const tree1 = makeTree(1, makeTree(2, null, null), makeTree(3, null, null))
console.log(tree1)
console.log(entry(tree1)) // 1
console.log(leftBranch(tree1)) // [2, [null, [null, null]]]
console.log(rightBranch(tree1)) // [3, [null, [null, null]]]

// 練習 2.63
function treeToList1(tree) {
  return tree === null
    ? list()
    : append(
        treeToList1(leftBranch(tree)),
        cons(entry(tree), treeToList1(rightBranch(tree)))
      )
}
const tree2 = makeTree(
  7,
  makeTree(3, makeTree(1, null, null), makeTree(5, null, null)),
  makeTree(9, null, makeTree(11, null, null))
)
console.log(treeToList1(tree1)) // [2, [1, [3, null]]]
console.log(treeToList1(tree2)) // [1, 3, 5, 7, 9, 11]
function treeToList2(tree) {
  function copyToList(tree, resultList) {
    return tree === null
      ? resultList
      : copyToList(
          leftBranch(tree),
          cons(entry(tree), copyToList(rightBranch(tree), resultList))
        )
  }
  return copyToList(tree, list())
}
console.log(treeToList2(tree2)) // [1, 3, 5, 7, 9, 11]

// 練習 2.64
function listToTree(elements) {
  return car(partialTree(elements, length(elements)))
  function partialTree(elts, n) {
    if (n === 0) {
      return cons(list(), elts)
    }
    const leftSize = Math.floor((n - 1) / 2)
    const leftResult = partialTree(elts, leftSize)
    const leftTree = car(leftResult)
    const nonLeftElts = cdr(leftResult)
    const rightSize = n - (leftSize + 1)
    const thisEntry = car(nonLeftElts)
    const rightResult = partialTree(cdr(nonLeftElts), rightSize)
    const rightTree = car(rightResult)
    const remainingElts = cdr(rightResult)
    return cons(makeTree(thisEntry, leftTree, rightTree), remainingElts)
  }
}
console.log(listToTree(list(1, 3, 5, 7, 9, 11)))

// 練習 2.65
function unionSetAsTree(set1, set2) {
  const list1 = treeToList2(set1)
  const list2 = treeToList2(set2)
  return listToTree(unionSet(list1, list2))
}
function intersectionSetAsTree(set1, set2) {
  const list1 = treeToList2(set1)
  const list2 = treeToList2(set2)
  return listToTree(intersectionSet(list1, list2))
}

// 練習 2.66
function lookup(givenKey, setOfRecords) {
  return setOfRecords === null
    ? false
    : equal(givenKey, key(entry(setOfRecords)))
    ? entry(setOfRecords)
    : lookup(givenKey, leftBranch(setOfRecords)) ||
      lookup(givenKey, rightBranch(setOfRecords))
}
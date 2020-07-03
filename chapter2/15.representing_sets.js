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

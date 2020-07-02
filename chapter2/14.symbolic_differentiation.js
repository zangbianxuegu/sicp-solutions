// 2.3.2: 實例：符號求導

import { cons, car, cdr, isCons, list } from './utils'

// isNumber
function isNumber(x) {
  return typeof x === 'number'
}

// isVariable
function isVariable(x) {
  return typeof x === 'string'
}

// isSameVariable
function isSameVariable(v1, v2) {
  return isVariable(v1) && isVariable(v2) && v1 === v2
}

// makeSum
function makeSum(a1, a2) {
  if (a1 === 0) {
    return a2
  } else if (a2 === 0) {
    return a1
  } else if (isNumber(a1) && isNumber(a2)) {
    return a1 + a2
  }
  return list('+', a1, a2)
}

// makeProduct
function makeProduct(m1, m2) {
  if (m1 === 0 || m2 === 0) {
    return 0
  } else if (m1 === 1) {
    return m2
  } else if (m2 === 1) {
    return m1
  } else if (isNumber(m1) && isNumber(m2)) {
    return m1 * m2
  }
  return list('*', m1, m2)
}

// isSum
function isSum(x) {
  return isCons(x) && car(x) === '+'
}

// addend
function addend(s) {
  return car(cdr(s))
}

// augend
function augend(s) {
  return car(cdr(cdr(s)))
}

// isPr
function isProduct(x) {
  return isCons(x) && car(x) === '*'
}

// multiplier
function multiplier(p) {
  return car(cdr(p))
}

// multiplicand
function multiplicand(p) {
  return car(cdr(cdr(p)))
}

// deriv
function deriv(exp, vari) {
  if (isNumber(exp)) {
    return 0
  } else if (isVariable(exp)) {
    return isSameVariable(exp, vari) ? 1 : 0
  } else if (isSum(exp)) {
    return makeSum(deriv(addend(exp), vari), deriv(augend(exp), vari))
  } else if (isProduct(exp)) {
    return makeSum(
      makeProduct(multiplier(exp), deriv(multiplicand(exp), vari)),
      makeProduct(deriv(multiplier(exp), vari), multiplicand(exp))
    )
  } else {
    throw Error(`unknown expression type -- DERIV${exp}`)
  }
}

console.log(deriv(list('+', 'x', 3), 'x')) // ['+', [1, [0, null]]]
console.log(deriv(list('+', 'x', 3), 'x')) // 1
console.log(deriv(list('*', 'x', 'y'), 'x')) // y
console.log(deriv(list('*', list('*', 'x', 'y'), list('+', 'x', 3)), 'x'))

// 練習 2.56
function makeExponentitation(base, exponentiation) {
  if (base === 0) {
    return 1
  } else if (exponentiation === 1) {
    return base
  }
  return list('**', base, exponentiation)
}
function exponent(e) {
  return car(cdr(e))
}
function base(e) {
  return car(cdr(cdr(e)))
}
function isExponentiation(e) {
  return isCons(x) && car(e) === '**'
}
function deriv(exp, vari) {
  if (isNumber(exp)) {
    return 0
  } else if (isVariable(exp)) {
    return isSameVariable(exp, vari) ? 1 : 0
  } else if (isSum(exp)) {
    return makeSum(deriv(addend(exp), vari), deriv(augend(exp), vari))
  } else if (isProduct(exp)) {
    return makeSum(
      makeProduct(multiplier(exp), deriv(multiplicand(exp), vari)),
      makeProduct(deriv(multiplier(exp), vari), multiplicand(exp))
    )
  } else if (isExponentiation(exp)) {
    return makeProduct(
      makeProduct(
        exponent(exp),
        makeExponentitation(base(exp), exponent(exp) - 1)
      ),
      deriv(base(exp), vari)
    )
  } else {
    throw Error(`unknown expression type -- DERIV${exp}`)
  }
}



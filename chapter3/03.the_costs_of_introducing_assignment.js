// 3.1.3 引進賦值的代價

import { cons } from '../utils.js'

function makeSimplifiedWithdraw(balance) {
  return function(amount) {
    balance = balance - amount
    return balance
  }
}

const W = makeSimplifiedWithdraw(25)

console.log(W(20)) // 5
console.log(W(10)) // -5

function makeDecrementer(balance) {
  return function(amount) {
    return balance - amount
  }
}

const D = makeDecrementer(25)

console.log(D(20)) // 5
console.log(D(10)) // 15

function factorial(n) {
  function iter(product, counter) {
    return counter > n ? product : iter(counter * product, counter + 1)
  }
  return iter(1, 1)
}

console.log(factorial(5)) // 120

function factorial(n) {
  let product = 1
  let counter = 1
  function iter() {
    if (counter > n) {
      return product
    } else {
      product *= counter // 賦值順序不可改變
      counter += 1
      return iter()
    }
  }
  return iter()
}

console.log(factorial(5)) // 120

// 練習 3.7
function makeAccount(balance, p1) {
  function withdraw(amount) {
    if (balance >= amount) {
      balance = balance - amount
      return balance
    } else {
      return 'Insufficient funds'
    }
  }
  function deposit(amount) {
    balance = balance + amount
    return balance
  }
  function dispatch(m, p2) {
    if (p1 === p2) {
      if (m === 'withdraw') {
        return withdraw
      } else if (m === 'deposit') {
        return deposit
      } else {
        return 'Unknown request -- make_account'
      }
    } else {
      return () => 'Incorrect password'
    }
  }
  return dispatch
}
function makeJoint(account, password, newPassword) {
  return function(m, inputPassword) {
    if (inputPassword !== newPassword) {
      return () => 'Wrong join account password'
    } else {
      const newAccount = account(m, password)
      if (acc(0) === 'Incorrect password') {
        return () => 'Wrong linked account password'
      } else {
        return newAccount
      }
    }
  }
}
const peterAcc = makeAccount(100, 'open-sesame') // 創建賬戶 peterAcc
const paulAcc = makeJoint(peterAcc, 'open-sesame', 'rosebud') // 提供共用賬戶 paulAcc
console.log(peterAcc('withdraw', 'open-sesame')(40)) // 60
console.log(paulAcc('withdraw', 'rosebud')(40)) // 20
console.log(paulAcc('withdraw', 'wrong password')(40)) // Wrong join account password
console.log(paulAcc('deposit', 'rosebud')(40)) // 60

// 練習 3.8
function f(first) {
  f = function(second) {
    return 0
  }
  return first
}
const n1 = f(0) + f(1)
console.log(n1) // 0
// const n2 = f(1) + f(0)
// console.log(n2) // 1

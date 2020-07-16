// 3.1.1 局部狀態變量

function makeAccount(balance) {
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
  function dispatch(m) {
    return m === 'withdraw'
      ? withdraw
      : m === 'deposit'
      ? deposit
      : error(m, 'Unknown request -- make_account')
  }
  return dispatch
}
const acc = makeAccount(100)
console.log(acc('withdraw')(50)) // 50
console.log(acc('withdraw')(60)) // Insufficient funds
console.log(acc('deposit')(40)) // 90
console.log(acc('withdraw')(60)) // 30

// 練習 3.1
function makeAccumulator(cur) {
  return function(acc) {
    cur = cur + acc
    return cur
  }
}
const A = makeAccumulator(5)
console.log(A(10)) // 15
console.log(A(10)) // 25

// 練習 3.2
function makeMonitored(f) {
  let counter = 0
  function mf(m) {
    if (m === 'how many calls') {
      return counter
    } else if (m === 'reset count') {
      counter = 0
    } else {
      counter++
      return f(m)
    }
  }
  return mf
}
const s = makeMonitored(Math.sqrt)
console.log(s(100)) // 10
console.log(s('how many calls')) // 1

// 練習 3.3
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
const acc = makeAccount(100, 'secret-password')
console.log(acc('withdraw', 'incorrect-password')(40)) // Incorrect password

// 練習 3.4
function makeAccount(balance, p1) {
  let counter = 0
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
  function callTheCops() {
    return 'call the cops'
  }
  function dispatch(m, p2) {
    if (counter < 7) {
      if (p1 === p2) {
        if (m === 'withdraw') {
          return withdraw
        } else if (m === 'deposit') {
          return deposit
        } else {
          return 'Unknown request -- make_account'
        }
      } else {
        counter++
        return () => 'Incorrect password'
      }
    } else {
      return callTheCops
    }
  }
  return dispatch
}
const acc = makeAccount(100, 'secret-password')
console.log(acc('withdraw', 'incorrect-password')(40)) // Incorrect password
console.log(acc('withdraw', 'incorrect-password')(40)) // Incorrect password
console.log(acc('withdraw', 'incorrect-password')(40)) // Incorrect password
console.log(acc('withdraw', 'incorrect-password')(40)) // Incorrect password
console.log(acc('withdraw', 'incorrect-password')(40)) // Incorrect password
console.log(acc('withdraw', 'incorrect-password')(40)) // Incorrect password
console.log(acc('withdraw', 'incorrect-password')(40)) // Incorrect password
console.log(acc('withdraw', 'incorrect-password')(40)) // call the cops

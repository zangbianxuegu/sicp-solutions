// 3.1.2 引進賦值帶來的利益

import { square, gcd } from '../utils.js'

// x2 = randUpdate(x1)
// x3 = randUpdate(x2)

// 生成偽隨機數
const m = 200560490131
const a = 1103515245
const b = 12345

function randUpdate(x) {
  return (a * x + b) % m
}

const randomInit = 123456789

function makeRand() {
  let x = randomInit
  return () => {
    x = randUpdate(x)
    return x
  }
}

const rand = makeRand()

// 蒙特卡羅模擬，從一個大集合中隨機選擇試驗樣本，並在對這些試驗結果的統計估計的基礎上做出推斷。
// 6 / π^2 = 隨機選取兩個整數之間沒有公共因子（也就是它們的最大公因數為1）的概率。
function estimatePi(trials) {
  return Math.sqrt(6 / monteCarlo(trials, cesaroTest))
}

function cesaroTest() {
  return gcd(rand(), rand()) === 1
}

function monteCarlo(trials, experiment) {
  function iter(trialsRemaining, trialsPassed) {
    if (trialsRemaining === 0) {
      return trialsPassed / trials
    } else if (experiment()) {
      return iter(trialsRemaining - 1, trialsPassed + 1)
    } else {
      return iter(trialsRemaining - 1, trialsPassed)
    }
  }
  return iter(trials, 0)
}

console.log(estimatePi(10000)) // 3.1408877612819492


// 不用 rand，直接用 randUpdate
function estimatePi(trials) {
  return Math.sqrt(6 / randomGcdTest(trials, randomInit))
}

function randomGcdTest(trials, initialX) {
  function iter(trialsRemaining, trialsPassed, x) {
    const x1 = randUpdate(x)
    const x2 = randUpdate(x1)
    if (trialsRemaining === 0) {
      return trialsPassed / trials
    } else if (gcd(x1, x2) === 1) {
      return iter(trialsRemaining - 1, trialsPassed + 1, x2)
    } else {
      return iter(trialsRemaining - 1, trialsPassed, x2)
    }
  }
  return iter(trials, 0, initialX)
}

console.log(estimatePi(1000)) // 3.042903097250923
console.log(estimatePi(10000)) // Uncaught RangeError: Maximum call stack size exceeded


// 練習 3.5
// 假設半徑為 3 的圓，以 (2, 4) 和 (8, 10) 為對角頂點，(5, 7) 為圓心

// 求 π
// 3 * 3 * π / (6 * 6) = 隨機點在圓內的概率
function estimatePi(trials) {
  return estimateIntegral(P, 2, 8, 4, 10, trials) * square(6) / square(3)
}

// 在圓內的概率
function estimateIntegral(P, x1, x2, y1, y2, trials) {
  return monteCarlo(trials, function() {
    return P(randomInRange(x1, x2), randomInRange(y1, y2))
  })
}

// 是否在圓內
function P(x, y) {
  return square(x - 5) + square(y - 7) <= square(3)
}

// 給定區間的隨機數
function randomInRange(low, high) {
  const range = high - low
  return low + Math.floor((Math.random() * range))
}

console.log(estimatePi(10000))


// 練習 3.6
function makeRand() {
  let state = randomInit
  return (symbol) => {
    if (symbol === 'reset') {
      return (newState) => {
        state = newState
      }
    } else {
      state = randUpdate(state)
      return state
    }
  }
}

const rand = makeRand()
console.log(rand('generate'))
console.log(rand('generate'))
console.log(rand('reset')(12345))
console.log(rand('generate'))


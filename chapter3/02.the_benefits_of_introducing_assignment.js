// 3.1.2 引進賦值帶來的利益

import { gcd } from '../utils.js'

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
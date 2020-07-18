// 3.1.2 引進賦值帶來的利益

import { gcd } from '../utils.js'

// x2 = randUpdate(x1)
// x3 = randUpdate(x2)

const m = 200560490131
const a = 1103515245
const b = 12345

function rand_update(x) {
  return (a * x + b) % m
}

const randomInit = 123456789

function makeRand() {
  const x = randomInit
  return () => {
    x = randUpdate(x)
    return x
  }
}

const rand = makeRand()

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

console.log(estimatePi(100))

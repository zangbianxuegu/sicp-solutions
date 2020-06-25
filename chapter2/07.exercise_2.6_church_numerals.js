// 參考：https://en.wikipedia.org/wiki/Church_encoding
// Church numerals 邱奇數 是使用邱奇編碼的自然數表示法，用高階函數表示的自然數 n，是個任意函數 f 映射到它自身的 n 重復合函數。也就是，數的值等於它的參數被函數包裹的次數。

// zero
function zero(f) {
  return function (x) {
    return x
  }
}
// zero 的箭頭函數表示
const zero = (f) => (x) => x

// add_1
function add_1(n) {
  return function (f) {
    return function (x) {
      return f(n(f)(x))
    }
  }
}
// add_1 的箭頭函數表示
const add_1 = (n) => (f) => (x) => f(n(f)(x))

// 1 的代換過程
// 1) 將 zero 應用於 add_1
function add_1(zero) {
  return function (f) {
    return function (x) {
      return f(zero(f)(x))
    }
  }
}
// 2) 得到 one
function one(f) {
  return function (x) {
    return f(zero(f)(x))
  }
}
// 3) 繼續得到 one
function one(f) {
  return function (x) {
    return f(
      (function (x) {
        return x
      })(x)
    )
  }
}
// 4) 最終得到 one
function one(f) {
  return function (x) {
    return f(x)
  }
}
// one 箭頭函數表示
const one = (f) => (x) => f(x)

// 2 的代換過程
// 1) 將 one 應用於 add_1
function add_1(one) {
  return function (f) {
    return function (x) {
      return f(one(f)(x))
    }
  }
}
// 2) 得到 two
function two(f) {
  return function (x) {
    return f(one(f)(x))
  }
}
// 3) 繼續得到 two
function two(f) {
  return function (x) {
    return f(
      (function (x) {
        return f(x)
      })(x)
    )
  }
}
// 4) 最終得到 two
function two(f) {
  return function (x) {
    return f(f(x))
  }
}
// two 箭頭函數表示
const two = (f) => (x) => f(f(x))

// 加法
function plus(m, n) {
  return function (f) {
    return function (x) {
      return m(f)(n(f)(x))
    }
  }
}
// 加法的箭頭函數表示
const plus = (m, n) => (f) => (x) => m(f)(n(f)(x))

const three = plus(one, two)

function churchToNumber(c) {
  return c((n) => n + 1)(0)
}

console.log(churchToNumber(three)) // 3

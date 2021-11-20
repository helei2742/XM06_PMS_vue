export function debounce (fn, t) {
  let timeId
  let delay = t || 500
  return function (...args) {
    if (timeId) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      timeId = null
      fn.apply(this, args)
    }, delay)
  }
}

export function throttle (fn, t) {
  let flag = true
  let interval = t || 500
  return function (...args) {
    if (flag) {
      fn.apply(this, args)
      flag = false
      setTimeout(() => {
        flag = true
      }, interval)
    }
  }
}

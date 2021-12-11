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
// export function debounce(fn, wait, immediate){
//   immediate = immediate || false;
//   let timer = null;
//   let count = 0;
//   return function () {
//     let _this = this;
//     let _arg = arguments;
//     clearTimeout(timer);
//     if (immediate && !count) {
//       fn.apply(_this, _arg);
//       count++;
//     } else {
//       timer = setTimeout(function () {
//         console.log(this);
//         fn.apply(_this, _arg);
//         count++;
//       }, wait);
//     }
//   }
// }

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

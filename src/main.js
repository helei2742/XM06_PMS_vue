import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import '@/assets/css/reset.css'
import * as echarts from 'echarts'
//需要挂载到Vue原型上
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
Vue.use(ElementUi)

Date.prototype.Format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

/**
 * 挂载时器格式化方法
 * @param num
 * @returns {*}
 */
Vue.prototype.$formatDate = (num)=>{
    return new Date(num).Format("yyyy年MM月dd日HH时mm分ss秒")
}
Vue.prototype.$formatDateToDay = (num)=>{
  return new Date(num).Format("yyyy年MM月dd日")
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

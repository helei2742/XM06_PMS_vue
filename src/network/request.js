import axios from 'axios'
import Qs from 'qs'
import da from "element-ui/src/locale/lang/da";

axios.defaults.withCredentials = true

/**
 * 网络请求方法
 * @param config
 * @returns {AxiosPromise}
 */
export function request(config) {
  const instance = axios.create({
    // baseURL: 'http://www.ylxteach.net/XM06',
    baseURL: 'http://localhost:9000/XM06',
    timeout: 5000,
    withCredentials:true,
/*    transformRequest: [function (data, headers) {
      console.log(data)
      console.log(Qs.stringify(data))
      console.log(JSON.stringify(data))
      console.log(Qs.stringify(JSON.stringify(data)))
      return  Qs.stringify(data)
    }]*/
  })

  /*
    拦截器，只返回请求的data
  * */
  instance.interceptors.response.use(
      (res) => {
          console.log(res)
          let result = res.data
          if(result.code !== 200)
              result.msg = decodeURI(result.msg)
          return result
      },
      (error) => {
          console.log(error)
      })

  return instance(config)
}

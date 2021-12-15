import axios from 'axios'
import {REQUESTAPIURL} from "@/config";

axios.defaults.withCredentials = true

/**
 * 网络请求方法
 * @param config
 * @returns {AxiosPromise}
 */
export function request(config) {

  let baseURL = REQUESTAPIURL

  const instance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    withCredentials:true,
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
        if(error.response!==null && 500 === error.response.status){
          window.open(baseURL+ '/error')
        }
      })

  return instance(config)
}

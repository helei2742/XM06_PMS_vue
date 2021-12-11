import axios from 'axios'

axios.defaults.withCredentials = true

/**
 * 网络请求方法
 * @param config
 * @returns {AxiosPromise}
 */
export function request(config) {
  let baseURL = 'http://localhost:9000/XM06'
  const instance = axios.create({
    // baseURL: 'http://www.ylxteach.net/XM06',
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
        if(500 === error.response.status){
          window.open(baseURL+ '/error')
        }
      })

  return instance(config)
}

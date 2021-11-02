import axios from 'axios'
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
    withCredentials:true
  })

  /*
    拦截器，只返回请求的data
  * */
  instance.interceptors.response.use(
      (res) => {
        console.log(res)
        return res.data
      },
      (error) => {
        console.log(error)
      })

  return instance(config)
}

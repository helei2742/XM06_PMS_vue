import {request} from "./request";

/**
 * 登录方法
 * @param userName 用户名
 * @param userPwd 密码
 * @returns ‘{
    "msg": "登录成功",
    "code": 200,
    "result": {
        "userIdStr": "##gM5MjM##QOzkTN1EDM5MjMzYTM",
        "username": "lisi",
        "trueName": "李四"
    }}’
 */
export function loginNetwork(userName, userPwd){
  return request({
    url: '/user/login',
    params: {
      userName,
      userPwd
    }
  })
}

/**
 * 根据用户的字符串id 查找用户
 * @param userIdStr
 * @returns {AxiosPromise}
 */
export function findUserByUserIdStr(userIdStr){
  return request({
    url: '/user/findByIdStr',
    params: {
      userIdStr
    },
    method: 'post'
  })
}

/**
 * 创建用户
 * @param user
 * @returns {AxiosPromise}
 */
export function createAccount(user) {
  return request({
    url: '/user/add',
    params: {
      userName: user.userName,
      userPwd: user.userPwd,
      trueName: user.trueName,
      email: user.email,
      phone: user.phone
    },
    method: 'post'
  })
}

/**
 * 修改密码
 * @param from
 * @returns {AxiosPromise}
 */
export function alterPwdNetwork(from){
  return request({
    url: '/user/alterPassword',
    params: {
      id: from.id,
      oldPwd: from.oldPwd,
      newPwd: from.newPwd,
      confirmPwd: from.confirmPwd
    },
    method: 'post'
  })
}

/**
 * 根据id查找用户
 * @param userId
 * @returns {AxiosPromise}
 */
export function queryUserByIdNetwork(userId){
  return request({
    url: '/user/queryUserById',
    params: {
      userId
    },
    method: 'post'
  })
}
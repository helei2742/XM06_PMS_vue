import {request} from "@/network/request";

/**
 * 查询用户的便签信息
 * @param userId  用户id
 */
export function queryMemosByUserIdNetwork(userId){
  return request({
    url: '/memo/userMemo',
    params: {
      userId
    },
    method: 'post'
  })
}


/**
 * 删除用户便签记录网络服务
 * @param userId  用户id
 * @param memoId  便签id
 * @returns {AxiosPromise}
 */
export function removeUserMemoNetwork(userId, memoId){
  return request({
    url: '/memo/removeMemo',
    params: {
      userId,
      memoId
    },
    method: 'post'
  })
}

/**
 * 添加便签
 * @param userId
 * @param memo
 * @param staleDate
 * @param createDate
 * @returns {AxiosPromise}
 */
export function addMemoNetwork(userId, memo, staleDate, createDate){
  return request({
    url: '/memo/add',
    params: {
      userId,
      memo,
      staleDate,
      createDate
    },
    method: 'post'
  })
}

/**
 * 确认便签完成网络请求方法
 * @param userId
 * @param memoId
 * @returns {AxiosPromise}
 */
export function confirmMemoNetwork(userId, memoId){
  return request({
    url: '/memo/confirmMemo',
    params:{
      userId,
      memoId
    },
    memoId: 'post'
  })
}
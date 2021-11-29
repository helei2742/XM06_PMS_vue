import {request} from "@/network/request";


/**
 *  网络请求分页获取小组的消息记录，
 * @param query
 *              {
 *                userId: Number, 用户id
 *                groupId: Number, 小组id
 *                page: Number,     当前页
 *                limit: Number     没页查多少
 *              }
 *
 * @returns {AxiosPromise}
 */
export function queryHistoryGroupInformNetwork(query){
  return request({
    url: '/inform/pageQueryInformRecord',
    data: query,
    method: 'post'
  })
}

/**
 * 获取保存在服务器内存中的小组消息记录，
 *             {
 *                userId: Number, 用户id
 *                groupId: Number, 小组id
 *              }
 * @param query
 * @returns {AxiosPromise}
 */
export function queryInformIn3dayNetwork(query){
  return request({
    url: '/inform/queryInformIn3day',
    data: {
      userId: query.userId,
      groupId: query.groupId
    },
    method: 'post'
  })
}


/**
 * 清除用户在某一组的未读消息
 * @param userId
 * @param groupId
 * @param notReadList
 * @returns {AxiosPromise}
 */
export function clearNotReadNetWork(userId, groupId, notReadList){
  return request({
    url: '/inform/clearNotRead',
    data: {
      userId,
      groupId,
      notReadList
    },
    method: 'post'
  })
}
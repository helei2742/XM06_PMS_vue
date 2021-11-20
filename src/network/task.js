import {request} from "@/network/request";

/**
 * 创建任务网络请求
 * @param from
 * @param creatorId
 * @returns {AxiosPromise}
 */
export function createTaskNetwork(from){
  return request({
    url: '/task/add',
    data:{
      taskName: from.name,
      groupId: from.groupId,
      deadline: from.date,
      description: from.desc,
      creatorId: from.creatorId
    },
    method: 'post'
  })
}

/**
 * 分页查询用户的任务信息的网络请求
 * @param userId
 * @param page
 * @param limit
 * @param type
 * @param groupId
 * @returns {AxiosPromise}
 */
export function pageQueryUserTaskNetwork(userId, page, limit, type, groupId){
  return request({
    url: '/task/pageQueryUserTask',
    data: {
      page,
      limit,
      userId,
      type,
      groupId
    },
    method: 'post'
  })
}



/**
 * 查询任务的提交记录的网络请求
 * @param taskId
 */
export function queryTaskRecordNetwork(taskId){
  return request({
    url: '/task/taskSubmitRecord',
    data: {
      taskId,
      limit: 100
    },
    method: 'post'
  })
}
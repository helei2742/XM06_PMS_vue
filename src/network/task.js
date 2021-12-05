import {request} from "@/network/request";
import {download} from "@/network/file";

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
*    修改任务信息接口，form需有以下属性
 *        {
          taskName: String,
          deadline: number,
          description: String
        }
 * @param form
 * @returns {AxiosPromise}
 */
export function alterTaskNetWork(form) {
  return request({
    url: '/task/alterTask',
    data: form,
    method: 'post'
  })
}

/**
 * 删除任务，需传入taskId,  userId(确认身份)
 * @param taskId
 * @param userId
 */
export function dropTaskNetwork(taskId, userId){
  return request({
    url: '/task/dropTask',
    data:{
      id: taskId,
      creatorId: userId
    },
    method: 'post'
  })
}

/**
 * 分页查询用户的任务信息的网络请求
 *  "该方法包含了多种查询方式，type类型：（2.查询用户创建的任务，3.查询还没过期的任务，" +
 "4，查询用户已经提交过的任务，5.查询过期的任务、6。查看小组的任务，7、查看未提交的任务, 1、或其他，查看所有任务)" +
 "对应的其他需要的参数有（1或其他.userId, 2.userId,3.userId,4.userId,5.userId,6.groupId,7.userId"
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
 * 根据taskId, 查询任务信息
 * @param taskId
 */
export function queryTaskInfoNetwork(taskId){
  return request({
    url: '/task/queryByTaskId',
    params: {
      taskId
    },
    method: 'post'
  })
}

/**
 * 查询任务的提交记录的网络请求
 * @param taskId
 * @param page
 * @param limit
 */
export function queryTaskRecordNetwork(taskId,page, limit){
  return request({
    url: '/task/taskSubmitRecord',
    data: {
      taskId,
      page,
      limit
    },
    method: 'post'
  })
}

/**
 * 查询用户的所有提交记录
 * @param userId
 */
export function queryTaskRecordOfUserNetwork(userId, page, limit){
  return request({
    url:'/task/userSubmitRecord',
    data: {
      userId,
      page,
      limit
    },
    method: 'post'
  })
}
/**
 * 查询任务提交记录图表信息
 * @param taskId
 */
export function queryTaskSubmitChartsNetwork(taskId){
  return request({
    url: '/task/queryTaskSubmitCharts',
    data:{
      taskId
    },
    method: 'post'
  })
}

/**
 * 删除任务提交记录网络请求
 * @param recordId
 * @param userId
 */
export function deleteTaskSubmitRecordNetwork(recordId, userId){
  return request({
    url: '/task/deleteTaskSubmitRecord',
    data:{
      recordId,
      userId
    },
    method: 'post'
  })
}

/**
 * 删除选中的任务提交记录
 * @param recordIds
 * @param userId
 * @returns {AxiosPromise}
 */
export function deleteSelectedTaskRecordNetwork(recordIds,userId){
  return request({
    url: '/task/deleteSelectedRecord',
    data: {
      recordIds,
      userId
    },
    method: 'post'
  })
}

/**
 * 导出当前userId的所有提交记录excel文件
 * @param userId
 * @returns {AxiosPromise}
 */
export function exportMyTaskSubmitRecordNetwork(userId){
  return download({
    url: 'http://localhost:9000/XM06/task/exportMyRecordExcel',
    data: {
      userId
    },
    responseType: 'blob',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'post'
  })
}

/**
 * 导出任务的所有提交记录excel文件
 * @param taskId
 * @returns {AxiosPromise}
 */
export function exportTaskSubmitRecordNetwork(taskId){
  return download({
    url: 'http://localhost:9000/XM06/task/exportTaskRecordExcel',
    data: {
      taskId
    },
    responseType: 'blob',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'post'
  })
}
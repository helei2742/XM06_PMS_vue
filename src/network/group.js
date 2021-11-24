import {request} from "@/network/request";

/**
 * 创建小组网络请求
 * @param groupInfo
 * @returns {AxiosPromise}
 */
export function createGroupNetwork(groupInfo){
  return request({
    url: '/group/add',
    params: {
      groupName: groupInfo.groupName,
      described: groupInfo.described,
      managerId: groupInfo.managerId
    },
    method: 'post'
  })
}

/**
 * 分页请求所有的小组信息
 * @param currentPage
 * @param pageSize
 * @returns {AxiosPromise}
 */
export function pageQueryAllGroupNetwork(currentPage, pageSize){
  return request({
    url: '/group/pagequeryAll',
    params:{
      page: currentPage,
      limit: pageSize,
    },
    method: 'post'
  })
}

/**
 * 根据小组名查找小组网络请求
 * @param groupName
 * @returns {AxiosPromise}
 */
export function queryGroupByNameNetwork(groupName){
  return request({
    url: '/group/queryByGroupName',
    params:{
      groupName
    },
    method: 'post'
  })
}


/**
 * 根据userId，小组id， 邀请码， 加入小组网络请求
 * @param data
 * @returns {AxiosPromise}
 */
export function joinInGroupNetwork(data){
  return request({
    url: '/group/addUser',
    params: {
      userId: data.userId,
      groupId: data.groupId,
      invitationCode: data.invitationCode
    }
  })
}

/**
 * 根据userId，分页查询加入的小组网络请求
 * @param userId
 * @param page
 * @param limit
 * @returns {AxiosPromise}
 */
export function queryJoinedGroupNetwork(userId, page, limit){
  return request({
    url: '/group/pagequeryUerJoiedGroup',
    params: {
      userId,
      page,
      limit
    },
    method: 'post'
  })
}

/**
 * 查询加入的全部小组
 * @param userId
 */
export function queryJoinedGroupAllNetwork(userId){
  return request({
    url: '/group/queryJoinedAll',
    params:{
      userId
    },
    method: 'post'
  })
}
export function queryMyGroupAllNetwork(userId){
  return request({
    url: '/group/queryMyGroupAll',
    params:{
      userId
    },
    method: 'post'
  })
}
/**
 * 根据managerId ，分页查询所有管理的小组
 * @param managerId
 * @param page
 * @param limit
 * @returns {AxiosPromise}
 */
export function queryManagedGroupNetwork(managerId, page, limit) {
   return request({
     url: '/group/pagequeryByManagerId',
     params: {
       managerId,
       page,
       limit
     },
     method: 'post'
   })
}

/**
 * 获取小组邀请码
 * @param groupId
 * @param managerId
 * @returns {AxiosPromise}
 */
export function queryGroupInvitationCode(groupId, managerId){
  return request({
    url: '/group/invitationCode',
    params: {
      groupId,
      managerId
    },
    method: 'post'
  })
}

/**
 * 从小组中移除成员网络方法
 * @param managerId
 * @param groupId
 * @param userId
 * @returns {AxiosPromise}
 */
export function removeGroupMemberNetwork(managerId, groupId, userId){
  return request({
    url: '/group/removeMember',
    params:{
      managerId,
      groupId,
      userId
    },
    method: 'post'
  })
}

/**
 * 解散小组网络请求方法
 * @param managerId
 * @param groupId
 * @returns {AxiosPromise}
 */
export function dissolveGroupNetwork(managerId, groupId){
  return request({
    url: '/group/dissolveGroup',
    params: {
      managerId,
      groupId
    },
    method: 'post'
  })
}
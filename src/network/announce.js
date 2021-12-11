import {request} from "@/network/request";

export function createAnnounceNetwork(userId, title, mainBody){
  return request({
    url: '/announce/createAnnounce',
    data:{
      userId,
      title,
      mainBody
    },
     method: 'post'
  })
}

/**
 * 分页查询公告的网络请求
 * @param queryType
 * @param orderType
 * @param userId
 */
export function pageQueryAnnounceNetwork(queryType,orderType,page,limit,userId){
  return request({
    url:'/announce/pageQueryAnnounce',
    data:{
      queryType,
      orderType,
      page,
      limit,
      userId
      },
    method: 'post'
  })
}

/**
 * 根据announceId 查找公告
 * @param announceId
 * @returns {AxiosPromise}
 */
export function queryAnnounceByIdNetwork(announceId){
  return request({
    url: '/announce/queryAnnounceById',
    data:{
      announceId
    },
    method: 'post'
  })
}

export function alterAnnounceNetwork(form){
  return request({
    url: '/announce/alterAnnounce',
    data:{
      id: form.id,
      title: form.title,
      mainBody: form.mainBody,
      userId: form.userId
    },
    method: 'post'
  })
}

export function deleteAnnounceNetwork(announceId,userId){
  return request({
    url: '/announce/deleteAnnounceById',
    data:{
      id: announceId,
      userId
    },
    method: 'post'
  })
}

export function deleteSelectedAnnounceNetwork(announceIds,userId){
  return request({
    url: '/announce/deleteSelectedAnnounce',
    data:{
      announceIds,
      userId
    },
    method: 'post'
  })
}

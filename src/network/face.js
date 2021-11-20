import {request} from "@/network/request";

export function uploadFacesNetWork(userId, facesJson){
  return request({
    url: 'face/faceImgUpload',
    data:{
      userId,
      facesJson
    },
    timeout: 30000,
    method: 'post'
  })
}

export function uploadFaceMp4NetWork(userId, mp4, uploadProgressEvent){
  return request({
    url: '/face/faceFileUpload',
    params:{
      userId
    },
    onUploadProgress: uploadProgressEvent,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: mp4
  })
}

export function trainFaceInfoNetWork(userId, savePath){
  return request({
    url: '/face/trainFaceInfo',
    data: {
      userId,
      savePath
    },
    timeout: 60000,
    method: 'post'
  })
}

export function faceLoginNetWork(username, facesJson){
  return request({
    url: 'face/faceLogin',
    data:{
      username,
      facesJson
    },
    timeout: 30000,
    method: 'post'
  })
}

export function faceDropNetWork(userId){
  return request({
    url: '/face/dropFaceInfo',
    data: {
      userId
    },
    method: 'post'
  })
}
import axios from "axios";
import {request} from "@/network/request";

export function download(config) {
  const down = axios.create({
    timeout: 5000,
    withCredentials:true
  })
  return down(config)
}


export function submitTaskFileNetwork(userId, taskId, description, form, uploadProgressEvent){
  return request({
    url: '/task/submitTask',
    params:{
      userId,
      taskId,
      description,
    },
    onUploadProgress: uploadProgressEvent,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: form
  })
}

export function downloadFileNetwork(filePath){
  return download({
    url: 'http://www.ylxteach.net/XM06/file/download',
    // url: 'http://localhost:9000/XM06/file/download',
    params: {
      filePath,
    },
    responseType: 'blob',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    },
  })
}

export function uploadFacesNetWork(userId, facesJson){
  return request({
    url: 'face/faceImgUpload',
    data:{
      userId,
      facesJson
    },
    timeout: 20000,
    method: 'post'
  })
}
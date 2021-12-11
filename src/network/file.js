import axios from "axios";
import {request} from "@/network/request";
import {FILEDOWNLOADURL} from "@/config";

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
    url: FILEDOWNLOADURL,
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



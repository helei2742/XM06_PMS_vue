import {request} from "@/network/request";

export function testError(){
  return request({
    url:'/test/error',
    params: {
      data: 12345
    }
  })
}
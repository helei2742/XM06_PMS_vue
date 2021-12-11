import {request} from "@/network/request";

export function querySystemRecord7dayNetwork() {
    return request({
        url: '/systemRecord/7day',
        method: 'post'
    })
}

export function querySystemRecordTotalNetwork() {
    return request({
        url: '/systemRecord/total',
        method: 'post'
    })
}


/**
 * 查询用户在项目中的提交进度图标数据网络请求
 * @param projectId
 * @returns {AxiosPromise}
 */
export function queryUserProjectDegreeNetwork(projectId){
    return request({
        url: '/project/querySubmitChartInfo',
        data: {
          projectId
        },
        method: 'post'
    })
}

export function queryUserProjectSubmit14dayNetwork(projectId){
    return request({
        url: '/project/queryUserSubmit14day',
        data: {
            projectId
        },
        method: 'post'
    })
}
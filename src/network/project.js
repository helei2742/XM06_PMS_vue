import {request} from "@/network/request";

/**
 * 排序条件，按照创建时间降序查询
 * @type {number}
 */
export const CREATEDATEDESC = 1
/**
 * 排序条件，按照创建时间升序查询
 * @type {number}
 */
export const CREATEDATEASC = 2
/**
 * 排序条件，按照完成度降序查询
 * @type {number}
 */
export const COMPLETIONDEGREEDESC = 3
/**
 * 排序条件，按照创建时间升序查询
 * @type {number}
 */
export const COMPLETIONDEGREEASC = 4


/**
 * 查询条件。根据用户id查找项目
 * @type {number}
 */
export const PAGEQUERYPROJECTBYUSERID = 1
/**
 * 查询条件。根据用户加入的小组查找项目
 * @type {number}
 */
export const PAGEQUERYUSERJOINEDGROUPPROJECT = 2
/**
 * 查询条件。查找公公共项目
 * @type {number}
 */
export const PAGEQUERYPUBLICPROJECT = 3
/**
 * 查询条件。项目名称模糊查询
 * @type {number}
 */
export const PAGEQUERYNAMELIKEPROJECT = 4

/**
 *
 * @param createForm
 *      内部包含属性如下
 *        ruleForm: {
            projectName: '',
            isPublic: false,
            groups: [],
            desc: ''
            creatorId: 0
          }
 * @returns {AxiosPromise}
 */
export function createProjectNetwork(createForm){
  console.log(createForm)
  return request({
    url: '/project/create',
    data: {
      projectName: createForm.projectName,
      groupIds: createForm.groups,
      isPublic: createForm.isPublic,
      projectDesc: createForm.desc,
      groupId: createForm.groupId,
      creatorId: createForm.creatorId
    },
    method: 'post'
  })
}

/**
 * 分页查询 项目
 * @param projectQuery
 *
 * projectQuery 中
 *      type 为 1  代表查找用户创建的项目
 *             2   代表查找用户加入小组的项目
 *             3   代表查找所有公开的项目
 *      orderType为排序方式
 *            1   创建时间降序
 *            2、 创建时间升
 *            3、 完成度降序
 *            4、 完成度升序
 */
export function queryProjectListNetwork(projectQuery) {
  return request({
    url: '/project/queryProjectList',
    data: projectQuery,
    method: 'post'
  })
}


/**
 * 更新项目进度网络请求
 * @param form  类型为DataForm     需包含
 *                      userId          提交用户id
 *                      projectId       项目id
 *                      submitDesc      提交描述
 *                      submitDegree    提交的进度
 *                      file            提交的文件 （可以没有）
 * @param uploadProgressEvent
 * @returns {AxiosPromise}
 */
export function updateProjectDegreeNetwork(form, uploadProgressEvent){
  return request({
    url: '/project/submitProjectDegree',
    data: form,
    onUploadProgress: uploadProgressEvent,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post'
  })
}

/**
 * 根据项目id查找项目网络请求
 * @param projectId
 * @returns {AxiosPromise}
 */
export function queryProjectByIdNetwork(projectId){
  return request({
    url: '/project/queryById',
    data: {
      projectId
    },
    method: 'post'
  })
}

/**
 * 分页查询项目的提交记录
 * @param projectId
 * @param page
 * @param limit
 */
export function pageQueryProjectUpdateRecordNetwork(projectId, page, limit){
  return  request({
    url: '/project/pageQueryRecordList',
    data: {
      projectId,
      page,
      limit
    },
    method: 'post'
  })
}

/**
 * 更新项目网络请求，
 *        {
 *        projectId     必传
 *        creatorId     必传
 *        projectName   为null 不修改
 *        projectDesc   为null 不修改
 *        isPublic    为null 不修改
 *        groupIds     没有视作移除项目下所有小组
 *        }
 *  {AxiosPromise}
 */
export function updateProjectNetwork(form){
  return request({
    url: '/project/updateProject',
    data: {
      id: form.projectId,
      creatorId: form.creatorId,
      projectDesc: form.projectDesc,
      projectName: form.projectName,
      isPublic: form.isPublic,
      groupIds: form.groupIds
    },
    method: 'post'
  })
}

/**
 * 删除项目网络请求，会向project.creatorId（创建人） 发送验证码邮件
 * @param userId
 * @param projectId
 * @returns {AxiosPromise}
 */
export function deleteProjectNetwork(userId, projectId){
  return request({
    url: '/project/deleteProject',
    data:{
      userId,
      projectId
    },
    method: 'post'
  })
}

/**
 * 确认码 确认删除项目
 * @param projectId
 * @param checkCode
 * @returns {AxiosPromise}
 */
export function deleteProjectConfirmNetwork(projectId, checkCode){
  return request({
    url: '/project/deleteConfirm',
    data:{
      projectId,
      checkCode
    },
    method: 'post'
  })
}
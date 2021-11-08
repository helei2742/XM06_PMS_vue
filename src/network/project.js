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
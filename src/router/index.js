import Vue from 'vue'
import VueRouter from 'vue-router'
import {Upload} from "element-ui";

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const Index = () => import('@/views/index.vue')
const Login = () => import('@/views/login.vue')
const Welcome = () => import('@/views/Welcome.vue')
const Introduce = () => import('@/views/Introduce')

const CreateAccount = () => import('@/views/CreateAccount.vue')

const GroupDetail = () => import('@/views/groupcomponent/GroupDetail.vue')
const CreateGroup = () => import('@/views/groupcomponent/CreateGroup.vue')
const JoinInGroup = () => import('@/views/groupcomponent/JoinInGroup.vue')
const JoinedGroup = () => import('@/views/groupcomponent/JoinedGroup.vue')
const MyGroup = () => import('@/views/groupcomponent/MyGroup.vue')


const UserInfoPage = () => import('@/views/usercomponent/UserInfoPage.vue')
const PasswordAlterPage = () => import('@/views/usercomponent/PasswordAlter.vue')

const CreateTask = () => import('@/views/taskcomponent/CreateTask.vue')
const ShowTask = () => import('@/views/taskcomponent/ShowTask.vue')
const AlterTask = () => import('@/views/taskcomponent/AlterTask')
const TaskDetail = () => import('@/views/taskcomponent/TaskDetail')
const MyTaskSubmitRecord = () => import('@/views/taskcomponent/MyTaskSubmitRecord')
const SubmitTask = () => import('@/views/taskcomponent/SubmitTask')
const SubmitRecord = () => import('@/views/taskcomponent/SubmitRecord')


const InformView = () => import('@/views/informcomponent/InformView')

const CreateProject = () => import('@/views/projectcomponent/CreateProject')
const ProjectList = () => import('@/views/projectcomponent/ProjectList')
const ProjectDetail = () => import('@/views/projectcomponent/ProjectDetail')
const AlterProject = () => import('@/views/projectcomponent/AlterProject')


const FaceInfoRegister = () => import('@/views/facecomponent/FaceInfoRegister')
const UploadFIleToRegister = () => import('@/views/facecomponent/UploadFileTORegister')

const routes = [
  {
    path:'/',
    redirect: '/introduce'
  },
  {
    path: '/index',
    meta: {
      title: '首页'
    },
    component: Index,
    children:[
      {
        path: '',
        redirect: '/index/welcome'
      } ,
      {
        path: 'welcome',
        meta:{
          title: '首页'
        },
        component: Welcome
      },
      {
        path: 'creategroup',
        meta:{
          title: '创建小组'
        },
        component: CreateGroup
      },
      {
        path: 'joiningroup',
        meta:{
          title: '加入小组'
        },
        component: JoinInGroup
      },
      {
        path: 'joinedgroup',
        meta:{
          title: '已加入的小组'
        },
        component: JoinedGroup
      },
      {
        path: 'mygroup',
        meta:{
          title: '我管理的小组'
        },
        component: MyGroup
      },
      {
        path: 'myinfo',
        meta:{
          title: '用户信息'
        },
        component: UserInfoPage
      },
      {
        path: 'passwordalter',
        meta:{
          title: '修改密码'
        },
        component: PasswordAlterPage
      },
      {
        path: 'groupdetail',
        meta:{
          title: '小组详情'
        },
        component: GroupDetail
      },
      {
        path: 'createtask',
        meta:{
          title: '创建任务'
        },
        component: CreateTask
      },
      {
        path: 'showtask',
        meta:{
          title: '任务列表'
        },
        component: ShowTask
      },
      {
        path: 'submittask',
        meta:{
          title: '提交任务'
        },
        component: SubmitTask
      },
      {
        path: 'altertask',
        meta: {
          title: '修改任务信息',
        },
        component: AlterTask
      },
      {
        path: 'mytasksubmitrecord',
        meta:{
          title: '查看我的提交'
        },
        component: MyTaskSubmitRecord
      },
      {
        path: 'taskdetail',
        meta:{
          title: '任务详情'
        },
        component: TaskDetail
      },
      {
        path: 'submitrecord',
        meta:{
          title: '任务提交记录'
        },
        component: SubmitRecord
      },
      {
        path: 'informview',
        meta:{
          title: '消息通知'
        },
        component: InformView,
      },
      {
        path: 'createproject',
        meta:{
          title: '创建项目'
        },
        component: CreateProject
      },
      {
        path: 'projectlist',
        meta:{
          title: '项目列表'
        },
        component: ProjectList
      },
      {
        path: 'projectdetail',
        meta:{
          title: '项目详情'
        },
        component: ProjectDetail
      },
      {
        path: 'alterproject',
        meta:{
          title: '修改项目信息'
        },
        component: AlterProject
      },
      {
        path: 'faceregisterpage',
        meta: {
          title: '人脸信息录入'
        },
        component: FaceInfoRegister
      },
      {
        path: 'facefileupload',
        meta: {
          title: '视频上传人类信息'
        },
        component: UploadFIleToRegister
      }
    ]
  },
  {
    path: '/login',
    meta:{
      title: '登录'
    },
    component: Login
  },
  {
    path: '/createaccount',
    meta:{
      title: '创建账户'
    },
    component: CreateAccount
  },
  {
    path: '/introduce',
    meta: {
      title: '项目介绍'
    },
    component: Introduce
  }
]


const router = new VueRouter({
  mode: 'hash',
  base: '/XM06/',
  routes,
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  //嵌套路由可能获取不到
  // document.title = to.meta.title
  document.title = to.matched[to.matched.length-1].meta.title
  next()
})

export default router

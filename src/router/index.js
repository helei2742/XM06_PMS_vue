import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import {ADDIFNOTHAVETAB} from "@/store/mutations-types";
import {BACECONTEXTPATH} from "@/config";


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
const AlterUserInfoPage = () => import('@/views/usercomponent/AlterUserInfoPage')

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


const CreateAnnounce = () => import('@/views/announcecomponent/CreateAnnounce')
const ShowAnnounce = () => import('@/views/announcecomponent/ShowAnnounce')
const AnnounceDetail = () => import('@/views/announcecomponent/AnnounceDetail')
const EditAnnounce = () => import('@/views/announcecomponent/EditAnnounce')

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
      title: '??????'
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
          title: '??????'
        },
        component: Welcome
      },
      {
        path: 'creategroup',
        meta:{
          title: '????????????'
        },
        component: CreateGroup
      },
      {
        path: 'joiningroup',
        meta:{
          title: '????????????'
        },
        component: JoinInGroup
      },
      {
        path: 'joinedgroup',
        meta:{
          title: '??????????????????'
        },
        component: JoinedGroup
      },
      {
        path: 'mygroup',
        meta:{
          title: '??????????????????'
        },
        component: MyGroup
      },
      {
        path: 'myinfo',
        meta:{
          title: '????????????'
        },
        component: UserInfoPage
      },
      {
        path: 'passwordalter',
        meta:{
          title: '????????????'
        },
        component: PasswordAlterPage
      },
      {
        path: 'alteruserinfo',
        meta:{
          title: '??????????????????'
        },
        component: AlterUserInfoPage
      },
      {
        path: 'groupdetail',
        meta:{
          title: '????????????'
        },
        component: GroupDetail
      },
      {
        path: 'createtask',
        meta:{
          title: '????????????'
        },
        component: CreateTask
      },
      {
        path: 'showtask',
        meta:{
          title: '????????????'
        },
        component: ShowTask
      },
      {
        path: 'submittask',
        meta:{
          title: '????????????'
        },
        component: SubmitTask
      },
      {
        path: 'altertask',
        meta: {
          title: '??????????????????',
        },
        component: AlterTask
      },
      {
        path: 'mytasksubmitrecord',
        meta:{
          title: '??????????????????'
        },
        component: MyTaskSubmitRecord
      },
      {
        path: 'taskdetail',
        meta:{
          title: '????????????'
        },
        component: TaskDetail
      },
      {
        path: 'submitrecord',
        meta:{
          title: '??????????????????'
        },
        component: SubmitRecord
      },
      {
        path: 'informview',
        meta:{
          title: '????????????'
        },
        component: InformView,
      },
      {
        path: 'createproject',
        meta:{
          title: '????????????'
        },
        component: CreateProject
      },
      {
        path: 'projectlist',
        meta:{
          title: '????????????'
        },
        component: ProjectList
      },
      {
        path: 'projectdetail',
        meta:{
          title: '????????????'
        },
        component: ProjectDetail
      },
      {
        path: 'alterproject',
        name: 'alterProject',
        meta:{
          title: '??????????????????'
        },
        component: AlterProject
      },
      {
        path: 'createannounce',
        meta: {
          title: '????????????'
        },
        component: CreateAnnounce
      },
      {
        path: 'showannounce',
        meta: {
          title: '????????????'
        },
        component: ShowAnnounce
      },
      {
        path: 'announcedetail',
        name: 'announceDetail',
        meta: {
          title: '????????????'
        },
        component: AnnounceDetail
      },
      {
        path: 'editannounce',
        meta:{
          title: '????????????'
        },
        component: EditAnnounce
      },
      {
        path: 'faceregisterpage',
        meta: {
          title: '??????????????????'
        },
        component: FaceInfoRegister
      },
      {
        path: 'facefileupload',
        meta: {
          title: '????????????????????????'
        },
        component: UploadFIleToRegister
      }
    ]
  },
  {
    path: '/login',
    meta:{
      title: '??????'
    },
    component: Login
  },
  {
    path: '/createaccount',
    meta:{
      title: '????????????'
    },
    component: CreateAccount
  },
  {
    path: '/introduce',
    meta: {
      title: '????????????'
    },
    component: Introduce
  }
]


const router = new VueRouter({
  mode: 'hash',
  base: BACECONTEXTPATH,
  routes,
  linkActiveClass: 'active'
})


router.beforeEach((to, from, next) => {
  //??????????????????????????????
  document.title = to.matched[to.matched.length-1].meta.title
  //??????????????????????????????????????????????????????????????????????????????
  // ???????????????????????????(beforeRouteUpdate???????????????)??????store??????
  if(to.matched[0].path==='/index'){
    let payload = {
      label: to.meta.title,
      path: to.path,
      query: to.query
    }
    store.commit(ADDIFNOTHAVETAB, payload)
  }


  next()
})

export default router

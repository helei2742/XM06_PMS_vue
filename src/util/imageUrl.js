/**
 * 整个app背景
 * @type {{backgroundSize: string, backgroundRepeat: string, marginTop: string}}
 */
export const APPBACkGROUND = {
    // backgroundImage: "url(" + require("@/assets/img/app_background.jpg") + ")",
    backgroundRepeat: "repeat",
    backgroundSize: "100%",
    marginTop: "5px",
}
/**
 * 欢迎背景
 * @type {{backgroundImage: string, backgroundSize: string, backgroundRepeat: string, marginTop: string}}
 */
export const WELCOMEBACKGROUND = {
    backgroundImage: "url(" + require("@/assets/img/welcome_background.jpg") + ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    marginTop: "5px",
}
/**
 * 登录背景
 * @type {{backgroundImage: string, backgroundSize: string, backgroundRepeat: string, marginTop: string}}
 */
export const LOGINBACKGROUND = {
    backgroundImage: "url(" + require("@/assets/img/login_background.jpg") + ")",
    backgroundRepeat: "repeat",
    backgroundSize: "100%",
    marginTop: "1px",
}
/**
 * 注册背景
 * @type {{backgroundImage: string, backgroundSize: string, backgroundRepeat: string, marginTop: string}}
 */
export const REGISTBACKGROUND = {
    backgroundImage: "url(" + require("@/assets/img/regist_background.jpg") + ")",
    backgroundRepeat: "repeat",
    backgroundSize: "100%",
    marginTop: "1px",
}
/**
 * 便签背景
 * @type {{backgroundImage: string, backgroundSize: string, backgroundRepeat: string, marginTop: string}}
 */
export const MEMOBACKGROUND = {
    backgroundImage: "url(" + require("@/assets/img/memo_background.jpg") + ")",
    backgroundRepeat: "repeat",
    backgroundSize: "100%",
    marginTop: "5px",
}

/**
 * 介绍页面轮播图
 * @type {*[]}
 */
export const INTRODUCEBSLIDESHOW = [
    require("../assets/img/introduce/introduce3.jpg"),
    require("../assets/img/introduce/introduce4.jpg"),
    require("../assets/img/introduce/introduce5.webp"),
    require("../assets/img/introduce/introduce6.webp")
]
/**
 * 介绍页面小组成员信息
 * @type {({name: string, imgSrc, desc: string}|{name: string, imgSrc, desc: string}|{name: string, imgSrc, desc: string}|{name: string, imgSrc, desc: string}|{name: string, imgSrc, desc: string})[]}
 */
export const INTRODUCEMEMBERIMG = [
    {
      name: '项目经理:何磊',
      desc: '四川大学计算机与科学专业本科生',
      imgSrc: require("@/assets/img/memberimg/member_img_default.png"),
    },
    {
        name: '成员:向宇',
        desc: '四川大学计算机与科学专业本科生',
        imgSrc: require("@/assets/img/memberimg/member_img_default.png"),
    },
    {
        name: '成员:赵文野',
        desc: '四川大学计算机与科学专业本科生',
        imgSrc: require("@/assets/img/memberimg/member_img_default.png"),
    },
    {
        name: '成员:陶群琪',
        desc: '四川大学计算机与科学专业本科生',
        imgSrc: require("@/assets/img/memberimg/member_img_default.png"),
    },
    {
        name: '成员:吴茂俊',
        desc: '四川大学计算机与科学专业本科生',
        imgSrc: require("@/assets/img/memberimg/member_img_default.png"),
    }
]


import { message } from "antd";
import { getAdminById, restoreLogin } from "./services/admin";
// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {

  // 1强行跳转登录页
  if (location.pathname === '/login') {
    const token = localStorage.getItem('adminToken')
    if (token) {
      const result = await restoreLogin()
      if (result.data) {
        //有token并且有效--不予跳转
        message.warn('请先退出登录')
        history.go(-1)
      }
    }
  }
  //2强行跳转内容页
  else {
    const result = await restoreLogin()
    if (result.data) {
      //有token并且有效
      const { data } = await getAdminById(result.data._id)
      //返回得到的用户信息，其他界面可用useModal获取到
      return {
        name: data.nickname,
        avatar: data.avatar,
        adminInfo: data,
      }
    }
    else {
      //token错误或者过期--删除token并且返回到登录界面
      localStorage.removeItem('adminToken')
      location.href = "/login"
      message.warning('请重新登录')
    }
  }

}

export const layout = () => {
  return {
    logo: 'https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-10-18-074620.png',
    iconfontUrl: '//at.alicdn.com/t/c/font_3871897_b3aesmhoa2v.js',
    menu: {
      locale: false,
    },
    logout:()=>{
      localStorage.removeItem("adminToken")
      location.href = "/login"
      message.success('退出登录成功')
    }
  };
};

export const request = {
  timeout: 3000,
  //拦截器
  requestInterceptors: [
    function(url, options) {
      const token = localStorage.getItem(`adminToken`)
      if (token) {
        //如果请求中存在token要一起传过去
        options.headers[`Authorization`] = `Bearer ` + token
      }
      return { url, options }
    }
  ]
}
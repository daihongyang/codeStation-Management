// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {
  return { name: 'codeStation' };
}

export const layout = () => {
  return {
    logo: 'https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-10-18-074620.png',
    menu: {
      locale: false,
    },
    iconfontUrl: '//at.alicdn.com/t/c/font_3871897_b3aesmhoa2v.js',
  };
};
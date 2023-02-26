import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'codeStation',
  },
  dva: {},
  routes: [
    {
      path: '/',
      redirect: '/home',
      access: "NormalAdmin"
    },
    {
      name: '首页',
      path: '/home',
      icon: 'icon-home',
      component: './Home',
      access: "NormalAdmin"
    },
    {
      path: '/login',
      menuRender: false,
      component: './Login',
    },
    {
      name: '管理员',
      path: '/admin',
      icon: 'icon-admin',
      access: "SuperAdmin",
      routes: [
        {
          name: '管理员列表',
          path: 'adminList',
          component: './Admin/AdminList',
          access: "SuperAdmin",
        },
        {
          name: '添加管理员',
          path: 'addAdmin',
          component: './Admin/AddAdmin',
          access: "SuperAdmin",
        },
      ],
    },
    {
      name: '面试题',
      path: '/interview',
      icon: 'icon-mianshi',
      access: 'NormalAdmin',
      routes: [
        {
          name: '面试题列表',
          path: 'interviewList',
          component: './Interview/InterviewList',
          access: "NormalAdmin",
        },
        {
          name: '添加面试题',
          path: 'addInterview',
          component: './Interview/AddInterview',
          access: "NormalAdmin"
        },
        {
          name: '编辑面试题',
          path: 'editInterview/:id',
          component: './Interview/EditInterview',
          hideInMenu: true,
          access: "NormalAdmin"
        }
      ],
    },
    {
      name: '用户',
      path: '/user',
      icon: 'icon-user',
      access: "NormalAdmin",
      routes: [
        {
          name: '用户列表',
          path: 'userList',
          component: './User/UserList',
          access: "NormalAdmin",
        },
        {
          name: '添加用户',
          path: 'addUser',
          component: './User/AddUser',
          access: "NormalAdmin"
        },
        {
          name: '编辑用户',
          path: 'editUser',
          component: './User/EditUser',
          hideInMenu: true,
          access: "NormalAdmin"
        },
      ],
    },
    {
      name: '问答',
      path: '/issue',
      icon: 'icon-answer',
      access: "NormalAdmin",
      routes: [
        {
          name: '问答列表',
          path: 'issueList',
          component: './Issue/IssueList',
          access: "NormalAdmin"
        },
        {
          name: '问答详情',
          path: 'issueDetail/:id',
          component: './Issue/IssueDetail',
          hideInMenu: true,
          access: "NormalAdmin"
        },
      ],
    },
    {
      name: '书籍',
      path: '/book',
      icon: 'icon-book',
      access: "NormalAdmin",
      routes: [
        {
          name: '书籍列表',
          path: 'bookList',
          component: './Book/BookList',
          access: "NormalAdmin"
        },
        {
          name: '添加书籍',
          path: 'addBook',
          component: './Book/AddBook',
          access: "NormalAdmin"
        },
        {
          name: '编辑书籍',
          path: 'editBook/:id',
          component: './Book/EditBook',
          hideInMenu: true,
          access: "NormalAdmin"
        },
      ],
    },
    {
      name: '分类',
      path: '/type',
      icon: 'icon-type',
      access: "NormalAdmin",
      routes: [
        {
          name: '分类列表',
          path: 'typeList',
          component: './Type/TypeList',
          access: "NormalAdmin"
        },
        {
          name: '添加分类',
          path: 'addType',
          component: './Type/AddType',
          access: "NormalAdmin"
        },
      ],
    },
    {
      name: '评论',
      path: '/comment',
      icon: 'icon-comment',
      access: "NormalAdmin",
      routes: [
        {
          name: '评论列表',
          path: 'commentList',
          component: './Comment/CommentList',
          access: "NormalAdmin"
        }
      ],
    },
  ],
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
    '/static': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
    '/res': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
  },
  npmClient: 'npm',
});

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
    },
    {
      name: '首页',
      path: '/home',
      icon: 'icon-home',
      component: './Home',
    },
    {
      name: '管理员',
      path: '/admin',
      icon: 'icon-admin',
      routes: [
        {
          name: '管理员列表',
          path: 'adminList',
          component: './Admin/AdminList',
        },
        {
          name: '添加管理员',
          path: 'addAdmin',
          component: './Admin/AddAdmin',
        },
      ],
    },
    {
      name: '用户',
      path: '/user',
      icon: 'icon-user',
      routes: [
        {
          name: '用户列表',
          path: 'userList',
          component: './User/UserList',
        },
        {
          name: '添加用户',
          path: 'addUser',
          component: './User/AddUser',
        },
        {
          name: '编辑用户',
          path: 'editUser',
          component: './User/EditUser',
          hideInMenu: true,
        },
      ],
    },
    {
      name: '问答',
      path: '/issue',
      icon: 'icon-answer',
      routes: [
        {
          name: '问答列表',
          path: 'issueList',
          component: './Issue/IssueList',
        },
        {
          name: '添加问答',
          path: 'addIssue',
          component: './Issue/AddIssue',
        },
      ],
    },
    {
      name: '书籍',
      path: '/book',
      icon: 'icon-book',
      routes: [
        {
          name: '书籍列表',
          path: 'bookList',
          component: './Book/BookList',
        },
        {
          name: '添加书籍',
          path: 'addBook',
          component: './Book/AddBook',
        },
      ],
    },
    {
      name: '分类',
      path: '/type',
      icon: 'icon-type',
      routes: [
        {
          name: '分类列表',
          path: 'typeList',
          component: './Type/TypeList',
        },
        {
          name: '添加分类',
          path: 'addType',
          component: './Type/AddType',
        },
      ],
    },
    {
      name: '评论',
      path: '/comment',
      icon: 'icon-comment',
      routes: [
        {
          name: '评论列表',
          path: 'commentList',
          component: './Comment/CommentList',
        },
        {
          name: '添加评论',
          path: 'addComment',
          component: './Comment/AddComment',
        },
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

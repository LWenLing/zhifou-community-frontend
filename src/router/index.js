import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    // @表示src根目录
    component: () => import("@/views/Home"), 
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/Register"),
    meta: { title: "注册" },
  },
  // 登录
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/auth/Login"),
    meta: { title: "登录" },
  },
   // 标签搜索
   {
    name: "searchtag",
    path: "/searchtag/:name",
    component: () => import("@/views/searchtag/SearchTag"),
    meta: { title: "标签搜索" },
  },
  // 发布
  {
    name: "post-create",
    path: "/post/create",
    component: () => import("@/views/post/Create"),
    meta: { title: "信息发布", requireAuth: true },
  },
  // 编辑
  {
    name: 'topic-edit',
    path: '/topic/edit/:id',
    component: () => import('@/views/post/Edit'),
    meta: {
      title: '编辑',
      requireAuth: true
    }
  },
  // 详情
  {
    name: "post-detail",
    path: "/post/:id",
    component: () => import("@/views/post/Detail"),
    meta: { title: "详情" },
  },
  {
    name: 'tag',
    path: '/tag/:name',
    component: () => import('@/views/tag/Tag'),
    meta: { title: '主题列表' }
  },
  // 检索
  {
    name: 'search',
    path: '/search',
    component: () => import('@/views/Search'),
    meta: { title: '检索' }
  },
  // 关于我们
  {
    name: 'about',
    path: '/about',
    component: () => import('@/views/about/About'),
    meta: { title: '关于我们' }
  },
  // 用户主页
  {
    name: 'user',
    path: '/member/:username/home',
    component: () => import('@/views/user/Profile'),
    meta: { title: '用户主页' }
  },

  //轮播图片
  {
    name: 'carousel',
    path: '/carousel',
    component: () => import('@/views/card/Carousel'),
    meta: { title: '轮播' }
  },

  //问答
  {
    name: 'answer',
    path: '/answer',
    component: () => import('@/views/answer/AnswerIndex'),
    meta: { title: '问答' }
  },
  {
    name: 'answer',
    path: '/answer/create',
    component: () => import('@/views/answer/AnswerCreate'),
    meta: { title: '提出问题' }
  },
  {
    name: 'answer',
    path: '/answer/comment',
    component: () => import('@/views/answer/AnswerComment'),
    meta: { title: '回答问题' }
  },

  {
    name: "answer-detail",
    path: "/answer/:id",
    component: () => import("@/views/answer/AnswerDetail"),
    meta: { title: "问答详情" },
  },
  // 用户设置
  {
    name: 'user-setting',
    path: '/member/:username/setting',
    component: () => import('@/views/user/Setting'),
    meta: { title: '设置', requireAuth: true }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404"),
    meta: { title: "404-NotFound" },
  },
  {
    // 当用户输入一个无效地址，都会重定向到404页面
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];


const originalPush = VueRouter.prototype.push;
// 重写push功能，调用原来的push功能，并且捕捉error，当出现异常的时候，捕捉异常就不会再抛出异常
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  routes,
});

export default router;

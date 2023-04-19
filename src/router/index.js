import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/Home.vue')
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   meta: {
  //     title: '关于'
  //   },
  //   component: () => import('@/views/About.vue')
  // }
];

const router = new VueRouter({
  mode: 'history',
  routes,
  base:'/Project/'
});

export default router;

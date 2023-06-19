import Vue from 'vue'
import VueRouter from 'vue-router'

import '@fortawesome/fontawesome-free/css/all.css';

import '../assets/css/common.css';

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },

  // initial
  {
    path: '/initial',
    name: '',
    component: () => import('../views/Template.vue'),
    children: [
      {
        path: '',
        name: 'Initial',
        component: () => import('../views/Initial/Index.vue'),
      },
      {
        path: 'ai',
        name: 'InitialAi',
        component: () => import('../views/Initial/Ai.vue'),
      },
      {
        path: 'mint',
        name: 'InitialMint',
        component: () => import('../views/Initial/Mint.vue'),
      },
    ],
  },

  // mypage
  {
    path: '/mypage',
    name: 'Mypage',
    component: () => import('../views/Mypage.vue'),
  },

  // sbt
  {
    path: '/sbt',
    name: '',
    component: () => import('../views/Template.vue'),
    children: [
      {
        path: 'search',
        name: 'SbtSearch',
        component: () => import('../views/Sbt/Search.vue'),
      },
      {
        path: 'detail/:sbt_id',
        name: 'SbtDetail',
        component: () => import('../views/Sbt/Detail.vue'),
      },
    ],
  },

  // match
  {
    path: '/match',
    name: '',
    component: () => import('../views/Template.vue'),
    children: [
      {
        path: 'search',
        name: 'MatchSearch',
        component: () => import('../views/Match/Search.vue'),
      },
      {
        path: 'detail/:sbt_id',
        name: 'MatchDetail',
        component: () => import('../views/Match/Detail.vue'),
      },
    ],
  },

]

const router = new VueRouter({
  mode: 'hash',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if(savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;

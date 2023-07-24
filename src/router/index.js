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

  // looking
  {
    path: '/looking',
    name: '',
    component: () => import('../views/Template.vue'),
    children: [
      {
        path: 'job',
        name: '',
        component: () => import('../views/Template.vue'),
        children: [
          {
            path: '',
            name: 'LookingJob',
            component: () => import('../views/Looking/Job/Index.vue'),
          },
          {
            path: 'detail/:job_id',
            name: 'LookingJobDetail',
            component: () => import('../views/Looking/Job/Detail.vue'),
          },
          {
            path: 'offer',
            name: 'LookingJobOffer',
            component: () => import('../views/Looking/Job/Offer.vue'),
          },
        ]
      },
      {
        path: 'buddy',
        name: '',
        component: () => import('../views/Template.vue'),
        children: [
          {
            path: 'create',
            name: 'LookingBuddyCreate',
            component: () => import('../views/Looking/Buddy/Create.vue'),
          },
          {
            path: 'check/:job_id',
            name: 'LookingBuddyCheck',
            component: () => import('../views/Looking/Buddy/Check.vue'),
          },
          {
            path: 'recommend/:job_id',
            name: 'LookingBuddyRecommend',
            component: () => import('../views/Looking/Buddy/Recommend.vue'),
          },
          {
            path: 'offer/:job_id',
            name: 'LookingBuddyOffer',
            component: () => import('../views/Looking/Buddy/Offer.vue'),
          },
        ]
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

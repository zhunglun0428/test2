import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    
    {
      path: '/signUp',
      name: 'signUp',
      component: () => import('../components/SignUp.vue')
    },
    {
      path: '/inputInfo',
      name: 'inputInfo',
      component: () => import('../components/InputInfo.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../components/Chat.vue')
    },
    {
      path: '/choosePicture',
      name: 'choosePicture',
      component: () => import('../components/ChoosePicture.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../components/Test.vue')
    },
    {
      path: "/:catchAll(.*)",
      component: () => import('../components/NotFound.vue')
    },

  ]
})

export default router

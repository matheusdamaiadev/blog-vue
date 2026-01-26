import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Post from '../pages/Post.vue'
import CreatePost from '../pages/CreatePost.vue'
import Login from '../pages/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/post/:id',
    name: 'Post',
    component: Post
  },

  {
    path: '/create',
    name: 'CreatePost',
    component: CreatePost
  },

  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path: '/perfil/:username',
    name: 'Profile',
    component: () => import('../pages/Profile.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Post from '../pages/Post.vue'
import CreatePost from '../pages/CreatePost.vue'
import Login from '../pages/Login.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/post/:id', component: Post },
  { path: '/create', component: CreatePost },
  { path: '/login', component: Login },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

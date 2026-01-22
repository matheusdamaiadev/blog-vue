import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Post from '../pages/Post.vue'
import CreatePost from '../pages/CreatePost.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/post/:id', component: Post },
  { path: '/create', component: CreatePost }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

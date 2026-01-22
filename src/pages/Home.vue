<template>
  <div>
    <h1>Blog</h1>

    <PostCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
  </div>
</template>

<script setup>
import PostCard from '../components/PostCard.vue'

const posts = [
  { id: 1, title: 'Primeiro post', content: 'Conteúdo do post' },
  { id: 2, title: 'Segundo post', content: 'Outro conteúdo' }
]
</script>
    
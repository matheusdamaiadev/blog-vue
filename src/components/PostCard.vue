<template>
  <div class="card">
    <h2>{{ post.title }}</h2>
    <RouterLink :to="`/post/${post.id}`">Ler mais</RouterLink>
  </div>
</template>

<script setup>
defineProps({
  post: Object
})
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 12px;
}
</style>

<template>
  <div>
    <h1>Post {{ route.params.id }}</h1>
    <p>Conteúdo do post...</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

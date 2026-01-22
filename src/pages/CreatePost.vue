<template>
  <div>
    <h1>Criar Post</h1>

    <input v-model="title" placeholder="Título" />
    <textarea v-model="content" placeholder="Conteúdo"></textarea>

    <button @click="createPost">Postar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('')
const content = ref('')

function createPost() {
  console.log('clicou')
  console.log(title.value, content.value)
}
</script>

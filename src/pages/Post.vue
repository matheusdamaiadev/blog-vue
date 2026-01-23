<template>
  <div class="post-page">

    <div class="post-container" v-if="post">
      <h1>{{ post.title }}</h1>
      <!-- Data sem os segundos -->
      <p class="date">{{ new Date(post.created_at).toLocaleString('pt-BR', { 
        day: '2-digit', month: '2-digit', year: 'numeric', 
        hour: '2-digit', minute: '2-digit' 
      }) }}</p>
      <div class="content">{{ post.content }}</div>
    </div>

    <p v-else class="loading">Carregando...</p>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import { ref, onMounted } from 'vue'
import { supabase } from '../services/supabase.js'
import { useRoute } from 'vue-router'

export default {
  components: { Navbar },
  setup() {
    const route = useRoute()
    const post = ref(null)

    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', route.params.id)
        .single()

      if (!error) post.value = data
    }

    onMounted(fetchPost)
    return { post }
  }
}
</script>

<style scoped>
.post-page {
  max-width: 700px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: sans-serif;
}

.post-container h1 {
  margin-bottom: 0.5rem;
  text-align: center;
}

.date {
  text-align: center;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 1rem;
}

.content {
  line-height: 1.6;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.loading {
  text-align: center;
  margin-top: 2rem;
}
</style>

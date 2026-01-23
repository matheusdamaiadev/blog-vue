<template>
  <div class="home">

    <h1>Posts</h1>

    <!-- Filtro -->
    <div class="filter">
      <button @click="order = 'desc'" :class="{ active: order === 'desc' }">Mais recente</button>
      <button @click="order = 'asc'" :class="{ active: order === 'asc' }">Mais antigo</button>
    </div>

    <!-- Lista de posts -->
    <div class="posts">
      <PostCard 
        v-for="post in posts" 
        :key="post.id" 
        :post="post" 
      />
    </div>

    <!-- Mensagem caso não haja posts -->
    <p v-if="posts.length === 0" class="empty">Nenhum post disponível.</p>

  </div>
</template>

<script>
import PostCard from '../components/PostCard.vue'
import { supabase } from '../services/supabase.js'
import { ref, onMounted, watch } from 'vue'

export default {
  components: { PostCard },
  setup() {
    const posts = ref([])
    const order = ref('desc')

    // Função para buscar posts
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: order.value === 'asc' })
      
      if (!error) {
        posts.value = data
      } else {
        console.error('Erro ao buscar posts:', error)
      }
    }

    // Executa ao montar o componente
    onMounted(fetchPosts)

    // Reexecuta ao mudar o filtro
    watch(order, fetchPosts)

    return { posts, order }
  }
}
</script>

<style scoped>
.home {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
  font-family: sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.filter {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.filter button {
  padding: 0.5rem 1rem;
  border: 1px solid #333;
  background: none;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.filter button.active {
  background-color: #333;
  color: #fff;
}

.posts {
  display: grid;
  margin-top: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.empty {
  text-align: center;
  margin-top: 2rem;
  color: #666;
}
</style>

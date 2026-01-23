<template>
  <div class="home">

    <h1>Blog</h1>

    <div class="filter">
      <button @click="order = 'desc'" :class="{ active: order === 'desc' }">Mais recente</button>
      <button @click="order = 'asc'" :class="{ active: order === 'asc' }">Mais antigo</button>
    </div>

    <div class="posts">
      <PostCard 
        v-for="post in posts" 
        :key="post.id" 
        :post="post" 
      />
    </div>

    <p v-if="posts.length === 0" class="empty">Nenhum post disponível.</p>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import PostCard from '../components/PostCard.vue'
import { supabase } from '../services/supabase.js'
import { ref, onMounted, watch } from 'vue'

export default {
  components: { Navbar, PostCard },
  setup() {
    const posts = ref([])
    const order = ref('desc')

    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: order.value === 'asc' })

      if (!error) posts.value = data
    }

    onMounted(fetchPosts)
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
  margin-bottom: 1rem;
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
}

.filter button.active {
  background-color: #333;
  color: #fff;
}

.posts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.empty {
  text-align: center;
  margin-top: 2rem;
}
</style>

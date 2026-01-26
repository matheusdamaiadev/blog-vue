<template>
  <div class="home">
    <h1>Posts</h1>

    <!-- Filtro -->
    <div class="filter">
      <button
        @click="order = 'desc'"
        :class="{ active: order === 'desc' }"
      >
        Mais recente
      </button>

      <button
        @click="order = 'asc'"
        :class="{ active: order === 'asc' }"
      >
        Mais antigo
      </button>
    </div>

    <!-- Lista de posts -->
    <div class="posts">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </div>

    <!-- Empty state -->
    <p v-if="posts.length === 0" class="empty">
      Nenhum post disponível.
    </p>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { supabase } from '../services/supabase.js'
import PostCard from '../components/PostCard.vue'

export default {
  components: { PostCard },

  setup() {
    const posts = ref([])
    const order = ref('desc')

    const fetchPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      created_at,
      profiles (
        username
      )
    `)
    .order('created_at', { ascending: order.value === 'asc' })

  if (!error) {
    posts.value = data
  } else {
    console.error(error)
  }
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
  padding: 2rem 1rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Título */
h1 {
  text-align: center;
  margin-bottom: 1.8rem;
  font-size: 2rem;
  font-weight: 700;
  color: #111;
}

/* Filtro */
.filter {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 2rem;
}

.filter button {
  padding: 0.4rem 1.1rem;
  border-radius: 999px;
  border: 1px solid #222;
  background: transparent;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.25s ease;
  color: #222;
}

.filter button:hover {
  background: #f2f2f2;
}

.filter button.active {
  background: #222;
  color: #fff;
}

/* Grid de posts */
.posts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.2rem;
}

/* Empty */
.empty {
  text-align: center;
  margin-top: 3rem;
  color: #666;
  font-size: 0.95rem;
}

/* Mobile */
@media (max-width: 600px) {
  h1 {
    font-size: 1.7rem;
  }

  .filter {
    gap: 0.6rem;
  }

  .filter button {
    font-size: 0.85rem;
    padding: 0.35rem 0.9rem;
  }
}
</style>

<template>
  <div class="post-page">
    <div class="post-container" v-if="post">
      <h1>{{ post.title }}</h1>

      <!-- Autor -->
      <router-link
        class="author"
        :to="`/perfil/${post.profiles.username}`"
      >
        @{{ post.profiles.username }}
      </router-link>

      <p class="date">{{ formattedDate }}</p>

      <div class="content">
        {{ post.content }}
      </div>
    </div>

    <p v-else class="loading">Carregando...</p>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../services/supabase.js'

export default {
  setup() {
    const route = useRoute()
    const post = ref(null)

    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          title,
          content,
          created_at,
          profiles (
            username
          )
        `)
        .eq('id', route.params.id)
        .single()

      if (error) {
        console.error(error)
        return
      }

      post.value = data
    }

    onMounted(fetchPost)

    const formattedDate = computed(() => {
      if (!post.value) return ''
      return new Date(post.value.created_at).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    })

    return { post, formattedDate }
  }
}
</script>
<style>
  .post-page {
  max-width: 760px;
  margin: 3rem auto;
  padding: 0 1rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}

.post-container {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background: #fafafa;
  padding: 2.5rem 2.2rem;
  border-radius: 14px;
}

/* título */
.post-container h1 {
  text-align: center;
  font-size: 1.9rem;
  font-weight: 700;
  color: #111;
  margin: 0;
}

/* autor */
.author {
  text-align: center;
  font-size: 0.85rem;
  color: #555;
  text-decoration: none;
}

.author:hover {
  text-decoration: underline;
}

/* data */
.date {
  text-align: center;
  font-size: 0.8rem;
  color: #888;
}

/* conteúdo */
.content {
  font-size: 1.05rem;
  line-height: 1.9;
  color: #222;
  white-space: pre-wrap;
  padding-top: 1.5rem;
  border-top: 1px solid #e6e6e6;
}

/* botão excluir */
.delete-btn {
  align-self: center;
  margin-top: 1.5rem;
  padding: 0.55rem 1.3rem;
  border-radius: 6px;
  border: none;
  background: #ff3b3b;
  color: #fff;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.delete-btn:hover {
  background: #e03131;
}

/* loading */
.loading {
  text-align: center;
  margin-top: 3rem;
  color: #666;
}

/* responsivo */
@media (max-width: 600px) {
  .post-container {
    padding: 1.8rem 1.4rem;
  }

  .post-container h1 {
    font-size: 1.6rem;
  }
}

</style>
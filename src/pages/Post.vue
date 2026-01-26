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

      <!-- Só aparece se for o autor -->
      <button
        v-if="user && user.id === post.author_id"
        class="delete-btn"
        @click="deletePost"
      >
        Excluir Post
      </button>
    </div>

    <p v-else class="loading">Carregando...</p>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../services/supabase.js'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    const post = ref(null)
    const user = ref(null)

    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          title,
          content,
          created_at,
          author_id,
          profiles (
            username
          )
        `)
        .eq('id', route.params.id)
        .single()

      if (!error) post.value = data
    }

    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()
      user.value = data.user
    }

    onMounted(() => {
      fetchUser()
      fetchPost()
    })

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

    const deletePost = async () => {
      const confirmDelete = confirm('Deseja realmente excluir este post?')
      if (!confirmDelete) return

      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', post.value.id)

      if (!error) {
        router.push('/')
      } else {
        alert('Erro ao excluir post')
      }
    }

    return { post, user, formattedDate, deletePost }
  }
}
</script>

<style scoped>
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

.date {
  text-align: center;
  font-size: 0.8rem;
  color: #888;
}

.content {
  font-size: 1.05rem;
  line-height: 1.9;
  color: #222;
  white-space: pre-wrap;
  padding-top: 1.5rem;
  border-top: 1px solid #e6e6e6;
}

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
}

.delete-btn:hover {
  background: #e03131;
}

.loading {
  text-align: center;
  margin-top: 3rem;
  color: #666;
}

@media (max-width: 600px) {
  .post-container {
    padding: 1.8rem 1.4rem;
  }

  .post-container h1 {
    font-size: 1.6rem;
  }
}
</style>

<template>
  <div class="create-post">
    <h1>Criar Post</h1>

    <!-- NÃO LOGADO -->
    <p v-if="!user">
      Você precisa estar logado para criar um post.
    </p>

    <!-- LOGADO -->
    <form v-else @submit.prevent="createPost">
      <input
        v-model="title"
        type="text"
        placeholder="Título do post"
        required
      />

      <textarea
        v-model="content"
        placeholder="Conteúdo do post"
        required
      ></textarea>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Publicando...' : 'Publicar' }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">Post criado com sucesso!</p>
    </form>
  </div>
</template>
<script>
import { supabase } from '../services/supabase'

export default {
  data() {
    return {
      user: null,
      title: '',
      content: '',
      loading: false,
      error: null,
      success: false
    }
  },

  async mounted() {
    const { data } = await supabase.auth.getUser()
    this.user = data.user

    supabase.auth.onAuthStateChange((_event, session) => {
      this.user = session?.user || null
    })
  },

  methods: {
    async createPost() {
      if (!this.user) return

      this.loading = true
      this.error = null

      const { data, error } = await supabase
        .from('posts')
        .insert([
          {
            title: this.title,
            content: this.content,
            author_id: this.user.id
          }
        ])
        .select()
        .single()

      this.loading = false

      if (error) {
        this.error = error.message
      } else {
        // 👉 vai direto pro post criado
        this.$router.push(`/post/${data.id}`)
      }
    }
  }
}
</script>


<style scoped>
.create-post {
  max-width: 600px;
  margin: 2rem auto;
  font-family: sans-serif;
}

input,
textarea {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.6rem;
}

button {
  padding: 0.6rem 1.2rem;
  background: #222;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 1rem;
}

.success {
  color: green;
  margin-top: 1rem;
}
</style>

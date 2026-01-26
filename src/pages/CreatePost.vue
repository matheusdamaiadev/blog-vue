<template>
  <div class="create-post-page">
    <h1>Criar post</h1>

    <!-- NÃO LOGADO -->
    <p v-if="!user" class="warning">
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
        {{ loading ? 'Publicando…' : 'Publicar' }}
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
        this.$router.push(`/post/${data.id}`)
      }
    }
  }
}
</script>
<style>
  /* 🔒 Blindagem contra overflow no mobile */
* {
  box-sizing: border-box;
}

/* Página */
.create-post-page {
  max-width: 560px;
  margin: 3rem auto;
  padding-left: 1.2rem;
  padding-right: 1.2rem;
  width: 100%;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Título */
h1 {
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #111;
}

/* Formulário */
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Inputs */
input,
textarea {
  width: 100%;
  max-width: 100%;
  padding: 0.75rem 0.9rem;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 0.95rem;
  font-family: inherit;
  resize: vertical;
}

/* Focus elegante */
input:focus,
textarea:focus {
  outline: none;
  border-color: #222;
}

/* Botão (pill) */
button {
  margin-top: 0.5rem;
  padding: 0.6rem 1.4rem;
  border-radius: 999px;
  border: none;
  background: #222;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  align-self: center;
  transition: background 0.2s ease;
}

button:hover {
  background: #000;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Mensagens */
.error {
  margin-top: 0.8rem;
  text-align: center;
  font-size: 0.85rem;
  color: #e03131;
}

.success {
  margin-top: 0.8rem;
  text-align: center;
  font-size: 0.85rem;
  color: #2f9e44;
}

/* Mobile refinado */
@media (max-width: 600px) {
  .create-post-page {
    margin: 2rem auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  h1 {
    font-size: 1.5rem;
  }
}

</style>

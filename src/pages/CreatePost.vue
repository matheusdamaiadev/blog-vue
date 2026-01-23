<template>
  <div class="create-post">

    <h1>Criar Post</h1>

    <form @submit.prevent="submitPost">
      <div class="form-group">
        <label for="title">Título</label>
        <input type="text" id="title" v-model="title" placeholder="Digite o título" required />
      </div>

      <div class="form-group">
        <label for="content">Conteúdo</label>
        <textarea id="content" v-model="content" placeholder="Digite o conteúdo do post" required></textarea>
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Postando...' : 'Postar' }}
      </button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import { ref } from 'vue'
import { supabase } from '../services/supabase.js'

export default {
  components: { Navbar },
  setup() {
    const title = ref('')
    const content = ref('')
    const loading = ref(false)
    const error = ref('')
    const success = ref('')

    const submitPost = async () => {
      if (!title.value || !content.value) return

      loading.value = true
      error.value = ''
      success.value = ''

      const { data, error: supabaseError } = await supabase
        .from('posts')
        .insert([{ title: title.value, content: content.value }])

      loading.value = false

      if (supabaseError) {
        error.value = 'Erro ao criar post: ' + supabaseError.message
      } else {
        success.value = 'Post criado com sucesso!'
        title.value = ''
        content.value = ''
      }
    }

    return { title, content, loading, error, success, submitPost }
  }
}
</script>

<style scoped>
.create-post {
  max-width: 600px;
  margin: 2rem auto;
  font-family: sans-serif;
}

.create-post h1 {
  text-align: center;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

button {
  padding: 0.5rem 1rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 1rem auto 0;
  font-size: 1rem;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #000;
}

.error {
  color: red;
  text-align: center;
  margin-top: 1rem;
}

.success {
  color: green;
  text-align: center;
  margin-top: 1rem;
}
@media (max-width: 700px) {
  .create-post {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

</style>

<template>
  <div class="profile-page">
    <!-- Cabeçalho -->
    <section class="profile-header">
      <h1>@{{ profile.username }}</h1>
      <p class="email">{{ profile.email }}</p>

      <p class="counter">
        {{ posts.length }} post{{ posts.length !== 1 ? 's' : '' }}
      </p>

      <button
        v-if="isOwnProfile && !editing"
        class="edit-btn"
        @click="enableEdit"
      >
        Editar perfil
      </button>
    </section>

    <!-- Formulário de edição -->
    <section v-if="editing" class="edit-form">
      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        v-model="newUsername"
        placeholder="Seu novo username"
      />

      <div class="actions">
        <button class="save-btn" @click="saveUsername" :disabled="loading">
          {{ loading ? 'Salvando...' : 'Salvar' }}
        </button>

        <button class="cancel-btn" @click="cancelEdit" :disabled="loading">
          Cancelar
        </button>
      </div>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </section>

    <!-- Filtro -->
    <section class="filter" v-if="posts.length">
      <button
        @click="order = 'desc'"
        :class="{ active: order === 'desc' }"
      >
        Mais recentes
      </button>
      <button
        @click="order = 'asc'"
        :class="{ active: order === 'asc' }"
      >
        Mais antigos
      </button>
    </section>

    <!-- Posts -->
    <section class="posts">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </section>

    <p v-if="posts.length === 0" class="empty">
      Nenhum post ainda 😢
    </p>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../services/supabase'
import PostCard from '../components/PostCard.vue'

export default {
  components: { PostCard },
  setup() {
    const route = useRoute()
    const profile = ref({})
    const posts = ref([])
    const order = ref('desc')

    const editing = ref(false)
    const newUsername = ref('')
    const loading = ref(false)
    const error = ref('')
    const success = ref('')

    const ownUserId = ref(null)
    const isOwnProfile = ref(false)

    const fetchCurrentUser = async () => {
      const { data } = await supabase.auth.getUser()
      ownUserId.value = data.user.id
    }

    const fetchProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', route.params.username)
        .single()

      profile.value = data
      newUsername.value = data.username
      isOwnProfile.value = data.id === ownUserId.value
    }

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
    const enableEdit = () => {
      editing.value = true
      error.value = ''
      success.value = ''
    }

    const cancelEdit = () => {
      editing.value = false
      newUsername.value = profile.value.username
    }

    const saveUsername = async () => {
      loading.value = true

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ username: newUsername.value })
        .eq('id', profile.value.id)

      loading.value = false

      if (!updateError) {
        profile.value.username = newUsername.value
        editing.value = false
        success.value = 'Username atualizado!'
      } else {
        error.value = updateError.message
      }
    }

    onMounted(async () => {
      await fetchCurrentUser()
      await fetchProfile()
      await fetchPosts()
    })

    watch(order, fetchPosts)

    return {
      profile,
      posts,
      order,
      editing,
      newUsername,
      enableEdit,
      cancelEdit,
      saveUsername,
      loading,
      error,
      success,
      isOwnProfile
    }
  }
}
</script>

<style scoped>
.profile-page {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: system-ui, sans-serif;
}

/* Header */
.profile-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.profile-header h1 {
  font-size: 2rem;
  margin-bottom: 0.2rem;
}

.email {
  color: #777;
  font-size: 0.9rem;
}

.counter {
  margin-top: 0.6rem;
  font-weight: 500;
  color: #444;
}

/* Botões */
.edit-btn,
.save-btn,
.cancel-btn {
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.25s ease;
}

.edit-btn {
  background: #111;
  color: #fff;
  margin-top: 1rem;
}

.edit-btn:hover {
  transform: translateY(-2px);
  background: #000;
}

/* Form */
.edit-form {
  max-width: 420px;
  margin: 0 auto 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.edit-form input {
  padding: 0.6rem;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.actions {
  display: flex;
  gap: 0.6rem;
  justify-content: center;
}

.save-btn {
  background: #0a8;
  color: #fff;
}

.save-btn:hover {
  background: #087;
}

.cancel-btn {
  background: #ccc;
}

.cancel-btn:hover {
  background: #aaa;
}

/* Filtro */
.filter {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
}

.filter button {
  padding: 0.4rem 1rem;
  border-radius: 999px;
  border: 1px solid #222;
  background: transparent;
  cursor: pointer;
  color: #222;
}

.filter button.active {
  background: #222;
  color: #fff;
}

/* Posts */
.posts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.2rem;
}

.empty {
  text-align: center;
  margin-top: 3rem;
  color: #666;
}

/* Feedback */
.error {
  color: #d00;
  text-align: center;
}

.success {
  color: #0a8;
  text-align: center;
}

/* Mobile */
@media (max-width: 600px) {
  .profile-header h1 {
    font-size: 1.6rem;
  }

  .actions {
    flex-direction: column;
  }
}
</style>

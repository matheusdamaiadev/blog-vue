<template>
  <div class="login-page">

    <h1>Login</h1>

    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <input
          type="email"
          placeholder="Email"
          v-model="email"
          required
        />
      </div>

      <div class="form-group">
        <input
          type="password"
          placeholder="Senha"
          v-model="password"
          required
        />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Entrando...' : 'Entrar / Criar conta' }}
      </button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>

  </div>
</template>

<script>
import { ref } from 'vue'
import { supabase } from '../services/supabase.js'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const error = ref('')
    const success = ref('')

    const handleLogin = async () => {
      loading.value = true
      error.value = ''
      success.value = ''

      // tenta login
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
      })

      // se falhar, tenta cadastro
      if (signInError) {
        const { error: signUpError } = await supabase.auth.signUp({
          email: email.value,
          password: password.value
        })

        if (signUpError) {
          error.value = signUpError.message
          loading.value = false
          return
        }

        success.value = 'Conta criada! Você já está logado.'
        loading.value = false
        return
      }

      success.value = 'Login realizado com sucesso!'
      loading.value = false
    }

    return {
      email,
      password,
      loading,
      error,
      success,
      handleLogin
    }
  }
}
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
  text-align: center;
  font-family: sans-serif;
}

.form-group {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 0.6rem;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
}

button:hover:enabled {
  background-color: #000;
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

<template>
  <div class="login-page">

    <h1>Login</h1>

    <p>Funcionalidade de login será implementada depois.</p>

    <button>Entrar</button>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  components: { Navbar }
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

button {
  padding: 0.5rem 1rem;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #000;
}
</style>

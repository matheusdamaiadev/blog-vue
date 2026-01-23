<template>
  <nav class="navbar">
    <router-link to="/">Home</router-link>
    <router-link to="/create">Criar Post</router-link>
    <router-link to="/login">Login</router-link>
  </nav>
</template>

<script>
export default {}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.navbar a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.navbar a:hover {
  color: #000;
}
</style>

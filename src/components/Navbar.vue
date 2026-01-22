<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/create">Criar Post</RouterLink>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #111;
}

a {
  color: white;
  text-decoration: none;
}
</style>

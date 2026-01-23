<template>
  <nav class="navbar">
    <div class="left">
      <router-link to="/" class="site-name">The Blog</router-link>
    </div>

    <div class="center">
      <router-link to="/">Home</router-link>
      <router-link to="/create">Criar Post</router-link>
    </div>

    <div class="right">
      <router-link to="/login" class="login-btn">Login</router-link>
    </div>
  </nav>
</template>

<script>
export default {}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
  font-family: sans-serif;
}

/* Nome do site */
.site-name {
  font-weight: 700;
  font-size: 1.2rem;
  color: #333;
  text-decoration: none;
}

/* Central links */
.center {
  display: flex;
  gap: 1.5rem;
}

.center a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.center a:hover {
  color: #000;
  text-decoration: underline;
}

/* Login botão à direita */
.right .login-btn {
  background-color: #000;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
}

.right .login-btn:hover {
  background-color: #333;
  color: #fff;
}

/* Responsivo: empilha em telas pequenas */
@media (max-width: 600px) {
  .navbar {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .center {
    justify-content: flex-start;
  }

  .right {
    align-self: flex-end;
  }
}
</style>

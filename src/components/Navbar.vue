<template>
  <nav class="navbar">
    <!-- Logo -->
    <router-link to="/" class="site-name">The Blog</router-link>

    <!-- Botão hamburguer (mobile) -->
    <button class="hamburger" @click="toggleMenu">
      <span :class="{ active: menuOpen }"></span>
      <span :class="{ active: menuOpen }"></span>
      <span :class="{ active: menuOpen }"></span>
    </button>

    <!-- Links -->
    <div class="links" :class="{ open: menuOpen }">
      <router-link to="/" @click="closeMenu">Home</router-link>
      <router-link to="/create" @click="closeMenu">Criar Post</router-link>
      <router-link to="/login" class="login-btn" @click="closeMenu">
        Login
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
    closeMenu() {
      this.menuOpen = false
    }
  }
}
</script>

<style scoped>
/* Navbar */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
  font-family: sans-serif;
  position: relative;
}

/* Logo */
.site-name {
  font-weight: 700;
  font-size: 1.2rem;
  color: #000;
  text-decoration: none;
}

/* Links desktop */
.links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

/* Login */
.login-btn {
  background-color: #000;
  color: #fff !important;
  padding: 0.45rem 0.9rem;
  border-radius: 5px;
}

/* HAMBURGUER */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
}

.hamburger span {
  width: 24px;
  height: 2px;
  background: #000;
  transition: 0.3s;
}

/* MOBILE */
@media (max-width: 700px) {
  .hamburger {
    display: flex;
  }

  .links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #f5f5f5;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    gap: 1rem;
    border-bottom: 1px solid #ddd;
    display: none;
  }

  .links.open {
    display: flex;
  }
.login-btn {
  width: calc(100% - 2rem);
  margin: 0 auto;
  text-align: center;
}
.links a {
  width: 100%;
  padding: 0.75rem 0.5rem;
  display: block;
}

.links a:hover {
  background-color: #eaeaea;
}

}
</style>

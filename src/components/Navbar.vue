<template>
  <nav class="navbar">
    <!-- Logo -->
    <router-link to="/" class="site-name">The Blog</router-link>

    <!-- Botão hamburguer (mobile) -->
    <button class="hamburger" @click="toggleMenu">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Links -->
    <div class="links" :class="{ open: menuOpen }">
      <router-link to="/" @click="closeMenu">Home</router-link>

      <router-link
        v-if="user"
        to="/create"
        @click="closeMenu"
      >
        Criar Post
      </router-link>

      <!-- NÃO LOGADO -->
      <router-link
        v-if="!user"
        to="/login"
        class="login-btn"
        @click="closeMenu"
      >
        Login
      </router-link>

      <!-- LOGADO -->
      <div v-else class="user-area">
        <router-link
          v-if="profile"
          :to="`/perfil/${profile.username}`"
          class="profile-link"
          @click="closeMenu"
        >
          {{ profile.username }}
        </router-link>

        <button class="logout-btn" @click="logout">
          Sair
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { supabase } from '../services/supabase'

export default {
  data() {
    return {
      menuOpen: false,
      user: null,
      profile: null
    }
  },

  async mounted() {
    const { data } = await supabase.auth.getUser()
    this.user = data.user

    if (this.user) {
      await this.fetchProfile()
    }

    supabase.auth.onAuthStateChange(async (_event, session) => {
      this.user = session?.user || null
      this.profile = null

      if (this.user) {
        await this.fetchProfile()
      }
    })
  },

  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },

    closeMenu() {
      this.menuOpen = false
    },

    async fetchProfile() {
      const { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', this.user.id)
        .single()

      this.profile = data
    },

    async logout() {
      await supabase.auth.signOut()
      this.user = null
      this.profile = null
      this.closeMenu()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
/* ===== BASE ===== */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background-color: #f7f7f7;
  border-bottom: 1px solid #e3e3e3;
  font-family: system-ui, sans-serif;
  position: relative;
}

/* Logo */
.site-name {
  font-weight: 700;
  font-size: 1.25rem;
  color: #111;
  text-decoration: none;
}

/* ===== LINKS DESKTOP ===== */
.links {
  display: flex;
  align-items: center;
  gap: 1.4rem;
}

.links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.2s ease;
}

.links a:hover {
  color: #000;
}

/* Login */
.login-btn {
  background: #111;
  color: #fff !important;
  padding: 0.45rem 1rem;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.login-btn:hover {
  background: #000;
}

/* ===== USUÁRIO LOGADO ===== */
.user-area {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.profile-link {
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.profile-link:hover {
  background: #eaeaea;
}

/* Botão sair */
.logout-btn {
  padding: 0.35rem 0.7rem;
  border-radius: 6px;
  border: 1px solid #ddd;
  background: #fff;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background: #ffecec;
  border-color: #ffb3b3;
  color: #b00000;
}

/* ===== HAMBURGUER ===== */
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
  background: #111;
}

/* ===== MOBILE ===== */
@media (max-width: 700px) {
  .hamburger {
    display: flex;
  }

  .links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #f7f7f7;
    flex-direction: column;
    align-items: stretch;
    padding: 1rem;
    gap: 0.6rem;
    border-bottom: 1px solid #e3e3e3;
    display: none;
  }

  .links.open {
    display: flex;
  }

  .links a,
  .login-btn,
  .profile-link,
  .logout-btn {
    width: 100%;
    text-align: center;
    padding: 0.75rem 0;
  }

  .user-area {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>

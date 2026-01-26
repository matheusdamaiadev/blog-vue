<template>
  <nav class="navbar">
    <!-- Logo -->
    <router-link to="/" class="site-name">
      The Blog
    </router-link>

    <!-- Botão hamburguer -->
    <button class="hamburger" @click="toggleMenu" aria-label="Menu">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Links -->
    <div class="links" :class="{ open: menuOpen }">
      <router-link to="/" class="nav-item" @click="closeMenu">
        Home
      </router-link>

      <router-link
        v-if="user"
        to="/create"
        class="nav-item"
        @click="closeMenu"
      >
        Criar Post
      </router-link>

      <!-- NÃO LOGADO -->
      <router-link
        v-if="!user"
        to="/login"
        class="nav-item login-btn"
        @click="closeMenu"
      >
        Login
      </router-link>

      <!-- LOGADO -->
      <div v-else class="user-area">
        <router-link
          v-if="profile"
          :to="`/perfil/${profile.username}`"
          class="nav-item"
          @click="closeMenu"
        >
          {{ profile.username }}
        </router-link>

        <button class="nav-item logout-btn" @click="logout">
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
  line-height: 1;
}

/* ===== LINKS ===== */
.links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* ===== ITEM PADRÃO (BASE DE TUDO) ===== */
.nav-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: 36px;
  padding: 0 1.1rem;
  border-radius: 999px;

  font-weight: 500;
  font-size: 0.95rem;
  text-decoration: none;
  color: #333;

  white-space: nowrap;
  line-height: 1;
  font-family: inherit;
  box-sizing: border-box;
}

.nav-item:hover {
  background: #eaeaea;
}

/* ===== LOGIN ===== */
.login-btn {
  background: #111;
  color: #fff !important;
}

.login-btn:hover {
  background: #000;
}

/* ===== USUÁRIO ===== */
.user-area {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* ===== LOGOUT (RESET TOTAL DO BUTTON) ===== */
.logout-btn {
  all: unset; /* 🔥 remove estilo nativo do button */
  box-sizing: border-box;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: 36px;
  padding: 0 1.1rem;
  border-radius: 999px;

  border: 1px solid #686868;
  background: #fff;
  color: #686868;

  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
}

.logout-btn:hover {
  background: #ffecec;
  border-color: #ffb3b3;
  color: #b00000;
}

/* ===== HAMBURGER ===== */
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
  border-radius: 2px;
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
    padding: 1rem;
    gap: 0.6rem;
    border-bottom: 1px solid #e3e3e3;
    display: none;
  }

  .links.open {
    display: flex;
  }

  .nav-item,
  .logout-btn {
    width: 100%;
    height: 42px;
    justify-content: center;
  }

  .user-area {
    width: 100%;
    flex-direction: column;
    gap: 0.6rem;
  }
}
</style>

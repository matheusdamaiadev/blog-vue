// src/services/auth.js
import { ref } from 'vue'
import { supabase } from './supabase'

export const user = ref(null)
export const loadingAuth = ref(true)

// pega sessão inicial (reload / produção)
supabase.auth.getUser().then(({ data }) => {
  user.value = data.user
  loadingAuth.value = false
})

// escuta login / logout
supabase.auth.onAuthStateChange((_event, session) => {
  user.value = session?.user || null
})

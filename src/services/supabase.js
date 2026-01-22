// src/services/supabase.js
import { createClient } from '@supabase/supabase-js'

// URL do projeto Supabase
const supabaseUrl = 'https://vdwmeizkkxvjiviprcgt.supabase.co'
// Chave pública (anon key)
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkd21laXpra3h2aml2aXByY2d0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMDE4NDgsImV4cCI6MjA4NDY3Nzg0OH0.fx3Ur3R2YpOLSNo1gvjbwlJSSnsuNMpzK0wOkMXsoOs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

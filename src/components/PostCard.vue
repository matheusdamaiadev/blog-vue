<template>
  <div class="post-card">
    <router-link :to="`/post/${post.id}`">
      <h2>{{ post.title }}</h2>
      <!-- Formata a data sem os segundos -->
      <p class="date">{{ new Date(post.created_at).toLocaleString('pt-BR', { 
        day: '2-digit', month: '2-digit', year: 'numeric', 
        hour: '2-digit', minute: '2-digit' 
      }) }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['post']
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
.post-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 5px;
  transition: 0.5s;
  background-color: #fff;
  text-decoration: none;
}

.post-card:hover {
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

/* Título truncado com reticências */
.post-card h2 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  white-space: nowrap;       /* Mantém em uma linha */
  overflow: hidden;          /* Oculta o excesso */
  text-overflow: ellipsis;   /* Adiciona "..." no fim */
}

.post-card .date {
  font-size: 0.8rem;
  color: #666;
}
</style>

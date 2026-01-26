<template>
  <div class="post-card">
    <router-link :to="`/post/${post.id}`" class="card-link">
      
      <h2 class="title">{{ post.title }}</h2>

      <div class="meta">
        <span class="author">
          @{{ post.profiles?.username || 'usuario' }}
        </span>

        <span class="dot">•</span>

        <span class="date">
          {{ formattedDate }}
        </span>
      </div>

    </router-link>
  </div>
</template>

<script>
export default {
  props: ['post'],
  computed: {
    formattedDate() {
      return new Date(this.post.created_at).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>

<style scoped>
.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.post-card {
  border: 1px solid #e2e2e2;
  padding: 1.2rem 1.3rem;
  border-radius: 12px;
  background-color: #fff;
  transition: all 0.25s ease;
}

/* hover */
.post-card:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.post-card:hover .title {
  text-decoration: underline;
}

/* título */
.title {
  margin: 0 0 0.6rem;
  font-size: 1.05rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* linha meta */
.meta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  color: #666;
}

.author {
  font-weight: 500;
  color: #444;
}

.dot {
  opacity: 0.6;
}
</style>

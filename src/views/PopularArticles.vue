<template>
  <main>
    <div class="main-image" />
    <div class="list-title">
      Лучшие статьи за все время
    </div>
    <div class="articles-list">
      <div
        v-for="item in 30"
        :key="item"
        class="article-item"
      >
        <ArticleCard :article="item" />
      </div>
    </div>

  </main>
</template>

<script setup lang="ts">
import ArticleCard from '@/components/articles/article-card.vue'
</script>

<style lang="scss" scoped>
.main-image {
  width: 100%;
  height: 600px;
  background-image: url('@/assets/img/main.webp');
  background-size: cover;
  background-position: center;
}

.list-title {
  font-size: 24px;
  text-align: center;
  padding-top: 32px;
  padding-bottom: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: #32364a;
}

.articles-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  .article-item {
    width: calc((100% / 5) - 14px);
  }
}
</style>

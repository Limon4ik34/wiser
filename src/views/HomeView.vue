<template>
  <main>
    <div class="main-image" />
    <div class="list-title">
      Лучшие статьи за все время
    </div>
    <div class="articles-list">
      <div
        v-for="item in popularArticles"
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
import { useArticleStore } from '@/stores/article.ts'
import { onMounted, ref } from 'vue'
const articlesStore = useArticleStore()
const popularArticles = ref([])
onMounted( () => {
  articlesStore.getArticlePopular().then(({ data }) => {
    popularArticles.value = data.data
  })
})
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

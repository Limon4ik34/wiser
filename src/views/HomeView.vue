<template>
  <main>
    <div class="main-image">
      <div class="main-overlay">
        <div class="main-title">Добро пожаловать!</div>
        <div class="main-subtitle">Читайте лучшие статьи нашего портала</div>
      </div>
    </div>
    <div class="list-title">
      Лучшие статьи за все время
    </div>
    <transition-group name="fade" tag="div" class="articles-list">
      <div
        v-for="item in popularArticles"
        :key="item.id"
        class="article-item"
      >
        <ArticleCard :article="item" />
      </div>
    </transition-group>
  </main>
</template>

<script setup lang="ts">
import ArticleCard from '@/components/articles/article-card.vue'
import { useArticleStore } from '@/stores/article.ts'
import { onMounted, ref } from 'vue'
const articlesStore = useArticleStore()
const popularArticles = ref([])
onMounted(() => {
  articlesStore.getArticlePopular().then(({ data }) => {
    popularArticles.value = data.data
  })
})
</script>

<style lang="scss" scoped>
.main-image {
  width: 100%;
  height: 400px;
  background-image: url('@/assets/img/main.webp');
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 32px;

  .main-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, rgba(50,54,74,0.7) 0%, rgba(0,0,0,0.3) 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    text-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }

  .main-title {
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 12px;
    letter-spacing: 2px;
  }
  .main-subtitle {
    font-size: 22px;
    opacity: 0.85;
  }
}

.list-title {
  font-size: 28px;
  text-align: center;
  padding-top: 16px;
  padding-bottom: 24px;
  font-weight: bold;
  text-transform: uppercase;
  color: #32364a;
  letter-spacing: 1.5px;
}

.articles-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 24px;
  justify-content: flex-start;

  .article-item {
    flex: 0 1 calc(25% - 18px); // 4 в ряд
    min-width: 260px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 4px 24px rgba(50,54,74,0.08), 0 1.5px 4px rgba(50,54,74,0.04);
    transition: transform 0.18s, box-shadow 0.18s;
    overflow: hidden;
    animation: fadeInUp 0.7s;

    &:hover {
      transform: translateY(-8px) scale(1.03);
      box-shadow: 0 8px 32px rgba(50,54,74,0.16), 0 2px 8px rgba(50,54,74,0.08);
    }
  }
}

/* Fade animation for transition-group */
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Адаптивность */
@media (max-width: 1200px) {
  .articles-list .article-item {
    flex: 0 1 calc(33.333% - 16px); // 3 в ряд
  }
}
@media (max-width: 900px) {
  .main-image {
    height: 260px;
    .main-title { font-size: 28px; }
    .main-subtitle { font-size: 16px; }
  }
  .articles-list .article-item {
    flex: 0 1 calc(50% - 12px); // 2 в ряд
  }
}
@media (max-width: 600px) {
  .main-image {
    height: 160px;
    .main-title { font-size: 18px; }
    .main-subtitle { font-size: 12px; }
  }
  .articles-list {
    gap: 12px;
    .article-item {
      flex: 0 1 100%; // 1 в ряд
      min-width: unset;
    }
  }
  .list-title {
    font-size: 18px;
    padding-top: 8px;
    padding-bottom: 12px;
  }
}
</style>
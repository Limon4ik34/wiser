<template>
  <main>
    <div class="main-image">
      <div class="main-image__overlay">
        <h1>Добро пожаловать!</h1>
        <p>Читайте лучшие статьи по интересующим вас темам</p>
      </div>
    </div>
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
  height: 400px;
  background-image: url('@/assets/img/main.webp');
  background-size: cover;
  background-position: center;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(50, 54, 74, 0.15);
  margin-bottom: 32px;
  position: relative;
  overflow: hidden;

  &__overlay {
    position: absolute;
    inset: 0;
    background: rgba(50, 54, 74, 0.45);
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
      font-size: 40px;
      font-weight: 800;
      margin-bottom: 12px;
      letter-spacing: 1px;
      text-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }
    p {
      font-size: 20px;
      font-weight: 400;
      text-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }
  }
}

.list-title {
  font-size: 28px;
  text-align: center;
  padding-top: 16px;
  padding-bottom: 24px;
  font-weight: 800;
  text-transform: uppercase;
  color: #32364a;
  letter-spacing: 2px;
}

.articles-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  padding-bottom: 48px;

  .article-item {
    transition: transform 0.2s, box-shadow 0.2s;
    border-radius: 4834px;
    box-shadow: 0 2px 12px rgba(50, 54, 74, 0.07);
    background: #fff;
    overflow: hidden;

    &:hover {
      transform: translateY(-8px) scale(1.03);
      box-shadow: 0 8px 32px rgba(50, 54, 74, 0.18);
      z-index: 2;
    }
  }
}

/* Адаптивность */
@media (max-width: 900px) {
  .main-image {
    height: 250px;
    border-radius: 16px;
  }
  .list-title {
    font-size: 22px;
  }
}
@media (max-width: 600px) {
  .main-image {
    height: 160px;
    border-radius: 8px;
  }
  .list-title {
    font-size: 18px;
    padding-top: 8px;
    padding-bottom: 12px;
  }
  .articles-list {
    gap: 12px;
  }
}
</style>
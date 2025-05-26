<template>
  <main>
    <div class="main-image">
      <div class="main-overlay">
        <div class="main-title">Добро пожаловать!</div>
        <div class="main-subtitle">Читайте лучшие статьи нашего портала</div>
      </div>
    </div>
    <div class="tabs" role="tablist" aria-label="Категории статей">
      <div
        v-for="theme in themesList"
        :key="theme.value"
        class="tab"
        role="tab"
        :aria-selected="currentTheme === theme.value"
        tabindex="0"
        @click="getArticle(theme.value)"
        @keydown.enter.space.prevent="getArticle(theme.value)"
        :class="{active: currentTheme === theme.value}"
      >
        <span class="tab-icon" aria-hidden="true">{{ theme.icon }}</span>
        <span class="tab-title">{{ theme.title }}</span>
      </div>
    </div>
    <transition mode="out-in" name="fade" tag="div" class="articles-list" aria-live="polite">
      <div v-if="popularArticles.length" key="articles">
        <div
          v-for="item in popularArticles"
          :key="item.id"
          class="article-item"
        >
          <ArticleCard :article="item" />
        </div>
      </div>
      <div v-else key="no-articles" class="no-articles">
        Статьи не найдены.
      </div>
    </transition>
  </main>
</template>

<script setup lang="ts">
import ArticleCard from '@/components/articles/article-card.vue'
import { useArticleStore } from '@/stores/article.ts'
import { onMounted, ref } from 'vue'

const articlesStore = useArticleStore()
const popularArticles = ref([])
const currentTheme = ref('all')
const themesList = ref([
  { title: 'Все', value: 'all', icon: '📚' },
  { title: 'Общая', value: 'common', icon: '📰' },
  { title: 'Рыбалка', value: 'fishing', icon: '🎣' },
  { title: 'Игры', value: 'gaming', icon: '🎮' },
  { title: 'Автомобили', value: 'cars', icon: '🚗' },
  { title: 'Футбол', value: 'football', icon: '⚽' },
  { title: 'Активный отдых', value: 'activity', icon: '🏕️' }
])

function getArticle(theme: string) {
  popularArticles.value = []
  currentTheme.value = theme
  articlesStore.getArticlePopular(theme).then(({ data }) => {
    popularArticles.value = data.data
  })
}

onMounted(() => {
  getArticle('all')
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

.tabs {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  justify-content: center; 

  .tab {
    flex: 0 0 auto;
    background: linear-gradient(135deg, #4a90e2, #357abd);
    color: #fff;
    border-radius: 40px;
    padding: 12px 28px;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 6px 15px rgba(53,122,189,0.4);
    user-select: none;
    transition:
      background 0.4s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
      color 0.3s ease;

    &:hover,
    &:focus-visible {
      background: linear-gradient(135deg, #2c5db0, #1f3f7a);
      box-shadow: 0 10px 25px rgba(31,63,122,0.6);
      transform: translateY(-3px) scale(1.07);
      outline: none;
      color: #e0e7ff;
    }

    &.active {
      background: linear-gradient(135deg, #1a3a75, #0f244a);
      box-shadow: 0 12px 30px rgba(15,36,74,0.8);
      transform: translateY(-4px) scale(1.1);
      color: #cbd5e1;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        width: 40%;
        height: 4px;
        border-radius: 2px;
        background: #ffd700;
        box-shadow: 0 0 8px #ffd700;
      }
    }

    &:active {
      transform: translateY(-1px) scale(1.05);
      box-shadow: 0 6px 18px rgba(31,63,122,0.5);
    }

    .tab-icon {
      font-size: 1.4rem;
      line-height: 1;
      user-select: none;
      transition: color 0.3s ease;
    }
  }
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


.no-articles {
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  padding: 40px 0;
  font-style: italic;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
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
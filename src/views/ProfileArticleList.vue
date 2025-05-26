<template>
  <div class="article-list-page">
    <router-link class="button" to="/profile/articles/new">
      <span class="icon">+</span> Создать статью
    </router-link>
    <div class="list">
      <router-link
        v-for="article in articleList"
        :key="article.id"
        class="article"
        :to="`/profile/articles/${article.id}`"
      >
        <div class="preview" :style="{backgroundImage: `url(${article.previewImage})`}"/>
        <div class="content">
          <div class="title">
            {{ article.title }}
          </div>
          <div class="description">
            {{ article.description }}
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useArticleStore } from '@/stores/article.ts'
import { ref } from 'vue'

const articleStore = useArticleStore()
const articleList = ref([])

articleStore.gerMyArticles().then(({data}) => {
  articleList.value = data.data
})
</script>

<style scoped lang="scss">
.article-list-page {
  min-height: 100vh;
  padding: 32px 0;
  width: 100%;
  background: linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;

  .list {
    width: 100%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .article {
    display: flex;
    background: white;
    border-radius: 18px;
    box-shadow: 0 4px 24px 0 rgba(60, 72, 88, 0.10);
    overflow: hidden;
    transition: transform 0.18s cubic-bezier(.4,0,.2,1), box-shadow 0.18s;
    text-decoration: none;
    min-height: 160px;
    cursor: pointer;

    &:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 8px 32px 0 rgba(60, 72, 88, 0.18);
    }

    .preview {
      min-width: 160px;
      width: 160px;
      height: 160px;
      background-size: cover;
      background-position: center;
      transition: filter 0.3s;
      filter: brightness(0.97);
      border-right: 1px solid #f0f0f0;
      flex-shrink: 0;
    }

    .content {
      padding: 20px 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;

      .title {
        color: #232946;
        margin-bottom: 10px;
        font-weight: 700;
        font-size: 22px;
        letter-spacing: 0.01em;
        transition: color 0.2s;
      }

      .description {
        font-size: 15px;
        color: #6b7280;
        line-height: 1.5;
        max-height: 4.5em;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
  }

  .button {
    width: max-content;
    display: flex;
    align-items: center;
    gap: 8px;
    text-transform: uppercase;
    border-radius: 12px;
    color: #fff;
    background: linear-gradient(90deg, #6366f1 0%, #818cf8 100%);
    font-weight: bold;
    border: none;
    cursor: pointer;
    transition: box-shadow 0.2s, background 0.2s;
    padding: 12px 28px;
    margin-bottom: 32px;
    font-size: 16px;
    box-shadow: 0 2px 12px 0 rgba(99,102,241,0.10);

    .icon {
      font-size: 20px;
      font-weight: bold;
      margin-right: 4px;
    }

    &:hover {
      background: linear-gradient(90deg, #818cf8 0%, #6366f1 100%);
      box-shadow: 0 4px 24px 0 rgba(99,102,241,0.18);
    }
  }
}
</style>
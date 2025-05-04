<template>
  <div class="article-list-page">
    <router-link class="button" to="/profile/articles/new">
      Создать статью
    </router-link>
    <div class="list">
      <router-link
        v-for="article in articleList"
        :key="article.id"
        class="article"
        :to="`/profile/articles/${article.id}`"
      >
        <div class="title">
          {{ article.title }}
        </div>
        <div
          class="preview"
          :style="{backgroundImage: `url(${article.previewImage})`}"
        />
        <div class="description">
          {{ article.description }}
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
  padding: 16px;
  width: 100%;

  .list {
    width: 100%;
    max-width: 580px;

    .article {
      margin-bottom: 16px;
      width: 100%;
      display: block;

      .title {
        color: #32364a;
        margin-bottom: 8px;
        font-weight: bold;
        font-size: 18px;
      }

      .preview {
        width: 100%;
        padding-top: 50%;
        background-size: cover;
        background-position: center;
        margin-bottom: 16px;
      }

      .description {
        font-size: 14px;
        color: #818181;
        line-clamp: 10;
        line-height: 18px;
        margin-bottom: 16px;
      }

    }
  }

  .button {
    width: max-content;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    border-radius: 8px;
    color: #373535;
    background-color: white;
    font-weight: bold;
    border: 1px solid #373535;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 8px 16px;
    margin-bottom: 16px;

    &:hover {
      background-color: #373535;
      color: white;
    }
  }
}
</style>
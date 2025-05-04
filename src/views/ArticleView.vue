<template>
  <div v-if="article" class="article-page">
    <div class="article">
      <div
        class="preview-img"
        :style="{ backgroundImage: `url(${article.previewImage})`}"
      />
      <div class="title">
        {{ article.title }}
      </div>
      <div v-html="article.text" class="text" />
      <div class="date">
        {{ dateFormat(article.dateCreate)}}
      </div>
    </div>
    <div class="author">
      <div class="avatar">
        <div class="letter">
          {{ article.author.nik[0] }}
        </div>
      </div>
      <div class="nik">
        {{ article.author.nik }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useArticleStore } from '@/stores/article.ts'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { dateFormat } from '@/shared/utils.ts'

const articleStore = useArticleStore()
const route = useRoute()
const article = ref(null)
articleStore.getArticleFullById(route.params.id.toString()).then(({data}) => {
  article.value = data.data
})
</script>
<style scoped lang="scss">
.article-page {
  width: 100%;
  background-color: #fff;
  padding: 16px;

  .article {
    max-width: 800px;
    margin: 0 auto;
    box-shadow: 0px -2px 8px 7px rgba(34, 60, 80, 0.2);
    padding: 16px;
    margin-bottom: 32px;
    border-radius: 8px;

    .preview-img {
      width: 100%;
      padding-top: 50%;
      background-size: cover;
      background-position: center;
      padding-bottom: 16px;
      border-radius: 8px;
    }

    .title {
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 32px;
    }

    .text {
      &:deep(.image) {
        width: max-content;
        margin: 0 auto;
      }
      img {
        margin: 0 auto;
      }
    }

    .date {
      color: grey;
      text-align: right;
    }
  }

  .author {
    max-width: 800px;
    margin: 0 auto;
    box-shadow: 0px -2px 8px 7px rgba(34, 60, 80, 0.2);
    padding: 16px;
    margin-bottom: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid #32364a;
      color: #32364a;
      font-size: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin-right: 8px;
    }

    .nik {
      font-size: 28px;
      color: #32364a;
    }
  }
}

</style>
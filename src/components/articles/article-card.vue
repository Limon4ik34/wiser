<template>
  <div  class="article-card">
    <div
      class="preview-image"
      :style="{backgroundImage: `url(${article.previewImage})`}"
    />
    <router-link :to="`/articles/${article.id}`" class="title">
      {{ article.title }}
    </router-link>
    <div class="text">
      {{ article.description }}
    </div>
    <router-link :to="`/author/${article.author.id}`" class="author">
      <div
        v-if="article.author.avatar"
        class="avatar"
        :style="{backgroundImage: `url(${article.author.avatar})`}"
      />
      <div
        v-else
        class="avatar"
      > {{ article.author.nik[0] }}</div>
      <div class="name">
        {{ article.author.nik }}
      </div>
    </router-link>
  </div>
</template>
<script setup lang="ts">

defineProps<{
  article: unknown
}>()

</script>

<style scoped lang="scss">

.article-card {
  width: 100%;
  background-color: white;
  display: block;

  .preview-image {
    width: 100%;
    padding-top: 50%;
    background-size: cover;
    background-position: center;
    margin-bottom: 16px;
  }

  .title {
    padding: 8px;
    font-size: 18px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    line-height: 22px;
    height: 54px;
    margin-bottom: 16px;
    color: #818181;
  }

  .text {
    padding: 8px;
    font-size: 14px;
    color: #818181;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
    line-clamp: 10;
    line-height: 18px;
    height: 190px;
    margin-bottom: 16px;
  }

  .author {
    padding: 8px;
    display: flex;
    align-items: center;

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 8px;
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      border: 1px solid #32364a;
    }

    .name {
      font-size: 16px;
      color: #373535;
      font-weight: bold;
    }
  }
}
</style>
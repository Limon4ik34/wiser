<template>
  <div class="author-page">
    <h1 class="nik">{{ author.nik }}</h1>
    <div class="avatar" :style="{backgroundImage: `url(${author.avatar})`}">
      <span v-if="!author.avatar">{{ author.nik[0] }}</span>
    </div>
    <div class="text" v-html="author.about"/>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user.ts'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const userStore = useUserStore()
const id = useRoute().params.id

const author = ref(null)

userStore.getAuthorData(id).then(({ data }) => {
  author.value = data.data
})
</script>

<style scoped lang="scss">
.author-page {
  background-color: white;

  .nik {
    text-align: center;
  }

  .avatar {
    margin: 0 auto;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 180px;
    border: 1px solid #32364a;
    margin-bottom: 50px;
  }

  .text {
    max-width: 100%;
    padding: 16px;
    &:deep(.image) {
      width: max-content;
      margin: 0 auto;
      img {
        max-width: 100%!important;
        aspect-ratio: auto!important;
      }
    }
  }
}
</style>
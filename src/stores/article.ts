import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { articleApi } from '@/api/article.ts'

export const useArticleStore = defineStore('article', () => {
  function uploadImage(image: any) {
    const formData = new FormData()
    formData.append('image', image)
    return articleApi.uploadImage(formData)
  }
  function createArticle(article: unknown) {
    return articleApi.createArticle(article)
  }
  function gerMyArticles() {
    return articleApi.gerMyArticles()
  }
  function getArticleById(id:string) {
    return articleApi.getArticleById(id)
  }
  function getArticlePopular() {
    return articleApi.getArticlePopular()
  }
  function getArticleFullById(id:string) {
    return articleApi.getArticleByIdFull(id)
  }
  function sendArticleReview(data:unknown) {
    return articleApi.sendArticleReview(data)
  }

  return {
    getArticleFullById,
    sendArticleReview,
    getArticlePopular,
    getArticleById,
    gerMyArticles,
    createArticle,
    uploadImage
  }
})

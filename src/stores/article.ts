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
  function updateArticle(article: unknown) {
    return articleApi.updateArticle(article)
  }
  function gerMyArticles() {
    return articleApi.gerMyArticles()
  }
  function getArticleById(id:string) {
    return articleApi.getArticleById(id)
  }
  function getArticlePopular(theme: unknown) {
    return articleApi.getArticlePopular(theme)
  }
  function getArticleFullById(id:string) {
    return articleApi.getArticleByIdFull(id)
  }
  function sendArticleReview(data:unknown) {
    return articleApi.sendArticleReview(data)
  }
  function getArticleByStatus(status:string) {
    return articleApi.getArticleByStatus(status)
  }
  function setArticleByStatus(id: unknown, status:string) {
    return articleApi.setArticleByStatus(id, status)
  }

  return {
    getArticleFullById,
    updateArticle,
    sendArticleReview,
    setArticleByStatus,
    getArticleByStatus,
    getArticlePopular,
    getArticleById,
    gerMyArticles,
    createArticle,
    uploadImage
  }
})

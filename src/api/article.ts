import { baseApiUrl } from '@/shared/consts.ts'
import axios from 'axios'
export const articleApi = {
  uploadImage (image: unknown) {
    const token = localStorage.token
    return axios.post(`${baseApiUrl}/upload-image`, image, {
      headers: {
        authorization: token
      }
    })
  },
  createArticle (article: unknown) {
    const token = localStorage.token
    return axios.post(`${baseApiUrl}/article`, article, {
      headers: {
        authorization: token
      }
    })
  },
  sendArticleReview (review: unknown) {
    const token = localStorage.token
    return axios.post(`${baseApiUrl}/article/review`, review, {
      headers: {
        authorization: token
      }
    })
  },
  gerMyArticles() {
    const token = localStorage.token
    return axios.get(`${baseApiUrl}/my-articles`, {
      headers: {
        authorization: token
      }
    })
  },
  getArticleById (id: string) {
    return axios.get(`${baseApiUrl}/article/${id}`)
  },
  getArticlePopular () {
    return axios.get(`${baseApiUrl}/articles/popular`)
  },
  getArticleByIdFull (id: string) {
    return axios.get(`${baseApiUrl}/article-full/${id}`)
  }
}
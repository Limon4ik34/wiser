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
  updateArticle (article: unknown) {
    const token = localStorage.token
    return axios.patch(`${baseApiUrl}/article`, article, {
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
  getArticlePopular (theme: unknown) {
    const token = localStorage.token
    return axios.get(`${baseApiUrl}/articles/popular`, {
      params: {
        theme
      },
      headers: {
        authorization: token
      }
    })
  },
  getArticleByIdFull (id: string) {
    const token = localStorage.token
    return axios.get(`${baseApiUrl}/article-full/${id}`, {
      headers: {
        authorization: token
      }
    })
  },
  getArticleByStatus (status: string) {
    const token = localStorage.token
    return axios.post(`${baseApiUrl}/article-list`, {
      status
    },{
      headers: {
        authorization: token
      }
    })
  },
  setArticleByStatus (id: unknown, status: string) {
    const token = localStorage.token
    return axios.post(`${baseApiUrl}/article-set-status`, {
      id,
      status
    },{
      headers: {
        authorization: token
      }
    })
  },
}
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      children: [
        {
          path: 'about',
          name: 'profile-about',
          component: () => import('../views/ProfileAbout.vue'),
        },
        {
          path: 'articles',
          name: 'articles-list',
          component: () => import('../views/ProfileArticleList.vue'),
        },
        {
          path: 'articles/:id',
          name: 'article-edit',
          component: () => import('../views/ProfileArticleEdit.vue'),
        },
      ]
    },
    {
      path: '/articles/:id',
      name: 'article-read',
      component: () => import('../views/ArticleView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue'),
    },
  ],
})

export default router

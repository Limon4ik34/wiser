<template>
  <div v-if="article" class="article-page">
    <!-- Статья -->
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

    <!-- Автор статьи -->
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

    <!-- Отзывы -->
    <div class="reviews-section">
      <h2>Отзывы</h2>
      <div v-if="article.reviews.length === 0" class="no-reviews">
        Пока нет отзывов. Будьте первым!
      </div>
      <div v-for="review in article.reviews" :key="review.id" class="review-item">
        <div class="review-header">
          <div class="avatar">
            <img v-if="review.userAvatar" :src="review.userAvatar" alt="avatar" />
            <div v-else class="letter">
              {{ review.userNik ? review.userNik[0] : 'А' }}
            </div>
          </div>
          <div class="user-info">
            <div class="user-nik">
              {{ review.isAnonymous ? 'Аноним' : review.userNik || 'Пользователь' }}
            </div>
            <div class="review-date">
              {{ dateFormat(review.dateCreate) }}
            </div>
          </div>
          <div class="stars">
            <div v-for="i in 5" :key="i" class="star">
              <img :src="review.rating >= i ? starActive : star" />
            </div>
          </div>
        </div>
        <div class="review-comment" v-if="review.comment && review.comment.trim() !== ''">
          {{ review.comment }}
        </div>
      </div>
    </div>

    <!-- Форма оценки и комментария -->
    <div class="rating-form">
      <h2>Оцените статью и оставьте комментарий</h2>
      <div class="stars">
        <div
          v-for="i in 5"
          :key="i"
          class="star"
          :class="{ active: ratingFormData.rating >= i }"
          @click="ratingFormData.rating = i"
        >
          <img :src="ratingFormData.rating >= i ? starActive : star" />
        </div>
      </div>
      <div class="textarea">
        <textarea v-model="ratingFormData.comment" placeholder="Ваш комментарий (необязательно)" />
      </div>
      <div class="checkbox-anon">
        <input type="checkbox" id="anon" v-model="ratingFormData.isAnonymous" />
        <label for="anon">Оставить анонимно</label>
      </div>
      <div class="button" @click="sendReview" :disabled="sending">
        {{ sending ? 'Отправка...' : 'Отправить' }}
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useArticleStore } from '@/stores/article.ts'
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { dateFormat } from '@/shared/utils.ts'

import starActive from '@/assets/img/star-active.svg'
import star from '@/assets/img/star.svg'

interface Review {
  id: number
  userId: number | null
  userNik: string
  userAvatar?: string
  rating: number
  comment: string
  dateCreate: string
  isAnonymous: boolean
}

interface Article {
  previewImage: string
  title: string
  text: string
  dateCreate: string
  author: {
    nik: string
  }
  reviews: Review[]
}

const articleStore = useArticleStore()
const route = useRoute()
const article = ref<Article | null>(null)
const sending = ref(false)
const errorMessage = ref('')

const ratingFormData = ref<{
  articleId: number
  comment: string
  rating: number
  isAnonymous: boolean
}>({
  articleId: +route.params.id,
  comment: '',
  rating: 1,
  isAnonymous: false,
})

// Загрузка статьи с отзывами
async function loadArticle() {
  const { data } = await articleStore.getArticleFullById(route.params.id.toString())
  article.value = data.data
}
loadArticle()

// Получаем userId из стора (замените на реальный источник авторизации)
const userId = articleStore.userId || null

const hasUserReviewed = computed<boolean>(() => {
  if (!article.value || !userId) return false
  return article.value.reviews.some((r: Review) => r.userId === userId)
})

async function sendReview() {
  errorMessage.value = ''
  if (hasUserReviewed.value) {
    errorMessage.value = 'Вы уже оставили отзыв на эту статью.'
    return
  }
  if (ratingFormData.value.rating < 1 || ratingFormData.value.rating > 5) {
    errorMessage.value = 'Пожалуйста, выберите оценку от 1 до 5 звезд.'
    return
  }
  sending.value = true
  try {
    const payload = {
      ...ratingFormData.value,
      userId: ratingFormData.value.isAnonymous ? null : userId,
    }
    await articleStore.sendArticleReview(payload)
    await loadArticle()
    ratingFormData.value = {
      articleId: +route.params.id,
      comment: '',
      rating: 1,
      isAnonymous: false,
    }
  } catch (e) {
    errorMessage.value = 'Ошибка при отправке отзыва. Попробуйте позже.'
  } finally {
    sending.value = false
  }
}
</script>

<style scoped lang="scss">
.article-page {
  width: 100%;
  background: linear-gradient(120deg, #f8fafc 0%, #e0e7ef 100%);
  min-height: 100vh;
  padding: 40px 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2d3a4a;

  /* Плавное появление всей страницы */
  animation: fadeIn 0.8s ease forwards;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .article {
    max-width: 900px;
    margin: 0 auto 48px auto;
    background: #ffffffdd;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(31, 38, 135, 0.12);
    overflow: hidden;
    padding-bottom: 32px;
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 12px 36px rgba(31, 38, 135, 0.18);
    }

    .preview-img {
      width: 100%;
      height: 320px;
      background-position: center;
      background-size: cover;
      border-bottom: 3px solid #4f5d75;
      border-radius: 16px 16px 0 0;
      filter: drop-shadow(0 4px 6px rgba(31, 38, 135, 0.1));
      transition: transform 0.4s ease;

      &:hover {
        transform: scale(1.03);
      }
    }

    .title {
      font-size: 2.4rem;
      font-weight: 800;
      margin: 24px 32px 16px 32px;
      letter-spacing: 1.2px;
      color: #2d3a4a;
      text-shadow: 0 1px 3px rgba(31, 38, 135, 0.15);
    }

    .text {
      font-size: 1.15rem;
      line-height: 1.7;
      margin: 0 32px 24px 32px;
      color: #3a3a3a;
      white-space: pre-line;
      user-select: text;
    }

    .date {
      font-size: 0.9rem;
      color: #8a99b3;
      margin: 0 32px 16px 32px;
      font-style: italic;
      text-align: right;
    }
  }

  .author {
    max-width: 900px;
    margin: 0 auto 48px auto;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 0 32px;

    .avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: linear-gradient(135deg, #4f5d75 0%, #6c7a89 100%);
      color: #f0f4f8;
      font-size: 2.4rem;
      font-weight: 900;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(31, 38, 135, 0.25);
      user-select: none;
      transition: background 0.3s ease;

      &:hover {
        background: linear-gradient(135deg, #6c7a89 0%, #4f5d75 100%);
        cursor: default;
      }
    }

    .nik {
      font-size: 1.5rem;
      font-weight: 700;
      color: #2d3a4a;
      user-select: text;
    }
  }

  .reviews-section {
    max-width: 900px;
    margin: 0 auto 48px auto;
    background: #fff;
    box-shadow: 0 6px 20px rgba(31, 38, 135, 0.12);
    padding: 32px 40px 28px 40px;
    border-radius: 18px;
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 10px 28px rgba(31, 38, 135, 0.18);
    }

    h2 {
      font-size: 1.8rem;
      font-weight: 800;
      color: #2d3a4a;
      margin-bottom: 24px;
      letter-spacing: 0.6px;
      text-align: center;
      text-transform: uppercase;
      text-shadow: 0 1px 2px rgba(31, 38, 135, 0.1);
    }

    .no-reviews {
      text-align: center;
      color: #8a99b3;
      font-style: italic;
      padding: 28px 0;
      font-size: 1.1rem;
      user-select: none;
    }

    .review-item {
      border-bottom: 1px solid #e0e7ef;
      padding: 20px 0;
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
      border-radius: 12px;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background-color: #f0f4f8;
        box-shadow: 0 4px 12px rgba(31, 38, 135, 0.08);
      }

      .review-header {
        display: flex;
        align-items: center;
        gap: 16px;

        .avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c9d6ff 0%, #e0e7ef 100%);
          border: 2.5px solid #4f5d75;
          color: #4f5d75;
          font-size: 1.8rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(31, 38, 135, 0.12);
          user-select: none;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
            transition: transform 0.3s ease;
          }

          &:hover img {
            transform: scale(1.1);
          }
        }

        .user-info {
          flex-grow: 1;

          .user-nik {
            font-weight: 700;
            font-size: 1.15rem;
            color: #2d3a4a;
            user-select: text;
          }

          .review-date {
            font-size: 0.9rem;
            color: #8a99b3;
            font-style: italic;
          }
        }

        .stars {
          display: flex;
          gap: 6px;

          .star {
            width: 22px;
            cursor: default;

            img {
              width: 100%;
              filter: drop-shadow(0 1px 2px rgba(31, 38, 135, 0.15));
              transition: filter 0.3s ease;
            }
          }
        }
      }

      .review-comment {
        margin-top: 12px;
        font-size: 1.05rem;
        color: #3a3a3a;
        line-height: 1.5;
        white-space: pre-wrap;
        user-select: text;
      }
    }
  }

  .rating-form {
    max-width: 900px;
    margin: 0 auto 48px auto;
    background: #fff;
    box-shadow: 0 6px 20px rgba(31, 38, 135, 0.12);
    padding: 32px 40px 28px 40px;
    border-radius: 18px;
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 10px 28px rgba(31, 38, 135, 0.18);
    }

    h2 {
      font-size: 1.6rem;
      font-weight: 800;
      color: #2d3a4a;
      margin-bottom: 24px;
      letter-spacing: 0.6px;
      text-align: center;
      text-transform: uppercase;
      text-shadow: 0 1px 2px rgba(31, 38, 135, 0.1);
    }

    .stars {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 16px;

      .star {
        width: 32px;
        cursor: pointer;
        transition: transform 0.2s ease, filter 0.3s ease;

        &.active img {
          filter: drop-shadow(0 3px 6px rgba(31, 38, 135, 0.4));
        }

        img {
          width: 100%;
          filter: drop-shadow(0 2px 4px rgba(31, 38, 135, 0.15));
          transition: filter 0.3s ease;
        }

        &:hover {
          transform: scale(1.25) rotate(-10deg);
          filter: drop-shadow(0 4px 8px rgba(31, 38, 135, 0.5));
        }
      }
    }

    .textarea {
      margin-bottom: 20px;
      width: 100%;

      textarea {
        width: 100%;
        min-height: 140px;
        padding: 16px;
        border: 2px solid #bfc9d9;
        border-radius: 14px;
        outline: none;
        font-size: 1.1rem;
        background: #f9fbfd;
        color: #2d3a4a;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
        resize: vertical;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

        &::placeholder {
          color: #8a99b3;
          font-style: italic;
        }

        &:focus {
          border-color: #4f5d75;
          box-shadow: 0 4px 12px rgba(31, 38, 135, 0.15);
        }
      }
    }

    .checkbox-anon {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 24px;
      font-size: 1.1rem;
      color: #2d3a4a;
      user-select: none;

      input[type='checkbox'] {
        width: 20px;
        height: 20px;
        cursor: pointer;
        border-radius: 4px;
        border: 1.5px solid #bfc9d9;
        transition: border-color 0.3s ease;

        &:checked {
          border-color: #4f5d75;
          background: #4f5d75;
        }
      }

      label {
        cursor: pointer;
        user-select: none;
        font-weight: 600;
      }
    }

    .button {
      width: 100%;
      height: 52px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
      border-radius: 14px;
      color: #fff;
      background: linear-gradient(90deg, #4f5d75 0%, #6c7a89 100%);
      font-weight: 900;
      font-size: 1.2rem;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(31, 38, 135, 0.15);
      transition: background 0.4s ease, color 0.4s ease, box-shadow 0.3s ease;
      margin-top: 16px;
      letter-spacing: 1.5px;
      user-select: none;

      &:hover:not(:disabled) {
        background: linear-gradient(90deg, #6c7a89 0%, #4f5d75 100%);
        box-shadow: 0 6px 20px rgba(31, 38, 135, 0.25);
      }

      &:disabled {
        background: #bfc9d9;
        cursor: not-allowed;
        box-shadow: none;
      }
    }

    .error-message {
      margin-top: 16px;
      color: #d9534f;
      font-weight: 700;
      text-align: center;
      font-size: 1.1rem;
      opacity: 0;
      animation: fadeInError 0.5s forwards;

      @keyframes fadeInError {
        to {
          opacity: 1;
        }
      }
    }
  }
}
</style>
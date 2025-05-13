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
    <div class="rating-form">
      <h2>Оценки</h2>
      <div v-for="review in article.reviews" class="rating-list">
        <div class="stars">
          <div
            v-for="i in 5"
            :key="i"
            class="star"
          >
            <img v-if="review.rating >= i" src="@/assets/img/star-active.svg">
            <img v-else src="@/assets/img/star.svg">
          </div>

        </div>
        <div class="text">
          {{ review.comment }}
        </div>
      </div>
    </div>
    <div class="rating-form">
      <h2>
        Оцените статью и оставьте комментарий
      </h2>
      <div class="stars">
        <div
          v-for="i in 5"
          :key="i"
          class="star"
          @click="ratingFormData.rating = i"
        >
          <img v-if="ratingFormData.rating >= i" src="@/assets/img/star-active.svg">
          <img v-else src="@/assets/img/star.svg">
        </div>

      </div>
      <div class="textarea">
        <textarea v-model="ratingFormData.comment" />
      </div>
      <div class="button" @click="sendReview">
        Отправить
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
const ratingFormData = ref({
  articleId: +route.params.id,
  comment: '',
  rating: 1,
})
articleStore.getArticleFullById(route.params.id.toString()).then(({data}) => {
  article.value = data.data
})

function sendReview() {
  articleStore.sendArticleReview(ratingFormData.value).then(() => {
    articleStore.getArticleFullById(route.params.id.toString()).then(({data}) => {
      article.value = data.data
      ratingFormData.value = {
        articleId: +route.params.id,
        comment: '',
        rating: 1,
      }
    })
  })
}
</script>
<style scoped lang="scss">
.article-page {
  width: 100%;
  background-color: #fff;
  padding: 16px;

  .textarea {
    margin-bottom: 16px;
    width: 100%;

    textarea {
      width: 100%;
      min-height: 150px;
      padding: 8px;
      border: 1px solid gray;
      border-radius: 8px;
      outline: none;
      font-size: 16px;
    }
  }

  .button {
    width: 100%;
    height: 50px;
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
    margin-top: 16px;

    &:hover {
      background-color: #373535;
      color: white;
    }
  }

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

  .rating-form {
    max-width: 800px;
    margin: 0 auto;
    box-shadow: 0px -2px 8px 7px rgba(34, 60, 80, 0.2);
    padding: 16px;
    margin-bottom: 32px;
    border-radius: 8px;

    .rating-list {
      margin-bottom: 16px;
    }

    .stars {
      display: flex;
      gap: 8px;

      .star {
        width: 24px;
        cursor: pointer;

        img {
          width: 100%;
        }
      }
    }
  }
}

</style>
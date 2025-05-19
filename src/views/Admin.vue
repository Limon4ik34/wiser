<template>
  <div class="page">
    <div class="tabs">
      <div
        class="tab"
        @click="getArticles('all')"
      >
        Все
      </div>
      <div
        class="tab"
        @click="getArticles('new')"
      >
        Новые
      </div>
      <div
        class="tab"
        @click="getArticles('accept')"
      >
        Опубликованные
      </div>
      <div
        @click="getArticles('abort')"
        class="tab"
      >
        Отклоненые
      </div>
    </div>
    <table>
      <thead>
      <tr>
        <td>
          id
        </td>
        <td>
          Название
        </td>
        <td>
          Описание
        </td>
        <td>
          Статус
        </td>
        <td>
          Действия
        </td>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="item in articles"
        :key="item.id"
      >
        <td>{{item.id}}</td>
        <td>{{item.title}}</td>
        <td>{{item.description}}</td>
        <td>{{item.status}}</td>
        <td>
          <router-link :to="`/articles/${item.id}`" class="action">
            Читать
          </router-link>
          <div
            class="action"
            @click="setStatus(item.id,'accept')"
          >
            Опубликовать
          </div>
          <div
            class="action"
            @click="setStatus(item.id,'abort')"
          >
            Отклонить
          </div>
        </td>

      </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { useArticleStore } from '@/stores/article.ts'
import { ref } from 'vue'

const articleStore = useArticleStore()
const articles = ref([])
function getArticles(status: string) {
  articleStore.getArticleByStatus(status).then((res) => {
    articles.value = res.data.data
  })
}
function setStatus(id: unknown, status: string) {
  articleStore.setArticleByStatus(id, status).then((res) => {
    // articles.value = res.data.data
  })
}
</script>
<style scoped lang="scss">
.tabs {
  display: flex;
  .tab {
    padding: 8px 16px;
    cursor: pointer;
  }
}

table, th, td {
  border: 1px solid black;
}

table {
  margin: 0 auto;
  background-color: #fff;
  tr {
    td {
      padding: 8px;

      .action {
        padding: 8px 16px;
        cursor: pointer;
        text-align: center;
        border: 1px solid #32364a;
        border-radius: 4px;
        display: block;
      }
    }
  }
}


</style>
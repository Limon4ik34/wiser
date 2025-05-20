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
    <table v-if="articles.length">
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
    <div v-else class="empty">
      Статьи отсутсвуют
    </div>
  </div>
</template>
<script setup lang="ts">
import { useArticleStore } from '@/stores/article.ts'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user.ts'
import { useRouter } from 'vue-router'

const articleStore = useArticleStore()
const articles = ref([])
const currentStatus = ref('')
onMounted(() => {
  if (useUserStore().user.role !== 'admin') {
    useRouter().replace('/')
  } else {
    getArticles('all')
  }
})
function getArticles(status: string) {
  currentStatus.value = status
  articleStore.getArticleByStatus(status).then((res) => {
    articles.value = res.data.data
  }).catch(() => {
    articles.value = []
  })
}
function setStatus(id: unknown, status: string) {
  articleStore.setArticleByStatus(id, status).then((res) => {
    getArticles(currentStatus.value)
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

.empty {
  font-size: 24px;
  text-align: center;
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
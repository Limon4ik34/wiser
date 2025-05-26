<template>
  <div class="page">
    <div class="tabs">
      <div
        class="tab"
        :class="{active: currentStatus === 'all'}"
        @click="getArticles('all')"
      >
        Все
      </div>
      <div
        class="tab"
        :class="{active: currentStatus === 'new'}"
        @click="getArticles('new')"
      >
        Новые
      </div>
      <div
        class="tab"
        :class="{active: currentStatus === 'accept'}"
        @click="getArticles('accept')"
      >
        Опубликованные
      </div>
      <div
        class="tab"
        :class="{active: currentStatus === 'abort'}"
        @click="getArticles('abort')"
      >
        Отклонённые
      </div>
    </div>
    <table v-if="articles.length" class="articles-table">
      <thead>
      <tr>
        <th>id</th>
        <th>Название</th>
        <th>Описание</th>
        <th>Статус</th>
        <th>Действия</th>
      </tr>
      </thead>
      <tbody>
  <tr v-for="item in articles" :key="item.id">
    <td>{{item.id}}</td>
    <td>{{item.title}}</td>
    <td>{{item.description}}</td>
    <td>
      <span :class="['status', item.status]">
        {{item.status === 'accept' ? 'Опубликовано' : item.status === 'abort' ? 'Отклонено' : 'Новое'}}
      </span>
    </td>
    <td>
      <router-link :to="`/articles/${item.id}`" class="action read">
        <span class="icon">📖</span> Читать
      </router-link>

      <div
        v-if="!(currentStatus === 'accept' || item.status === 'accept')"
        class="action publish"
        @click="setStatus(item.id,'accept')"
      >
        <span class="icon">✅</span> Опубликовать
      </div>

      <div
        v-if="!(currentStatus === 'abort' || item.status === 'abort')"
        class="action reject"
        @click="setStatus(item.id,'abort')"
      >
        <span class="icon">❌</span> Отклонить
      </div>
    </td>
  </tr>
</tbody>
    </table>
    <div v-else class="empty">
      Статьи отсутствуют
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
const currentStatus = ref('all')
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
  })
}
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background: linear-gradient(120deg, #f8fafc 0%, #e0e7ef 100%);
  padding: 40px 0;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
  .tab {
    padding: 12px 32px;
    margin: 0 8px;
    font-size: 18px;
    background: #fff;
    border-radius: 24px 24px 0 0;
    box-shadow: 0 2px 8px rgba(50,54,74,0.06);
    cursor: pointer;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
    color: #32364a;
    border-bottom: 2px solid transparent;
    &:hover {
      background: #e0e7ef;
      color: #1a1a2e;
    }
    &.active {
      background: #32364a;
      color: #fff;
      border-bottom: 2px solid #32364a;
      box-shadow: 0 4px 16px rgba(50,54,74,0.12);
    }
  }
}

.articles-table {
  width: 90%;
  margin: 0 auto 32px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(50,54,74,0.10);
  border-collapse: separate;
  border-spacing: 0;
  overflow: hidden;
  th, td {
    padding: 14px 16px;
    text-align: left;
  }
  th {
    background: #f0f4fa;
    font-weight: 600;
    color: #32364a;
    border-bottom: 2px solid #e0e7ef;
  }
  tr {
    transition: background 0.2s;
    &:hover {
      background: #f5f7fa;
    }
  }
  td {
    vertical-align: middle;
    .action {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      margin: 2px 4px 2px 0;
      font-size: 15px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      transition: background 0.2s, color 0.2s, box-shadow 0.2s;
      background: #f0f4fa;
      color: #32364a;
      box-shadow: 0 1px 4px rgba(50,54,74,0.04);
      text-decoration: none;
      width: 150px; 
      justify-content: center; 
      white-space: nowrap;
      &:hover {
        background: #e0e7ef;
        color: #1a1a2e;
      }
      &.read {
        background: #e0e7ef;
        color: #32364a;
        &:hover {
          background: #d1d8e6;
        }
      }
      &.publish {
        background: #e6fbe7;
        color: #1e7e34;
        &:hover {
          background: #c7f5cb;
        }
      }
      &.reject {
        background: #fdeaea;
        color: #c82333;
        &:hover {
          background: #f8c7c7;
        }
      }
      .icon {
        font-size: 18px;
      }
    }
  }
}

.status {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  &.accept {
    background: #e6fbe7;
    color: #1e7e34;
  }
  &.abort {
    background: #fdeaea;
    color: #c82333;
  }
  &.new {
    background: #e0e7ef;
    color: #32364a;
  }
}

.empty {
  font-size: 24px;
  text-align: center;
  color: #b0b4c1;
  margin-top: 60px;
  letter-spacing: 1px;
}
</style>
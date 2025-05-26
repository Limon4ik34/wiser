<template>
  <div class="author-page">
    <div class="author-card">
      <div class="avatar" :style="{backgroundImage: author?.avatar ? `url(${author.avatar})` : ''}">
        <span v-if="!author?.avatar">{{ author?.nik?.[0] }}</span>
      </div>
      <h1 class="nik">{{ author?.nik }}</h1>
      <div class="subtitle">Автор</div>
      <div class="text" v-html="author?.about"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user.ts'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const userStore = useUserStore()
const id = useRoute().params.id

const author = ref(null)

userStore.getAuthorData(id).then(({ data }) => {
  author.value = data.data
})
</script>

<style scoped lang="scss">
.author-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
}

.author-card {
  background: #fff;
  border-radius: 32px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  padding: 40px 32px 32px 32px;
  max-width: 420px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.8s cubic-bezier(.4,0,.2,1);

  @media (max-width: 600px) {
    padding: 24px 8px;
    border-radius: 16px;
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(40px);}
  to { opacity: 1; transform: none;}
}

.nik {
  margin: 0;
  margin-top: 16px;
  font-size: 2.2rem;
  font-weight: 700;
  color: #32364a;
  letter-spacing: 1px;
  text-align: center;
}

.subtitle {
  color: #6366f1;
  font-size: 1.1rem;
  margin-bottom: 18px;
  margin-top: 2px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: #e0e7ff;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  color: #6366f1;
  border: 4px solid #fff;
  box-shadow: 0 4px 24px 0 rgba(99,102,241,0.12);
  margin-bottom: 8px;
  transition: box-shadow 0.3s;
  overflow: hidden;
  animation: avatarPop 0.7s cubic-bezier(.4,0,.2,1);

  span {
    font-weight: 700;
    font-size: 64px;
    color: #6366f1;
  }
}

@keyframes avatarPop {
  from { transform: scale(0.7); opacity: 0;}
  to { transform: scale(1); opacity: 1;}
}

.text {
  width: 100%;
  max-width: 100%;
  padding: 0 8px;
  color: #444;
  font-size: 1.08rem;
  line-height: 1.7;
  margin-top: 12px;
  word-break: break-word;
  &:deep(.image) {
    width: max-content;
    margin: 0 auto;
    img {
      max-width: 100% !important;  
      max-height: 500px !important; 
      width: auto !important;      
      height: auto !important;      
      border-radius: 12px;
      box-shadow: 0 2px 12px 0 rgba(99,102,241,0.08);
      object-fit: contain;        
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
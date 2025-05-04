<template>
  <div class="app">
    <AppHeader />
    <RouterView />
    <ModalLayout />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppHeader from '@/components/app/header/header.vue'
import ModalLayout from '@/components/modal-layout.vue'
import { useUserStore } from '@/stores/user.ts'
import { onBeforeMount } from 'vue'
const userStore = useUserStore()
onBeforeMount(() => {
  if (localStorage.token) {
    userStore.getUserData()
  }
})
</script>

<style scoped lang="scss">

.app {
  max-width: 1440px;
  margin: 0 auto;
}
</style>

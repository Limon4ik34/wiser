<template>
  <div class="app">
    <AppHeader />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppHeader from '@/components/app/header/header.vue'
</script>

<style scoped lang="scss">

.app {
  max-width: 1440px;
  margin: 0 auto;
}
</style>

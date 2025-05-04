<template>
  <header>
    <router-link to="/" class="logo">
      <img src="@/assets/img/logo.webp">
    </router-link>
    <div class="links">
      <router-link to="/" class="link">
        Популярное
      </router-link>
      <router-link to="/" class="link">
        Свежее
      </router-link>
      <div
        v-if="!user"
        class="link"
        @click="openRegModal"
      >
        Стать автором
      </div>
      <div
        v-if="!user"
        class="link"
        @click="openAuthModal"
      >
        Войти
      </div>
      <router-link
        v-if="user"
        to="/profile/articles"
        class="user"
      >
        {{ user.nik }}
        <div class="avatar">
          <div v-if="!user.avatar" class="letter">
            {{user.nik[0]}}
          </div>
        </div>
      </router-link>
    </div>
  </header>
</template>
<script setup lang="ts">
import { useModalStore } from '@/stores/modals.ts'
import { useUserStore } from '@/stores/user.ts'
import { computed } from 'vue'

const modalStore = useModalStore()
const userStore = useUserStore()
const user = computed(() => userStore.user)
function openRegModal() {
  modalStore.openModal('registration')
}
function openAuthModal() {
  modalStore.openModal('auth')
}
</script>

<style src="./header.scss" scoped lang="scss" />

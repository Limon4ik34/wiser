<template>
  <transition name="fade">
    <div
      v-if="show"
      class="modal-layout-component"
    >
      <div
        class="overlay"
        @click="close"
      />
      <div class="modals">
        <RegistrationComponent v-if="modalName === 'registration'" />
        <AuthComponent v-if="modalName === 'auth'" />
        <HelperComponent v-if="modalName === 'helper'" />
      </div>
    </div>
  </transition>

</template>
<script setup lang="ts">

import { useModalStore } from '@/stores/modals.ts'
import { computed } from 'vue'
import RegistrationComponent from '@/components/modals/registration.vue'
import AuthComponent from '@/components/modals/auth.vue'
import HelperComponent from '@/components/modals/helper.vue'


const modalStore = useModalStore()

const show = computed(() => {
  return modalStore.show
})

const modalName = computed(() => {
  return modalStore.modalName
})

function close () {
  modalStore.closeModal()
}
</script>

<style scoped lang="scss">
.modal-layout-component {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 150;

  .overlay {
    background-color: black;
    opacity: 0.5;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
  }

  .modals {
    position: relative;
    z-index: 60;
    margin: 0 auto;
    width: max-content;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modals', () => {
  const show = ref(false)
  const modalName = ref('')

  function openModal (name: string) {
    modalName.value = name
    show.value = true
  }

  function closeModal () {
    modalName.value = ''
    show.value = false
  }

  return {
    show,
    modalName,
    openModal,
    closeModal
  }
})

<template>
  <div class="auth-modal-component">
    <div class="form">
      <div class="title">
        Аи помощь авторам
      </div>
      <div class="chat">
        <div
          class="message"
          v-for="(mes, i) in dialog"
          :key="i"

        >
          <div
            class="text"
            :class="{'is-my': mes.isMy}"
            v-html="mes.text"
          />
        </div>
      </div>
      <div class="textarea">
        <textarea v-model="message" />
      </div>
      <div
        class="button"
        @click="send"
      >
        Отправить
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useModalStore } from '@/stores/modals.ts'
import { aiApi } from '@/api/ai.ts'

const modalStore = useModalStore()
const message = ref('')
const dialog = ref([])
const loading = ref(false)

function send() {
  if (message.value) {
    loading.value = true
    dialog.value.push({
      text: message.value,
      isMy: true,
    })
    aiApi.sendMessage(message.value).then((answer) => {
      dialog.value.push({
        text: answer.data.response,
        isMy: false,
      })
      message.value = ''
      loading.value = false
    })
  }
}

</script>

<style scoped lang="scss">
.auth-modal-component {
  margin-top: 150px;
  width: 550px;
  background-color: white;
  border-radius: 8px;
  padding: 16px;

  .title {
    text-transform: uppercase;
    font-size: 18px;
    margin-bottom: 16px;
    font-weight: bold;
  }

  .chat {
    .message {
      width: 100%;
      margin-bottom: 16px;
      .text {
        width: 100%;

        &.is-my {
          text-align: right;
        }
      }
    }
  }

  .input {
    width: 100%;
    border: 1px solid gray;
    border-radius: 8px;
    padding: 8px;
    font-size: 16px;
    outline: none;
    margin-bottom: 8px;

    &.error {
      border: 1px solid red;
    }
  }

  .error-message {
    font-size: 12px;
    margin-bottom: 8px;
    color: red;
  }

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

    &:hover {
      background-color: #373535;
      color: white;
    }
  }
}
</style>
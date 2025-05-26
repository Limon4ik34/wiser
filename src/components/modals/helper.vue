<template>
  <div class="auth-modal-component">
    <div class="form">
      <div class="title">
        <span>🤖 Аи помощь авторам</span>
      </div>
      <div class="chat" ref="chatRef">
        <transition-group name="fade" tag="div">
          <div
            class="message"
            v-for="(mes, i) in dialog"
            :key="i"
            :class="{ 'is-my': mes.isMy }"
          >
            <div class="avatar">
              <span v-if="mes.isMy">🧑</span>
              <span v-else>🤖</span>
            </div>
            <div
              class="text"
              v-html="mes.text"
            />
          </div>
        </transition-group>
        <div v-if="loading" class="loading">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
      <div class="textarea">
        <textarea
          v-model="message"
          :placeholder="loading ? 'Ждите ответа...' : 'Введите ваш вопрос...'"
          :disabled="loading"
          @keydown.enter.exact.prevent="send"
        />
      </div>
      <button
        class="button"
        :disabled="!message || loading"
        @click="send"
      >
        {{ loading ? 'Отправка...' : 'Отправить' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useModalStore } from '@/stores/modals.ts'
import { aiApi } from '@/api/ai.ts'

const modalStore = useModalStore()
const message = ref('')
const dialog = ref([])
const loading = ref(false)
const chatRef = ref<HTMLElement | null>(null)

function scrollToBottom() {
  nextTick(() => {
    if (chatRef.value) {
      chatRef.value.scrollTop = chatRef.value.scrollHeight
    }
  })
}

function send() {
  if (message.value && !loading.value) {
    loading.value = true
    dialog.value.push({
      text: message.value,
      isMy: true,
    })
    scrollToBottom()
    aiApi.sendMessage(message.value).then((answer) => {
      dialog.value.push({
        text: answer.data.response,
        isMy: false,
      })
      message.value = ''
      loading.value = false
      scrollToBottom()
    })
  }
}
</script>

<style scoped lang="scss">
.auth-modal-component {
  margin: 60px auto 0;
  width: 100%;
  max-width: 480px;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%);
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  padding: 32px 24px 24px 24px;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  .form {
    width: 100%;
  }

  .title {
    text-transform: uppercase;
    font-size: 22px;
    margin-bottom: 20px;
    font-weight: bold;
    letter-spacing: 1px;
    text-align: center;
    color: #2d3748;
    span {
      background: linear-gradient(90deg, #6366f1 0%, #06b6d4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .chat {
    background: #fff;
    border-radius: 12px;
    min-height: 220px;
    max-height: 320px;
    overflow-y: auto;
    padding: 18px 12px 12px 12px;
    margin-bottom: 18px;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);

    .message {
      display: flex;
      align-items: flex-end;
      margin-bottom: 14px;
      gap: 10px;
      opacity: 1;
      transition: opacity 0.3s;

      &.is-my {
        flex-direction: row-reverse;
        .text {
          background: linear-gradient(90deg, #6366f1 0%, #06b6d4 100%);
          color: #fff;
          text-align: right;
        }
        .avatar {
          margin-left: 0;
          margin-right: 6px;
        }
      }

      .avatar {
        font-size: 22px;
        margin-left: 6px;
        user-select: none;
      }

      .text {
        background: #f1f5f9;
        border-radius: 10px;
        padding: 10px 16px;
        font-size: 16px;
        max-width: 75%;
        word-break: break-word;
        box-shadow: 0 1px 4px 0 rgba(0,0,0,0.03);
        transition: background 0.2s;
      }
    }

    .loading {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 32px;
      .dot {
        width: 8px;
        height: 8px;
        margin: 0 2px;
        border-radius: 50%;
        background: #6366f1;
        animation: blink 1.2s infinite both;
        &:nth-child(2) { animation-delay: 0.2s; }
        &:nth-child(3) { animation-delay: 0.4s; }
      }
    }
  }

  .textarea {
    margin-bottom: 14px;
    width: 100%;

    textarea {
      width: 100%;
      min-height: 60px;
      max-height: 120px;
      padding: 10px 12px;
      border: 1.5px solid #cbd5e1;
      border-radius: 8px;
      outline: none;
      font-size: 16px;
      resize: vertical;
      background: #f8fafc;
      transition: border 0.2s;
      &:focus {
        border: 1.5px solid #6366f1;
        background: #fff;
      }
      &:disabled {
        background: #e5e7eb;
        color: #a1a1aa;
      }
    }
  }

  .button {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    border-radius: 8px;
    color: #fff;
    background: linear-gradient(90deg, #6366f1 0%, #06b6d4 100%);
    font-weight: bold;
    font-size: 16px;
    border: none;
    cursor: pointer;
    box-shadow: 0 2px 8px 0 rgba(99,102,241,0.08);
    transition: background 0.3s, color 0.3s, box-shadow 0.2s;
    margin-top: 2px;

    &:hover:not(:disabled) {
      background: linear-gradient(90deg, #06b6d4 0%, #6366f1 100%);
      box-shadow: 0 4px 16px 0 rgba(99,102,241,0.12);
    }
    &:disabled {
      background: #cbd5e1;
      color: #a1a1aa;
      cursor: not-allowed;
    }
  }
}

/* Fade animation for messages */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@keyframes blink {
  0%, 80%, 100% { opacity: 0.2; }
  40% { opacity: 1; }
}
</style>
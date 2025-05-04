<template>
  <div class="auth-modal-component">
    <div class="form">
      <div class="title">
        Авторизация
      </div>
      <input
        type="text"
        class="input"
        :class="{ error: authErrors.login}"
        @focus="authErrors.login = ''"
        placeholder="Логин"
        v-model="authModel.login"
      >
      <div
        v-if="authErrors.login"
        class="error-message"
      >
        {{ authErrors.login }}
      </div>
      <input
        type="text"
        class="input"
        :class="{ error: authErrors.password}"
        @focus="authErrors.password = ''"
        placeholder="Пароль"
        v-model="authModel.password"
      >
      <div
        v-if="authErrors.password"
        class="error-message"
      >
        {{ authErrors.password }}
      </div>
      <div
        class="button"
        @click="registration"
      >
        Войти
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">

import { useAuthStore } from '@/stores/auth.ts'
import { ref } from 'vue'
import { validationTests } from '@/shared/validation.ts'
import { useModalStore } from '@/stores/modals.ts'

const authStore = useAuthStore()
const modalStore = useModalStore()

const authModel = ref({
  login: '',
  password: '',
})
const authErrors = ref({
  login: '',
  password: '',
})

function valid() {
  let isValid = true
  authErrors.value.login = ''
  authErrors.value.password = ''
  if (validationTests.required(authModel.value.login)) {
    isValid = false
    authErrors.value.login = validationTests.required(authModel.value.password)
  }
  if (validationTests.required(authModel.value.password)) {
    isValid = false
    authErrors.value.password = validationTests.required(authModel.value.password)
  }
  return isValid
}

function registration() {
  if (valid()) {
    authStore.auth(authModel.value).then(() => {
      modalStore.closeModal()
    }).catch((err) => {
      authErrors.value.login = 'Неверный логин или пароль'
      authErrors.value.password = ' '
    })
  }
}

</script>

<style scoped lang="scss">
.auth-modal-component {
  margin-top: 150px;
  width: 350px;
  background-color: white;
  border-radius: 8px;
  padding: 16px;

  .title {
    text-transform: uppercase;
    font-size: 18px;
    margin-bottom: 16px;
    font-weight: bold;
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
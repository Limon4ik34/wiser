<template>
  <div class="auth-modal-component">
    <div v-if="!success" class="form">
      <div class="title">
        Пройдите регистрацию что бы стать автором
      </div>
      <input
        type="text"
        class="input"
        :class="{ error: regErrors.nik}"
        @focus="regErrors.nik = ''"
        placeholder="Псевдоним"
        v-model="regModel.nik"
      >
      <div
        v-if="regErrors.nik"
        class="error-message"
      >
        {{ regErrors.nik }}
      </div>
      <input
        type="text"
        class="input"
        :class="{ error: regErrors.login}"
        @focus="regErrors.login = ''"
        placeholder="Логин"
        v-model="regModel.login"
      >
      <div
        v-if="regErrors.login"
        class="error-message"
      >
        {{ regErrors.login }}
      </div>
      <input
        type="text"
        class="input"
        :class="{ error: regErrors.password}"
        @focus="regErrors.password = ''"
        placeholder="Пароль"
        v-model="regModel.password"
      >
      <div
        v-if="regErrors.password"
        class="error-message"
      >
        {{ regErrors.password }}
      </div>
      <input
        type="text"
        class="input"
        :class="{ error: regErrors.passwordConfirm}"
        @focus="regErrors.passwordConfirm = ''"
        placeholder="Пароль ещё раз"
        v-model="regModel.passwordConfirm"
      >
      <div
        v-if="regErrors.passwordConfirm"
        class="error-message"
      >
        {{ regErrors.passwordConfirm }}
      </div>
      <div
        class="button"
        @click="registration"
      >
        Регистрация
      </div>
    </div>
    <div v-else class="success">
      <div class="title">
        Вы успешно зарегистрировались
      </div>
      <div
        class="button"
        @click="goToAuth"
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

const success = ref(false)
const regModel = ref({
  nik: '',
  login: '',
  password: '',
  passwordConfirm: '',
})
const regErrors = ref({
  nik: '',
  login: '',
  password: '',
  passwordConfirm: '',
})

function valid() {
  let isValid = true
  regErrors.value.nik = ''
  regErrors.value.login = ''
  regErrors.value.password = ''
  regErrors.value.passwordConfirm = ''
  if (validationTests.required(regModel.value.nik)) {
    isValid = false
    regErrors.value.nik = validationTests.required(regModel.value.nik)
  }
  if (validationTests.required(regModel.value.login)) {
    isValid = false
    regErrors.value.login = validationTests.required(regModel.value.password)
  }
  if (validationTests.required(regModel.value.password)) {
    isValid = false
    regErrors.value.password = validationTests.required(regModel.value.password)
  }
  if (validationTests.required(regModel.value.passwordConfirm)) {
    isValid = false
    regErrors.value.passwordConfirm = validationTests.required(regModel.value.passwordConfirm)
  }
  return isValid
}

function goToAuth() {
  modalStore.openModal('auth')
}

function registration() {
  if (valid()) {
    authStore.registration(regModel.value).then(() => {
      success.value = true
    }).catch((err) => {
      console.log(err)
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
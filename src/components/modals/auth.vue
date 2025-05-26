<template>
  <div class="auth-modal-bg">
    <div class="auth-modal-component">
      <div class="form">
        <div class="title">
          <span>Авторизация</span>
        </div>
        <div class="input-wrapper">
          <span class="icon material-icons">person</span>
          <input
            type="text"
            class="input"
            :class="{ error: authErrors.login}"
            @focus="authErrors.login = ''"
            placeholder="Логин"
            v-model="authModel.login"
          >
        </div>
        <div v-if="authErrors.login" class="error-message">
          {{ authErrors.login }}
        </div>
        <div class="input-wrapper">
          <span class="icon material-icons">lock</span>
          <input
            type="password"
            class="input"
            :class="{ error: authErrors.password}"
            @focus="authErrors.password = ''"
            placeholder="Пароль"
            v-model="authModel.password"
          >
        </div>
        <div v-if="authErrors.password" class="error-message">
          {{ authErrors.password }}
        </div>
        <div class="button" @click="registration">
          Войти
        </div>
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
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.auth-modal-bg {
  min-height: 100vh;
  min-width: 100vw;
  position: fixed;
  top: 0; left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  backdrop-filter: blur(2px);
  animation: fadeInBg 0.7s;
}

@keyframes fadeInBg {
  from { opacity: 0; }
  to { opacity: 1; }
}

.auth-modal-component {
  width: 350px;
  background: rgba(255,255,255,0.95);
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.25);
  padding: 32px 24px 24px 24px;
  animation: fadeInModal 0.7s cubic-bezier(.39,.575,.565,1.000);
  font-family: 'Montserrat', sans-serif;
  transition: box-shadow 0.3s;
  position: relative;
}

@keyframes fadeInModal {
  from { transform: translateY(-40px) scale(0.95); opacity: 0; }
  to { transform: translateY(0) scale(1); opacity: 1; }
}

.title {
  text-transform: uppercase;
  font-size: 22px;
  margin-bottom: 24px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #2d3a4b;
  text-align: center;
}

.input-wrapper {
  position: relative;
  margin-bottom: 12px;
  .icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #a1c4fd;
    font-size: 22px;
    pointer-events: none;
    transition: color 0.2s;
  }
}

.input {
  width: 100%;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px 12px 10px 40px;
  font-size: 16px;
  outline: none;
  background: #f7fbff;
  transition: border 0.2s, box-shadow 0.2s;
  margin-bottom: 0;
  &:focus {
    border: 1.5px solid #a1c4fd;
    box-shadow: 0 0 0 2px #a1c4fd33;
    background: #fff;
  }
  &.error {
    border: 1.5px solid #ff6b6b;
    background: #fff6f6;
  }
}

.error-message {
  font-size: 13px;
  margin-bottom: 8px;
  color: #ff6b6b;
  padding-left: 40px;
  min-height: 18px;
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
  background: linear-gradient(90deg, #a1c4fd 0%, #89f7fe 100%);
  font-weight: bold;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin-top: 12px;
  box-shadow: 0 2px 8px 0 #a1c4fd33;
  transition: background 0.3s, color 0.3s, box-shadow 0.2s, transform 0.1s;
  letter-spacing: 1px;
  &:hover {
    background: linear-gradient(90deg, #89f7fe 0%, #a1c4fd 100%);
    color: #2d3a4b;
    box-shadow: 0 4px 16px 0 #a1c4fd44;
    transform: translateY(-2px) scale(1.03);
  }
}

@media (max-width: 500px) {
  .auth-modal-component {
    width: 95vw;
    padding: 18px 6vw 18px 6vw;
  }
  .title {
    font-size: 18px;
  }
}
</style>
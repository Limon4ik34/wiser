<template>
  <div class="auth-modal-bg">
    <div class="auth-modal-component">
      <!-- Кнопка закрытия -->
      <button class="close-btn" @click="modalStore.closeModal()" aria-label="Закрыть">
        <i class="fa fa-times"></i>
      </button>
      <div class="tabs">
        <div :class="{active: mode==='login'}" @click="mode='login'">Вход</div>
        <div :class="{active: mode==='register'}" @click="mode='register'">Регистрация</div>
      </div>
      <transition name="fade">
        <form v-if="mode==='login'" key="login" @submit.prevent="login">
          <div class="title">Вход в аккаунт</div>
          <div class="input-group">
            <span class="icon"><i class="fa fa-user"></i></span>
            <input
              type="text"
              placeholder="Логин"
              v-model="authModel.login"
              :class="{error: authErrors.login}"
              @focus="authErrors.login = ''"
            />
          </div>
          <div v-if="authErrors.login" class="error-message">{{ authErrors.login }}</div>
          <div class="input-group">
            <span class="icon"><i class="fa fa-lock"></i></span>
            <input
              :type="showLoginPassword ? 'text' : 'password'"
              placeholder="Пароль"
              v-model="authModel.password"
              :class="{error: authErrors.password}"
              @focus="authErrors.password = ''"
            />
            <span class="eye-icon" @click="showLoginPassword = !showLoginPassword">
              <i :class="showLoginPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
            </span>
          </div>
          <div v-if="authErrors.password" class="error-message">{{ authErrors.password }}</div>
          <button class="button" type="submit">Войти</button>
        </form>
        <form v-else key="register" @submit.prevent="registration">
          <div class="title">Регистрация</div>
          <div class="input-group">
            <span class="icon"><i class="fa fa-user-circle"></i></span>
            <input
              type="text"
              placeholder="Псевдоним"
              v-model="regModel.nik"
              :class="{error: regErrors.nik}"
              @focus="regErrors.nik = ''"
            />
          </div>
          <div v-if="regErrors.nik" class="error-message">{{ regErrors.nik }}</div>
          <div class="input-group">
            <span class="icon"><i class="fa fa-user"></i></span>
            <input
              type="text"
              placeholder="Логин"
              v-model="regModel.login"
              :class="{error: regErrors.login}"
              @focus="regErrors.login = ''"
            />
          </div>
          <div v-if="regErrors.login" class="error-message">{{ regErrors.login }}</div>
          <div class="input-group">
            <span class="icon"><i class="fa fa-lock"></i></span>
            <input
              :type="showRegPassword ? 'text' : 'password'"
              placeholder="Пароль"
              v-model="regModel.password"
              :class="{error: regErrors.password}"
              @focus="regErrors.password = ''"
            />
            <span class="eye-icon" @click="showRegPassword = !showRegPassword">
              <i :class="showRegPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
            </span>
          </div>
          <div v-if="regErrors.password" class="error-message">{{ regErrors.password }}</div>
          <div class="input-group">
            <span class="icon"><i class="fa fa-lock"></i></span>
            <input
              :type="showRegPasswordConfirm ? 'text' : 'password'"
              placeholder="Пароль ещё раз"
              v-model="regModel.passwordConfirm"
              :class="{error: regErrors.passwordConfirm}"
              @focus="regErrors.passwordConfirm = ''"
            />
            <span class="eye-icon" @click="showRegPasswordConfirm = !showRegPasswordConfirm">
              <i :class="showRegPasswordConfirm ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
            </span>
          </div>
          <div v-if="regErrors.passwordConfirm" class="error-message">{{ regErrors.passwordConfirm }}</div>
          <button class="button" type="submit">Зарегистрироваться</button>
        </form>
      </transition>
      <transition name="fade">
        <div v-if="success" class="success">
          <div class="title">Вы успешно зарегистрировались!</div>
          <button class="button" @click="mode='login';success=false">Войти</button>
        </div>
      </transition>
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

const mode = ref<'login'|'register'>('login')
const success = ref(false)

const authModel = ref({ login: '', password: '' })
const authErrors = ref({ login: '', password: '' })

const regModel = ref({ nik: '', login: '', password: '', passwordConfirm: '' })
const regErrors = ref({ nik: '', login: '', password: '', passwordConfirm: '' })

// Для показа/скрытия паролей
const showLoginPassword = ref(false)
const showRegPassword = ref(false)
const showRegPasswordConfirm = ref(false)

function validLogin() {
  let isValid = true
  authErrors.value.login = ''
  authErrors.value.password = ''
  if (validationTests.required(authModel.value.login)) {
    isValid = false
    authErrors.value.login = validationTests.required(authModel.value.login)
  }
  if (validationTests.required(authModel.value.password)) {
    isValid = false
    authErrors.value.password = validationTests.required(authModel.value.password)
  }
  return isValid
}

function validRegister() {
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
    regErrors.value.login = validationTests.required(regModel.value.login)
  }
  if (validationTests.required(regModel.value.password)) {
    isValid = false
    regErrors.value.password = validationTests.required(regModel.value.password)
  }
  if (validationTests.required(regModel.value.passwordConfirm)) {
    isValid = false
    regErrors.value.passwordConfirm = validationTests.required(regModel.value.passwordConfirm)
  }
  if (regModel.value.password !== regModel.value.passwordConfirm) {
    isValid = false
    regErrors.value.passwordConfirm = 'Пароли не совпадают'
  }
  return isValid
}

function login() {
  if (validLogin()) {
    authStore.auth(authModel.value).then(() => {
      modalStore.closeModal()
    }).catch(() => {
      authErrors.value.login = 'Неверный логин или пароль'
      authErrors.value.password = ' '
    })
  }
}

function registration() {
  if (validRegister()) {
    authStore.registration(regModel.value).then(() => {
      success.value = true
    }).catch((err) => {
      regErrors.value.login = err?.message || 'Ошибка регистрации'
    })
  }
}
</script>

<style scoped lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.auth-modal-bg {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0; top: 0;
  z-index: 1000;
}

.auth-modal-component {
  width: 370px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  padding: 32px 28px 24px 28px;
  position: relative;
  animation: pop-in 0.5s cubic-bezier(.68,-0.55,.27,1.55);

  @keyframes pop-in {
    0% { transform: scale(0.8); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }

  .close-btn {
    position: absolute;
    top: 14px;
    right: 16px;
    background: none;
    border: none;
    font-size: 22px;
    color: #bdbdbd;
    cursor: pointer;
    z-index: 2;
    transition: color 0.2s;
    &:hover {
      color: #ff6a88;
    }
  }

  .tabs {
    display: flex;
    margin-bottom: 24px;
    > div {
      flex: 1;
      text-align: center;
      padding: 10px 0;
      cursor: pointer;
      font-weight: 600;
      color: #888;
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
      &.active {
        color: #ff6a88;
        border-bottom: 2.5px solid #ff6a88;
        background: linear-gradient(90deg, #fbc2eb 0%, #a6c1ee 100%);
        border-radius: 8px 8px 0 0;
      }
    }
  }

  .title {
    text-align: center;
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 18px;
    color: #373535;
    letter-spacing: 1px;
  }

  .input-group {
    position: relative;
    margin-bottom: 12px;
    .icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #bdbdbd;
      font-size: 16px;
      pointer-events: none;
    }
    .eye-icon {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #bdbdbd;
      font-size: 18px;
      cursor: pointer;
      z-index: 1;
      transition: color 0.2s;
      &:hover {
        color: #ff6a88;
      }
    }
    input {
      width: 100%;
      padding: 10px 38px 10px 38px;
      border: 1.5px solid #e0e0e0;
      border-radius: 8px;
      font-size: 16px;
      background: #fafafa;
      transition: border 0.2s;
      &:focus {
        border-color: #ff6a88;
        background: #fff;
      }
      &.error {
        border-color: #ff6a88;
        background: #fff0f3;
      }
    }
  }

  .error-message {
    color: #ff6a88;
    font-size: 13px;
    margin-bottom: 6px;
    margin-left: 4px;
    min-height: 16px;
    transition: color 0.2s;
  }

  .button {
    width: 100%;
    height: 48px;
    margin-top: 10px;
    background: linear-gradient(90deg, #fbc2eb 0%, #a6c1ee 100%);
    color: #373535;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(255,106,136,0.08);
    transition: background 0.2s, color 0.2s;
    &:hover {
      background: linear-gradient(90deg, #a6c1ee 0%, #fbc2eb 100%);
      color: #ff6a88;
    }
  }

  .success {
    text-align: center;
    .title {
      color: #4caf50;
      margin-bottom: 18px;
    }
    .button {
      margin-top: 18px;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
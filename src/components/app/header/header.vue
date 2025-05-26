<template>
  <header class="main-header">
    <router-link to="/" class="logo">
      <img src="@/assets/img/logo.webp" alt="Логотип" />
    </router-link>
    <div class="links">
      <button
        v-if="!user"
        class="become-author-btn"
        @click="openRegModal"
      >
        Войти/Зарегистрироваться
      </button>

      <button
        v-if="user"
        class="logout-btn"
        @click="logout"
        title="Выйти"
      >
        Выйти
      </button>

      <router-link
        v-if="user && user.role === 'admin'"
        to="/admin"
        class="admin-btn"
      >
        Админка
      </router-link>

      <div v-if="user" class="user-menu">
        <router-link to="/profile/articles" class="user-link">
          <span class="user-nik">{{ user.nik }}</span>
          <div class="avatar">
            <div v-if="!user.avatar" class="letter">
              {{ user.nik[0] }}
            </div>
            <div
              v-else
              class="avatar-img"
              :style="{ backgroundImage: `url(${user.avatar})` }"
            />
          </div>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useModalStore } from '@/stores/modals.ts'
import { useUserStore } from '@/stores/user.ts'

const modalStore = useModalStore()
const userStore = useUserStore()
const user = computed(() => userStore.user)

function openRegModal() {
  modalStore.openModal('registration')
}

function logout() {
  userStore.logout()
}
</script>

<style scoped lang="scss">
.main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 32px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  border-radius: 12px; // Закруглённые края для хедера

  .logo img {
    height: 38px;
    transition: transform 0.2s;
    border-radius: 8px; // Немного скругляем лого
    &:hover {
      transform: scale(1.05) rotate(-2deg);
    }
  }

  .links {
    display: flex;
    align-items: center;
    gap: 16px;

    .become-author-btn {
      background: linear-gradient(90deg, #ff7e5f 0%, #feb47b 100%);
      color: #fff;
      border: none;
      border-radius: 30px;
      padding: 12px 32px;
      font-size: 1.1rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 6px 12px rgba(255,126,95,0.3);
      transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.15s ease;
      user-select: none;
      &:hover {
        background: linear-gradient(90deg, #feb47b 0%, #ff7e5f 100%);
        box-shadow: 0 8px 20px rgba(255,126,95,0.45);
        transform: translateY(-3px) scale(1.05);
      }
      &:active {
        transform: translateY(-1px) scale(1.02);
        box-shadow: 0 4px 10px rgba(255,126,95,0.25);
      }
    }

    .logout-btn {
      background: #ff6b6b;
      color: #fff;
      border: none;
      border-radius: 30px;
      padding: 10px 26px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(255,107,107,0.3);
      transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.15s ease;
      user-select: none;
      &:hover {
        background: #ff4c4c;
        box-shadow: 0 6px 16px rgba(255,76,76,0.45);
        transform: translateY(-2px) scale(1.04);
      }
      &:active {
        transform: translateY(-1px) scale(1.02);
        box-shadow: 0 3px 8px rgba(255,76,76,0.25);
      }
    }

    .admin-btn {
      background: #4a90e2;
      color: #fff;
      border: none;
      border-radius: 30px;
      padding: 10px 26px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 10px rgba(74,144,226,0.3);
      transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.15s ease;
      user-select: none;
      &:hover {
        background: #357abd;
        box-shadow: 0 6px 16px rgba(53,122,189,0.45);
        transform: translateY(-2px) scale(1.04);
        text-decoration: none;
        color: #fff;
      }
      &:active {
        transform: translateY(-1px) scale(1.02);
        box-shadow: 0 3px 8px rgba(53,122,189,0.25);
      }
    }

    .user-menu {
      position: relative;
      .user-link {
        display: flex;
        align-items: center;
        gap: 12px;
        text-decoration: none;
        color: #222;
        font-weight: 500;
        font-size: 1.05rem;
        cursor: pointer;
        transition: color 0.2s;
        border-radius: 30px;
        padding: 6px 14px;
        &:hover {
          color: #ff7e5f;
          background: #ff7e5f11;
        }
      }
      .avatar {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: #f3f3f3;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        .letter {
          font-size: 1.3rem;
          font-weight: 700;
          color: #ff7e5f;
        }
        .avatar-img {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
        }
      }
      .dropdown {
        position: absolute;
        top: 48px;
        right: 0;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 4px 24px rgba(0,0,0,0.08);
        min-width: 160px;
        z-index: 10;
        display: flex;
        flex-direction: column;
        padding: 8px 0;
        a, .logout {
          padding: 10px 20px;
          color: #222;
          text-decoration: none;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          border-radius: 8px;
          margin: 0 12px;
          &:hover {
            background: #ff7e5f22;
            color: #ff7e5f;
          }
        }
        .logout {
          border-top: 1px solid #f3f3f3;
          margin-top: 4px;
        }
      }
    }
  }
}

@media (max-width: 600px) {
  .main-header {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 10px;
    border-radius: 8px;

    .logo img {
      height: 32px;
      border-radius: 6px;
    }
    .links {
      gap: 12px;
      width: 100%;
      flex-wrap: wrap;

      .become-author-btn,
      .logout-btn,
      .admin-btn {
        flex-grow: 1;
        text-align: center;
        padding: 10px 0;
        font-size: 1rem;
        border-radius: 24px;
      }

      .user-menu .avatar {
        width: 32px;
        height: 32px;
      }
    }
  }
}
</style>
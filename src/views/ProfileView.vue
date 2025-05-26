<template>
  <div class="profile-page">
    <aside class="sidebar">
      <div class="profile-card">
        <div class="name">Цитата дня</div>
        <div class="role" style="font-style: italic; margin-top: 12px;">
          "Лучший способ что-то сделать — перестать говорить и начать делать." <br />
          <span style="font-size: 13px; color: #b0b3c6;">— Уолт Дисней</span>
        </div>
      </div>
      <nav class="menu">
        <router-link
          to="/profile/about"
          class="link"
          active-class="active"
        >
          <span class="icon">👤</span>
          Об авторе
        </router-link>
        <router-link
          to="/profile/articles"
          class="link"
          active-class="active"
        >
          <span class="icon">📝</span>
          Мои статьи
        </router-link>
      </nav>
    </aside>
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
// Здесь может быть логика, если потребуется
</script>

<style scoped lang="scss">
.profile-page {
  display: flex;
  justify-content: center;
  background: #f6f8fa;
  min-height: 80vh;
  margin-top: 32px;
  padding: 32px 0;
  box-sizing: border-box;
}

.sidebar {
  width: 320px;
  min-width: 260px;
  margin-right: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(50, 54, 74, 0.08);
  padding: 32px 24px 24px 24px;
  margin-bottom: 32px;
  text-align: center;
  width: 100%;

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 16px;
    border: 3px solid #e0e4ea;
    object-fit: cover;
  }
  .name {
    font-size: 20px;
    font-weight: 700;
    color: #32364a;
    margin-bottom: 4px;
  }
  .role {
    font-size: 14px;
    color: #7a7f9a;
  }
}

.menu {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .link {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #32364a;
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
    padding: 12px 18px;
    border-radius: 10px;
    text-decoration: none;
    transition: background 0.2s, color 0.2s;
    cursor: pointer;

    .icon {
      font-size: 18px;
    }

    &:hover {
      background: #e6e9f2;
      color: #2a2d3c;
    }
    &.active {
      background: #32364a;
      color: #fff;
    }
  }
}

.content {
  flex: 1;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(50, 54, 74, 0.08);
  padding: 32px 40px;
  min-width: 0;
}

@media (max-width: 900px) {
  .profile-page {
    flex-direction: column;
    align-items: center;
    padding: 16px 0;
  }
  .sidebar {
    flex-direction: row;
    width: 100%;
    margin-right: 0;
    margin-bottom: 24px;
    justify-content: center;
    .profile-card {
      margin-bottom: 0;
      margin-right: 24px;
      width: 220px;
      padding: 24px 12px;
    }
    .menu {
      flex-direction: row;
      gap: 12px;
      width: auto;
    }
  }
  .content {
    width: 100%;
    padding: 24px 10px;
  }
}
</style>
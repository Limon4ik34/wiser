<template>
  <div class="profile-page">
    <div class="menu">
      <router-link to="/profile/about" class="link">
        Об авторе
      </router-link>
      <router-link to="/profile/articles" class="link">
        Мои статьи
      </router-link>
    </div>
    <RouterView />
  </div>
</template>
<script setup lang="ts">
</script>

<style scoped lang="scss">

.profile-page {
  display: flex;
  background: white;
  margin-top: 32px;


  .menu {
    margin-right: 16px;
    padding: 16px;
    width: 300px;

    .link {
      color: #32364a;
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;
      cursor: pointer;
      display: flex;
      margin-bottom: 8px;
    }
  }
}

</style>
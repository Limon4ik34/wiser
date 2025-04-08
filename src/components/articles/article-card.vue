<template>
  <div class="article-card">
    <div
      class="preview-image"
      :style="{backgroundImage: `url(https://mortwood.purplelabs.eu/img/upload/1479491072-1.jpg)`}"
    />
    <div class="title">
      Заголовок статьи
    </div>
    <div class="text">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A architecto enim ex modi, tempore veritatis? Libero officia repellat repellendus? Aut!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A architecto enim ex modi, tempore veritatis? Libero officia repellat repellendus? Aut!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A architecto enim ex modi, tempore veritatis? Libero officia repellat repellendus? Aut!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A architecto enim ex modi, tempore veritatis? Libero officia repellat repellendus? Aut!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A architecto enim ex modi, tempore veritatis? Libero officia repellat repellendus? Aut!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A architecto enim ex modi, tempore veritatis? Libero officia repellat repellendus? Aut!
    </div>
    <div class="author">
      <div
        class="avatar"
        :style="{backgroundImage: `url(https://yt3.googleusercontent.com/ytc/AIdro_kwiB5Ji4n19kCVY4Rtd-fODRSperExvoniNy6YDex5Peo=s900-c-k-c0x00ffffff-no-rj)`}"
      />
      <div class="name">
        Сангвиний
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>

<style scoped lang="scss">

.article-card {
  width: 100%;
  background-color: white;

  .preview-image {
    width: 100%;
    padding-top: 100%;
    background-size: cover;
    background-position: center;
    margin-bottom: 16px;
  }

  .title {
    padding: 8px;
    font-size: 18px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    line-height: 22px;
    height: 44px;
    margin-bottom: 16px;
    color: #818181;
  }

  .text {
    padding: 8px;
    font-size: 14px;
    color: #818181;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
    line-clamp: 10;
    line-height: 18px;
    height: 190px;
    margin-bottom: 16px;
  }

  .author {
    padding: 8px;
    display: flex;
    align-items: center;

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: plum;
      margin-right: 8px;
      background-size: cover;
      background-position: center;
    }

    .name {
      font-size: 16px;
      color: #373535;
      font-weight: bold;
    }
  }
}
</style>
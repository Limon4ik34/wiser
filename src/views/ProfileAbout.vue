<template>
  <div class="profile-about">
    <div class="about">
      <div class="avatar">
        <div class="field-title">
          Загрузите автар, что бы вас узнавали
        </div>
        <label class="uploader">
          <div
            v-if="userModel.avatar"
            class="image-preview"
            :style="{ backgroundImage: `url(${userModel.avatar})` }"
          />
          <div v-else class="uploader-preview">
            Загрузить аватар
          </div>
          <input type="file" @change="uploadImage">
        </label>
      </div>
      <div class="field-title">
        Расскажите о себе
      </div>
      <div class="article-editor">
        <ckeditor
          v-if="editor && config"
          v-model="userModel.about"
          :editor="editor"
          :config="config"
        />
      </div>
      <div
        class="button"
        @click="save"
      >
        Сохранить
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useArticleStore } from '@/stores/article.ts'
import { Ckeditor, useCKEditorCloud } from '@ckeditor/ckeditor5-vue'
import { useUserStore } from '@/stores/user.ts'
const articleStore = useArticleStore()
const userStore = useUserStore()
const userModel = ref({
  id: userStore.user.id,
  avatar: userStore.user.avatar,
  about: userStore.user.about,
});

function uploadImage(event: Event) {
  const target = event.target as HTMLInputElement;
  let files = target.files
  if (files) {
    articleStore.uploadImage(files[0]).then(({ data }) => {
      userModel.value.avatar = data.data.image
      target.files = null
    })
  }
}

function save() {
  userStore.setUserData(userModel.value)
}

const cloud = useCKEditorCloud( {
  version: '45.0.0',
  premium: false
} )

const editor = computed( () => {
  if ( !cloud.data.value ) {
    return null;
  }

  return cloud.data.value.CKEditor.ClassicEditor;
} )

const config = computed( () => {
  if ( !cloud.data.value ) {
    return null;
  }
  const {
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Heading,
    FontSize,
    FontColor,
    BlockQuote,
    CodeBlock,
    Link,
    ImageUpload,
    ImageInsertUI,
    Image,
    ImageToolbar,
    ImageCaption,
    ImageStyle,
    ImageResize,
    LinkImage,
    SimpleUploadAdapter,
    AutoImage
  } = cloud.data.value.CKEditor;

  return {
    licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3Nzc4NTI3OTksImp0aSI6ImI4N2Y0MmI5LTVkMmQtNDIwNC1hMWNkLWUwZTBjNzZhZTFmMyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiXSwiZmVhdHVyZXMiOlsiRFJVUCJdLCJ2YyI6Ijk2YjA4MTUzIn0.g-we61Cklx_OrUCFhGFeDT2B9seBlQqap0kH-Nx4j4u2AH4JI6z0F3p7hvyEQsucKuNYTp8_JqthQ6qFAdAR7w',
    plugins: [
      Essentials,
      Paragraph,
      Bold,
      Italic,
      Heading,
      FontSize,
      FontColor,
      BlockQuote,
      CodeBlock,
      Link,
      ImageUpload,
      ImageInsertUI,
      Image,
      ImageToolbar,
      ImageCaption,
      ImageStyle,
      ImageResize,
      LinkImage,
      SimpleUploadAdapter,
      AutoImage
    ],
    toolbar: [
      'undo', 'redo', '|',
      'heading','fontsize', 'fontColor','|',
      'link','link', 'blockQuote','codeBlock', 'insertImage' ,'|',
      'bold', 'italic', '|',
    ],
    simpleUpload: {
      uploadUrl: 'http://localhost:5000/upload-image-editor',
      headers: {
        Authorization: localStorage.token
      }
    }
  };
} )
</script>

<style scoped lang="scss">
.profile-about {
  width: 100%;
  padding: 16px;
}

.field-title {
  margin-bottom: 8px ;
  font-weight: bold;
  font-size: 14px;
}

.input {
  margin-bottom: 16px;
  input {
    width: 100%;
    border: 1px solid gray;
    border-radius: 8px;
    padding: 8px;
    font-size: 16px;
    outline: none;

    &.error {
      border: 1px solid red;
    }
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
  margin-top: 16px;

  &:hover {
    background-color: #373535;
    color: white;
  }
}

.uploader {
  margin-bottom: 16px;
  cursor: pointer;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  .image-preview {
    padding-top: 50%;
    background-size: cover;
    background-position: center center;
    position: relative;
    width: 250px;
    height: 250px;
    border-radius: 50%;
  }

  .uploader-preview {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #32364a;
    width: 250px;
    height: 250px;
    border-radius: 50%;

  }
  input {
    display: none;
  }
}
</style>
<template>
  <div class="profile-about">
    <div class="about">
      <div class="avatar">
        <div class="field-title">
          Загрузите аватар, чтобы вас узнавали
        </div>
        <label class="uploader">
          <div
            v-if="userModel.avatar"
            class="image-preview"
            :style="{ backgroundImage: `url(${userModel.avatar})` }"
          />
          <div v-else class="uploader-preview">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
              <path d="M12 16V4M12 4l-4 4M12 4l4 4" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <rect x="4" y="16" width="16" height="4" rx="2" fill="#6366f1" fill-opacity="0.1"/>
            </svg>
            <span>Загрузить аватар</span>
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
      target.value = ''
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
  max-width: 600px;
  margin: 32px auto;
  padding: 32px 24px;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(60, 72, 88, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.about {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.field-title {
  margin-bottom: 8px;
  font-weight: 700;
  font-size: 16px;
  color: #373535;
  letter-spacing: 0.5px;
}

.uploader {
  margin-bottom: 24px;
  cursor: pointer;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 4px 16px rgba(60, 72, 88, 0.10);
  background: #fff;
  transition: box-shadow 0.3s;
  margin-left: auto; 
  margin-right: auto; 

  &:hover {
    box-shadow: 0 8px 32px rgba(60, 72, 88, 0.18);
  }

  .image-preview {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background-size: cover;
    background-position: center center;
    position: relative;
    transition: filter 0.3s;
    border: 3px solid #6366f1;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.10);

    &:hover {
      filter: brightness(0.95) blur(1px);
    }
  }

  .uploader-preview {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed #6366f1;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    color: #6366f1;
    font-size: 18px;
    background: #f1f5f9;
    transition: background 0.3s;
    &:hover {
      background: #e0e7ff;
    }
  }
  input {
    display: none;
  }
}

.article-editor {
  width: 100%;
  margin-bottom: 24px;
  .ck-editor__editable {
    min-height: 120px;
    border-radius: 12px;
    background: #fff;
    border: 1px solid #e5e7eb;
    box-shadow: 0 2px 8px rgba(60, 72, 88, 0.04);
    padding: 12px;
    font-size: 16px;
    transition: border 0.2s;
    &:focus {
      border: 1.5px solid #6366f1;
    }
  }
}

.button {
  width: 100%;
  max-width: 220px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  border-radius: 12px;
  color: #fff;
  background: linear-gradient(90deg, #6366f1 0%, #818cf8 100%);
  font-weight: bold;
  font-size: 16px;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.10);
  margin-top: 24px;
  letter-spacing: 1px;
  transition: background 0.3s, color 0.3s, box-shadow 0.3s;

  &:hover {
    background: linear-gradient(90deg, #818cf8 0%, #6366f1 100%);
    color: #fff;
    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.18);
    transform: translateY(-2px) scale(1.03);
  }
}

@media (max-width: 700px) {
  .profile-about {
    padding: 16px 4px;
    border-radius: 12px;
  }
  .uploader, .uploader .image-preview, .uploader .uploader-preview {
    width: 120px;
    height: 120px;
  }
  .button {
    max-width: 100%;
    font-size: 15px;
    height: 44px;
  }
}
</style>
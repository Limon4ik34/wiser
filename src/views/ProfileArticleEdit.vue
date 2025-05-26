<template>
  <div class="article-edit-page">
    <div class="title">
      {{ id === 'new' ? 'Новая статья': articleModel.title }}
    </div>
    <div class="subtitle">
      Нужна помощь? Обратитесь к нашему <span @click="openHelper">помощнику</span>
    </div>
    <div class="field-title">
      Загрузите изображение для превью
    </div>
    <label class="uploader">
      <div
        v-if="articleModel.previewImage"
        class="image-preview"
        :style="{ backgroundImage: `url(${articleModel.previewImage})` }"
      />
      <div v-else class="uploader-preview">
        Загрузить превью
      </div>
      <input type="file" @change="uploadImage">
    </label>
    <div class="field-title">
      Дайте вашей статье оригинальное название
    </div>
    <div class="input">
      <input
        type="text"
        placeholder="Название статьи"
        v-model="articleModel.title"
      >
    </div>
    <div class="field-title">
      О чем ваша статья
    </div>
    <div class="textarea">
      <textarea v-model="articleModel.description" />
    </div>
    <div class="field-title">
      Напишите вашу статью
    </div>
    <div class="article-editor">
      <ckeditor
        v-if="editor && config"
        v-model="articleModel.text"
        :editor="editor"
        :config="config"
      />
    </div>
    <div
      class="button"
      @click="createArticle"
    >
      Сохранить
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Ckeditor, useCKEditorCloud } from '@ckeditor/ckeditor5-vue';
import { useRoute } from 'vue-router'
import { useArticleStore } from '@/stores/article.ts'
import { useModalStore } from '@/stores/modals.ts'
const articleStore = useArticleStore()
const modalStore = useModalStore()

const id = useRoute().params.id;
const articleModel = ref({
  title: '',
  description: '',
  text: '',
  previewImage: '',
})

onMounted(() => {
  if (id !== 'new') {
    articleStore.getArticleById(id.toString()).then(({data}) => {
      articleModel.value = data.data
    })
  }
})

function uploadImage(event: Event) {
  const target = event.target as HTMLInputElement;
  let files = target.files
  if (files) {
    articleStore.uploadImage(files[0]).then(({ data }) => {
      articleModel.value.previewImage = data.data.image
      target.files = null
    })
  }
}

function createArticle() {
  if (id === 'new') {
    articleStore.createArticle(articleModel.value).then(({ data }) => {
      console.log(data)
    })
  } else {
    articleModel.value.id = +id
    articleStore.updateArticle(articleModel.value).then(({ data }) => {
      console.log(data)
    })
  }
}

function openHelper() {
  modalStore.openModal('helper')
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
.article-edit-page {
  max-width: 700px;
  margin: 40px auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  padding: 32px 24px 32px 24px;
  position: relative;
  transition: box-shadow 0.3s;

  @media (max-width: 800px) {
    padding: 16px 4vw;
    max-width: 98vw;
  }

  .title {
    font-size: 2.1rem;
    font-weight: 700;
    margin-bottom: 18px;
    color: #232946;
    letter-spacing: 0.5px;
    text-align: center;
  }
  .subtitle {
    margin-bottom: 24px;
    color: #6c6f7b;
    font-size: 1.1rem;
    text-align: center;
    span {
      color: #3d5af1;
      cursor: pointer;
      font-weight: 600;
      text-decoration: underline;
      transition: color 0.2s;
      &:hover {
        color: #232946;
      }
    }
  }
  .field-title {
    margin-bottom: 8px;
    font-weight: 600;
    font-size: 1.05rem;
    color: #232946;
    margin-top: 18px;
  }

  .input {
    margin-bottom: 18px;
    input {
      width: 100%;
      border: 1.5px solid #e0e0e0;
      border-radius: 10px;
      padding: 12px;
      font-size: 1.1rem;
      outline: none;
      background: #f7f7fa;
      transition: border 0.2s, box-shadow 0.2s;
      &:focus {
        border: 1.5px solid #3d5af1;
        box-shadow: 0 0 0 2px #3d5af133;
      }
      &.error {
        border: 1.5px solid #ff4d4f;
      }
    }
  }

  .uploader {
    margin-bottom: 18px;
    cursor: pointer;
    display: block;

    .image-preview {
      width: 100%;
      padding-top: 50%;
      background-size: cover;
      background-position: center center;
      border-radius: 12px;
      position: relative;
      box-shadow: 0 2px 12px 0 rgba(61, 90, 241, 0.08);
      border: 2px solid #e0e0e0;
      transition: box-shadow 0.2s, border 0.2s;
      &:hover {
        box-shadow: 0 4px 24px 0 rgba(61, 90, 241, 0.13);
        border: 2px solid #3d5af1;
      }
      &::after {
        content: "Изменить";
        position: absolute;
        bottom: 8px;
        right: 12px;
        background: rgba(61,90,241,0.85);
        color: #fff;
        font-size: 0.95rem;
        padding: 2px 10px;
        border-radius: 8px;
        opacity: 0;
        transition: opacity 0.2s;
        pointer-events: none;
      }
      &:hover::after {
        opacity: 1;
      }
    }

    .uploader-preview {
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      border: 2px dashed #3d5af1;
      background: #f7f7fa;
      color: #3d5af1;
      font-weight: 600;
      font-size: 1.1rem;
      transition: border 0.2s, background 0.2s;
      &:hover {
        border: 2px solid #3d5af1;
        background: #e8eefd;
      }
    }
    input {
      display: none;
    }
  }

  .button {
    width: 100%;
    height: 54px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    border-radius: 12px;
    color: #fff;
    background: linear-gradient(90deg, #3d5af1 0%, #5f6cff 100%);
    font-weight: bold;
    font-size: 1.15rem;
    border: none;
    cursor: pointer;
    box-shadow: 0 2px 8px 0 rgba(61, 90, 241, 0.10);
    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
    margin-top: 24px;
    letter-spacing: 1px;

    &:hover {
      background: linear-gradient(90deg, #232946 0%, #3d5af1 100%);
      color: #fff;
      box-shadow: 0 4px 16px 0 rgba(61, 90, 241, 0.18);
    }
  }

  .textarea {
    margin-bottom: 18px;
    width: 100%;

    textarea {
      width: 100%;
      min-height: 120px;
      padding: 12px;
      border: 1.5px solid #e0e0e0;
      border-radius: 10px;
      outline: none;
      font-size: 1.1rem;
      background: #f7f7fa;
      transition: border 0.2s, box-shadow 0.2s;
      &:focus {
        border: 1.5px solid #3d5af1;
        box-shadow: 0 0 0 2px #3d5af133;
      }
    }
  }

  .article-editor {
    margin-bottom: 18px;
    .ck-editor__editable {
      min-height: 220px;
      border-radius: 10px;
      background: #f7f7fa;
      border: 1.5px solid #e0e0e0;
      transition: border 0.2s, box-shadow 0.2s;
      &:focus {
        border: 1.5px solid #3d5af1;
        box-shadow: 0 0 0 2px #3d5af133;
      }
    }
  }
}
</style>

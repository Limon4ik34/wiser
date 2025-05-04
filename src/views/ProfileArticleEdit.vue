<template>
  <div class="article-edit-page">
    <div class="title">
      {{ id === 'new' ? 'Новая статья': articleModel.title }}
    </div>
    <div class="subtitle">
      Нужна помощь? Обратитесь к нашему <span @click="openHelper">помошнику</span>
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
  articleStore.createArticle(articleModel.value).then(({ data }) => {
    console.log(data)
  })
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
  padding: 16px;
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  .subtitle {
    margin-bottom: 16px;
    color: grey;
    span {
      color: #32364a;
      cursor: pointer;
    }
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

  .uploader {
    margin-bottom: 16px;
    cursor: pointer;
    display: block;

    .image-preview {
      width: 100%;
      padding-top: 50%;
      background-size: cover;
      background-position: center center;
      border-radius: 8px;
      position: relative;
    }

    .uploader-preview {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      border: 1px solid #32364a;
    }
    input {
      display: none;
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

  .textarea {
    margin-bottom: 16px;
    width: 100%;

    textarea {
      width: 100%;
      min-height: 150px;
      padding: 8px;
      border: 1px solid gray;
      border-radius: 8px;
      outline: none;
      font-size: 16px;
    }
  }
}
</style>
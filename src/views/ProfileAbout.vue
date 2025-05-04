<template>
  <div class="profile-about">
    <div class="about">
      <ckeditor
        v-if="editor && config"
        v-model="data"
        :editor="editor"
        :config="config"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Ckeditor, useCKEditorCloud } from '@ckeditor/ckeditor5-vue';

const cloud = useCKEditorCloud( {
  version: '45.0.0',
  premium: false
} );

const data = ref( '<p>Hello world!</p>' );

const editor = computed( () => {
  if ( !cloud.data.value ) {
    return null;
  }

  return cloud.data.value.CKEditor.ClassicEditor;
} );

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
    Base64UploadAdapter,
    Image,
    ImageToolbar,
    ImageCaption,
    ImageStyle,
    ImageResize,
    LinkImage
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
      Base64UploadAdapter,
      Image,
      ImageToolbar,
      ImageCaption,
      ImageStyle,
      ImageResize,
      LinkImage
    ],
    toolbar: [
      'undo', 'redo', '|',
      'heading','fontsize', 'fontColor','|',
      'link', 'blockQuote','codeBlock', 'insertImage' ,'|',
      'bold', 'italic', '|',
    ]
  };
} );

</script>

<style scoped lang="scss">
.profile-about {
  width: 100%;
  padding: 16px;
}
</style>
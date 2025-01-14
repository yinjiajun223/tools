<template>
  <el-card class="image-compressor-container">
    <h2>图片压缩工具</h2>
    <el-upload class="upload-area" :show-file-list="false" accept="image/*">
      <el-button>点击上传或拖拽文件到这里</el-button>
    </el-upload>
    <el-button type="primary" :disabled="!imageFile" @click="compressImage">压缩图片</el-button>
    <el-image v-if="compressedImageUrl" :src="compressedImageUrl" style="margin-top: 20px" />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElUpload, ElButton, ElImage, ElCard } from 'element-plus'
import { useImage } from '@/composables/useImage'

const { imageFile } = useImage()
const compressedImageUrl = ref<string | null>(null)

const compressImage = () => {
  if (imageFile.value) {
    // Perform image compression logic here
    compressedImageUrl.value = imageFile.value.url
  }
}
</script>

<style scoped lang="scss">
.image-compressor-container {
  padding: 20px;
  .upload-area {
    border: 2px dashed #d9d9d9;
    padding: 20px;
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>

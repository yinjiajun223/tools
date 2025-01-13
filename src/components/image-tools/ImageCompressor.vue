<template>
  <el-card class="image-compressor-container">
    <h2>图片压缩工具</h2>
    <el-upload
      class="upload-area"
      :before-upload="beforeUpload"
      :on-change="handleChange"
      :show-file-list="false"
      accept="image/*"
    >
      <el-button>点击上传或拖拽文件到这里</el-button>
    </el-upload>
    <el-button type="primary" @click="compressImage" :disabled="!imageFile">压缩图片</el-button>
    <el-image v-if="compressedImageUrl" :src="compressedImageUrl" style="margin-top: 20px" />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElUpload, ElButton, ElImage, ElCard } from 'element-plus'
import { useImage } from '@/composables/useImage'

const { imageFile, loadImage } = useImage()
const compressedImageUrl = ref<string | null>(null)

const beforeUpload = (file: File) => {
  loadImage(file).then((img) => {
    imageFile.value = img
  })
  return false // Prevent automatic upload
}

const handleChange = (file: File) => {
  // Handle file change if needed
}

const compressImage = () => {
  if (imageFile.value) {
    // Perform image compression logic here
    // For demonstration, we will just set the image URL
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

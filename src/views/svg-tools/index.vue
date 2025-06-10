<template>
  <div class="h-[calc(100vh-150px)] flex flex-col justify-center items-center bg-gray-50 py-4">
    <!-- 标题区域 -->
    <h2 class="text-2xl font-bold text-indigo-600 mb-6 text-center flex items-center gap-2">
      <el-icon class="text-xl"><PictureFilled /></el-icon>
      SVG 图片生成工具
    </h2>

    <!-- 主要内容区域 -->
    <div class="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-6 flex-1 max-h-[85vh] overflow-hidden">
      <!-- 编辑器和预览区域 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        <!-- 左侧：代码编辑器 -->
        <div class="border border-gray-200 rounded-lg overflow-hidden bg-white flex flex-col">
          <div class="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200 flex-shrink-0">
            <h3 class="flex items-center gap-2 font-medium text-gray-700">
              <el-icon><EditPen /></el-icon>
              代码编辑
            </h3>
            <el-tag size="small" :type="isValidSvg ? 'success' : 'danger'">
              {{ isValidSvg ? 'SVG 有效' : 'SVG 无效' }}
            </el-tag>
          </div>
          <div class="p-4 flex-1 overflow-hidden">
            <SvgEditor v-model:code="svgCode" @code-change="handleCodeChange" />
          </div>
        </div>

        <!-- 右侧：预览面板 -->
        <div class="border border-gray-200 rounded-lg overflow-hidden bg-white flex flex-col">
          <div class="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200 flex-shrink-0">
            <h3 class="flex items-center gap-2 font-medium text-gray-700">
              <el-icon><View /></el-icon>
              实时预览
            </h3>
            <span class="text-sm text-gray-500">{{ svgCode.length }} 字符</span>
          </div>
          <div class="p-4 flex-1 overflow-hidden">
            <SvgPreview :svg-code="svgCode" :is-valid="isValidSvg" @validation-change="handleValidationChange" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PictureFilled, EditPen, View } from '@element-plus/icons-vue'
import SvgEditor from '@/components/svg-tools/SvgEditor.vue'
import SvgPreview from '@/components/svg-tools/SvgPreview.vue'

import type { SvgValidationResult } from '@/types/svg'

// 响应式数据
const svgCode = ref(`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <!-- 示例：彩色圆形 -->
  <circle 
    cx="100" 
    cy="100" 
    r="80" 
    fill="#4F46E5" 
    stroke="#1E40AF" 
    stroke-width="4"
  />
  
  <!-- 示例：居中文字 -->
  <text 
    x="100" 
    y="105" 
    text-anchor="middle" 
    font-family="Arial, sans-serif" 
    font-size="5" 
    fill="white"
  >
    SVG 工具
  </text>
</svg>`)

const isValidSvg = ref(true)

// 事件处理
const handleCodeChange = (code: string) => {
  svgCode.value = code
}

const handleValidationChange = (result: SvgValidationResult) => {
  isValidSvg.value = result.isValid
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.template-preview :deep(svg) {
  max-width: 100%;
  max-height: 100%;
}
</style>

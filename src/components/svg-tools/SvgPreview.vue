<template>
  <div class="svg-preview">
    <!-- 简化工具栏 -->
    <div class="preview-toolbar">
      <div class="toolbar-left">
        <el-button-group size="small">
          <el-button :disabled="scale <= 0.5" title="缩小" @click="handleZoomOut">
            <el-icon><ZoomOut /></el-icon>
          </el-button>
          <el-button title="重置缩放" @click="resetZoom">{{ Math.round(scale * 100) }}%</el-button>
          <el-button :disabled="scale >= 2" title="放大" @click="handleZoomIn">
            <el-icon><ZoomIn /></el-icon>
          </el-button>
        </el-button-group>
      </div>

      <div class="toolbar-right">
        <el-button-group size="small">
          <el-button :type="showCheckered ? 'primary' : ''" title="切换背景" @click="toggleBackground">
            <el-icon><Grid /></el-icon>
          </el-button>
        </el-button-group>
      </div>
    </div>

    <!-- 预览内容 -->
    <div class="preview-content" :class="{ 'checkered-bg': showCheckered }" @wheel="handleWheel">
      <!-- SVG 内容 -->
      <div class="svg-container" :style="{ transform: `scale(${scale})` }">
        <!-- 有效的 SVG -->
        <div v-if="isValid && svgCode.trim()" class="svg-content" v-html="sanitizedSvgCode" />

        <!-- 空或无效的 SVG 提示 -->
        <div v-else class="empty-preview">
          <div class="empty-content">
            <el-icon class="empty-icon" :class="{ error: !isValid && svgCode.trim() }">
              <component :is="!isValid && svgCode.trim() ? 'WarnTriangleFilled' : 'PictureFilled'" />
            </el-icon>
            <p class="empty-text">
              {{ getEmptyText() }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ZoomIn, ZoomOut, Grid, PictureFilled, WarnTriangleFilled } from '@element-plus/icons-vue'
import type { SvgValidationResult } from '@/types/svg'

// Props
interface Props {
  svgCode: string
  isValid?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  svgCode: '',
  isValid: true
})

// Emits
interface Emits {
  (e: 'validation-change', result: SvgValidationResult): void
}

const emit = defineEmits<Emits>()

// 响应式数据
const scale = ref(1)
const showCheckered = ref(false)

// 计算属性
const sanitizedSvgCode = computed(() => {
  if (!props.svgCode.trim() || !props.isValid) return ''

  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(props.svgCode, 'image/svg+xml')
    const svgElement = doc.querySelector('svg')

    if (svgElement) {
      // 移除脚本标签
      const scripts = svgElement.querySelectorAll('script')
      scripts.forEach(script => script.remove())
      return new XMLSerializer().serializeToString(svgElement)
    }
  } catch (error) {
    console.error('SVG 处理失败:', error)
  }

  return props.svgCode
})

// 方法
const getEmptyText = (): string => {
  if (!props.svgCode.trim()) {
    return '请在左侧编辑器中输入 SVG 代码'
  }
  if (!props.isValid) {
    return 'SVG 代码无效，请检查语法'
  }
  return '正在加载...'
}

const handleZoomIn = () => {
  if (scale.value < 2) {
    scale.value = Math.min(scale.value * 1.2, 2)
  }
}

const handleZoomOut = () => {
  if (scale.value > 0.5) {
    scale.value = Math.max(scale.value / 1.2, 0.5)
  }
}

const resetZoom = () => {
  scale.value = 1
}

const toggleBackground = () => {
  showCheckered.value = !showCheckered.value
}

const handleWheel = (event: WheelEvent) => {
  if (event.ctrlKey || event.metaKey) {
    event.preventDefault()

    if (event.deltaY < 0) {
      handleZoomIn()
    } else {
      handleZoomOut()
    }
  }
}

// 验证SVG并发送结果
const validateSvg = () => {
  const code = props.svgCode.trim()

  if (!code) {
    emit('validation-change', {
      isValid: true,
      errors: [],
      warnings: []
    })
    return
  }

  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(code, 'image/svg+xml')
    const errors = doc.getElementsByTagName('parsererror')
    const isValid = errors.length === 0 && code.includes('<svg')

    emit('validation-change', {
      isValid,
      errors: isValid ? [] : ['SVG 格式错误'],
      warnings: []
    })
  } catch {
    emit('validation-change', {
      isValid: false,
      errors: ['SVG 验证失败'],
      warnings: []
    })
  }
}

// 监听变化
watch(
  () => props.svgCode,
  () => {
    validateSvg()
  },
  { immediate: true }
)

watch(
  () => props.isValid,
  () => {
    validateSvg()
  }
)
</script>

<style scoped lang="scss">
.svg-preview {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.preview-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
}

.preview-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  background: white;
  position: relative;

  &.checkered-bg {
    background-image: linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
    background-size: 20px 20px;
    background-position:
      0 0,
      0 10px,
      10px -10px,
      -10px 0px;
  }
}

.svg-container {
  transition: transform 0.2s ease;

  .svg-content {
    display: inline-block;

    :deep(svg) {
      display: block;
      max-width: none;
    }
  }
}

.empty-preview {
  text-align: center;
  padding: 40px;

  .empty-content {
    .empty-icon {
      font-size: 48px;
      margin-bottom: 16px;
      color: #d1d5db;

      &.error {
        color: #f56565;
      }
    }

    .empty-text {
      margin: 0;
      color: #6b7280;
      font-size: 16px;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .preview-toolbar {
    padding: 6px 8px;
  }

  .empty-preview {
    padding: 20px;

    .empty-content {
      .empty-icon {
        font-size: 36px;
      }

      .empty-text {
        font-size: 14px;
      }
    }
  }
}
</style>

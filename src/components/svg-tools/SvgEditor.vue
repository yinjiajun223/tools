<template>
  <div class="svg-editor">
    <!-- 简单工具栏 -->
    <div class="editor-toolbar">
      <div class="toolbar-left">
        <el-button-group size="small">
          <el-button title="复制代码" @click="handleCopy">
            <el-icon><CopyDocument /></el-icon>
            复制
          </el-button>

          <el-button title="清空内容" @click="handleClear">
            <el-icon><Delete /></el-icon>
            清空
          </el-button>
          <el-button title="格式化代码" @click="handleFormat">
            <el-icon><MagicStick /></el-icon>
            格式化
          </el-button>
        </el-button-group>
      </div>
      <div class="toolbar-right">
        <span class="status-text">{{ svgCode.length }} 字符</span>
      </div>
    </div>

    <!-- 编辑器区域 -->
    <div class="editor-wrapper">
      <textarea
        v-model="svgCode"
        class="code-textarea"
        placeholder='在这里输入或粘贴 SVG 代码...

示例：
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="80" fill="#4F46E5" />
</svg>'
        spellcheck="false"
        @input="handleInput"
        @paste="handlePaste"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { CopyDocument, Delete, MagicStick } from '@element-plus/icons-vue'

// Props
interface Props {
  code?: string
}

const props = withDefaults(defineProps<Props>(), {
  code: ''
})

// Emits
interface Emits {
  (e: 'update:code', code: string): void
  (e: 'code-change', code: string): void
}

const emit = defineEmits<Emits>()

// 响应式数据
const svgCode = ref(props.code)

// 事件处理
const handleInput = () => {
  emit('update:code', svgCode.value)
  emit('code-change', svgCode.value)
}

const handlePaste = () => {
  // 检测是否粘贴了SVG内容
  setTimeout(() => {
    if (svgCode.value.includes('<svg')) {
      ElMessage.success('已粘贴 SVG 代码')
    }
    handleInput()
  }, 10)
}

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(svgCode.value)
    ElMessage.success('代码已复制到剪贴板')
  } catch {
    ElMessage.error('复制失败，请手动选择复制')
  }
}

const handleClear = () => {
  svgCode.value = ''
  handleInput()
  ElMessage.success('已清空内容')
}

const handleFormat = () => {
  try {
    // 简单的SVG格式化
    const formatted = formatSvg(svgCode.value)
    svgCode.value = formatted
    handleInput()
    ElMessage.success('代码已格式化')
  } catch {
    ElMessage.warning('格式化失败，请检查代码语法')
  }
}

// 简单的SVG格式化函数
const formatSvg = (code: string): string => {
  if (!code.trim()) return code

  // 移除多余空白
  const formatted = code.replace(/>\s+</g, '><')

  // 添加基本缩进
  const lines = formatted.split('>')
  let result = ''
  let indent = 0

  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i].trim()
    if (!line) continue

    if (line.includes('</')) {
      indent = Math.max(0, indent - 1)
    }

    result += '  '.repeat(indent) + line + '>\n'

    if (line.includes('<') && !line.includes('</') && !line.includes('/>')) {
      indent++
    }
  }

  return result.trim()
}

// 监听props变化
watch(
  () => props.code,
  newCode => {
    if (newCode !== svgCode.value) {
      svgCode.value = newCode
    }
  }
)
</script>

<style scoped lang="scss">
.svg-editor {
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  overflow: hidden;
}

.editor-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f8f9fa;
  border-bottom: 1px solid #e4e7ed;

  .status-text {
    font-size: 12px;
    color: #909399;
  }
}

.editor-wrapper {
  flex: 1;
  position: relative;
}

.code-textarea {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  resize: none;
  padding: 16px;
  font-family: 'Courier New', Monaco, monospace;
  font-size: 14px;
  line-height: 1.6;
  color: #2c3e50;
  background: #ffffff;

  &::placeholder {
    color: #c0c4cc;
    font-style: italic;
  }

  &:focus {
    background: #fefefe;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .editor-toolbar {
    padding: 6px 8px;

    .toolbar-left {
      :deep(.el-button-group) .el-button span:not(.el-icon) {
        display: none;
      }
    }

    .status-text {
      font-size: 11px;
    }
  }

  .code-textarea {
    padding: 12px;
    font-size: 13px;
  }
}
</style>

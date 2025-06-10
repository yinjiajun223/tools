<template>
  <!-- 使用 UnoCSS 类替换原有的样式类 -->
  <div class="p-8 flex flex-col items-center min-h-screen bg-gray-50">
    <!-- 标题区域 -->
    <h2 class="text-2xl font-bold text-indigo-600 mb-8 text-center flex items-center gap-2">
      <el-icon class="text-xl"><upload-filled /></el-icon>
      阿里云OSS文件上传
    </h2>

    <!-- 上传区域 -->
    <div class="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
      <!-- 文件上传区域 -->
      <div
        class="border-2 border-dashed border-indigo-200 rounded-xl p-8 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all duration-300 transform hover:scale-[1.01] bg-white"
      >
        <el-upload
          ref="uploadRef"
          class="w-full"
          drag
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleFileChange"
          :on-progress="handleProgress"
          :on-success="handleSuccess"
          :on-error="handleError"
          :before-upload="beforeUpload"
          multiple
        >
          <div class="flex flex-col items-center justify-center">
            <el-icon class="text-5xl text-indigo-400 mb-4 animate-bounce-slow">
              <upload-filled />
            </el-icon>
            <div class="text-center space-y-2">
              <p class="text-lg text-gray-700">
                将文件拖到此处，或
                <span class="text-indigo-500 hover:text-indigo-600 cursor-pointer transition-colors">点击选择文件</span>
              </p>
              <p class="text-sm text-gray-500">支持多文件上传、拖拽上传和粘贴上传(Ctrl+V)</p>
              <p class="text-sm text-gray-500">单个文件大小不超过5MB</p>
            </div>
          </div>
        </el-upload>
      </div>

      <!-- 文件列表 -->
      <div v-if="fileList.length > 0" class="mt-8 animate-fade-in">
        <!-- 总进度和操作按钮 -->
        <div class="flex justify-between items-center mb-4">
          <div class="flex items-center gap-4">
            <span class="text-gray-700 font-medium">文件列表 ({{ fileList.length }})</span>
            <div v-if="isUploading" class="flex items-center gap-2">
              <div class="w-32">
                <el-progress :percentage="totalProgress" :show-text="false" :stroke-width="4" class="!text-indigo-500" />
              </div>
              <span class="text-sm text-indigo-500">{{ totalProgress }}%</span>
            </div>
          </div>
          <div class="flex gap-2">
            <el-button v-if="hasFailedFiles" type="warning" size="default" @click="retryFailedUploads"> 重试失败文件 </el-button>
            <el-button
              type="primary"
              :disabled="!hasReadyFiles"
              size="default"
              class="!bg-indigo-500 hover:!bg-indigo-600 transition-colors"
              @click="submitUpload"
            >
              {{ isUploading ? '上传中...' : '开始上传' }}
            </el-button>
          </div>
        </div>

        <!-- 文件列表 -->
        <div class="space-y-3">
          <div
            v-for="(file, index) in fileList"
            :key="index"
            class="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:translate-x-1 border border-gray-100"
          >
            <div class="flex items-center gap-4">
              <!-- 文件图标和名称 -->
              <div class="flex items-center flex-1 min-w-0">
                <el-icon class="text-2xl text-indigo-400 flex-shrink-0">
                  <document />
                </el-icon>
                <span class="ml-3 text-gray-700 truncate font-medium">{{ file.name }}</span>
                <span class="ml-2 text-sm text-gray-400 flex-shrink-0">
                  {{ formatFileSize(file.size || 0) }}
                </span>
              </div>

              <!-- 状态展示区域 -->
              <div class="flex items-center gap-3">
                <!-- 上传进度 -->
                <template v-if="file.status === 'uploading'">
                  <div class="w-32">
                    <el-progress :percentage="file.percentage" :show-text="false" :stroke-width="4" class="!text-indigo-500" />
                  </div>
                  <span class="text-sm text-indigo-500 min-w-[3em]">{{ file.percentage }}%</span>
                </template>

                <!-- 成功状态 -->
                <template v-else-if="file.status === 'success'">
                  <el-tooltip content="复制链接" placement="top">
                    <el-button type="primary" link class="!text-indigo-500 hover:!text-indigo-600 transition-colors" @click="copyUrl(file.url)">
                      <el-icon class="text-xl"><document-copy /></el-icon>
                    </el-button>
                  </el-tooltip>
                  <el-icon class="text-xl text-green-500 animate-scale-in"><circle-check /></el-icon>
                </template>

                <!-- 失败状态 -->
                <template v-else-if="file.status === 'fail'">
                  <el-tooltip :content="file.error || '上传失败'" placement="top">
                    <el-icon class="text-xl text-red-500 animate-scale-in"><circle-close /></el-icon>
                  </el-tooltip>
                </template>

                <!-- 删除按钮 -->
                <el-button
                  v-if="file.status !== 'uploading'"
                  type="danger"
                  link
                  class="hover:!text-red-600 transition-colors"
                  @click="handleRemove(file)"
                >
                  <el-icon class="text-xl"><delete /></el-icon>
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { UploadFilled, Document, CircleCheck, CircleClose, Delete, DocumentCopy } from '@element-plus/icons-vue'
import type { UploadInstance, UploadProps, UploadFile } from 'element-plus'
import { getOSSPolicy } from '@/api/oss'
import type { OSSPolicy } from '@/api/oss'

// 定义自定义状态类型
type CustomUploadStatus = 'ready' | 'uploading' | 'success' | 'fail'

// 定义文件类型接口
interface CustomUploadFile extends Omit<UploadFile, 'status'> {
  status: CustomUploadStatus
  percentage: number
  error?: string
  url?: string
}

// 文件大小限制（5MB）
const MAX_FILE_SIZE = 5 * 1024 * 1024

// 上传组件引用
const uploadRef = ref<UploadInstance>()
// 文件列表
const fileList = ref<CustomUploadFile[]>([])

// 计算是否有可上传的文件
const hasReadyFiles = computed(() => {
  return fileList.value.some(file => file.status === 'ready')
})

// 添加上传状态和总进度计算
const isUploading = ref(false)
const totalProgress = computed(() => {
  if (fileList.value.length === 0) return 0
  const total = fileList.value.reduce((sum, file) => sum + file.percentage, 0)
  return Math.round(total / fileList.value.length)
})

// 添加失败文件检查
const hasFailedFiles = computed(() => {
  return fileList.value.some(file => file.status === 'fail')
})

// 格式化文件大小
const formatFileSize = (size: number) => {
  if (size < 1024) {
    return size + 'B'
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + 'KB'
  } else {
    return (size / (1024 * 1024)).toFixed(2) + 'MB'
  }
}

// 复制 URL
const copyUrl = async (url?: string) => {
  console.log('url', url)
  if (!url) return
  try {
    await navigator.clipboard.writeText(url)
    ElMessage({
      message: '链接已复制到剪贴板',
      type: 'success',
      duration: 1500
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    ElMessage.error('复制失败')
  }
}

// 删除文件
const handleRemove = (file: CustomUploadFile) => {
  const index = fileList.value.findIndex(item => item.uid === file.uid)
  if (index !== -1) {
    fileList.value.splice(index, 1)
  }
}

// 文件改变时的处理
const handleFileChange = (uploadFile: UploadFile) => {
  // 如果文件大小超过限制，不添加到列表
  if (uploadFile.size && uploadFile.size > MAX_FILE_SIZE) {
    return ElMessage.error(`文件 ${uploadFile.name} 超过5MB限制`)
  }

  // 检查是否已存在相同文件
  const existingFile = fileList.value.find(file => file.name === uploadFile.name)
  if (existingFile) {
    ElMessage.warning(`文件 ${uploadFile.name} 已存在`)
    return
  }

  fileList.value.push({
    ...uploadFile,
    status: 'ready',
    percentage: 0
  } as CustomUploadFile)
}

// 处理上传进度
const handleProgress: UploadProps['onProgress'] = (event, uploadFile) => {
  const file = fileList.value.find(item => item.uid === uploadFile.uid)
  if (file) {
    file.status = 'uploading'
    file.percentage = Math.round(event.percent)
  }
}

// 处理上传成功
const handleSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  const file = fileList.value.find(item => item.uid === uploadFile.uid)
  if (file) {
    file.status = 'success'
    file.percentage = 100
    // 设置文件的访问URL
    file.url = response.url
  }
}

// 处理上传失败
const handleError: UploadProps['onError'] = (error, uploadFile) => {
  const file = fileList.value.find(item => item.uid === uploadFile.uid)
  if (file) {
    file.status = 'fail'
    file.error = error?.message || '上传失败'
  }
}

// 文件上传前的验证
const beforeUpload = (file: File) => {
  if (file.size > MAX_FILE_SIZE) {
    ElMessage.error(`文件 ${file.name} 超过5MB限制`)
    return false
  }
  return true
}

// 缓存的 OSS 策略信息
interface CachedOSSPolicy {
  policy: OSSPolicy
  expireTime: number
}

// 添加 OSS 策略缓存
const ossPolicyCache = ref<CachedOSSPolicy | null>(null)

// 获取 OSS 策略（带缓存）
const getOSSPolicyWithCache = async () => {
  // 检查缓存是否存在且未过期（预留30秒的缓冲时间）
  if (ossPolicyCache.value && ossPolicyCache.value.expireTime - 30000 > Date.now()) {
    return ossPolicyCache.value.policy
  }

  // 获取新的策略
  const policy = await getOSSPolicy()

  // 缓存策略和过期时间
  ossPolicyCache.value = {
    policy,
    // expire 是相对于策略创建时间的秒数，转换为绝对时间戳
    expireTime: Date.now() + policy.expire * 1000
  }

  return policy
}

// 创建上传任务
const createUploadTask = (file: CustomUploadFile, ossPolicy: OSSPolicy) => {
  return new Promise((resolve, reject) => {
    if (!file.raw) {
      reject(new Error('文件对象无效'))
      return
    }

    // 生成唯一的文件名
    const fileName = `${Date.now()}-${file.raw.name}`

    // 构建 FormData
    const formData = new FormData()
    formData.append('OSSAccessKeyId', ossPolicy.accessId)
    formData.append('policy', ossPolicy.policy)
    formData.append('signature', ossPolicy.signature)
    formData.append('key', `${ossPolicy.dir}/${fileName}`)
    formData.append('success_action_status', '200')
    formData.append('file', file.raw)

    // 创建 XMLHttpRequest
    const xhr = new XMLHttpRequest()

    // 监听上传进度
    xhr.upload.onprogress = e => {
      if (e.lengthComputable) {
        file.percentage = Math.round((e.loaded * 100) / e.total)
      }
    }

    // 处理上传完成
    xhr.onload = () => {
      if (xhr.status === 200) {
        const fileUrl = `https://oss.yinjiajun.cn/${ossPolicy.dir}/${fileName}`
        file.url = fileUrl
        resolve(fileUrl)
      } else {
        reject(new Error('上传失败'))
      }
    }

    // 处理上传错误
    xhr.onerror = () => reject(new Error('网络错误'))

    // 开始上传
    xhr.open('POST', ossPolicy.host, true)
    xhr.send(formData)
  })
}

// 开始上传
const submitUpload = async () => {
  try {
    isUploading.value = true
    // 获取待上传的文件
    const readyFiles = fileList.value.filter(file => file.status === 'ready')
    if (readyFiles.length === 0) return

    // 获取 OSS 策略（使用缓存）
    const ossPolicy = await getOSSPolicyWithCache()

    // 并发上传所有文件
    const uploadTasks = readyFiles.map(async file => {
      try {
        file.status = 'uploading'
        file.percentage = 0

        const fileUrl = await createUploadTask(file, ossPolicy)
        console.log('fileUrl', fileUrl, file)

        file.status = 'success'
        file.percentage = 100
        file.url = fileUrl as string
        ElMessage.success(`文件 ${file.name} 上传成功`)
      } catch (error) {
        file.status = 'fail'
        file.error = error instanceof Error ? error.message : '上传失败'
        ElMessage.error(`文件 ${file.name} 上传失败：${file.error}`)
      }
    })

    // 等待所有上传任务完成
    await Promise.allSettled(uploadTasks)
  } catch (error) {
    ElMessage.error('获取上传凭证失败')
    console.error('获取上传凭证失败：', error)
  } finally {
    isUploading.value = false
  }
}

// 重试失败的文件
const retryFailedUploads = async () => {
  const failedFiles = fileList.value.filter(file => file.status === 'fail')
  if (failedFiles.length === 0) return

  for (const file of failedFiles) {
    file.status = 'ready'
    file.percentage = 0
    file.error = undefined
  }

  await submitUpload()
}

// 监听粘贴事件
const handlePaste = (event: ClipboardEvent) => {
  const items = event.clipboardData?.items
  if (items) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.kind === 'file') {
        const file = item.getAsFile()
        if (file && file.size <= MAX_FILE_SIZE) {
          // 创建一个符合 UploadRawFile 接口的对象
          const rawFile = new File([file], file.name, { type: file.type })
          Object.defineProperty(rawFile, 'uid', {
            value: Date.now(),
            writable: false
          })
          uploadRef.value?.handleStart(rawFile as any)
        } else if (file) {
          ElMessage.error(`粘贴的文件超过5MB限制`)
        }
      }
    }
  }
}

// 挂载时添加粘贴事件监听
onMounted(() => {
  document.addEventListener('paste', handlePaste)
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  document.removeEventListener('paste', handlePaste)
})
</script>

<style>
/* 自定义动画 */
@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

@keyframes scale-in {
  from {
    transform: scale(0.8);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 2s infinite;
}

.animate-scale-in {
  animation: scale-in 0.2s ease-out;
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

/* 添加加载动画 */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* 覆盖 Element Plus 的主题色 */
:deep(.el-progress-bar__inner) {
  background-color: #6366f1 !important;
}

:deep(.el-button--primary) {
  --el-button-bg-color: #6366f1 !important;
  --el-button-border-color: #6366f1 !important;
  --el-button-hover-bg-color: #4f46e5 !important;
  --el-button-hover-border-color: #4f46e5 !important;
}

:deep(.el-button--warning) {
  --el-button-bg-color: #f59e0b !important;
  --el-button-border-color: #f59e0b !important;
  --el-button-hover-bg-color: #d97706 !important;
  --el-button-hover-border-color: #d97706 !important;
}
</style>

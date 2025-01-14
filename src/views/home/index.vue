<template>
  <div class="home-container page-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>在线工具平台</h1>
      <p>简单、高效的在线工具集合，助您提升工作效率</p>
    </div>

    <!-- 工具卡片网格 -->
    <el-row :gutter="24">
      <el-col
        v-for="(tool, index) in tools"
        :key="tool.path"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        :style="{ animationDelay: `${index * 0.1}s` }"
        class="tool-col"
      >
        <router-link :to="tool.path" class="tool-card-link">
          <el-card class="tool-card" :body-style="{ padding: '0px' }">
            <div class="tool-icon">
              <div class="icon-background">
                <el-icon :size="32">
                  <component :is="tool.icon" />
                </el-icon>
              </div>
            </div>
            <div class="tool-content">
              <h3>{{ tool.name }}</h3>
              <p>{{ tool.description }}</p>
            </div>
            <div class="tool-footer">
              <span class="use-now">立即使用</span>
              <el-icon><ArrowRight /></el-icon>
            </div>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Document, Picture, ArrowRight } from '@element-plus/icons-vue'

const tools = [
  {
    name: 'Excel 解析工具',
    description: '轻松处理 Excel 文件，支持导入导出和数据预览',
    path: '/excel-tools',
    icon: Document
  },
  {
    name: '图片压缩工具',
    description: '快速压缩图片文件，支持批量处理和自定义压缩参数',
    path: '/image-tools',
    icon: Picture
  }
]
</script>

<style scoped lang="scss">
.home-container {
  padding-top: 60px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 60px;
  animation: slideDown 0.6s ease-out;

  h1 {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 16px;
    background: $gradient-primary;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.1rem;
    color: $text-regular;
    max-width: 600px;
    margin: 0 auto;

    @media (max-width: 768px) {
      font-size: 1rem;
      padding: 0 20px;
    }
  }
}

.tool-col {
  animation: slideUp 0.6s ease-out both;
}

.tool-card-link {
  display: block;
  text-decoration: none;
  margin-bottom: 24px;
}

.tool-card {
  height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $gradient-card;
    opacity: 0;
    transition: opacity $transition-normal;
  }

  &:hover {
    &::before {
      opacity: 1;
    }

    .tool-footer {
      transform: translateY(0);
      opacity: 1;
    }
  }
}

.tool-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 32px 0 24px;

  .icon-background {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: $gradient-primary;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transform: rotate(-5deg);
    transition: transform $transition-normal;

    &:hover {
      transform: rotate(0deg) scale(1.05);
    }
  }
}

.tool-content {
  padding: 0 24px;
  text-align: center;
  z-index: 1;

  h3 {
    margin-bottom: 8px;
    color: $text-primary;
    font-size: 18px;
    font-weight: 600;
  }

  p {
    color: $text-regular;
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
  }
}

.tool-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transform: translateY(100%);
  opacity: 0;
  transition: all $transition-normal;

  .use-now {
    color: $primary-color;
    font-weight: 500;
  }

  .el-icon {
    color: $primary-color;
    transition: transform $transition-fast;
  }

  &:hover .el-icon {
    transform: translateX(4px);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .home-container {
    padding-top: 40px;
  }

  .tool-card {
    height: 200px;
  }

  .tool-icon {
    margin: 24px 0 16px;

    .icon-background {
      width: 56px;
      height: 56px;
    }
  }
}
</style>

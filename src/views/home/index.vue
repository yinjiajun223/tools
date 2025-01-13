<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <div class="hero-section">
      <h1 class="title">在线工具平台</h1>
      <p class="subtitle">简单、高效的在线工具集合，助您提升工作效率</p>
    </div>

    <!-- 工具卡片区域 -->
    <div class="tools-grid">
      <el-card
        v-for="tool in tools"
        :key="tool.name"
        class="tool-card"
        :class="{ 'coming-soon': tool.comingSoon }"
        shadow="hover"
        :body-style="{ padding: '0px' }"
      >
        <router-link v-if="!tool.comingSoon" :to="tool.path" class="tool-content">
          <div class="tool-header">
            <div class="tool-icon">
              <el-icon :size="28">
                <component :is="tool.icon" />
              </el-icon>
            </div>
            <h3>{{ tool.title }}</h3>
          </div>
          <div class="tool-body">
            <p>{{ tool.description }}</p>
            <div class="tool-features">
              <span v-for="feature in tool.features" :key="feature">
                <el-icon><Check /></el-icon>
                {{ feature }}
              </span>
            </div>
          </div>
        </router-link>
        <div v-else class="tool-content disabled">
          <div class="tool-header">
            <div class="tool-icon">
              <el-icon :size="28">
                <component :is="tool.icon" />
              </el-icon>
            </div>
            <h3>{{ tool.title }}</h3>
          </div>
          <div class="tool-body">
            <p>{{ tool.description }}</p>
            <div class="coming-soon-badge">即将推出</div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check } from '@element-plus/icons-vue'

interface Tool {
  name: string
  path: string
  title: string
  description: string
  icon: string
  features?: string[]
  comingSoon?: boolean
}

const tools: Tool[] = [
  {
    name: 'imageTools',
    path: '/image-tools',
    title: '图片压缩工具',
    description: '快速压缩图片文件大小，支持PNG、JPG格式',
    icon: 'Picture',
    features: ['支持拖放', '在线预览'],
  },
  {
    name: 'excelTools',
    path: '/excel-tools',
    title: 'Excel解析工具',
    description: '解析Excel文件，支持数据处理和导出',
    icon: 'Document',
    features: ['支持拖放', '在线编辑'],
  },
  {
    name: 'pdfTools',
    path: '/pdf-tools',
    title: 'PDF工具',
    description: 'PDF转换、合并、分割等多功能工具',
    icon: 'Files',
    comingSoon: true,
  },
  {
    name: 'codeFormatter',
    path: '/code-formatter',
    title: '代码格式化',
    description: '支持多种编程语言的代码美化工具',
    icon: 'Edit',
    comingSoon: true,
  },
]
</script>

<style scoped lang="scss">
.home-container {
  padding: 40px 20px;
  max-width: 1280px;
  margin: 0 auto;
}

.hero-section {
  text-align: center;
  margin-bottom: 60px;

  .title {
    font-size: 2.5rem;
    font-weight: 600;
    background: linear-gradient(120deg, var(--primary-color), var(--accent-color));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-bottom: 16px;
  }

  .subtitle {
    font-size: 1.2rem;
    color: var(--text-color);
    opacity: 0.8;
  }
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.tool-card {
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: none;

  &:hover:not(.coming-soon) {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px var(--shadow-color);
  }

  &.coming-soon {
    opacity: 0.7;

    .tool-content {
      cursor: not-allowed;
    }
  }
}

.tool-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: inherit;

  &.disabled {
    pointer-events: none;
  }
}

.tool-header {
  padding: 24px;
  background: linear-gradient(to right, var(--primary-color), var(--accent-color));
  color: white;
  display: flex;
  align-items: center;
  gap: 16px;

  .tool-icon {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 500;
  }
}

.tool-body {
  padding: 24px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: var(--card-background);

  p {
    margin: 0 0 20px;
    color: var(--text-color);
    opacity: 0.8;
    line-height: 1.5;
  }
}

.tool-features {
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: var(--background-color);
    border-radius: 20px;
    font-size: 0.875rem;
    color: var(--primary-color);

    .el-icon {
      font-size: 14px;
    }
  }
}

.coming-soon-badge {
  align-self: center;
  margin-top: auto;
  padding: 8px 16px;
  background: linear-gradient(120deg, var(--primary-color), var(--accent-color));
  color: white;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

// 响应式设计
@media (max-width: 768px) {
  .hero-section {
    margin-bottom: 40px;

    .title {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1rem;
    }
  }

  .tools-grid {
    grid-template-columns: 1fr;
  }

  .tool-header {
    padding: 20px;
  }

  .tool-body {
    padding: 20px;
  }
}
</style>

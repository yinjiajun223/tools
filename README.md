# 在线工具平台

一个基于 Vue 3 + TypeScript + Element Plus 的现代化在线工具平台，提供多种实用的Web工具。

## 🚀 功能特性

### 主要工具

1. **阿里云OSS文件上传工具**
   - 支持拖拽上传、批量上传
   - 支持粘贴上传 (Ctrl+V)
   - 实时上传进度显示
   - 自动生成文件访问链接
   - 一键复制文件URL

2. **SVG图片生成工具**
   - 实时代码编辑与预览
   - 丰富的SVG模板库
   - 支持SVG文件导出
   - 代码语法验证
   - 便捷的模板选择

### 核心特性

- 🎨 **现代化UI设计** - 使用 Element Plus + Tailwind CSS 打造精美界面
- 📱 **响应式布局** - 完美适配各种设备和屏幕尺寸
- ⚡ **高性能** - 基于 Vue 3 Composition API 和 Vite 构建
- 🔧 **TypeScript支持** - 完整的类型定义，开发体验更佳
- 🛠 **工具化开发** - 模块化设计，易于扩展新功能

## 📦 技术栈

### 前端框架
- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全的 JavaScript 超集
- **Vite** - 下一代前端构建工具

### UI 组件库
- **Element Plus** - 基于 Vue 3 的桌面端组件库
- **Tailwind CSS** - 实用工具优先的 CSS 框架
- **@element-plus/icons-vue** - Element Plus 图标库

### 工具链
- **Vue Router** - Vue.js 官方路由管理器
- **ESLint** - 代码质量检查工具
- **Prettier** - 代码格式化工具
- **Husky** - Git hooks 工具
- **Commitlint** - 提交信息规范检查

## 🛠 开发指南

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 快速开始
```bash
# 克隆项目
git clone <repository-url>

# 进入项目目录
cd tools

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 开发命令
```bash
# 开发模式
npm run dev

# 构建项目
npm run build

# 类型检查
npm run type-check

# 代码检查
npm run lint

# 代码格式化
npm run format

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
src/
├── api/                 # API 接口定义
├── assets/             # 静态资源
├── components/         # 公共组件
│   └── svg-tools/      # SVG工具相关组件
├── composables/        # 组合式函数
├── data/               # 静态数据
│   └── svg-templates.ts # SVG模板数据
├── layouts/            # 布局组件
├── router/             # 路由配置
├── types/              # TypeScript 类型定义
├── utils/              # 工具函数
├── views/              # 页面组件
│   ├── home/           # 首页
│   ├── oss-upload/     # OSS上传工具
│   ├── svg-tools/      # SVG工具
│   └── error/          # 错误页面
├── App.vue             # 根组件
└── main.ts             # 应用入口
```

## 🔧 配置文件说明

### 核心配置
- `vite.config.ts` - Vite 构建配置
- `tsconfig.json` - TypeScript 配置
- `package.json` - 项目依赖和脚本

### 代码质量
- `.eslintrc.cjs` - ESLint 规则配置
- `.prettierrc.cjs` - Prettier 格式化规则
- `commitlint.config.cjs` - 提交信息规范

### 开发环境
- `.vscode/settings.json` - VSCode 编辑器配置
- `.husky/` - Git hooks 配置

## 🌐 部署

项目支持多种部署方式：

### Vercel 部署
项目已配置 `vercel.json`，可直接部署到 Vercel 平台。

### 手动部署
```bash
# 构建项目
npm run build

# 将 dist 目录上传到服务器
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 提交规范
遵循 [Conventional Commits](https://conventionalcommits.org/) 规范：
- `feat:` 新功能
- `fix:` 修复问题
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建过程或辅助工具的变动

## 📝 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

感谢以下开源项目的支持：
- [Vue.js](https://vuejs.org/)
- [Element Plus](https://element-plus.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

---

如有问题或建议，欢迎提交 Issue 或 Pull Request！

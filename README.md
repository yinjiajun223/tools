# 在线工具平台

一个简单、高效的在线工具集合平台，帮助用户提升工作效率。

## 功能特性

- 图片压缩工具

  - 支持 PNG、JPG 格式
  - 在线预览
  - 拖拽上传

- Excel 解析工具
  - 支持 xlsx、xls 格式
  - 在线编辑
  - 导出功能

## 项目结构

```
tools-platform/
├── src/
│   ├── assets/           # 静态资源
│   │   ├── styles/       # 样式文件
│   │   └── images/       # 图片资源
│   ├── components/       # 组件
│   │   ├── image-tools/  # 图片工具组件
│   │   └── excel-tools/  # Excel工具组件
│   ├── layouts/          # 布局组件
│   ├── router/           # 路由配置
│   ├── stores/           # 状态管理
│   ├── types/           # TypeScript 类型定义
│   └── views/           # 页面视图
├── public/              # 公共资源
└── index.html           # 入口 HTML
```

## 技术栈

- Vue 3
- TypeScript
- Element Plus
- Vite
- SCSS

## 开发指南

1. 安装依赖

```bash
npm install
```

2. 启动开发服务器

```bash
npm run dev
```

3. 构建生产版本

```bash
npm run build
```

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 代码规范

- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 使用 TypeScript 进行类型检查

## 贡献指南

1. Fork 本仓库
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

[MIT](LICENSE)

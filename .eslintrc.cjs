module.exports = {
  // 表示当前目录即为根目录，ESLint 将停止在父级目录中寻找配置文件
  root: true,
  // 环境定义了预定义的全局变量
  env: {
    // 浏览器环境
    browser: true,
    // ES2021 特性
    es2021: true,
    // Node.js 环境
    node: true
  },
  // 继承第三方配置
  extends: [
    // Vue3 核心 ESLint 规则
    'plugin:vue/vue3-recommended',
    // ESLint 推荐规则
    'eslint:recommended',
    // TypeScript 推荐规则
    '@vue/typescript/recommended',
    // Prettier规则
    'prettier'
  ],
  // 解析器配置
  parserOptions: {
    // 指定要使用的 ECMAScript 版本
    ecmaVersion: 2021
  },
  // 忽略特定文件和目录
  ignorePatterns: [
    'dist/**',
    'node_modules/**',
    '*.min.js',
    '*.d.ts'
  ],
  // 自定义规则
  rules: {
    // 允许使用 any 类型
    '@typescript-eslint/no-explicit-any': 'off',
    // 允许使用非空断言
    '@typescript-eslint/no-non-null-assertion': 'off',
    // 允许单个单词的组件名
    'vue/multi-word-component-names': 'off',
    // 允许未使用的变量（仅在开发环境）
    '@typescript-eslint/no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    // 允许空对象类型
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-empty-object-type': 'off'
  }
} 
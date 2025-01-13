module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复
        'docs', // 文档
        'style', // 样式
        'refactor', // 重构
        'perf', // 性能优化
        'test', // 测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回退
        'build', // 打包
        'ci', // CI/CD
      ],
    ],
    'type-case': [2, 'always', 'lower'], // 类型必须小写
    'type-empty': [2, 'never'], // 类型不能为空
    'scope-empty': [0], // 范围可以为空
    'scope-case': [0], // 范围不强制大小写
    'subject-empty': [2, 'never'], // 主题不能为空
    'subject-case': [0], // 主题不强制大小写
    'subject-full-stop': [0], // 主题不强制以句号结束
    'subject-leading-blank': [2, 'always'], // 主题必须以空格开始
  }
  
}
module.exports = {
  // 继承默认配置
  extends: ['@commitlint/config-conventional'],
  // 自定义规则
  rules: {
    // type-enum 定义了提交消息中允许使用的动词
    'type-enum': [
      2, // 级别为错误
      'always', // 始终检查
      [
        'feat', // 新功能（feature）
        'fix', // 修复bug
        'docs', // 文档修改
        'style', // 代码格式修改，不影响代码运行的变动
        'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
        'perf', // 性能优化
        'test', // 增加测试或修改测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回滚到上一个版本
        'build' // 影响项目构建或依赖项修改
      ]
    ],
    // subject-full-stop：提交消息标题不需要以.结尾
    'subject-full-stop': [0, 'never'],
    // subject-case：提交消息标题的大小写不做校验
    'subject-case': [0, 'never']
  }
} 
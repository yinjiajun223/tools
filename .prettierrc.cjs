module.exports = {
  // 不使用分号结尾
  semi: false,
  // 使用单引号代替双引号
  singleQuote: true,
  // 每行代码最大长度
  printWidth: 150,
  // 对象或数组的最后一个元素后面不加逗号
  trailingComma: 'none',
  // 箭头函数只有一个参数时不加括号
  arrowParens: 'avoid',
  // 换行符使用 auto
  endOfLine: 'auto',
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 使用空格而不是制表符
  useTabs: false,
  // JSX 使用单引号
  jsxSingleQuote: true,
  // 对象字面量的大括号间添加空格
  bracketSpacing: true,
  // 将 > 多行 JSX 元素放在最后一行的末尾，而不是单独放在下一行
  bracketSameLine: false,
  // HTML 空白敏感度
  htmlWhitespaceSensitivity: 'css',
  // Vue 文件中的 script 和 style 标签缩进
  vueIndentScriptAndStyle: false,
  // 嵌入式语言格式化
  embeddedLanguageFormatting: 'auto',
  // 在唯一的箭头函数参数周围包含括号
  // avoid: 省略括号，always: 总是包含括号
  arrowParens: 'avoid',
  // 控制在 Vue 单文件组件中 <script> 和 <style> 标签内的代码缩进方式
  // false: 不缩进，true: 缩进
  vueIndentScriptAndStyle: false
}

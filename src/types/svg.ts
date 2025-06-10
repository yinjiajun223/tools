// SVG 工具相关的类型定义

// SVG 模板接口
export interface SvgTemplate {
  /** 模板名称 */
  name: string
  /** 模板描述 */
  description: string
  /** SVG 代码内容 */
  code: string
  /** 模板分类 */
  category: string
  /** 模板标签 */
  tags: string[]
}

// SVG 编辑器配置接口
export interface SvgEditorConfig {
  /** 是否启用语法高亮 */
  enableSyntaxHighlight: boolean
  /** 是否启用自动补全 */
  enableAutoComplete: boolean
  /** 编辑器主题 */
  theme: 'light' | 'dark'
  /** 字体大小 */
  fontSize: number
  /** 行高 */
  lineHeight: number
  /** 是否显示行号 */
  showLineNumbers: boolean
  /** 是否自动换行 */
  wordWrap: boolean
}

// SVG 预览配置接口
export interface SvgPreviewConfig {
  /** 预览背景色 */
  backgroundColor: string
  /** 是否显示网格 */
  showGrid: boolean
  /** 网格大小 */
  gridSize: number
  /** 缩放比例 */
  scale: number
  /** 是否居中显示 */
  centered: boolean
}

// SVG 验证结果接口
export interface SvgValidationResult {
  /** 是否有效 */
  isValid: boolean
  /** 错误信息 */
  errors: string[]
  /** 警告信息 */
  warnings: string[]
  /** SVG 尺寸信息 */
  dimensions?: {
    width: number
    height: number
  }
}

// SVG 导出选项接口
export interface SvgExportOptions {
  /** 文件名 */
  filename: string
  /** 是否美化代码 */
  prettify: boolean
  /** 是否压缩代码 */
  minify: boolean
  /** 是否添加注释 */
  includeComments: boolean
}

// 工具栏按钮配置接口
export interface ToolbarButton {
  /** 按钮标识 */
  id: string
  /** 按钮标签 */
  label: string
  /** 按钮图标 */
  icon: string
  /** 按钮提示 */
  tooltip: string
  /** 是否禁用 */
  disabled: boolean
  /** 点击处理函数 */
  onClick: () => void
}

// SVG 元素基本属性接口
export interface SvgElementAttributes {
  /** 元素ID */
  id?: string
  /** CSS类名 */
  class?: string
  /** 行内样式 */
  style?: string
  /** 填充色 */
  fill?: string
  /** 描边色 */
  stroke?: string
  /** 描边宽度 */
  strokeWidth?: number
  /** 透明度 */
  opacity?: number
  /** 变换 */
  transform?: string
}

// 常用颜色预设
export const SVG_COLOR_PRESETS = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FECA57',
  '#FF9FF3',
  '#54A0FF',
  '#5F27CD',
  '#00D2D3',
  '#FF9F43',
  '#D1A3FF',
  '#FF6B9D'
] as const

// SVG 基本图形类型
export type SvgBasicShape = 'rect' | 'circle' | 'ellipse' | 'line' | 'polyline' | 'polygon' | 'path' | 'text'

// 编辑器事件类型
export interface SvgEditorEvents {
  /** 代码变更事件 */
  'code-change': (code: string) => void
  /** 代码格式化事件 */
  format: () => void
  /** 代码清空事件 */
  clear: () => void
  /** 撤销事件 */
  undo: () => void
  /** 重做事件 */
  redo: () => void
}

// 预览事件类型
export interface SvgPreviewEvents {
  /** 验证结果变更事件 */
  'validation-change': (result: SvgValidationResult) => void
  /** 尺寸变更事件 */
  'size-change': (width: number, height: number) => void
  /** 缩放事件 */
  zoom: (scale: number) => void
}

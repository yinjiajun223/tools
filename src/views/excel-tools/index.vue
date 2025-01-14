<template>
  <div class="excel-tools">
    <div class="operation-bar">
      <!-- 文件上传区域 -->
      <div class="upload-area">
        <el-upload class="excel-upload" accept=".xlsx, .xls" :auto-upload="false" :show-file-list="false" :on-change="handleFileChange" drag>
          <div class="upload-content">
            <el-icon class="upload-icon"><Upload /></el-icon>
            <div class="upload-text">
              <span class="main">拖拽文件到此处或点击上传</span>
              <span class="sub">支持 .xlsx, .xls 格式</span>
            </div>
          </div>
        </el-upload>
      </div>

      <!-- 操作按钮组 -->
      <div class="button-group">
        <el-tooltip content="导出Excel文件" placement="top">
          <el-button type="primary" :icon="Download" :disabled="!tableData.length" @click="exportToExcel"> 导出 </el-button>
        </el-tooltip>

        <el-tooltip content="清空当前数据" placement="top">
          <el-button :icon="Delete" :disabled="!tableData.length" @click="clearTable"> 清空 </el-button>
        </el-tooltip>
      </div>
    </div>

    <!-- 表格展示区域 -->
    <div v-if="tableData.length" class="table-container">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        height="calc(100vh - 160px)"
        :span-method="objectSpanMethod"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        highlight-current-row
        table-layout="auto"
      >
        <el-table-column v-for="(col, index) in tableHeaders" :key="index" :prop="col.prop" :label="col.label" :min-width="120" show-overflow-tooltip>
          <template #default="scope">
            <div :class="['cell-content', { 'merged-cell': isMergedCell(scope.$index, col.prop) }]">
              <el-input
                v-model="scope.row[col.prop]"
                size="small"
                :disabled="isMergedCell(scope.$index, col.prop) && !isMergeCellStart(scope.$index, col.prop)"
                @change="handleCellEdit(scope.$index, col.prop, $event)"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 空状态提示 -->
    <div v-else class="empty-state">
      <el-empty description="暂无数据">
        <template #image>
          <el-icon class="empty-icon"><Document /></el-icon>
        </template>
        <el-upload class="excel-upload" accept=".xlsx, .xls" :auto-upload="false" :show-file-list="false" :on-change="handleFileChange" drag>
          <el-button type="primary">上传Excel</el-button>
        </el-upload>
      </el-empty>
    </div>

    <!-- 全局加载 -->
    <el-overlay v-if="loading" class="loading-overlay">
      <div class="loading-content">
        <el-icon class="loading-icon"><Loading /></el-icon>
        <span>正在处理Excel文件...</span>
      </div>
    </el-overlay>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as XLSX from 'xlsx'
import type { UploadFile } from 'element-plus'
import { Upload, Download, Delete, Loading, Document } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

interface TableHeader {
  prop: string
  label: string
}

interface TableData {
  [key: string]: string | number
}

interface MergeCell {
  s: { r: number; c: number }
  e: { r: number; c: number }
}

// 表格数据
const tableData = ref<TableData[]>([])
// 表格头部
const tableHeaders = ref<TableHeader[]>([])
// 合并单元格信息
const merges = ref<MergeCell[]>([])
// 加载状态
const loading = ref(false)

// 处理文件改变事件
const handleFileChange = async (file: UploadFile) => {
  if (!file.raw) return

  try {
    loading.value = true
    const data = await readFile(file.raw)
    const workbook = XLSX.read(data, { type: 'array' })
    const firstSheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[firstSheetName]

    // 获取合并单元格信息
    merges.value = worksheet['!merges'] || []

    // 获取表头范围
    const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1')
    const headers: TableHeader[] = []

    // 处理表头
    for (let C = range.s.c; C <= range.e.c; C++) {
      const cell = worksheet[XLSX.utils.encode_cell({ r: 0, c: C })]
      const header = {
        prop: XLSX.utils.encode_col(C),
        label: cell?.v?.toString() || XLSX.utils.encode_col(C)
      }
      headers.push(header)
    }
    tableHeaders.value = headers

    // 将Excel数据转换为JSON，保留空单元格
    const jsonData = XLSX.utils.sheet_to_json<TableData>(worksheet, {
      defval: '', // 设置空单元格的默认值
      raw: false, // 保持所有值为字符串
      header: headers.map(h => h.prop)
    })

    if (jsonData.length > 1) {
      // 移除表头行
      tableData.value = jsonData.slice(1)
      ElMessage.success('Excel文件导入成功')
    } else {
      ElMessage.warning('Excel文件为空')
    }
  } catch (error) {
    console.error('Excel处理错误:', error)
    ElMessage.error('Excel文件处理失败')
  } finally {
    loading.value = false
  }
}

// 读取文件内容
const readFile = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => resolve(e.target?.result as ArrayBuffer)
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

// 处理单元格编辑
const handleCellEdit = (rowIndex: number, column: string, value: any) => {
  tableData.value[rowIndex][column] = value
}

// 导出Excel
const exportToExcel = () => {
  try {
    // 创建工作簿
    const wb = XLSX.utils.book_new()

    // 准备导出数据（包含表头）
    const exportData = [
      tableHeaders.value.reduce((acc, header) => {
        acc[header.prop] = header.label
        return acc
      }, {} as TableData),
      ...tableData.value
    ]

    // 将数据转换为工作表
    const ws = XLSX.utils.json_to_sheet(exportData, {
      header: tableHeaders.value.map(h => h.prop)
    })

    // 添加合并单元格信息
    if (merges.value.length) {
      ws['!merges'] = merges.value
    }

    // 将工作表添加到工作簿
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

    // 导出Excel文件
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    XLSX.writeFile(wb, `excel_export_${timestamp}.xlsx`)
    ElMessage.success('文件导出成功')
  } catch (error) {
    console.error('导出错误:', error)
    ElMessage.error('文件导出失败')
  }
}

// 清空表格数据
const clearTable = () => {
  tableData.value = []
  tableHeaders.value = []
  merges.value = []
  ElMessage.success('数据已清空')
}

// 处理合并单元格
const objectSpanMethod = ({ row, column, rowIndex, columnIndex }: any) => {
  const colName = tableHeaders.value[columnIndex]?.prop
  if (!colName) return { rowspan: 1, colspan: 1 }

  const merge = merges.value.find(m => {
    return m.s.r === rowIndex + 1 && m.s.c === columnIndex
  })

  if (merge) {
    return {
      rowspan: merge.e.r - merge.s.r + 1,
      colspan: merge.e.c - merge.s.c + 1
    }
  }
  return { rowspan: 1, colspan: 1 }
}

// 判断是否为合并单元格
const isMergedCell = (rowIndex: number, column: string) => {
  const columnIndex = tableHeaders.value.findIndex(h => h.prop === column)
  if (columnIndex === -1) return false

  return merges.value.some(m => {
    return rowIndex + 1 >= m.s.r && rowIndex + 1 <= m.e.r && columnIndex >= m.s.c && columnIndex <= m.e.c
  })
}

// 判断是否为合并单元格的起始位置
const isMergeCellStart = (rowIndex: number, column: string) => {
  const columnIndex = tableHeaders.value.findIndex(h => h.prop === column)
  if (columnIndex === -1) return false

  return merges.value.some(m => {
    return m.s.r === rowIndex + 1 && m.s.c === columnIndex
  })
}

// 表头单元格样式
const headerCellStyle = {
  backgroundColor: 'var(--el-color-info-light-9)',
  color: 'var(--el-text-color-primary)',
  fontWeight: 'bold',
  borderBottom: '2px solid var(--el-border-color-light)',
  padding: '12px 8px'
}

// 单元格样式
const cellStyle = ({ row, column, rowIndex, columnIndex }: any) => {
  const style = {
    padding: '4px',
    backgroundColor: 'var(--el-bg-color)'
  }

  if (isMergedCell(rowIndex, column.property)) {
    return {
      ...style,
      backgroundColor: 'var(--el-fill-color-light)'
    }
  }

  return style
}
</script>

<style lang="scss" scoped>
.excel-tools {
  padding: 24px;
  height: 100%;
  background-color: var(--el-fill-color-blank);

  .operation-bar {
    margin-bottom: 24px;
    padding: 24px;
    background-color: var(--el-bg-color);
    border-radius: 12px;
    box-shadow: var(--el-box-shadow-light);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;

    .upload-area {
      flex: 1;

      :deep(.el-upload-dragger) {
        width: 100%;
        height: auto;
        padding: 20px;
        border-color: var(--el-border-color-light);

        &:hover {
          border-color: var(--el-color-primary);
        }
      }

      .upload-content {
        display: flex;
        align-items: center;
        gap: 16px;

        .upload-icon {
          font-size: 32px;
          color: var(--el-text-color-secondary);
        }

        .upload-text {
          text-align: left;

          .main {
            display: block;
            font-size: 16px;
            color: var(--el-text-color-primary);
            margin-bottom: 4px;
          }

          .sub {
            display: block;
            font-size: 12px;
            color: var(--el-text-color-secondary);
          }
        }
      }
    }

    .button-group {
      display: flex;
      gap: 12px;
    }
  }

  .table-container {
    background-color: var(--el-bg-color);
    border-radius: 12px;
    box-shadow: var(--el-box-shadow-light);
    padding: 24px;

    :deep(.el-table) {
      --el-table-border-color: var(--el-border-color-lighter);

      .cell-content {
        .el-input {
          --el-input-height: 32px;

          &.is-disabled {
            .el-input__wrapper {
              background-color: var(--el-fill-color-light);
            }
          }
        }
      }

      .merged-cell {
        background-color: var(--el-fill-color-light);
      }
    }
  }

  .empty-state {
    background-color: var(--el-bg-color);
    border-radius: 12px;
    box-shadow: var(--el-box-shadow-light);
    padding: 48px;
    text-align: center;

    :deep(.el-empty) {
      .empty-icon {
        font-size: 64px;
        color: var(--el-text-color-secondary);
      }
    }
  }

  .loading-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    color: var(--el-bg-color);

    .loading-icon {
      font-size: 32px;
      animation: rotating 2s linear infinite;
    }
  }
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

<template>
  <el-card class="excel-parser-container">
    <h2>Excel 解析工具</h2>
    <el-upload
      class="upload-area"
      :before-upload="beforeUpload"
      :on-change="handleChange"
      :show-file-list="false"
      accept=".xlsx,.xls"
    >
      <el-button>点击上传或拖拽文件到这里</el-button>
    </el-upload>
    <el-button type="primary" @click="exportExcel" :disabled="!excelData">导出 Excel</el-button>
    <div v-if="excelData" class="table-container">
      <el-table :data="excelData.rows" style="width: 100%">
        <el-table-column
          v-for="(header, index) in excelData.headers"
          :key="index"
          :label="header"
          :prop="header"
          :width="150"
        />
      </el-table>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElUpload, ElButton, ElCard, ElTable, ElTableColumn } from 'element-plus'
import * as XLSX from 'xlsx'

const excelData = ref<{ headers: string[]; rows: any[][] } | null>(null)

const beforeUpload = (file: File) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    const data = new Uint8Array(e.target?.result as ArrayBuffer)
    const workbook = XLSX.read(data, { type: 'array' })
    const firstSheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[firstSheetName]
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
    
    // 只保留有效数据
    const validData = jsonData.filter((row: any[]) => row.some(cell => cell !== null && cell !== ''))
    const headers = validData[0] || []
    const rows = validData.slice(1)

    excelData.value = { headers, rows }
  }
  reader.readAsArrayBuffer(file)
  return false // Prevent automatic upload
}

const handleChange = (file: File) => {
  // Handle file change if needed
}

const exportExcel = () => {
  if (excelData.value) {
    const ws = XLSX.utils.aoa_to_sheet([excelData.value.headers, ...excelData.value.rows])
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    XLSX.writeFile(wb, 'exported_data.xlsx')
  }
}
</script>

<style scoped lang="scss">
.excel-parser-container {
  padding: 20px;
  .upload-area {
    border: 2px dashed #d9d9d9;
    padding: 20px;
    text-align: center;
    margin-bottom: 20px;
  }
}
</style> 
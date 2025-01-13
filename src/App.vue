<template>
  <el-config-provider :locale="zhCn">
    <DefaultLayout />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<style></style>

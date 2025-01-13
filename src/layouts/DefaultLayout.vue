<template>
  <el-container class="layout-container">
    <el-header class="layout-header">
      <div class="header-left">
        <router-link to="/" class="logo">
          <h1>在线工具平台</h1>
        </router-link>
      </div>
    </el-header>

    <el-container class="main-container">
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DefaultLayout'
})
</script>

<style scoped lang="scss">
.layout-container {
  min-height: 100vh;
}

.layout-header {
  background: var(--card-background);
  border-bottom: 1px solid #eee;
  padding: 0 20px;
  height: $header-height;
  line-height: $header-height;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  .header-left {
    display: flex;
    align-items: center;
    height: 100%;

    .logo {
      text-decoration: none;
      color: var(--primary-color);
      
      h1 {
        margin: 0;
        font-size: 1.5rem;
      }
    }
  }
}

.main-container {
  margin-top: $header-height;
  padding: 20px;
}
</style> 
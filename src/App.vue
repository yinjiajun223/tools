<template>
  <router-view />
</template>

<style scoped lang="scss">
.layout-container {
  min-height: 100vh;
}

.main-container {
  margin-top: $header-height;
  min-height: calc(100vh - #{$header-height});

  .el-main {
    padding: 20px;
    background-color: #f5f7fa;
  }
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>

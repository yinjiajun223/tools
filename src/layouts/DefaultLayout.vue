<template>
  <el-container class="layout-container">
    <el-header class="layout-header">
      <div class="header-left">
        <router-link to="/" class="logo">
          <h1>在线工具平台</h1>
        </router-link>
      </div>
      <div class="header-right">
        <a href="https://github.com/yinjiajun223/tools" target="_blank" class="github-link">
          <el-icon class="github-icon"
            ><svg
              t="1711016669977"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4258"
              width="20"
              height="20"
            >
              <path
                d="M512 42.666667A464.64 464.64 0 0 0 42.666667 502.186667 460.373333 460.373333 0 0 0 363.52 938.666667c23.466667 4.266667 32-9.813333 32-22.186667v-78.08c-130.56 27.733333-158.293333-61.44-158.293333-61.44a122.026667 122.026667 0 0 0-52.053334-67.413333c-42.666667-28.16 3.413333-27.733333 3.413334-27.733334a98.56 98.56 0 0 1 71.68 47.36 101.12 101.12 0 0 0 136.533333 37.973334 99.413333 99.413333 0 0 1 29.866667-61.44c-104.106667-11.52-213.333333-50.773333-213.333334-226.986667a177.066667 177.066667 0 0 1 47.36-124.16 161.28 161.28 0 0 1 4.693334-121.173333s39.68-12.373333 128 46.933333a455.68 455.68 0 0 1 234.666666 0c89.6-59.306667 128-46.933333 128-46.933333a161.28 161.28 0 0 1 4.693334 121.173333A177.066667 177.066667 0 0 1 810.666667 477.866667c0 176.64-110.08 215.466667-213.333334 226.986666a106.666667 106.666667 0 0 1 32 85.333334v125.866666c0 14.933333 8.533333 26.88 32 22.186667A460.8 460.8 0 0 0 981.333333 502.186667 464.64 464.64 0 0 0 512 42.666667"
                fill="#ffffff"
                p-id="4259"
              ></path></svg
          ></el-icon>
          <span>GitHub</span>
        </a>
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
  background-color: #f5f7fa;
}

.layout-header {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 20px;
  height: $header-height;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(8px);

  .header-left {
    .logo {
      text-decoration: none;

      h1 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
        letter-spacing: 0.5px;
        color: #fff;
        transition: all 0.3s ease;

        &:hover {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
      }
    }
  }

  .header-right {
    .github-link {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #fff;
      text-decoration: none;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 0.9rem;
      transition: all 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.2);

      &:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-1px);
        border-color: rgba(255, 255, 255, 0.4);

        .github-icon {
          transform: rotate(360deg);
        }
      }

      .github-icon {
        font-size: 20px;
        transition: transform 0.6s ease;
      }

      span {
        font-weight: 500;
      }
    }
  }
}

.main-container {
  padding-top: $header-height;
  min-height: calc(100vh - #{$header-height});

  .el-main {
    padding: 20px;
  }
}
</style>

<template>
  <div class="not-found">
    <div class="error-container">
      <div class="error-code">
        <span>4</span>
        <div class="circle"></div>
        <span>4</span>
      </div>
      <div class="error-desc">
        <p class="error-text">Oops! 页面不见了</p>
        <p class="error-detail">抱歉，您访问的页面似乎已经迷失在了数字宇宙中...</p>
      </div>
      <el-button type="primary" class="home-button" @click="router.push('/')"> 返回首页 </el-button>
    </div>
    <div class="stars"></div>
    <div class="stars2"></div>
    <div class="stars3"></div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(45deg, #1a1a1a 0%, #000 100%);
  position: relative;
  overflow: hidden;

  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
    padding: 2rem;
  }

  .error-code {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;

    span {
      font-size: 12rem;
      font-weight: bold;
      color: #fff;
      text-shadow:
        2px 2px 0 #4a9eff,
        -2px -2px 0 #ff4a4a,
        4px 4px 0 rgba(0, 0, 0, 0.2);
      animation: textFloat 3s ease-in-out infinite;
    }

    .circle {
      width: 120px;
      height: 120px;
      margin: 0 1rem;
      border-radius: 50%;
      background: linear-gradient(45deg, #4a9eff, #ff4a4a);
      box-shadow: 0 0 30px rgba(74, 158, 255, 0.5);
      animation:
        rotate 8s linear infinite,
        pulse 2s ease-in-out infinite;
    }
  }

  .error-desc {
    text-align: center;
    margin-bottom: 3rem;

    .error-text {
      font-size: 2.5rem;
      font-weight: bold;
      color: #fff;
      margin-bottom: 1rem;
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
      animation: glow 2s ease-in-out infinite;
    }

    .error-detail {
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.8);
      max-width: 600px;
      line-height: 1.6;
    }
  }

  .home-button {
    background: linear-gradient(45deg, #4a9eff, #ff4a4a);
    border: none;
    padding: 12px 40px;
    font-size: 1.1rem;
    font-weight: 500;
    color: #fff;
    border-radius: 25px;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
      filter: brightness(1.1);
    }

    &:active {
      transform: translateY(1px);
    }
  }
}

@keyframes textFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes glow {
  0%,
  100% {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
  50% {
    text-shadow:
      0 0 20px rgba(255, 255, 255, 0.8),
      0 0 30px rgba(74, 158, 255, 0.6);
  }
}

// 背景星星动画
@function multiple-box-shadow($n) {
  $value: '#{random(2000)}px #{random(2000)}px #FFF';
  @for $i from 2 through $n {
    $value: '#{$value} , #{random(2000)}px #{random(2000)}px #FFF';
  }
  @return unquote($value);
}

$shadows-small: multiple-box-shadow(700);
$shadows-medium: multiple-box-shadow(200);
$shadows-big: multiple-box-shadow(100);

.stars {
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: $shadows-small;
  animation: animStar 50s linear infinite;
  position: absolute;
  top: 0;
  left: 0;

  &::after {
    content: ' ';
    position: absolute;
    top: 2000px;
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: $shadows-small;
  }
}

.stars2 {
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: $shadows-medium;
  animation: animStar 100s linear infinite;
  position: absolute;
  top: 0;
  left: 0;

  &::after {
    content: ' ';
    position: absolute;
    top: 2000px;
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: $shadows-medium;
  }
}

.stars3 {
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: $shadows-big;
  animation: animStar 150s linear infinite;
  position: absolute;
  top: 0;
  left: 0;

  &::after {
    content: ' ';
    position: absolute;
    top: 2000px;
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow: $shadows-big;
  }
}

@keyframes animStar {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-2000px);
  }
}
</style>

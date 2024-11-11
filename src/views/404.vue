<script setup>
import textUnderline from '../component/textUnderline.vue';
</script>

<template>
  <div class="page_404">
    <router-link to="/">
      <textUnderline>返回首页 >></textUnderline>
    </router-link>
  </div>
</template>

<style scoped>
.page_404 {
  width: 100%;
  height: 100vh;
  background: url('/background/404pagebg_small.png');
  background-size: 100% 100%;

  a {
    color: #fff;
  }
}
</style>
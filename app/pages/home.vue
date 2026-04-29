<template>
  <div class="page-root">
    <GlobalHeader />
    <div class="page-content home-container">
      <Notification />
      <Performance />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Notification from "../components/home/Notification.vue";
import Performance from "../components/home/Performance.vue";
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.home-component {
  width: 100%;
}
</style>

<template>
  <div class="task-detail-page">
    <h1>Task Detail</h1>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>
<style scoped>
.task-detail-page {
  padding: 20px;
}
</style>

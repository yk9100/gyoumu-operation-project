<template>
  <div class="task-dashboard">
    <div class="task-dashboard-column">
      <MyTaskDashboardStatus />
      <MyTaskDashboardMilestone />
    </div>
    <MyTaskDashboardCategory />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "task-default",
});
</script>

<style scoped>
.task-dashboard {
  display: flex;
  gap: 36px;
}
.task-dashboard-column {
  display: flex;
  flex-direction: column;
  gap: 36px;
}
</style>

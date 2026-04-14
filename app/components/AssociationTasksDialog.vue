<template>
  <a-modal
    v-model:open="visible"
    title="関連タスク"
    :width="800"
    @cancel="handleCancel"
    :footer="null"
  >
    <div class="association-tasks-dialog">
      <TaskList @onTaskSelect="handleTaskSelect" />
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import type { Task } from "~/types/task";

const visible = defineModel("visible");

const emit = defineEmits<{
  (e: "cancel"): void;
  (e: "update:visible", value: boolean): void;
  (e: "onTaskSelect", item: Task): void;
}>();

const handleCancel = () => {
  emit("update:visible", false);
  emit("cancel");
};

const handleTaskSelect = (item: Task) => {
  emit("onTaskSelect", item);
  emit("update:visible", false);
};
</script>

<style scoped>
.association-tasks-dialog {
  height: 500px;
}
</style>

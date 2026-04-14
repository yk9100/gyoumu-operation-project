<template>
  <a-modal
    title="Add child issue"
    v-model:open="visible"
    width="800px"
    @cancel="handleCancel"
  >
    <a-tabs type="card" v-model:activeKey="activeKey">
      <a-tab-pane tab="Add new child issue" key="new-child-issue">
        <div class="tab-pane-content">
          <AddTaskForm />
        </div>
      </a-tab-pane>
      <a-tab-pane tab="Add existing issue" key="existing-issue">
        <div class="tab-pane-content">
          <TaskList @onTaskSelect="handleTaskSelect" />
        </div>
      </a-tab-pane>
    </a-tabs>

    <template #footer>
      <div v-if="activeKey === 'new-child-issue'" class="footer">
        <a-button type="primary" @click="handleAdd">Add</a-button>
      </div>
    </template>
  </a-modal>
</template>
<script lang="ts" setup>
import type { Task } from "~/types/task";
const visible = defineModel("visible");
const activeKey = ref("new-child-issue");
const emit = defineEmits(["update:visible"]);

const handleCancel = () => {
  emit("update:visible", false);
};

const handleAdd = () => {
  emit("update:visible", false);
};

const handleTaskSelect = (item: Task) => {
  //   emit("onTaskSelect", item);
  emit("update:visible", false);
};
</script>
<style scoped>
.footer {
  display: flex;
  justify-content: center;
}

.tab-pane-content {
  height: 550px;
  overflow-y: auto;
}
</style>

<template>
  <a-tabs type="card">
    <a-tab-pane key="attachment-list" tab="Attachments">
      <TaskDetailAttachmentList :attachments="attachments" />
    </a-tab-pane>
    <a-tab-pane key="sub-tasks" tab="Subtasking"> Subtasking </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
import type { Attachment } from "~/types/task";

const props = defineProps<{
  attachments: Attachment[];
}>();
</script>
<style scoped>
:deep(.ant-tabs-nav) {
  margin-bottom: 0;
}
:deep(.ant-tabs-tab) {
  border-bottom: 0 !important;
}
:deep(.ant-tabs-content-holder) {
  border: 1px solid rgba(5, 5, 5, 0.06);
  border-top: 0;
}
</style>

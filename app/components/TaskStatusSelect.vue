<template>
  <a-select
    v-model:value="model"
    :placeholder="placeholder"
    :style="style"
    :options="TASK_STATUS_OPTIONS"
  ></a-select>
</template>

<script lang="ts" setup>
import { TASK_STATUS_OPTIONS } from "@/common";
const props = defineProps({
  style: {
    type: Object,
    default: () => ({
      width: "160px",
    }),
  },
  placeholder: {
    type: String,
    default: "Select status",
  },
});
const model = defineModel<string>();
</script>

<style scoped></style>

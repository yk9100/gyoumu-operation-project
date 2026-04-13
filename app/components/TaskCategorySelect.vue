<template>
  <a-select
    allowClear
    v-model:value="model"
    show-search
    :placeholder="placeholder"
    :style="style"
    :options="TASK_CATEGORY_OPTIONS"
  ></a-select>
</template>

<script lang="ts" setup>
import { TASK_CATEGORY_OPTIONS } from "@/common";
const props = defineProps({
  style: {
    type: Object,
    default: () => ({
      width: "160px",
    }),
  },
  placeholder: {
    type: String,
    default: "Select category",
  },
});
const model = defineModel<string>();
</script>

<style scoped></style>

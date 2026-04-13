<template>
  <a-select
    :allowClear="allowClear"
    v-model:value="model"
    show-search
    :placeholder="placeholder"
    :style="style"
    :options="ISSUE_TYPE_OPTIONS"
    :filter-option="filterOption"
  ></a-select>
</template>
<script lang="ts" setup>
import { ISSUE_TYPE_OPTIONS } from "@/common";
import type { EIssueType } from "~/types";
const props = defineProps({
  style: {
    type: Object,
    default: () => ({
      width: "160px",
    }),
  },
  placeholder: {
    type: String,
    default: "Select issue type",
  },
  allowClear: {
    type: Boolean,
    default: true,
  },
});
const model = defineModel<string | undefined>();

const filterOption = (
  inputValue: string,
  option: { label: string; value: EIssueType },
) => {
  return option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
};
</script>

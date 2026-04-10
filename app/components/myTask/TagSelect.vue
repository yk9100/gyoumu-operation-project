<template>
  <div class="tag-select">
    <div
      v-for="option in props.options"
      :key="option.value"
      class="tag"
      :class="{ 'tag-active': option.value === props.value }"
      @click="emit('onChange', option.value)"
    >
      {{ option.label }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IOption } from "@/types/index";
const props = defineProps<{
  options: IOption[];
  value?: string;
}>();

const emit = defineEmits<(e: "onChange", value: string) => void>();
</script>

<style scoped>
.tag-select {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 0 10px;
  border-radius: 4px;
  cursor: pointer;
  border-radius: 20px;
  font-size: 13px;
  display: flex;
  align-items: center;
  line-height: 22px;
  height: 22px;
}

.tag-active {
  color: #fff;
  background-color: #1677ff;
}

.tag:hover {
  color: #fff;
  background-color: #1677ff;
}
</style>

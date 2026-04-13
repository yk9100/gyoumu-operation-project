<template>
  <a-select
    allowClear
    v-model:value="model"
    :placeholder="placeholder"
    :style="style"
    :options="assigneeOptions"
    option-label-prop="label"
  >
    <template #option="{ value, label, avatar }">
      <div class="assignee-option">
        <a-avatar
          :src="avatar"
          :alt="label"
          size="small"
          style="margin-right: 8px; background-color: #f5f5f5"
        />
        <span>{{ label }}</span>
      </div>
    </template>
    <template #selection="{ value, label, avatar }">
      <div class="assignee-selection">
        <a-avatar
          :src="avatar"
          :alt="label"
          size="small"
          style="margin-right: 8px; background-color: #f5f5f5"
        />
        <span>{{ label }}</span>
      </div>
    </template>
  </a-select>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
const props = defineProps({
  style: {
    type: Object,
    default: () => ({
      width: "160px",
    }),
  },
  placeholder: {
    type: String,
    default: "Select assignee",
  },
});

const model = defineModel<string>();

const assignees = ref([
  {
    id: "1",
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=John",
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Jane",
  },
  {
    id: "3",
    name: "Bob Johnson",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Bob",
  },
  {
    id: "4",
    name: "Alice Brown",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=lice",
  },
  {
    id: "5",
    name: "Mike Wilson",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Mike",
  },
]);

const assigneeOptions = computed(() => {
  return assignees.value.map((assignee) => ({
    value: assignee.id,
    label: assignee.name,
    avatar: assignee.avatar,
  }));
});
</script>

<style scoped>
.assignee-option {
  display: flex;
  align-items: center;
}

.assignee-selection {
  display: flex;
  align-items: center;
}
</style>

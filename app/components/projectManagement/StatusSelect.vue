<template>
  <div class="status-select">
    <div class="project-form-field">ステータス</div>
    <div class="status-group-list">
      <a-button
        v-for="item in PROJECT_STATUS_GROUP"
        :key="item.label"
        style="border-radius: 16px"
        @click="onStatusGroupChange(item.value)"
      >
        {{ item.label }}
      </a-button>
    </div>
    <div class="status-list">
      <a-checkbox-group v-model:value="model" style="gap: 8px !important;">
        <a-button
          v-for="item in PROJECT_STATUS"
          :key="item.label"
          :style="model.includes(item.value) ? 'border-color: #1890ff;' : ''"
          @click="onStatusChange(item.value)"
        >
          <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
        </a-button>
      </a-checkbox-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  PROJECT_STATUS,
  PROJECT_STATUS_GROUP,
} from "@/components/projectManagement/common";
const model = defineModel<string[]>({
  default: () => [],
});

const onStatusGroupChange = (groupStatus: string[]) => {
  model.value = groupStatus;
};

const onStatusChange = (status: string) => {
  if (model.value.includes(status)) {
    model.value = model.value.filter((item) => item !== status);
  } else {
    model.value = [...model.value, status];
  }
};
</script>

<style scoped>

.status-group-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 12px;
}

.status-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.status-select {
  border-radius: 8px;
  padding: 12px;
  background-color: #f5f5f5;
  width: 100%;
}
</style>

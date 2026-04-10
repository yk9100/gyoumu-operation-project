<template>
  <div class="task-filter">
    <div class="filter-nav-box">
      <div class="filter-nav-item">
        <span>Status:</span>
        <MyTaskTagSelect
          :options="TASK_STATUS_OPTIONS"
          :value="filterState.taskStatus"
          @onChange="handleTaskStatusChange"
        />
      </div>
      <div class="filter-nav-item">
        <span>Subtasking:</span>
        <MyTaskTagSelect
          :options="SUB_TASK_STATUS_OPTIONS"
          :value="filterState.subTaskStatus"
          @onChange="handleSubTaskStatusChange"
        />
      </div>
    </div>
    <div class="filter-select-box">
      <div class="filter-select-item">
        <span>Issue Type</span>
        <a-select
          allowClear
          v-model:value="filterState.issueType"
          show-search
          placeholder="Select issue type"
          style="width: 160px"
          :options="ISSUE_TYPE_OPTIONS"
          :filter-option="filterOption"
        ></a-select>
      </div>
      <div class="filter-select-item">
        <span>Category</span>
        <a-select
          allowClear
          v-model:value="filterState.category"
          placeholder="Select category"
          style="width: 160px"
          :options="TASK_CATEGORY_OPTIONS"
        ></a-select>
      </div>
      <div class="filter-select-item">
        <span>Keyword</span>
        <a-input
          allowClear
          v-model:value.lazy="filterState.keyword"
          style="width: 210px"
          placeholder="Enter Keyword"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  TASK_STATUS_OPTIONS,
  SUB_TASK_STATUS_OPTIONS,
  ISSUE_TYPE_OPTIONS,
  TASK_CATEGORY_OPTIONS,
} from "@/common";
const filterState = ref<{
  taskStatus: string;
  subTaskStatus: string;
  issueType: string;
  category: string;
  keyword: string;
}>({
  taskStatus: TASK_STATUS_OPTIONS[0]!.value,
  subTaskStatus: SUB_TASK_STATUS_OPTIONS[0]!.value,
  issueType: "",
  category: "",
  keyword: "",
});

const filterOption = (input: string, option: any) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

const handleTaskStatusChange = (value: string) => {
  filterState.value.taskStatus = value;
};

const handleSubTaskStatusChange = (value: string) => {
  filterState.value.subTaskStatus = value;
};

watch(
  [
    () => filterState.value.taskStatus,
    () => filterState.value.subTaskStatus,
    () => filterState.value.issueType,
    () => filterState.value.category,
    () => filterState.value.keyword,
  ],
  () => {
    console.log(filterState.value);
  },
);
</script>

<style scoped>
.task-filter {
  margin-bottom: 20px;
}

.filter-nav-box {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.filter-nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-select-box {
  display: flex;
  gap: 20px;
}

.filter-select-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-select-item span {
  font-size: 13px;
}
</style>

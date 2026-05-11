<template>
  <div class="task-filter">
    <div class="filter-nav-box-wrap">
      <div class="filter-nav-box">
        <div class="filter-nav-item">
          <span>Status:</span>
          <MyTaskTagSelect
            :options="[
              { label: 'All', value: ETaskStatus.All },
              ...TASK_STATUS_OPTIONS,
            ]"
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
      <a-button type="primary" @click="handleAddTaskClick">
        <PlusOutlined />
        タスクを追加
      </a-button>
    </div>
    <div class="filter-select-box">
      <div class="filter-select-item">
        <span>Issue Type</span>
        <IssueTypeSelect v-model="filterState.issueType" style="width: 160px" />
      </div>
      <div class="filter-select-item">
        <span>Category</span>
        <TaskCategorySelect
          v-model="filterState.category"
          style="width: 160px"
        />
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
import { PlusOutlined } from "@ant-design/icons-vue";
import { TASK_STATUS_OPTIONS, SUB_TASK_STATUS_OPTIONS } from "@/common";
import { ETaskStatus } from "~/types";

const route = useRoute();
const router = useRouter();
const filterState = ref<{
  taskStatus: string;
  subTaskStatus: string;
  issueType: string;
  category: string;
  keyword: string;
}>({
  taskStatus: ETaskStatus.All,
  subTaskStatus: SUB_TASK_STATUS_OPTIONS[0]!.value,
  issueType: "",
  category: "",
  keyword: "",
});

const handleTaskStatusChange = (value: string) => {
  filterState.value.taskStatus = value;
};

const handleSubTaskStatusChange = (value: string) => {
  filterState.value.subTaskStatus = value;
};

const handleAddTaskClick = () => {
  router.push(`/my-task/${route.params.projectId}/create-task`);
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

.filter-nav-box-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
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

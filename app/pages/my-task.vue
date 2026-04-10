<template>
  <div class="my-task-page">
    <TaskFilter @search="handleSearch" />
    <TaskTable
      :tasks="tasks"
      :total="total"
      :current-page="currentPage"
      :page-size="pageSize"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script lang="ts" setup>
import TaskFilter from '../components/myTask/TaskFilter.vue';
import TaskTable from '../components/myTask/TaskTable.vue';
import { useTasks } from '../composables/useTasks';

// 使用 composable
const {
  tasks,
  total,
  currentPage,
  pageSize,
  setSearchKeyword,
  setCurrentPage,
  setPageSize
} = useTasks();

// 处理搜索
const handleSearch = (keyword: string) => {
  setSearchKeyword(keyword);
};

// 处理分页
const handlePageChange = (page: number) => {
  setCurrentPage(page);
};

const handleSizeChange = (size: number) => {
  setPageSize(size);
};
</script>

<style scoped>
.my-task-page {
  /* padding: 20px; */
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
  color: #333;
}
</style>

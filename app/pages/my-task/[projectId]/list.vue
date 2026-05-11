<template>
  <div class="page-root">
    <GlobalHeader>
      <template #left>
        <NuxtLink to="/my-task" class="global-header-back">
          <ArrowLeftOutlined />マイタスク
        </NuxtLink>
      </template>
    </GlobalHeader>
    <div class="page-content">
      <MyTaskFilter @search="handleSearch" />
      <MyTaskTable
        :tasks="tasks"
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        @page-change="handlePageChange"
        @size-change="handleSizeChange"
        @toggle-fav="toggleFav"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTasks } from "~/composables/useTasks";
import { ArrowLeftOutlined } from "@ant-design/icons-vue";

const {
  tasks,
  total,
  currentPage,
  pageSize,
  setSearchKeyword,
  setCurrentPage,
  setPageSize,
  toggleFav,
} = useTasks();

const handleSearch = (keyword: string) => {
  setSearchKeyword(keyword);
};

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

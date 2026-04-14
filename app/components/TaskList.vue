<template>
  <div class="tasks-list" ref="tasksListRef" @scroll="handleScroll">
    <a-list :data-source="tasks">
      <template #renderItem="{ item }">
        <a-list-item @click="handleTaskSelect(item)">
          <div class="task-info">
            <span class="issue-key">{{ item.issueKey }}</span>
            <span class="summary">{{ item.summary }}</span>
            <span
              class="status"
              :style="{ backgroundColor: item.status.color }"
              >{{ item.status.name }}</span
            >
          </div>
        </a-list-item>
      </template>
      <template #footer>
        <div v-if="loading" class="loading-more">
          <a-spin tip="読み込み中..." />
        </div>
        <div v-else-if="!hasMore" class="no-more">
          すべてのデータを読み込みました
        </div>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts" setup>
import type { Task } from "~/types/task";
const emit = defineEmits<{
  (e: "onTaskSelect", item: Task): void;
}>();
const { tasks, total, currentPage, pageSize, setCurrentPage } = useTasks();

const tasksListRef = ref<HTMLElement | null>(null);
const loading = ref(false);
const hasMore = ref(true);

const handleTaskSelect = (item: Task) => {
  emit("onTaskSelect", item);
};

const handleScroll = () => {
  //   if (!tasksListRef.value || loading.value) return;
  //   const { scrollTop, scrollHeight, clientHeight } = tasksListRef.value;
  //   if (scrollTop + clientHeight >= scrollHeight - 10) {
  //     loadMore();
  //   }
};

const loadMore = async () => {
  if (loading.value || !hasMore.value) return;

  loading.value = true;

  try {
    const nextPage = currentPage.value + 1;
    setCurrentPage(nextPage);

    if (tasks.value.length >= total.value) {
      hasMore.value = false;
    }
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  setCurrentPage(1);
});
</script>

<style scoped>
.tasks-list {
  height: 100%;
  overflow-y: auto;
  padding-right: 8px;
}

.task-info {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
}

:deep(.ant-list-item:hover) {
  background-color: #f5f5f5;
  cursor: pointer;
}

.issue-key {
  font-weight: 600;
  color: #1890ff;
  width: 140px;
}

.summary {
  font-size: 14px;
  color: #333;
  word-break: break-all;
  flex: 1;
}

.status {
  font-size: 13px;
  font-weight: 500;
  width: 76px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 20px;
  color: #fff;
}

.loading-more {
  text-align: center;
  padding: 16px;
}

.no-more {
  text-align: center;
  padding: 16px;
  color: #999;
  font-size: 14px;
}
</style>

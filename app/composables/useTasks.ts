import { ref, computed } from "vue";
import type { Task } from "../types/task";
import { taskMock } from "../mock/myTask";

export function useTasks() {
  // 状态
  const tasks = ref<Task[]>(taskMock);
  const searchKeyword = ref("");
  const currentPage = ref(1);
  const pageSize = ref(10);

  const filteredTasks = computed(() => {
    let result = [...tasks.value];

    if (searchKeyword.value) {
      const keyword = searchKeyword.value.toLowerCase();
      result = result.filter(
        (task) =>
          task.summary.toLowerCase().includes(keyword) ||
          task.issueKey.toLowerCase().includes(keyword) ||
          task.assignee.name.toLowerCase().includes(keyword) ||
          task.issueType.name.toLowerCase().includes(keyword),
      );
    }

    return result;
  });

  const paginatedTasks = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return filteredTasks.value.slice(start, end);
  });

  const total = computed(() => filteredTasks.value.length);

  const setSearchKeyword = (keyword: string) => {
    searchKeyword.value = keyword;
    currentPage.value = 1;
  };

  const setCurrentPage = (page: number) => {
    currentPage.value = page;
  };

  const setPageSize = (size: number) => {
    pageSize.value = size;
    currentPage.value = 1;
  };

  return {
    tasks: paginatedTasks,
    total,
    searchKeyword,
    currentPage,
    pageSize,
    setSearchKeyword,
    setCurrentPage,
    setPageSize,
  };
}

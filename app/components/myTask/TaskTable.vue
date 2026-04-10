<template>
  <div class="task-table-container">
    <!-- 任务表格 -->
    <a-table
      :columns="columns"
      :data-source="tasks"
      :pagination="{
        current: currentPage,
        pageSize: pageSize,
        total: total,
        onChange: handlePageChange,
        onShowSizeChange: handleSizeChange,
      }"
      row-key="id"
      :scroll="{ x: scrollX, y: scrollY }"
      :row-class-name="
        (_record: any, index: number) =>
          index % 2 === 1 ? 'table-striped' : null
      "
    >
      <!-- Issue Type 列 -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'issueType'">
          <span
            class="td-tag"
            :style="{ backgroundColor: record.issueType.color }"
          >
            {{ record.issueType.name }}
          </span>
        </template>
        <template v-else-if="column.key === 'issueKey'">
          <span class="issue-id">{{ record.issueKey }}</span>
        </template>
        <template v-else-if="column.key === 'status'">
          <span
            class="td-tag"
            :style="{ backgroundColor: record.status.color }"
          >
            {{ record.status.name }}
          </span>
        </template>
        <template v-else-if="column.key === 'assignee'">
          <div class="assignee-info">
            <a-avatar
              :size="24"
              :src="
                record.assignee?.icon
                  ? `https://assets.backlog.jp/playassets/1.78.2/${record.assignee.icon}`
                  : ''
              "
              :alt="record.assignee?.name"
            />
            <span>{{ record.assignee?.name }}</span>
          </div>
        </template>
        <template v-else-if="column.key === 'category'">
          <span>{{
            record.category.length > 0
              ? record.category.map((c: any) => c.name).join(", ")
              : "-"
          }}</span>
        </template>
        <template v-else-if="column.key === 'created'">
          <span>{{ formatDate(record.created) }}</span>
        </template>
        <template v-else-if="column.key === 'operation'">
          <div class="operation-buttons">
            <a-dropdown trigger="click">
              <a class="ant-dropdown-link" @click.prevent>
                <MoreOutlined style="font-size: 18px; color: #111" />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <ArrowUpOutlined />
                    <span>一番上に移動</span>
                  </a-menu-item>
                  <a-menu-item>
                    <EditOutlined />
                    <span>期限を編集</span>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <a-button
              class="ant-dropdown-link"
              type="danger"
              size="small"
              @click="emit('toggle-fav', record)"
            >
              <StarFilled v-if="record.fav" style="color: #1677FF" />
              <StarOutlined v-else />
            </a-button>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import {
  MoreOutlined,
  StarOutlined,
  StarFilled,
  ArrowUpOutlined,
  EditOutlined,
} from "@ant-design/icons-vue";
import type { Task } from "../../types/task";

const props = defineProps<{
  tasks: Task[];
  total: number;
  currentPage: number;
  pageSize: number;
}>();

const emit = defineEmits<{
  (e: "page-change", page: number): void;
  (e: "size-change", size: number): void;
  (e: "toggle-fav", task: Task): void;
}>();

const scrollX = computed(() => window.innerWidth - 300);
const scrollY = computed(() => window.innerHeight - 400);

const columns = [
  {
    title: "Issue Type",
    dataIndex: "issueType",
    key: "issueType",
    width: 120,
    fixed: "left",
  },
  {
    title: "Key",
    dataIndex: "issueKey",
    key: "issueKey",
    width: 200,
    fixed: "left",
  },
  {
    title: "Subject",
    dataIndex: "summary",
    key: "summary",
    width: 300,
    ellipsis: true,
  },
  {
    title: "Assignee",
    dataIndex: "assignee",
    key: "assignee",
    width: 180,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 100,
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    width: 120,
  },
  {
    title: "Created",
    dataIndex: "created",
    key: "created",
    width: 160,
    sorter: (a: Task, b: Task) =>
      new Date(a.created).getTime() - new Date(b.created).getTime(),
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
    width: 160,
    sorter: (a: Task, b: Task) =>
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    key: "dueDate",
    width: 160,
    sorter: (a: Task, b: Task) =>
      new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
  },
  {
    title: "Operation",
    dataIndex: "operation",
    key: "operation",
    width: 100,
    fixed: "right",
  },
];

const handlePageChange = (page: number) => {
  emit("page-change", page);
};

const handleSizeChange = (current: number, size: number) => {
  emit("size-change", size);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("ja-JP");
};
</script>

<style scoped>
.task-table-container {
  /* padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); */
}

.assignee-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.td-tag {
  display: flex;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  /* max-width: 122px; */
  width: 76px;
  color: #fff;
  padding: 1px 6px;
  border-radius: 20px;
  height: 20px;
  line-height: 20px;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 12px;
}

.issue-id {
  text-decoration: underline;
  cursor: pointer;
  color: #007bff;
}

.issue-id:hover {
  color: #0056b3;
}

.operation-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.ant-dropdown-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 4px;
}

.ant-dropdown-link:hover {
  background-color: #e6e6e6;
}

.ant-dropdown-item {
  display: flex !important;
  gap: 8px;
}

:deep(.table-striped) td {
  background-color: #fafafa;
}

:deep(.ant-table-pagination) {
  margin-bottom: 0 !important;
}

:deep(.ant-dropdown-menu-title-content) {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>

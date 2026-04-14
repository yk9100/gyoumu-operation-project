<template>
  <div class="sub-task-list-box">
    <div class="action-box">
      <a-button>
        <PlusOutlined />
        Add child issue</a-button
      >
    </div>
    <div>
      <a-table
        :columns="columns"
        :data-source="subTasks || []"
        row-key="id"
        :pagination="false"
      >
        <template #bodyCell="{ column, record: childRecord }">
          <template v-if="column.key === 'issueKey'">
            <span class="issue-id" @click="handleTaskClick(childRecord)">{{
              childRecord.issueKey
            }}</span>
          </template>
          <template v-else-if="column.key === 'status'">
            <span
              class="td-tag"
              :style="{ backgroundColor: childRecord.status.color }"
            >
              {{ childRecord.status.name }}
            </span>
          </template>
          <template v-else-if="column.key === 'assignee'">
            <div class="assignee-info">
              <a-avatar
                :size="24"
                :src="
                  childRecord.assignee?.icon
                    ? `https://assets.backlog.jp/playassets/1.78.2/${childRecord.assignee.icon}`
                    : ''
                "
                :alt="childRecord.assignee?.name"
              />
              <span>{{ childRecord.assignee?.name }}</span>
            </div>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PlusOutlined } from "@ant-design/icons-vue";
import type { Task } from "~/types/task";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{
  subTasks: Task[];
}>();
const subTasks = ref(props.subTasks);

const columns = [
  {
    title: "Key",
    dataIndex: "issueKey",
    key: "issueKey",
    width: 200,
  },
  {
    title: "Subject",
    dataIndex: "summary",
    key: "summary",
    ellipsis: true,
  },
  {
    title: "Assignee",
    dataIndex: "assignee",
    key: "assignee",
    width: 200,
  },

  //   {
  //     title: "Created",
  //     dataIndex: "created",
  //     key: "created",
  //     width: 160,
  //     sorter: (a: Task, b: Task) =>
  //       new Date(a.created).getTime() - new Date(b.created).getTime(),
  //   },
  //   {
  //     title: "Start Date",
  //     dataIndex: "startDate",
  //     key: "startDate",
  //     width: 160,
  //     sorter: (a: Task, b: Task) =>
  //       new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  //   },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    key: "dueDate",
    width: 160,
    sorter: (a: Task, b: Task) =>
      new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 120,
  },
];

const handleTaskClick = (record: Task) => {
  router.push(`/task-detail?taskId=${record.id}`);
};
</script>
<style scoped>
.sub-task-list-box {
  padding: 11px 20px 11px 8px;
}
.td-tag {
  display: flex;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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

.action-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
}
</style>

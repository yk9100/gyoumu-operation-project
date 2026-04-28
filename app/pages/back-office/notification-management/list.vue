<template>
  <div>
    <div>
      <a-table
        :columns="columns"
        :data-source="tableData.dataSource"
        :pagination="{
          total: tableData.total,
          current: tableData.current,
          pageSize: tableData.pageSize,
        }"
        :loading="tableData.loading"
        :scroll="{ y: scrollY }"
        :row-class-name="
          (_record: IMember, index: number) =>
            index % 2 === 1 ? 'table-striped' : null
        "
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'operation'">
            <div class="operation-buttons">
              <a-button
                type="primary"
                size="small"
                @click="handleEdit(record.id)"
              >
                <EditOutlined />
              </a-button>
              <div class="delete-button-container">
                <a-popconfirm
                  placement="topRight"
                  title="このデータを削除してもよろしいですか?"
                  ok-text="削除"
                  cancel-text="キャンセル"
                  @confirm="handleDelete(record.id)"
                  :getPopupContainer="
                    (trigger: HTMLElement) => trigger.parentNode
                  "
                >
                  <a-button class="delete-button" type="danger" size="small">
                    <DeleteOutlined />
                  </a-button>
                </a-popconfirm>
              </div>
            </div>
          </template>
          <template v-else-if="column.key === 'segment'">
            {{ record.segment.join(", ") }}
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IMember } from "@/types/member";
import type { IPagination } from "~/types";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import type { INotification } from "~/types/notification";
import { mockNotificationList } from "~/mock/notification";

interface FormState {
  memberName: string;
  email: string;
}
const router = useRouter();
const scrollY = computed(() => window.innerHeight - 200);
const tableData = ref<IPagination<INotification>>({
  dataSource: [],
  total: 0,
  current: 1,
  pageSize: 10,
  loading: false,
});

const columns = [
  {
    title: "お知らせID",
    dataIndex: "id",
    key: "id",
    width: 120,
  },
  {
    title: "タイトル",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "お知らせ内容",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "公開日時",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    width: 200,
    // fixed: "right",
  },
];

const onFinish = (values: any) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const handleDelete = (id: string) => {
  tableData.value.dataSource = tableData.value.dataSource.filter(
    (item) => item.id !== id,
  );
};

const handleEdit = (id: string) => {
  router.push({
    path: "/back-office/notification-management/registration",
    query: {
      id,
    },
  });
};

const getDepartmentList = async () => {
  tableData.value.loading = true;
  try {
    setTimeout(() => {
      tableData.value.dataSource = mockNotificationList;
      tableData.value.total = mockNotificationList.length;
      tableData.value.loading = false;
    }, 2000);
  } catch (error) {
  } finally {
  }
};

onMounted(() => {
  getDepartmentList();
});
</script>

<style scoped>
.search-form {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}
.operation-buttons {
  display: flex;
  gap: 12px;
}
.delete-button {
  background-color: red;
  color: #fff;
}
.delete-button:hover {
  opacity: 0.6;
}

.delete-button-container {
  width: 30px;
}

:deep(.ant-table-body) {
  min-height: 300px;
  /* overflow-y: auto !important; */
}

:deep(.ant-table-placeholder) {
  height: 300px;
}
</style>

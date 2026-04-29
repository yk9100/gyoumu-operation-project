<template>
  <div class="page-root">
    <GlobalHeader />
    <div class="page-content">
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
import type { IRole } from "~/types/permission";
import { MOCK_ROLE_LIST } from "~/mock/permission";

const router = useRouter();
const scrollY = computed(() => window.innerHeight - 300);
const tableData = ref<IPagination<IRole>>({
  dataSource: [],
  total: 0,
  current: 1,
  pageSize: 10,
  loading: false,
});

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 200,
  },
  {
    title: "役割",
    dataIndex: "roleName",
    key: "roleName",
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
    path: "/back-office/permission-management/registration",
    query: {
      id,
    },
  });
};

const getRoleList = async () => {
  tableData.value.loading = true;
  try {
    setTimeout(() => {
      tableData.value.dataSource = MOCK_ROLE_LIST;
      tableData.value.total = MOCK_ROLE_LIST.length;
      tableData.value.loading = false;
    }, 2000);
  } catch (error) {
  } finally {
  }
};

onMounted(() => {
  getRoleList();
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

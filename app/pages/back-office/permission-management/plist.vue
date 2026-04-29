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
      </a-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IMember } from "@/types/member";
import type { IPagination } from "~/types";
import type { IPermission } from "~/types/permission";
import { PERMISSION_LIST } from "~/mock/permission";

const scrollY = computed(() => window.innerHeight - 300);
const tableData = ref<IPagination<IPermission>>({
  dataSource: [],
  total: 0,
  current: 1,
  pageSize: 10,
  loading: false,
});

const columns = [
  {
    title: "顧客ID",
    dataIndex: "id",
    key: "id",
    width: 120,
  },
  {
    title: "権限名",
    dataIndex: "permissionName",
    key: "permissionName",
  },
  {
    title: "権限コード",
    dataIndex: "permissionCode",
    key: "permissionCode",
  },
];

const getPermissionList = async () => {
  tableData.value.loading = true;
  try {
    setTimeout(() => {
      tableData.value.dataSource = PERMISSION_LIST;
      tableData.value.total = PERMISSION_LIST.length;
      tableData.value.loading = false;
    }, 2000);
  } catch (error) {
  } finally {
  }
};

onMounted(() => {
  getPermissionList();
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

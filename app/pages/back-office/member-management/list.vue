<template>
  <div class="page-root">
    <GlobalHeader />
    <div class="page-content">
      <div class="search-form">
        <a-form
          :model="formState"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
          layout="inline"
        >
          <a-form-item label="メンバー姓" name="frontName">
            <a-input v-model:value="formState.memberName" />
          </a-form-item>
          <a-form-item label="メールアドレス" name="email">
            <a-input v-model:value="formState.email" />
          </a-form-item>
          <a-button type="primary" html-type="submit">絞り込み</a-button>
        </a-form>

        <a-upload
          :show-upload-list="false"
          :before-upload="memberImport"
          :accept="'.csv'"
        >
          <a-button type="primary">メンバーインポート</a-button>
        </a-upload>
      </div>

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
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import type { IMember } from "@/types/member";
import type { IPagination } from "~/types";
import { mockMemberList } from "~/mock/member";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import Papa from "papaparse";

interface FormState {
  memberName: string;
  email: string;
}
const router = useRouter();
const scrollY = computed(() => window.innerHeight - 300);
const tableData = ref<IPagination<IMember>>({
  dataSource: [],
  total: 0,
  current: 1,
  pageSize: 10,
  loading: false,
});

const formState = reactive<FormState>({
  memberName: "",
  email: "",
});

const columns = [
  {
    title: "メンバー番号",
    dataIndex: "id",
    key: "id",
    width: 120,
  },
  {
    title: "メンバー姓",
    dataIndex: "frontName",
    key: "frontName",
  },
  {
    title: "メールアドレス",
    dataIndex: "email",
    key: "email",
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
    path: "/back-office/member-management/registration",
    query: {
      id,
    },
  });
};

const getMemberList = async () => {
  tableData.value.loading = true;
  try {
    setTimeout(() => {
      tableData.value.dataSource = mockMemberList;
      tableData.value.total = mockMemberList.length;
      tableData.value.loading = false;
    }, 2000);
  } catch (error) {
  } finally {
  }
};

const memberImport = (file: File) => {
  console.log(file);
  tableData.value.loading = true;
  setTimeout(() => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log("解析结果:", results.data);
        console.log("错误信息:", results.errors);

        tableData.value.dataSource = (results.data as IMember[])
          .map((i, index) => {
            return {
              id: `test番号${index + 1}`,
              frontName: i.frontName,
              email: i.email,
            };
          })
          .concat(tableData.value.dataSource);
        tableData.value.loading = false;
      },
      error: (error) => {
        tableData.value.loading = false;
        console.error("解析失败:", error);
      },
    });
  }, 1000);
};

onMounted(() => {
  getMemberList();
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

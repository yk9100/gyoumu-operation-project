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
          <a-row class="form-row">
            <a-col class="form-col">
              <a-form-item label="企業名" name="enterpriseName">
                <a-input v-model:value="formState.enterpriseName" allowClear />
              </a-form-item>
              <a-form-item label="契約状態" name="contractStatus">
                <a-select
                  v-model:value="formState.contractStatus"
                  allowClear
                  style="width: 200px"
                >
                  <a-select-option value="契約手続中"
                    >契約手続中</a-select-option
                  >
                  <a-select-option value="契約中">契約中</a-select-option>
                  <a-select-option value="契約終了">契約終了</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="営業担当" name="salesPerson">
                <a-select
                  v-model:value="formState.salesPerson"
                  allowClear
                  style="width: 200px"
                >
                  <a-select-option value="営業担当A">営業担当A</a-select-option>
                  <a-select-option value="営業担当B">営業担当B</a-select-option>
                  <a-select-option value="営業担当C">営業担当C</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="btn-box">
              <a-button @click="handleReset">リセット </a-button>
              <a-button type="primary" html-type="submit">絞り込み</a-button>
            </a-col>
          </a-row>

          <a-row class="form-row">
            <a-col class="form-col">
              <a-form-item label="契約期" name="contractPeriod">
                <a-range-picker
                  v-model:value="formState.contractPeriod"
                  allowClear
                />
              </a-form-item>
            </a-col>
            <a-col class="btn-box">
              <a-button>ダウンロード</a-button>
              <a-button type="primary" html-type="submit">新規契約</a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div>
        <div class="result-count">
          契約結果：{{ tableData.dataSource.length }}件
        </div>
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
            (_record: IEnterprise, index: number) =>
              index % 2 === 1 ? 'table-striped' : null
          "
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'operation'">
              <div class="operation-buttons">
                <a-button @click="handleEdit(record.id)"> コピー </a-button>
                <a-button type="primary" @click="handleEdit(record.id)">
                  編集
                </a-button>
                <!-- <div class="delete-button-container">
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
                </div> -->
              </div>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IEnterprise } from "~/types/enterprise";
import type { IPagination } from "~/types";
import { useRouter } from "vue-router";
import { mockEnterpriseList } from "~/mock/enterprise";
import type { Dayjs } from 'dayjs';
type RangeValue = [Dayjs, Dayjs];

interface FormState {
  enterpriseName: string;
  contractStatus: string;
  salesPerson: string;
  contractPeriod?: RangeValue;
}
const router = useRouter();
const scrollY = computed(() => window.innerHeight - 300);

const tableData = ref<IPagination<IEnterprise>>({
  dataSource: [],
  total: 0,
  current: 1,
  pageSize: 10,
  loading: false,
});
const formState = ref<FormState>({
  enterpriseName: "",
  contractStatus: "",
  salesPerson: "",
});

const columns = [
  {
    title: "企業ID",
    dataIndex: "id",
    key: "id",
    width: 120,
    sorter: true,
  },
  {
    title: "企業名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "企業の担当名",
    dataIndex: "salesPerson",
    key: "salesPerson",
  },
  {
    title: "契約状態",
    dataIndex: "contractStatus",
    key: "contractStatus",
    sorter: true,
  },
  {
    title: "契約開始日",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "契約期限日",
    dataIndex: "endDate",
    key: "endDate",
  },
  {
    title: "営業担当",
    dataIndex: "operationSalesPerson",
    key: "operationSalesPerson",
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
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
    path: "/enterprise/registration",
    query: {
      id,
    },
  });
};

const getReferralList = async () => {
  tableData.value.loading = true;
  try {
    setTimeout(() => {
      tableData.value.dataSource = mockEnterpriseList;
      tableData.value.total = mockEnterpriseList.length;
      tableData.value.loading = false;
    }, 2000);
  } catch (error) {
  } finally {
  }
};

const handleReset = () => {
  formState.value = {
    enterpriseName: "",
    contractStatus: "",
    salesPerson: "",
  };
};

onMounted(() => {
  getReferralList();
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
.form-row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.form-col {
  display: flex;
  align-items: center;
  gap: 12px;
}
.btn-box {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-end;
}
.result-count {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin-bottom: 12px;
}
</style>

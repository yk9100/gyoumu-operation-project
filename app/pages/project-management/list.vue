<template>
  <div class="page-root">
    <GlobalHeader>
      <div class="header-button-box">
        <a-button>案件CSVインポート</a-button>
        <a-button>PJリストCSV出力</a-button>
        <a-button>帳票CSV出力</a-button>
        <a-button style="margin-right: 12px">案件CSV出力</a-button>
        <a-button type="primary" @click="handleRegistration">新規登録</a-button>
      </div>
    </GlobalHeader>
    <div class="page-content" ref="contentRef">
      <ProjectManagementFilter />

      <div>
        <a-table
          :columns="columns"
          :data-source="tableData.dataSource"
          :loading="tableData.loading"
          :scroll="{ x: scrollX }"
          :row-class-name="
            (_record: IProject, index: number) =>
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
              </div>
            </template>
          </template>
        </a-table>
      </div>
    </div>

    <div class="scroll-top-button" @click="handleScrollTop">
      <ArrowUpOutlined />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import type { IProject } from "~/types/project";
import type { IPagination } from "~/types";
import { projectMock } from "~/mock/project";
import {
  EditOutlined,
  DeleteOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

interface FormState {
  memberName: string;
  email: string;
}
const router = useRouter();
const scrollX = computed(() => 5000);
const scrollY = computed(() => window.innerHeight - 300);
const tableData = ref<IPagination<IProject>>({
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

const contentRef = ref<HTMLDivElement | null>(null);

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 100,
  },
  {
    title: "PJコード",
    dataIndex: "pjCode",
    key: "pjCode",
    width: 120,
  },
  {
    title: "案件番号",
    dataIndex: "caseNumber",
    key: "caseNumber",
    width: 120,
  },
  {
    title: "顧客",
    dataIndex: "kokyaku",
    key: "kokyaku",
    width: 150,
  },
  {
    title: "案件名",
    dataIndex: "caseName",
    key: "caseName",
    width: 200,
  },
  {
    title: "製品名",
    dataIndex: "productName",
    key: "productName",
    width: 150,
  },
  {
    title: "部署",
    dataIndex: "busyo",
    key: "busyo",
    width: 200,
  },
  {
    title: "PM",
    dataIndex: "pm",
    key: "pm",
    width: 100,
  },
  {
    title: "担当者",
    dataIndex: "tanntosya",
    key: "tanntosya",
    width: 100,
  },
  {
    title: "ステータス",
    dataIndex: "status",
    key: "status",
    width: 150,
  },
  {
    title: "受注日",
    dataIndex: "orderDate",
    key: "orderDate",
    width: 150,
  },
  {
    title: "開始日",
    dataIndex: "startDate",
    key: "startDate",
    width: 150,
  },
  {
    title: "納期",
    dataIndex: "deliveryDate",
    key: "deliveryDate",
    width: 150,
  },
  {
    title: "検収日",
    dataIndex: "inspectionDate",
    key: "inspectionDate",
    width: 150,
  },
  {
    title: "売上",
    dataIndex: "sales",
    key: "sales",
    width: 100,
  },
  {
    title: "サービス料",
    dataIndex: "serviceFee",
    key: "serviceFee",
    width: 100,
  },
  {
    title: "外注費",
    dataIndex: "outsourceFee",
    key: "outsourceFee",
    width: 100,
  },
  {
    title: "その他費用",
    dataIndex: "otherFee",
    key: "otherFee",
    width: 100,
  },
  {
    title: "紹介料",
    dataIndex: "introductionFee",
    key: "introductionFee",
    width: 100,
  },
  {
    title: "予算",
    dataIndex: "budgetFee",
    key: "budgetFee",
    width: 100,
  },
  {
    title: "予算率",
    dataIndex: "budgetRate",
    key: "budgetRate",
    width: 100,
  },
  {
    title: "見込み売上",
    dataIndex: "expectedSales",
    key: "expectedSales",
    width: 100,
  },
  {
    title: "見込みサービス料",
    dataIndex: "expectedServiceFee",
    key: "expectedServiceFee",
    width: 150,
  },
  {
    title: "見込み外注費",
    dataIndex: "expectedOutsourceFee",
    key: "expectedOutsourceFee",
    width: 120,
  },
  {
    title: "見込み仕入費",
    dataIndex: "expectedSiireFee",
    key: "expectedSiireFee",
    width: 120,
  },
  {
    title: "見込み紹介料",
    dataIndex: "expectedSyoukaiFee",
    key: "expectedSyoukaiFee",
    width: 120,
  },
  {
    title: "見込み粗利",
    dataIndex: "見込み粗利",
    key: "見込み粗利",
    width: 100,
  },
  {
    title: "見込み粗利率",
    dataIndex: "見込み粗利率",
    key: "見込み粗利率",
    width: 120,
  },
  {
    title: "現在の粗利",
    dataIndex: "現在の粗利",
    key: "現在の粗利",
    width: 100,
  },
  {
    title: "現在の粗利率",
    dataIndex: "現在の粗利率",
    key: "現在の粗利率",
    width: 120,
  },
  {
    title: "見積書",
    dataIndex: "見積書",
    key: "見積書",
    width: 80,
  },
  {
    title: "注文書",
    dataIndex: "注文書",
    key: "注文書",
    width: 80,
  },
  {
    title: "検収書",
    dataIndex: "検収書",
    key: "検収書",
    width: 80,
  },
  {
    title: "開発完了",
    dataIndex: "開発完了",
    key: "開発完了",
    width: 80,
  },
  {
    title: "前金請求書",
    dataIndex: "前金請求書",
    key: "前金請求書",
    width: 100,
  },
  {
    title: "請求書",
    dataIndex: "請求書",
    key: "請求書",
    width: 80,
  },
  {
    title: "登録日",
    dataIndex: "登録日",
    key: "登録日",
    width: 100,
  },
  {
    title: "更新日",
    dataIndex: "更新日",
    key: "更新日",
    width: 100,
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
    path: "/project-management/registration",
    query: {
      id,
    },
  });
};

const getProjectList = async () => {
  tableData.value.loading = true;
  try {
    setTimeout(() => {
      tableData.value.dataSource = projectMock;
      tableData.value.total = projectMock.length;
      tableData.value.loading = false;
    }, 2000);
  } catch (error) {
  } finally {
  }
};

const handleRegistration = () => {
  router.push({
    path: "/project-management/registration",
  });
};

const handleScrollTop = () => {
  if (contentRef.value) {
    contentRef.value.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

onMounted(() => {
  getProjectList();
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

.header-button-box {
  display: flex;
  gap: 12px;
}

.scroll-top-button {
  cursor: pointer;
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #1890ff;
  color: #fff;
  z-index: 1000;
}
.scroll-top-button:hover {
  background-color: #1469d5;
}

:deep(.ant-pagination) {
  justify-content: flex-start;
}
</style>

<template>
  <div class="page-root">
    <GlobalHeader />
    <div class="page-content">
      <div class="form-title">なまえ</div>
      <div>
        <span class="userName">山田太郎</span
        ><a-button type="primary" @click="passwordEditing = true"
          >password変更</a-button
        >
      </div>
      <div v-if="passwordEditing" class="password-input-wrap">
        <span>password:</span
        ><a-input
          type="password"
          placeholder="パスワードを入力してください"
          v-model:value="password"
          style="width: 240px"
        />
        <a-button @click="passwordEditing = false">Cancel</a-button>
        <a-button type="primary" @click="handleSubmit">OK </a-button>
      </div>

      <div class="form-title">未承認</div>
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
        @change="handleTableChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TableProps } from "ant-design-vue";

const password = ref("");
const passwordEditing = ref(false);

const columns = ref([
  {
    title: "案件番号",
    dataIndex: "projectId",
    key: "projectId",
  },
  {
    title: "申請区分",
    dataIndex: "applicationType",
    key: "applicationType",
  },
  {
    title: "案件名",
    dataIndex: "projectName",
    key: "projectName",
  },
  {
    title: "顧客",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "申込者",
    dataIndex: "applicant",
    key: "applicant",
  },
  {
    title: "承認受信日",
    dataIndex: "approvalDate",
    key: "approvalDate",
    sorter: true,
  },
]);

const dataSource = ref([
  {
    projectId: "123456",
    applicationType: "新規",
    projectName: "案件1",
    customer: "顧客1",
    applicant: "申込者1",
    approvalDate: "2023-01-01",
  },
  {
    projectId: "123457",
    applicationType: "新規",
    projectName: "案件2",
    customer: "顧客2",
    applicant: "申込者2",
    approvalDate: "2023-02-01",
  },
  {
    projectId: "123458",
    applicationType: "新規",
    projectName: "案件3",
    customer: "顧客3",
    applicant: "申込者3",
    approvalDate: "2023-03-01",
  },
]);

const handleTableChange: TableProps["onChange"] = (
  pag: { pageSize?: number; current?: number },
  filters: any,
  sorter: any,
) => {
  console.log("handleTableChange", pag, filters, sorter);
};

const handleSubmit = () => {
  passwordEditing.value = false;
  // todo: password変更を実行
};
</script>

<style scoped>
.form-title {
  padding: 8px 0;
  font-size: 16px;
  font-weight: bold;
  border-top: 2px solid #e8e8e8;
  margin-top: 12px;
}
.userName {
  font-size: 14px;
  margin-right: 8px;
}
.password-input-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}
</style>

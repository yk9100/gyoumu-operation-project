<template>
  <div class="page-root">
    <GlobalHeader />
    <div class="page-content">
      <a-spin :spinning="loading">
        <div class="search-container">
          <a-input
            placeholder="顧客名検索"
            v-model:value="customerName"
            style="width: 240px"
          />
          <a-button type="primary" @click="handleSubmit">
            <SearchOutlined />
            検索</a-button
          >
        </div>
        <div class="result-count">検索結果合計：{{ dataSource.length }}</div>
        <a-table
          :columns="columns"
          :data-source="dataSource"
          :pagination="pagination"
          @change="handleTableChange"
          :row-class-name="
            (_record: any, index: number) =>
              index % 2 === 1 ? 'table-striped' : null
          "
          :scroll="{ y: scrollY }"
        />
      </a-spin>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TableProps } from "ant-design-vue";
import { SearchOutlined } from "@ant-design/icons-vue";

const customerName = ref("");
const loading = ref(false);
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 10,
});

const scrollY = computed(() => window.innerHeight - 340);
const scrollX = computed(() => window.innerWidth - 240);

const columns = ref([
  {
    title: "顧客名",
    dataIndex: "customerName",
    key: "customerName",
    width: 200,
  },
  {
    title: "郵便番号",
    dataIndex: "postalCode",
    key: "postalCode",
    width: 100,
  },
  {
    title: "住所",
    dataIndex: "address",
    key: "address",
    width: 400,
  },
  {
    title: "TDB評点",
    dataIndex: "tdbRating",
    key: "tdbRating",
    width: 100,
  },
  {
    title: "与信ランク",
    dataIndex: "sendRank",
    key: "sendRank",
    width: 100,
  },
  {
    title: "反社チェック",
    dataIndex: "isBlacklisted",
    key: "isBlacklisted",
    width: 100,
  },
  {
    title: "残り与信枠",
    dataIndex: "remainingSendQuota",
    key: "remainingSendQuota",
    width: 100,
  },
  {
    title: "総受注額",
    dataIndex: "totalOrderAmount",
    key: "totalOrderAmount",
    width: 150,
  },
]);

const dataSource = ref([
  {
    customerName: "顧客1",
    postalCode: "123456",
    address:
      "東京都東京都東京都東京都東京都東京都東京都東京都東京都東京都東京都",
    tdbRating: "高",
    sendRank: "1",
    isBlacklisted: "否",
    remainingSendQuota: "1000",
    totalOrderAmount: "1000000",
  },
  {
    customerName: "顧客2",
    postalCode: "123457",
    address: "大阪府",
    tdbRating: "中",
    sendRank: "2",
    isBlacklisted: "否",
    remainingSendQuota: "2000",
    totalOrderAmount: "20000000",
  },
  {
    customerName: "顧客3",
    postalCode: "123458",
    address: "大阪府",
    tdbRating: "中",
    sendRank: "2",
    isBlacklisted: "否",
    remainingSendQuota: "2000",
    totalOrderAmount: "20000000000",
  },
  {
    customerName: "顧客4",
    postalCode: "123459",
    address: "大阪府",
    tdbRating: "中",
    sendRank: "2",
    isBlacklisted: "否",
    remainingSendQuota: "2000",
    totalOrderAmount: "20000000000",
  },
  {
    customerName: "顧客5",
    postalCode: "123460",
    address: "大阪府",
    tdbRating: "中",
    sendRank: "2",
    isBlacklisted: "否",
    remainingSendQuota: "2000",
    totalOrderAmount: "20000000000",
  },
  {
    customerName: "顧客6",
    postalCode: "123461",
    address: "大阪府",
    tdbRating: "中",
    sendRank: "2",
    isBlacklisted: "否",
    remainingSendQuota: "2000",
    totalOrderAmount: "20000000000",
  },
  {
    customerName: "顧客7",
    postalCode: "123462",
    address: "大阪府",
    tdbRating: "中",
    sendRank: "2",
    isBlacklisted: "否",
    remainingSendQuota: "2000",
    totalOrderAmount: "20000000000",
  },
  {
    customerName: "顧客8",
    postalCode: "123463",
    address: "大阪府",
    tdbRating: "中",
    sendRank: "2",
    isBlacklisted: "否",
    remainingSendQuota: "2000",
    totalOrderAmount: "20000000000",
  },
  {
    customerName: "顧客9",
    postalCode: "123464",
    address: "大阪府",
    tdbRating: "中",
    sendRank: "2",
    isBlacklisted: "否",
    remainingSendQuota: "2000",
    totalOrderAmount: "20000000000",
  },
  {
    customerName: "顧客10",
    postalCode: "123465",
    address: "大阪府",
    tdbRating: "中",
    sendRank: "2",
    isBlacklisted: "否",
    remainingSendQuota: "2000",
    totalOrderAmount: "20000000000",
  },
]);

const handleTableChange: TableProps["onChange"] = (
  pag: { pageSize?: number; current?: number },
  filters: any,
  sorter: any,
) => {
  console.log("handleTableChange", pag, filters, sorter);
};

const handleSubmit = () => {};
</script>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 12px;
}
.result-count {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}
</style>

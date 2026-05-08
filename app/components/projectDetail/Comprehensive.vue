<template>
  <div>
    <div class="header">
      <div class="title">七年前の約束が呼び覚ました沈黙の証人</div>
      <div class="copy-btn-wrap">
        <button class="copy-btn">コピーを作成</button>
      </div>
    </div>
    <div>
      <div class="sub-title">工数</div>
      <div class="table-wrap">
        <a-table
          :columns="kousuuColumns"
          :data-source="kousuuDataSource"
          :pagination="false"
        />
      </div>
    </div>

    <div>
      <div class="sub-title">成績</div>
      <div class="section-btn-wrap">
        <a-button>編集</a-button>
      </div>
      <div class="table-wrap">
        <a-table
          :columns="seisekiColumns"
          :data-source="seisekiDataSource"
          :pagination="false"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const kousuuColumns = ref([
  {
    title: "名前",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "予定工数（人日）",
    dataIndex: "estimatedWorkHours",
    key: "estimatedWorkHours",
  },
  {
    title: "実工数（人日）",
    dataIndex: "actualWorkHours",
    key: "actualWorkHours",
  },
  {
    title: "予定率",
    dataIndex: "estimatedRate",
    key: "estimatedRate",
  },
]);
const kousuuDataSource = ref([
  {
    name: "山田太郎",
    estimatedWorkHours: "10",
    actualWorkHours: "8",
    estimatedRate: "80%",
  },
  {
    name: "山田太郎",
    estimatedWorkHours: "10",
    actualWorkHours: "8",
    estimatedRate: "80%",
  },
  {
    name: "山田太郎",
    estimatedWorkHours: "10",
    actualWorkHours: "8",
    estimatedRate: "80%",
  },
]);
const seisekiColumns = ref([
  {
    title: "項目",
    dataIndex: "item",
    key: "item",
  },
  {
    title: "予算",
    dataIndex: "estimatedBudget",
    key: "estimatedBudget",
  },
  {
    title: "見込み",
    dataIndex: "estimatedOutsourcingBudget",
    key: "estimatedOutsourcingBudget",
  },
  {
    title: "差異",
    dataIndex: "difference",
    key: "difference",
  },
]);
const seisekiDataSource = ref([
  {
    item: "売上",
    estimatedBudget: "80",
    estimatedOutsourcingBudget: "80",
    difference: "0",
  },
  {
    item: "外注費",
    estimatedBudget: "80",
    estimatedOutsourcingBudget: "80",
    difference: "0",
  },
  {
    item: "労務費",
    estimatedBudget: "80",
    estimatedOutsourcingBudget: "80",
    difference: "0",
  },
  {
    item: "その他原価",
    estimatedBudget: "80",
    estimatedOutsourcingBudget: "80",
    difference: "0",
  },
  {
    item: "紹介手数料",
    estimatedBudget: "80",
    estimatedOutsourcingBudget: "80",
    difference: "0",
  },
  {
    item: "粗利",
    estimatedBudget: "80",
    estimatedOutsourcingBudget: "80",
    difference: "0",
  },
  {
    item: "粗利率",
    estimatedBudget: "80",
    estimatedOutsourcingBudget: "80",
    difference: "0",
  },
  {
    item: "社内間発注",
    estimatedBudget: "80",
    estimatedOutsourcingBudget: "80",
    difference: "0",
  },
  {
    item: "PJ最終利益",
    estimatedBudget: "80",
    estimatedOutsourcingBudget: "80",
    difference: "0",
  },
]);
</script>

<style scoped>
.section-btn-wrap {
  display: flex;
  justify-content: flex-end;
}
.copy-btn-wrap {
  display: flex;
  justify-content: flex-end;
}
.copy-btn {
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #fa8c16;
  color: #fff;
  border: none;
  cursor: pointer;
}

.copy-btn:hover {
  opacity: 0.8;
}
.title {
  font-size: 24px;
  font-weight: bold;
}
.header {
  padding: 0 12px;
  margin-bottom: 12px;
}
.sub-title {
  font-size: 14px;
  font-weight: bold;
  border-top: 2px solid #e1e1e1;
  padding: 8px 0;
  text-indent: 4px;
}
.table-wrap {
  padding: 12px;
}
</style>

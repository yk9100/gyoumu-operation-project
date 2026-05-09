<template>
  <div class="base-info">
    <div
      v-for="(value, key, index) in baseInfo"
      :key="index"
      class="info-row"
      :class="{ 'row-striped': index % 2 === 1 }"
    >
      <div class="info-key">
        {{ key }}
      </div>
      <div class="info-value">
        {{ value }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const baseInfo = ref<Record<string, string>>({
  プロジェクトID: "ID123456",
  PJコード: "PJ123456",
  プロダクト名: "プロジェクト名",
  登録日: "2023-01-01",
  PM: "PM123456",
  営業担当者: "営業担当者",
  部署: "部署",
  注文日: "2023-01-01",
  開発開始予定日: "2023-01-01",
  納品予定日: "2023-01-01",
  検収予定日: "2023-01-01",
  ステータス: "進行中",
  顧客: "顧客名",
  担当者: "担当者名",
  宛名: "宛名",
  リンク: "スプレッドシート",
  詳細: "詳細詳細",
  契約書リスク影響チェック: "チェック",
  契約書リスク影響ありまたはなしと判断した理由: "その他",
});
</script>

<style scoped>
.base-info {
  width: 100%;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
}

.info-row {
  display: flex;
  width: 100%;
  min-height: 48px;
  transition: background-color 0.2s ease;
}

.info-row:hover {
  background-color: #f0f7ff;
}

.row-striped {
  background-color: #fafafa;
}

.row-striped:hover {
  background-color: #f0f7ff;
}

.info-key {
  flex-shrink: 0;
  width: 200px;
  padding: 12px 16px;
  background-color: #f5f5f5;
  border-right: 1px solid #e8e8e8;
  font-weight: 500;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  word-break: break-word;
  overflow-wrap: break-word;
}

.row-striped .info-key {
  background-color: #f0f0f0;
}

.info-value {
  flex: 1;
  padding: 12px 16px;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  word-break: break-word;
  overflow-wrap: break-word;
}

.edit-btn-wrap {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
}
</style>

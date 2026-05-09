<template>
  <div>
    <div class="form-title">注文</div>
    <div class="form-container">
      <a-row class="form-item">
        <a-col :span="4">お知らせ先：</a-col>
        <a-col :span="16">
          <a-select v-model:value="notificationTarget" style="width: 200px">
            <a-option value="仕入先1">仕入先1</a-option>
            <a-option value="仕入先2">仕入先2</a-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row class="form-item">
        <a-col :span="4">お知らせ内容：</a-col>
        <a-col :span="16">
          <a-textarea
            v-model:value="notificationContent"
            style="min-height: 150px"
            placeholder="コメント、連絡事項の入力"
          />
        </a-col>
      </a-row>
      <a-row class="form-item">
        <a-col :span="4">処理ステータス：</a-col>
        <a-col :span="16">
          <a-select v-model:value="notificationStatus" style="width: 200px">
            <a-select-option value="注文書発行依頼中"
              >注文書発行依頼中</a-select-option
            ><a-select-option value="注文書未回収"
              >注文書未回収</a-select-option
            >
            <a-select-option value="注文書回収済み"
              >注文書回収済み</a-select-option
            >
            <a-select-option value="完了">完了</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row class="form-item">
        <a-col :span="4">注文日：</a-col>
        <a-col :span="16">
          <a-date-picker v-model:value="notificationDate" type="date" />
        </a-col>
      </a-row>
      <div class="form-item">
        <div style="color: red">＊注文書記載の注文日を書いてください</div>
      </div>
      <div class="form-item">
        <a-button>注文をダウンロード</a-button>
      </div>
      <div class="form-item">
        <FileUploadArea />
      </div>
      <div class="form-item" style="text-align: center">
        <a-button type="primary">保存</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const notificationTarget = ref("");
const notificationContent = ref("");
const notificationStatus = ref("");
const notificationDate = ref("");
</script>

<style scoped>
.form-title {
  padding: 8px 0;
  font-size: 16px;
  font-weight: bold;
  border-top: 2px solid #e8e8e8;
}
.form-container {
  padding: 12px;
}
.form-item {
  margin-bottom: 12px;
}
</style>

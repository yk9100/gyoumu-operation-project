<template>
  <div>
    <div class="form-title">開発完了</div>
    <div class="form-container">
      <a-row class="form-item">
        <a-col style="display: flex; align-items: center"
          >開発またはライセンス発行完了：</a-col
        >
        <a-col :span="16">
          <a-checkbox v-model:value="state.isDevelopmentCompleted">
          </a-checkbox>
        </a-col>
      </a-row>
      <a-row class="form-item">
        <a-col :span="4">納品日：</a-col>
        <a-col :span="16">
          <a-date-picker v-model:value="state.deliveryDate" type="date" />
        </a-col>
      </a-row>
      <a-row class="form-item">
        <a-col :span="4">請求書発行：</a-col>
        <a-col :span="16">
          <a-radio-group v-model:value="state.invoiceStatus">
            <a-radio value="確認中">確認中</a-radio
            ><a-radio value="OK">OK</a-radio>
          </a-radio-group>
        </a-col>
      </a-row>
      <a-row class="form-item" style="flex-direction: column">
        <div class="tip">
          支払サイト：<span class="tip-mark">月末締め翌月末払い</span>
        </div>
        <div class="tip">
          請求書必着日：<span class="tip-mark">何も登録されていません</span>
        </div>
      </a-row>
      <a-row class="form-item">
        <a-col :span="4">請求書発行日付：</a-col>
        <a-col :span="16">
          <a-date-picker
            v-model:value="state.invoiceDeliveryDate"
            type="date"
            style="margin-bottom: 4px"
          />
          <div class="gray-tip">
            請求書発行日付を記載してください。入金期日は原則月末締め翌月払いです。
          </div>
        </a-col>
      </a-row>
      <a-row class="form-item">
        <a-col :span="4">入金予定日：</a-col>
        <a-col :span="16">
          <a-date-picker
            v-model:value="state.paymentDate"
            type="date"
            style="margin-bottom: 4px"
          />
          <div class="red-tip">
            設定された支払サイトに応じて、自動入力されます。
          </div>
          <div class="red-tip">
            設定していない場合は、「月末締め翌月末払い」で自動入力されます。
          </div>
        </a-col>
      </a-row>
      <a-row class="form-item">
        <a-col :span="4">振り返り：</a-col>
        <a-col :span="16">
          <a-textarea
            v-model:value="state.feedback"
            type="date"
            style="min-height: 150px; margin-bottom: 4px"
          />
          <div class="gray-tip">
            粗利率25%以下の理由や、プロジェクトの振り返りを記入。
          </div>
        </a-col>
      </a-row>
      <div class="form-item" style="text-align: center">
        <a-button type="primary">保存</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const state = ref({
  isDevelopmentCompleted: false,
  deliveryDate: "",
  invoiceStatus: "確認中",
  invoiceDeliveryDate: "",
  paymentDate: "",
  feedback: "",
});
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
.tip {
  font-size: 12px;
  display: flex;
  align-items: center;
}
.tip-mark {
  color: red;
}
.gray-tip {
  font-size: 12px;
  color: #888;
}
.red-tip {
  font-size: 12px;
  color: red;
}
</style>

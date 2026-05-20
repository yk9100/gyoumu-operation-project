<template>
  <div>
    <div class="form-container">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 8 }"
        autocomplete="off"
      >
        <div class="title-info">各種手続の状況（基本契約書）</div>
        <a-form-item label="お知らせ先" name="notificationReceiver" required>
          <a-select
            v-model:value="formState.notificationReceiver"
            placeholder="選択してください"
            allowClear
          >
            <a-select-option value="お知らせ先1">お知らせ先1</a-select-option>
            <a-select-option value="お知らせ先2">お知らせ先2</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="お知らせ内容" name="notificationContent" required>
          <a-textarea
            v-model:value="formState.notificationContent"
            placeholder="コメントを入力してください"
            allowClear
          />
        </a-form-item>
        <a-form-item
          label="処理ステータス"
          name="hannsyaNotificationStatus"
          required
        >
          <a-select
            v-model:value="formState.hannsyaNotificationStatus"
            placeholder="選択してください"
            :options="HANNSYYA_NOTIFICATION_STATUS_OPTIONS"
            allowClear
          />
        </a-form-item>
        <a-form-item label="基本契約書" name="contract" required>
          <a-upload
            v-model:fileList="formState.contract"
            name="logo"
            action="/upload.do"
            list-type="picture"
            accept=".doc,.docx,.pdf,.xlsx,.xls"
          >
            <a-button>
              <template #icon><UploadOutlined /></template>
              word,pdf,excelファイルをアップロードしてください
            </a-button>
          </a-upload>
        </a-form-item>
        <div class="footer-button-group" `>
          <!-- <a-button> 下書き保存 </a-button> -->
          <a-button type="primary" html-type="submit"> 登録 </a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UploadOutlined } from "@ant-design/icons-vue";
import { HANNSYYA_NOTIFICATION_STATUS_OPTIONS } from "@/common/enterprise";

const formState = ref({
  notificationReceiver: "",
  notificationContent: "",
  hannsyaNotificationStatus: undefined,
  contract: [],
});
</script>

<style scoped>
.title-info {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
}
.button-group {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
}
.form-container {
  height: calc(100vh - 240px);
  overflow-y: auto;
}
.footer-button-group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 36px;
}
</style>

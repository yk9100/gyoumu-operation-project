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
        <div class="title-info">各種手続の状況（反社チェック）</div>
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
        <a-form-item label="チェック結果" name="checkResult">
          <a-radio-group v-model:value="formState.checkResult">
            <a-radio value="OK"> OK </a-radio>
            <a-radio value="NG"> NG </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label=" " name="checkComment">
          <a-textarea
            v-model:value="formState.checkComment"
            placeholder="コメントを入力してください"
            allowClear
          />
        </a-form-item>

        <div class="footer-button-group" `>
          <!-- <a-button> 下書き保存 </a-button> -->
          <a-button type="primary" html-type="submit" @click="handleSubmit">
            登録
          </a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { HANNSYYA_NOTIFICATION_STATUS_OPTIONS } from "@/common/enterprise";
const router = useRouter();
const formState = ref({
  notificationReceiver: "",
  notificationContent: "",
  hannsyaNotificationStatus: undefined,
  checkResult: "OK",
  checkComment: "",
});

const handleSubmit = async () => {
  router.push({
    query: {
      step: "contract",
    },
  });
};
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

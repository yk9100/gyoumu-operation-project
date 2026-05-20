<template>
  <div>
    <div class="button-group">
      <a-button type="primary">空のフォマード出力</a-button>
      <a-button type="primary">アップロード</a-button>
    </div>
    <div class="form-container">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 8 }"
        autocomplete="off"
      >
        <div class="title-info">基本情報</div>
        <a-form-item label="企業名" name="enterpriseName" required>
          <a-input
            v-model:value="formState.enterpriseName"
            placeholder="企業名を入力してください"
            allowClear
          />
        </a-form-item>
        <a-form-item label="企業名の読み" name="enterpriseNameReading" required>
          <a-input
            v-model:value="formState.enterpriseNameReading"
            placeholder="カタカナを入力してください"
            allowClear
          />
        </a-form-item>
        <a-form-item label="会社の住所" name="enterpriseAddress" required>
          <a-input
            v-model:value="formState.enterpriseAddress"
            placeholder="都道府県〜部屋番号までの詳細住所入力してください"
            allowClear
          />
        </a-form-item>
        <a-form-item label="会社の規模" name="enterpriseScale">
          <a-select
            v-model:value="formState.enterpriseScale"
            placeholder="従業員数を選択してください"
            :options="ENTERPRISE_SCALE_OPTIONS"
            allowClear
          /> </a-form-item
        ><a-form-item name="enterpriseCommunication" required>
          <template #label>
            <div>
              会社の与信調査結果
              <a-tooltip placement="top">
                <template #title>
                  <div>
                    <div style="font-size: 14px">与信調査の説明</div>
                    <p style="font-size: 12px">
                      主に取引先の支払能力の確認や与信限度額（取引相手ごとに定める債権の上限額）の判定、反社会的勢力との関わりの有無のチェックなどで実施します。
                      信用調査を実施することで、新たにビジネスや取引を開始する際に生じる各種リスクを軽減できるでしょう。
                    </p>
                  </div>
                </template>
                <QuestionCircleOutlined />
              </a-tooltip>
            </div>
          </template>
          <a-select
            v-model:value="formState.enterpriseCommunication"
            placeholder="与信調査結果を選択してください"
            :options="ENTERPRISE_COMMUNICATION_STATUS_OPTIONS"
            allowClear
          />
        </a-form-item>
        <a-form-item label="企業の担当" name="operationSalesPerson" required>
          <a-input
            v-model:value="formState.operationSalesPerson"
            placeholder="姓＋スペース＋名前を入力してください"
            allowClear
          />
        </a-form-item>
        <a-form-item
          label="担当名の読み方"
          name="operationSalesPersonReading"
          required
        >
          <a-input
            v-model:value="formState.operationSalesPersonReading"
            placeholder="カタカナを入力してください"
            allowClear
          />
        </a-form-item>
        <a-form-item label="部署名" name="departmentName">
          <a-input
            v-model:value="formState.departmentName"
            placeholder="正式の部署名を入力してください"
            allowClear
          />
        </a-form-item>
        <a-form-item label="肩書き" name="position">
          <a-select
            v-model:value="formState.position"
            placeholder="肩書きを選択してください"
            :options="POSITION_OPTIONS"
            allowClear
          />
        </a-form-item>
        <a-form-item label="メールアドレス" name="email" required>
          <a-input
            v-model:value="formState.email"
            placeholder="メールアドレスを入力してください"
            allowClear
          />
        </a-form-item>
        <a-form-item label="電話番号" name="phone" required>
          <a-input
            v-model:value="formState.phone"
            placeholder="会社用の電話番号（例：03-12345678）を入力してください"
            allowClear
          />
        </a-form-item>
        <a-form-item label="契約状態" name="contractStatus" required>
          <a-select
            v-model:value="formState.contractStatus"
            placeholder="契約状態を選択してください"
            :options="CONTRACT_STATUS_OPTIONS"
            allowClear
          />
        </a-form-item>
        <a-form-item label="プラン" name="plan" required>
          <a-checkbox-group
            v-model:value="formState.plan"
            placeholder="プランを選択してください"
            :options="PLAN_OPTIONS"
            allowClear
          />
        </a-form-item>
        <a-form-item label="契約期間" name="contractPeriod" required>
          <a-radio-group
            v-model:value="formState.contractPeriod"
            placeholder="契約期間を選択してください"
            :options="CONTRACT_PERIOD_OPTIONS"
            allowClear
          />
        </a-form-item>
        <a-form-item label="契約開始日" name="startDate" required>
          <a-date-picker
            v-model:value="formState.startDate"
            placeholder="契約開始日を選択してください"
            style="width: 300px"
            :disabled-date="disabledStartDate"
            allowClear
          />
        </a-form-item>
        <a-form-item label="契約期限日">
          <a-input :value="endDate" disabled />
        </a-form-item>
        <a-form-item label="ホームページ">
          <a-input
            v-model:value="formState.homePage"
            placeholder="ホームページを入力してください"
            allowClear
          />
        </a-form-item>

        <div class="title-info">請求情報</div>
        <a-form-item label="担当者名" required>
          <a-input
            v-model:value="formState.requester_name"
            placeholder="請求処理担当の名前を入力してください"
            allowClear
          />
        </a-form-item>
        <a-form-item label="部署名" required>
          <a-input
            v-model:value="formState.requester_departmentName"
            placeholder="部署名を入力してください"
            allowClear
          />
        </a-form-item>
        <a-form-item label="メールアドレス" required>
          <a-input
            v-model:value="formState.requester_email"
            placeholder="メールアドレスを入力してください"
            allowClear
          />
        </a-form-item>
        <a-form-item label="郵便番号" required>
          <a-input
            v-model:value="formState.requester_postalCode"
            placeholder="郵便番号を入力してください"
            allowClear
          />
        </a-form-item>
        <a-form-item label="送り先" required>
          <a-input
            v-model:value="formState.requester_address"
            placeholder="送り先を入力してください"
            allowClear
          />
        </a-form-item>
        <a-form-item label="請求方法" required>
          <a-radio-group
            v-model:value="formState.requester_method"
            placeholder="請求方法を選択してください"
            :options="REQUEST_METHOD_OPTIONS"
          />
        </a-form-item>

        <div class="title-info">社内担当情報</div>
        <a-form-item label="営業担当" required>
          <a-select
            v-model:value="formState.syanai_salesPerson"
            placeholder="営業担当を選択してください"
            allowClear
          >
            <a-select-option value="営業担当1"> 営業担当1 </a-select-option>
            <a-select-option value="営業担当2"> 営業担当2 </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="部署名" required>
          <a-input
            v-model:value="formState.syanai_departmentName"
            placeholder="部署名を入力してください"
            allowClear
          />
        </a-form-item>
        <div class="footer-button-group" `>
          <a-button> 下書き保存 </a-button>
          <a-button type="primary" html-type="submit" @click="handleSubmit">
            登録
          </a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import {
  ENTERPRISE_SCALE_OPTIONS,
  ENTERPRISE_COMMUNICATION_STATUS_OPTIONS,
  POSITION_OPTIONS,
  CONTRACT_STATUS_OPTIONS,
  PLAN_OPTIONS,
  CONTRACT_PERIOD_OPTIONS,
  REQUEST_METHOD_OPTIONS,
} from "@/common/enterprise";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

const router = useRouter();
const formState = ref({
  enterpriseName: "",
  enterpriseNameReading: "",
  enterpriseAddress: "",
  enterpriseScale: undefined,
  enterpriseCommunication: undefined,
  operationSalesPerson: "",
  operationSalesPersonReading: "",
  departmentName: "",
  position: undefined,
  email: "",
  phone: "",
  contractStatus: undefined,
  plan: [],
  contractPeriod: 3,
  startDate: undefined,
  homePage: "",
  requester_name: "",
  requester_departmentName: "",
  requester_email: "",
  requester_postalCode: "",
  requester_address: "",
  requester_method: "月々の翌月末",
  syanai_salesPerson: undefined,
  syanai_departmentName: "",
});

const endDate = computed(() => {
  if (!formState.value.startDate) {
    return "";
  }
  return dayjs(formState.value.startDate)
    .add(formState.value.contractPeriod, "month")
    .format("YYYY-MM-DD");
});

const disabledStartDate = (current: Dayjs) => {
  // Can not select days before today and today
  return current && current < dayjs().startOf("day");
};

const handleSubmit = async () => {
  router.push({
    query: {
      step: "ndaContract",
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

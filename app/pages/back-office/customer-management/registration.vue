<template>
  <a-spin :spinning="spinning">
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 8 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="顧客名"
        name="customerName"
        :rules="[{ required: true, message: '顧客名を入力してください' }]"
      >
        <a-input v-model:value="formState.customerName" />
      </a-form-item>
      <a-form-item
        label="郵便番号"
        name="postalCode"
        :rules="[{ required: true, message: '郵便番号を入力してください' }]"
      >
        <a-input v-model:value="formState.postalCode" />
      </a-form-item>
      <a-form-item
        label="住所"
        name="address"
        :rules="[{ required: true, message: '住所を入力してください' }]"
      >
        <a-input v-model:value="formState.address" />
      </a-form-item>
      <a-form-item
        label="ビル名"
        name="buildingName"
        :rules="[{ required: true, message: 'ビル名を入力してください' }]"
      >
        <a-input v-model:value="formState.buildingName" />
      </a-form-item>
      <a-form-item
        label="TDB評点"
        name="tdbRating"
        :rules="[{ required: true, message: 'TDB評点を入力してください' }]"
      >
        <a-input v-model:value="formState.tdbRating" />
      </a-form-item>
      <a-form-item name="rankLevel" label="与信ランク" required>
        <a-input v-model:value="formState.rankLevel" />
      </a-form-item>

      <a-form-item name="rankLevel" label="与信ランク変更" required>
        <a-select v-model:value="formState.rankLevel">
          <a-select-option value="A">A</a-select-option>
          <a-select-option value="B">B</a-select-option>
          <a-select-option value="C">C</a-select-option>
          <a-select-option value="D">D</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="isCompany" label="反社チェック" required>
        <a-radio-group v-model:value="formState.isCompany">
          <a-radio value="false">未</a-radio>
          <a-radio value="true">済</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item name="memo" label="メモ">
        <a-textarea v-model:value="formState.memo" />
      </a-form-item>

      <a-form-item name="paymentSite" label="支払サイト">
        <a-form-item class="vertical-form-item" name="lineDay" label="締め日">
          <a-select v-model:value="formState.lineDay">
            <a-select-option value="lineDay1">締め日1</a-select-option>
            <a-select-option value="lineDay2">締め日2</a-select-option>
            <a-select-option value="lineDay3">締め日3</a-select-option>
            <a-select-option value="lineDay4">締め日4</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          class="vertical-form-item"
          name="paymentMonth"
          label="支払月"
        >
          <a-select v-model:value="formState.paymentMonth">
            <a-select-option value="paymentMonth1">支払月1</a-select-option>
            <a-select-option value="paymentMonth2">支払月2</a-select-option>
            <a-select-option value="paymentMonth3">支払月3</a-select-option>
            <a-select-option value="paymentMonth4">支払月4</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          class="vertical-form-item"
          name="paymentDay"
          label="支払日"
        >
          <a-select v-model:value="formState.paymentDay">
            <a-select-option value="paymentDay1">支払日1</a-select-option>
            <a-select-option value="paymentDay2">支払日2</a-select-option>
            <a-select-option value="paymentDay3">支払日3</a-select-option>
            <a-select-option value="paymentDay4">支払日4</a-select-option>
          </a-select>
        </a-form-item>
      </a-form-item>

      <a-form-item name="requestDate" label="請求書必着日">
        <a-textarea v-model:value="formState.requestDate" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 8 }">
        <a-button type="primary" html-type="submit">登録</a-button>
      </a-form-item>
    </a-form>
  </a-spin>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";

interface FormState {
  customerName: string;
  buildingName: string;
  tdbRating: string;
  rankLevel: string;
  isCompany: string;
  memo: string;
  paymentSite: string;
  lineDay: string;
  paymentMonth: string;
  paymentDay: string;
  requestDate: string;
  postalCode: string;
  address: string;
}

const route = useRoute();
const spinning = ref(false);

const formState = reactive<FormState>({
  customerName: "",
  buildingName: "",
  tdbRating: "",
  rankLevel: "",
  isCompany: "false",
  memo: "",
  paymentSite: "",
  lineDay: "",
  paymentMonth: "",
  paymentDay: "",
  requestDate: "",
  postalCode: "",
  address: "",
});
const router = useRouter();

const onFinish = (values: any) => {
  console.log("Success:", values);
  router.push("/back-office/customer-management/list");
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
  router.push("/back-office/customer-management/list");
};

const getCustomerDetail = async (id: string) => {
  spinning.value = true;
  try {
    setTimeout(() => {
      Object.assign(formState, {
        customerName: "顧客1",
        buildingName: "建物1",
        tdbRating: "A",
        rankLevel: "A",
        isCompany: "false",
        memo: "メモ1",
        paymentSite: "paymentSite1",
        lineDay: "lineDay1",
        paymentMonth: "paymentMonth1",
        paymentDay: "paymentDay1",
        requestDate: "2023-01-01",
        postalCode: "123456",
        address: "地址1",
      });
      spinning.value = false;
    }, 2000);
  } catch (error) {
    console.error("Error fetching member detail:", error);
  } finally {
    // spinning.value = false;
  }
};

onMounted(() => {
  const id = route.query.id as string;
  if (id) {
    getCustomerDetail(id);
  }
});
</script>
<style scoped>
.vertical-form-item {
  margin-bottom: 12px;
  height: auto;
}
.vertical-form-item :deep(.ant-form-item-row) {
  display: flex !important;
  flex-direction: column !important;
  height: 60px !important;
}

.vertical-form-item :deep(.ant-form-item-label) {
  text-align: left !important;
}
</style>

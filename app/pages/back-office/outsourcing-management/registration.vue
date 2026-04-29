<template>
  <div class="page-root">
    <GlobalHeader />
    <div class="page-content">
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
            label="電話番号"
            name="phoneNumber"
            :rules="[{ required: true, message: '電話番号を入力してください' }]"
          >
            <a-input v-model:value="formState.phoneNumber" />
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

          <a-form-item :wrapper-col="{ offset: 8, span: 8 }">
            <a-button type="primary" html-type="submit">登録</a-button>
          </a-form-item>
        </a-form>
      </a-spin>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";

interface FormState {
  customerName: string;
  buildingName: string;
  tdbRating: string;
  rankLevel: string;
  postalCode: string;
  address: string;
  phoneNumber: string;
}

const route = useRoute();
const spinning = ref(false);

const formState = reactive<FormState>({
  customerName: "",
  buildingName: "",
  tdbRating: "",
  rankLevel: "",
  postalCode: "",
  address: "",
  phoneNumber: "",
});
const router = useRouter();

const onFinish = (values: any) => {
  console.log("Success:", values);
  router.push("/back-office/outsourcing-management/list");
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
  router.push("/back-office/outsourcing-management/list");
};

const getOutsourcingDetail = async (id: string) => {
  spinning.value = true;
  try {
    setTimeout(() => {
      Object.assign(formState, {
        customerName: "顧客1",
        buildingName: "建物1",
        tdbRating: "A",
        rankLevel: "A",
        postalCode: "123456",
        address: "地址1",
        phoneNumber: "09012345678",
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
    getOutsourcingDetail(id);
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

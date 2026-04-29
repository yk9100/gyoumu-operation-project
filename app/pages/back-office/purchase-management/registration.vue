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
          <a-form-item label="仕入先名" name="purchaseName" required>
            <a-input v-model:value="formState.purchaseName" />
          </a-form-item>
          <a-form-item label="郵便番号" name="postalCode" required>
            <a-input v-model:value="formState.postalCode" />
          </a-form-item>
          <a-form-item label="電話番号" name="phoneNumber" required>
            <a-input v-model:value="formState.phoneNumber" />
          </a-form-item>
          <a-form-item label="住所" name="address" required>
            <a-input v-model:value="formState.address" />
          </a-form-item>
          <a-form-item label="ビル名" name="buildingName" required>
            <a-input v-model:value="formState.buildingName" />
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
import { message } from "ant-design-vue";

interface FormState {
  purchaseName: string;
  postalCode: string;
  phoneNumber: string;
  address: string;
  buildingName: string;
}

const route = useRoute();
const spinning = ref(false);

const formState = reactive<FormState>({
  purchaseName: "",
  postalCode: "",
  phoneNumber: "",
  address: "",
  buildingName: "",
});
const router = useRouter();

const onFinish = (values: any) => {
  console.log("Success:", values);
  // router.push("/back-office/notification-management/list");
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
  router.push("/back-office/purchase-management/list");
};

const getPurchaseDetail = async (id: string) => {
  spinning.value = true;
  try {
    setTimeout(() => {
      Object.assign(formState, {
        purchaseName: "仕入先1",
        postalCode: "123456",
        phoneNumber: "09012345678",
        address: "住所1",
        buildingName: "ビル1",
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
    getPurchaseDetail(id);
  }
});
</script>

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
          <a-form-item label="職種名" name="occupationName" required>
            <a-input v-model:value="formState.occupationName" />
          </a-form-item>
          <a-form-item label="単価" name="price" required>
            <a-input v-model:value="formState.price" type="number" min="0" />
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
  occupationName: string;
  price: number;
}

const route = useRoute();
const spinning = ref(false);

const formState = reactive<FormState>({
  occupationName: "",
  price: 0,
});
const router = useRouter();

const onFinish = (values: any) => {
  console.log("Success:", values);
  // router.push("/back-office/notification-management/list");
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
  router.push("/back-office/occupation-management/list");
};

const getOccupationDetail = async (id: string) => {
  spinning.value = true;
  try {
    setTimeout(() => {
      Object.assign(formState, {
        occupationName: "職種1",
        price: 1000,
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
    getOccupationDetail(id);
  }
});
</script>

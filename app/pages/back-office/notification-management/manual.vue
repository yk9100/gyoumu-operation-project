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
      <a-form-item name="url" label="URL" required>
        <a-input v-model:value="formState.url" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 8 }">
        <a-button type="primary" html-type="submit">保存</a-button>
      </a-form-item>
    </a-form>
  </a-spin>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";

interface FormState {
  url: string;
}

const route = useRoute();
const spinning = ref(false);

const formState = reactive<FormState>({
  url: "",
});
const router = useRouter();

const onFinish = (values: any) => {
  console.log("Success:", values);
  router.push("/back-office/department-management/list");
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
  router.push("/back-office/department-management/list");
};
</script>

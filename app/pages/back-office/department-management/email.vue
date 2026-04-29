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
            label="所属セグメント"
            name="segment"
            :rules="[
              { required: true, message: '所属セグメントを入力してください' },
            ]"
          >
            <a-checkbox-group v-model:value="formState.segment">
              <a-checkbox value="EE">EE</a-checkbox>
              <a-checkbox value="FF">FF</a-checkbox>
              <a-checkbox value="GG">GG</a-checkbox>
            </a-checkbox-group>
          </a-form-item>

          <a-form-item name="email" label="メールアドレス" required>
            <a-input
              v-model:value="formState.email"
              placeholder="oo@bravesoft.co.jp"
            />
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 8, span: 8 }">
            <a-button type="primary" html-type="submit">更新</a-button>
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
  departmentName: string;
  year: string;
  segment: string[];
  manager: string;
  leader: string;
  email: string;
  useabled: boolean;
  member: string[];
}

const route = useRoute();
const spinning = ref(false);

const formState = reactive<FormState>({
  departmentName: "",
  year: "2026H1",
  segment: [],
  manager: "",
  leader: "",
  email: "",
  useabled: false,
  member: [],
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

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
      <a-form-item label="タイトル" name="title" required>
        <a-input v-model:value="formState.title" />
      </a-form-item>
      <a-form-item label="お知らせ内容" name="content" required>
        <a-textarea v-model:value="formState.content" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 8 }">
        <a-button type="primary" html-type="submit">確認</a-button>
      </a-form-item>
    </a-form>
  </a-spin>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { message } from "ant-design-vue";

interface FormState {
  title: string;
  content: string;
}

const route = useRoute();
const spinning = ref(false);

const formState = reactive<FormState>({
  title: "",
  content: "",
});
const router = useRouter();

const onFinish = (values: any) => {
  console.log("Success:", values);
  message.success("お知らせ確認成功しました");
  // router.push("/back-office/notification-management/list");
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
  router.push("/back-office/notification-management/list");
};

const getNotificationDetail = async (id: string) => {
  spinning.value = true;
  try {
    setTimeout(() => {
      Object.assign(formState, {
        title: "タイトル1",
        content: "お知らせ内容1",
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
    getNotificationDetail(id);
  }
});
</script>

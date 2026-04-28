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
        label="部署名"
        name="departmentName"
        :rules="[{ required: true, message: '部署名を入力してください' }]"
      >
        <a-input v-model:value="formState.departmentName" />
      </a-form-item>
      <a-form-item
        label="年度"
        name="year"
        :rules="[{ required: true, message: '年度を入力してください' }]"
      >
        <a-select v-model:value="formState.year">
          <a-select-option value="2026H1">2026H1</a-select-option>
          <a-select-option value="2026H2">2026H2</a-select-option>
          <a-select-option value="2026H3">2026H3</a-select-option>
          <a-select-option value="2026H4">2026H4</a-select-option>
        </a-select>
      </a-form-item>
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
      <a-form-item
        label="部長"
        name="manager"
        :rules="[{ required: true, message: '部長を入力してください' }]"
      >
        <a-select v-model:value="formState.manager">
          <a-select-option value="none">なし</a-select-option>
          <a-select-option value="manager1">部長1</a-select-option>
          <a-select-option value="manager2">部長2</a-select-option>
          <a-select-option value="manager3">部長3</a-select-option>
          <a-select-option value="manager4">部長4</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="リーダー"
        name="leader"
        :rules="[{ required: true, message: 'リーダーを入力してください' }]"
      >
        <a-select v-model:value="formState.leader">
          <a-select-option value="none">なし</a-select-option>
          <a-select-option value="leader1">リーダー1</a-select-option>
          <a-select-option value="leader2">リーダー2</a-select-option>
          <a-select-option value="leader3">リーダー3</a-select-option>
          <a-select-option value="leader4">リーダー4</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="email" label="メールアドレス" required>
        <a-input v-model:value="formState.email" />
      </a-form-item>
      <a-form-item name="useabled" label="現在使用">
        <a-checkbox v-model:value="formState.useabled" />
      </a-form-item>

      <a-form-item name="member" label="メンバー" >
        <a-checkbox-group v-model:value="formState.member">
          <a-checkbox value="member1">メンバー1</a-checkbox>
          <a-checkbox value="member2">メンバー2</a-checkbox>
          <a-checkbox value="member3">メンバー3</a-checkbox>
          <a-checkbox value="member4">メンバー4</a-checkbox>
        </a-checkbox-group>
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

const getMemberDetail = async (id: string) => {
  spinning.value = true;
  try {
    setTimeout(() => {
      Object.assign(formState, {
        departmentName: "部署1",
        year: "2026H1",
        segment: ["EE"],
        manager: "manager1",
        leader: "leader1",
        email: "department1@example.com",
        useabled: true,
        member: ["member1", "member2"],
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
    getMemberDetail(id);
  }
});
</script>

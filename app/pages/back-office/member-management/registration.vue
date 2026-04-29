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
            label="姓"
            name="frontName"
            :rules="[{ required: true, message: '姓を入力してください' }]"
          >
            <a-input v-model:value="formState.frontName" />
          </a-form-item>
          <a-form-item
            label="姓（よみ）"
            name="frontNameYomi"
            :rules="[
              { required: true, message: '姓（よみ）を入力してください' },
            ]"
          >
            <a-input v-model:value="formState.frontNameYomi" />
          </a-form-item>
          <a-form-item
            label="名"
            name="lastName"
            :rules="[{ required: true, message: '名を入力してください' }]"
          >
            <a-input v-model:value="formState.lastName" />
          </a-form-item>
          <a-form-item
            label="名（よみ）"
            name="lastNameYomi"
            :rules="[
              { required: true, message: '名（よみ）を入力してください' },
            ]"
          >
            <a-input v-model:value="formState.lastNameYomi" />
          </a-form-item>
          <a-form-item
            label="アイコン"
            name="icon"
            :rules="[
              {
                required: false,
                message: 'アイコンをアップロードしてください',
              },
            ]"
          >
            <div style="display: flex; flex-direction: column; gap: 8px">
              <img
                v-if="formState.icon"
                :src="formState.icon"
                alt="Icon"
                style="height: 100px; width: 100px; object-fit: cover"
              />
              <a-upload
                :show-upload-list="false"
                :accept="'.jpg,.jpeg,.png'"
                :max-count="1"
                :before-upload="beforeUpload"
              >
                <a-button type="primary">Upload</a-button>
              </a-upload>
            </div>
          </a-form-item>
          <a-form-item name="password" label="パスワード" required>
            <a-input v-model:value="formState.password" type="password" />
          </a-form-item>

          <a-form-item name="email" label="メールアドレス" required>
            <a-input v-model:value="formState.email" />
          </a-form-item>

          <a-form-item name="groups" label="所属部署" required>
            <a-checkbox-group v-model:value="formState.groups">
              <a-checkbox value="group1">部署1</a-checkbox>
              <a-checkbox value="group2">部署2</a-checkbox>
              <a-checkbox value="group3">部署3</a-checkbox>
              <a-checkbox value="group4">部署4</a-checkbox>
            </a-checkbox-group>
          </a-form-item>

          <a-form-item name="role" label="役割" required>
            <a-select v-model:value="formState.role">
              <a-select-option value="role1">役割1</a-select-option>
              <a-select-option value="role2">役割2</a-select-option>
              <a-select-option value="role3">役割3</a-select-option>
              <a-select-option value="role4">役割4</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item name="gender" label="性別" required>
            <a-radio-group v-model:value="formState.gender">
              <a-radio value="male">男</a-radio>
              <a-radio value="female">女</a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item name="employmentType" label="雇佣形态" required>
            <a-select v-model:value="formState.employmentType">
              <a-select-option value="employmentType1"
                >雇用形態1</a-select-option
              >
              <a-select-option value="employmentType2"
                >雇用形態2</a-select-option
              >
              <a-select-option value="employmentType3"
                >雇用形態3</a-select-option
              >
              <a-select-option value="employmentType4"
                >雇用形態4</a-select-option
              >
            </a-select>
          </a-form-item>

          <a-form-item name="position" label="役職" required>
            <a-select v-model:value="formState.position">
              <a-select-option value="position1">役職1</a-select-option>
              <a-select-option value="position2">役職2</a-select-option>
              <a-select-option value="position3">役職3</a-select-option>
              <a-select-option value="position4">役職4</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item name="positionType" label="職種" required>
            <a-select v-model:value="formState.positionType">
              <a-select-option value="positionType1">職種1</a-select-option>
              <a-select-option value="positionType2">職種2</a-select-option>
              <a-select-option value="positionType3">職種3</a-select-option>
              <a-select-option value="positionType4">職種4</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item name="employmentStatus" label="在职状态" required>
            <a-radio-group v-model:value="formState.employmentStatus">
              <a-radio value="employed">在职</a-radio>
              <a-radio value="unemployed">离职</a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item name="memberNumber" label="メンバー番号" required>
            <a-input v-model:value="formState.memberNumber" />
          </a-form-item>

          <a-form-item name="preparation" label="備考">
            <a-textarea v-model:value="formState.preparation" />
          </a-form-item>

          <a-form-item name="status" label="ステータス（実績）">
            <a-checkbox v-model:value="formState.status">非表示</a-checkbox>
          </a-form-item>

          <a-form-item name="notificationPriority" label="お知らせ表示優先順位">
            <a-input
              type="number"
              v-model:value="formState.notificationPriority"
            />
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
  frontName: string;
  frontNameYomi: string;
  lastName: string;
  lastNameYomi: string;
  icon: string;
  password: string;
  email: string;
  remember: boolean;
  groups: string[];
  role: string;
  gender: string;
  employmentType: string;
  position: string;
  positionType: string;
  employmentStatus: string;
  memberNumber: string;
  preparation: string;
  status: boolean;
  notificationPriority: number;
}

const route = useRoute();
const spinning = ref(false);

const formState = reactive<FormState>({
  frontName: "",
  frontNameYomi: "",
  lastName: "",
  lastNameYomi: "",
  icon: "",
  password: "",
  email: "",
  remember: true,
  groups: [],
  role: "",
  gender: "",
  employmentType: "",
  position: "",
  positionType: "",
  employmentStatus: "",
  memberNumber: "",
  preparation: "",
  status: false,
  notificationPriority: 0,
});
const router = useRouter();

const onFinish = (values: any) => {
  console.log("Success:", values);
  router.push("/back-office/member-management/list");
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
  router.push("/back-office/member-management/list");
};

const beforeUpload = (file: File) => {
  console.log(file);
  const imageUrl = URL.createObjectURL(file);
  formState.icon = imageUrl;
};

const getMemberDetail = async (id: string) => {
  spinning.value = true;
  try {
    setTimeout(() => {
      Object.assign(formState, {
        frontName: "金光泰",
        frontNameYomi: "金光泰",
        lastName: "金光泰",
        lastNameYomi: "金光泰",
        icon: "",
        password: "123456",
        email: "kim.kwangtae@daiichihoki.com",
        remember: true,
        groups: [],
        role: "member",
        gender: "male",
        employmentType: "employed",
        position: "position1",
        positionType: "positionType1",
        employmentStatus: "employed",
        memberNumber: "123456",
        preparation: "",
        status: "employed",
        notificationPriority: 0,
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

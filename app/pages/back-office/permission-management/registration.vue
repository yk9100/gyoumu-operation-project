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
          <a-form-item label="役割名" name="roleName" required>
            <a-input v-model:value="formState.roleName" />
          </a-form-item>
          <a-form-item label="権限選択" name="permissionCodes" required>
            <a-checkbox-group
              v-model:value="formState.permissionCodes"
              :options="permissionOptions"
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
import { message } from "ant-design-vue";

interface FormState {
  roleName: string;
  permissionCodes: string[];
}

const route = useRoute();
const spinning = ref(false);
const permissionOptions = ref([
  {
    label: "バックオフィス",
    value: "バックオフィス",
  },
  {
    label: "ユーザ詳細情報（項目なしの為関係なし）",
    value: "ユーザ詳細情報（項目なしの為関係なし）",
  },
  {
    label: "マイページヒストリ見る（項目なしの為関係なし）",
    value: "マイページヒストリ見る（項目なしの為関係なし）",
  },
  {
    label: "ホームメニュー見る（全部署案件）",
    value: "ホームメニュー見る（全部署案件）",
  },
  {
    label: "基本権限",
    value: "基本権限",
  },
  {
    label: "請求書送付権限",
    value: "請求書送付権限",
  },
  {
    label: "トークンマスター権限",
    value: "トークンマスター権限",
  },
  {
    label: "ユーザー情報取得権限",
    value: "ユーザー情報取得権限",
  },
  {
    label: "顧客情報閲覧権限",
    value: "顧客情報閲覧権限",
  },
  {
    label: "外注先情報閲覧権限",
    value: "外注先情報閲覧権限",
  },
]);

const formState = reactive<FormState>({
  roleName: "",
  permissionCodes: [],
});

const router = useRouter();

const onFinish = (values: any) => {
  console.log("Success:", values);
  // router.push("/back-office/notification-management/list");
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
  router.push("/back-office/permission-management/list");
};

const getPermissionDetail = async (id: string) => {
  spinning.value = true;
  try {
    setTimeout(() => {
      Object.assign(formState, {
        roleName: "役割1",
        permissionCodes: ["バックオフィス"],
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
    getPermissionDetail(id);
  }
});
</script>

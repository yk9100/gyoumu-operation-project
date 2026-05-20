<template>
  <div class="page-root">
    <GlobalHeader :title="currentTitle"> </GlobalHeader>
    <div class="page-content">
      <div class="steps-container">
        <a-steps
          v-model:current="current"
          size="small"
          :items="steps"
          @change="handleStepChange"
        ></a-steps>
      </div>
      <KeepAlive>
        <component :is="currentComponent" />
      </KeepAlive>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { message } from "ant-design-vue";
import BaseInfo from "~/components/enterprise/BaseInfo.vue";
import NdaContract from "~/components/enterprise/NdaContract.vue";
interface FormState {
  referralName: string;
  postalCode: string;
  phoneNumber: string;
  address: string;
  buildingName: string;
}
export type RegistrationStep =
  | "baseInfo"
  | "ndaContract"
  | "checkCompany"
  | "contract"
  | "account";
const route = useRoute();
const router = useRouter();
const DEFAULT_STEPS = [
  {
    status: "wait",
    title: "基本情報",
  },
  {
    status: "wait",
    title: "NDA契約書",
  },
  {
    status: "wait",
    title: "反社チェック",
  },
  {
    status: "wait",
    title: "基本契約書",
  },
  {
    status: "wait",
    title: "アカウント発行",
  },
];
const componentMap: Record<RegistrationStep, Component> = {
  baseInfo: BaseInfo,
  ndaContract: NdaContract,
  checkCompany: BaseInfo,
  contract: BaseInfo,
  account: BaseInfo,
};
const titleMap: Record<RegistrationStep, string> = {
  baseInfo: "基本情報",
  ndaContract: "NDA契約書",
  checkCompany: "反社チェック",
  contract: "基本契約書",
  account: "アカウント発行",
};
const current = computed(() => {
  if (route.query.step) {
    return DEFAULT_STEPS.findIndex(
      (item) => item.title === titleMap[route.query.step as RegistrationStep],
    );
  }
  return 0;
});

const spinning = ref(false);
const steps = computed(() => {
  let newSteps = [...DEFAULT_STEPS];
  newSteps = newSteps.map((item, index) => {
    if (index <= current.value) {
      return {
        ...item,
        status: "process",
      };
    }
    return {
      ...item,
      status: "wait",
    };
  });
  return newSteps;
});
const currentTitle = computed(() => {
  if (route.query.step) {
    return titleMap[route.query.step as RegistrationStep];
  }
  return "基本情報";
});

const formState = reactive<FormState>({
  referralName: "",
  postalCode: "",
  phoneNumber: "",
  address: "",
  buildingName: "",
});

const currentComponent = computed(() => {
  if (route.query.step) {
    return componentMap[route.query.step as RegistrationStep];
  }
  return BaseInfo;
});

const handleStepChange = (index: number) => {
  const step = Object.keys(titleMap)[index] as RegistrationStep;
  router.push({
    query: {
      step,
    },
  });
};

const getReferralDetail = async (id: string) => {
  spinning.value = true;
  try {
    setTimeout(() => {
      Object.assign(formState, {
        referralName: "紹介元1",
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
    getReferralDetail(id);
  }
});
</script>
<style scoped l>
.steps-container {
  width: 80%;
  margin: 0 auto;
  margin-bottom: 20px;
}
</style>

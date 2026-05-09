<template>
  <div>
    <KeepAlive>
      <component :is="componentName" />
    </KeepAlive>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "project-detail",
});
import ProjectDetailComprehensive from "@/components/projectDetail/Comprehensive.vue";
import ProjectDetailBasic from "@/components/projectDetail/Basic.vue";
import ProjectDetailEstimate from "@/components/projectDetail/Estimate.vue";
import ProjectDetailOrder from "@/components/projectDetail/Order.vue";
import ProjectDetailDevelopment from "@/components/projectDetail/Development.vue";
import ProjectDetailCheckout from "@/components/projectDetail/Checkout.vue";
import ProjectDetailDemand from "@/components/projectDetail/Demand.vue";

const route = useRoute();
const componentsMap: Record<string, Component> = {
  "1": ProjectDetailComprehensive,
  "2": ProjectDetailBasic,
  "3": ProjectDetailEstimate,
  "4": ProjectDetailOrder,
  "5": ProjectDetailDevelopment,
  "6": ProjectDetailCheckout,
  "7": ProjectDetailDemand,
};
const step = route.params.step as string;
const componentName = computed(() => componentsMap[step]);

console.log("componentName:", componentName.value);
</script>

<style scoped></style>

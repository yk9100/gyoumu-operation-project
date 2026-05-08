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
const route = useRoute();
const componentsMap: Record<string, Component> = {
  "1": ProjectDetailComprehensive,
};
const step = route.params.step as string;
const componentName = computed(() => componentsMap[step]);

console.log("componentName:", componentName.value);
</script>

<style scoped></style>

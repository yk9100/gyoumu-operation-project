<template>
  <header class="global-header">
    <slot name="left" />
    <h2 class="global-header-title">
      {{ props.title || currentPageTitle }}
    </h2>
    <div class="global-header-right">
      <slot name="right" />
      <UserInfo />
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ROUTE_TITLE_MAP } from "~/layouts/common";
const props = defineProps<{ title?: string }>();
const route = useRoute();

const currentPageTitle = computed(
  () => ROUTE_TITLE_MAP[`${route.path}${route.hash}`],
);
</script>

<style scoped>
.global-header {
  height: 64px;
  background: #fff;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.global-header-title {
  font-size: 18px;
  font-weight: 500;
  margin: 0;
}

.global-header-right {
  display: flex;
  align-items: center;
  gap: 24px;
}
</style>

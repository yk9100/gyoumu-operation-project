<template>
  <NuxtLayout name="default">
    <div class="page-root">
      <GlobalHeader />
      <div class="page-content">
        <div class="breadcrumb">
          <NuxtLink
            v-for="item in breadcrumb"
            :key="item.label"
            :to="item.link"
            :class="[
              'breadcrumb-item',
              item.link === $route.path ? 'breadcrumb-item-active' : '',
            ]"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
        <div class="task-default-content">
          <slot />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const route = useRoute();

const breadcrumb = computed(() => {
  return [
    {
      label: "ダッシュボード",
      link: `/my-task/${route.params.projectId}/dashboard`,
    },
    {
      label: "課題",
      link: `/my-task/${route.params.projectId}/list`,
    },
    {
      label: "ファイル",
      link: `/my-task/${route.params.projectId}/file-list`,
    },
    {
      label: "設定",
      link: `/my-task/${route.params.projectId}/setting/user`,
    },
  ];
});

onMounted(() => {
  console.log("route.params.projectId", route.params.projectId);
});
</script>

<style scoped>
.task-default-content {
  /* height: calc(100vh - 260px);
  overflow-y: auto; */
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.breadcrumb a {
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  word-break: break-all;
}

.breadcrumb-item {
  background-color: #fa8c16;
  color: #fff;
  padding: 0 16px;
  border-radius: 20px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #fa8c16;
  position: relative;
}

/* .breadcrumb-item::after {
  content: "";
  display: inline-block;
  width: 0;
  height: 0;
  margin: 0 8px;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 6px solid white;
  position: absolute;
  top: 50%;
  right: -2px;
  transform: translateY(-50%);
  z-index: 100;
} */

.breadcrumb-item-active {
  background-color: #fff;
  color: #fa8c16;
}

.breadcrumb-item:hover {
  background-color: #fff;
  color: #fa8c16;
}
</style>

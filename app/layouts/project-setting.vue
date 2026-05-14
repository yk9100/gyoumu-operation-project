<template>
  <NuxtLayout name="task-default">
    <div class="project-setting-content">
      <div class="nav">
        <NuxtLink
          v-for="item in navList"
          :key="item.label"
          :to="item.link"
          :class="[
            'nav-item',
            item.link === $route.path ? 'nav-item-active' : '',
          ]"
        >
          {{ item.label }}
        </NuxtLink>
      </div>
      <div class="slot-content">
        <slot />
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const route = useRoute();

const navList = computed(() => {
  return [
    {
      label: "参加ユーザー",
      link: `/my-task/${route.params.projectId}/setting/user`,
    },
    {
      label: "種別",
      link: `/my-task/${route.params.projectId}/setting/issue-type`,
    },
    {
      label: "カテゴリー",
      link: `/my-task/${route.params.projectId}/setting/category`,
    },
    {
      label: "注発生バージョン/\nマイルストーン",
      link: `/my-task/${route.params.projectId}/setting/milestone`,
    },
  ];
});

onMounted(() => {
  console.log("route.params.id", route.params.id);
});
</script>

<style scoped>
.project-setting-content {
  display: flex;
}
.slot-content {
  flex: 1;
  padding: 20px 32px 0 32px;
  height: calc(100vh - 180px);
  overflow-y: auto;
}
.nav {
  display: flex;
  flex-direction: column;
  width: 275px;
  background-color: rgba(0, 0, 0, 0.04);
  border: 1px solid #c2c2c2;
  height: calc(100vh - 180px);
  border-radius: 4px;
  padding-left: 32px;
  padding-top: 40px;
}

.nav-item {
  padding: 7px 0 7px 30px;
  font-size: 14px;
  line-height: 18px;
  border: 1px solid transparent;
  border-right: 0;
  color: #111;
  white-space: pre;
}
.nav-item-active {
  background-color: #fff;
  margin-right: -1px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-color: #c2c2c2;
  color: #111;
}

.nav-item:hover {
  background-color: #fff;
  margin-right: -1px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-color: #c2c2c2;
  color: #111;
}

.project-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 24px;
  background-color: #f5f5f5;
  padding: 12px 16px;
}
.vertical-btn {
  position: fixed;
  top: 80px;
  right: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fa8c16;
  border: none;
  border-radius: 8px;
  width: 48px;
  padding: 12px 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  color: #fff;
  width: 30px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.vertical-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5714;
  text-align: center;
  word-break: break-all;
}

.vertical-btn:hover {
  opacity: 0.8;
}

.vertical-btn:active {
  opacity: 0.8;
}
.form-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.form-item span {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5714;
  text-align: center;
  word-break: break-all;
}

.comment-list {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
}

.comment-item {
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 12px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.comment-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #e8e8e8;
}

.comment-author {
  font-weight: 600;
  color: #1890ff;
  font-size: 14px;
}

.comment-time {
  margin-left: auto;
  font-size: 12px;
  color: #999;
}

.comment-body {
  padding: 16px;
}

.comment-body p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  word-break: break-word;
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

.breadcrumb-item::after {
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
}

.breadcrumb-item-active {
  background-color: #fff;
  color: #fa8c16;
}

.breadcrumb-item:hover {
  background-color: #fff;
  color: #fa8c16;
}
</style>

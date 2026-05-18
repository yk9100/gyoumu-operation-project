<template>
  <a-config-provider
    :theme="{
      token: {},
    }"
    :locale="jaJP"
  >
    <a-layout style="min-height: 100vh">
      <a-layout-sider
        :collapsed="!layoutStore.sidebarOpen"
        @update:collapsed="handleCollapseChange"
        collapsible
        width="240px"
      >
        <div class="logo" />
        <a-skeleton v-if="loading" :active="true" :paragraph="{ rows: 10 }" />
        <a-menu
          v-else
          v-model:selectedKeys="selectedKeys"
          v-model:openKeys="openKeys"
          @select="handleSelect"
          theme="dark"
          mode="inline"
          style="max-height: calc(100vh - 120px); overflow-y: auto"
        >
          <template v-for="item in menuData">
            <a-sub-menu
              v-if="item.children && item.children.length > 0"
              :key="item.key"
            >
              <template #title>
                <span>
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </span>
              </template>
              <template v-for="child in item.children" :key="child.key">
                <a-sub-menu
                  v-if="child.children && child.children.length > 0"
                  :key="child.key"
                >
                  <template #title>
                    <span>{{ child.title }}</span>
                  </template>
                  <template
                    v-for="grandchild in child.children"
                    :key="grandchild.key"
                  >
                    <a-sub-menu
                      v-if="
                        grandchild.children && grandchild.children.length > 0
                      "
                      :key="grandchild.key"
                    >
                      <template #title>
                        <span>{{ grandchild.title }}</span>
                      </template>
                      <a-menu-item
                        v-for="greatgrandchild in grandchild.children"
                        :key="greatgrandchild.key"
                      >
                        {{ greatgrandchild.title }}
                      </a-menu-item>
                    </a-sub-menu>
                    <a-menu-item v-else :key="grandchild.key">
                      {{ grandchild.title }}
                    </a-menu-item>
                  </template>
                </a-sub-menu>
                <a-menu-item v-else :key="child.key">
                  {{ child.title }}
                </a-menu-item>
              </template>
            </a-sub-menu>
            <a-menu-item v-else :key="item.key">
              <component :is="item.icon" />
              <span>{{ item.title }}</span>
            </a-menu-item>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <slot />
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>
<script lang="ts" setup>
import jaJP from "ant-design-vue/es/locale/ja_JP";
import {
  HomeOutlined,
  FundProjectionScreenOutlined,
  UserOutlined,
  TagsOutlined,
  ContainerOutlined,
  ProfileOutlined,
} from "@ant-design/icons-vue";
import type { MenuProps } from "ant-design-vue";
import { ref, onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { BREADCRUMB_CONFIG } from "../layouts/common";
import { useLayoutStore } from "../stores/layout";

interface MenuItem {
  key: string;
  title: string;
  icon?: any;
  path?: string;
  children?: MenuItem[];
}

const router = useRouter();
const route = useRoute();
const layoutStore = useLayoutStore();

const selectedKeys = ref<string[]>([]);
const loading = ref<boolean>(true);
const menuData = ref<MenuItem[]>([]);
const openKeys = ref<string[]>([]);

const mockMenuData: MenuItem[] = [
  {
    key: "/home",
    title: "ホーム",
    icon: HomeOutlined,
    path: "/home",
  },
  {
    key: "/enterprise",
    title: "契約企業管理",
    icon: TagsOutlined,
    children: [
      {
        key: "/enterprise/list",
        title: "契約企業一覧",
        path: "/enterprise/list",
      },
      {
        key: "/enterprise/registration",
        title: "新規契約",
        path: "/enterprise/registration",
      },
    ],
  },
];

const handleSelect: MenuProps["onSelect"] = (e) => {
  const key = e.key?.toString();
  if (!key) {
    return;
  }
  selectedKeys.value = [key];
  router.push(key);
};

const handleBreadcrumbClick = (href?: string) => {
  if (href) {
    router.push(href);
  }
};

const handleCollapseChange = (collapsed: boolean) => {
  layoutStore.setSidebarOpen(!collapsed);
};

const fetchMenuData = (): Promise<MenuItem[]> => {
  return new Promise<MenuItem[]>((resolve) => {
    // setTimeout(() => {
    //     resolve(mockMenuData);
    // }, 1000);
    resolve(mockMenuData);
  });
};

const updateSelectedKeysByRoute = () => {
  if (menuData.value.length === 0) {
    return;
  }

  const currentPath = route.path;
  const currentHash = route.hash;
  const fullPath = currentHash ? `${currentPath}${currentHash}` : currentPath;

  // 递归查找匹配的菜单项
  const findMenuItem = (
    items: MenuItem[],
    parentKeys: string[] = [],
  ): boolean => {
    for (const item of items) {
      if (item.key === fullPath || item.path === fullPath) {
        selectedKeys.value = [item.key];
        openKeys.value = parentKeys;
        scrollToAnchor(currentHash);
        return true;
      }
      if (item.children) {
        const newParentKeys = [...parentKeys, item.key];
        if (findMenuItem(item.children, newParentKeys)) {
          return true;
        }
      }
    }
    return false;
  };

  if (!findMenuItem(menuData.value)) {
    scrollToAnchor(currentHash);
  }
};

const scrollToAnchor = (hash: string) => {
  if (!hash) {
    return;
  }
  const anchor = hash.replace("#", "");
  if (!anchor) {
    return;
  }
  const element = document.getElementById(anchor);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

watch([() => route.path, () => route.hash], () => {
  if (menuData.value.length > 0) {
    updateSelectedKeysByRoute();
  }
});

onMounted(async () => {
  loading.value = true;
  try {
    const data = await fetchMenuData();
    menuData.value = data;
    updateSelectedKeysByRoute();
  } catch (error) {
    console.error("Failed to fetch menu data:", error);
  } finally {
    loading.value = false;
  }
});
</script>
<style scoped>
.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}

:deep(.ant-breadcrumb ol li:last-child a) {
  color: #111;
}
</style>

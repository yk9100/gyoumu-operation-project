<template>
  <a-config-provider
    :theme="{
      token: {},
    }"
    :locale="jaJP"
  >
    <a-layout style="min-height: 100vh">
      <a-layout-sider :collapsed="!layoutStore.sidebarOpen" @update:collapsed="handleCollapseChange" collapsible width="240px">
        <div class="logo" />
        <a-skeleton v-if="loading" :active="true" :paragraph="{ rows: 10 }" />
        <a-menu
          v-else
          v-model:selectedKeys="selectedKeys"
          v-model:openKeys="openKeys"
          @select="handleSelect"
          theme="dark"
          mode="inline"
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
              <a-menu-item v-for="child in item.children" :key="child.key">
                {{ child.title }}
              </a-menu-item>
            </a-sub-menu>
            <a-menu-item v-else :key="item.key">
              <component :is="item.icon" />
              <span>{{ item.title }}</span>
            </a-menu-item>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header
          style="
            background: #fff;
            padding: 0 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <h2 style="margin: 0; font-size: 18px; font-weight: 500">
            {{ currentPageTitle }}
          </h2>
          <UserInfo />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item
              v-for="(item, index) in breadcrumbConfig"
              :key="index"
              :href="item.href"
              @click.stop="handleBreadcrumbClick(item.href)"
            >
              {{ item.title }}
            </a-breadcrumb-item>
          </a-breadcrumb>
          <div
            :style="{
              padding: '24px',
              background: '#fff',
              height:
                breadcrumbConfig.length > 0
                  ? 'calc(100vh - 140px)'
                  : 'calc(100vh - 120px)',
              overflowY: 'auto',
            }"
          >
            <slot />
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>
<script lang="ts" setup>
import jaJP from 'ant-design-vue/es/locale/ja_JP';
import {
  HomeOutlined,
  FundProjectionScreenOutlined,
  UserOutlined,
  TagsOutlined,
  ContainerOutlined,
} from "@ant-design/icons-vue";
import type { MenuProps } from "ant-design-vue";
import { ref, onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import UserInfo from "../components/UserInfo.vue";
import { ROUTE_TITLE_MAP, BREADCRUMB_CONFIG } from "../layouts/common";
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

const currentPageTitle = computed(
  () => ROUTE_TITLE_MAP[`${route.path}${route.hash}`],
);

const breadcrumbConfig = computed(
  () => BREADCRUMB_CONFIG[`${route.path}${route.hash}`] || [],
);

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
    key: "/my-task",
    title: "マイタスク",
    icon: ContainerOutlined,
    path: "/my-task",
  },
  {
    key: "/project-management",
    title: "プロジェクト管理",
    icon: FundProjectionScreenOutlined,
    path: "/project-management",
  },
  {
    key: "/user-info",
    title: "アカウント情報",
    icon: UserOutlined,
    path: "/user-info",
    children: [
      {
        key: "/user-info#basic-info",
        title: "基本情報",
        path: "/user-info#basic-info",
      },
      {
        key: "/user-info#personnel-info",
        title: "人事情報",
        path: "/user-info#personnel-info",
      },
      {
        key: "/user-info#salary-info",
        title: "給与情報",
        path: "/user-info#salary-info",
      },
    ],
  },
  {
    key: "/other",
    title: "その他",
    icon: TagsOutlined,
    children: [
      {
        key: "/other/contact",
        title: "お問い合わせ",
        path: "/other/contact",
      },
      {
        key: "/other/terms",
        title: "利用規約",
        path: "/other/terms",
      },
      {
        key: "/other/privacy",
        title: "プライバシーポリシー",
        path: "/other/privacy",
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

  for (const item of menuData.value) {
    if (item.children) {
      for (const child of item.children) {
        if (child.key === fullPath || child.path === fullPath) {
          selectedKeys.value = [child.key];
          openKeys.value = [item.key];
          scrollToAnchor(currentHash);
          return;
        }
      }
    }
    if (item.key === currentPath || item.path === currentPath) {
      selectedKeys.value = [item.key];
      scrollToAnchor(currentHash);
      return;
    }
  }
  scrollToAnchor(currentHash);
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

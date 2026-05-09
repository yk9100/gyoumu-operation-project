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
    key: "/my-task",
    title: "マイタスク",
    icon: ContainerOutlined,
    path: "/my-task",
  },
  {
    key: "/project-management",
    title: "プロジェクト管理",
    icon: FundProjectionScreenOutlined,
    children: [
      {
        key: "/project-management/list",
        title: "プロジェクトー覧",
        path: "/project-management/list",
      },
      {
        key: "/project-management/registration",
        title: "プロジェクト登録",
        path: "/project-management/registration",
      },
      {
        key: "/project-management/my",
        title: "マイページ",
        path: "/project-management/my",
      },
    ],
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
    key: "/back-office",
    title: "バックオフィス",
    icon: ProfileOutlined,
    children: [
      {
        key: "/back-office/member-management",
        title: "メンバー管理",
        path: "/back-office/member-management",
        children: [
          {
            key: "/back-office/member-management/list",
            title: "メンバーー覧",
            path: "/back-office/member-management/list",
          },
          {
            key: "/back-office/member-management/registration",
            title: "メンバー登録",
            path: "/back-office/member-management/registration",
          },
        ],
      },
      {
        key: "/back-office/outsourcing-management",
        title: "外注先管理",
        path: "/back-office/outsourcing-management",
        children: [
          {
            key: "/back-office/outsourcing-management/list",
            title: "外注先ー覧",
            path: "/back-office/outsourcing-management/list",
          },
          {
            key: "/back-office/outsourcing-management/registration",
            title: "外注先登録",
            path: "/back-office/outsourcing-management/registration",
          },
        ],
      },
      {
        key: "/back-office/customer-management",
        title: "顧客管理",
        path: "/back-office/customer-management",
        children: [
          {
            key: "/back-office/customer-management/list",
            title: "顧客ー覧",
            path: "/back-office/customer-management/list",
          },
          {
            key: "/back-office/customer-management/registration",
            title: "顧客登録",
            path: "/back-office/customer-management/registration",
          },
        ],
      },
      {
        key: "/back-office/department-management",
        title: "部署管理",
        path: "/back-office/department-management",
        children: [
          {
            key: "/back-office/department-management/email",
            title: "メールアドレス更新",
            path: "/back-office/department-management/email",
          },
          {
            key: "/back-office/department-management/list",
            title: "部署ー覧",
            path: "/back-office/department-management/list",
          },
          {
            key: "/back-office/department-management/registration",
            title: "部署登録",
            path: "/back-office/department-management/registration",
          },
        ],
      },
      {
        key: "/back-office/occupation-management",
        title: "職種管理",
        path: "/back-office/occupation-management",
        children: [
          {
            key: "/back-office/occupation-management/list",
            title: "職種ー覧",
            path: "/back-office/occupation-management/list",
          },
          {
            key: "/back-office/occupation-management/registration",
            title: "職種登録",
            path: "/back-office/occupation-management/registration",
          },
        ],
      },
      {
        key: "/back-office/permission-management",
        title: "権限管理",
        path: "/back-office/permission-management",
        children: [
          {
            key: "/back-office/permission-management/plist",
            title: "権限ー覧",
            path: "/back-office/permission-management/plist",
          },
          {
            key: "/back-office/permission-management/list",
            title: "役割ー覧",
            path: "/back-office/permission-management/list",
          },
          {
            key: "/back-office/permission-management/registration",
            title: "役割追加",
            path: "/back-office/permission-management/registration",
          },
        ],
      },
      {
        key: "/back-office/notification-management",
        title: "お知らせ管理",
        path: "/back-office/notification-management",
        children: [
          {
            key: "/back-office/notification-management/manual",
            title: "マニュアルURL",
            path: "/back-office/notification-management/manual",
          },
          {
            key: "/back-office/notification-management/list",
            title: "お知らせー覧",
            path: "/back-office/notification-management/list",
          },
          {
            key: "/back-office/notification-management/registration",
            title: "お知らせ追加",
            path: "/back-office/notification-management/registration",
          },
        ],
      },
      {
        key: "/back-office/referral-management",
        title: "紹介元管理",
        path: "/back-office/referral-management",
        children: [
          {
            key: "/back-office/referral-management/list",
            title: "紹介元ー覧",
            path: "/back-office/referral-management/list",
          },
          {
            key: "/back-office/referral-management/registration",
            title: "紹介元追加",
            path: "/back-office/referral-management/registration",
          },
        ],
      },
      {
        key: "/back-office/purchase-management",
        title: "仕入先管理",
        path: "/back-office/purchase-management",
        children: [
          {
            key: "/back-office/purchase-management/list",
            title: "仕入先ー覧",
            path: "/back-office/purchase-management/list",
          },
          {
            key: "/back-office/purchase-management/registration",
            title: "仕入先追加",
            path: "/back-office/purchase-management/registration",
          },
        ],
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

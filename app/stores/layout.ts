// layout store 用于管理布局相关的状态
import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    // 侧边栏展开状态
    sidebarOpen: true,
  }),
  actions: {
    // 切换侧边栏展开状态
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    // 设置侧边栏展开状态
    setSidebarOpen(open: boolean) {
      this.sidebarOpen = open;
    },
  },
});

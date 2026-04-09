// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  // 注册客户端插件
  plugins: ["~/plugins/antdv.client.ts"],

  // 关键：将 ant-design-vue 加入转译列表，解决 SSR 兼容问题
  build: {
    transpile: ["ant-design-vue"],
  },
  vite: {
    optimizeDeps: {
      include: [
        'dayjs',
        'dayjs/plugin/advancedFormat',
        'dayjs/plugin/customParseFormat',
        'dayjs/plugin/localeData',
        'dayjs/plugin/quarterOfYear',
        'dayjs/plugin/weekOfYear',
        'dayjs/plugin/weekYear',
        'dayjs/plugin/weekday'
      ]
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true, // 必须启用
        },
      },
    },
  },
});

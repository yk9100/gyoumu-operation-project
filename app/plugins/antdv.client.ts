import { defineNuxtPlugin } from "#app";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

// 提前导入 dayjs 及其插件，确保它们被正确加载
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import weekday from 'dayjs/plugin/weekday';
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(localeData);
dayjs.extend(quarterOfYear);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(weekday);

export default defineNuxtPlugin((nuxtApp) => {
  console.log("Ant Design Vue 插件正在加载..."); // 验证插件是否执行
  // 全局注册所有 Ant Design Vue 组件
  nuxtApp.vueApp.use(Antd);
});

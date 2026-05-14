// plugins/vxe-table.client.ts
import VxeTable from 'vxe-table'
import { VxeUI } from 'vxe-table'
// 按需引入样式，如果样式没自动加载可以引入这个
import 'vxe-table/lib/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  // 注册核心表格组件
  nuxtApp.vueApp.use(VxeTable)
  
  // 可以在这里做其他配置，比如国际化等
  // VxeUI.setConfig({ ... })
})
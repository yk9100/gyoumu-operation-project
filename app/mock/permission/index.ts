import type { IPermission, IRole } from "~/types/permission";

export const PERMISSION_LIST: IPermission[] = [
  {
    id: "1",
    permissionName: "全権限",
    permissionCode: "ALL_PERMISSION",
  },
  {
    id: "2",
    permissionName: "ユーザー管理",
    permissionCode: "USER_MANAGEMENT",
  },
  {
    id: "3",
    permissionName: "タスク管理",
    permissionCode: "TASK_MANAGEMENT",
  },
  {
    id: "4",
    permissionName: "タスク管理",
    permissionCode: "TASK_MANAGEMENT",
  },
  {
    id: "5",
    permissionName: "タスク管理",
    permissionCode: "TASK_MANAGEMENT",
  },
  {
    id: "6",
    permissionName: "タスク管理",
    permissionCode: "TASK_MANAGEMENT",
  },
  {
    id: "7",
    permissionName: "タスク管理",
    permissionCode: "TASK_MANAGEMENT",
  },
  {
    id: "8",
    permissionName: "タスク管理",
    permissionCode: "TASK_MANAGEMENT",
  },
  {
    id: "9",
    permissionName: "タスク管理",
    permissionCode: "TASK_MANAGEMENT",
  },
  {
    id: "10",
    permissionName: "タスク管理",
    permissionCode: "TASK_MANAGEMENT",
  },
];

export const MOCK_ROLE_LIST: IRole[] = [
  {
    id: "1",
    roleName: "ユーザー",
    permissionCodes: ["USER_MANAGEMENT"],
  },
  {
    id: "2",
    roleName: "タスク管理",
    permissionCodes: ["TASK_MANAGEMENT"],
  },
  {
    id: "3",
    roleName: "通知管理",
    permissionCodes: ["NOTIFICATION_MANAGEMENT"],
  },
  {
    id: "4",
    roleName: "権限管理",
    permissionCodes: ["PERMISSION_MANAGEMENT"],
  },
  {
    id: "5",
    roleName: "顧客管理",
    permissionCodes: ["CUSTOMER_MANAGEMENT"],
  },
  {
    id: "6",
    roleName: "顧客情報閲覧権限",
    permissionCodes: ["CUSTOMER_VIEW_PERMISSION"],
  },
  {
    id: "7",
    roleName: "顧客情報編集権限",
    permissionCodes: ["CUSTOMER_EDIT_PERMISSION"],
  },
  {
    id: "8",
    roleName: "顧客情報削除権限",
    permissionCodes: ["CUSTOMER_DELETE_PERMISSION"],
  },
  {
    id: "9",
    roleName: "顧客情報追加権限",
    permissionCodes: ["CUSTOMER_ADD_PERMISSION"],
  },
  {
    id: "10",
    roleName: "顧客情報削除権限",
    permissionCodes: ["CUSTOMER_DELETE_PERMISSION"],
  },
];

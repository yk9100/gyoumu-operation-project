<template>
  <div>
    <div class="settings-title">
      <span>参加ユーザー</span>
      <a-tooltip placement="top">
        <template #title>
          <span>something...</span>
        </template>
        <a-button class="tip-btn"><QuestionOutlined /></a-button>
      </a-tooltip>
    </div>

    <div class="settings-subtitle">参加中のチーム (0 チーム)</div>

    <div class="setting-user-bar">
      参加中のユーザー ({{ filteredUsers.length }} 名)
    </div>

    <div class="setting-user-filter">
      <span class="filter-label">ユーザーの絞り込み</span>
      <a-input
        v-model:value="filterKeyword"
        placeholder="ユーザーID・ハンドルネームからキーワードで検索"
      />
      <a-select v-model:value="filterType" style="width: 200px">
        <a-select-option value="すべての権限">すべての権限</a-select-option>
        <a-select-option value="プロジェクト管理者"
          >プロジェクト管理者</a-select-option
        >
        <a-select-option value="管理者">管理者</a-select-option>
        <a-select-option value="一般ユーザー">一般ユーザー</a-select-option>
        <a-select-option value="ゲスト">ゲスト</a-select-option>
      </a-select>
    </div>

    <div class="user-table-wrapper">
      <a-table
        :columns="columns"
        :data-source="filteredUsers"
        :pagination="false"
        row-key="userId"
        :row-class-name="
          (_record: any, index: number) =>
            index % 2 === 1 ? 'table-striped' : null
        "
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'avatar'">
            <a-avatar
              :src="record.avatar"
              style="margin-right: 8px; background-color: #f5f5f5"
            />
            <span>{{ record.nickname }}</span>
          </template>
          <template v-else-if="column.key === 'permission'">
            <a-tag :color="getPermissionColor(record.permission)">
              {{ record.permission }}
            </a-tag>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { QuestionOutlined } from "@ant-design/icons-vue";

interface User {
  userId: string;
  avatar: string;
  nickname: string;
  permission: string;
  createdAt: string;
}

definePageMeta({
  layout: "project-setting",
});

const filterKeyword = ref("");
const filterType = ref("すべての権限");

const users = ref<User[]>([
  {
    userId: "user001",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=山田太郎",
    nickname: "山田太郎",
    permission: "プロジェクト管理者",
    createdAt: "2024-01-15 10:30:00",
  },
  {
    userId: "user002",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=佐藤一郎",
    nickname: "佐藤一郎",
    permission: "管理者",
    createdAt: "2024-01-16 14:20:00",
  },
  {
    userId: "user003",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=鈴木次郎",
    nickname: "鈴木次郎",
    permission: "一般ユーザー",
    createdAt: "2024-01-17 09:15:00",
  },
  {
    userId: "user004",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=田中花子",
    nickname: "田中花子",
    permission: "一般ユーザー",
    createdAt: "2024-01-18 16:45:00",
  },
  {
    userId: "user005",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=高橋三郎",
    nickname: "高橋三郎",
    permission: "ゲスト",
    createdAt: "2024-01-19 11:00:00",
  },
  {
    userId: "user006",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=伊藤美咲",
    nickname: "伊藤美咲",
    permission: "管理者",
    createdAt: "2024-01-20 13:30:00",
  },
  {
    userId: "user007",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=中村健太",
    nickname: "中村健太",
    permission: "一般ユーザー",
    createdAt: "2024-01-21 10:15:00",
  },
  {
    userId: "user008",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=小林優希",
    nickname: "小林優希",
    permission: "ゲスト",
    createdAt: "2024-01-22 15:40:00",
  },
  {
    userId: "user009",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=村田翔太",
    nickname: "村田翔太",
    permission: "一般ユーザー",
    createdAt: "2024-01-23 09:00:00",
  },
  {
    userId: "user010",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=松本美月",
    nickname: "松本美月",
    permission: "プロジェクト管理者",
    createdAt: "2024-01-24 14:25:00",
  },
]);

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const keywordMatch =
      !filterKeyword.value ||
      user.userId.toLowerCase().includes(filterKeyword.value.toLowerCase()) ||
      user.nickname.toLowerCase().includes(filterKeyword.value.toLowerCase());

    const permissionMatch =
      filterType.value === "すべての権限" ||
      user.permission === filterType.value;

    return keywordMatch && permissionMatch;
  });
});

const columns = [
  {
    title: "ハンドルネーム",
    key: "avatar",
    rowDrag: true,
  },
  {
    title: "権限",
    key: "permission",
    width: 200,
  },
  {
    title: "登録日",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 200,
  },
];

const getPermissionColor = (permission: string) => {
  switch (permission) {
    case "プロジェクト管理者":
      return "red";
    case "管理者":
      return "orange";
    case "一般ユーザー":
      return "blue";
    case "ゲスト":
      return "gray";
    default:
      return "gray";
  }
};
</script>

<style scoped>
.settings-title {
  font-size: 16px;
  font-weight: 700;
  color: #000;
  margin-bottom: 20px;
}
.tip-btn {
  margin-left: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  padding: 0;
}
.settings-subtitle {
  font-size: 14px;
  font-weight: 500;
  color: #000;
}
.setting-user-bar {
  margin-top: 40px;
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: 500;
  color: #000;
}

.setting-user-filter {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  border-radius: 4px;
  border: 1px solid #bdbdbd;
  background-color: rgba(0, 0, 0, 0.04);
  gap: 12px;
  margin-bottom: 20px;
}
.filter-label {
  font-size: 14px;
  white-space: nowrap;
}

.user-table-wrapper {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  overflow: hidden;
}
</style>

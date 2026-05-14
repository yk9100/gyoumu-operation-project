<template>
  <div>
    <div class="settings-title">
      <span>種別の一覧</span>
      <a-tooltip placement="top">
        <template #title>
          <span>something...</span>
        </template>
        <a-button class="tip-btn"><QuestionOutlined /></a-button>
      </a-tooltip>
    </div>
    <div class="add-btn-wrap">
      <a-button type="primary" @click="handleCreate">種別の追加</a-button>
    </div>
    <vxe-table border ref="tableRef" :row-config="rowConfig" :data="issueTypes">
      <vxe-column title="種別名" drag-sort>
        <template #default="{ row }">
          <div class="type-name-cell">
            <span class="type-name" @click="handleEdit(row.id)">{{
              row.name
            }}</span>
            <span
              class="type-tag"
              :style="{
                backgroundColor: ISSUE_COLOR_MAP[row.colorId as number],
              }"
              >{{ row.name }}</span
            >
            <span>({{ row.issueCount }})</span>
          </div>
        </template>
      </vxe-column>
      <vxe-column title="課題テンプレート" width="200">
        <template #default="{ row }">
          <div style="display: inline-flex; gap: 8px">
            <FileDoneOutlined v-if="row.useIssueTemplate" />
            <span class="template-tag" @click="handleEdit(row.id)">{{
              row.useIssueTemplate ? "設定済み" : "設定する"
            }}</span>
          </div>
        </template>
      </vxe-column>
      <vxe-column title="削除" width="80" align="center">
        <template #default="{ row }">
          <a-popconfirm
            placement="topRight"
            title="このデータを削除してもよろしいですか?"
            ok-text="削除"
            cancel-text="キャンセル"
            @confirm="handleDelete(row.id)"
            :getPopupContainer="(trigger: HTMLElement) => trigger.parentNode"
          >
            <div class="delete-btn">
              <CloseOutlined />
            </div>
          </a-popconfirm>
        </template>
      </vxe-column>
    </vxe-table>

    <div class="sort-tip">
      並び順を変更するには
      <HolderOutlined style="transform: rotate(90deg)" />
      をドラッグしてください。
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  QuestionOutlined,
  CloseOutlined,
  FileDoneOutlined,
  HolderOutlined,
} from "@ant-design/icons-vue";
import type { VxeTablePropTypes, VxeTableInstance } from "vxe-table";
import { ISSUE_COLOR_MAP } from "~/common/issue";

definePageMeta({
  layout: "project-setting",
});

const route = useRoute();
const router = useRouter();
const tableRef = ref<VxeTableInstance>();

const rowConfig = reactive<VxeTablePropTypes.RowConfig>({
  drag: true,
});

const resultEvent = () => {
  const $table = tableRef.value;
  if ($table) {
    const tableData = $table.getFullData();
    console.log(tableData);
  }
};

const issueTypes = ref([
  {
    id: 1216855,
    name: "リリース",
    colorId: 9,
    useIssueTemplate: true,
    tempSummary: "【2025/11/11（火）18：00～】本番環境リリース作業",
    tempDescription:
      "## 概要\r\n- **リリース日**: 2025/11/05（木）\r\n- **作業時間**: 19：30-21：00（予定）\r\n- **現代技術舎メンバー**:<@U258686>　←適宜修正\r\n- **D1待機メンバー**: <@U552633> <@U595923>　←適宜修正 \r\n-  **詳細チェックリスト**：[こちら](https://docs.google.com/spreadsheets/d/1-bhQCnk0jbIDR77zZDMBXYF5KMN9SPutkxLUOqwNd58/edit?gid=0#gid=0)\r\n\r\n## リリース予定チケット\r\n1. 　　\r\n2. 　　\r\n3. 　　\r\n4. 　　\r\n5.",
    issueCount: 6,
  },
  {
    id: 1170513,
    name: "確認",
    colorId: 4,
    useIssueTemplate: true,
    tempSummary: "【画面名】確認内容（簡単に）",
    tempDescription:
      "**◆基礎情報**\r\n1. 確認日　　　：\r\n2. ブラウザ　　：（　）chrome　（　）edge　（　）FireFox\r\n3. 再現可能なID：　　　　　　　　　　　　（ロールコード：　）\r\n\r\n**◆概要** \r\n\r\n\r\n **◆当該画面のURL**\r\n\r\n\r\n**◆再現手順**",
    issueCount: 15,
  },
  {
    id: 1081754,
    name: "バグ",
    colorId: 2,
    useIssueTemplate: true,
    tempSummary: "【画面名】事象内容（簡単に）",
    tempDescription:
      "**◆基礎情報**\r\n1. 確認日　　　：\r\n2. ブラウザ　　：（　）chrome　（　）edge　（　）FireFox\r\n3. 再現可能なID：　　　　　　　　　　　　（ロールコード：　）\r\n\r\n**◆概要** \r\n\r\n\r\n **◆当該画面のURL**\r\n\r\n\r\n**◆再現手順**\r\n\r\n\r\n**◆期待する効果**",
    issueCount: 36,
  },
  {
    id: 1081756,
    name: "要望",
    colorId: 5,
    useIssueTemplate: true,
    tempSummary: "【画面名】要望内容（簡単に）",
    tempDescription:
      "**◆基礎情報**\r\n1. 確認日　　　：\r\n2. ブラウザ　　：（　）chrome　（　）edge　（　）FireFox\r\n3. 再現可能なID：　　　　　　　　　　　　（ロールコード：　）\r\n\r\n**◆概要** \r\n\r\n\r\n **◆当該画面のURL**\r\n\r\n\r\n**◆再現手順**\r\n\r\n\r\n**◆期待する効果**",
    issueCount: 9,
  },
  {
    id: 1081755,
    name: "タスク",
    colorId: 7,
    useIssueTemplate: false,
    issueCount: 10,
  },
  {
    id: 1081757,
    name: "その他",
    colorId: 8,
    useIssueTemplate: false,
    issueCount: 0,
  },
  {
    id: 1137707,
    name: "検証環境",
    colorId: 3,
    useIssueTemplate: true,
    tempSummary: "画面種別（①～⑥）_事象名",
    tempDescription:
      "**【画面名】** \r\n（　）①全体\r\n（　）②要綱集画面\r\n（　）③エディタ\r\n（　）④検索\r\n（　）⑤アップロード\r\n（　）⑥タグ管理\r\n\r\n **【事象詳細＋再現手順】** \r\n①\r\n②\r\n③\r\n\r\n **【キャプチャ】**",
    issueCount: 46,
  },
]);

const handleDelete = (id: number) => {
  issueTypes.value = issueTypes.value.filter((item) => item.id !== id);
};

const handleCreate = () => {
  router.push(`/my-task/${route.params.projectId}/setting/issue-type/create`);
};

const handleEdit = (issueTypeId: number) => {
  router.push(
    `/my-task/${route.params.projectId}/setting/issue-type/create?issueTypeId=${issueTypeId}`,
  );
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
.add-btn-wrap {
  margin-bottom: 20px;
}
.type-name-cell {
  display: inline-flex;
  gap: 8px;
  margin-left: 8px;
  font-size: 14px;
}
.type-name {
  color: #1677ff;
  font-weight: bold;
  cursor: pointer;
  min-width: 80px;
}
.type-name:hover {
  color: #007bff;
  text-decoration: underline;
}
.delete-btn {
  color: #dc3545;
  font-size: 16px;
  cursor: pointer;
}
.delete-btn:hover {
  color: #c82333;
}
.type-tag {
  display: inline-flex;
  vertical-align: middle;
  border-radius: 20px;
  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: auto;
  padding: 1px 8px;
  white-space: nowrap;
  color: #fff;
  font-size: 13px;
  justify-content: center;
  align-items: center;
}
.template-tag {
  color: #1677ff;
  cursor: pointer;
}
.template-tag:hover {
  color: #007bff;
  text-decoration: underline;
}
.sort-tip {
  font-size: 14px;
  color: #666;
  margin: 12px 0;
}
</style>

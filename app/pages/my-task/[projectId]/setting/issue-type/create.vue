<template>
  <div>
    <div class="settings-title">
      <span>{{ tip }}</span>
      <a-tooltip placement="top">
        <template #title>
          <span>{{ tip }}</span>
        </template>
        <a-button class="tip-btn"><QuestionOutlined /></a-button>
      </a-tooltip>
    </div>
    <div class="back-btn-wrap">
      <div class="back-btn" @click="handleBack">
        <RollbackOutlined />
        <span>戻る</span>
      </div>
    </div>
    <a-form :model="formState" layout="vertical">
      <a-form-item label="種別名" name="issueTypeName" required>
        <div>
          <a-input
            v-model:value="formState.issueTypeName"
            style="width: 440px"
          />
          <div class="form-item-tip">
            <p>課題の種別の名前です。</p>
            <p>プロジェクトごとに自由に種別分けすることができます。</p>
            <p>例：「バグ」「タスク」「TODO」</p>
          </div>
        </div>
      </a-form-item>

      <a-form-item label="背景色" name="issueColorId" required>
        <div>
          <a-radio-group
            v-model:value="formState.issueColorId"
            style="width: 440px"
          >
            <a-radio
              v-for="(color, value) in ISSUE_COLOR_MAP"
              :key="color"
              :value="+value"
            >
              <span :style="{ backgroundColor: color }" class="color-tag">{{
                formState.issueTypeName || "種別名"
              }}</span>
            </a-radio>
          </a-radio-group>
          <div class="form-item-tip">
            <p>課題の種別の背景色です。</p>
          </div>
        </div>
      </a-form-item>

      <div style="margin-bottom: 20px">
        <div class="settings-title">登録済み</div>
        <div class="color-tag-list">
          <div
            v-for="item in issueTypes"
            :key="item.id"
            :style="{ backgroundColor: ISSUE_COLOR_MAP[item.colorId] }"
            class="color-tag"
          >
            {{ item.name }}
          </div>
        </div>
      </div>

      <div>
        <div class="settings-title">
          <span>課題テンプレート</span>
          <a-tooltip placement="top">
            <template #title>
              <span>課題テンプレート</span>
            </template>
            <a-button class="tip-btn"><QuestionOutlined /></a-button>
          </a-tooltip>
        </div>

        <a-form-item label="" name="issueTemplate">
          <div>
            <a-input v-model:value="formState.tempSummary" placeholder="件名" />
          </div>
        </a-form-item>
        <a-form-item label="" name="issueTemplate">
          <div>
            <a-textarea
              v-model:value="formState.tempDescription"
              placeholder="詳細"
              style="min-height: 250px"
            />
          </div>
        </a-form-item>
      </div>

      <div style="text-align: center">
        <a-button type="primary" htmlType="submit">登録</a-button>
      </div>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { RollbackOutlined, QuestionOutlined } from "@ant-design/icons-vue";
import { ISSUE_COLOR_MAP } from "~/common/issue";
definePageMeta({
  layout: "project-setting",
});
const route = useRoute();
const router = useRouter();
const formState = ref({
  issueTypeName: "",
  issueColorId: 9,
  tempSummary: "",
  tempDescription: "",
});

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

const tip = computed(() => {
  return route.query.issueTypeId ? "種別の編集" : "種別の追加";
});

const handleBack = () => {
  router.push(`/my-task/${route.params.projectId}/setting/issue-type`);
};

onMounted(() => {
  if (route.query.issueTypeId) {
    const issueTypeId = Number(route.query.issueTypeId);
    const issueType = issueTypes.value.find((item) => item.id === issueTypeId);
    if (issueType) {
      formState.value = {
        issueTypeName: issueType.name,
        issueColorId: issueType.colorId,
        tempSummary: issueType.tempSummary || "",
        tempDescription: issueType.tempDescription || "",
      };
    }
  }
});
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
.back-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #1677ff;
  cursor: pointer;
}

.back-btn:hover {
  color: #007bff;
  text-decoration: underline;
}

.back-btn-wrap {
  margin-bottom: 20px;
}

.form-item-tip {
  margin-top: 8px;
  font-size: 12px;
  color: #767676;
  line-height: 14px;
}

.form-item-tip p {
  margin: 0;
}

:deep(.ant-form-item-label) {
  padding: 0 !important;
}

.color-tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 18px;
  border-radius: 4px;
  border: 1px solid #c2c2c2;
  background-color: #f3f3f3;
}

.color-tag {
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

:deep(.ant-radio-wrapper) {
  margin-bottom: 8px;
}
</style>

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
      <a-form-item label="カテゴリー名" name="name" required>
        <div>
          <a-input v-model:value="formState.name" style="width: 440px" />
          <div class="form-item-tip">
            <p>課題に汎用的に設定するカテゴリーの名前です。</p>
            <p>プロジェクトごとに自由にカテゴリー分けすることができます。</p>
            <p>例：「サブシステムA」「リサーチ」「デザイン」</p>
          </div>
        </div>
      </a-form-item>

      <div>
        <div class="settings-title">プロジェクトホームに表示しない</div>
        <a-form-item label="" name="archived">
          <div>
            <a-checkbox v-model:value="formState.archived"
              >プロジェクトホームに表示しない</a-checkbox
            >
            <div class="form-item-tip">
              <p>課題に汎用的に設定するカテゴリーの名前です。</p>
              <p>プロジェクトごとに自由にカテゴリー分けすることができます。</p>
              <p>例：「サブシステムA」「リサーチ」「デザイン」</p>
            </div>
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
definePageMeta({
  layout: "project-setting",
});
const route = useRoute();
const router = useRouter();
const formState = ref({
  name: "",
  archived: false,
});

const categorys = ref([
  {
    id: 582513,
    name: "画面",
    archived: false,
    issueCount: 4,
  },
  {
    id: 582514,
    name: "エディタ",
    archived: false,
    issueCount: 9,
  },
  {
    id: 582515,
    name: "目次",
    archived: false,
    issueCount: 0,
  },
  {
    id: 582516,
    name: "検索",
    archived: false,
    issueCount: 1,
  },
  {
    id: 582517,
    name: "API",
    archived: false,
    issueCount: 0,
  },
]);

const tip = computed(() => {
  return route.query.categoryId ? "カテゴリーの編集" : "カテゴリーの追加";
});

const handleBack = () => {
  router.push(`/my-task/${route.params.projectId}/setting/category`);
};

onMounted(() => {
  if (route.query.categoryId) {
    const categoryId = Number(route.query.categoryId);
    const category = categorys.value.find((item) => item.id === categoryId);
    if (category) {
      formState.value.name = category.name;
      formState.value.archived = category.archived;
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

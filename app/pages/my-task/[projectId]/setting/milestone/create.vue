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
    <div class="settings-title">
      <span>発生バージョン/マイルストーン名</span>
    </div>
    <a-form :model="formState" layout="vertical">
      <a-form-item label="発生バージョン/マイルストーン名" name="name" required>
        <div>
          <a-input v-model:value="formState.name" style="width: 440px" />
          <div class="form-item-tip">
            <p>例：1.0-M1</p>
          </div>
        </div>
      </a-form-item>

      <div>
        <div class="settings-title">日付の設定</div>
        <a-form-item label="開始日" name="startDate">
          <div>
            <a-date-picker
              v-model:value="formState.startDate"
              type="date"
            ></a-date-picker>
            <div class="form-item-tip">
              <p>YYYY/MM/DDで入力してください。例：2005/06/01</p>
            </div>
          </div>
        </a-form-item>
        <a-form-item label="終了日" name="endDate">
          <div>
            <a-date-picker
              v-model:value="formState.endDate"
              type="date"
            ></a-date-picker>
            <div class="form-item-tip">
              <p>YYYY/MM/DDで入力してください。例：2005/06/01</p>
            </div>
          </div>
        </a-form-item>
      </div>

      <div>
        <div class="settings-title">詳細</div>
        <a-form-item label="詳細" name="description">
          <div>
            <a-textarea
              v-model:value="formState.description"
              style="min-height: 200px"
            ></a-textarea>
            <div class="form-item-tip">
              <p>
                この発生バージョン/マイルストーンの説明です。例：「バージョン1.0のマイルストーンリリース第１弾」
              </p>
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
import dayjs from "dayjs";
definePageMeta({
  layout: "project-setting",
});
const route = useRoute();
const router = useRouter();
const formState = ref({
  name: "",
  startDate: "",
  endDate: "",
  description: "",
});

const milestones = ref([
  {
    id: 582513,
    name: "milestones1",
    startDate: "2023-01-01",
    endDate: "2023-01-31",
    description: "画面の発生バージョン",
  },
  {
    id: 582514,
    name: "milestones2",
    startDate: "2023-02-01",
    endDate: "2023-02-28",
    description: "エディタの発生バージョン",
  },
  {
    id: 582515,
    name: "milestones3",
    startDate: "2023-03-01",
    endDate: "2023-03-31",
    description: "目次の発生バージョン",
  },
  {
    id: 582516,
    name: "milestones4",
    startDate: "2023-04-01",
    endDate: "2023-04-30",
    description: "検索の発生バージョン",
  },
]);

const tip = computed(() => {
  return route.query.id
    ? "発生バージョン/マイルストーンの編集"
    : "発生バージョン/マイルストーンの追加";
});

const handleBack = () => {
  router.push(`/my-task/${route.params.projectId}/setting/milestone`);
};

onMounted(() => {
  if (route.query.id) {
    const id = Number(route.query.id);
    const milestone = milestones.value.find((item) => item.id === id);
    console.log("milestone", milestone);
    if (milestone) {
      formState.value = {
        ...milestone,
        startDate: dayjs(milestone.startDate),
        endDate: dayjs(milestone.endDate),
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

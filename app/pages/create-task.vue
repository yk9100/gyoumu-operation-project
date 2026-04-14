<template>
  <div class="create-task-page">
    <div class="parent-issue-box">
      <a-button
        v-if="!parentTask"
        type="link"
        style="padding-left: 8px"
        @click="showParentIssueDialog = true"
      >
        <ApartmentOutlined />Add Parent Issue
      </a-button>
      <div class="parent-issue-info" v-else>
        <div class="issue-info">
          <ApartmentOutlined />
          <span class="issue-key">{{ parentTask.issueKey }}</span>
          <span class="issue-title">{{ parentTask.summary }}</span>
        </div>
        <a-button
          type="link"
          style="padding-left: 2px; padding-right: 2px"
          @click="parentTask = null"
        >
          <CloseOutlined />
        </a-button>
      </div>

      <div class="parent-issue-box-right">
        <!-- <a-button>Preview</a-button> -->
        <a-button type="primary" style="width: 80px" @click="handleAddTaskClick"
          >Add</a-button
        >
      </div>
    </div>
    <div class="create-task-form">
      <IssueTypeSelect
        v-model="createTaskState.issueType"
        :allowClear="false"
      />
      <a-input v-model:value="createTaskState.title" placeholder="Add title" />
      <div class="summary-box">
        <a-textarea
          class="summary-input"
          v-model:value="createTaskState.summary"
          placeholder="Add summary"
        />
        <div class="form-item-box">
          <div class="form-item">
            <span class="form-item-label">Status</span>
            <div class="form-item-content">
              <TaskStatusSelect
                v-model="createTaskState.status"
                style="width: 210px"
              />
            </div>
          </div>
          <div class="form-item">
            <span class="form-item-label">Assignee</span>
            <div class="form-item-content">
              <AssigneeSelect
                v-model="createTaskState.assignee"
                style="width: 210px"
              />
            </div>
          </div>
          <div class="form-item">
            <span class="form-item-label">Priority</span>
            <div class="form-item-content">
              <a-select
                v-model:value="createTaskState.priority"
                style="width: 210px"
                :options="[
                  { value: 'High', label: 'High' },
                  { value: 'Normal', label: 'Normal' },
                  { value: 'Low', label: 'Low' },
                ]"
              ></a-select>
            </div>
          </div>
          <div class="form-item">
            <span class="form-item-label">Category</span>
            <div class="form-item-content">
              <TaskCategorySelect
                v-model="createTaskState.category"
                style="width: 210px"
              />
            </div>
          </div>
          <div class="form-item">
            <span class="form-item-label">Start Date</span>
            <div class="form-item-content">
              <a-date-picker
                v-model:value="createTaskState.startDate"
                format="YYYY-MM-DD HH:mm"
                :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm') }"
                style="width: 210px"
              />
            </div>
          </div>
          <div class="form-item">
            <span class="form-item-label">End Date</span>
            <div class="form-item-content">
              <a-date-picker
                v-model:value="createTaskState.endDate"
                format="YYYY-MM-DD HH:mm"
                :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm') }"
                style="width: 210px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="margin-top: 24px">
      <FileUploadArea />
    </div>

    <div class="page-footer">
      <!-- <a-button>Preview</a-button> -->
      <a-button type="primary" style="width: 80px" @click="handleAddTaskClick"
        >Add</a-button
      >
    </div>
    <AssociationTasksDialog
      v-model:visible="showParentIssueDialog"
      @cancel="handleCancel"
      @onTaskSelect="handleParentTaskSelect"
    />
  </div>
</template>
<script lang="ts" setup>
import { ApartmentOutlined, CloseOutlined } from "@ant-design/icons-vue";
import dayjs from "dayjs";
import { useRouter } from "vue-router";
import { EIssueType, ETaskStatus } from "~/types";
import type { Task } from "~/types/task";
const router = useRouter();
const parentTask = ref<Task | null>(null);
const showParentIssueDialog = ref(false);
const createTaskState = ref({
  issueType: EIssueType.Release,
  title: "【2025/11/11（火）18：00～】本番環境リリース作業",
  summary: `## 概要
- **リリース日**: 2025/11/05（木）
- **作業時間**: 19：30-21：00（予定）
- **現代技術舎メンバー**:@杉山大輔　←適宜修正
- **D1待機メンバー**: @6225髙井香緒莉 @6225神宮沙樹　←適宜修正 
-  **詳細チェックリスト**：[こちら](https://docs.google.com/spreadsheets/d/1-bhQCnk0jbIDR77zZDMBXYF5KMN9SPutkxLUOqwNd58/edit?gid=0#gid=0)`,
  status: ETaskStatus.Open,
  assignee: "",
  priority: "Normal",
  category: "",
  startDate: "",
  endDate: "",
});

const handleParentTaskSelect = (item: Task) => {
  parentTask.value = item;
};

const handleCancel = () => {
  showParentIssueDialog.value = false;
};

const handleAddTaskClick = () => {
  router.push("/my-task");
};
</script>
<style scoped>
.create-task-page {
}

.parent-issue-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.parent-issue-info {
  display: flex;
  align-items: center;
  gap: 4px;
}

.issue-info {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: #f5f5f5;
}

.issue-info:hover {
  background-color: #e6f7ff;
}

.issue-key {
  font-weight: 600;
  text-decoration: underline;
  color: #1890ff;
}

.issue-title {
  font-size: 14px;
}

.create-task-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summary-box {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
}

.summary-input {
  height: 200px;
}

.form-item-box {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
}

.form-item {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 0 0 48%;
  border-top: 1px solid #bdbdbd;
  border-bottom: 1px solid #bdbdbd;
  padding: 10px 20px 10px 10px;
  margin-top: -1px;
}

.form-item-label {
  display: inline-block;
  flex: 0 1 30%;
  font-size: 14px;
  color: #333;
}

.form-item-content {
  flex: 1 1 70%;
}

.page-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding: 12px;
}

.parent-issue-box-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
}
</style>

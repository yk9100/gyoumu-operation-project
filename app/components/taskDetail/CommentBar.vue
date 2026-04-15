<template>
  <div
    class="comment-bar"
    :style="{
      width: layoutStore.sidebarOpen
        ? 'calc(100% - 240px)'
        : 'calc(100% - 80px)',
    }"
  >
    <div v-if="barCollapsed" class="collapse-bar">
      <div style="margin-right: 8px">
        <FileUploadButton v-model="attachmentList" />
      </div>
      <div class="collapse-comment-input" @click="handleExpand">
        Write a comment, use @mention to notify a colleague...
      </div>
      <div class="collapse-change-status">
        <div class="collapse-split-line" />
        <div class="collapse-change-status-button" @click="handleExpand">
          <span class="collapse-change-status-icon"><EditFilled /></span>
          <span>Change Status</span>
        </div>
      </div>
    </div>
    <div v-else class="expand-bar">
      <FileUploadButton v-model="attachmentList" />
      <div class="expand-comment-content">
        <div class="expand-comment-form-box">
          <div style="flex: 1">
            <a-textarea
              v-model="comment"
              placeholder="Write a comment, use @mention to notify a colleague..."
              :rows="10"
            />
          </div>
          <div class="expand-comment-form">
            <div class="form-item">
              <span class="form-item-label">Status</span>
              <TaskStatusSelect
                v-model="fromState.status"
                style="width: 100%"
              />
            </div>
            <div class="form-item">
              <span class="form-item-label">Assignee</span>
              <div class="form-item-content">
                <AssigneeSelect
                  v-model="fromState.assignee"
                  style="width: 100%"
                />
              </div>
            </div>

            <div class="form-item">
              <span class="form-item-label">Start Date</span>
              <div class="form-item-content">
                <a-date-picker
                  v-model:value="fromState.startDate"
                  format="YYYY-MM-DD HH:mm"
                  :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm') }"
                  style="width: 100%"
                />
              </div>
            </div>
            <div class="form-item">
              <span class="form-item-label">End Date</span>
              <div class="form-item-content">
                <a-date-picker
                  v-model:value="fromState.endDate"
                  format="YYYY-MM-DD HH:mm"
                  :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm') }"
                  style="width: 100%"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="expand-comment-footer">
          <a-button @click="handleCollapse">Close</a-button>
          <a-button type="primary" @click="handleSubmit">Submit</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EditFilled } from "@ant-design/icons-vue";
import dayjs from "dayjs";
import { ETaskStatus } from "~/types";
const layoutStore = useLayoutStore();
const attachmentList = defineModel<File[]>("attachmentList", {
  default: () => [],
});
const barCollapsed = ref(true);
const comment = ref("");
const fromState = ref<{
  status: string;
  assignee: string;
  startDate: string;
  endDate: string;
}>({
  status: ETaskStatus.Open,
  assignee: "",
  startDate: "",
  endDate: "",
});
const handleCollapse = () => {
  barCollapsed.value = true;
};
const handleExpand = () => {
  barCollapsed.value = false;
};
const handleSubmit = () => {};
</script>

<style scoped>
.comment-bar {
  display: flex;
  align-items: center;
  position: fixed;
  right: 0px;
  bottom: 0px;
  box-shadow: 0 -1px 2px 0 rgba(0, 0, 0, 0.3);
  background-color: #fff;
  padding: 0 12px;
  transition:
    all 0.2s,
    background 0s;
}
.collapse-bar {
  height: 68px;
  display: flex;
  align-items: center;
  width: 100%;
  padding-right: 20px;
}
.expand-bar {
  width: 100%;
  height: 340px;
  display: flex;
  gap: 8px;
  align-items: center;
}
.collapse-comment-input {
  flex: 1;
  height: 36px;
  line-height: 36px;
  border-radius: 4px;
  border: 1px solid #999;
  padding: 0 8px;
  color: #767676;
}

.collapse-change-status {
  display: flex;
  align-items: center;
  height: 36px;
}
.collapse-split-line {
  height: 36px;
  width: 1px;
  background-color: #999;
  margin: 0 10px 0 20px;
}
.collapse-change-status-button {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #222;
  cursor: pointer;
  height: 36px;
  border-radius: 4px;
  padding: 0 12px;
}
.collapse-change-status-button:hover {
  background-color: #e6f7ff;
}
.collapse-change-status-button:hover .collapse-change-status-icon {
  color: #1890ff;
}
.expand-comment-form-box {
  display: flex;
  gap: 20px;
}
.expand-comment-footer {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.expand-comment-content {
  height: 300px;
  width: 100%;
  padding-right: 40px;
}

.expand-comment-form {
  width: 340px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>

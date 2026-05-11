<template>
  <div class="page-root">
    <GlobalHeader>
      <template #left>
        <NuxtLink :to="taskListPath" class="global-header-back">
          <ArrowLeftOutlined />マイタスク
        </NuxtLink>
      </template>
    </GlobalHeader>
    <div class="page-content task-detail-page" ref="pageRef">
      <div class="task-detail-header">
        <div class="task-detail-header-left">
          <span
            class="issue-type"
            :style="{ backgroundColor: issueType.color }"
            >{{ issueType.name }}</span
          >
          <span>{{ issueKey }}</span>
        </div>
        <div class="task-detail-header-right">
          <span
            ><span class="date-label">Start Date</span
            ><span class="date-value">{{ startDate }}</span></span
          >
          <span
            ><span class="date-label">Due Date</span
            ><span class="date-value">{{ dueDate }}</span></span
          >
          <span
            class="task-status"
            :style="{ backgroundColor: status.color }"
            >{{ status.name }}</span
          >
        </div>
      </div>
      <div class="task-detail-title">
        {{ summary }}
      </div>
      <div class="task-detail-content">
        <div class="created-info">
          <a-avatar
            src="https://assets.backlog.jp/playassets/1.78.2/icons/default/100/10.png"
            :alt="createdUser.name"
            size="small"
            class="avatar"
          />
          <div class="created-user-info">
            <span class="created-user-name">{{ createdUser.name }}</span>
            <span class="created-date">Created {{ created }}</span>
          </div>
        </div>
        <div class="release-note" v-html="renderedContent"></div>
        <div class="form-item-box">
          <div class="form-item">
            <span class="form-item-label">Priority</span>
            <div class="form-item-content">
              {{ priority.name }}
            </div>
          </div>
          <div class="form-item">
            <span class="form-item-label">Assignee</span>
            <div class="form-item-content">
              <a-avatar
                :src="`https://assets.backlog.jp/playassets/1.78.2/${assignee.icon}`"
                :alt="assignee.name"
                size="small"
              />
              {{ assignee.name }}
            </div>
          </div>

          <div class="form-item">
            <span class="form-item-label">Category</span>
            <div class="form-item-content"></div>
          </div>
        </div>
      </div>

      <div class="attachment-sub-task-tabs">
        <TaskDetailAttachmentSubTaskTabs
          :attachments="attachments"
          :subTasks="childIssues"
        />
      </div>

      <div class="comment-list-wrap">
        <TaskDetailCommentList :comments="comments" />
      </div>
      <TaskDetailCommentBar
        v-model:attachmentList="attachmentList"
        @sendComment="sendComment"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
import { taskDetailCommentsMock, taskDetailMock } from "~/mock/taskDetail";
import MarkdownIt from "markdown-it";
import type { TaskComment } from "~/types/task";
const md = new MarkdownIt({
  html: true, // 允许 HTML 标签
  linkify: true, // 自动识别 URL
  typographer: true, // 优化排版
});
const route = useRoute();
const pageRef = ref<HTMLDivElement | null>(null);
const {
  issueType,
  issueKey,
  startDate,
  dueDate,
  status,
  summary,
  createdUser,
  created,
  description,
  priority,
  assignee,
  attachments,
  childIssues,
} = taskDetailMock;
console.log("taskDetailMock", taskDetailMock);
const comments = ref(taskDetailCommentsMock);

console.log("comments", comments.value);
const attachmentList = ref<File[]>([]);
const taskListPath = computed(() => {
  return `/my-task/${route.params.projectId}/list`;
});

const renderedContent = computed(() => {
  // 预处理：将 Slack ID 转换为可读格式
  let processed = description.replace(
    /<@U(\d+)>/g,
    '<span class="slack-user">@user_$1</span>',
  );
  return md.render(processed);
});

const sendComment = (comment: TaskComment) => {
  comments.value.push(comment);
  console.log("pageRef.value", pageRef.value);
  if (pageRef.value) {
    console.log("pageRef.value?.scrollHeight", pageRef.value?.scrollHeight);
    setTimeout(() => {
      pageRef.value?.scrollTo({
        top: pageRef.value?.scrollHeight ? pageRef.value.scrollHeight + 64 : 0,
      });
    }, 200);
  }
};
</script>
<style scoped>
.task-detail-page {
  /* padding: 20px; */
  overflow-y: auto;
  padding-bottom: 68px;
}

.task-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.task-detail-header-left {
  display: flex;
  align-items: center;
}

.issue-type {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  border-radius: 20px;
  color: #fff;
}

.task-status {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  border-radius: 20px;
  color: #fff;
  width: 110px;
}

.task-detail-header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.issue-type {
  margin-right: 8px;
}

.date-label {
  color: #666;
  font-size: 12px;
  margin-right: 8px;
}

.date-value {
  color: #111;
  font-size: 14px;
}

.task-detail-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.task-detail-content {
  padding: 8px 25px;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.created-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: #f5f5f5;
}

.created-user-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.created-user-name {
  font-size: 14px;
  font-weight: bold;
}

.created-date {
  font-size: 12px;
  color: #666;
}

:deep(.release-note h2) {
  font-size: 14px !important;
  margin-top: 1.5rem;
  border-bottom: 1px solid #eaecef;
}
:deep(.release-note ul),
:deep(.release-note ol) {
  margin: 0.5rem 0;
  padding-left: 2rem;
}
:deep(.release-note li) {
  margin: 0.25rem 0;
}
:deep(.slack-user) {
  background: #e1f5fe;
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  font-size: 12px;
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

.attachment-sub-task-tabs {
  margin-top: 20px;
}

.comment-list-wrap {
  margin-top: 30px;
}
</style>

<template>
  <div>
    <div class="comment-list-title">
      Comments ({{ taskDetailCommentsMock.length }})
    </div>
    <div class="comment-list">
      <div
        v-for="comment in taskDetailCommentsMock"
        :key="comment.id"
        class="comment-item"
      >
        <a-avatar
          :size="42"
          src="https://assets.backlog.jp/playassets/1.78.2/icons/default/100/10.png"
          :alt="comment.createdUser.name"
          class="avatar"
        />
        <div class="comment-content">
          <div class="comment-user-info">
            <span class="comment-user-name">{{
              comment.createdUser.name
            }}</span>
            <span class="comment-date">{{ comment.createdOn }}</span>
          </div>
          <div class="comment-content">
            <div v-for="log in comment.changelog" class="comment-log">
              {{ log.field }}: {{ log.type || log.newValue }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { taskDetailCommentsMock } from "../../mock/taskDetail";

const taskDetailComments = ref(taskDetailCommentsMock);

console.log("taskDetailComments", taskDetailComments.value);
</script>

<style scoped>
.comment-list-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}
.comment-list {
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  padding: 0 25px;
}
.comment-item {
  padding: 15px 0;
  display: flex;
  border-bottom: 1px solid #bdbdbd;
}

.comment-item:last-child {
  border-bottom: none;
}

.avatar {
  margin-right: 8px;
}

.comment-user-info {
  height: 42px;
  display: flex;
  flex-direction: column;
  line-height: 20px;
  justify-content: center;
}
.comment-user-name {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}
.comment-date {
  font-size: 12px;
  color: #767676;
}
.comment-log {
  font-size: 12px;
  line-height: 20px;
  color: #222;
  white-space: pre-wrap;
}
.comment-content {
  width: calc(100% - 50px);
}
</style>

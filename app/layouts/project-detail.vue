<template>
  <NuxtLayout name="default">
    <div class="page-root">
      <GlobalHeader />
      <div class="page-content">
        <div class="project-title">七年前の約束が呼び覚ました沈黙の証人</div>
        <div class="breadcrumb">
          <NuxtLink
            v-for="item in breadcrumb"
            :key="item.label"
            :to="item.link"
            :class="[
              'breadcrumb-item',
              item.link === $route.path ? 'breadcrumb-item-active' : '',
            ]"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
        <div class="project-detail-content">
          <slot />
        </div>
        <button class="vertical-btn" @click="showDrawer">
          <span v-for="char in buttonText" :key="char">
            {{ char }}<br v-if="char !== buttonText[buttonText.length - 1]" />
          </span>
        </button>
        <a-drawer
          v-model:open="open"
          class="custom-class"
          root-class-name="root-class-name"
          title="お知らせ"
          placement="right"
        >
          <a-spin :spinning="commentsLoading">
            <div class="form-item">
              <span>お知らせ先：</span>
              <a-select v-model:value="notificationTarget" style="flex: 1">
                <a-option value="仕入先1">仕入先1</a-option>
                <a-option value="仕入先2">仕入先2</a-option>
              </a-select>
              <a-button type="primary">投稿する</a-button>
            </div>
            <div class="form-item">
              <a-textarea
                v-model:value="notificationContent"
                style="min-height: 150px"
                placeholder="コメント、連絡事項の入力"
              />
            </div>

            <div class="comment-list">
              <div
                v-for="comment in comments"
                :key="comment.id"
                class="comment-item"
              >
                <div class="comment-header">
                  <a-avatar :src="comment.author.avatar" size="small" />
                  <span class="comment-author">{{ comment.createdBy }}</span>
                  <span class="comment-time">{{
                    formatDate(comment.createdAt)
                  }}</span>
                </div>
                <div class="comment-body">
                  <p>{{ comment.content }}</p>
                </div>
              </div>
            </div>
          </a-spin>
        </a-drawer>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { IProjectComment } from "@/types/project-comment";
import { projectCommentMock } from "@/mock/project-comment";

const comments = ref<IProjectComment[]>([]);
const commentsLoading = ref(false);

const open = ref(false);
const route = useRoute();
const buttonText = "お知らせ";
const showDrawer = () => {
  open.value = true;
};
const notificationTarget = ref("");
const notificationContent = ref("");

const breadcrumb = computed(() => {
  return [
    {
      label: "総合",
      link: `/project-management/detail/${route.params.id}/step/1`,
    },
    {
      label: "基本",
      link: `/project-management/detail/${route.params.id}/step/2`,
    },
    {
      label: "見積",
      link: `/project-management/detail/${route.params.id}/step/3`,
    },
    {
      label: "注文",
      link: `/project-management/detail/${route.params.id}/step/4`,
    },
    {
      label: "開発完了",
      link: `/project-management/detail/${route.params.id}/step/5`,
    },
    {
      label: "検収",
      link: `/project-management/detail/${route.params.id}/step/6`,
    },
    {
      label: "請求",
      link: `/project-management/detail/${route.params.id}/step/7`,
    },
  ];
});

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const getComments = async () => {
  commentsLoading.value = true;
  try {
    setTimeout(() => {
      comments.value = projectCommentMock;
      commentsLoading.value = false;
    }, 1000);
  } catch (error) {
    console.error("Error fetching comments:", error);
  } finally {
    // commentsLoading.value = false;
  }
};

watch(open, (newVal) => {
  if (newVal) {
    getComments();
  }
});

onMounted(() => {
  console.log("route.params.id", route.params.id);
});
</script>

<style scoped>
.project-detail-content {
  height: calc(100vh - 330px);
  overflow-y: auto;
}

.project-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 24px;
  background-color: #f5f5f5;
  padding: 12px 16px;
}
.vertical-btn {
  position: fixed;
  top: 80px;
  right: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fa8c16;
  border: none;
  border-radius: 8px;
  width: 48px;
  padding: 12px 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  color: #fff;
  width: 30px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.vertical-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5714;
  text-align: center;
  word-break: break-all;
}

.vertical-btn:hover {
  opacity: 0.8;
}

.vertical-btn:active {
  opacity: 0.8;
}
.form-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.form-item span {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5714;
  text-align: center;
  word-break: break-all;
}

.comment-list {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
}

.comment-item {
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 12px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.comment-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #e8e8e8;
}

.comment-author {
  font-weight: 600;
  color: #1890ff;
  font-size: 14px;
}

.comment-time {
  margin-left: auto;
  font-size: 12px;
  color: #999;
}

.comment-body {
  padding: 16px;
}

.comment-body p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  word-break: break-word;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.breadcrumb a {
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  word-break: break-all;
}

.breadcrumb-item {
  background-color: #fa8c16;
  color: #fff;
  padding: 0 16px;
  border-radius: 20px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #fa8c16;
  position: relative;
}

.breadcrumb-item::after {
  content: "";
  display: inline-block;
  width: 0;
  height: 0;
  margin: 0 8px;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 6px solid white;
  position: absolute;
  top: 50%;
  right: -2px;
  transform: translateY(-50%);
  z-index: 100;
}

.breadcrumb-item-active {
  background-color: #fff;
  color: #fa8c16;
}

.breadcrumb-item:hover {
  background-color: #fff;
  color: #fa8c16;
}
</style>

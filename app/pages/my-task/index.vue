<template>
  <div class="home-root">
    <GlobalHeader />
    <div class="page-content">
      <div class="search-bar">
        <a-input
          v-model:value="searchKeyword"
          placeholder="プロジェクト名またはPMで検索"
          class="search-input"
          @keyup.enter="handleSearch"
        />
        <a-button type="primary" @click="handleSearch">検索</a-button>
      </div>

      <div class="project-list-wrapper">
        <div class="project-list">
          <div
            v-for="project in filteredProjects"
            :key="project.projectCode"
            class="project-item"
            @click="navigateToProject(project.projectCode)"
          >
            <div class="project-content">
              <img
                :src="project.projectLogo"
                alt="project-logo"
                class="project-logo"
              />
              <div class="project-info">
                <div class="project-name">{{ project.projectName }}</div>
                <div class="project-manager">
                  <span class="label">PM:</span>
                  <span>{{ project.projectManager }}</span>
                </div>
              </div>
            </div>
            <a-button type="link">
              <RightOutlined />
            </a-button>
          </div>
        </div>

        <div v-if="filteredProjects.length === 0" class="empty-state">
          <a-empty description="該当するプロジェクトが見つかりません" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RightOutlined } from "@ant-design/icons-vue";

const router = useRouter();
const searchKeyword = ref("");

const projectList = ref([
  {
    projectLogo: "https://api.dicebear.com/7.x/lorelei/svg?seed=John",
    projectName: "プロジェクト1",
    projectCode: "PJ-2024-001",
    projectManager: "山田太郎",
  },
  {
    projectLogo: "https://api.dicebear.com/7.x/lorelei/svg?seed=Jane",
    projectName: "プロジェクト2",
    projectCode: "PJ-2024-002",
    projectManager: "佐藤一郎",
  },
  {
    projectLogo: "https://api.dicebear.com/7.x/lorelei/svg?seed=Bob",
    projectName: "プロジェクト3",
    projectCode: "PJ-2024-003",
    projectManager: "鈴木次郎",
  },
  {
    projectLogo: "https://api.dicebear.com/7.x/lorelei/svg?seed=Alice",
    projectName: "プロジェクト4",
    projectCode: "PJ-2024-004",
    projectManager: "田中花子",
  },
  {
    projectLogo: "https://api.dicebear.com/7.x/lorelei/svg?seed=Mike",
    projectName: "プロジェクト5",
    projectCode: "PJ-2024-005",
    projectManager: "高橋三郎",
  },
  {
    projectLogo: "https://api.dicebear.com/7.x/lorelei/svg?seed=Sarah",
    projectName: "プロジェクト6",
    projectCode: "PJ-2024-006",
    projectManager: "伊藤美咲",
  },
  {
    projectLogo: "https://api.dicebear.com/7.x/lorelei/svg?seed=Tom",
    projectName: "プロジェクト7",
    projectCode: "PJ-2024-007",
    projectManager: "中村健太",
  },
  {
    projectLogo: "https://api.dicebear.com/7.x/lorelei/svg?seed=Emily",
    projectName: "プロジェクト8",
    projectCode: "PJ-2024-008",
    projectManager: "小林優希",
  },
  {
    projectLogo: "https://api.dicebear.com/7.x/lorelei/svg?seed=David",
    projectName: "プロジェクト9",
    projectCode: "PJ-2024-009",
    projectManager: "村田翔太",
  },
  {
    projectLogo: "https://api.dicebear.com/7.x/lorelei/svg?seed=Lisa",
    projectName: "プロジェクト10",
    projectCode: "PJ-2024-010",
    projectManager: "松本美月",
  },
]);

const filteredProjects = computed(() => {
  if (!searchKeyword.value) {
    return projectList.value;
  }
  const keyword = searchKeyword.value.toLowerCase();
  return projectList.value.filter(
    (project) =>
      project.projectName.toLowerCase().includes(keyword) ||
      project.projectManager.toLowerCase().includes(keyword),
  );
});

const handleSearch = () => {
  // 搜索逻辑已通过 computed 实现
};

const navigateToProject = (projectId: string) => {
  router.push(`/my-task/${projectId}/dashboard`);
};
</script>

<style scoped>
.home-root {
  background-color: #f5f5f5;
  min-height: 100vh;
  box-sizing: border-box;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f1f1f;
  margin: 0;
}

.search-bar {
  display: flex;
  gap: 12px;
  margin: 12px 0;
  justify-content: center;
  align-items: center;
}

.search-input {
  width: 300px;
}

.project-list-wrapper {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  overflow: hidden;
  max-height: calc(100vh - 280px);
  display: flex;
  flex-direction: column;
}

.project-list {
  overflow-y: auto;
  flex: 1;
}

.project-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  gap: 16px;
  border-bottom: 1px solid #f5f5f5;
  transition: background-color 0.2s ease;
  cursor: pointer;
  justify-content: space-between;
}

.project-item:last-child {
  border-bottom: none;
}

.project-item:hover {
  background-color: #fafafa;
}

.project-logo {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #f5f5f5;
  flex-shrink: 0;
}

.project-info {
  flex: 1;
  min-width: 0;
}

.project-name {
  font-size: 15px;
  font-weight: 600;
  color: #1f1f1f;
  margin-bottom: 4px;
}

.project-manager {
  font-size: 13px;
  color: #666;
}

.project-manager .label {
  color: #999;
  margin-right: 4px;
}

.empty-state {
  padding: 48px;
  text-align: center;
}

.project-content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
</style>

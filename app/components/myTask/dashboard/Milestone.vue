<template>
  <div class="task-milestone">
    <div class="title--fourth">マイルストーン</div>
    <div class="card--default category-list">
      <div
        class="category-item"
        v-for="category in categorys"
        :key="category.name"
      >
        <div class="category-name" @click="navigateToTaskList(category.name)">
          {{ category.name }}
        </div>
        <div class="process-bar">
          <div
            class="process-bar-item"
            v-for="item in category.taskStatus"
            :key="item.status"
            :style="{
              width: `${(item.count / category.taskStatus.reduce((acc, a) => a.count + acc, 0)) * 100}%`,
              backgroundColor: item.color,
            }"
          ></div>
        </div>
        <div class="process-completed">
          <div style="color: #111">終了日：{{ category.endDate }}</div>
          <div>
            {{
              Math.floor(
                (category.taskStatus.find((item) => item.status === "Closed")!
                  .count /
                  category.taskStatus.reduce((acc, a) => a.count + acc, 0)) *
                  100,
              )
            }}% 完了
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
const categorys = ref([
  {
    name: "フェーズ1",
    endDate: "2023/12/31",
    taskStatus: [
      {
        status: "Open",
        count: 4,
        color: "#ed8077",
      },
      {
        status: "検証機確認済",
        count: 0,
        color: "#dc9925",
      },
      {
        status: "Closed",
        count: 107,
        color: "#a1af2f",
      },
    ],
  },
  {
    name: "エディタ2",
    endDate: "2024/01/31",
    taskStatus: [
      {
        status: "Open",
        count: 4,
        color: "#ed8077",
      },
      {
        status: "検証機確認済",
        count: 0,
        color: "#dc9925",
      },
      {
        status: "Closed",
        count: 107,
        color: "#a1af2f",
      },
    ],
  },
  {
    name: "フェーズ3",
    endDate: "2024/02/31",
    taskStatus: [
      {
        status: "Resolved",
        count: 3,
        color: "#5eb5a6 ",
      },
      {
        status: "検証機確認済",
        count: 0,
        color: "#dc9925",
      },
      {
        status: "Closed",
        count: 107,
        color: "#a1af2f",
      },
    ],
  },
]);

const navigateToTaskList = (category: string) => {
  router.push(`/my-task/${route.params.projectId}/list?category=${category}`);
};
</script>

<style scoped>
.task-category {
  flex: 1;
}
.title--fourth {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 10px;
}
.card--default {
  padding: 18px;
  background-color: #fff;
  border: solid 1px #c2c2c2;
  border-radius: 4px;
}
.process-bar {
  width: 100%;
  height: 12px;
  display: flex;
  margin-bottom: 4px;
}
.process-bar-item {
  height: 100%;
}

.process-completed {
  color: #767676;
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.category-name {
  color: #00759b;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 4px;
  cursor: pointer;
}

.category-name:hover {
  text-decoration: underline;
}
</style>

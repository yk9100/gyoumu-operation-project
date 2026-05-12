<template>
  <div class="task-dashboard-status">
    <div class="title--fourth">ステータス</div>
    <div class="card--default">
      <div class="process-bar">
        <div
          class="process-bar-item"
          v-for="item in taskStatus"
          :key="item.status"
          :style="{
            width: `${(item.count / taskTotal) * 100}%`,
            backgroundColor: item.color,
          }"
        ></div>
      </div>
      <div class="process-completed">
        {{
          Math.floor(
            (taskStatus.find((item) => item.status === "Closed")!.count /
              taskTotal) *
              100,
          )
        }}% Closed
      </div>

      <div class="status-box">
        <div
          class="status-item"
          v-for="item in taskStatus"
          :key="item.status"
          @click="navigateToTaskList(item.status)"
        >
          <div class="status-item-label">{{ item.status }}</div>
          <div
            class="status-item-count"
            :style="{ backgroundColor: item.color }"
          >
            {{ item.count }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
const taskStatus = ref([
  {
    status: "Open",
    count: 4,
    color: "#ed8077",
  },
  {
    status: "In Progress",
    count: 7,
    color: "#4488c5",
  },
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
]);

const taskTotal = computed(() => {
  return taskStatus.value.reduce((total, item) => total + item.count, 0);
});

const navigateToTaskList = (status: string) => {
  router.push(`/my-task/${route.params.projectId}/list?status=${status}`);
};
</script>

<style scoped>
.task-dashboard-status {
  width: 475px;
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
  text-align: right;
  margin-bottom: 6px;
}

.status-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
}

.status-item-label {
  font-size: 12px;
  text-align: center;
  color: #333;
}
.status-item-count {
  width: 100px;
  height: 22px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: 12px;
}

.status-item-count:hover {
  opacity: 0.8;
}

.status-box {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>

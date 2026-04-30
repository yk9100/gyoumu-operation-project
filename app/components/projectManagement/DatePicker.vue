<template>
  <div class="project-date-picker">
    <a-date-picker
      v-model:value="model.year"
      picker="year"
      style="width: 200px; margin-bottom: 8px"
      :allowClear="false"
    />
    <div class="project-month-group">
      <a-button
        v-for="item in PROJECT_MONTH_GROUP.slice(
          0,
          PROJECT_MONTH_GROUP.length - 2,
        )"
        :key="item.label"
        style="border-radius: 16px"
        @click="onMonthGroupChange(item.value)"
      >
        {{ item.label }}
      </a-button>
    </div>
    <div class="project-month-group">
      <a-button
        v-for="item in PROJECT_MONTH_GROUP.slice(
          PROJECT_MONTH_GROUP.length - 2,
        )"
        :key="item.label"
        style="border-radius: 16px"
        @click="onMonthGroupChange(item.value)"
      >
        {{ item.label }}
      </a-button>
    </div>
    <div class="project-month-list" style="margin-bottom: 8px">
      <a-button
        v-for="item in PROJECT_MONTH.slice(0, 6)"
        :key="item.label"
        class="project-month-item"
        :style="
          model.months?.includes(item.value)
            ? 'background-color: #1890ff; color: #fff;'
            : ''
        "
        @click="onMonthChange(item.value)"
      >
        {{ item.label }}
      </a-button>
    </div>
    <div class="project-month-list">
      <a-button
        v-for="item in PROJECT_MONTH.slice(6, 12)"
        :key="item.label"
        class="project-month-item"
        :style="
          model.months?.includes(item.value)
            ? 'background-color: #1890ff; color: #fff;'
            : ''
        "
        @click="onMonthChange(item.value)"
      >
        {{ item.label }}
      </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

import {
  PROJECT_MONTH_GROUP,
  PROJECT_MONTH,
} from "@/components/projectManagement/common";
export interface IDataPickerValue {
  year?: Dayjs;
  months?: string[];
}

const model = defineModel<IDataPickerValue>({
  default: () => ({
    year: dayjs(),
    months: [],
  }),
});

const onMonthGroupChange = (groupMonth: string[]) => {
  console.log(groupMonth);
  model.value.months = groupMonth;
};

const onMonthChange = (month: string) => {
  if (model.value.months?.includes(month)) {
    model.value.months = model.value.months.filter((item) => item !== month);
  } else {
    model.value.months = [...(model.value.months || []), month];
  }
};

watch(
  () => model.value.year,
  () => {
    model.value.months = [];
  },
);
</script>

<style scoped>
.project-date-picker {
  display: flex;
  flex-direction: column;
}

.project-month-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.project-month-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.project-month-item {
  width: 54px;
  padding-left: 0;
  padding-right: 0;
}
</style>

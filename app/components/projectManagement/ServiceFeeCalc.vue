<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-form-item
          label="担当者"
          :name="formName"
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 18 }"
        >
          <div class="calc-item-wrap">
            <div v-for="(item, index) in state" :key="index" class="calc-item">
              <a-select v-model:value="item.responsiblePerson">
                <a-select-option value="1">担当者1</a-select-option>
                <a-select-option value="2">担当者2</a-select-option>
              </a-select>
              <div class="calc-day-input">
                <a-input v-model:value="item.serviceDay" type="number" />日
              </div>
              <a-button
                class="remove-btn"
                v-if="state.length > 1"
                @click="removeItem(index)"
              >
                <MinusOutlined />
              </a-button>
            </div>
            <a-button class="add-btn" @click="addItem">
              <PlusOutlined />
            </a-button>

            <div class="tip">＊インターン、アルバイトの稼動は含みません</div>
            <div class="tip">＊人ごとにまとめた予定工数を記入してください</div>
            <div class="tip">＊単位は「人日」で記入してください</div>
          </div>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <a-form-item
          label="労務費合計"
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 10 }"
        >
          <a-input
            :value="
              state.reduce(
                (acc, cur) => acc + Number(cur.serviceDay) * 20000,
                0,
              )
            "
            disabled
          />
        </a-form-item>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { PlusOutlined, MinusOutlined } from "@ant-design/icons-vue";

export type ServiceFeeCalcValue = {
  responsiblePerson: string;
  serviceDay: string;
};
const props = defineProps<{
  value?: ServiceFeeCalcValue[];
  formName?: string;
}>();

const emit = defineEmits<{
  (e: "update:value", value: ServiceFeeCalcValue[]): void;
  (e: "change", value: ServiceFeeCalcValue[]): void;
}>();

const removeItem = (index: number) => {
  state.value.splice(index, 1);
};
const addItem = () => {
  state.value.push({
    responsiblePerson: "",
    serviceDay: "",
  });
};
const state = ref<ServiceFeeCalcValue[]>([
  {
    responsiblePerson: "",
    serviceDay: "",
  },
]);

watch(
  () => state.value,
  (newVal) => {
    emit("update:value", newVal);
    emit("change", newVal);
  },
  { deep: true },
);
</script>

<style scoped>
.calc-item {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
}
.tip {
  font-size: 12px;
  color: #999;
}
.calc-day-input {
  display: flex;
  align-items: center;
  gap: 4px;
}
.remove-btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(120%, -50%);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding-left: 0;
  padding-right: 0;
  border-color: red;
  color: red;
}
.remove-btn:hover {
  border-color: red;
  color: red;
  opacity: 0.5;
}
.add-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding-left: 0;
  padding-right: 0;
  margin-top: 4px;
}

.calc-item-wrap {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>

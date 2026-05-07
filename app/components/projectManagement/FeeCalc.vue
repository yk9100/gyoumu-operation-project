<template>
  <div class="fee-calc">
    <div>
      <a-select v-model:value="feeCalc.categoryType">
        <a-select-option value="受託">受託</a-select-option>
        <a-select-option value="保守">保守</a-select-option>
      </a-select>
    </div>
    <div class="tip">運営管理費の請求がある場合は項目で追加してください</div>
    <div class="tip">例：運営管理費用5%,1,式,??円</div>
    <div style="font-size: 16px">項目追加</div>
    <div class="fee-item" v-for="(item, index) in feeCalc.fee" :key="index">
      <div class="fee-item-content">
        <div>摘要</div>
        <a-input v-model:value="item.name" />
      </div>
      <div class="fee-item-content">
        <div>数量</div>
        <a-input v-model:value="item.count" style="width: 50px" />
      </div>
      <div class="fee-item-content">
        <div>単位</div>
        <a-input v-model:value="item.unit" style="width: 50px" />
      </div>
      <div class="fee-item-content">
        <div>価格</div>
        <a-input v-model:value="item.price" />
      </div>
      <div class="fee-item-content">
        <div>合計金額</div>
        <a-input :value="Number(item.price) * Number(item.count)" disabled />
      </div>
      <a-button class="remove-btn" @click="removeFeeItem(index)">
        <MinusOutlined />
      </a-button>
    </div>
    <a-button class="add-btn" @click="addFeeItem">
      <PlusOutlined />
    </a-button>
  </div>
</template>

<script lang="ts" setup>
import { PlusOutlined, MinusOutlined } from "@ant-design/icons-vue";

export interface FeeCalc {
  categoryType: string;
  fee: {
    name: string;
    count: string;
    unit: string;
    price: string;
  }[];
}
const props = defineProps<{ value?: FeeCalc }>();
const emit = defineEmits(["update:value", "change"]);

const feeCalc = ref<FeeCalc>({
  categoryType: "受託",
  fee: [],
});

const addFeeItem = () => {
  feeCalc.value.fee.push({
    name: "",
    count: "",
    unit: "",
    price: "0",
  });
};

const removeFeeItem = (index: number) => {
  feeCalc.value.fee.splice(index, 1);
};

watch(
  () => feeCalc.value,
  () => {
    emit("update:value", feeCalc.value);
    emit("change", feeCalc.value);
  },
  { deep: true },
);
</script>

<style scoped>
.fee-calc {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tip {
  font-size: 12px;
  color: red;
}
.add-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding-left: 0;
  padding-right: 0;
}
.fee-item {
  display: flex;
  flex-direction: row;
  gap: 8px;
  position: relative;
}
.fee-item-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.remove-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding-left: 0;
  padding-right: 0;
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(120%, -2px);
  border-color: red;
  color: red;
}

.remove-btn:hover {
  border-color: red;
  color: red;
  opacity: 0.5;
}
</style>

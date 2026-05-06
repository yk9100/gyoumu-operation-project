<template>
  <div class="pj-code-input">
    <a-radio-group v-model:value="state.projectCodeType">
      <a-radio value="定型フォーマット">定型フォーマット</a-radio>
      <a-radio value="自作フォーマット">フォーマット</a-radio>
    </a-radio-group>

    <a-input disabled @change="handleValueUpdate" :value="state.projectCode" />
    <a-button type="primary" @click="generatePJCode">PJコード自動入力</a-button>

    <a-row :gutter="12">
      <a-col :span="12">
        <span>PJコード発番日:</span>
        <a-input v-model:value="state.issueDate" />
      </a-col>
      <a-col :span="12">
        <span>セグメント:</span>
        <a-select v-model:value="state.segment">
          <a-select-option value="セグメントA">セグメントA</a-select-option>
          <a-select-option value="セグメントB">セグメントB</a-select-option>
          <a-select-option value="セグメントC">セグメントC</a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <a-row :gutter="12">
      <a-col :span="12">
        <span>サービス名:</span>
        <a-select v-model:value="state.serviceName">
          <a-select-option value="サービスA">サービスA</a-select-option>
          <a-select-option value="サービスB">サービスB</a-select-option>
          <a-select-option value="サービスC">サービスC</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="12">
        <span>売上区分:</span>
        <a-select v-model:value="state.salesType">
          <a-select-option value="売上区分A">売上区分A</a-select-option>
          <a-select-option value="売上区分B">売上区分B</a-select-option>
          <a-select-option value="売上区分C">売上区分C</a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <a-row :gutter="12">
      <a-col :span="12">
        <span>プロジェクト区分:</span>
        <a-select v-model:value="state.projectType">
          <a-select-option value="プロジェクトA">プロジェクトA</a-select-option>
          <a-select-option value="プロジェクトB">プロジェクトB</a-select-option>
          <a-select-option value="プロジェクトC">プロジェクトC</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="12">
        <span>4桁連番:</span>
        <a-input v-model:value="state.snCode" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  value?: string;
}>();
const emit = defineEmits<{
  (e: "update:value", value: string): void;
  (e: "change", value: string): void;
  (e: "blur", value: string): void;
}>();

const state = ref({
  projectCodeType: "定型フォーマット",
  projectCode: "",
  issueDate: "",
  segment: "",
  serviceName: "",
  salesType: "",
  projectType: "",
  snCode: "",
});

const generatePJCode = async () => {
  const newCode = "PJコード";
  state.value.projectCode = newCode;

  emit("update:value", newCode);
  await nextTick();
  emit("change", newCode);
};

const handleValueUpdate = (value: string) => {
  emit("update:value", value);
  emit("change", value);
};
</script>

<style scoped>
.pj-code-input {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 5px;
}
</style>

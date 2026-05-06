<template>
  <div class="inputable-select">
    <a-select
      :value="value"
      @change="handleValueUpdate"
      @update:value="handleValueUpdate"
      :options="options"
      style="flex: 1"
      mode="combobox"
    />
    <a-button class="add-button" @click="openModal">
      <PlusOutlined style="font-size: 14px" />
    </a-button>
    <a-modal
      :title="modalTitle || 'プロダクト登録'"
      v-model:open="open"
      @ok="handleOk"
      okText="登録"
      @cancel="closeModal"
      centered
    >
      <div class="row-form-item">
        <span class="label">{{ modalLabel || "プロダクト名" }}：</span>
        <a-input v-model:value="newValue" />
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { PlusOutlined } from "@ant-design/icons-vue";
const props = defineProps<{
  options: { value: string; label: string }[];
  value?: string;
  modalTitle?: string;
  modalLabel?: string;
}>();
const options = ref(props.options);
const open = ref(false);
const newValue = ref("");
const openModal = () => {
  open.value = true;
};

const closeModal = () => {
  open.value = false;
};

const handleOk = async () => {
  if (newValue.value.trim() === "") {
    return;
  }
  const newOption = {
    value: newValue.value,
    label: newValue.value,
  };
  options.value.push(newOption);
  emit("update:value", newValue.value);
  emit("change", newValue.value);
  newValue.value = "";
  closeModal();
};

const emit = defineEmits<{
  (e: "update:value", value: string): void;
  (e: "change", value: string): void;
}>();

const handleValueUpdate = (value: string) => {
  emit("update:value", value);
  emit("change", value);
};
</script>

<style scoped>
.inputable-select {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
}
.add-button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding-left: 0;
  padding-right: 0;
}
.row-form-item {
  display: flex;
  align-items: center;
  gap: 12px;
}
.label {
  flex: 1;
  white-space: nowrap;
}
</style>

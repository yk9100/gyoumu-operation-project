<template>
  <div class="double-input">
    <a-input
      v-model:value="state.value1"
      type="number"
      @change="handleChange"
      @update:value="handleChange"
      :disabled="disabled"
    />-
    <a-input
      v-model:value="state.value2"
      type="number"
      @change="handleChange"
      @update:value="handleChange"
      :disabled="disabled"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ value?: string; disabled?: boolean }>();
const emit = defineEmits(["update:value", "change"]);

const state = ref<{ value1: string; value2: string }>({
  value1: "",
  value2: "",
});

watch(
  () => props.value,
  (newValue) => {
    state.value = {
      value1: newValue?.split("-")[0] || "",
      value2: newValue?.split("-")[1] || "",
    };
  },
  { immediate: true },
);
watch(
  [() => state.value.value1, () => state.value.value2],
  (newValue) => {
    emit("update:value", `${newValue[0]}-${newValue[1]}`);
    emit("change", `${newValue[0]}-${newValue[1]}`);
  },
  { immediate: true },
);
const handleChange = (e: any) => {
  state.value = {
    ...state.value,
    [e.target.name]: e.target.value,
  };
};
</script>
<style scoped>
.double-input {
  display: flex;
  align-items: center;
}
</style>

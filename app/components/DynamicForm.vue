<template>
  <div class="dynamic-form">
    <a-form
      :layout="config.layout || 'horizontal'"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 8 }"
      :model="formData"
      v-if="!previewMode"
    >
      <a-form-item
        v-for="field in config.fields"
        :key="field.key"
        :required="field.required"
      >
        <template #label>
          <div>
            {{ field.label }}
            <a-tooltip v-if="field.tip" placement="top">
              <template #title
                >{{ field.tip
                }}<a :href="field.tipLink" target="_blank"
                  >詳しくはこちら</a
                ></template
              >
              <QuestionCircleOutlined style="margin-left: 2px; color: #999" />
            </a-tooltip>
          </div>
        </template>
        <template v-if="field.type === 'text'">
          <a-input
            v-model:value="formData[field.key]"
            :placeholder="field.placeholder"
            :disabled="field.disabled"
          />
        </template>
        <template v-else-if="field.type === 'date'">
          <a-date-picker
            v-model:value="formData[field.key]"
            format="YYYY年MM月DD日"
            :disabled="field.disabled"
          />
        </template>
        <template v-else-if="field.type === 'select'">
          <a-select
            v-model:value="formData[field.key]"
            :placeholder="field.placeholder"
            :disabled="field.disabled"
          >
            <a-select-option
              v-for="option in field.options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </a-select-option>
          </a-select>
        </template>
        <template v-else-if="field.type === 'radio'">
          <a-radio-group
            v-model:value="formData[field.key]"
            :disabled="field.disabled"
          >
            <a-radio
              v-for="option in field.options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </a-radio>
          </a-radio-group>
        </template>
        <template v-else-if="field.type === 'checkbox'">
          <a-checkbox
            v-model:checked="formData[field.key]"
            :disabled="field.disabled"
          >
            {{ field.label }}
          </a-checkbox>
        </template>
        <template v-else-if="field.type === 'textarea'">
          <a-textarea
            v-model:value="formData[field.key]"
            :placeholder="field.placeholder"
            :disabled="field.disabled"
            rows="4"
          />
        </template>
      </a-form-item>
    </a-form>
    <div class="preview-mode" v-else>
      <div v-for="field in config.fields" :key="field.key" class="preview-item">
        <div class="preview-label">
          {{ field.label }}
          <a-tooltip v-if="field.tip" placement="top">
            <template #title
              >{{ field.tip
              }}<a :href="field.tipLink" target="_blank"
                >詳しくはこちら</a
              ></template
            >
            <QuestionCircleOutlined style="margin-left: 2px; color: #999" />
          </a-tooltip>
        </div>
        <div class="preview-value">
          {{ getPreviewValue(field) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import { ref, watch } from "vue";
import type { FormConfig, FormField } from "~/types/form";

const props = defineProps<{
  config: FormConfig;
  modelValue?: Record<string, any>;
  previewMode?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: Record<string, any>): void;
}>();

const formData = ref<Record<string, any>>({});

const initFormData = () => {
  const initialData: Record<string, any> = {};
  props.config.fields.forEach((field) => {
    initialData[field.key] = props.modelValue?.[field.key] ?? field.value ?? "";
  });
  formData.value = initialData;
};

watch(
  () => props.config,
  () => {
    initFormData();
  },
  { deep: true },
);

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      Object.keys(newValue).forEach((key) => {
        formData.value[key] = newValue[key];
      });
    }
  },
  { deep: true },
);

watch(
  formData,
  (newValue) => {
    emit("update:modelValue", newValue);
  },
  { deep: true },
);

// 获取预览模式下的字段值
const getPreviewValue = (field: FormField) => {
  const value = formData.value[field.key];
  if (value === undefined || value === null || value === "") {
    return "-";
  }
  if (field.type === "date" && value) {
    return value.format("YYYY年MM月DD日");
  }
  if (field.type === "select" && field.options) {
    const option = field.options.find((opt) => opt.value === value);
    return option ? option.label : value;
  }
  if (field.type === "radio" && field.options) {
    const option = field.options.find((opt) => opt.value === value);
    return option ? option.label : value;
  }
  return value;
};

onMounted(() => {
  initFormData();
});
</script>

<style scoped>
.dynamic-form {
  width: 100%;
}

.preview-mode {
  width: 100%;
  padding-left: 20px;
}

.preview-item {
  display: flex;
  margin-bottom: 16px;
  align-items: flex-start;
}

.preview-label {
  width: 140px;
  font-weight: 500;
  margin-right: 16px;
  text-align: left;
  padding-top: 4px;
}

.preview-value {
  flex: 1;
  padding-top: 4px;
}

@media (max-width: 768px) {
  .preview-item {
    flex-direction: column;
  }

  .preview-label {
    width: 100%;
    text-align: left;
    margin-right: 0;
    margin-bottom: 4px;
  }

  .preview-value {
    width: 100%;
  }
}
</style>

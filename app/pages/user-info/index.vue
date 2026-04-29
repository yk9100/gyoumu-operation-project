<template>
  <div class="page-root">
    <GlobalHeader />
    <div class="page-content">
      <section id="basic-info" class="info-section">
        <div class="form-title">
          本人情報
          <a-button @click="baseFormPreviewMode = !baseFormPreviewMode">
            {{ baseFormPreviewMode ? "変更する" : "変更完了" }}
          </a-button>
        </div>
        <div class="content">
          <DynamicForm
            :config="BASE_FORM_CONFIG"
            v-model:modelValue="baseFormData"
            :preview-mode="baseFormPreviewMode"
          />
        </div>

        <div class="form-title">
          <span>
            住民票住所
            <a-tooltip placement="top">
              <template #title
                >社会保険・住民税の入退社手続きや、年末調整関係書類、労働者名簿等に記載される住所です。</template
              >
              <QuestionCircleOutlined style="margin-left: 2px; color: #999" />
            </a-tooltip>
          </span>
        </div>
        <div class="content">
          <DynamicForm
            :config="RESIDENTIAL_ADDRESS_FORM_CONFIG"
            v-model:modelValue="residentialAddressFormData"
            :preview-mode="baseFormPreviewMode"
          />
        </div>

        <div class="form-title">
          <span>
            現住所
            <a-tooltip placement="top">
              <template #title
                >　健康保険・厚生年金保険被保険者資格取得届に特定の理由で住民票住所を記載できない場合は、現住所（居所）が記載されます。</template
              >
              <QuestionCircleOutlined style="margin-left: 2px; color: #999" />
            </a-tooltip>
          </span>
        </div>
        <div class="content">
          <DynamicForm
            :config="CURRENT_RESIDENCE_FORM_CONFIG"
            v-model:modelValue="currentResidenceFormData"
            :preview-mode="baseFormPreviewMode"
          />
        </div>

        <div class="form-title">外国籍情報</div>
        <div class="content">
          <DynamicForm
            :config="FOREIGN_INTELLECTUAL_PROPERTY_FORM_CONFIG"
            v-model:modelValue="foreignIntellectualPropertyFormFormData"
            :preview-mode="baseFormPreviewMode"
          />
        </div>
      </section>

      <section id="personnel-info" class="info-section">
        <div class="form-title">
          人事情報
          <a-button
            @click="personnelFormPreviewMode = !personnelFormPreviewMode"
          >
            {{ personnelFormPreviewMode ? "変更する" : "変更完了" }}
          </a-button>
        </div>
        <div
          class="content"
          v-for="(item, index) in personnelFormData"
          :key="index"
        >
          <div class="multi-form-title" @click="item.expanded = !item.expanded">
            <div>家族情報{{ index + 1 }}</div>

            <div style="display: flex; align-items: center">
              <div style="position: relative" @click.stop>
                <a-popconfirm
                  v-if="
                    !personnelFormPreviewMode && personnelFormData.length > 1
                  "
                  placement="left"
                  title="このデータを削除してもよろしいですか?"
                  ok-text="削除"
                  cancel-text="キャンセル"
                  @confirm="deletePersonnelFormData(index)"
                  :getPopupContainer="
                    (trigger: HTMLElement) =>
                      trigger.parentNode || window.document.body
                  "
                >
                  <a-button type="danger">
                    <DeleteOutlined style="color: red" />
                  </a-button>
                </a-popconfirm>
              </div>

              <UpOutlined v-if="item.expanded" />
              <DownOutlined v-else />
            </div>
          </div>
          <DynamicForm
            v-if="item.expanded"
            :config="PERSONNEL_FORM_CONFIG"
            v-model:modelValue="item.formData"
            :preview-mode="personnelFormPreviewMode"
          />
        </div>
        <div
          style="text-align: center; padding: 4px 0"
          v-if="!personnelFormPreviewMode"
        >
          <a-button type="primary" @click="addPersonnelFormData">
            <PlusOutlined />
          </a-button>
        </div>
      </section>

      <section id="salary-info" class="info-section">
        <div class="form-title">
          緊急連絡先
          <a-button @click="contactFormPreviewMode = !contactFormPreviewMode">
            {{ contactFormPreviewMode ? "変更する" : "変更完了" }}
          </a-button>
        </div>
        <div
          class="content"
          v-for="(item, index) in contactFormFormData"
          :key="index"
        >
          <div class="multi-form-title" @click="item.expanded = !item.expanded">
            <div>緊急連絡先{{ index + 1 }}</div>

            <UpOutlined v-if="item.expanded" />
            <DownOutlined v-else />
          </div>
          <DynamicForm
            v-if="item.expanded"
            :config="CONTACT_FORM_CONFIG"
            v-model:modelValue="item.formData"
            :preview-mode="contactFormPreviewMode"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  BASE_FORM_CONFIG,
  PERSONNEL_FORM_CONFIG,
  RESIDENTIAL_ADDRESS_FORM_CONFIG,
  CURRENT_RESIDENCE_FORM_CONFIG,
  FOREIGN_INTELLECTUAL_PROPERTY_FORM_CONFIG,
  CONTACT_FORM_CONFIG,
} from "~/common/form";
import {
  QuestionCircleOutlined,
  UpOutlined,
  DownOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
const window = globalThis.window;
const baseFormData = ref({});
const baseFormPreviewMode = ref(true);
const personnelFormData = ref([{ formData: {}, expanded: true }]);
const personnelFormPreviewMode = ref(true);
const residentialAddressFormData = ref({});
const currentResidenceFormData = ref({});
const foreignIntellectualPropertyFormFormData = ref({});
const contactFormFormData = ref([
  { formData: {}, expanded: true },
  { formData: {}, expanded: true },
]);
const contactFormPreviewMode = ref(true);

const addPersonnelFormData = () => {
  personnelFormData.value.push({ formData: {}, expanded: true });
};

const deletePersonnelFormData = (index: number) => {
  personnelFormData.value.splice(index, 1);
};
</script>

<style scoped>
.nav-links {
  margin: 20px 0;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.nav-links a {
  margin-right: 20px;
  text-decoration: none;
  color: #1890ff;
}

.nav-links a:hover {
  text-decoration: underline;
}

.info-section {
  margin-bottom: 40px;
  border-radius: 4px;
}

.info-section h2 {
  margin-top: 0;
  color: #333;
}

.content {
  margin-top: 10px;
  line-height: 1.5;
}

.form-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding: 6px 10px;
  border-radius: 4px;
}

.multi-form-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  font-weight: bold;
}
.multi-form-title:hover {
  background-color: #f9f8f8;
}
</style>

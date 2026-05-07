<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-form-item
          label="その他原価サーバー/仕入"
          :labelCol="{ span: 8 }"
          :wrapperCol="{ span: 10 }"
        >
          <a-radio-group v-model:value="hasOtherPrice">
            <a-radio value="なし">なし</a-radio>
            <a-radio value="あり">あり</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
    </a-row>
    <div v-if="hasOtherPrice === 'あり'" class="split-line"></div>
    <template v-if="hasOtherPrice === 'あり'">
      <div v-for="(item, index) in state" :key="index">
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="仕入先"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-select v-model:value="item.incorporationTarget">
                <a-option value="仕入先1">仕入先1</a-option>
                <a-option value="仕入先2">仕入先2</a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-button class="delete-btn" @click="deleteItem(index)"
              >削除</a-button
            >
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="仕入内容"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input v-model:value="item['仕入内容']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-item
              label="仕入先情報"
              :labelCol="{ span: 2 }"
              :wrapperCol="{ span: 10 }"
            >
              <a-textarea v-model:value="item['仕入先情報']"> </a-textarea>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="担当者名"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-select v-model:value="item.undertakerName">
                <a-option value="担当者名1">担当者名1</a-option>
                <a-option value="担当者名2">担当者名2</a-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="メールアドレス"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input v-model:value="item.email" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item
              label="仕入予算金額"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              required
            >
              <div>
                <a-input v-model:value="item.outsourcingBudget" type="number" />
              </div>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="仕入見込み金額"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              required
            >
              <div>
                <a-input
                  v-model:value="item.estimatedOutsourcingBudget"
                  type="number"
                  disabled
                />
              </div>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="24">
            <a-form-item
              label="仕入見積書"
              :labelCol="{ span: 2 }"
              :wrapperCol="{ span: 22 }"
            >
              <FileUploadArea />
            </a-form-item>
          </a-col>
        </a-row>
      </div>
      <div class="add-btn-wrap">
        <a-form-item
          label="仕入先追加"
          :labelCol="{ span: 2 }"
          :wrapperCol="{ span: 10 }"
        >
          <a-button @click="addItem">
            <PlusOutlined />
          </a-button>
        </a-form-item>
      </div>

      <a-row>
        <a-col :span="12">
          <a-form-item
            label="仕入予算合計額"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              :value="
                state.reduce(
                  (acc, cur) => acc + (cur?.outsourcingBudget || 0),
                  0,
                )
              "
              disabled
            />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item
            label="仕入見込み合計額"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              :value="
                state.reduce(
                  (acc, cur) => acc + (cur?.outsourcingBudget || 0),
                  0,
                )
              "
              disabled
            />
          </a-form-item>
        </a-col>
      </a-row>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { PlusOutlined } from "@ant-design/icons-vue";
export type OtherPriceValue = {
  incorporationTarget?: string;
  仕入内容?: string;
  仕入先情報?: string;
  responsiblePerson?: string;
  undertakerName?: string;
  email?: string;
  outsourcingBudget?: number;
  estimatedOutsourcingBudget?: number;
  deliveryDate?: string;
  phaseEstimation?: string;
  phaseEstimationReason?: string;
};
const props = defineProps<{
  value?: OtherPriceValue[];
}>();

const labelCol = { span: 4 };
const wrapperCol = { span: 10 };

const state = ref<OtherPriceValue[]>([
  {
    incorporationTarget: "",
    仕入内容: "",
    仕入先情報: "",
    responsiblePerson: "",
    undertakerName: "",
    email: "",
    outsourcingBudget: 0,
    estimatedOutsourcingBudget: 0,
    deliveryDate: "",
    phaseEstimation: "なし",
    phaseEstimationReason: "",
  },
]);

const hasOtherPrice = ref("なし");

const deleteItem = (index: number) => {
  state.value.splice(index, 1);
};

const addItem = () => {
  state.value.push({
    incorporationTarget: "",
    仕入内容: "",
    仕入先情報: "",
    responsiblePerson: "",
    undertakerName: "",
    email: "",
    outsourcingBudget: 0,
    estimatedOutsourcingBudget: 0,
    deliveryDate: "",
    phaseEstimation: "なし",
    phaseEstimationReason: "",
  });
};
</script>

<style scoped>
.split-line {
  border: 1px solid #e8e8e8;
  margin-bottom: 20px;
  border-radius: 0;
}
.tip {
  font-size: 12px;
  color: #999;
}

.add-btn-wrap {
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  padding: 20px 0;
  margin-bottom: 12px;
}

.add-btn-wrap :deep(.ant-form-item) {
  margin: 0;
}
.delete-btn {
  border-color: #f52222;
  color: #f52222;
}

.delete-btn:hover {
  border-color: #f52222;
  color: #f52222;
  opacity: 0.5;
}
</style>

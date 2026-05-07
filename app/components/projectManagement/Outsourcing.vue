<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-form-item
          label="外注"
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 10 }"
        >
          <a-radio-group v-model:value="hasOutsourcing">
            <a-radio value="なし">なし</a-radio>
            <a-radio value="あり">あり</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
    </a-row>
    <div v-if="hasOutsourcing === 'あり'" class="split-line"></div>
    <template v-if="hasOutsourcing === 'あり'">
      <div v-for="(item, index) in state" :key="index">
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="外注先"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 10 }"
            >
              <a-select v-model:value="item.outsourcingTarget">
                <a-option value="外注先1">外注先1</a-option>
                <a-option value="外注先2">外注先2</a-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="外注情報"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 10 }"
            >
              <a-textarea v-model:value="item.outsourcingDesc"> </a-textarea>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="役職名"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 10 }"
            >
              <a-select v-model:value="item.responsiblePerson">
                <a-option value="役職名1">役職名1</a-option>
                <a-option value="役職名2">役職名2</a-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="担当者名"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 10 }"
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
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 10 }"
            >
              <a-input v-model:value="item.email" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item
              label="外注予算金額"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 10 }"
              required
            >
              <div>
                <a-input v-model:value="item.outsourcingBudget" type="number" />
                <div class="tip">
                  外注に対して発生する費用を記入してください。
                </div>
              </div>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="外注見込み金額"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 10 }"
              required
            >
              <div>
                <a-input
                  v-model:value="item.estimatedOutsourcingBudget"
                  type="number"
                  disabled
                />
                <div class="tip">
                  外注に対して発生する費用を記入してください。
                </div>
              </div>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item
              label="納品日"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 10 }"
              required
            >
              <a-date-picker
                v-model:value="item.deliveryDate"
                type="date"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="24">
            <a-form-item
              label="外注見積書"
              :labelCol="{ span: 2 }"
              :wrapperCol="{ span: 22 }"
            >
              <FileUploadArea />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item
              label="相見積もり"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 10 }"
              required
            >
              <a-radio-group v-model:value="item.phaseEstimation">
                <a-radio value="なし">なし</a-radio>
                <a-radio value="あり">あり</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="24">
            <a-form-item
              label="外注相見積書"
              :labelCol="{ span: 2 }"
              :wrapperCol="{ span: 22 }"
            >
              <FileUploadArea />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row v-if="item.phaseEstimation === 'なし'">
          <a-col :span="12">
            <a-form-item
              label="相見積もりなしの理由"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 10 }"
            >
              <a-input v-model:value="item.phaseEstimationReason"> </a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
export type OutsourcingValue = {
  outsourcingTarget?: string;
  outsourcingDesc?: string;
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
  value?: OutsourcingValue[];
}>();

const state = ref<OutsourcingValue[]>([
  {
    outsourcingTarget: "",
    outsourcingDesc: "",
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

const hasOutsourcing = ref("なし");
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
</style>

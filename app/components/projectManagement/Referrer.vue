<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-form-item
          label="紹介手数料"
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 10 }"
        >
          <a-radio-group v-model:value="hasReferrer">
            <a-radio value="なし">なし</a-radio>
            <a-radio value="あり">あり</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
    </a-row>
    <div v-if="hasReferrer === 'あり'" class="split-line"></div>
    <template v-if="hasReferrer === 'あり'">
      <div v-for="(item, index) in state" :key="index">
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="紹介元名"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-select v-model:value="item.referrerName">
                <a-option value="紹介元名1">紹介元名1</a-option>
                <a-option value="紹介元名2">紹介元名2</a-option>
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
          <a-col :span="24">
            <a-form-item
              label="紹介元情報"
              :labelCol="{ span: 2 }"
              :wrapperCol="{ span: 10 }"
            >
              <a-textarea v-model:value="item['紹介元情報']"> </a-textarea>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="24">
            <a-form-item
              label="役職名"
              :labelCol="{ span: 2 }"
              :wrapperCol="{ span: 10 }"
            >
              <a-select v-model:value="item['役職名']">
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
              label="予算金額"
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
              label="見込み金額"
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
              label="紹介された経験"
              :labelCol="{ span: 2 }"
              :wrapperCol="{ span: 10 }"
            >
              <a-textarea v-model:value="item['紹介された経験']"> </a-textarea>
            </a-form-item>
          </a-col>
        </a-row>

        <!-- <a-row>
          <a-col :span="12">
            <a-form-item
              label="予算合計額"
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
              label="見込み合計額"
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
        </a-row> -->
      </div>
      <div class="add-btn-wrap">
        <a-form-item
          label="追加"
          :labelCol="{ span: 2 }"
          :wrapperCol="{ span: 10 }"
        >
          <a-button @click="addItem">
            <PlusOutlined />
          </a-button>
        </a-form-item>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { PlusOutlined } from "@ant-design/icons-vue";
export type ReferrerValue = {
  referrerName?: string;
  紹介元情報?: string;
  役職名?: string;
  undertakerName?: string;
  email?: string;
  outsourcingBudget?: number;
  estimatedOutsourcingBudget?: number;
  deliveryDate?: string;
  phaseEstimation?: string;
  phaseEstimationReason?: string;
  紹介された経験?: string;
};
const props = defineProps<{
  value?: ReferrerValue[];
}>();

const labelCol = { span: 4 };
const wrapperCol = { span: 10 };

const state = ref<ReferrerValue[]>([
  {
    referrerName: "",
    紹介元情報: "",
    役職名: "",
    undertakerName: "",
    email: "",
    outsourcingBudget: 0,
    estimatedOutsourcingBudget: 0,
    deliveryDate: "",
    phaseEstimation: "なし",
    phaseEstimationReason: "",
    紹介された経験: "",
  },
]);

const hasReferrer = ref("なし");

const deleteItem = (index: number) => {
  state.value.splice(index, 1);
};

const addItem = () => {
  state.value.push({
    referrerName: "",
    紹介元情報: "",
    役職名: "",
    undertakerName: "",
    email: "",
    outsourcingBudget: 0,
    estimatedOutsourcingBudget: 0,
    deliveryDate: "",
    phaseEstimation: "なし",
    phaseEstimationReason: "",
    紹介された経験: "",
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

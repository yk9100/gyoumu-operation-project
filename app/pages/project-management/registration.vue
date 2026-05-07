<template>
  <div class="page-root">
    <GlobalHeader />
    <div class="page-content">
      <a-spin :spinning="spinning">
        <a-form
          :model="formState"
          name="basic"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
          ref="formRef"
          :rules="rules"
        >
          <div>
            <div class="form-title">案件詳細</div>
            <a-form-item label="PJコード" name="pjCode" required>
              <ProjectManagementPJCodeInput v-model:value="formState.pjCode" />
            </a-form-item>
            <a-form-item
              label="案件名"
              name="projectName"
              :rules="[
                { required: true, message: '案件番号名を入力してください' },
              ]"
            >
              <a-input v-model:value="formState.projectName" />
            </a-form-item>
            <a-form-item label="プロダクト名" name="productName" required>
              <InputableSelect
                v-model:value="formState.productName"
                :options="[
                  { label: 'プロダクト1', value: 'プロダクト1' },
                  { label: 'プロダクト2', value: 'プロダクト2' },
                ]"
              />
            </a-form-item>
            <a-form-item label="詳細" name="detail">
              <a-textarea v-model:value="formState.detail" />
            </a-form-item>
            <a-form-item label="PM" name="pm" required>
              <a-select v-model:value="formState.pm">
                <a-select-option value="pm1">PM1</a-select-option>
                <a-select-option value="pm2">PM2</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="営業担当者" name="salesPerson" required>
              <a-select v-model:value="formState.salesPerson">
                <a-select-option value="営業担当者1"
                  >営業担当者1</a-select-option
                >
                <a-select-option value="営業担当者2"
                  >営業担当者2</a-select-option
                >
              </a-select>
            </a-form-item>
            <a-form-item label="部署" name="department" required>
              <a-select v-model:value="formState.department">
                <a-select-option value="部署1">部署1</a-select-option>
                <a-select-option value="部署2">部署2</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="ステータス" name="projectStatus" required>
              <a-select
                v-model:value="formState.projectStatus"
                :options="PROJECT_STATUS"
              >
              </a-select>
            </a-form-item>
          </div>
          <a-form-item name="projectStartDate" label="開発開始予定日" required>
            <a-date-picker v-model:value="formState.projectStartDate" />
          </a-form-item>
          <a-form-item name="projectEndDate" label="納品予定日" required>
            <a-date-picker v-model:value="formState.projectEndDate" />
          </a-form-item>
          <a-form-item name="inspectionDate" label="検収予定日" required>
            <a-date-picker v-model:value="formState.inspectionDate" />
          </a-form-item>
          <a-form-item name="isDiscount" label="割引検収するかどうか" required>
            <a-radio-group v-model:value="formState.isDiscount">
              <a-radio value="しない">しない</a-radio>
              <a-radio value="する">する</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item name="isEffect" label=" ">
            <div style="display: flex; flex-direction: column; gap: 8px">
              <div>
                営業部判断となりリスクを保有している契約に対して、今回の請負範囲が影響しないか？
              </div>
              <div style="color: red">2021年9月以降の案件は選択必須</div>
              <div style="color: red">
                影響ありの場合、本案がリスクを保有していることになります。
              </div>
              <a-radio-group v-model:value="formState.isEffect">
                <a-radio value="影響あり">影響あり</a-radio>
                <a-radio value="影響なし">影響なし</a-radio>
              </a-radio-group>
            </div>
          </a-form-item>
          <a-form-item name="isEffectMemo" label=" ">
            <div>
              <div>影響ありの場合またはなしと判断した理由</div>
              <a-textarea v-model:value="formState.isEffectMemo" />
            </div>
          </a-form-item>

          <div>
            <div class="form-title">顧客情報</div>
            <a-form-item name="customerName" label="顧客" required>
              <div>
                <a-select v-model:value="formState.customerName">
                  <a-select-option value="顧客1">顧客1</a-select-option>
                  <a-select-option value="顧客2">顧客2</a-select-option>
                </a-select>
                <div
                  v-if="formState.customerName"
                  style="color: blue; font-size: 16px"
                >
                  与信ランクB、5000万円未満
                </div>
              </div>
            </a-form-item>
            <a-form-item
              name="firstPartyResponsible"
              label="先方担当者部署又は役職名"
            >
              <a-select v-model:value="formState.firstPartyResponsible">
                <a-select-option value="部署1">部署1</a-select-option>
                <a-select-option value="部署2">部署2</a-select-option>
              </a-select>
            </a-form-item>
            <div v-if="formState.customerName">
              <a-form-item name="customerAddressType" label="住所" required>
                <a-radio-group v-model:value="formState.customerAddressType">
                  <a-radio value="既定の住所">既定の住所</a-radio>
                  <a-radio value="既定以外の住所を使用"
                    >既定以外の住所を使用</a-radio
                  >
                </a-radio-group>
              </a-form-item>
              <a-form-item name="postalCode" label="郵便番号" required>
                <DoubleInput
                  v-model:value="formState.postalCode"
                  :disabled="formState.customerAddressType === '既定の住所'"
                />
              </a-form-item>
              <a-form-item name="customerAddress" label="住所" required>
                <a-input
                  v-model:value="formState.customerAddress"
                  :disabled="formState.customerAddressType === '既定の住所'"
                />
              </a-form-item>
              <a-form-item name="buildingName" label="ビル名" required>
                <a-input
                  v-model:value="formState.buildingName"
                  :disabled="formState.customerAddressType === '既定の住所'"
                />
              </a-form-item>
            </div>
            <a-form-item name="undertaker" label="担当者名" required>
              <a-select v-model:value="formState.undertaker">
                <a-select-option value="担当者1">担当者1</a-select-option>
                <a-select-option value="担当者2">担当者2</a-select-option>
              </a-select>
            </a-form-item>
          </div>

          <div>
            <div class="form-title">見積明細</div>
            <a-form-item name="feeCalc" label="種類">
              <ProjectManagementFeeCalc v-model:value="formState.feeCalc" />
            </a-form-item>
          </div>

          <div>
            <div class="form-title">受注部門原価</div>
            <div>
              <div class="form-sub-title-wrap">
                <div class="form-sub-title">受注予算詳細</div>
              </div>
              <a-row>
                <a-col :span="12">
                  <a-form-item
                    name="receivedAmount"
                    label="受注金額"
                    :label-col="{ span: 4 }"
                    :wrapper-col="{ span: 16 }"
                  >
                    <div>
                      <a-input
                        disabled
                        :value="
                          formState.feeCalc.fee.reduce(
                            (acc, cur) =>
                              acc + Number(cur.price) * Number(cur.count),
                            0,
                          )
                        "
                      />
                      <div style="color: #999; font-size: 12px">
                        [税抜]の受注詳細を記入してください
                      </div>
                      <div style="color: blue; font-size: 16px">
                        この顧客の与信残高：50000000
                      </div>
                    </div>
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item
                    name="prepaymentAmount"
                    label="前金"
                    :label-col="{ span: 4 }"
                    :wrapper-col="{ span: 16 }"
                  >
                    <a-input v-model:value="formState.prepaymentAmount" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="12">
                  <a-form-item
                    name="orderDate"
                    label="注文日"
                    :label-col="{ span: 4 }"
                    :wrapper-col="{ span: 16 }"
                  >
                    <div>
                      <a-date-picker
                        v-model:value="formState.orderDate"
                        style="width: 100%"
                      />
                      <div style="color: #999; font-size: 12px">
                        [注文]タグより編集してください
                      </div>
                    </div>
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item
                    name="jopPjName"
                    label="ジョブカンPJ名"
                    :label-col="{ span: 4 }"
                    :wrapper-col="{ span: 16 }"
                  >
                    <a-input v-model:value="formState.jopPjName" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="12">
                  <a-form-item
                    name="isPreRelease"
                    label="先行開発"
                    :label-col="{ span: 4 }"
                    :wrapper-col="{ span: 16 }"
                  >
                    <div>
                      <a-radio-group v-model:value="formState.isPreRelease">
                        <a-radio value="なし"> なし </a-radio>
                        <a-radio value="あり"> あり </a-radio>
                      </a-radio-group>
                      <div style="font-size: 12px">
                        ラクモの申請番号発行済みではない場合は、「なし」を選択
                      </div>
                    </div>
                  </a-form-item>
                </a-col>
              </a-row>
            </div>

            <div>
              <div class="form-sub-title-wrap">
                <div class="form-sub-title">受注見込み詳細</div>
              </div>
              <a-row>
                <a-col :span="12">
                  <a-form-item
                    name="receivedAmount_m"
                    label="受注金額"
                    :label-col="{ span: 4 }"
                    :wrapper-col="{ span: 16 }"
                  >
                    <div>
                      <a-input disabled />
                      <div style="color: #999; font-size: 12px">
                        [税抜]の受注詳細を記入してください
                      </div>
                    </div>
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item
                    name="prepaymentAmount_m"
                    label="前金"
                    :label-col="{ span: 4 }"
                    :wrapper-col="{ span: 16 }"
                  >
                    <div>
                      <a-input
                        v-model:value="formState.prepaymentAmount_m"
                        disabled
                      />
                    </div>
                    <div style="color: #999; font-size: 12px">
                      受注金額入力時に自動で入力されます（変更可）
                    </div>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="12">
                  <a-form-item
                    name="orderDate_m"
                    label="注文日"
                    :label-col="{ span: 4 }"
                    :wrapper-col="{ span: 16 }"
                  >
                    <div>
                      <a-date-picker
                        v-model:value="formState.orderDate_m"
                        style="width: 100%"
                      />
                      <div style="color: #999; font-size: 12px">
                        [注文]タグより編集してください
                      </div>
                    </div>
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item
                    name="jopPjName_m"
                    label="ジョブカンPJ名"
                    :label-col="{ span: 4 }"
                    :wrapper-col="{ span: 16 }"
                  >
                    <a-input v-model:value="formState.jopPjName_m" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="12">
                  <a-form-item
                    name="isPreRelease_m"
                    label="先行開発"
                    :label-col="{ span: 4 }"
                    :wrapper-col="{ span: 16 }"
                  >
                    <div>
                      <a-radio-group v-model:value="formState.isPreRelease_m">
                        <a-radio value="なし"> なし </a-radio>
                        <a-radio value="あり"> あり </a-radio>
                      </a-radio-group>
                      <div style="font-size: 12px">
                        ラクモの申請番号発行済みではない場合は、「なし」を選択
                      </div>
                    </div>
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </div>

          <div>
            <div class="form-title">受注詳細</div>
            <div>
              <div class="form-sub-title-wrap">
                <div class="form-sub-title">労務費予算</div>
              </div>
              <ProjectManagementServiceFeeCalc
                v-model:value="formState.laborCostBudget"
                formName="laborCostBudget"
              />
            </div>

            <div>
              <div class="form-sub-title-wrap">
                <div class="form-sub-title">労務費見込み</div>
              </div>
              <ProjectManagementServiceFeeCalc
                v-model:value="formState.estimatedLaborCostBudget"
                formName="estimatedLaborCostBudget"
              />
            </div>

            <div>
              <div class="form-sub-title-wrap">
                <div class="form-sub-title">外注費</div>
              </div>
              <ProjectManagementOutsourcing
                v-model:value="formState.outsourcing"
                formName="outsourcing"
              />
            </div>
          </div>

          <a-form-item :wrapper-col="{ offset: 8, span: 8 }">
            <a-button type="primary" html-type="submit">登録</a-button>
          </a-form-item>
        </a-form>
      </a-spin>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Rule } from "ant-design-vue/es/form";
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { PROJECT_STATUS } from "~/components/projectManagement/common";
import type { FeeCalc } from "~/components/projectManagement/FeeCalc.vue";
import type { OutsourcingValue } from "~/components/projectManagement/Outsourcing.vue";
import type { ServiceFeeCalcValue } from "~/components/projectManagement/ServiceFeeCalc.vue";

interface FormState {
  pjCode: string;
  projectName: string;
  productName: string;
  detail: string;
  pm: string;
  salesPerson: string;
  department: string;
  projectStatus: string;
  projectStartDate: string;
  projectEndDate: string;
  inspectionDate: string;
  isDiscount: string;
  isEffect: string;
  isEffectMemo: string;
  customerName: string;
  firstPartyResponsible: string;
  undertaker: string;
  customerAddressType: string;
  postalCode: string;
  customerAddress: string;
  buildingName: string;
  feeCalc: FeeCalc;
  receivedAmount: number;
  prepaymentAmount: number;
  orderDate: string;
  jopPjName: string;
  isPreRelease: string;
  prepaymentAmount_m: number;
  orderDate_m: string;
  jopPjName_m: string;
  isPreRelease_m: string;
  laborCostBudget: ServiceFeeCalcValue[];
  estimatedLaborCostBudget: ServiceFeeCalcValue[];
  outsourcing: OutsourcingValue[];
}

const route = useRoute();
const spinning = ref(false);

const formState = reactive<FormState>({
  pjCode: "",
  projectName: "",
  productName: "",
  detail: "",
  pm: "",
  salesPerson: "",
  department: "",
  projectStatus: "",
  projectStartDate: "",
  projectEndDate: "",
  inspectionDate: "",
  isDiscount: "しない",
  isEffect: "",
  isEffectMemo: "",
  customerName: "",
  firstPartyResponsible: "",
  undertaker: "",
  customerAddressType: "既定の住所",
  postalCode: "0-1",
  customerAddress: "customerAddress",
  buildingName: "buildingName",
  feeCalc: {
    categoryType: "受託",
    fee: [],
  },
  receivedAmount: 0,
  prepaymentAmount: 0,
  orderDate: "",
  jopPjName: "",
  isPreRelease: "なし",
  prepaymentAmount_m: 0,
  orderDate_m: "",
  jopPjName_m: "",
  isPreRelease_m: "なし",
  laborCostBudget: [],
  estimatedLaborCostBudget: [],
  outsourcing: [],
});
const router = useRouter();
const formRef = ref<any>();

const rules: Record<string, Rule[]> = {
  feeCalc: [
    {
      required: true,
      validator: (_rule: Rule, value: FeeCalc) => {
        if (!value.categoryType || value.fee.length === 0) {
          return Promise.reject(new Error("入力してください"));
        }

        if (
          value.fee.some(
            (item) =>
              item.name === "" ||
              item.count === "" ||
              item.unit === "" ||
              item.price === "",
          )
        ) {
          return Promise.reject(new Error("入力してください"));
        } else {
          return Promise.resolve();
        }
      },
      trigger: "change",
    },
  ],
};

const onFinish = (values: any) => {
  console.log("Success:", values);
  router.push("/back-office/customer-management/list");
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const getCustomerDetail = async (id: string) => {
  spinning.value = true;
  try {
    setTimeout(() => {
      Object.assign(formState, {
        customerName: "顧客1",
        buildingName: "建物1",
        tdbRating: "A",
        rankLevel: "A",
        isCompany: "false",
        memo: "メモ1",
        paymentSite: "paymentSite1",
        lineDay: "lineDay1",
        paymentMonth: "paymentMonth1",
        paymentDay: "paymentDay1",
        requestDate: "2023-01-01",
        postalCode: "123456",
        address: "地址1",
      });
      spinning.value = false;
    }, 2000);
  } catch (error) {
    console.error("Error fetching member detail:", error);
  } finally {
    // spinning.value = false;
  }
};

onMounted(() => {
  const id = route.query.id as string;
  if (id) {
    getCustomerDetail(id);
  }
});

watch(
  [() => formState.pjCode, () => formState.productName],

  async (newVal) => {
    if (newVal[0] && newVal[0].trim() !== "") {
      await nextTick();
      formRef.value?.clearValidate("pjCode");
    }

    if (newVal[1] && newVal[1].trim() !== "") {
      await nextTick();
      formRef.value?.clearValidate("productName");
    }
  },
  { immediate: true },
);
</script>
<style scoped>
.vertical-form-item {
  margin-bottom: 12px;
  height: auto;
}
.vertical-form-item :deep(.ant-form-item-row) {
  display: flex !important;
  flex-direction: column !important;
  height: 60px !important;
}

.vertical-form-item :deep(.ant-form-item-label) {
  text-align: left !important;
}

.form-title {
  padding: 8px 0;
  font-size: 16px;
  font-weight: bold;
  border-top: 2px solid #e8e8e8;
}

.form-sub-title-wrap {
  display: flex;
  align-items: center;
}

.form-sub-title {
  padding: 4px 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 12px;
}
</style>

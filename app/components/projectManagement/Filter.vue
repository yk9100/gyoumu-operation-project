<template>
  <div class="filter-form">
    <a-form layout="inline" :model="formState" @finish="handleFinish">
      <div class="simple-filter">
        <a-form-item label="案件名" name="caseName">
          <a-input v-model:value="formState.caseName" allowClear />
        </a-form-item>
        <a-form-item label="プロジェクト名" name="projectName">
          <a-select
            v-model:value="formState.projectName"
            style="min-width: 300px"
            :show-search="false"
            :show-arrow="true"
            mode="multiple"
            :max-tag-count="3"
          >
            <a-select-option value="プロジェクト1"
              >プロジェクト1</a-select-option
            >
            <a-select-option value="プロジェクト2"
              >プロジェクト2</a-select-option
            >
            <a-select-option value="プロジェクト3"
              >プロジェクト3</a-select-option
            >
            <a-select-option value="プロジェクト4"
              >プロジェクト4</a-select-option
            >
          </a-select>
        </a-form-item>

        <a-button type="link" @click="filterExpanded = !filterExpanded"
          >フィルター{{ filterExpanded ? "閉じる" : "開く" }}</a-button
        >
        <a-button type="primary" html-type="submit">検索</a-button>
        <a-button @click="formState = getDefaultFilterState()"
          >条件リセット</a-button
        >
      </div>
      <div v-if="filterExpanded" class="complicated-filter">
        <a-form-item name="status">
          <ProjectManagementStatusSelect v-model="formState.status" />
        </a-form-item>

        <div class="date-picker-box">
          <a-row :gutter="[16, 16]" style="width: 100%">
            <a-col :span="12">
              <a-form-item name="undertakeProjectDate">
                <div class="project-form-field">受注月</div>
                <ProjectManagementDatePicker
                  v-model="formState.undertakeProjectDate"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item name="inspectionProjectDate">
                <div class="project-form-field">検収月</div>
                <ProjectManagementDatePicker
                  v-model="formState.inspectionProjectDate"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </div>

        <div class="jyoutai-filter">
          <div class="project-form-field">状態</div>
          <a-row :gutter="[16, 16]" style="margin-bottom: 16px">
            <a-col :span="6">
              <div>見積</div>
              <a-form-item name="mitsumori">
                <a-select
                  v-model:value="formState.mitsumori"
                  :options="MITSUMORI_OPITIONS"
                  mode="multiple"
                  :show-search="false"
                  show-arrow
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <div>注文</div>
              <a-form-item name="tyuumon">
                <a-select
                  v-model:value="formState.tyuumon"
                  :options="TYUUMON_OPTIONS"
                  mode="multiple"
                  :show-search="false"
                  show-arrow
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <div>外注</div>
              <a-form-item name="gaityuu">
                <a-select
                  v-model:value="formState.gaityuu"
                  :options="GAITYUU_OPTIONS"
                  mode="multiple"
                  :show-search="false"
                  show-arrow
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <div>検収</div>
              <a-form-item name="kainnsyuu">
                <a-select
                  v-model:value="formState.kainnsyuu"
                  :options="KAINNSYUU_OPTIONS"
                  mode="multiple"
                  :show-search="false"
                  show-arrow
                >
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="[16, 16]">
            <a-col :span="6">
              <div>開発</div>
              <a-form-item name="kaihatu">
                <a-select
                  v-model:value="formState.kaihatu"
                  :options="KAIHATU_OPTIONS"
                  mode="multiple"
                  :show-search="false"
                  show-arrow
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <div>前金請求</div>
              <a-form-item name="zennkinn">
                <a-select
                  v-model:value="formState.zennkinn"
                  :options="ZENNKINN_OPTIONS"
                  mode="multiple"
                  :show-search="false"
                  show-arrow
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <div>請求</div>
              <a-form-item name="seikyuu">
                <a-select
                  v-model:value="formState.seikyuu"
                  :options="SEIKYUU_OPTIONS"
                  mode="multiple"
                  :show-search="false"
                  show-arrow
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6"> </a-col>
          </a-row>
        </div>

        <div class="other-filter">
          <div class="project-form-field">その他</div>
          <a-row :gutter="[16, 16]" style="margin-bottom: 16px">
            <a-col :span="6">
              <div>案件番号</div>
              <a-form-item name="banngou">
                <a-input
                  v-model:value="formState.banngou"
                  placeholder="案件番号で検索"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <div>ジョブカンPJ名</div>
              <a-form-item name="jobkanpjin">
                <a-input
                  v-model:value="formState.jobkanpjin"
                  placeholder="ジョブカンPJ名で検索"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <div>PM</div>
              <a-form-item name="pm">
                <a-select
                  v-model:value="formState.pm"
                  :show-search="false"
                  show-arrow
                  placeholder="選択してください"
                >
                  <a-option value="PM1">PM1</a-option>
                  <a-option value="PM2">PM2</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <div>営業者担当者</div>
              <a-form-item name="tanntousya">
                <a-select
                  v-model:value="formState.tanntousya"
                  :show-search="false"
                  show-arrow
                  placeholder="選択してください"
                >
                  <a-option value="担当者1">担当者1</a-option>
                  <a-option value="担当者2">担当者2</a-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="[16, 16]">
            <a-col :span="12">
              <div>受注金額</div>
              <div class="input-range">
                <a-form-item name="minKinngaku">
                  <a-input
                    type="number"
                    v-model:value="formState.minKinngaku"
                    placeholder="最低額"
                  />
                </a-form-item>
                <div class="input-range-separator">~</div>
                <a-form-item name="maxKinngaku">
                  <a-input
                    type="number"
                    v-model:value="formState.maxKinngaku"
                    placeholder="最高額"
                  />
                </a-form-item>
              </div>
            </a-col>
            <a-col :span="6">
              <div>顧客（社内外）</div>
              <a-form-item name="kokyaku">
                <a-select
                  v-model:value="formState.kokyaku"
                  :show-search="false"
                  show-arrow
                >
                  <a-option value="顧客1">顧客1</a-option>
                  <a-option value="顧客2">顧客2</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <div>発注（外注·仕入先·社内部署）</div>
              <a-form-item name="hattyuu">
                <a-select
                  v-model:value="formState.hattyuu"
                  :show-search="false"
                  show-arrow
                >
                  <a-option value="外注">外注</a-option>
                  <a-option value="仕入先">仕入先</a-option>
                  <a-option value="社内部署">社内部署</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6"> </a-col>
          </a-row>

          <a-row :gutter="[16, 16]">
            <a-col :span="12">
              <a-form-item name="gaityuuInspectionProjectDate">
                <div>外注検収月</div>
                <ProjectManagementDatePicker
                  v-model="formState.gaityuuInspectionProjectDate"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="部署" name="department">
                <a-select
                  v-model:value="formState.department"
                  style="width: 200px"
                  :show-search="false"
                  :show-arrow="true"
                  mode="multiple"
                >
                  <a-select-option value="部署1">部署1</a-select-option>
                  <a-select-option value="部署2">部署2</a-select-option>
                  <a-select-option value="部署3">部署3</a-select-option>
                  <a-select-option value="部署4">部署4</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
      </div>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import type { IDataPickerValue } from "./DatePicker.vue";
import {
  TYUUMON_OPTIONS,
  GAITYUU_OPTIONS,
  MITSUMORI_OPITIONS,
  KAINNSYUU_OPTIONS,
  KAIHATU_OPTIONS,
  ZENNKINN_OPTIONS,
  SEIKYUU_OPTIONS,
} from "./common";
const getDefaultFilterState = () => ({
  caseName: "",
  projectName: [],
  department: [],
  status: [],
  undertakeProjectDate: {
    year: dayjs(),
    months: [],
  },
  inspectionProjectDate: {
    year: dayjs(),
    months: [],
  },
  mitsumori: [],
  tyuumon: [],
  gaityuu: [],
  kainnsyuu: [],
  kaihatu: [],
  zennkinn: [],
  seikyuu: [],
  banngou: "",
  jobkanpjin: "",
  tanntousya: "",
  minKinngaku: "",
  maxKinngaku: "",
  kokyaku: "",
  hattyuu: "",
  pm: "",
  gaityuuInspectionProjectDate: {
    year: dayjs(),
    months: [],
  },
});

export interface ProjectFilterState {
  caseName: string;
  projectName: string[];
  status: string[];
  undertakeProjectDate: IDataPickerValue;
  inspectionProjectDate: IDataPickerValue;
  department: string[];
  mitsumori: string[];
  tyuumon: string[];
  gaityuu: string[];
  kainnsyuu: string[];
  kaihatu: string[];
  zennkinn: string[];
  seikyuu: string[];
  banngou: string;
  jobkanpjin: string;
  tanntousya: string;
  minKinngaku: string;
  maxKinngaku: string;
  kokyaku: string;
  hattyuu: string;
  pm: string;
  gaityuuInspectionProjectDate: IDataPickerValue;
}
const formState = ref<ProjectFilterState>(getDefaultFilterState());

const filterExpanded = ref(true);

const handleFinish = (values: ProjectFilterState) => {
  console.log(values);
};
</script>

<style scoped>
.filter-form {
  margin-bottom: 24px;
}

.date-picker-box {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
  border-radius: 8px;
  padding: 12px;
  background-color: #f5f5f5;
}

.simple-filter {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.complicated-filter {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

:deep(.ant-form-item) {
  margin-right: 0;
}

.jyoutai-filter {
  border-radius: 8px;
  padding: 12px;
  background-color: #f5f5f5;
}

.other-filter {
  border-radius: 8px;
  padding: 12px;
  background-color: #f5f5f5;
}

.input-range {
  display: flex;
  align-items: center;
  gap: 12px;
}

.input-range-separator {
  width: 24px;
  text-align: center;
  flex: 0 !important;
}

.input-range > div {
  flex: 1;
}
</style>

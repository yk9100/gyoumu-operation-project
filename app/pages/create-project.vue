<template>
  <div class="page-root">
    <GlobalHeader> </GlobalHeader>
    <div class="page-content">
      <div class="settings-title">
        <span>基本設定</span>
        <a-tooltip placement="top">
          <template #title>
            <span>プロジェクトの基本設定</span>
          </template>
          <a-button class="tip-btn"><QuestionOutlined /></a-button>
        </a-tooltip>
      </div>
      <div class="back-btn-wrap">
        <div class="back-btn" @click="handleBack">
          <RollbackOutlined />
          <span>戻る</span>
        </div>
      </div>

      <div class="form-container">
        <a-form
          :model="formState"
          layout="vertical"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item label="プロジェクト名" name="projectName" required>
            <div>
              <a-input
                v-model:value="formState.projectName"
                style="width: 400px"
              />
              <div class="form-item-tip">例：新商品開発プロジェクト</div>
            </div>
          </a-form-item>

          <a-form-item label="プロジェクトキー" name="projectKey" required>
            <div>
              <a-input
                v-model:value="formState.projectKey"
                style="width: 400px"
              />
              <div class="form-item-tip">
                <p>プロジェクトキーは、プロジェクトのURLの一部に使用されます</p>
                <p>
                  半角英大文字、数字、アンダーすスコアが使用できます。25文字以内で入力してください
                </p>
                <p>例：NEWPRO2020</p>
              </div>
            </div>
          </a-form-item>

          <a-form-item label="スキール整形のルール" name="skillRules">
            <div>
              <a-select
                v-model:value="formState.skillRules"
                allowClear
                style="width: 200px"
              >
                <a-select-option value="ルール1">ルール1</a-select-option>
                <a-select-option value="ルール2">ルール2</a-select-option>
              </a-select>
              <div class="form-item-tip">
                <p>
                  スペース全体のスキール整形のルールはスペース設定から変更できます。
                </p>
              </div>
            </div>
          </a-form-item>

          <div class="split-line" />

          <a-form-item label="" name="usePriorityAndVersion">
            <div>
              <a-checkbox v-model:checked="formState.usePriorityAndVersion">
                優先度、マイルストーン、発生バージョンを使用する
              </a-checkbox>
              <div class="form-item-tip" style="padding-left: 22px">
                <p>
                  チェックを入れると開発/リリースに関わる細かな項目を登録することができるようになります。
                </p>
              </div>
            </div>
          </a-form-item>

          <a-form-item label="" name="useChart">
            <div>
              <a-checkbox v-model:checked="formState.useChart">
                チャートを使用する
              </a-checkbox>
              <div class="form-item-tip" style="padding-left: 22px">
                <p>
                  チェックを入れると、進歩管理に便利なガントチャート、バーンダウンチャートが表示されます。
                </p>
                <p>
                  また、課題の開始日、予定時間、実績時間を登録ことができるようになります。
                </p>
                <p>
                  バーンダウンチャートを表示させるには、マイルストーンの利用と登録が必要です
                </p>
              </div>
            </div>
          </a-form-item>

          <a-form-item label="" name="useParentChildTasks">
            <div>
              <a-checkbox v-model:checked="formState.useParentChildTasks">
                親子課題を使用する
              </a-checkbox>
              <div class="form-item-tip" style="padding-left: 22px">
                <p>
                  チェックを入れるとこのプロジェクトで親子課題を使用することができるようになります。
                </p>
              </div>
            </div>
          </a-form-item>

          <a-form-item label="" name="useCompletedTasks">
            <div>
              <a-checkbox v-model:checked="formState.useCompletedTasks">
                「処理済み」以降を「完了」とみなす
              </a-checkbox>
              <div class="form-item-tip" style="padding-left: 22px">
                <p>
                  チェックを入れるとバーンダウンチャートの作成時に「処理済み」以降を「完了」とみなす描画します。
                </p>
              </div>
            </div>
          </a-form-item>

          <div class="split-line" />

          <a-form-item label="" name="useDocument">
            <div>
              <a-checkbox v-model:checked="formState.useDocument">
                ドキュメントを使用する
              </a-checkbox>
              <div class="form-item-tip" style="padding-left: 22px">
                <p>
                  チェックを入れるとこのプロジェクトでドキュメントを使用することができるようになります。
                </p>
              </div>
            </div>
          </a-form-item>

          <div class="split-line" />

          <a-form-item label="" name="useWiki">
            <div>
              <a-checkbox v-model:checked="formState.useWiki">
                Wikiを使用する
              </a-checkbox>
              <div class="form-item-tip" style="padding-left: 22px">
                <p>
                  Wikiツリー、Wikiの画像をオリジナルのサイズで表示するにはこのチェックが必要です。
                </p>
              </div>
            </div>
          </a-form-item>

          <a-form-item label="" name="useWikiTree">
            <div>
              <a-checkbox v-model:checked="formState.useWikiTree">
                Wikiツリー表示を有効にする
              </a-checkbox>
            </div>
          </a-form-item>

          <a-form-item label="" name="useWikiImage">
            <div>
              <a-checkbox v-model:checked="formState.useWikiImage">
                Wikiの画像をオリジナルのサイズで表示する
              </a-checkbox>
            </div>
          </a-form-item>

          <div class="split-line" />

          <a-form-item label="" name="useSharedFiles">
            <div>
              <a-checkbox v-model:checked="formState.useSharedFiles">
                共有ファイルを使用する
              </a-checkbox>
            </div>
            <div class="form-item-tip" style="padding-left: 22px">
              <p>
                チェックを入れると、このプロジェクトで共有ファイルを使用することができるようになります。
              </p>
              <p>
                既にファイルにデータがある状態でチェックが外すと、残っているファイルはそのままストレージ容量として保存されます。
              </p>
            </div>
          </a-form-item>

          <div class="split-line" />

          <a-form-item label="" name="useSubversion">
            <div>
              <a-checkbox v-model:checked="formState.useSubversion">
                Subversionを使用する
              </a-checkbox>
            </div>
          </a-form-item>
          <a-form-item label="" name="useGit">
            <div>
              <a-checkbox v-model:checked="formState.useGit">
                Gitを使用する
              </a-checkbox>
            </div>
          </a-form-item>

          <div class="split-line" />

          <a-form-item label="" name="useArchive">
            <div>
              <a-checkbox v-model:checked="formState.useArchive">
                プロジェクトをアーカイブする
              </a-checkbox>
            </div>
            <div class="form-item-tip" style="padding-left: 22px">
              <p>
                このプロジェクトが終了したり使用しなくなった場合に、チェックを入れるとプロジェクトの一覧に表示されなくなります。
              </p>
            </div>
          </a-form-item>
          <div class="save-btn-wrap">
            <a-button type="primary" html-type="submit"> 保存 </a-button>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RollbackOutlined, QuestionOutlined } from "@ant-design/icons-vue";
const router = useRouter();
const formState = reactive({
  projectName: "",
  projectKey: "",
  skillRules: "",
  usePriorityAndVersion: false,
  useChart: false,
  useParentChildTasks: false,
  useCompletedTasks: false,
  useDocument: false,
  useWiki: false,
  useWikiTree: false,
  useWikiImage: false,
  useSharedFiles: false,
  useSubversion: false,
  useGit: false,
  useArchive: false,
});

const handleBack = () => {
  router.push("/my-task");
};

const onFinish = () => {
  console.log("onFinish", formState);
};

const onFinishFailed = (errors: any) => {
  console.log("onFinishFailed", errors);
};
</script>

<style scoped>
.settings-title {
  font-size: 16px;
  font-weight: 700;
  color: #000;
  margin-bottom: 20px;
}
.tip-btn {
  margin-left: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  padding: 0;
}
.back-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #1677ff;
  cursor: pointer;
}

.back-btn:hover {
  color: #007bff;
  text-decoration: underline;
}

.back-btn-wrap {
  margin-bottom: 20px;
}
.form-item-tip {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
  line-height: 14px;
}

.form-item-tip p {
  margin: 0;
}

:deep(.ant-form-item-label) {
  padding-bottom: 0 !important;
}

.split-line {
  margin: 20px 0;
  height: 1px;
  background-color: #e5e5e5;
}

.save-btn-wrap {
  margin-top: 20px;
  text-align: center;
}
</style>

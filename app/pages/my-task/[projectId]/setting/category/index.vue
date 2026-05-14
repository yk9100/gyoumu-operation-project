<template>
  <div>
    <div class="settings-title">
      <span>カテゴリーの一覧</span>
      <a-tooltip placement="top">
        <template #title>
          <span>something...</span>
        </template>
        <a-button class="tip-btn"><QuestionOutlined /></a-button>
      </a-tooltip>
    </div>
    <div class="add-btn-wrap">
      <a-button type="primary" @click="handleCreate">カテゴリーの追加</a-button>
    </div>
    <vxe-table border ref="tableRef" :row-config="rowConfig" :data="categorys">
      <vxe-column title="カテゴリー名" drag-sort>
        <template #default="{ row }">
          <div class="type-name-cell">
            <span class="type-name" @click="handleEdit(row.id)">{{
              row.name
            }}</span>
            <span>({{ row.issueCount }})</span>
          </div>
        </template>
      </vxe-column>
      <vxe-column title="削除" width="80" align="center">
        <template #default="{ row }">
          <a-popconfirm
            placement="topRight"
            title="このデータを削除してもよろしいですか?"
            ok-text="削除"
            cancel-text="キャンセル"
            @confirm="handleDelete(row.id)"
            :getPopupContainer="(trigger: HTMLElement) => trigger.parentNode"
          >
            <div class="delete-btn">
              <CloseOutlined />
            </div>
          </a-popconfirm>
        </template>
      </vxe-column>
    </vxe-table>

    <div class="sort-tip">
      並び順を変更するには
      <HolderOutlined style="transform: rotate(90deg)" />
      をドラッグしてください。（）内の数字は、カテゴリーに属する課題件数です。
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  QuestionOutlined,
  CloseOutlined,
  HolderOutlined,
} from "@ant-design/icons-vue";
import type { VxeTablePropTypes, VxeTableInstance } from "vxe-table";

definePageMeta({
  layout: "project-setting",
});

const route = useRoute();
const router = useRouter();
const tableRef = ref<VxeTableInstance>();

const rowConfig = reactive<VxeTablePropTypes.RowConfig>({
  drag: true,
});

const resultEvent = () => {
  const $table = tableRef.value;
  if ($table) {
    const tableData = $table.getFullData();
    console.log(tableData);
  }
};

const categorys = ref([
  {
    id: 582513,
    name: "画面",
    archived: false,
    issueCount: 4,
  },
  {
    id: 582514,
    name: "エディタ",
    archived: false,
    issueCount: 9,
  },
  {
    id: 582515,
    name: "目次",
    archived: false,
    issueCount: 0,
  },
  {
    id: 582516,
    name: "検索",
    archived: false,
    issueCount: 1,
  },
  {
    id: 582517,
    name: "API",
    archived: false,
    issueCount: 0,
  },
]);

const handleDelete = (id: number) => {
  categorys.value = categorys.value.filter((item) => item.id !== id);
};

const handleCreate = () => {
  router.push(`/my-task/${route.params.projectId}/setting/category/create`);
};

const handleEdit = (categoryId: number) => {
  router.push(
    `/my-task/${route.params.projectId}/setting/category/create?categoryId=${categoryId}`,
  );
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
.add-btn-wrap {
  margin-bottom: 20px;
}
.type-name-cell {
  display: inline-flex;
  gap: 8px;
  margin-left: 8px;
  font-size: 14px;
}
.type-name {
  color: #1677ff;
  font-weight: bold;
  cursor: pointer;
}
.type-name:hover {
  color: #007bff;
  text-decoration: underline;
}
.delete-btn {
  color: #dc3545;
  font-size: 16px;
  cursor: pointer;
}
.delete-btn:hover {
  color: #c82333;
}
.type-tag {
  display: inline-flex;
  vertical-align: middle;
  border-radius: 20px;
  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: auto;
  padding: 1px 8px;
  white-space: nowrap;
  color: #fff;
  font-size: 13px;
  justify-content: center;
  align-items: center;
}
.template-tag {
  color: #1677ff;
  cursor: pointer;
}
.template-tag:hover {
  color: #007bff;
  text-decoration: underline;
}
.sort-tip {
  font-size: 14px;
  color: #666;
  margin: 12px 0;
}
</style>

<template>
  <div class="file-upload-button" @click="open = true">
    <PaperClipOutlined style="font-size: 18px" />
    <span class="file-count" v-if="fileList.length > 0">{{
      fileList.length
    }}</span>
  </div>
  <a-modal
    title="ファイルアップロード"
    v-model:open="open"
    @cancel="open = false"
    width="900px"
    :footer="null"
  >
    <div class="file-list" v-if="fileList.length > 0">
      <div class="file-item" v-for="(item, index) in fileList" :key="index">
        <span class="file-name">{{ item.name }}</span>
        <button class="delete-btn" @click="removeFile(index)">
          <CloseOutlined />
        </button>
      </div>
    </div>
    <a-upload-dragger
      v-model:fileList="fileList"
      name="file"
      :multiple="true"
      :beforeUpload="beforeUpload"
      @drop="handleDrop"
      :showUploadList="false"
    >
      <div class="file-upload-dragger-content">
        <p class="ant-upload-drag-icon">
          <CloudUploadOutlined />
        </p>
        <p class="ant-upload-text">
          ファイルをクリックまたはドラッグしてこの領域にアップロードします
        </p>
        <p class="ant-upload-hint">
          シングルアップロードまたは一括アップロードをサポートします。
        </p>
      </div>
    </a-upload-dragger>
  </a-modal>
</template>
<script lang="ts" setup>
import {
  CloudUploadOutlined,
  PaperClipOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";
const fileList = defineModel<File[]>({
  default: () => [],
});
const open = ref(false);
const beforeUpload = (file: File) => {
  // console.log(file);
  return false;
};
const handleDrop = (e: DragEvent) => {
  console.log(e);
};
const removeFile = (index: number) => {
  fileList.value.splice(index, 1);
};
</script>
<style scoped>
.file-upload-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #bdbdbd;
  background-color: #f5f5f5;
  cursor: pointer;
  color: #707070;
  position: relative;
}
.file-count {
  position: absolute;
  right: -4px;
  bottom: -4px;
  font-size: 12px;
  color: #fff;
  padding: 0 4.5px;
  border-radius: 20px;
  background-color: #1890ff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-upload-button:hover {
  background-color: #1890ff;
  border-color: #1890ff;
  color: #fff;
}

.file-upload-dragger-content {
  height: 330px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.file-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 8px;
  max-height: 150px;
  margin-bottom: 12px;
  overflow: auto;
}

.file-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px 6px 16px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  font-size: 14px;
  max-width: 200px;
}

.file-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  background: #fafafa;
}

.file-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333;
}

.delete-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: #999;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.delete-btn:hover {
  background: #ff4d4f;
  color: white;
}

.delete-btn:active {
  transform: scale(0.95);
}
</style>

<template>
  <div class="attachment-list-box">
    <div class="attachment-list">
      <div
        v-for="attachment in attachments"
        :key="attachment.id"
        class="attachment-item"
      >
        <a-button type="link" size="small">{{ attachment.name }}</a-button>
        <span>({{ attachment.localized.created }})</span>
        <a-button
          type="link"
          size="small"
          @click="downloadAttachment(attachment.id)"
        >
          download
        </a-button>
        <a-button
          type="link"
          size="small"
          style="display: flex; align-items: center"
          @click="deleteAttachment(attachment.id)"
        >
          <CloseOutlined />
        </a-button>
      </div>
    </div>
    <div class="attachment-add">
      <a-upload
        name="file"
        :beforeUpload="beforeUpload"
        :showUploadList="false"
      >
        <a-button>
          <PlusOutlined />
          Attach file
        </a-button>
      </a-upload>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PlusOutlined, CloseOutlined } from "@ant-design/icons-vue";
import type { Attachment } from "~/types/task";
import { saveAs } from "file-saver";
const props = defineProps<{
  attachments: Attachment[];
}>();

const attachments = ref(props.attachments);

const beforeUpload = (file: File) => {
  console.log("customRequest", file);
  attachments.value.push({
    id: Date.now(),
    name: file.name,
    localized: {
      created: new Date().toLocaleString(),
    },
    size: file.size,
    icon: file.type,
    url: URL.createObjectURL(file),
    image: file.type.startsWith("image/"),
    pdf: file.type === "application/pdf",
    video: file.type.startsWith("video/"),
    contentType: file.type,
    created: new Date().toLocaleString(),
  });
  return false;
};

const deleteAttachment = (id: number) => {
  attachments.value = attachments.value.filter((item) => item.id !== id);
};

const downloadAttachment = (id: number) => {
  saveAs(attachments.value.find((item) => item.id === id)?.url || "");
};
</script>

<style scoped>
.attachment-list-box {
  padding: 11px 20px 11px 8px;
  display: flex;
  justify-content: space-between;
}
.attachment-list {
  max-height: 400px;
  overflow: auto;
}
.attachment-item {
  display: flex;
  align-items: center;
  gap: 4px;
}
.attachment-add {
}

:deep(.ant-btn-link span:hover) {
  text-decoration: underline;
}
</style>

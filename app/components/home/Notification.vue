<template>
    <div class="notification-container">
        <h3 class="notification-title">
            <BellOutlined />
            お知らせ
        </h3>
        <div class="notification-list">
            <div v-for="(notification, index) in notifications" :key="index" class="notification-item">
                <div class="notification-date">{{ notification.date }}</div>
                <div class="notification-content">
                    <p>{{ notification.message }}</p>
                    <p v-if="notification.note" class="notification-note">{{ notification.note }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BellOutlined } from '@ant-design/icons-vue';

// 通知数据
const notifications = ref([
    {
        date: '2026.10.21',
        message: '新入社員の入社式があるので、15時にM会議室に全員参加してください。',
        note: '備考：花、ノート'
    },
    {
        date: '2026.09.01',
        message: '全社社員旅行日となります。楽しい1日を過ごすように',
        note: '集合情報：'
    }
]);
</script>

<style scoped>
.notification-container {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 16px;
}

.notification-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #333;
}

.notification-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 300px;
    overflow-y: auto;
}

.notification-item {
    background-color: #fff;
    border-radius: 6px;
    padding: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.notification-date {
    font-size: 12px;
    color: #666;
    margin-bottom: 8px;
}

.notification-content {
    font-size: 14px;
    color: #333;
    line-height: 1.4;
}

.notification-note {
    margin-top: 8px;
    font-size: 13px;
    color: #666;
    font-style: italic;
}
</style>
<template>
    <a-dropdown @visibleChange="handleVisibleChange">
        <a class="user-info" href="#" @click.stop>
            <a-avatar :size="32" :src="userInfo.avatar" :alt="userInfo.name" />
            <span class="user-name">{{ userInfo.name }}</span>
        </a>
        <template #overlay>
            <a-menu @click="handleMenuClick">
                <a-menu-item key="profile">
                    <UserOutlined />
                    <span>プロフィール</span>
                </a-menu-item>
                <a-menu-item key="settings">
                    <SettingOutlined />
                    <span>設定</span>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="logout">
                    <LogoutOutlined />
                    <span>ログアウト</span>
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
    UserOutlined,
    SettingOutlined,
    LogoutOutlined
} from '@ant-design/icons-vue';

const userInfo = ref({
    name: '山田太郎',
    avatar: 'https://api.dicebear.com/7.x/lorelei/svg?seed=John',
    email: 'yamada@example.com'
});

const handleVisibleChange = (visible: boolean) => {
    console.log('下拉菜单可见性变化:', visible);
};

const handleMenuClick = (e: any) => {
    if (e.key === 'logout') {
        console.log('执行登出操作');
    }
};
</script>

<style scoped>
.user-info {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 8px;
    border-radius: 4px;
    text-decoration: none;
    color: #333;
    transition: all 0.3s;
}

.user-info:hover {
    background-color: #f0f0f0;
}

.user-name {
    font-size: 14px;
    font-weight: 500;
}

.user-icon {
    font-size: 12px;
    color: #666;
}

.user-menu-item {
    display: flex;
    align-items: center;
    gap: 4px;
}

:deep(.ant-dropdown-menu-title-content) {
    display: flex;
    align-items: center;
    gap: 4px;
}
</style>
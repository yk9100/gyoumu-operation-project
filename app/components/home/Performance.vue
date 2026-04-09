<template>
    <div class="performance-container">
        <h3 class="performance-title">
            <BarChartOutlined /><span>業績</span>
        </h3>
        <div class="performance-chart">
            <a-chart :data="chartData" :config="chartConfig" :style="{ height: '300px' }" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BarChartOutlined } from '@ant-design/icons-vue';

// 图表数据
const chartData = ref([
    { name: '1月', value: 120 },
    { name: '2月', value: 200 },
    { name: '3月', value: 150 },
    { name: '4月', value: 240 },
    { name: '5月', value: 180 },
    { name: '6月', value: 300 }
]);

// 图表配置
const chartConfig = ref({
    xField: 'name',
    yField: 'value',
    type: 'column',
    color: '#1890ff',
    label: {
        position: 'top',
        style: {
            fill: '#666'
        }
    },
    xAxis: {
        label: {
            autoHide: true
        }
    },
    yAxis: {
        label: {
            formatter: (value: any) => `${value}`
        }
    },
    meta: {
        value: {
            alias: '業績'
        }
    }
});
</script>

<style scoped>
.performance-container {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 20px;
}

.performance-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #333;
    display: flex;
    align-items: center;
    gap: 6px;
}

.performance-chart {
    background-color: #fff;
    border-radius: 6px;
    padding: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
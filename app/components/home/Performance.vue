<template>
    <div class="performance-container">
        <h3 class="performance-title">
            <BarChartOutlined /><span>業績</span>
        </h3>
        <div class="performance-chart">
            <v-chart :option="chartOption" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BarChartOutlined } from '@ant-design/icons-vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent
} from 'echarts/components';
import VChart from 'vue-echarts';

// 注册必要的 ECharts 组件
use([
    CanvasRenderer,
    BarChart,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent
]);

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
const chartOption = ref({
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: chartData.value.map(item => item.name),
        axisLabel: {
            interval: 0
        }
    },
    yAxis: {
        type: 'value',
        name: ''
    },
    series: [
        {
            name: '業績',
            type: 'bar',
            data: chartData.value.map(item => item.value),
            itemStyle: {
                color: '#1890ff'
            },
            label: {
                show: true,
                position: 'top',
                color: '#666'
            }
        }
    ]
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
    height: 300px;
}
</style>
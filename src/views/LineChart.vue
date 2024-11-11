<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide, toRefs, watch } from 'vue'
import { createOption } from '@/views/lineChartOptions.js'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  LineChart,
  CanvasRenderer
])


provide(THEME_KEY, 'dark');

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});
const { data } = toRefs(props);
const option = ref(createOption(data.value));

watch(data, (newData) => {
  option.value = createOption(newData);
}, { deep: true });
</script>

<style scoped>
.chart {
  height: 100vh;
}
</style>

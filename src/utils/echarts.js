import * as echarts from "echarts/core";
import { PieChart, BarChart, LineChart } from "echarts/charts";
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";
import {
  GridComponent,
  TitleComponent,
  PolarComponent,
  LegendComponent,
  GraphicComponent,
  ToolboxComponent,
  TooltipComponent,
  DataZoomComponent,
  VisualMapComponent,
  MarkLineComponent
} from "echarts/components";

const { use } = echarts;

use([
  PieChart,
  BarChart,
  LineChart,
  CanvasRenderer,
  SVGRenderer,
  GridComponent,
  TitleComponent,
  PolarComponent,
  LegendComponent,
  GraphicComponent,
  ToolboxComponent,
  TooltipComponent,
  DataZoomComponent,
  VisualMapComponent,
  MarkLineComponent
]);


export function useEchartsApp(app) {
  app.config.globalProperties.$echarts = echarts;
}

export default echarts;

export function createOption(processedData = []) {
  // 提取时间作为 xAxis 数据
  const xAxisData = processedData.map(item => item.time);

  // 提取新房和二手房的数据作为 series 数据
  const seriesData = [
    {
      name: '新房成交套数',
      type: 'line',
      stack: 'Total',
      data: processedData.map(item => item.xfValue),
    },
    {
      name: '二手房成交套数',
      type: 'line',
      stack: 'Total',
      data: processedData.map(item => item.esfValue),
    }
  ];

  return {
    title: {
      text: '成都房屋成交数据',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['新房成交套数', '二手房成交套数'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
    },
    yAxis: {
      type: 'value',
    },
    series: seriesData,
  };
}

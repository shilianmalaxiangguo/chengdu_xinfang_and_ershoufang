<template>
  <line-chart-component v-loading="loading" :data="lineData"></line-chart-component>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRefs } from 'vue'

import { getErFangZiList } from '@/api/index.js'
import LineChartComponent from '@/views/LineChart.vue'
defineOptions({ name: 'MainComponent' })

const state = reactive({
  lineData: [],
  loading: false,
})

const { lineData, loading } = toRefs(state)

function processData(data) {
  return data.map((item) => {
    // 提取日期的月日部分
    const titleMatch = item.title.match(/\d{1,2}月\d{1,2}日/)
    if (!titleMatch) {
      return {
        time: null,
        xfValue: 0,
        esfValue: 0,
      }
    }
    let time = titleMatch ? titleMatch[0] : '未知日期'
    time = new Date().getFullYear() + '年' + time

    // 提取新房和二手房的成交套数
    console.log('item', item)
    console.log('titleMatch', titleMatch)
    console.log('item.title.match(/二手房(\\d+)套/)', item.title.match(/二手房(\d+)套/))
    console.log('item.title.match(/新房(\\d+)套/)', item.title.match(/新房(\d+)套/))
    const xfValue = parseInt(item.title.match(/新房(\d+)套/)[1])
    const esfValue = parseInt(item.title.match(/二手房(\d+)套/)[1])

    // 返回整理后的对象
    return {
      time,
      xfValue,
      esfValue,
    }
  })
}
async function getData() {
  // 创建一个包含 1 到 10 的数组，以便请求前 10 页的数据
  const pages = Array.from({ length: 30 }, (_, i) => i + 1)

  // 使用 Promise.all 来并行请求每一页的数据
  const requests = pages.map((page) => {
    const data = {
      page,
      category: 'lk:xinfangzixun',
    }
    return getErFangZiList(data)
  })

  try {
    loading.value = true
    const responses = await Promise.all(requests)
    loading.value = false
    // 将所有页面的数据合并到一个数组中
    const allData = responses.flatMap((res) => res.data).reverse()

    const result = processData(allData).filter((item) => item.time !== null)
    // 处理合并后的数据
    lineData.value = result
    console.log(lineData.value)
  } catch (error) {
    loading.value = false
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  getData()
})
</script>

<style scoped></style>

<template>

</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import {getErFangZiList} from '@/api/index'
defineOptions({name: 'MainComponent'})


function getData () {

// GET 请求
  getErFangZiList().then(res => {
    console.log(res)
  })
}
onMounted(() => {
  getData()
})
</script>

<style scoped>

</style>

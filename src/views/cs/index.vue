<script setup>
import { ref } from 'vue';
import csVue from './cs.vue';
const csdata = ref('2')
const handleCancel = () => {
    console.log('取消')
    csdata.value = '3'
}
</script>

<template>
    <csVue :csdata="csdata" />
    <a-button type="primary" @click="handleCancel">取消</a-button>
</template>

<style scoped lang='scss'>
</style>
<script setup >
import router from '../router/index.js'
const editDiv = ()=>{
    router.push({name:'EditDiv'})
}
</script>

<template>
    <a-button type="primary" @click="editDiv">editDiv</a-button>
</template>

<style scoped lang='scss'>
</style>
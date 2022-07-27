<script setup >
import router from '../router/index.js'
const editDiv = () => {
    router.push({ name: 'EditDiv' })
}
const cs = () => {
    router.push({
        name: 'CS'
    })

}
</script>

<template>
    <a-button type="primary" @click="editDiv">editDiv</a-button>
    <a-button type="primary" @click="cs">测试</a-button>
</template>

<style scoped lang='scss'>
</style>
<script setup>
import { onMounted, ref, watch } from 'vue';
const props = defineProps({
    modelValue: String,
    csdata: {
        type: String,
        default: '呃呃呃'
    }
})
onMounted(() => {
    console.log(props.csdata)
})
watch(() => { props.csdata }, (newV, oldV) => {
    console.log("🚀 ~ file: cs.vue ~ line 10 ~ watch ~ newV,oldV", newV, oldV);
})
</script>

<template>

</template>

<style scoped lang='scss'>
</style>
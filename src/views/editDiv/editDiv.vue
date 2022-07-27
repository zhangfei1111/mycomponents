<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue';
const props = defineProps({
    modelValue: String
})
const divContent = ref()
const innerText = ref(props.modelValue)
const isLocked = ref(false)
defineExpose({ divContent })
const handleFocus = () => {
    isLocked.value = true
}
const handleBlur = () => {
    isLocked.value = false
}
const handleInput = () => {
    setTimeout(() => {
        // 在父组件中给予空格,因为在contenteditable存在首次输入光标对象判断异常,在插入数据前进行取出空格
        emit('input', divContent.value.innerHTML.trim())
    }, 5)
}
const emit = defineEmits(['input'])
onMounted(() => {
    console.log(innerText.value, 'props')
    divContent.value.addEventListener('keydown', function (e) {
        if (e.which === 8 || e.which === 46) {
            const s = window.getSelection()
            const r = s.getRangeAt(0)
            const el = r.startContainer.parentElement
            if (el.classList.contains('msg-value-blue')) {
                e.preventDefault()
                el.remove()
            }
        }
    })
})
watch(innerText, (newV, oldV) => {
    console.log('变换', newV, oldV)
})
// 粘贴文本，去除文本带的各种html标签
const handlePaste = (e) => {
    const text = e.clipboardData.getData('text/plain')
    e.preventDefault()
    insert(text)
}
// 向光标处塞入内容
const insert = (html) => {
    divContent.value.focus()
    let sel, range
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection()
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0)
            range.deleteContents()
            // Range.createContextualFragment() 不适用ie9
            const el = document.createElement('div')
            el.innerHTML = html
            const frag = document.createDocumentFragment()
            let node
            let lastNode
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node)
            }
            range.insertNode(frag)
            // 维护选取
            if (lastNode) {
                range = range.cloneRange()
                range.setStartAfter(lastNode)
                range.collapse(true)
                sel.removeAllRanges()
                sel.addRange(range)
            }
        }
    } else if (document.selection && document.selection.type !== 'Control') {
        // IE < 9
        document.selection.createRange().pasteHTML(html)
    }
    setTimeout(() => {
        // 在父组件中给予空格,因为在contenteditable存在首次输入光标对象判断异常,在插入数据前进行取出空格
        emit('input', divContent.value.innerHTML.trim())//子传父
    }, 5)
}
</script>

<template>
    <div ref="divContent" contenteditable="true" class="edit-div" data-placeholder="请输入内容..." @focus="handleFocus"
        @blur="handleBlur" @input="handleInput" @paste="handlePaste" v-html="innerText">
    </div>
</template>

<style scoped lang='scss'>
.edit-div {
    height: 200px;
    overflow: hidden;
    overflow-y: auto;
    margin: 0 20px;
    border: 1px solid #40a9ff;
    border-radius: 4px;
}

.edit-div:focus-visible {
    border: none;
    border: 1px solid #40a9ff !important;
}
</style>
<script setup>
import { reactive, ref, toRefs } from 'vue';
import editDivVue from './editDiv.vue';
const editRef = ref()
const insert = () => {
    let dom = editRef.value.divContent
    dom.focus()
    let html = `<input class="customer-name msg-value-blue" disabled value="客户昵称"/>`
    let sel, range
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection() // 获取选定对象
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0) // 设置最后光标对象
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

    const params = {
        val: dom.innerHTML,
    }
    console.log(params, 'params')
}
const textContent = reactive({
    content: '',
    realContent: ' gggggggggg<input class=\"customer-name msg-value-blue\" disabled=\"\" value=\"客户昵称\">'
})
const editInput = (val) => {
    replaceContent(val)
    console.log(replaceContent(val), '抛出的值')
}
// 对带有特殊标签的字段进行正则匹配
const replaceContent = (data) => {
    const matchObject = {
        '<input class=\"customer-name msg-value-blue\" disabled=\"\" value=\"客户昵称\">': '[客户昵称]',
    }
    const reStr = Object.keys(matchObject).join('|')
    const re = new RegExp(reStr, 'g')
    return data.trim().replace(re, it => matchObject[it])
}
</script>

<template>
    <a-button type="link" @click="insert">【插入客户昵称】</a-button>
    <editDivVue ref="editRef" v-model="textContent.realContent" @input="editInput" />
</template>

<style scoped lang='scss'>
::v-deep .msg-value-blue {
    color: #40a9ff;
    background: unset;
    border: none;
    width: 65px;
}
</style>
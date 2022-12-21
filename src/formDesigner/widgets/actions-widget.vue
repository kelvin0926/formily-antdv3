<template>
    <div class="dn-actions-widget">
        <a-radio-group v-model:value="language" @change="handleChangeLanguage">
            <a-radio-button value="zh-cn">简体中文</a-radio-button>
            <a-radio-button value="en-us">English</a-radio-button>
        </a-radio-group>
        <a-button :style="{ marginLeft: '10px' }" @click="handleSaveSchema">保存</a-button>
        <a-button @click="handleSaveSchema" type="primary">发布</a-button>
    </div>
</template>

<!-- 设计器右上角操作按钮 -->
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { loadInitialSchema, saveSchema } from '../service'
import { GlobalRegistry } from '@designable/core'
import { useDesigner } from '../playground/prototypes'



function useI18n() {
    const language = ref(String.prototype.toLocaleLowerCase.call(GlobalRegistry.getDesignerLanguage()))

    function handleChangeLanguage(e) {
        const value = e.target.value;
        language.value = value
        GlobalRegistry.setDesignerLanguage(value)
    }
    return { language, handleChangeLanguage }
}

export default defineComponent({
    components: {},
    setup() {
        const designerRef = useDesigner()
        // // TODO::tree node has reaction problems

        onMounted(() => {
            loadInitialSchema(designerRef.value)
        })

        function handleSaveSchema() {
            saveSchema(designerRef.value)
        }

        return { ...useI18n(), handleSaveSchema }
    }
})
</script>

<style scoped lang="less">
.dn-actions-widget {
    display: flex;
    align-items: center;
}
</style>
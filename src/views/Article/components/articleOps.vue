<script setup>
    import { ARTICLE_OPS_TYPE } from '@/constant/articleConstant'
    import { articleDetailApi, addArticleApi, editArticalApi } from '@/api/article'
    import { onMounted, ref, reactive, watch } from 'vue'
    import { ElMessage } from 'element-plus'
    const emit = defineEmits()

    const props = defineProps({
        opsType: {
            type: String,
            default: ''
        },
        articleId: {
            type: String,
            default: ''
        }
    })

    // 新增/编辑文章时候双向绑定的内容
    const articleForm = reactive({
        id: '', // 用于编辑文章发起请求时候，方便传参
        stem: '',
        content: ''
    })

    const editorKey = ref(0) // 这个变量用于刷新富文本编辑器的content

    // 获取预览界面的内容
    const showRequest = async () => {
        if(props.opsType === ARTICLE_OPS_TYPE.preview || props.opsType === ARTICLE_OPS_TYPE.edit) {
            const data = await articleDetailApi(props.articleId)
            
            // 给表单字段赋值
            Object.keys(articleForm).forEach((key) => {
                articleForm[key] = data[key]
            })
        }
    }

    // 新增/编辑文章后点击确认的处理函数
    const onAdd = async () => {
        if(props.articleId) {
            // 编辑
            await editArticalApi(articleForm)
        } else {
            // 新增
            await addArticleApi(articleForm)
        }

        ElMessage.success(props.articleId ? "编辑成功！" : "新增成功！")
        
        emit('updateData') // 更新数据
        onCancel()
    }

    // 抽屉中取消按钮：关闭抽屉，清空表单
    const onCancel = () => {
        emit('closeDrawer') // 关闭抽屉

        // 清除表单数据
        articleForm.stem = ''
        articleForm.content = ''
        editorKey.value++
    }

    onMounted(() => {
        showRequest()
    })
</script>

<template>
<div>
    <div class="show-edit-or-add" v-if="opsType === ARTICLE_OPS_TYPE.add || opsType === ARTICLE_OPS_TYPE.edit">
        <el-form label-width="auto">
            <el-form-item label="标题">
                <el-input placeholder="请输入标题" v-model="articleForm.stem"/>
            </el-form-item>

            <el-form-item label="内容">
                <QuillEditor 
                    :key="editorKey"
                    theme="snow" 
                    toolbar="full" 
                    placeholder="请输入内容" 
                    v-model:content="articleForm.content"
                    contentType="html"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onAdd">确 认</el-button>
                <el-button @click="onCancel">取 消</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="show-preview" v-else>
        <h4>{{ articleForm.stem }}</h4>
        <div v-html="articleForm.content"></div>
    </div>
</div>
</template>

<style scoped lang="scss">
.show-edit-or-add {
    :deep(.ql-container) {
        min-height: 200px;
        width: 100%;
    }

    .el-form {
        .el-form-item:last-child {
            margin-top: 140px;
            margin-left: 40px;
        }
    }
}
.show-preview {
    h4 {
        margin-top: 0;
    }
}
</style>
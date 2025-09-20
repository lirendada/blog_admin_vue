<script setup>
    import { ARTICLE_OPS_TYPE } from '@/constant/articleConstant'
    import { articleDetailApi } from '@/api/article'
    import { onMounted, ref } from 'vue'

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

    const articleDetail = ref({})

    const showRequest = async () => {
        if(props.opsType === ARTICLE_OPS_TYPE.preview) {
            // 预览界面
            const data = await articleDetailApi(props.articleId)
            articleDetail.value = data
            // console.log(articleDetail.value);
            
        } else {
            if(props.articleId === null || props.articleId === '') {
                // 新增页面
            } else {
                // 编辑页面
            }
        }
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
                <el-input placeholder="请输入标题" />
            </el-form-item>

            <el-form-item label="内容">
                <QuillEditor theme="snow" toolbar="full" placeholder="请输入内容" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary">确 认</el-button>
                <el-button>取 消</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="show-preview" v-else>
        <h4>{{ articleDetail.stem }}</h4>
        <div>{{ articleDetail.content }}</div>
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
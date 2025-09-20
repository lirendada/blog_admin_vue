<script setup>
        
</script>

<template>
<div>
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
</template>

<style scoped lang="scss">
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
</style>
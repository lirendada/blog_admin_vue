<script setup>
    import { onMounted, reactive } from 'vue'
    import { articleApi, delArticleApi } from '@/api/article'
    import { ElMessage, ElMessageBox } from 'element-plus'

    // 文章数据
    const tableData = reactive({
        current: 1,    // 当前所在页数
        pageTotal: 5,  // 每页条量
        totalItems: 0, // 总数据量
        totalPages: 0, // 总页数
        rows: []
    })

    // 获取文章信息
    const getArticleData = async (currentPage) => {
        try {
            // 发起获取文章请求，拿到数据
            const data = await articleApi({current: currentPage, pageSize: tableData.pageTotal}) 
            tableData.totalItems = data.total
            tableData.totalPages = data.pageTotal
            tableData.rows = data.rows
        } catch(e) {}
    }

    // 改变当前页
    const onCurrentChange = (newVal) => {
        tableData.current = newVal
        getArticleData(tableData.current)
    }

    const onDel = async (id) => {
        try {
            await ElMessageBox.confirm(
                "确定要删除么？",
                'Warning',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
            await delArticleApi(id)
            await getArticleData(tableData.current)
            ElMessage.success('删除成功！')
        } catch(e) {}
    }

    onMounted(() => {
        getArticleData(tableData.current)
    })
</script>

<template>
    <div class="main-box">
        <div class="header">
            <el-breadcrumb separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>文章</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-card>
            <template #header>
                <div class="card-header">
                    <span>共有 {{ tableData.totalItems }} 篇文章</span>
                    <el-button type="primary" round>
                        <el-icon><Plus /></el-icon>
                        <span>新增文章</span>
                    </el-button>
                </div>
            </template>

            <el-table :data="tableData.rows" border striped style="width: 100%">
                <el-table-column prop="stem" label="标题" min-width="300" />
                <el-table-column prop="creator" label="作者" min-width="120" />
                <el-table-column prop="category" label="分类" min-width="120" />
                <el-table-column prop="likeCount" label="点赞" min-width="100" sortable />
                <el-table-column prop="views" label="浏览数" min-width="100" sortable />
                <el-table-column prop="createdAt" label="创建时间" min-width="180" />
                <el-table-column label="操作" min-width="150">
                    <template #default="{ row }">
                        <el-tooltip
                            class="box-item"
                            effect="dark"
                            content="预览"
                            placement="bottom">
                            <el-icon style="cursor: pointer;"><View /></el-icon>
                        </el-tooltip>
                        <el-tooltip
                            class="box-item"
                            effect="dark"
                            content="编辑"
                            placement="bottom">
                            <el-icon style="cursor: pointer;"><Edit /></el-icon>
                        </el-tooltip>
                        <el-tooltip
                            class="box-item"
                            effect="dark"
                            content="删除"
                            placement="bottom"
                        >
                            <el-icon @click="onDel(row.id)" style="cursor: pointer;"><Delete /></el-icon>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
                
            <template #footer>
                <el-pagination 
                    background 
                    layout="prev, pager, next" 
                    :total="tableData.totalItems" 
                    :page-count="tableData.totalPages"
                    v-model:current-page="tableData.current"
                    @current-change="onCurrentChange"
                />
            </template>
        </el-card>
  </div>
</template>

<style scoped lang="scss">
.main-box{ 
    .el-card {
        margin-top: 20px;

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 40px;
        }
        :deep(.el-card__footer) {
            border-top: none;
            margin-top: -10px;
        }
        .el-table {
            .el-icon:nth-child(2) {
                margin: 0 15px;
            }
        }
        .el-pagination {
            display: flex;
            justify-content: center;
        }
    }
}
</style>
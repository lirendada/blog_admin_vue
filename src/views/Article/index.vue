<script setup>
    import { onMounted, reactive } from 'vue'
    import { articleApi } from '@/api/article'

    // 文章数据
    const tableData = reactive({
        current: 1,    // 当前所在页数
        pageTotal: 5,  // 每页条量
        totalItems: 0, // 总数据量
        totalPages: 0, // 总页数
        rows: []
    })

    const getArticleData = async (currentPage) => {
        try {
            // 发起获取文章请求，拿到数据
            const data = await articleApi(currentPage, tableData.pageTotal) 
            tableData.totalItems = data.total
            tableData.totalPages = data.pageTotal
            tableData.rows = data.rows

            console.log(tableData);
            
        } catch(e) {}
    }

    onMounted(() => {
        getArticleData(tableData.current)
    })
</script>

<template>
    <div class="main-box">
        <el-container> 
            <el-header>
                <el-breadcrumb :separator-icon="ArrowRight">
                    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
                    <el-breadcrumb-item>promotion management</el-breadcrumb-item>
                </el-breadcrumb>
            </el-header>
            <el-main>
                <el-table :data="tableData.rows" style="width: 100%">
                    <el-table-column prop="data.id" label="id" width="180" />
                    <el-table-column prop="data.stem" label="文章名" width="180" />
                    <el-table-column prop="data.creator" label="作者" width="180" />
                    <el-table-column prop="data.category" label="分类" width="180" />
                    <el-table-column prop="data.createdAt" label="创作时间" width="180" />
                </el-table>
                    
                <el-pagination background layout="prev, pager, next" :total="1000" />
            </el-main>
        </el-container>
  </div>
</template>

<style scoped>

</style>
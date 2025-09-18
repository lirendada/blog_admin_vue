<script setup>
    import { onMounted, reactive } from 'vue'
    import { articleApi } from '@/api/user'
import { ElMessage } from 'element-plus'

    // 文章数据
    const tableData = reactive({
        current: 1,    // 当前所在页数
        pageTotal: 10, // 每页条量
        totalItems: 0, // 总数据量
        totalPages: 0, // 总页数
        rows: []
    })

    const getArticleData = async (currentPage) => {
        try {
            const data = await articleApi(currentPage, tableData.pageTotal) 
            tableData.totalItems = data.total
            tableData.totalPages = data.pageTotal
            tableData.rows = data.rows

            console.log(tableData);
            
        } catch(e) {
            ElMessage.error('获取数据失败，请刷新重试！')
        }
    }

    onMounted(() => {
        getArticleData(tableData.current)
    })
</script>

<template>
    <div class="common-layout">
        <el-container>
            <!-- <el-header class="bread">
                <el-breadcrumb :separator-icon="ArrowRight">
                    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
                    <el-breadcrumb-item>promotion management</el-breadcrumb-item>
                    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
                    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
                </el-breadcrumb>
            </el-header> -->
            <!-- <el-main>
                <el-table :data="tableData.rows" style="width: 100%">
                    <el-table-column prop="date" label="Date" width="180" />
                    <el-table-column prop="date" label="Date" width="180" />
                    <el-table-column prop="date" label="Date" width="180" />
                    <el-table-column prop="date" label="Date" width="180" />
                    <el-table-column prop="date" label="Date" width="180" />
                    
                </el-table>
            </el-main> -->
            <el-footer>
                <el-pagination background layout="prev, pager, next" :total="1000" />
            </el-footer>
        </el-container>
  </div>
</template>

<style scoped>

</style>
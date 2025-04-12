<script setup>

import { ref } from 'vue'
//文章列表数据模型
import { articleAllListService } from '@/api/article.js'
const articles = ref([
   
])
//获取文章列表数据
const articleList = async () => {
 
    let result = await articleAllListService();
    //渲染视图
    articles.value = result.data;
    console.log(result)
}
articleList();
</script>

<template>
      <el-table :data="articles" style="width: 100%">
            <el-table-column label="文章标题" prop="title"></el-table-column>
            <el-table-column label="分类" prop="content"></el-table-column>
            <el-table-column label="发表时间" prop="createTime"> </el-table-column>
            <el-table-column label="状态" prop="state"></el-table-column>
        
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>

</template>

<style lang="scss" scoped>
</style>
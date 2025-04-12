<script setup>

import { ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { Plus } from '@element-plus/icons-vue'
//添加表单数据模型
import { articleAddService,allCategoryListService } from '@/api/article.js'
const articleModel = ref({
    title: '',
    categoryId: '',
    coverImg: '',
    content: '',
    state: '已发布'
})
const categorys = ref([

])
const articleCategoryList = async () => {
    let result = await allCategoryListService();
    categorys.value=result.data
    console.log(result.data)

}
articleCategoryList();



//导入token
import { useTokenStore } from '@/stores/token.js';
const tokenStore = useTokenStore();

//上传成功的回调函数
const uploadSuccess = (result) => {
    articleModel.value.coverImg = result.data;
    // categorys.value=  result.data
}

//添加文章

import { ElMessage } from 'element-plus'

const addArticle = async () => {
    //调用接口
    let result = await articleAddService(articleModel.value);
    console.log(articleModel.value)
    ElMessage.success(result.msg ? result.msg : '添加成功');

}

</script>
<template>
    <el-form :model="articleModel" label-width="100px">
        <el-form-item label="文章标题">
            <el-input v-model="articleModel.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类">
            <el-select placeholder="请选择" v-model="articleModel.categoryId">
                <el-option v-for="item in categorys" :key="item.id" :label="item.categoryName" :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="文章封面">
            <el-upload class="avatar-uploader" :auto-upload="true" :show-file-list="false" action="/api/upload"
                name="file" :headers="{ 'Authorization': tokenStore.token }" :on-success="uploadSuccess">
                <img v-if="articleModel.coverImg" :src="articleModel.coverImg" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>
        </el-form-item>
        <el-form-item label="文章内容">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 9 }" placeholder="请输入内容"
                v-model="articleModel.content">
            </el-input>
        </el-form-item>
           <el-form-item > <el-button style="width: 50%;" type="primary" round @click="addArticle">发布</el-button></el-form-item>
    </el-form>
 
   
</template>
<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}

/* 抽屉样式 */
.avatar-uploader {
    :deep() {
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }

        .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            text-align: center;
        }
    }
}

.editor {
    width: 100%;

    :deep(.ql-editor) {
        min-height: 200px;
    }
}
</style>
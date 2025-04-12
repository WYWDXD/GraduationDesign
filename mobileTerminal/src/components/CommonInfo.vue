<!-- <script setup>
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { Plus } from '@element-plus/icons-vue'
import { ref } from 'vue';
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
//添加表单数据模型
const articleModel = ref({
location:'重庆',
content:'今天上班很开心',
signImg: '',
    
    

})
console.log(articleModel)
import { signAddService } from '@/api/article.js'

//导入token
import { useTokenStore } from '@/stores/token.js';
const tokenStore = useTokenStore();

//上传成功的回调函数
const uploadSuccess = (result) => {
    articleModel.value.signImg = result.data;
    console.log(result.data);
}

//添加文章
import { ElMessage } from 'element-plus'
const addSign = async (clickState) => {

  
    //调用接口
    let result = await signAddService(articleModel.value);
    ElMessage.success(result.msg ? result.msg : '添加成功');
    console.log(articleModel.value)

}
</script>

<template>
<el-form-item label="选择图片">
    <el-upload class="avatar-uploader" :auto-upload="true" :show-file-list="false" action="/api/upload"
                        name="file" :headers="{ 'Authorization': tokenStore.token }" :on-success="uploadSuccess">
                        <img v-if="articleModel.signImg" :src="articleModel.signImg" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
</el-form-item>
<button @click="addSign">上传</button>
</template>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style> -->
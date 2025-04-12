<template>
  <el-form :model="articleModel" label-width="100px">
    <el-form-item label="当前位置:">
      <p>{{ articleModel.location }}</p>
    </el-form-item>

 
  <el-form-item label="选择图片">
    <el-upload class="avatar-uploader" :auto-upload="true" :show-file-list="false" action="/api/upload" name="file"
      :headers="{ 'Authorization': tokenStore.token }" :on-success="uploadSuccess">
      <img v-if="articleModel.signImg" :src="articleModel.signImg" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon">
        <Plus />
      </el-icon>
    </el-upload>
  </el-form-item>
  <el-form-item label="签到备注">
    <el-input
  type="textarea"
  :autosize="{ minRows: 2, maxRows: 9}"
  placeholder="请输入内容"
  v-model="articleModel.content">
</el-input>
  </el-form-item>
  <el-form-item >
    <el-button style="width: 50%;" type="primary" round @click="addSign">发布</el-button>
  </el-form-item>
</el-form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { Plus } from '@element-plus/icons-vue'
import { signAddService } from '@/api/article.js'

//导入token
import { useTokenStore } from '@/stores/token.js';
import { ElMessage } from 'element-plus'

//添加表单数据模型
const articleModel = ref({
  location: '',
  content: '',
  signImg: '',



})

onMounted(async () => {
  try {
    const response = await axios.get('https://restapi.amap.com/v3/ip', {
      params: {
        key: '112f7278845a2b4a727d04cffeb63b0b',
      },
    });
    console.log(response.data);
    articleModel.value.location = response.data.city;
  } catch (error) {
    console.error('Error fe tching city:', error);
  }
});


console.log(articleModel)

const tokenStore = useTokenStore();

//上传成功的回调函数
const uploadSuccess = (result) => {
  articleModel.value.signImg = result.data;
  console.log(result.data);
}

const addSign = async () => {
  //调用接口
  let result = await signAddService(articleModel.value);
  ElMessage.success(result.msg ? result.msg : '添加成功');
  console.log(articleModel.value)
}
</script>

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
</style>

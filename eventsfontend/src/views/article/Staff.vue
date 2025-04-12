<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
const dialogVisible = ref(false)
const title = ref('')
const username = ref('')
const articles = ref([

])
//回显文章分类
import { staffService, userDeleteServicee, staffUpdateService } from '@/api/user.js'
//获取列表数据
const articleList = async () => {
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        username: username.value ? username.value : null
    }
    let result = await staffService(params);
    console.log(result)
    //渲染视图
    total.value = result.data.total;
    articles.value = result.data.items;

}

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(10)//每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size
    articleList()
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
    articleList()
}
//数据模型
const staffModel = ref({
    username: '',
    email: ''
})
//添加表单校验
const rules = {
    staffName: [
        { required: true, message: '请输入员工姓名', trigger: 'blur' },
    ],
    staffEmail: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    ]
}


//展示编辑弹窗
const showStaff = (row) => {
    dialogVisible.value = true;
    title.value = '编辑信息'
    //数据拷贝
    staffModel.value.staffName = row.username;
    staffModel.value.staffEmail = row.email;
    //扩展id属性,将来需要传递给后台,完成分类的修改
    staffModel.value.id = row.id
}


const updateStaff = async () => {
    //调用接口
    let result = await staffUpdateService(staffModel.value);
    ElMessage.success(result.msg ? result.msg : '修改成功')
    articleList();
    //隐藏弹窗
    dialogVisible.value = false;
}

articleList();
import '@vueup/vue-quill/dist/vue-quill.snow.css'
//删除员工
import { ElMessageBox } from 'element-plus'
const deleteStaff = (row) => {
    //提示用户  确认框

    ElMessageBox.confirm(
        '你确认要删除该分类信息吗?',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            //调用接口
            let result = await userDeleteServicee(row.id);
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
            //刷新列表
            articleList();
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '用户取消了删除',
            })
        })
}
</script>

<template>
    <el-card class="page-container">
        <!-- 列表 -->
        <el-table :data="articles" style="width: 100%">
            <el-table-column label="员工姓名" width="400" prop="username"></el-table-column>
            <el-table-column prop="userPic" label="头像" justify-content="center">
                <template #default="{ row, $index }">
                    <el-avatar shape="circle" :size="50" :src="row.userPic"></el-avatar>

                </template>
            </el-table-column>
            <el-table-column label="员工邮箱" prop="email"></el-table-column>
            <el-table-column label="入职时间" prop="createTime"> </el-table-column>

            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="showStaff(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteStaff(row)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <el-dialog v-model="dialogVisible" :title="title" width="30%">
            <el-form :model="staffModel" :rules="rules" label-width="100px" style="padding-right: 30px">
                <el-form-item label="员工姓名" prop="staffName">
                    <el-input v-model="staffModel.username" minlength="1" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="员工邮箱" prop="staffEmail">
                    <el-input v-model="staffModel.email" minlength="1" maxlength="60"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="updateStaff()"> 确认 </el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 分页条 -->
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5, 10, 15]"
            layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
            @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />

    </el-card>
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


.editor {
    width: 100%;

    :deep(.ql-editor) {
        min-height: 200px;
    }
}
</style>
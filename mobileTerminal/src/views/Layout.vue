<template>
    <el-container>
        <el-header>
            <common-header/>
        </el-header>
        <el-main ><router-view></router-view></el-main>
        <el-footer >
            <common-footer/>
        </el-footer>
    </el-container>
</template>

<style >
.el-container{
    height:100vh
}
.el-main { 
  height: 60%;

}

</style>
<script>
import CommonFooter  from '../components/CommonFooter.vue';
import CommonHeader  from '../components/CommonHeader.vue';
export default {

  components: {
        CommonFooter,
        CommonHeader
    },

};
</script>
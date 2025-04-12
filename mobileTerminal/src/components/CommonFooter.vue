<template>
  <el-menu mode="horizontal "  @select="handleSelect"  class="evenly-distributed-menu">
                <el-menu-item  index="1">
                    <span>签到</span>
                </el-menu-item> 
                <el-menu-item  index="2">

                    <span>发布</span>
                </el-menu-item>
                <el-menu-item  index="3">

                    <span>浏览</span>
                </el-menu-item>
            </el-menu>
            
</template>
<style lang="less" scoped>
// .el-menu-vertical-demo:not(.el-menu--collapse) {
//   //width: 200px;
//   min-height: 400px;
// }
.el-menu { 
  //position: fixed;
  border-right: none;
  height: 60%;

}
.evenly-distributed-menu {
  display: flex;
  justify-content: space-around; /* 使菜单项均匀分布 */
}

</style>
<script>
export default {
  data() {
    return {
  
    };
  },
  methods: {
    handleSelect(key) {
      // console.log(key);
      console.log(key);
      if (key==1){
        this.$router.push({path: 'sign'})
      }
      if (key==2){
        this.$router.push({path: 'release'})
      }
      if (key==3){
        this.$router.push({path: 'news'})
      }
    }
  }
}
</script>

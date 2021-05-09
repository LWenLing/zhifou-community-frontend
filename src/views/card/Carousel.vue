<template>
 <el-card class="box-card" shadow="never">
    <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="item in srcs" :key="item.src">
      <a :href="item.href"><img :src="item.src" alt=""></a>
    </el-carousel-item>
  </el-carousel>
 </el-card>
</template>


<script>

 export default {
    data() {
      return {
        srcs:[{src:"../cms-s.png",href:"https://www.fastadmin.net/store/cms.html"},
              {src:"https://cdn.fastadmin.net/uploads/store/ask-s.png",href:"https://www.fastadmin.net/store/ask.html"},
              {src:"https://cdn.fastadmin.net/uploads/store/vote-s.png",href:"https://www.fastadmin.net/store/vote.html"}]
      }
    }
  }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

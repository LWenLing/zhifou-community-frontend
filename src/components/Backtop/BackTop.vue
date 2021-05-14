<template>
  <el-backtop :bottom="60" :right="60">
    <div title="回到顶部"
        style="{
        height: 100%;
        width: 100%;
        background-color: rgba(203, 207, 221, 0.3);
        border-radius: 50%;
        text-align: center;
        line-height: 40px;
        color: rgba(62,98,223,1);
      }"
    >
      <i class="fa fa-arrow-up"></i>
    </div>
  </el-backtop>
</template>

<script>
export default {
  name: "BackTop"
}
</script>

<style scoped>

</style>
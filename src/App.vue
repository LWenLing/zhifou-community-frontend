<template>
  <div>
    <div class="mb-5">
      <Header></Header>
    </div>

    <!-- container类是文章布局居中对齐，是bulma的一个类 -->

    <div class="container context">
     
      <transition
        name="el-fade-in-linear"
        mode="out-in"
        appear
      >
        
      </transition>
      <router-view :key="this.$route.fullPath"></router-view>
    </div>

    <div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default {
  name: "App",
  components: { Header, Footer },
};
</script>

<style scoped>
.container {
  min-height: 500px;
}
</style>

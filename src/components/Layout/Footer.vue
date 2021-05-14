<template>
  <footer class="footer has-text-grey-light has-background-grey-darker">
    <div class="container">
      <div class="">
        <span>上知否，有问题就会有答案</span>

        <span style="float: right">
          <router-link :to="{path:'/admin/login'}">
            管理员登录
          </router-link>
          |
        </span>
      </div>

      <div>
        <span>{{ title }} ALL RIGHTS RESERVED</span>
        <div style="float: right">
          <template>
            <b-taglist attached>
              <b-tag type="is-dark" size="is-normal">Design</b-tag>
              <b-tag type="is-info" size="is-normal">{{ author }}</b-tag>
            </b-taglist>
          </template>
        </div>
      </div>
    </div>
    <back-top></back-top>
  </footer>
</template>

<script>
import BackTop from "@/components/Backtop/BackTop";

export default {
  name: "Footer",
  components: {
    BackTop
  },
  data() {
    return {
      title: "© " + new Date().getFullYear() + ' 知否',
      author: '知否',
    };
  },
};
</script>

<style scoped>

footer {
  margin-top: 120px;
  height: 150px;
  background: rgba(62,98,223,0.7) !important;
  color: white !important;

}
footer a{
  color: white !important;
}

</style>
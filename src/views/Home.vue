<template>
  <div>
    <!-- 站内公告 -->

    <!-- box是bulma的一个类，表示一个以白色为背景的长框 -->
    <div class="box">🔔 站内公告{{ billboard.content }}</div>

 
    <div class="columns">
      <!-- is-three-quarters占3/4页面 -->
      <div class="column is-three-quarters">
        <TopicList></TopicList>
      </div>
      <div class="column">
        <CardBar></CardBar>
      </div>
    </div>
  </div>
</template>

<script>
import { getBillboard } from "@/api/billboard";
import CardBar from "@/views/card/CardBar"
import PostList from '@/views/post/Index'

export default {
  name: "Home",
  components: {CardBar, TopicList: PostList},
  data() {
    return {
      billboard: {
        content: "",
      },
    };
  },
  created() {
    this.fetchBillboard();
  },
  methods: {
    async fetchBillboard() {
      // 向服务器端发送请求
      getBillboard().then((value) => {
        const { data } = value;
        this.billboard = data;
      });
    },
  },
};
</script>

<style scoped>
.is-three-quarters{
  width: 67%;
}
</style>

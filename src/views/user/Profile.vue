<template>
  <div class="member">
    <div class="columns">
      <div class="column is-one-quarter">
        <el-card shadow="never">
          <div slot="header" class="has-text-centered">
            <el-avatar
              :size="64"
              :src="`https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png`"
            />
            <p class="mt-3">{{ topicUser.alias || topicUser.username }}</p>
          </div>
          <div>
            <p class="content">
              积分：<code>{{ topicUser.score }}</code>
            </p>
            <p class="content">
              入驻：{{
                dayjs(topicUser.createTime).format("YYYY/MM/DD HH:MM:ss")
              }}
            </p>
            <p class="content">简介：{{ topicUser.bio }}</p>
          </div>
        </el-card>
      </div>

      <div class="column">
        <!--用户发布的话题-->
        <el-card class="box-card content" shadow="never">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="我的文章" name="topic">
              <div v-if="list.length === 0">暂无文章</div>

              <div v-else class="topicUser-info">
                <article
                  v-for="(item, index) in list"
                  :key="index"
                  class="media"
                >
                  <div class="media-content" v-if="item.isques === true">
                    <div class="content ellipsis is-ellipsis-1">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="item.title"
                        placement="top"
                      >
                        <router-link
                          :to="{ name: 'post-detail', params: { id: item.id } }"
                        >
                          {{ item.title }}
                        </router-link>
                      </el-tooltip>
                    </div>
                    <nav class="level has-text-grey is-size-7">
                      <div class="level-left">
                        <span class="mr-1">
                          发布于:{{
                            dayjs(item.createTime).format("YYYY/MM/DD HH:mm:ss")
                          }}
                        </span>
                      </div>
                    </nav>
                  </div>
                  <div v-if="token" class="media-right">
                    <div
                      v-if="topicUser.username === user.username"
                      class="level"
                    >
                      <div class="level-item mr-1">
                        <router-link
                          :to="{ name: 'topic-edit', params: { id: item.id } }"
                        >
                          <span class="tag is-warning">编辑</span>
                        </router-link>
                      </div>
                      <div class="level-item">
                        <a @click="handleDelete(item.id)">
                          <span class="tag is-danger">删除</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
                <pagination
                  v-show="page.total > 0"
                  class="mt-5"
                  :total="page.total"
                  :page.sync="page.current"
                  :limit.sync="page.size"
                  @pagination="fetchUserById"
                />
              </div>
            </el-tab-pane>
            <el-tab-pane label="我的提问" name="question">
              <div v-if="list.length === 0">暂无我提出的问题</div>

              <div v-else class="topicUser-info">
                <article
                  v-for="(item, index) in list"
                  :key="index"
                  class="media"
                >
                  <div class="media-content" v-if="item.isques === true">
                    <div class="content ellipsis is-ellipsis-1">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="item.title"
                        placement="top"
                      >
                        <router-link
                          :to="{ name: 'post-detail', params: { id: item.id } }"
                        >
                          {{ item.title }}
                        </router-link>
                      </el-tooltip>
                    </div>
                    <nav class="level has-text-grey is-size-7">
                      <div class="level-left">
                        <span class="mr-1">
                          发布于:{{
                            dayjs(item.createTime).format("YYYY/MM/DD HH:mm:ss")
                          }}
                        </span>
                      </div>
                    </nav>
                  </div>
                  <div v-if="token" class="media-right">
                    <div
                      v-if="topicUser.username === user.username"
                      class="level"
                    >
                      <div class="level-item mr-1">
                        <router-link
                          :to="{ name: 'topic-edit', params: { id: item.id } }"
                        >
                          <span class="tag is-warning">编辑</span>
                        </router-link>
                      </div>
                      <div class="level-item">
                        <a @click="handleDelete(item.id)">
                          <span class="tag is-danger">删除</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
                <pagination
                  v-show="page.total > 0"
                  class="mt-5"
                  :total="page.total"
                  :page.sync="page.current"
                  :limit.sync="page.size"
                  @pagination="fetchUserById"
                />
              </div>

              <!--分页-->
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfoByName } from "@/api/user";
import pagination from "@/components/Pagination/index";
import { mapGetters } from "vuex";
import { deleteTopic } from "@/api/post";
import { getUserList } from "@/api/post";
export default {
  name: "Profile",
  components: { pagination },
  data() {
    return {
      topicUser: {},
      list:[],
      activeName: "topic",
      page: {
        current: 1,
        size: 5,
        total: 0,
      },
      isques: false,
    };
  },
  computed: {
    ...mapGetters(["token", "user"]),
  },
  created() {
    this.fetchUserById();
    this.init(this.tab);
  },
  methods: {
    fetchUserById() {
      getInfoByName(
        this.$route.params.username,
        this.page.current,
        this.page.size
      ).then((res) => {
        const { data } = res;
        this.topicUser = data.user;
        // this.page.current = data.topics.current;
        // this.page.size = data.topics.size;
        // this.page.total = data.topics.total;
        //this.topics = data.topics.records;
        console.log(data.topics.records);
      });
    },
    init() {
      getUserList(
        this.page.current,
        this.page.size,
        this.$route.params.username,
        this.isques
      ).then((response) => {
        const { data } = response;
        this.page.current = data.current;
        this.page.total = data.total;
        this.page.size = data.size;
        this.list = data.records;
        console.log(data.records);
      });
    },
    handleClick(tab) {
      this.page.current = 1;
      if (tab.name == "question") {
        this.isques = true;
      } else if (tab.name == "topic") {
        this.isques = false;
      }
      this.init();
    },
    handleDelete(id) {
      deleteTopic(id).then((value) => {
        const { code, message } = value;
        alert(message);

        if (code === 200) {
          setTimeout(() => {
            this.$router.push({ path: "/" });
          }, 500);
        }
      });
    },
  },
};
</script>

<style scoped>
</style>

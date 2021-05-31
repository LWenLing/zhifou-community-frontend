<template>
  <div class="columns">
    <!--文章详情-->
    <div class="column is-three-quarters">
      <!--主题-->
      <el-card
        class="box-card"
        shadow="never"
      >
        <div
          slot="header"
          class="has-text-centered"
        >
          <p class="is-size-5 has-text-weight-bold">{{ topic.title }}</p>
          <div class="has-text-grey is-size-7 mt-3">
            <span>{{ dayjs(topic.createTime).format('YYYY/MM/DD HH:mm:ss') }}</span>
            <el-divider direction="vertical" />
            <span>发布者：{{ topicUser.alias }}</span>
            <el-divider direction="vertical" />
            <span>查看：{{ topic.view }}</span>
          </div>
        </div>

        <!--Markdown-->
    
           <div class="question-richtext wysiwyg" itemprop="text" style="max-height: 9999px;">
                <p>{{topic.content}}</p>                   
                <p class="read-more" style="display: none;">
                     <a href="javascript:;" title="点击查看全文">
                        <span class="text-primary">
                            <i class="fa fa-angle-down"></i> 查看更多
                        </span>
                    </a>
                 </p>
            </div>
            <div class="comment-footer">
                <!-- 问题操作 -->
                <div class="comment-toolbar">
                    <b-button class="button is-info">关注问题</b-button>
                    <b-button class="button is-info is-light ml-2" :isShow="isShow" @click="changeShow()"><i class="el-icon-edit mr-2"></i>{{isShow?"收起面板":"写回答"}}</b-button>
                 
                </div>
                <!-- 问题操作 -->
           </div>
      
  
      </el-card>
       <AnswerList :slug="topic.id" :showPanel="isShow"/>
    </div>
      

    <div class="column">
       <!--作者-->
      <Author :user="topicUser"/>           
    </div>       
        
    
</div>

       
    
  
</template>

<script>
import { deleteTopic, getTopic } from '@/api/post'
import { mapGetters } from 'vuex'
import Author from '@/views/answer/Author'
import AnswerList from '@/views/answer/AnswerList'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

export default {
  name: 'TopicDetail',
  components: { Author, AnswerList},
  computed: {
    ...mapGetters([
      'token','user'
    ])
  },
  data() {
    return {
      flag: false,
      isShow:false,
      topic: {
        content: '',
        id: this.$route.params.id
      },
      tags: [],
      topicUser: {}
    }
  },
  mounted() {
    this.fetchTopic()
  },
  methods: {
    changeShow(){
      this.isShow = !this.isShow;
    },
    renderMarkdown(md) {
      Vditor.preview(document.getElementById('preview'), md, {
        hljs: { style: 'github' }
      })
    },
    // 初始化
    async fetchTopic() {
      getTopic(this.$route.params.id).then(response => {
        const { data } = response
        console.log("初始化",data)
        document.title = data.topic.title

        this.topic = data.topic
        this.tags = data.tags
        this.topicUser = data.user
        // this.comments = data.comments
        this.renderMarkdown(this.topic.content)
        this.flag = true
      })
    },
    handleDelete(id) {
      deleteTopic(id).then(value => {
        const { code, message } = value
        alert(message)

        if (code === 200) {
          setTimeout(() => {
            this.$router.push({ path: '/' })
          }, 500)
        }
      })
    }
  }
}
</script>

<style>
#preview {
  min-height: 300px;
}
.question-richtext {
    max-height: 480px;
    position: relative;
    overflow: hidden;
}
.wysiwyg {
    overflow-wrap: break-word;
}
.question-richtext {
    word-break: break-all;
    line-height: 1.6;
    font-size: 15px;
    color: #1a1a1a;
    margin: 0 0 15px 0;
}
.comment-footer {
    font-size: 13px;
}
.btn-primary {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
}
.btn {
    display: inline-block;
    margin-bottom: 0;
    font-weight: normal;
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    padding: 6px 12px;
    font-size: 12px;
    line-height: 1.42857143;
    border-radius: 3px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.btn-outline-primary {
    color: #007bff;
    background-color: transparent;
    background-image: none;
    border-color: #007bff;
}
</style>

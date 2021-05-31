<template>
<div>
  <section class="box comments" v-show="showPanel">
      <article class="media">
    <div class="media-content" >
      <form @submit.prevent="onSubmit">
        <b-field  type="is-info">
          <b-input
            v-model.lazy="commentText"
            type="textarea"
           
            placeholder="写回答..."
            :disabled="isLoading"
          />
        </b-field>
        <nav>
         
            <b-button
              type="is-primary"
              native-type="submit"
              class="button is-info pull-right"
              :disabled="isLoading"
            >
              发布
            </b-button>
          
        </nav>
      </form>
    </div>
  </article>
  </section>
  <section class="box comments">
     
    <h3 class="title is-6">{{comments.length==0?"还没有人回答过这个问题":comments.length+"个回答"}}</h3>
    
    <div class="comment"  v-for="comment in comments"
      :key="`comment-${comment.id}`"
      :comment="comment">
      <hr />
        <div class="comment-header">
            <div class="comment-header">
                <a href="" class="comment-avatar"  data-type="user">
                    <div>
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    </div>
                </a>
                <div class="comment-authorinfo">
                    <div>
                        <a href="" class="mr-5" data-toggle="popover" data-title="chepi3000" data-placement="right" data-type="user" data-id="36683"><b>{{comment.username}}</b></a>

                    </div>
                    <div class="comment-title text-muted">{{comment.bio}}</div>
                </div>
            </div>
        </div>
        <div class="RichContent">
            <div class="RichContent-inner">
                <span class="ztext">
                    <p>{{ comment.content }}</p>
                </span>
            </div>
        </div>
        <div class="ContentItem-time">
            <span data-tooltip="创建时间">{{ comment.createTime | date }}</span>
        </div>
        <div class="ContentItem-action mt-3">
            <span>
                <button class="button is-info is-light"><i class="el-icon-caret-top mr-2"></i>赞同 3</button>
                <button class="button is-info is-light ml-2"><i class="el-icon-caret-bottom"></i></button>
            </span>
        </div>
    </div>
   
    
        
  
    
  </section>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { fetchCommentsByTopicId,pushComment } from '@/api/comment'


export default {
  name:"",
 
  data() {
    return {
      comments: [],
      commentText: '',
      isLoading: false
    }
  },
  props: {
    slug: {
      type: String,
      default: null
    },
    showPanel:{
        type: Boolean,
        default: false
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  async mounted() {
    await this.fetchComments(this.slug)
  },
  methods: {
    // 初始化
    async fetchComments(topic_id) {
     
      fetchCommentsByTopicId(topic_id).then(response => {
        const { data } = response
        this.comments = data
       
      })
    },
    async onSubmit() {
      this.isLoading = true
      try {
        let postData = {}
        
        postData['content'] = this.commentText
        postData['topic_id'] = this.slug
        await pushComment(postData)
        this.$emit('loadComments', this.slug)
        this.$message.success('发表成功')
        location.reload()
      } catch (e) {
        this.$buefy.toast.open({
          message: `Cannot comment this story. ${e}`,
          type: 'is-danger'
        })
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.comment-header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.comment-authorinfo {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin-left: 12px;
    overflow: hidden;
}
.pull-right {
    float: right !important;
}
.comment-title {
    font-size: 12px;
    color: #999;
}
.text-muted {
    color: #777777;
}

.comment-time{
    float: right;
    font-size: 14px;
    color: #8590a6;
}
.RichContent {
    line-height: 1.67;
}
.RichContent-inner {
    margin-top: 9px;
    margin-bottom: -4px;
    overflow: hidden;
}
.ztext {
    word-break: break-word;
    line-height: 1.6;
}
.ContentItem-time{
    margin-top: 10px;
    font-size: 14px;
    color: #8590a6;
}

.textarea,.input:focus{
   border-color:#167df0 ;
    box-shadow: 0 0 0 0.125em rgba(22,125,240, 0.25);
}
</style>

<template>
  <div id="tag" class="columns">
    <el-row style="width:800px">
      <div
      v-for="tag in tags"
      :key="`tag-${tag.id}`" class="tag-span"
    >
     <router-link :to="{ name: 'searchtag', params: { name: tag.name }} ">
       <span >{{tag.name}}<el-button circle> {{tag.topicCount}}</el-button> </span>
      
     </router-link>
      </div>
      </el-row>
  </div>

</template>

<script>
import { getAllTags } from '@/api/tag'

export default {
  name: 'Tag',
  data() {
    return {
      tags: [],
      //colors:["#f6cc45","#489dc2","#4972BE",'#b256e5']
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    fetchList: function() {
      getAllTags().then(response => {
        console.log(response.data)
        this.tags = response.data;
        console.log(response.data)
      })
    }
  }
}
</script>

<style scoped>
#tag {
  min-height: 500px;
  padding-top:50px;
 
  display: flex;
  justify-content: center;
}

.tag-span{
  margin-top:8px;
  padding:0 15px 4px 15px;
  font-family:cursive;
  margin-right: 10px;
 
  float: left;
  border-radius:30px;
  font-size:16px;
  background: #e8e8e8;
}

.el-button.is-circle {
    border-radius: 50%;
    padding: 3px;
    width: 20px;
    height: 20px;
    font-size: 12px;
    margin-left: 4px;
}
.tag-span:nth-child(2n+1){
 
  background:rgba(184,181,255,0.6);;
  
 
}
.tag-span:nth-child(3n+1){
  background:  rgba(120,104,230,0.6);

}
</style>

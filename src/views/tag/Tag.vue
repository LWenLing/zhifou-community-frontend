<template>
  <div id="tag" class="columns">
    <el-row style="width:1080px">
      <div
      v-for="tag in tags"
      :key="`tag-${tag.id}`"
    >
     <router-link :to="{ name: 'searchtag', params: { name: tag.name }}">
       <el-col :span="6"><el-card >{{tag.name}}</el-card></el-col>
     
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
      colors:["#f6cc45","#489dc2","#4972BE",'#b256e5']
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
      })
    }
  }
}
</script>

<style scoped>
#tag {
  min-height: 500px;
}
.el-card{
  font-family:cursive;
  margin-right:10px;
  height:160px;
  color:white;
  text-align:center;
  font-size:16px;
  background: linear-gradient(to right,#489dc2,#64d5d6);
}
</style>

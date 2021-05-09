import request from '@/utils/request'

// 获取评论列表
export function fetchCommentsByTopicId(topic_Id) {
  return request({
    url: '/comment/get_comments',
    method: 'get',
    params: {
      topicid: topic_Id
    }
  })
}

// 添加评论
export function pushComment(data) {
  return request({
    url: '/comment/add_comment',
    method: 'post',
    data: data
  })
}


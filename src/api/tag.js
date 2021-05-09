import request from '@/utils/request'

export function getTopicsByTag(paramMap) {
  return request({
    url: '/tag/' + paramMap.name,
    method: 'get',
    params: {
      page: paramMap.page,
      size: paramMap.size
    }
  })
}
export function getAllTags() {
  return request({
    url: '/tag/all',
    method: 'get',
   
  })
}




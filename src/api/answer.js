import request from '@/utils/request'


export function getAllAnswers() {
  return request({
    url: '/answer/all',
    method: 'get',
   
  })
}

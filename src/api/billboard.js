import request from '@/utils/request'


// 公告板显示
export function getBillboard() {
  return request({
    url: '/billboard/show',
    method: 'get'
  })
}
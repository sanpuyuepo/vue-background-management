import request from '@/utils/request'

export const reqTradeMarkList = (page, limit) => {
  return request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get',
  })
}

export const reqAddOrUpdateTradeMark = data => {
  // 新增
  if(!data.id) {
    return request({
      url: `/admin/product/baseTrademark/save`,
      method: 'post',
      data
    })
  }
  // 修改
  return request({
    url: `/admin/product/baseTrademark/update`,
    method: 'put',
    data
  })
}

export const reqDeleteTradeMark = id => {
  return request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'delete'
  })
}

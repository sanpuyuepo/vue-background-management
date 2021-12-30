import request from '@/utils/request'

// 列表数据
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get',
  })
}

// 添加属性
export const reqAddAttrInfo = data => {
  return request({
    url: `/admin/product/saveAttrInfo`,
    method: 'post',
    data
  })
}

// 删除属性

export const reqDeleteAttr = attrId => {
  return request({
    url: `/admin/product/deleteAttr/${attrId}`,
    method: 'delete',
  })
}

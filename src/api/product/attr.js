import request from '@/utils/request'

// 一级分类
export const reqCategory1List = () => {
  return request({
    url: `/admin/product/getCategory1`,
    method: 'get',
  })
}

// 二级分类
export const reqCategory2List = category1Id => {
  return request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: 'get',
  })
}

// 三级分类
export const reqCategory3List = category2Id => {
  return request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: 'get',
  })
}

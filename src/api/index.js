// 统一暴露
import * as trademark from './product/tradeMark'
import * as attr from './product/attr'
import * as spu from './product/spu'
import * as sku from './product/sku'

import request from '@/utils/request'

import * as user from './acl/user';
import role from './acl/role'
import permission from './acl/permission' 

// 一级分类
const reqCategory1List = () => {
  return request({
    url: `/admin/product/getCategory1`,
    method: 'get',
  })
}

// 二级分类
const reqCategory2List = category1Id => {
  return request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: 'get',
  })
}

// 三级分类
const reqCategory3List = category2Id => {
  return request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: 'get',
  })
}

export default {
  reqCategory1List,
  reqCategory2List,
  reqCategory3List,
  trademark,
  attr,
  spu,
  sku, 
  user, 
  role, 
  permission,
}

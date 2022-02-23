import request from '@/utils/request'

/* 
权限管理相关api请求函数
*/
const api_name = '/admin/acl/role'


export default {
  /* 
  获取角色分页列表
  */
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },

  /* 
  获取某个角色
  */
  getById(id) {
    return request({
      url: `${api_name}/get/${id}`,
      method: 'get'
    })
  },

  save(role) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: role
    })
  },

  update(role) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: role
    })
  },

  remove(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },

  batchRemove(ids) {
    return request({
      url: `${api_name}/batchRemove`,
      method: 'delete',
      data: ids,
    })
  }


}
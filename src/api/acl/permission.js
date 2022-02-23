import request from '@/utils/request'

/* 
权限管理相关api请求函数
*/
const api_name = '/admin/acl/permission'


export default {
  /* 
  获取权限列表
  */
  getPermissionList() {
    return request({
      url: `${api_name}`,
      method: 'get'
    })
  },

  /* 
  删除一个权限项
  */
  removePermission(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },

  addPermission(permission) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: permission
    })
  },

  updatePermission(permission) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: permission
    })
  },

  /* 
  给角色分配权限
  */
  doAssignPermission(roleId, permission) {
    return request({
      url: `${api_name}/doAssign`,
      method: 'post',
      data: {roleId, permission}
    })
  },

  /* 
  根据角色获取菜单
  */
  toAssignPermission(roleId) {
    return request({
      url: `${api_name}/toAssign/${roleId}`,
      method: 'get',
    })
  }


}
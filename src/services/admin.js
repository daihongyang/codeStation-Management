// 管理员相关api
import { request } from '@umijs/max';
//获取管理员列表
export function getAdmins() {
  return request('/api/admin', {
    method: 'GET',
  });
}
/**
 * 根据id删除管理员
 * @param {*} id id
 * @returns
 */
export function deleteAdiminById(id) {
  return request(`/api/admin/${id}`, {
    method: 'DELETE',
    id,
  });
}
/**
 * 更新管理员信息
 * @param {*} id 管理员id
 * @param {object} data 要更新的数据
 * @returns
 */
export function updateAdminInfo(id, data) {
  return request(`/api/admin/${id}`, {
    method: 'PATCH',
    id,
    data,
  });
}
/**
 * 检查管理员loginId是否重复
 * @param {*} loginId loginId
 * @returns
 */
export function checkAdminIsExisted(loginId) {
  return request(`/api/admin/adminIsExist/${loginId}`, {
    method: 'GET',
  });
}

/**
 * 添加新的管理员
 * @param {*} data 管理员信息
 * @returns
 */
export function addAdmin(data) {
  return request(`/api/admin`, {
    method: 'POST',
    data,
  });
}
/**
 * 通过id获取管理员信息
 * @param {*} id 
 * @returns 
 */
export function getAdminById(id) {
  return request(`/api/admin/${id}`, {
    method: 'GET',
  });
}

/**
 * 获取登录的验证码
 * @param {*} data 
 * @returns 
 */
export function getCaptcha() {
  return request(`/res/captcha`, {
    method: 'GET'
  })
}

/**
 * 管理员登录
 * @param {*} data 
 * @returns 
 */
export function loginAdmin(data) {
  return request(`/api/admin/login`, {
    method: 'POST',
    data
  })
}


export function restoreLogin(){
  return request(`/api/admin/whoami`,{
    method:'GET',
  })
}

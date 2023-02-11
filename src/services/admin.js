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

export function getAdminById(id) {
  return request(`/api/admin/${id}`, {
    method: 'GET',
  });
}

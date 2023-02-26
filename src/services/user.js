import { request } from '@umijs/max';
/**
 * 分页获取用户信息
 * @param {*} params current当前页码 pageSize显示几条 xxx也可传入其他数据进行查询
 * @returns
 */
export function getUserList(params) {
  return request('/api/user/', {
    method: 'GET',
    params: { ...params },
  });
}

/**
 * 更新用户信息
 * @param {*} id 用户id
 * @param {object} data 要更新的数据
 * @returns
 */
export function updateUserInfo(id, data) {
  return request(`/api/user/${id}`, {
    method: 'PATCH',
    id,
    data,
  });
}
/**
 * 根据id删除用户
 * @param {*} id 用户id
 * @returns
 */
export function deleteUserById(id) {
  return request(`/api/user/${id}`, {
    method: 'DELETE',
  });
}
/**
 * 添加用户
 * @param {*} data 用户信息 必须包含loginId
 * @returns
 */
export function addUser(data) {
  data.type = "background"
  return request(`/api/user/`, {
    method: 'POST',
    data,
  });
}

/**
 * 根据id查找用户信息
 * @param {*} id 
 * @returns 
 */
export function getUserById(id) {
  return request(`/api/user/${id}`, {
    method: "GET"
  })
}



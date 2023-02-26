import { request } from '@umijs/max';
/**
 * 添加类型
 * @param {*} typeName 类型名称
 * @returns 
 */
export function addType(typeName) {
    return request(`/api/type`, {
        method: 'POST',
        data: typeName
    })
}
/**
 * 删除指定类型
 * @param {*} id 
 * @returns 
 */
export function deleteTypeById(id) {
    return request(`/api/type/${id}`, {
        method: 'DELETE',
        id
    })
}
/**
 * 更改type
 * @param {*} id 类型id
 * @param {*} typeName 要更改的类型名称
 * @returns 
 */
export function updateTypeById(id, typeName) {
    return request(`/api/type/${id}`, {
        method: 'PATCH',
        data: typeName
    })
}

/**
 * 获取所有的类型
 * @returns 
 */
export function getTypes() {
    return request('/api/type', {
        method: 'GET'
    })
}

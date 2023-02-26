import { request } from '@umijs/max'
/**
 * 分页查找面试题
 * @param {*} data 
 * @returns 
 */
export function getInterviewInfoByPage(data) {
    return request('/api/interview/', {
        method: 'GET',
        params: { ...data }
    })
}

/**
 * 删除面试题
 * @param {*} id 
 * @returns 
 */
export function deleteInterviewById(id) {
    return request(`/api/interview/${id}`, {
        method: 'DELETE'
    })
}

export function addInterview(data) {
    return request(`/api/interview`, {
        method: 'POST',
        data
    })
}


/**
 * 根据 id 编辑器
 */
export function editInterview(interviewId, newInterviewInfo) {
    return request(`/api/interview/${interviewId}`, {
        method: 'PATCH',
        data: newInterviewInfo,
    });
}


/**
* 根据 id 获取面试题
*/
export function getInterviewById(interviewId) {
    return request(`/api/interview/${interviewId}`, {
        method: 'GET',
    });
}
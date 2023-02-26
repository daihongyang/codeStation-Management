import { request } from '@umijs/max'
/**
 * 分页获取问答信息
 * @param {*} params 分页信息
 * @returns 
 */
export function getIssuesByPage(params) {
    return request('/api/issue/', {
        method: 'GET',
        params: { ...params }
    })
}

/**
 * 更新问答的信息
 * @param {*} issueId 问答的id
 * @param {*} issueInfo 要更新的信息
 * @returns 
 */
export function editIssueInfo(issueId,issueInfo){
    return request(`/api/issue/${issueId}`, {
        method: 'PATCH',
        data: issueInfo,
      });
}

/**
 * 删除指定问答
 * @param {*} id 问答的id
 * @returns 
 */
export function deleteIssueById(id){
    return request(`/api/issue/${id}`,{
        method:'DELETE'
    })
}
/**
 * 根据id获取问答信息
 * @param {*} id 问答id
 * @returns 
 */
export function getIssueInfoById(id){
    return request(`/api/issue/${id}`,{
        method:'GET'
    })
}
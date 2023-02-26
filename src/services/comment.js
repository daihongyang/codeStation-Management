import { request } from '@umijs/max'
/**
 * 根据板块获取评论 
 * @param {*} commentType 1代表问答评论，2代表书籍评论
 * @param {*} data 
 */
export function getComments(commentType, data) {
    return request(`/api/comment/${commentType}`, {
        method: 'GET',
        params: {...data}
    })
}

//删除指定评论
export function deleteCommentById(id) {
    return request(`/api/comment/${id}`, {
        method: 'DELETE',
    })
}
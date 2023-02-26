import {request} from '@umijs/max'

export function getBookByPage(params){
    return request(`/api/book`,{
        method:'GET',
        params:{
            ...params
        }
    })
}


export function deleteBookById(id){
    return request(`/api/book/${id}`,{
        method:'DELETE'
    })
}

/**
 * 根据 id 获取书籍详情
 */
export function getBookById(bookId) {
    return request(`/api/book/${bookId}`, {
      method: 'GET',
    });
  }

/**
 * 更新书籍信息
 * @param {*} id 书籍的id 
 * @param {*} data 要更改的书籍信息
 * @returns 
 */
export function updateBookInfo(id,data){
    return request(`/api/book/${id}`,{
        method:'PATCH',
        data
    })
}

export function addBook(data){
    return request(`/api/book`,{
        method:'POST',
        data:data
    })
}
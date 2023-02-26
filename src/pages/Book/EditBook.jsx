import React, { useEffect, useState } from 'react'
import { PageContainer } from '@ant-design/pro-components'
import { useParams,useNavigate } from '@umijs/max'
import BookForm from './components/BookForm'
import { getBookById, updateBookInfo } from '../../services/book'
import { message } from 'antd'
//编辑书籍组件
export default function EditBook() {
  const navigate = useNavigate()
  //获取书籍id
  const params = useParams()
  const bookId = params.id
  const [bookInfo, setBookInfo] = useState(null)
  useEffect(() => {
    async function fetchData() {
      const { data } = await getBookById(bookId)
      setBookInfo(data)
    }
    if (bookId) {
      fetchData()
    }
  }, [])
  //提交函数
  function handleSubmit(bookIntro) {
    //调用book更新api
    updateBookInfo(bookId, {
      bookTitle: bookInfo.bookTitle,
      bookIntro,
      downloadLink: bookInfo.downloadLink,
      requirePoints: bookInfo.requirePoints,
      bookPic: bookInfo.bookPic,
      typeId: bookInfo.typeId
    })
    navigate('/book/bookList')
    message.success('书籍信息修改成功')

  }

  return (
    <div>
      <PageContainer>
        <div className='container' style={{ width: '500px' }}></div>
        <BookForm
          type='edit'
          bookInfo={bookInfo}
          setBookInfo={setBookInfo}
          submitHandle={handleSubmit}
        ></BookForm>
      </PageContainer>
    </div>
  )
}

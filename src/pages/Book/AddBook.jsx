import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import BookForm from './components/BookForm';
import { addBook } from '../../services/book';
import { message } from 'antd';
export default function AddBook() {
  const [bookInfo, setBookInfo] = useState({
    bookPic: "",
    bookTitle: "",
    downloadLink: "",
    requirePoints: 0,
    typeId: "",
    bookIntro: ''
  })
  //添加书籍提交函数
  function handleSubmit(content) {
    addBook({
      bookPic: bookInfo.bookPic,
      bookTitle: bookInfo.bookTitle,
      downloadLink: bookInfo.downloadLink,
      requirePoints: bookInfo.requirePoints,
      typeId: bookInfo.typeId,
      bookIntro: content
    })
    message.success('书籍添加成功')
  }
  return (
    <PageContainer>
      <BookForm
        type="add"
        bookInfo={bookInfo}
        setBookInfo={setBookInfo}
        submitHandle={handleSubmit}
      ></BookForm>
    </PageContainer>
  )
}

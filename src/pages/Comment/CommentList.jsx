import { PageContainer } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { Tabs } from 'antd'
import CommentTable from './components/CommentTable'
export default function CommentList() {
  //要查询的评论类型状态
  const [commentType, setCommentType] = useState('1')
  //tabs变化函数
  function changeTabs(key) {
    setCommentType(key)
  }
  return (
    <PageContainer>
      <Tabs
        defaultActiveKey="1"
        onChange={changeTabs}
        size='large'
        activeKey={commentType}
      >
        <Tabs.TabPane tab="问答评论" key="1">
          <CommentTable type={commentType}></CommentTable>
        </Tabs.TabPane>
        <Tabs.TabPane tab="书籍评论" key="2">
          <CommentTable type={commentType}></CommentTable>
        </Tabs.TabPane>
      </Tabs>

    </PageContainer>
  )
}


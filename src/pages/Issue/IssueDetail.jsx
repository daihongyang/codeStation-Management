import { PageContainer } from '@ant-design/pro-components';
import React, { useState, useEffect } from 'react';
import { Card, Tag, } from 'antd'
import { useParams, useSelector, useDispatch } from '@umijs/max'
import { getIssueInfoById } from '../../services/issue'
import { getUserById } from '../../services/user';
import { formatDate } from '../../utils/format'
import { getTypes } from '../../services/type';
export default function IssueDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [issueInfo, setIssueInfo] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const { typeList } = useSelector(state => {
    return state.type
  })
  if (!typeList.length) {
    dispatch({
      type: 'type/_initTypeList'
    })
  }
  let typeName
  if (issueInfo?.typeId) {
    let target = typeList.filter(item => {
      return item._id === issueInfo?.typeId
    })
    console.log(target[0].typeName)
  }

  useEffect(() => {
    async function fetchData() {
      const { data } = await getIssueInfoById(id)
      // console.log(data)
      setIssueInfo(data)
    }
    fetchData()
  }, [])
  useEffect(() => {
    async function fetchData() {
      if (issueInfo?.userId) {
        const { data } = await getUserById(issueInfo?.userId)
        setUserInfo(data)
      }


    }
    fetchData()

  }, [issueInfo])

  return <PageContainer>
    <div
      className="container"
      style={{
        width: '100%',
        margin: 'auto',
      }}
    >
      <Card
        title={issueInfo?.issueTitle}
        bordered={false}
        style={{
          marginTop: 20,
        }}
        headStyle={{
          fontSize:'28px'
        }}
        extra={
          <Tag color="purple" key={issueInfo?.typeId}>
            {/* {typeName} */}
          </Tag>
        }
      >
        <h2>提问用户</h2>
        <p>
          <Tag color="volcano" key={issueInfo?.userId}>
            {userInfo?.nickname}
          </Tag>
        </p>
        <h2>问题描述</h2>
        <>
          <div style={{ backgroundColor: '#ccc', padding: '10px', borderRadius: '5px', fontSize: '16px', fontWeight: '700' }}
            dangerouslySetInnerHTML={{ __html: issueInfo?.issueContent }}
          ></div>
        </>
        <h2>提问时间</h2>
        <p><Tag color="blue" key={issueInfo?.issueDate}>
          {formatDate(issueInfo?.issueDate)}
        </Tag></p>
        <h3>浏览数：{issueInfo?.scanNumber}</h3>
        <p></p>
        <h3>评论数：{issueInfo?.scanNumber}</h3>
      </Card>
    </div>
  </PageContainer>
}

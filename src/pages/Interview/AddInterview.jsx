import { PageContainer } from '@ant-design/pro-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from '@umijs/max'
import InterviewForm from './components/InterviewForm'
import { addInterview } from '../../services/interview';
import {message} from 'antd'
export default function AddInterview() {
  const navigate = useNavigate()
  const [interviewInfo, setInterviewInfo] = useState({
    interviewTitle: '',
    interviewContent: '',
    typeId: '',
  })
  //新增面试题
  function handleSubmit(interviewContent) {
    // 因为没有使用状态机，所以直接调用控制器方法，进行新增
    addInterview({
      interviewTitle: interviewInfo.interviewTitle,
      interviewContent,
      typeId: interviewInfo.typeId,
    });
    // 跳转回首页
    navigate('/interview/interviewList');
    message.success('新增面试题成功');
  }

  return (
    <PageContainer>
      <InterviewForm
        type='add'
        interviewInfo={interviewInfo}
        setInterviewInfo={setInterviewInfo}
        submitHandle={handleSubmit}
      ></InterviewForm>
    </PageContainer>
  )
}

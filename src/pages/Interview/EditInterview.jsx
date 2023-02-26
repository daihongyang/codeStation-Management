import React, { useState,useEffect } from 'react'
import {useNavigate,useParams} from '@umijs/max'
import { getInterviewById,editInterview } from '../../services/interview'
import { PageContainer } from '@ant-design/pro-components'
import InterviewForm from './components/InterviewForm'
import {message} from 'antd'
export default function EditInterview() {
  const { id } = useParams(); 
  const [interviewInfo,setInterviewInfo] = useState(null)
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      // 根据问答 id 获取该问答具体的信息
      const { data } = await getInterviewById(id);
      setInterviewInfo(data);
    }
    fetchData();
  }, []);

  function handleSubmit(interviewContent) {
    // 因为没有使用状态机，所以直接调用控制器方法，进行新增
    editInterview(id, {
      interviewTitle: interviewInfo.interviewTitle,
      interviewContent,
      typeId: interviewInfo.typeId,
    });
    // 跳转回首页
    navigate('/interview/interviewList');
    message.success('修改题目成功');
  }
  return (
    <PageContainer>
        <div className="container" style={{ width: 1000 }}>
        <InterviewForm
          type="edit"
          submitHandle={handleSubmit}
          interviewInfo={interviewInfo}
          setInterviewInfo={setInterviewInfo}
        />
      </div>
    </PageContainer>
  )
}

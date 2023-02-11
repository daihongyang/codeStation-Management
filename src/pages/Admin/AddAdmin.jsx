import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import AdminForm from './components/AdminForm';
import { useDispatch, useSelector, useNavigate } from 'umi';
// import {useNavigate} from 'react-router-dom'
import { message } from 'antd';
export default function AddAdmin() {
  //添加管理员的信息状态
  const [newAdminInfo, setNewAdminInfo] = useState({
    loginId: '',
    loginPwd: '',
    nickname: '',
    avatar: '',
    permission: 2,
  });
  const { adminList } = useSelector((state) => {
    return state.admin;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!adminList.length) {
      dispatch({
        type: 'admin/_initAdminList',
      });
    }
  }, [adminList]);

  //信息提交函数
  function handleSubmit() {
    dispatch({
      type: 'admin/_addAdmin',
      payload: newAdminInfo,
    });
    message.success('添加管理员成功');
    navigate('/');
  }
  return (
    <PageContainer>
      <div className="container" style={{ width: '500px' }}>
        <AdminForm
          type="add"
          adminInfo={newAdminInfo}
          setAdminInfo={setNewAdminInfo}
          handleSubmit={handleSubmit}
        />
      </div>
    </PageContainer>
  );
}

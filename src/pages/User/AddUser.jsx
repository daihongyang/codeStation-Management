import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import UserForm from './components/UserForm';
import { addUser } from '../../services/user';
import { useNavigate } from '@umijs/max';
import { message } from 'antd';
export default function AddUser() {
  const navigate = useNavigate();
  const [newUserInfo, setNewUserInfo] = useState({
    loginId: '',
    loginPwd: '',
    avatar: '',
    nickname: '',
    mail: '',
    qq: '',
    wechat: '',
    intro: '',
  });

  function handleSubmit() {
    console.log(123);
    addUser(newUserInfo);
    navigate('/user/userList');
    message.success('用户添加成功');
  }
  return (
    <PageContainer>
      <div className="container" style={{ width: '500px' }}>
        <UserForm
          type="add"
          userInfo={newUserInfo}
          setUserInfo={setNewUserInfo}
          submitHandle={handleSubmit}
        />
      </div>
    </PageContainer>
  );
}

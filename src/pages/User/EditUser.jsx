import React, { useRef, useState } from 'react';
import UserForm from './components/UserForm';
import { useLocation, useNavigate } from '@umijs/max';
import { PageContainer } from '@ant-design/pro-components';
import { updateUserInfo } from '../../services/user';
import { message } from 'antd';
export default function EditUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const [newUserInfo, setNewUserInfo] = useState({});
  const userInfo = location.state;

  //提交函数
  async function handleSubmit() {
    await updateUserInfo(newUserInfo._id, newUserInfo);
    navigate('/user/userList');
    message.success('修改成功');
  }
  return (
    <div>
      <PageContainer>
        <div className="container" style={{ width: '500px' }}>
          <UserForm
            type="edit"
            userInfo={userInfo}
            setUserInfo={setNewUserInfo}
            submitHandle={handleSubmit}
          ></UserForm>
        </div>
      </PageContainer>
    </div>
  );
}

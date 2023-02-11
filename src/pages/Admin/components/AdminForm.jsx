import React, { useRef } from 'react';
import { Form, Input, Radio, Upload, Button, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { checkAdminIsExisted } from '../../../services/admin';
export default function AdminForm({
  type,
  adminInfo,
  setAdminInfo,
  handleSubmit,
}) {
  //验证管理员是否存在
  async function checkLoginId() {
    //只有在添加管理员操作的时候才会进行判定
    // if(adminInfo.loginId && type === "add"){
    //     console.log(adminInfo.loginId)
    //     const {data} = await checkAdminIsExisted(adminInfo.loginId);
    //     // console.log(data,'data');
    //     if(data){
    //         // 说明该 loginId 已经注册过了
    //         return Promise.reject("该管理员已经注册过了");
    //     }
    // }
    const reg = /.{1,6}/;
    const res = reg.test(adminInfo.loginId);
    if (!res) {
      return Promise.reject('用户名应为1-6位');
    } else {
      return Promise.resolve();
    }
  }

  function checkPassword() {
    const reg = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$/;
    const res = reg.test(adminInfo.loginPwd);
    if (!res) {
      return Promise.reject('密码必须由8-18位大小写字母、数字组成');
    } else {
      return Promise.resolve();
    }
  }

  //表单双向绑定函数
  function updateInfo(value, key) {
    const newAdminInfo = { ...adminInfo };
    newAdminInfo[key] = value;
    setAdminInfo(newAdminInfo);
  }

  let avatarPreview = null;
  if (type === 'edit') {
    avatarPreview = (
      <Form.Item
        label="当前头像"
        name="avatarPreview"
        labelCol={{ style: { width: 100 } }}
      >
        <Image src={adminInfo.avatar} width={100}></Image>
      </Form.Item>
    );
  }
  const formRef = useRef();
  if (formRef.current) {
    formRef.current.setFieldsValue(adminInfo);
  }
  return (
    // Form 的 onFinish 会在所有验证通过后才会触发
    <Form
      name="basic"
      initialValues={adminInfo}
      autoComplete="off"
      onFinish={handleSubmit}
      ref={formRef}
    >
      {/* 账号 */}
      <Form.Item
        label="管理员账号"
        name="loginId"
        rules={[
          { required: true, message: '请输入管理员账号' },
          { validateTrigger: 'onBlur', validator: checkLoginId },
        ]}
        labelCol={{ style: { width: 100 } }}
      >
        <Input
          value={adminInfo?.loginId}
          onChange={(e) => updateInfo(e.target.value, 'loginId')}
          disabled={type === 'edit' ? true : false}
        />
      </Form.Item>

      {/* 密码 */}
      {/* 如果是新增管理员，密码是可以为空的
            但是如果是修改管理员，那么密码则不能为空 */}
      <Form.Item
        label="管理员密码"
        name="loginPwd"
        rules={[
          type === 'edit' ? { required: true, message: '密码不能为空' } : null,
        ]}
        labelCol={{ style: { width: 100 } }}
      >
        <Input.Password
          placeholder={type === 'add' ? '密码可选，默认是123123' : ''}
          value={adminInfo?.loginPwd}
          onChange={(e) => updateInfo(e.target.value, 'loginPwd')}
        />
      </Form.Item>

      {/* 昵称 */}
      <Form.Item
        label="管理员昵称"
        name="nickname"
        rules={[
          type === 'edit' ? { required: true, message: '昵称不能为空' } : null,
          { validateTrigger: 'onBlur', validator: checkLoginId },
        ]}
        labelCol={{ style: { width: 100 } }}
      >
        <Input
          placeholder={type === 'add' ? '昵称可选，默认是新增管理员' : ''}
          value={adminInfo?.nickname}
          onChange={(e) => updateInfo(e.target.value, 'nickname')}
        />
      </Form.Item>

      {/* 权限 */}
      <Form.Item
        label="权限选择"
        name="permission"
        rules={[{ required: true, message: '请选择管理员权限' }]}
        labelCol={{ style: { width: 100 } }}
      >
        <Radio.Group
          onChange={(e) => updateInfo(e.target.value, 'permission')}
          value={adminInfo?.permission}
        >
          <Radio value={2}>普通管理员</Radio>
          <Radio value={1}>超级管理员</Radio>
        </Radio.Group>
      </Form.Item>
      {avatarPreview}
      {/* 上传头像 */}
      <Form.Item label="上传头像" labelCol={{ style: { width: 100 } }}>
        <Upload
          listType="picture-card"
          maxCount={1}
          action="/api/upload"
          onChange={(e) => {
            if (e.file.status === 'done') {
              // 说明上传已经完成，我们需要拿到该图片在服务器的路径
              const url = e.file.response.data;
              updateInfo(url, 'avatar');
            }
          }}
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: '8px' }}>头像可选</div>
          </div>
        </Upload>
      </Form.Item>

      {/* 按钮容器 */}
      <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {type === 'add' ? '确认新增' : '修改'}
        </Button>
      </Form.Item>
    </Form>
  );
}

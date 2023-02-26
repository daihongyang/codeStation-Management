import React, { useRef, useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { getUserList } from '../../services/user';
import { Switch, Button, Modal, Card, message } from 'antd';
import { updateUserInfo } from '../../services/user';
import InfoItem from './components/InfoItem';
import { formatDate } from '../../utils/format';
import { deleteUserById } from '../../services/user';
import { useNavigate, useAccess, Access } from '@umijs/max';
export default function UserList() {
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 5,
  });
  const access = useAccess()//获取权限对象
  // console.log(access, 'acc')
  const tableRef = useRef();
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [isDetailModal, setIsDetailModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  //是否禁用按钮点击函数
  async function switchChange(row, value) {
    await updateUserInfo(row._id, {
      enabled: value,
    });
  }

  //显示用户数据
  function showUserDetail(row) {
    // console.log(row)
    setIsDetailModal(true);
    setUserInfo(row);
  }
  function showInfoMadal(row) {
    // console.log(row)
    setIsModal(true);
    setUserInfo(row);
  }
  function closeDetailModal() {
    setIsDetailModal(false);
  }
  //表格数据规则
  const columns = [
    {
      title: '序号',
      align: 'center',
      width: 50,
      search: false,
      render: (text, record, index) => {
        return (pageInfo.current - 1) * pageInfo.pageSize + index + 1;
      },
    },
    {
      title: '登录账号',
      dataIndex: 'loginId',
      key: 'loginId',
      align: 'center',
    },
    {
      title: '登录密码',
      dataIndex: 'loginPwd',
      key: 'loginPwd',
      align: 'center',
      search: false,
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      align: 'center',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      valueType: 'image',
      align: 'center',
      search: false,
    },
    {
      title: '账号状态',
      dataIndex: 'enabled',
      key: 'enabled',
      align: 'center',
      search: false,
      render: (_, row, index, action) => {
        const defaultChecked = row.enabled ? true : false;
        return [
          <Switch
            key={row._id}
            defaultChecked={defaultChecked}
            size="small"
            onChange={(value) => switchChange(row, value)}
          />,
        ];
      },
    },
    {
      title: '操作',
      width: 200,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      align: 'center',
      render: (_, row) => {
        return (
          <div>
            <Button
              type="link"
              size="small"
              onClick={() => {
                showUserDetail(row);
              }}
            >
              详情
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => navigate('/user/editUser', { state: row })}
            >
              编辑
            </Button>
            <Access accessible={access.SuperAdmin}>
              <Button type="link" size="small" onClick={() => showInfoMadal(row)}>
                删除
              </Button>
            </Access>

          </div>
        );
      },
    },
  ];
  //分页点击按钮
  function handlePageChange(current, pageSize) {
    setPageInfo({
      current,
      pageSize,
    });
  }
  //删除通知确认函数
  async function handleOk() {
    await deleteUserById(userInfo?._id);
    //删除之后要强制刷新来实现及时渲染
    tableRef.current.reload();
    setIsModal(false);
    message.success('删除成功');
  }
  //删除通知取消函数
  function handleCancel() {
    setIsModal(false);
  }
  return (
    <div>
      <PageContainer>
        <ProTable
          headerTitle="用户信息列表"
          columns={columns}
          rowKey={(row) => row._id}
          actionRef={tableRef}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 15, 20],
            ...pageInfo,
            onChange: handlePageChange,
          }}
          request={async (params) => {
            // console.log(params)
            const res = await getUserList(params);
            return {
              data: res.data.data,
              success: res.code,
              total: res.data.count,
            };
          }}
        />
      </PageContainer>
      <Modal
        title="用户详情"
        open={isDetailModal}
        onCancel={closeDetailModal}
        footer={null}
        closable
        width={550}
        centered="true"
      >
        <div className="container" style={{ width: '500px' }}>
          <Card bordered={false}>
            <InfoItem name="用户账号" info={userInfo?.loginId}></InfoItem>
            <InfoItem name="用户密码" info={userInfo?.loginPwd}></InfoItem>
            <InfoItem name="用户昵称" info={userInfo?.nickname}></InfoItem>
            <InfoItem
              name="上次登录时间"
              info={formatDate(userInfo?.lastLoginDate)}
            ></InfoItem>
            <InfoItem
              name="注册时间"
              info={formatDate(userInfo?.registerDate)}
            ></InfoItem>
            <InfoItem name="QQ" info={userInfo?.qq}></InfoItem>
            <InfoItem name="微信" info={userInfo?.wechat}></InfoItem>
            <InfoItem name="邮箱" info={userInfo?.mail}></InfoItem>
            <InfoItem name="积分" info={userInfo?.points}></InfoItem>
            <InfoItem name="个人简介" info={userInfo?.intro}></InfoItem>
          </Card>
        </div>
      </Modal>
      <Modal
        title="提示"
        open={isModal}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        centered="true"
      >
        你确定要删除该用户吗？删除后不可恢复！
      </Modal>
    </div>
  );
}

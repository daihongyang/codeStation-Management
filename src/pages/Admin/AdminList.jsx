import React, { useState } from 'react';
import { useDispatch, useSelector, useModel } from '@umijs/max';
import { useEffect } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Switch, Tag, Modal, message } from 'antd';
import AdminForm from './components/AdminForm';
export default function AdminList() {
  const dispatch = useDispatch();
  //表单信息
  const [newAdminInfo, setNewAdminInfo] = useState(null);
  //修改按钮点击函数
  async function handleEdit(row) {
    // console.log(row._id)
    // const { data } = await getAdminById(row._id)
    setNewAdminInfo(row);
    setIsEditModal(true);
  }
  const { initialState } = useModel('@@initialState')
  console.log(initialState, 'ini')
  //表格规则
  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
      valueType: 'avatar',
    },
    {
      title: '账号',
      dataIndex: 'loginId',
      key: 'loginId',
      align: 'center',
    },
    {
      title: '密码',
      dataIndex: 'loginPwd',
      key: 'loginPwd',
      align: 'center',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      align: 'center',
    },
    {
      title: '权限',
      dataIndex: 'permission',
      key: 'permission',
      align: 'center',
      render: (_, row) => {
        let renderTag =
          row.permission === 1 ? (
            <Tag color="red">超级管理员</Tag>
          ) : (
            <Tag color="gold">普通管理员</Tag>
          );
        return renderTag;
      },
    },
    {
      title: '状态',
      dataIndex: 'enabled',
      key: 'enabled',
      align: 'center',
      render: (_, row) => {
        let renderSwitch = (
          <Switch
            defaultChecked={row.enabled}
            disabled={initialState.adminInfo._id === row._id}
            onChange={(value) => handleSwitch(value, row)}
          />
        );
        return renderSwitch;
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      align: 'center',
      render: (_, row) => {
        return (
          <>
            <Button
              type="primary"
              size="small"
              style={{ marginRight: '10px' }}
              onClick={() => {
                handleEdit(row);
              }}
            >
              修改
            </Button>
            <Button
              type="danger"
              size="small"
              onClick={() => {
                setIsModal(true), setAdminInfo(row);
              }}
            >
              删除
            </Button>
          </>
        );
      },
    },
  ];
  //获取仓库状态
  const { adminList } = useSelector((state) => {
    return state.admin;
  });
  //删除弹窗状态
  const [isModal, setIsModal] = useState(false);
  //编辑弹窗状态
  const [isEditModal, setIsEditModal] = useState(false);
  //操作行数据
  const [adminInfo, setAdminInfo] = useState(null);
  useEffect(() => {
    if (!adminList.length) {
      //派发
      dispatch({
        type: 'admin/_initAdminList', //命名空间＋副作用函数
      });
    }
  }, [adminList]);

  //弹窗确认函数
  function handleOk() {
    setIsModal(false);
    if (initialState.adminInfo._id === adminInfo._id) {
      location.href = '/login'
      localStorage.removeItem('adminToken')
    }
    dispatch({
      type: 'admin/_deleteAdmin',
      payload: adminInfo,
    });

    message.success('删除成功');
  }

  //弹窗取消函数
  function handleCancel() {
    setIsModal(false);
    setAdminInfo(null);
  }

  /**
   * 开关处理函数
   * @param {Boolean} value 是否是开启
   * @param {*} row 该行数据
   */
  function handleSwitch(value, row) {
    // console.log('value',value)
    dispatch({
      type: 'admin/_editAdmin',
      payload: {
        id: row._id,
        newInfo: {
          enabled: value,
        },
      },
    });
  }
  //打开编辑弹窗
  function openEditMadal() {
    setIsEditModal(false);
  }
  //关闭编辑弹窗
  function closeEditModal() {
    setIsEditModal(false);
  }
  //表单提交函数
  function handleSubmit() {
    dispatch({
      type: 'admin/_editAdmin',
      payload: {
        id: newAdminInfo._id,
        newInfo: newAdminInfo,
      },
    });
    setIsEditModal(false);
    message.success('修改管理员成功');
    // navigate('/')
  }

  return (
    <div>
      <PageContainer>
        <ProTable
          headerTitle="管理员列表"
          dataSource={adminList}
          rowKey={(row) => {
            return row._id;
          }}
          columns={columns}
          search={false}
          pagination={{
            pageSize: 10,
          }}
        />
      </PageContainer>
      <Modal
        title="提示"
        open={isModal}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        centered="true"
      >
        你确定要删除该管理员吗吗？删除后不可恢复！
      </Modal>
      <Modal
        title="编辑用户"
        open={isEditModal}
        onOk={openEditMadal}
        onCancel={closeEditModal}
        footer={null}
        closable
        width={550}
        centered="true"
      >
        <div className="container" style={{ width: '500px' }}>
          <AdminForm
            type="edit"
            adminInfo={newAdminInfo}
            setAdminInfo={setNewAdminInfo}
            handleSubmit={handleSubmit}
          />
        </div>
      </Modal>
    </div>
  );
}

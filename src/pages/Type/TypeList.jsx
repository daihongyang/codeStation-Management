import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components'
import { useDispatch, useSelector } from '@umijs/max'
import { Tag, Button, Modal, Input, Form, message } from 'antd';
export default function TypeList() {
  const dispatch = useDispatch()
  const [isModal, setIsModal] = useState(false)
  //获取typelist
  const { typeList } = useSelector(state => {
    return state.type
  })
  const [typeInfo, setTypeInfo] = useState(null)
  const [isEditModal, setIsEditModal] = useState(false)
  const [newTypeInfo, setNewTypeInfo] = useState('')
  useEffect(() => {
    if (!typeList.length) {
      dispatch({
        type: 'type/_initTypeList'
      })
    }
  }, [])
  //删除确认函数
  function handleOk() {
    dispatch({
      type: 'type/_deleteType',
      payload: typeInfo
    })
    setIsModal(false)
  }
  //弹窗取消函数
  function handleCancel() {
    setIsModal(false)
  }

  //提交处理函数
  function handleSubmit() {
    // console.log(typeInfo)
    // 派发
    dispatch({
      type: 'type/_updateType',
      payload: {
        id: typeInfo._id,
        data: {
          typeName: newTypeInfo
        }
      }
    })
    message.success('修改成功')
    setIsEditModal(false)
  }
  //打开删除确认弹窗
  function openModal(row) {
    // console.log(row)
    setIsModal(true)
    setTypeInfo(row)

  }


  const columns = [
    {
      title: "类型",
      dataIndex: 'typeName',
      key: 'type',
      align: "center",
      render: (_, row) => {
        return (
          <Tag color='blue' key={row._id}>{row.typeName}</Tag>
        )
      }
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
                setIsEditModal(true)
                // console.log(row.typeName)
                setNewTypeInfo(row.typeName)
                setTypeInfo(row)
              }}
            >
              修改
            </Button>
            <Button
              type="danger"
              size="small"
              onClick={() => {
                openModal(row)
              }}
            >
              删除
            </Button>
          </>
        );
      },
    },
  ]
  return (
    <>
      <PageContainer>
        <ProTable
          headerTitle="类型列表"
          dataSource={typeList}
          columns={columns}
          rowKey={(row) => {
            return row?._id
          }}
          search={false}
          pagination={{
            pageSize: 10
          }}
        >

        </ProTable>
      </PageContainer>
      <Modal
        title="提示"
        open={isModal}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        centered="true"
      >
        你确定要删除该分类吗？删除后不可恢复！
      </Modal>
      <Modal
        title="修改类型名称"
        open={isEditModal}
        onCancel={() => { setIsEditModal(false), setNewTypeInfo('') }}
        footer={null}
        closable={true}
        centered="true"
      >
        <div
          className='container'
          style={{ width: '450px' }}
        >
          <Form
            name="basic"
            initialValues={typeInfo}
            autoComplete="off"
          >
            <Form.Item
              label="类型名称"
              name="typeName"
              labelCol={{ style: { width: 95 } }}
            >
              <>
                <Input
                  value={newTypeInfo}
                  onChange={(e) => setNewTypeInfo(e.target.value)}

                />
              </>

            </Form.Item>
            <Form.Item
              wrapperCol={{ offset: 5, span: 16 }}
            >
              <Button type="primary" onClick={handleSubmit}>
                修改
              </Button>
            </Form.Item>
          </Form>

        </div>
      </Modal>
    </>
  )
}

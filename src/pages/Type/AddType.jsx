import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Form, Input, Button, message } from 'antd';
import { useState } from 'react';
import { useDispatch, useNavigate, useSelector } from '@umijs/max'
export default function AddType() {
  const [typeInfo, setTypeInfo] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { typeList } = useSelector(state => {
    return state.type
  })
  if (!typeList.length) {
    dispatch({
      type: 'type/_initTypeList'
    })
  }
  //新类型提交函数
  function handleSubmit() {
    //判断是否重复添加，如果重复不予添加
    const index = typeList.findIndex(item => {
      return item.typeName === typeInfo
    })
    if (index !== -1) {
      message.warn('不能重复添加分类')
      return
    }

    dispatch({
      type: 'type/_addType',
      payload: {
        typeName: typeInfo
      }
    });
    message.success('类型添加成功')
    navigate('/type/typeList')
  }
  return (
    <PageContainer>
      <div
        className='container'
        style={{ width: '500px' }}
      >
        <Form
          name="basic"
          initialValues={typeInfo}
          autoComplete="off"
        >
          <Form.Item
            label="类型名称"
            name="typeName"
            labelCol={{ style: { width: 100 } }}
          >
            <Input
              value={typeInfo}
              onChange={(e) => setTypeInfo(e.target.value)}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
            <Button type="primary" onClick={handleSubmit}>
              添加
            </Button>
          </Form.Item>
        </Form>

      </div>
    </PageContainer>
  )
}

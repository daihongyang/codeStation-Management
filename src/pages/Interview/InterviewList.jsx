import React, { useEffect, useRef, useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { deleteInterviewById, getInterviewInfoByPage } from '../../services/interview';
import { Select, Modal, Button, Input, Tag, Popconfirm, message } from 'antd'
import { formatDate, typeOptionCreator } from '../../utils/format';
import { useDispatch, useSelector, useNavigate } from '@umijs/max'
export default function InterviewList() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { typeList } = useSelector(state => {
    return state.type
  })
  //获取类型列表
  useEffect(() => {
    if (!typeList.length) {
      dispatch(
        {
          type: "type/_initTypeList"
        }
      )
    }
  }, [])


  const tableRef = useRef()
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5
  })
  const [searchType, setSearchType] = useState({
    typeId: ''
  })

  function handleDelete(row) {
    deleteInterviewById(row._id)
    tableRef.current.reload()
    message.success('删除面试题成功')
  }
  const columns = [
    {
      title: '序号',
      align: 'center',
      width: 50,
      search: false,
      render: (text, record, index) => {
        return [(pagination.current - 1) * pagination.pageSize + index + 1];
      },
    },
    {
      title: '面试题标题',
      dataIndex: 'interviewTitle',
      width: 150,
      key: 'interviewTitle',
      align: 'center',
      ellipsis: true
    },
    {
      title: '面试题内容',
      dataIndex: 'interviewContent',
      key: 'interviewContent',
      align: 'center',
      width: 200,
      search: false,
      ellipsis: 'true',
      render: (_, row) => {
        // 将书籍简介的文字进行简化
        // 在表格中显示书籍简介时，过滤掉 html 标签
        let reg = /<[^<>]+>/g;
        let brief = row.interviewContent;
        brief = brief.replace(reg, '');

        // if (brief.length > 15) {
        //   brief = brief.slice(0, 15) + '...';
        // }
        return [brief];
      },
    },
    {
      title: '分类',
      dataIndex: 'typeId',
      key: 'typeId',
      align: 'center',
      width: 50,
      renderFormItem: (
        item,
        { type, defaultRender, formItemProps, fieldProps, ...rest },
        form,
      ) => {
        return (
          <Select placeholder="请选择查询分类" onChange={handleChange}>
            {typeOptionCreator(Select, typeList)}
          </Select>
        );
      },
      render: (_, row) => {
        // 寻找对应类型的类型名称
        const type = typeList.find((item) => item._id === row.typeId);
        return [
          <Tag color="blue" key={row.typeId}>
            {type?.typeName}
          </Tag>,
        ];
      },
    },
    {
      title: '发布日期',
      align: 'center',
      dataIndex: 'onShelfDate',
      key: 'onShelfDate',
      width: 50,
      search: false,
      render: (_, row) => {
        return (
          <Tag color='red' key={row._id}>
            {formatDate(row.onShelfDate, 'year')}
          </Tag>
        )
      },
    },
    {
      title: '操作',
      width: 90,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      align: 'center',
      style: { justifyContent: 'center' },
      render: (_, row, index, action) => {
        return [
          <div style={{ display: 'flex', justifyContent: 'space-around' }} key={row._id}>
            <Button
              type="link"
              size="small"
              style={{ marginLeft: '30px' }}
              onClick={() => navigate(`/interview/editInterview/${row._id}`)}
            >
              编辑
            </Button>
            <Popconfirm
              title="是否要删除该书籍以及该书籍对应的评论？"
              onConfirm={() => handleDelete(row)}
              okText="删除"
              cancelText="取消"
            >
              <Button type="link" size="small">
                删除
              </Button>
            </Popconfirm>
          </div>,
        ];
      },
    },
  ]
  //分页切换函数
  function handlePageChange(current, pageSize) {
    setPagination({
      current,
      pageSize
    })
  }

  function handleChange(value) {
    setSearchType({
      typeId: value
    })
  }
  return (
    <PageContainer>
      <ProTable
        headerTitle="面试题信息列表"
        columns={columns}
        rowKey={(row) => row._id}
        actionRef={tableRef}
        params={searchType}
        onReset={() => {
          setSearchType({
            typeId: null,
          });
        }}
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 15, 20],
          ...pagination,
          onChange: handlePageChange,
        }}
        request={async (params) => {
          console.log(params)
          const result = await getInterviewInfoByPage(params)
          // console.log(result)
          return {
            data: result.data.data,
            success: !result.code,
            total: result.data.count
          }
        }}

      />
    </PageContainer>
  )
}

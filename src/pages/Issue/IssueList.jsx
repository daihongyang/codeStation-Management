import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useEffect, useRef, useState } from 'react';
import { deleteIssueById, getIssuesByPage } from '../../services/issue';
import { useDispatch, useSelector, useNavigate } from '@umijs/max'
import { Tag, Select, Switch, message, Button, Popconfirm } from 'antd'
import { typeOptionCreator } from '../../utils/format'
import { editIssueInfo } from '../../services/issue';
export default function IssueList() {
  const tableRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { typeList } = useSelector(state => {
    return state.type
  })
  const [searchType, setSearchType] = useState({
    typeId: null
  })
  useEffect(() => {
    if (!typeList.length) {
      dispatch({
        type: 'type/_initTypeList'
      })
    }
  }, [])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  })
  //下拉列表改变函数
  function handleChange(value) {
    setSearchType({
      typeId: value
    })
  }
  //删除操作函数
  function handleDelete(row) {
    deleteIssueById(row._id)
    //强制重新渲染
    tableRef.current.reload()
    message.success('删除成功')
  }
  //滑动按钮触发函数
  function switchChange(row, value) {
    editIssueInfo(row._id, {
      issueStatus: value
    })
    if (value) {
      message.success('该问题已经审核通过')
    }
    else {
      message.success('该问题待审核')
    }
  }
  const columns = [
    {
      title: '序号',
      align: 'center',
      width: 50,
      render: (text, record, index) => {
        // console.log(text,record,index)
        return [(pagination.current - 1) * pagination.pageSize + index + 1]
      },
      search: false,
    },
    {
      title: '问答标题',
      dataIndex: 'issueTitle',
      key: 'issueTitle',
      render: (_, row) => {
        let brief = null
        if (row.issueTitle.length > 22) {
          //避免标题过长
          brief = row.issueTitle.slice(0, 22) + '...'
        } else {
          brief = row.issueTitle
        }
        return brief
      },
    },
    {
      title: '问答描述',
      dataIndex: 'issueContent',
      key: 'issueContent',
      search: false,
      render: (_, row) => {
        //获取到的数据中存在html标签，要进行简化
        let reg = /<[^<>]+>/g
        let brief = row.issueContent
        brief = brief.replace(reg, '')
        if (brief.length > 30) {
          brief = brief.slice(0, 30) + '...'
        }
        return [brief]
      }
    },
    {
      title: '浏览数',
      dataIndex: 'scanNumber',
      key: 'scanNumber',
      align: 'center',
      search: false,
    },
    {
      title: '评论数',
      dataIndex: 'commentNumber',
      key: 'commentNumber',
      align: 'center',
      search: false,
    },
    {
      title: '问答分类',
      dataIndex: 'typeId',
      key: 'typeId',
      align: 'center',
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
          <Tag color="purple" key={row.typeId}>
            {type?.typeName}
          </Tag>,
        ];
      },
    },
    {
      title: '审核状态',
      dataIndex: 'issueStatus',
      key: 'issueStatus',
      align: 'center',
      render: (_, row) => {
        const defaultChecked = row.issueStatus ? true : false
        return [
          <Switch
            key={row._id}
            defaultChecked={defaultChecked}
            size={'small'}
            onChange={(value) => { switchChange(row, value) }}
          />
        ]
      }
    },
    {
      title: '操作',
      width: 150,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      align: 'center',
      render: (_, row) => {
        return [
          <div key={row._id}>
            <Button
              style={{ marginLeft: '20px' }}
              type="link"
              size="small"
              onClick={() => navigate(`/issue/issueDetail/${row._id}`)}
            >
              详情
            </Button>
            <Popconfirm
              title="是否要删除该问答以及该问答对应的评论？"
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


  function handlePageChange(current, pageSize) {
    setPagination({
      current,
      pageSize
    })
  }
  return <PageContainer>
    <ProTable
      headerTitle="问答列表"
      actionRef={tableRef}
      columns={columns}
      params={searchType}
      rowKey={(row) => { return row._id }}
      onReset={() => {
        setSearchType({
          typeId: null,
        });
      }}
      pagination={
        {
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20, 50],
          ...pagination,
          onChange: handlePageChange
        }
      }
      request={async (params) => {
        const result = await getIssuesByPage(params)
        // console.log(result)
        return {
          data: result.data.data,
          success: !result.code,
          total: result.data.count
        }
      }}
    ></ProTable>
  </PageContainer>
}

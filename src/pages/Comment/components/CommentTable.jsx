import React, { useEffect, useState, useRef } from 'react'
import { ProTable } from '@ant-design/pro-components'
import { deleteCommentById, getComments } from '../../../services/comment'
import { getUserById } from '../../../services/user'
import { getBookById } from '../../../services/book'
import { useSelector, useDispatch } from '@umijs/max'
import { getIssueInfoById } from '../../../services/issue'
import { Tag, Select, Button, Modal, message, Descriptions } from 'antd'
import { formatDate, typeOptionCreator } from '../../../utils/format'
export default function CommentTable(props) {
    const dispatch = useDispatch()
    //用于获取proTable的ref，方便后续强制刷新
    const tableRef = useRef()
    //下拉列表数据
    const [searchType, setSearchType] = useState({
        typeId: null
    })
    const { typeList } = useSelector(state => {
        return state.type
    })
    useEffect(() => {
        if (!typeList.length) {
            dispatch({
                type: 'type/_initTypeList'
            })
        }
    }, [])
    //分页状态信息
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5

    })
    //获取到的用户信息数组
    const [userArr, setUserArr] = useState([])
    //获取到的书籍或者问答的信息数组
    const [titleArr, setTitleArr] = useState([])
    //控制弹窗开关
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModal, setIsModal] = useState(false)
    const [commentInfo, setCommentInfo] = useState(null)
    //详情内容
    let detailContent;
    if (props.type === '1') {
        detailContent = titleArr.find(item => {
            return item._id === commentInfo?.issueId
        })
    } else {
        detailContent = titleArr.find(item => {
            return item._id === commentInfo?.bookId
        })
    }

    //分页组件改变函数
    function handlePageChange(current, pageSize) {
        setPagination({
            current,
            pageSize
        })
    }
    //分类查询函数
    function handleSelectChange(value) {
        console.log(value)
        setSearchType({
            typeId: value
        })
    }
    //操作处理函数
    function handleOption(type, row) {
        if (type === 'delete') {
            setIsModal(true)
        } else if (type === 'detail') {
            setIsModalOpen(true)
        }
        // console.log(row)
        setCommentInfo(row)
    }

    //弹窗关闭函数
    function handleCancel() {
        setIsModalOpen(false)
    }
    function closeModal() {
        setIsModal(false)
    }
    //删除确认处理函数
    async function handleConfirm() {
        await deleteCommentById(commentInfo._id)
        tableRef.current.reload()
        message.success('删除成功')
        setIsModal(false)
    }
    const columns = [
        {
            title: '序号',
            align: 'center',
            width: 50,
            render: (text, record, index) => {
                return (pagination.current - 1) * pagination.pageSize + index + 1
            },
            search: false
        },
        {
            title: props.type === '1' ? '问答标题' : '书籍标题',
            dataIndex: 'commentTitle',
            search: false,
            render: (_, row) => {
                const id = row.issueId ? row.issueId : row.bookId
                const title = titleArr.find((item) => {
                    return item._id === id
                })
                return props.type === '1' ? title?.issueTitle : title?.bookTitle
            }
        },
        {
            title: '评论内容',
            dataIndex: 'commentContent',
            key: 'commentContent',
            render: (_, row) => {
                let content = null
                if (row.commentContent.length > 30) {
                    content = row.commentContent.slice(0, 30) + '...';
                } else {
                    content = row.commentContent;
                }
                return [content];
            }
        },
        {
            title: '评论用户',
            align: 'center',
            dataIndex: 'nickname',
            search: false,
            render: (_, row) => {
                const user = userArr.find((item) => item._id === row.userId);
                return [
                    <Tag color="blue" key={row.userId}>
                        {user?.nickname}
                    </Tag>,
                ];
            },
        },
        {
            title: '评论分类',
            dataIndex: 'typeId',
            key: 'typeId',
            align: 'center',
            //该参数可以自定义搜索表头
            renderFormItem: (item, { type, defaultRender, formItemProps, fieldProps, ...rest }, form) => {
                return (
                    <Select placeholder="请选择查询分类" onChange={handleSelectChange}>
                        {typeOptionCreator(Select, typeList)}
                    </Select>
                )
            },
            render: (_, row) => {
                const type = typeList.find(item => { return item._id === row.typeId })
                return [
                    <Tag color='purple' key={row.typeId}>
                        {type?.typeName}
                    </Tag>
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
                    <div key={row._id} style={{
                        marginLeft: '20px'
                    }}>
                        <Button
                            type='link'
                            size='small'
                            onClick={() => handleOption('detail', row)}>
                            详情
                        </Button>
                        <Button
                            type='link'
                            size='small'
                            onClick={() => handleOption('delete', row)}>
                            删除
                        </Button>
                    </div>
                ]
            }
        }

    ]

    return (
        <>
            <ProTable
                headerTitle="评论列表"
                actionRef={tableRef}
                columns={columns}
                params={searchType}
                rowKey={(row) => {
                    return row._id
                }}
                onReset={() => {
                    setSearchType({
                        typeId: null
                    })
                }}
                pagination={{
                    showQuickJumper: true,
                    showSizeChanger: true,
                    pageSizeOptions: [5, 10, 20, 50, 100],
                    ...pagination,
                    onChange: handlePageChange
                }}
                request={
                    async (params) => {
                        const result = await getComments(props.type, params)
                        // console.log(result)
                        const userArr = []
                        const titleArr = []
                        const tableData = result.data.data
                        for (let i = 0; i < tableData.length; i++) {
                            const { data } = await getUserById(
                                tableData[i].userId,
                            );
                            userArr.push(data);
                            const id = tableData[i].issueId
                                ? tableData[i].issueId
                                : tableData[i].bookId;
                            if (props.type === '1') {
                                const { data } = await getIssueInfoById(id);
                                titleArr.push(data);
                            } else {
                                const { data } = await getBookById(id);
                                titleArr.push(data);
                            }
                        }
                        // console.log(userArr, titleArr)
                        setUserArr(userArr)
                        setTitleArr(titleArr)
                        return {
                            data: tableData,
                            success: !result.code,
                            total: result.data.count
                        }
                    }}
            ></ProTable>
            {/* 评论详情 */}
            <Modal
                title={'评论详情'}
                open={isModalOpen}
                onCancel={handleCancel}
                style={{ top: 50 }}
                footer={false}
                centered
            >
                <Descriptions bordered>
                    <Descriptions.Item
                        span={3}
                        label={props.type === '1' ? '问答标题' : '书籍名称'}>
                        {
                            props.type === '1' ?
                                detailContent?.issueTitle :
                                detailContent?.bookTitle
                        }
                    </Descriptions.Item>
                    <Descriptions.Item
                        label="评论时间"
                        span={3}
                    >
                        {
                            formatDate(commentInfo?.commentDate)
                        }
                    </Descriptions.Item>
                    <Descriptions.Item
                        label="评论内容"
                        span={3}
                    >
                        {
                            commentInfo?.commentContent
                        }
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
            {/* 删除确认 */}
            <Modal
                title={'提示'}
                open={isModal}
                onCancel={closeModal}
                onOk={handleConfirm}
                style={{ top: 50 }}
                centered
            >
                <h3>你确定要删除这条评论吗？删除后不可恢复！</h3>
            </Modal>
        </>
    )
}

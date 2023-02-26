import React from 'react'
import { useRef, useEffect, useState } from 'react';
import { Button, Form, Input, Upload, Image, Select } from 'antd';
import { useDispatch, useSelector } from '@umijs/max'
import { PlusOutlined } from '@ant-design/icons';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/zh-cn';
import { Editor } from '@toast-ui/react-editor';
import { typeOptionCreator } from '../../../utils/format';
export default function BookForm({ type, bookInfo, setBookInfo, submitHandle }) {
    const formRef = useRef()
    const editorRef = useRef()
    // console.log(editorRef)
    const dispatch = useDispatch()
    const [isFirstIn, setIsFirstIn] = useState(true)//是否是第一次进入界面
    useEffect(() => {
        // console.log(formRef.current,isFirstIn)
        console.log(bookInfo?.bookIntro)
        if (formRef.current && isFirstIn&& bookInfo) {
            // console.log('run1')
            formRef.current.setFieldsValue(bookInfo)//数据回填
            // console.log(bookInfo?.bookIntro)
            editorRef.current.getInstance().setHTML(bookInfo.bookIntro)//TODO:方法失效bug
            setIsFirstIn(false)
        }
        if (formRef.current) {
            // console.log('run2')
            formRef.current.setFieldsValue(bookInfo)
        }
    }, [bookInfo])
    let bookPicPreview = null//之前如果更改过要显示之前的书籍图片
    if (type === 'edit') {
        bookPicPreview = (
            <Form.Item
                label="当前封面"
                name='bookPicPreview'
            >
                <Image src={bookInfo?.bookPic} width={100} />
            </Form.Item>
        )
    }
    const { typeList } = useSelector(state => {
        return state.type
    })
    useEffect(() => {
        //如果没有type类型数组 要去仓库派发
        if (!typeList.length) {
            dispatch({
                type: "type/_initTypeList"
            })
        }
    }, [])
    //最终提交函数 收录所有edit内容
    function addHandle() {
        //获取editor的内容
        const content = editorRef.current.getInstance().getHTML()
        submitHandle(content)
    }
    // console.log(editorRef?.current?.getInstance().getHTML())
    /**
     * 分数下拉菜单回调
     * @param {*} value 选择的分数值
     */
    function handlePointChange(value) {
        updateInfo(value, 'requirePoints')
    }

    /**
     * 类型下拉菜单回调
     * @param {*} value 选择的分数值
     */
    function handleTypeChange(value) {
        updateInfo(value, 'typeId')
    }
    //封装表单绑定
    function updateInfo(value, key) {
        const newBookInfo = { ...bookInfo }
        newBookInfo[key] = value
        setBookInfo(newBookInfo)
    }
    return (
        <Form
            name="basic"
            initialValues={bookInfo}
            autoComplete="off"
            ref={formRef}
            onFinish={addHandle}
        >
            {/* 书籍标题 */}
            <Form.Item
                label="书籍标题"
                name="bookTitle"
                rules={[{ required: true, message: '请输入书名' }]}
            >
                <Input
                    value={bookInfo?.bookTitle}
                    onChange={(e) => updateInfo(e.target.value, 'bookTitle')}
                />
            </Form.Item>

            {/* 书籍介绍，需要使用到 markdown editor */}
            <Form.Item
                label="书籍介绍"
                name="bookIntro"
                rules={[{ required: true, message: '请输入书本相关的介绍' }]}
            >
                <Editor
                    initialValue=""
                    previewStyle="vertical"
                    height="600px"
                    initialEditType="markdown"
                    useCommandShortcut={true}
                    language="zh-CN"
                    ref={editorRef}
                />
            </Form.Item>

            <Form.Item
                label="下载链接"
                name="downloadLink"
                rules={[{ required: true, message: '请输入书籍链接' }]}
            >
                <Input
                    value={bookInfo?.downloadLink}
                    onChange={(e) => updateInfo(e.target.value, 'downloadLink')}
                />
            </Form.Item>

            <Form.Item
                label="所需积分"
                name="requirePoints"
                rules={[{ required: true, message: '请选择下载所需积分' }]}
            >
                <Select style={{ width: 200 }} onChange={handlePointChange}>
                    <Select.Option value={20} key={20}>20</Select.Option>
                    <Select.Option value={30} key={30}>30</Select.Option>
                    <Select.Option value={40} key={40}>40</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="书籍分类"
                name="typeId"
                rules={[{ required: true, message: '请选择书籍分类' }]}
            >
                <Select style={{ width: 200 }} onChange={handleTypeChange}>
                    {typeOptionCreator(Select, typeList)}
                </Select>
            </Form.Item>

            {/* 书籍图片的预览，这个是在修改书籍的时候会显示之前书籍的图片 */}
            {bookPicPreview}

            <Form.Item label="书籍封面" valuePropName="fileList">
                <Upload
                    action="/api/upload"
                    listType="picture-card"
                    maxCount={1}
                    onChange={(e) => {
                        if (e.file.status === 'done') {
                            // 说明上传已经完成
                            const url = e.file.response.data;
                            updateInfo(url, 'bookPic');
                        }
                    }}
                >
                    <PlusOutlined />
                </Upload>
            </Form.Item>

            {/* 确认修改按钮 */}
            <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    {type === 'add' ? '确认新增' : '修改'}
                </Button>
            </Form.Item>
        </Form>
    );
}

import React, { useState, useEffect } from 'react'
import { Form, Button, Input, Col, Row, Checkbox,message } from 'antd'
import { LockOutlined, UserOutlined, BarcodeOutlined } from '@ant-design/icons';
import styles from './index.module.css'
import ReactCanvasNest from 'react-canvas-nest';
import { getCaptcha, loginAdmin } from '../../services/admin'
export default function Login() {

  //登录信息状态
  const [loginInfo, setLoginInfo] = useState({
    loginId: "",
    loginPwd: "",
    captcha: '',
    remember: true
  })

  //验证码存储状态
  const [captcha, setCaptcha] = useState("")

  useEffect(() => {
    captchaClickHandle()
  }, [])

  //表单提交函数
  async function handleFinish() {
    const result = await loginAdmin(loginInfo)
    console.log(result)
    // 这里会有 3 种情况：
    // 1. 验证码错误 {code: 406, msg: '验证码错误', data: null}
    // 2. 账号密码不正确 {code: 0, msg: '', data: {data: null}}
    // 3. 账号密码正确，返回的是接口文档所写的数据结构  {code: 0, msg: '', data: {data: {...}, token: ...}}
    if (result.data) {
      const adminInfo = result.data;
      if (!adminInfo.data) {
        // 账号密码不正确
        message.warning("账号密码不正确");
        captchaClickHandle();
      } else if (!adminInfo.data.enabled) {
        // 这里还需要考虑一种情况，账号密码是正确的，但是账号已经被冻结
        message.warning("该账号已经被冻结，请联系管理员");
        captchaClickHandle();
      } else {
        // 说明账号密码正确，账号状态也是可用的
        // 存储 token
        
        localStorage.setItem("adminToken", adminInfo.token);
        
        // 跳转到后台管理系统的首页
        location.href = "/";
      }
    } else {
      message.warning(result.msg);
      captchaClickHandle();
    }
  }
  //验证码点击更换函数
  async function captchaClickHandle() {
    const result = await getCaptcha()
    setCaptcha(result)
  }

  //表单绑定
  function updateInfo(value, key) {
    const newLoginInfo = { ...loginInfo }
    newLoginInfo[key] = value
    setLoginInfo(newLoginInfo)
  }
  return (
    <div>
      {/* canvas 动画 */}
      <ReactCanvasNest
                config={{
                    pointColor: '255, 0, 0',
                    count: 66,
                    follow: false,
                }}
                style={{ zIndex: 1 }}
            />

      {/* 登录表单 */}
      <div className={styles.container}>
        <h1>coder station 后台管理系统</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={loginInfo}
          onFinish={handleFinish}
        >
          {/* 登录账号 */}
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入账号',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入账号"
              value={loginInfo.loginId}
              onChange={(e) => updateInfo(e.target.value, 'loginId')}
            />
          </Form.Item>

          {/* 登录密码 */}
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入密码"
              value={loginInfo.loginPwd}
              onChange={(e) => updateInfo(e.target.value, 'loginPwd')}
            />
          </Form.Item>

          {/* 验证码 */}
          <Form.Item
            name="captcha"
            rules={[
              {
                required: true,
                message: '请输入验证码',
              },
            ]}
          >
            <Row align="middle">
              <Col span={16}>
                <Input
                  prefix={<BarcodeOutlined className="site-form-item-icon" />}
                  placeholder="请输入验证码"
                  value={loginInfo.captcha}
                  onChange={(e) => updateInfo(e.target.value, 'captcha')}
                />
              </Col>
              <Col span={6}>
                <div
                  className={styles.captchaImg}
                  onClick={captchaClickHandle}
                  dangerouslySetInnerHTML={{ __html: captcha }}
                ></div>
              </Col>
            </Row>
          </Form.Item>

          {/* 7天免登录 */}
          <Form.Item name="remember" className={styles.remember}>
            <Checkbox
              checked={loginInfo.remember}
              onChange={(e) => updateInfo(e.target.checked, 'remember')}
            >
              7天免登录
            </Checkbox>
          </Form.Item>

          {/* 登录按钮 */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginBtn}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

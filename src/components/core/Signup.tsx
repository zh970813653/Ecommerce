import { Button, Form, Input, Result } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { resetSignup, signup, SignupPayload } from '../../store/actions/auth.actions'
import { AppState } from '../../store/reducers'
import { AuthState } from '../../store/reducers/auth.reducer'
import Layout from './Layout'


const Signup = () => {
    const dispath = useDispatch()
    const auth = useSelector<AppState,AuthState>(state => state.auth)
    const [form] = Form.useForm()
    useEffect(()=> {
        // 请求完毕 并且请求成功的话
        if (auth.signup.loaded && auth.signup.success) {
            form.resetFields()
        }
    },[auth])
    useEffect(()=> {
       return () => {
        dispath(resetSignup())
       }
    },[])
    // 注册成功 显示成功的提示信息
    const showSuccess = () => {
        if (auth.signup.loaded && auth.signup.success) {
            return (
                <Result
                status="success"
                title="注册成功!"
                extra={[
                  <Button type="primary" key="console">
                    <Link to="/signin">去登录</Link>
                  </Button>,
                ]}
              />
            
            )
        }
    }
    // 注册失败 显示失败的提示信息
    const showError = () => {
        if (auth.signup.loaded && !auth.signup.success) {
            return (
                <Result
                status="error"
                title="注册失败!"
                subTitle={auth.signup.message}
              />
            
            )
        }
    }
    const signupForm = () => {
        return (
            <Form onFinish={onFinish}>
                <Form.Item name="name" label="昵称">
                    <Input></Input>
                </Form.Item>
                <Form.Item name="password" label="密码">
                    <Input.Password></Input.Password>
                </Form.Item>
                <Form.Item name="email" label="邮箱">
                    <Input></Input>
                </Form.Item>
                <Form.Item name="name" >
                    <Button type='primary' htmlType='submit'>注册</Button>
                </Form.Item>
            </Form>
        )
    }
    
    const onFinish = (value: SignupPayload) => {
        dispath(signup(value))
    }
    return (
        <Layout title="注册" subTitle="">
            {showSuccess()}
            {showError()}
            {signupForm()}
        </Layout>
    )
}

export default Signup

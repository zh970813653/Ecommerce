import { Button, Form, Input, Result } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { isAuth } from '../../helper/auth'
import { Jwt } from '../../models/auth'
import { signin, SigninPayload } from '../../store/actions/auth.actions'
import { AppState } from '../../store/reducers'
import { AuthState } from '../../store/reducers/auth.reducer'
import Layout from './Layout'

const Signin = () => {
    const dispath = useDispatch()
    const onFinish = (value: SigninPayload) => {
        dispath(signin(value))
    }
    const auth = useSelector<AppState,AuthState>(state => state.auth)


    const signiinError = () => {
        if (auth.signup.loaded && !auth.signup.success) {
            return (
                <Result
                status="error" 
                title="登录失败!"
                subTitle={auth.signup.message}
              />
            
            )
        }
    }
    // 登录成功后 根据角色跳到对应的管理页面
    const redirectToDashboard = () => {
        const auth = isAuth()
        if (auth) {
            const { user: { role } } = auth as Jwt
            if (role === 0) {
                // 注册用户
                return <Redirect to="/user/dashboard"></Redirect>

            } else {
                // 管理员
                return <Redirect to="/admin/dashboard"></Redirect>
            }
        }
    }
    const signinFrom = () => {
        return (
            <Form onFinish={onFinish}>
                <Form.Item name="password" label="密码">
                    <Input.Password></Input.Password>
                </Form.Item>
                <Form.Item name="email" label="邮箱">
                    <Input></Input>
                </Form.Item>

                <Form.Item name="name" >
                    <Button type='primary' htmlType='submit'>登录</Button>
                </Form.Item>
            </Form>
        )
    }
    return (
        <Layout title="登录" subTitle="">
            {signiinError()}
            {redirectToDashboard()}
            {signinFrom()}
        </Layout>
    )
}

export default Signin

import { Button, Form, Input, message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../../config'
import { isAuth } from '../../helper/auth'
import { Jwt } from '../../models/auth'
import Layout from "../core/Layout"
const AddCategory = () => {
    const [name,setName] = useState<string>('')
    const auth = isAuth() as Jwt
    const {user,token} = auth
    const onFinish = (value:any) => { 
        setName(value.name)
    }
    useEffect(()=>{
        async function addategory() {
            try {
                const {data} = await axios.post<{name: string}>(`${API}/category/create/${user._id}`,{name},{headers:{
                    Authorization: `Bearer ${token}`
                }})
                message.success(`${data.name} 分类添加成功!`)
            } catch (error: any) {
                message.error(error.response.data.error)
            }

        }
        name && addategory()
    },[name])
    return (
        <Layout title='添加分类' subTitle=''>
            <Form onFinish={onFinish}>
                <Form.Item name='name' label="分类名称">
                    <Input></Input>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>添加分类</Button>
                </Form.Item>
            </Form>
            <Button>
                <Link to='/admin/dashboard'>返回 Dashboard</Link>
            </Button>
        </Layout>
    )
}

export default AddCategory

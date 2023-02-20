import { Button, Form, Input, message, Select, Upload } from 'antd'
import { UploadOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from 'react'
import Layout from '../core/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../store/reducers'
import { CategoryState } from '../../store/reducers/category.reducer'
import { getCategory } from '../../store/actions/category.actions'
import { RcFile } from 'antd/lib/upload'
import axios from 'axios'
import { isAuth } from '../../helper/auth'
import { Jwt } from '../../models/auth'
import { API } from '../../config'

const AddProduct = () => {

    const category = useSelector<AppState, CategoryState>(state => state.category)
    const dispath = useDispatch()
    const [file,setFile] = useState<RcFile>()
    const {user,token} = isAuth() as Jwt
    useEffect(() => {
        dispath(getCategory())
    }, [])

    const onFinish = async (product: any) => {
        try {
            const formDate = new FormData()
            for(let key in product) {
                const value = product[key]
                formDate.set(key, value)
            }
            if (!!file) {
                formDate.set('photo', file)
            }
    
            const result = await axios.post(`${API}//product/create/${user._id}`,formDate,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            message.success('产品创建成功!')
        } catch (error: any) {
            message.error(error.response.data.error)
        }


    }
    const addProductForm = () => {
        const props = {
            accept: "image/*",
            beforeUpload: function (file:RcFile) {
                setFile(file)
                return false
            }
        }
        return (
            <Form onFinish={onFinish} initialValues={{ category: "" }}>
                <Form.Item>
                    <Upload {...props }>
                        <Button icon={<UploadOutlined />}>上传商品封面</Button>
                    </Upload>
                </Form.Item>
                <Form.Item name="name" label="商品名称">
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="商品描述">
                    <Input />
                </Form.Item>
                <Form.Item name="price" label="商品价格">
                    <Input />
                </Form.Item>
                <Form.Item name="category" label="所属分类">
                    <Select>
                        <Select.Option value="">请选择分类</Select.Option>
                        {
                            category.category.result.map(item => (
                                <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item name="quantity" label="商品数量">
                    <Input />
                </Form.Item>
                <Form.Item name="shipping" label="是否需要运输">
                    <Select>
                        <Select.Option value="1">是</Select.Option>
                        <Select.Option value="0">否</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        添加商品
                    </Button>
                </Form.Item>
            </Form>
        )
    }
    return (
        <Layout title='添加商品 ' subTitle=''>
            {addProductForm()}
        </Layout>

    )
}

export default AddProduct

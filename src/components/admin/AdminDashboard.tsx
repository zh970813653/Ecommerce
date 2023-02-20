import { Col, Row,Menu,Typography,Descriptions } from 'antd'
import {
  ShoppingCartOutlined,
  UserOutlined,
  OrderedListOutlined
} from "@ant-design/icons"
import React from 'react'
import Layout from '../core/Layout'
import { Link } from 'react-router-dom'
import { isAuth } from '../../helper/auth'
import { Jwt } from '../../models/auth'

const { Title } = Typography

const AdminDashboard = () => {
  const auth = isAuth()
  const {user} = auth as Jwt
  const {
    name,
    email,
    role
  } = user
  const adminLinks = () => {
    return (
      <>
      <Title level={5}>管理员链接</Title>
      <Menu>
        <Menu.Item>
          <ShoppingCartOutlined />
          <Link to="/create/category">添加分类</Link>
        </Menu.Item>
        <Menu.Item>
          <UserOutlined />
          <Link to="/create/product">添加产品</Link>
        </Menu.Item>
        <Menu.Item>
          <OrderedListOutlined />
          <Link to="/admin/orders">订单列表</Link>
        </Menu.Item>
      </Menu>
    </>
    )
  }
  const adminInfo = () => (
    <Descriptions title="管理员信息" bordered>
      <Descriptions.Item label="昵称">{name}</Descriptions.Item>
      <Descriptions.Item label="邮件">{email}</Descriptions.Item>
      <Descriptions.Item label="角色">管理员</Descriptions.Item>
    </Descriptions>
  )
  return (
    <Layout title='AdminDashboard' subTitle=''>
      <Row>
        <Col span="4">{adminLinks()}</Col>
        <Col span="20">{adminInfo()}</Col>
      </Row>
    </Layout>
  )
}

export default AdminDashboard

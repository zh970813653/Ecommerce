import { Col, Row, Typography } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../store/actions/product.actions'
import { AppState } from '../../store/reducers'
import { ProductState } from '../../store/reducers/product.reducer'
import Layout from './Layout'
import ProductItem from './ProductItem'
import Search from './Search'

const { Title } = Typography

const Home = () => {
  const dispath = useDispatch()
  const {createdAt,sold} = useSelector<AppState, ProductState>(state => state.product)
  useEffect(() => {
    dispath(getProduct('createdAt'))
    dispath(getProduct('sold'))
  }, [])
  return (
    <div>
      <Layout title='首页' subTitle='来首页看看'>
        <Search></Search>
        <Title level={5}>最新上架</Title>
        <Row gutter={[16, 16]}>
        {createdAt.products.map(item => (
          <Col key={item._id} span="6">
            <ProductItem product={item} />
          </Col>
        ))}
      </Row>
      <Title level={5}>最受欢迎</Title>
      <Row gutter={[16, 16]}>
        {sold.products.map(item => (
          <Col key={item._id} span="6">
            <ProductItem product={item} />
          </Col>
        ))}
      </Row>
      </Layout>

    </div>
  )
}

export default Home

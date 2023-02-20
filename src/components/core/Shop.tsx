import { Button, Col, Empty, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import Checkbox from './CheckBox'
import RadioBox from './RadioBox'
import Layout from './Layout'
import { useDispatch, useSelector } from 'react-redux'
import { filterProduct } from '../../store/actions/product.actions'
import ProductItem from './ProductItem'
import { AppState } from '../../store/reducers'
import { ProductState } from '../../store/reducers/product.reducer'

const Shop = () => {
  const [myFilters, setMyFilters] = useState<{ category: string[], price: number[] }>({
    category: [],
    price: []
  })
  const [skip, setSkip] = useState<number>(0)
  const product = useSelector<AppState, ProductState>(state => state.product)
  const dispatch = useDispatch()

  useEffect(() => {
    setSkip(0)
  }, [myFilters])
  useEffect(() => {
    dispatch(filterProduct({ filters: myFilters, skip }))
  }, [myFilters, skip])

  const handlCheckBoxFilter = (filters: string[]) => {
    setMyFilters({
      ...myFilters,
      category: filters
    })
  }
  const handlRadioBoxFilter = (filters: number[]) => {
    setMyFilters({
      ...myFilters,
      price: filters
    })
  }
  const loadMore = () => {
    setSkip(skip + 4)
  }
  const loadMoreButton = () => {
    return (
      <Row>
        {
          product.filter.result.size >= 4 && <Button onClick={loadMore}>加载更多</Button>
        }
      </Row>
    )
  }
  const noData = () => {
    return (
      <Row>
        {product.filter.result.size == 0 && <Empty></Empty>}
      </Row>
    )
  }

  const filterDOM = () => (
    <Space size="middle" direction='vertical'>
      <Checkbox handlFilter={handlCheckBoxFilter}></Checkbox>
      <RadioBox handlFilter={handlRadioBoxFilter}></RadioBox>
    </Space>
  )
  const productDOM = () => (
    <Row gutter={[16, 16]}>
      {product.filter.result.data.map(item => (
        <Col key={item._id} span="6">
          <ProductItem product={item} />
        </Col>
      ))}
    </Row>
  )
  return (
    <Layout title='商城' subTitle='一起愉快购物吧'>
      <Row>
        <Col span="4">{filterDOM()}</Col>
        <Col span="20">{productDOM()} {loadMoreButton()} {noData()}</Col>
      </Row>

    </Layout>
  )
}

export default Shop

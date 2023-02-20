import { Button, Card, Col, Row, Typography, Image } from 'antd'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../../config'
import { Product } from '../../models/product'

const { Title, Paragraph } = Typography

interface ProductItemProps {
    product: Product,
    showViewProduct?: boolean
    showCartBtn?: boolean
}

const ProductItem: FC<ProductItemProps> = ({ product, showViewProduct = true, showCartBtn = true }) => {
    const showButtons = () => {
        let buttonArray = []
        if (showViewProduct) {
            buttonArray.push(
                <Button type='link'>
                    <Link to={`/product/${product._id}`}>详情</Link>
                </Button>
            )
        }
        if (showCartBtn) {
            buttonArray.push(
                <Button type='link'>
                    <Link to="">加入购物车</Link>
                </Button>
            )
        }
        return buttonArray
    }
    return (
        <Card
            cover={<Image src={`${API}/product/photo/${product._id}`} alt={product.name} height="300px"></Image>}
            actions={showButtons()}>
            <Title level={5}>{product.name}</Title>
            <Paragraph ellipsis={{ rows: 2 }}>{product.description}</Paragraph>
            <Row>
                <Col span="12">销量: {product.sold}</Col>
                <Col span="12" style={{ textAlign: "right" }}>价格: {product.price}</Col>
            </Row>
            <Row>
                <Col span="12">上架时间: {product.createdAt}</Col>
                <Col span="12" style={{ textAlign: "right" }}>所属分类: {product.category.name}</Col>
            </Row>
        </Card>
    )
}

export default ProductItem

import React, { ChangeEvent, FC, useState } from 'react'
import { CartItem, deleteCartItem, updateCart } from '../../helper/cart'
import { Button, Image, Input, Popconfirm } from 'antd'
import { API } from '../../config'
interface Props {
    product: CartItem
    setCart: (arg: CartItem[]) => void
}

const CartItemFc: FC<Props> = ({ product, setCart }) => {
    const [count, setCount] = useState<number>(product.count)
    const onInputChang = (e: ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value
        setCart(updateCart(product._id, value))
        setCount(value)
    }
    const handleConfirm = () => {
        setCart(deleteCartItem(product._id))
    }
    return (
        <tr className="ant-table-row">
            <td className="ant-table-cell">
                <Image width={120} src={`${API}/product/photo/${product._id}`}></Image>
            </td>
            <td className="ant-table-cell">{product.name}</td>
            <td className="ant-table-cell"> {product.price}</td>
            <td className="ant-table-cell">{product.category.name}</td>
            <td className="ant-table-cell">
                <Input type='number' value={count} onChange={onInputChang}></Input>
            </td>
            <td className="ant-table-cell">
                <Popconfirm
                  title="确定要删除吗?"
                  onConfirm={handleConfirm}
                  okText="确定"
                  cancelText="取消"
                >
                    <Button danger type='primary' >删除</Button>
                </Popconfirm>

            </td>
        </tr>

    )
}

export default CartItemFc

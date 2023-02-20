import React, { FC } from 'react'
import { List, Typography, Radio } from 'antd'
import prices from '../../helper/price'
import { Price } from '../../models/product'
import { RadioChangeEvent } from 'antd/lib/radio'
const { Title } = Typography
interface RadionBoxProps {
    handlFilter: (arg: number[]) => void
}
const RadioBox: FC<RadionBoxProps> = ({handlFilter}) => {
    const renderItem = (item: Price) => {
        return (
            <List.Item>
                <Radio value={item.array}>{item.name}</Radio>
            </List.Item>
        )
    }
    const onChange = (e: RadioChangeEvent) => {
        const value = e.target.value  as number[]
        handlFilter(value) 
    }
    return (
        <>
            <Title level={4}>按照分类筛选</Title>
            <Radio.Group onChange={onChange}>
                <List
                    dataSource={prices}
                    renderItem={renderItem}
                >
                </List>
            </Radio.Group>

        </>
    )
}

export default RadioBox

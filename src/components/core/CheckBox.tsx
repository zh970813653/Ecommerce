
import React, { FC, useEffect } from 'react'
import { List, Typography, Checkbox as AntdCheckbox } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../store/actions/category.actions'
import { AppState } from '../../store/reducers'
import { CategoryState } from '../../store/reducers/category.reducer'
import { Category } from '../../models/category'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'

const { Title } = Typography
interface CheckBoxProps {
    handlFilter: (arg: string[]) => void
}
const CheckBox:FC<CheckBoxProps> = ({handlFilter}) => {
    const dispatch = useDispatch()
    const categories = useSelector<AppState,CategoryState>(state => state.category)
    useEffect(()=> {
        dispatch(getCategory())
    },[])
    const onChange = (checkedValues: CheckboxValueType[]) => {
        handlFilter(checkedValues as string[])
    }
    // const renderItem = (item: Category) => {
    //     return (
    //         <List.Item>
    //             <AntdCheckbox>{item.name}</AntdCheckbox>
    //         </List.Item>
    //     )
    // }
    return (
        <>
            <Title level={4}>按照分类筛选</Title>
            <AntdCheckbox.Group 
                onChange={onChange}
                className="checkBoxFilter"
                options={categories.category.result.map(item => (
                    {
                        label: item.name,
                        value: item._id
                    }
                ))}
            ></AntdCheckbox.Group>
            {/* <List
                dataSource={categories.category.result}
                renderItem={renderItem}
            ></List> */}
        </>
    )
}

export default CheckBox

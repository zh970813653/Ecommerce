import { Category } from "../../models/category"

// 产品分类
export const CATEGORY = 'CATEGORY'
export const CATEGORY_SUCCESS = 'CATEGORY_SUCCESS'

export interface CategoryAction {
    type: typeof CATEGORY
}

export interface CategorySuccessAction {
    type: typeof CATEGORY_SUCCESS,
    payload: Category[]
}

export const getCategory = (): CategoryAction => ({
    type: CATEGORY
})

export const getCategorySuccess = (payload: Category[]): CategorySuccessAction => ({
    type: CATEGORY_SUCCESS,
    payload
})

export type CategoryUnionType = CategoryAction | CategorySuccessAction
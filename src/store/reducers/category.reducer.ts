import { Category } from "../../models/category";
import { CATEGORY, CategoryUnionType, CATEGORY_SUCCESS } from "../actions/category.actions";

export interface CategoryState {
    category: {
        loaded: boolean,
        success: boolean,
        result: Category[]
    }
}

const initialCategoryState: CategoryState = {
    category: {
        loaded: false,
        success: false,
        result: []
    }
}


export default function categoryReducer(state = initialCategoryState, action: CategoryUnionType) {
    switch (action.type) {
        case CATEGORY:
            return {
                ...state,
                category: {
                    loaded: false,
                    success: false,
                    result: []
                }
            }
        case CATEGORY_SUCCESS:
            return {
                ...state,
                category: {
                    loaded: true,
                    success: true,
                    result: action.payload
                }
            }
        default:
            return state
    }
}
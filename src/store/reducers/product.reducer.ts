import { Product } from "../../models/product";
import { FILTER_PRODUCT, FILTER_PRODUCT_SUCCESS, GET_PRODUCT, GET_PRODUCT_BY_ID, GET_PRODUCT_BY_ID_SUCCESS, GET_PRODUCT_SUCCESS, ProductUnionType, SEARCH_PRODUCT_SUCCESS } from "../actions/product.actions";


// 首页中有两个列表 对应两个排序规则 一个是按照销量进行排序 一个是按照上架时间排序
export interface ProductState {
  // 上架时间
  createdAt: {
    loaded: boolean
    success: boolean
    products: Product[]
  },
  // 销量
  sold: {
    loaded: boolean
    success: boolean
    products: Product[]
  },
  // 搜索出来的内容
  search: Product[]
  filter: {
    loaded: boolean
    success: boolean
    result: {
      size: number,
      data: Product[]
    }
  }
  product: {
    loaded: boolean
    success: boolean
    result: Product | null
  }
}

const initialState: ProductState = {
  createdAt: {
    loaded: false,
    success: false,
    products: []
  },
  sold: {
    loaded: false,
    success: false,
    products: []
  },
  search: [],
  filter: {
    loaded: false,
    success: false,
    result: {
      size: 0,
      data: []
    }
  },
  product: {
    loaded: false,
    success: false,
    result: null
  }
}

export default function productReducer(state = initialState, action: ProductUnionType) {
  switch (action.type) {
    case GET_PRODUCT:
      return {
        ...state,
        [action.sortBy]: {
          ...state[action.sortBy as ("createdAt" | "sold")],
          loaded: false,
          success: false,
        }
      }
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        [action.sortBy]: {
          loaded: true,
          success: true,
          products: action.payload
        }
      }
    case SEARCH_PRODUCT_SUCCESS:
      return {
        ...state,
        search: action.products
      }
    case FILTER_PRODUCT:
      return {
        ...state,
        filter: {
          loaded: false,
          success: false,
          result: {
            size: 0,
            data: state.filter.result.data
          }
        }
      }
    case FILTER_PRODUCT_SUCCESS:
      //  如果skip = 0，那么表示第一次请求数据
      let data = action.skip === 0 ? action.payload.data : [...state.filter.result.data, ...action.payload.data]
      return {
        ...state,
        filter: {
          loaded: true,
          success: true,
          result: {
            size: action.payload.size,
            data
          }
        }
      }
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        product: {
          ...state.product,
          loaded: false,
          success: false
        }
      }
    case GET_PRODUCT_BY_ID_SUCCESS: {
      return {
        ...state,
        product: {
          loaded: true,
          success: true,
          result: (action.payload as Product)
        }
      }
    }
    default:
      return state
  }
}

import { combineReducers } from "redux";
import {connectRouter, RouterState} from 'connected-react-router' // 接收action， 然后将路由状态同步到store中 具体使用方法 => https://www.npmjs.com/package/connected-react-router
import {History} from 'history'
import authReducer, { AuthState } from "./auth.reducer";
import categoryReducer, { CategoryState } from "./category.reducer";
import productReducer, { ProductState } from "./product.reducer";


export interface AppState {
  router: RouterState
  auth: AuthState
  category: CategoryState
  product: ProductState
}


const createRootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    category: categoryReducer,
    product: productReducer
  })
export default createRootReducer
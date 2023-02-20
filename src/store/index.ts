import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import {composeWithDevTools} from 'redux-devtools-extension'
import createRootReducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'
export const history = createBrowserHistory()
const sagaaMiddleware = createSagaMiddleware()
const store = createStore(
    createRootReducer(history),
    composeWithDevTools(applyMiddleware(routerMiddleware(history),sagaaMiddleware)),
    
)
sagaaMiddleware.run(rootSaga)
// export default function configureStore(preloadedState) {
//     const store = createStore(
//       createRootReducer(history), // root reducer with router state
//       preloadedState,
//       compose(
//         applyMiddleware(
//           routerMiddleware(history), // routerMiddleware 的作用就是监听router 当路由状态发生改变的时候去派发action
//           // ... other middlewares ...
//         ),
//       ),
//     )
  
//     return store
//   }

export default store
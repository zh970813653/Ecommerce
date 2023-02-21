import React from "react"
import ReactDOM from "react-dom"
import Routes from './Routes'
import store from "./store"
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { history } from "./store"
import './style.css'
import AnotherStore from "./anotherStore"
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AnotherStore>
        <Routes />
      </AnotherStore> 
    </ConnectedRouter>

  </Provider>
  ,
  document.getElementById("root")
)

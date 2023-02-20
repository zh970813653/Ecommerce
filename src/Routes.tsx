import React from 'react'
import Home from './components/core/Home'
import Shop from './components/core/Shop'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Signin from './components/core/Signin'
import Signup from './components/core/Signup'
import Dashboard from './components/admin/Dashboard'
import AddCategory from './components/admin/AddCategory'
import AdminDashboard from './components/admin/AdminDashboard'
import PrivateRoute from './components/admin/PrivateRoute'
import AdminRoute from './components/admin/AdminRoute'
import AddProduct from './components/admin/AddProduct'
import Product from './components/core/Product'
import Cart from './components/core/Cart'

const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        {/* exact => 精确匹配 */}
        <Route path="/" component={Home} exact></Route>
        <Route path="/shop" component={Shop} exact></Route>
        <Route path="/signin" component={Signin} exact></Route>
        <Route path="/signup" component={Signup} exact></Route>
        <Route path="/cart" component={Cart} exact />
        <PrivateRoute path='/user/dashboard' component={Dashboard}></PrivateRoute>
        <AdminRoute path='/admin/dashboard' component={AdminDashboard}></AdminRoute>
        <AdminRoute path='/create/category' component={AddCategory}></AdminRoute>
        <AdminRoute path='/create/product' component={AddProduct}></AdminRoute>
        <AdminRoute path="/product/:productId" component={Product} />
       
      </Switch>
    </HashRouter>
  )
}

export default Routes

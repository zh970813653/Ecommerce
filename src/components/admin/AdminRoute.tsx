import React, { FC } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { isAuth } from '../../helper/auth'
import { Jwt } from '../../models/auth'
 
interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<any>
}

 const AdminRoute:FC<PrivateRouteProps> = (
    {
        component: Component,
        ...rest
    }
 ) => {
    // props => 原本要传给dashboard组建的props
    const routeRender = (props:any) => {
        const auth = isAuth()
        
        if (auth) {
            const { user: { role } } = auth as Jwt
            if (role === 1) {
                return <Component {...props}></Component>
            }
        }
        return <Redirect to='/signin' />
    }
   return (
    <Route {...rest} render={routeRender}></Route>
   )
 }
 
 export default AdminRoute
 
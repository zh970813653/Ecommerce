import React from 'react'
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { AppState } from '../../store/reducers';
// import { RouterState } from 'connected-react-router';
import { useLocation } from 'react-router-dom'
import { isAuth } from '../../helper/auth';
import { Jwt } from '../../models/auth';
const useActive = (currentPath: string, path: string): string => {
    return currentPath === path ? "ant-menu-item-selected" : ""
}

const Navigation = () => {
    // const router = useSelector<AppState,RouterState>(state => state.router)
    // const pathname = router.location.pathname
    // console.log(useLocation(),'/');
    const pathname = useLocation().pathname
    const isHome = useActive(pathname, '/')
    const isShop = useActive(pathname, '/shop')
    const isSignin = useActive(pathname, '/signin')
    const isSignup = useActive(pathname, '/signup')
    const isDashboard = useActive(pathname, getDashboarUrl())

    function getDashboarUrl() {
        let url
        if (isAuth()) {
            const { user: { role } } = isAuth() as Jwt
            // 用户
            if (role === 0) {
                url = '/user/dashboard'
            } else {
                // 管理员
                url = '/admin/dashboard'
            }
        }
        return url as string

    }

    return (
        <Menu mode='horizontal' selectable={false}>
            <Menu.Item className={isHome}>
                <Link to="/">首页</Link>
            </Menu.Item>
            <Menu.Item className={isShop}>
                <Link to="/shop">商城</Link>
            </Menu.Item>
            {/* 判断是否登录过 如果登录过 再展示登录和注册 */}
            {
                !isAuth() && <>
                    <Menu.Item className={isSignin}>
                        <Link to="/signin">登录</Link>
                    </Menu.Item>
                    <Menu.Item className={isSignup}>
                        <Link to="/signup">注册</Link>
                    </Menu.Item>
                </>
            }
            {
                isAuth() && <>
                    <Menu.Item className={isDashboard}>
                        <Link to={getDashboarUrl()}>dashboard</Link>
                    </Menu.Item>
                </>
            }

        </Menu>
    )
}

export default Navigation

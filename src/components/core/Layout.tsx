import React, { FC } from 'react'
import { PageHeader } from 'antd';
import Navigation from './Navigation'

interface Props {
  children: React.ReactNode // 表示React中的一个子节点
  title: string
  subTitle: string
}

/**
 * 
 * @param param0 
 * FC 表示 函数式组建
 */
const Layout: FC<Props> = ({ children, title, subTitle }) => {
  return (
    <div>
      <Navigation></Navigation>
      <PageHeader className='jumbotron' title={title} subTitle={subTitle} />
      <div style={{width:"85%", margin:"0 auto"}}>
        {children}
      </div>

    </div>
  )
}

export default Layout

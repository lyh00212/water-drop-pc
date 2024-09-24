import React, { FC } from 'react'
import { Space } from 'antd'
import { ProLayout, MenuDataItem } from '@ant-design/pro-components'
import { LogoutOutlined } from '@ant-design/icons'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import useGetUserInfo from '@/hooks/useGetUserInfo'
import { routes, ROUTE_KEY } from '@/router/menu'
import { AUTH_TOKEN } from '@/utils/constants'
import useGoTo from '@/hooks/useGoTo'

const menuItemRender = (item: MenuDataItem, dom: React.ReactNode) => (
    <Link to={item.path || '/'}>{dom}</Link>
)
const Layout: FC = () => {
    const userInfo = useGetUserInfo()
    const nav = useNavigate()
    const { go } = useGoTo()

    const logout = () => {
        console.log(1)

        sessionStorage.setItem(AUTH_TOKEN, '')
        localStorage.setItem(AUTH_TOKEN, '')
        nav('/login')
    }

    return (
        <ProLayout
            layout="mix"
            siderWidth={130}
            title={false}
            avatarProps={{
                src:
                    userInfo.avatar ||
                    'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                title: userInfo.name,
                size: 'small',
                onClick: () => go(ROUTE_KEY.MY),
            }}
            links={[
                <Space size={20} onClick={logout}>
                    <LogoutOutlined />
                    退出
                </Space>,
            ]}
            logo={<img alt="" src="" />}
            route={{
                path: '/',
                routes,
            }}
            menuItemRender={menuItemRender}
            onMenuHeaderClick={() => nav('/')}
        >
            <Outlet />
        </ProLayout>
    )
}

export default Layout

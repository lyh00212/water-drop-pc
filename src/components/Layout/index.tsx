import React, { FC } from 'react'
import { Space, Tooltip } from 'antd'
import { ProLayout, MenuDataItem } from '@ant-design/pro-components'
import { LogoutOutlined, ShopOutlined } from '@ant-design/icons'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import useGetUserInfo from '@/hooks/useGetUserInfo'
import { routes, ROUTE_KEY } from '@/router/menu'
import { AUTH_TOKEN } from '@/utils/constants'
import useGoTo from '@/hooks/useGoTo'
import OrgSelect from '../OrgSelect'

const menuItemRender = (item: MenuDataItem, dom: React.ReactNode) => (
    <Link to={item.path || '/'}>{dom}</Link>
)
const Layout: FC = () => {
    const userInfo = useGetUserInfo()
    const nav = useNavigate()
    const { go } = useGoTo()

    const logout = () => {
        sessionStorage.setItem(AUTH_TOKEN, '')
        localStorage.setItem(AUTH_TOKEN, '')
        nav('/login')
    }

    const goToOrg = () => {
        go(ROUTE_KEY.ORG)
    }

    return (
        <ProLayout
            layout="mix"
            siderWidth={150}
            title={'liumou'}
            avatarProps={{
                src:
                    userInfo.avatar ||
                    'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                title: userInfo.tel,
                size: 'small',
                onClick: () => go(ROUTE_KEY.MY),
            }}
            links={[
                <Space size={20} onClick={logout}>
                    <LogoutOutlined />
                    退出
                </Space>,
            ]}
            // logo={<img alt="" src="" />}
            route={{
                path: '/home',
                routes,
            }}
            actionsRender={() => [
                <OrgSelect />,
                <Tooltip title="门店管理">
                    <ShopOutlined onClick={goToOrg} />
                </Tooltip>,
            ]}
            menuItemRender={menuItemRender}
            onMenuHeaderClick={() => nav('/')}
        >
            <Outlet />
        </ProLayout>
    )
}

export default Layout

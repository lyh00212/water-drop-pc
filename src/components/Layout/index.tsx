import React, { FC } from 'react'
import { ProLayout, PageContainer, MenuDataItem } from '@ant-design/pro-components'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import useGetUserInfo from '@/hooks/useGetUserInfo'
import { routes } from '@/router/menu'
import { AUTH_TOKEN } from '@/utils/constants'

const menuItemRender = (item: MenuDataItem, dom: React.ReactNode) => (
    <Link to={item.path || '/'}>{dom}</Link>
)
const Layout: FC = () => {
    const userInfo = useGetUserInfo()
    const nav = useNavigate()

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
            avatarProps={{
                src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                title: userInfo.tel,
                size: 'small',
                onClick: logout,
            }}
            title={false}
            logo={
                <img
                    alt=""
                    src="https://water-drop-server-assets.oss-cn-hangzhou.aliyuncs.com/images/1725899700347.jpeg?Expires=1726593187&OSSAccessKeyId=TMP.3KiHr3tuFs7QGSbyyZwPszCoTAtXQ6mhFriiB8dBZbZi3H9eeytvv6pWFpTTwaGYpwDbQTU1AuZ6ZqtAmmTbPCykQLUSxF&Signature=kYoYn8lrmemtQN9VOO8UL34ss18%3D"
                />
            }
            route={{
                path: '/',
                routes,
            }}
            menuItemRender={menuItemRender}
            onMenuHeaderClick={() => nav('/')}
        >
            <PageContainer>
                <Outlet />
            </PageContainer>
        </ProLayout>
    )
}

export default Layout

import { HomeOutlined } from '@ant-design/icons'
// import Home from '@/pages/Home'
// import NotFound from '@/pages/NotFound'
// import My from '@/pages/My'

interface IRoute {
    path: string
    name: string
    icon?: React.ReactNode
    hideInMenu?: boolean
}

export const ROUTE_KEY = {
    HOME: 'home',
    MY: 'my',
    NOTFOUND: 'notfound',
}

export const ROUTE_CONFIG: Record<string, IRoute> = {
    [ROUTE_KEY.HOME]: {
        path: 'home',
        name: '首页',
        icon: <HomeOutlined />,
    },
    [ROUTE_KEY.MY]: {
        path: 'my',
        name: '我的',
        icon: <HomeOutlined />,
    },
    [ROUTE_KEY.NOTFOUND]: {
        path: '*',
        name: '404',
        hideInMenu: true,
    },
}

export const routes = Object.keys(ROUTE_CONFIG).map(key => ({ ...ROUTE_CONFIG[key], key }))

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key]

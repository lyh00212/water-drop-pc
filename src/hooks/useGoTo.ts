import { useMemo } from 'react'
import { useLocation, useNavigate, matchPath } from 'react-router-dom'
import { getRouteByKey, routes } from '@/router/menu'

// 通用页面跳转器
const useGoTo = () => {
    const nav = useNavigate()
    const back = () => nav(-1)
    const go = (pageKey: string, params?: Record<string, string | number>) => {
        if (!pageKey) {
            nav('/')
            return
        }
        const route = getRouteByKey(pageKey)
        if (route && route.path) {
            if (!params) {
                nav(`${route.path}`)
                return
            }
            const url = route.path.replace(
                /\/:(\w+)/g,
                (exp: string, exp1: string) => `/${params[exp1]}`
            )
            nav(`/${url}`)
        }
    }
    return {
        back,
        go,
    }
}

export default useGoTo

// 获取当前 URL 匹配的路由
export const useMatchedRoute = () => {
    const r = useLocation()
    const route = useMemo(() => {
        routes.find(item => matchPath(item.path, r.pathname))
    }, [r.pathname])
    return route
}

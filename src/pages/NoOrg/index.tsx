import useGoTo from '@/hooks/useGoTo'
import { Button, Result } from 'antd'
import { useEffect } from 'react'
import useGetOrgInfo from '@/hooks/useGetOrgInfo'
import { ROUTE_KEY } from '@/router/menu'

/**
 * 请选择门店
 */
const NoOrg = () => {
    const orgInfo = useGetOrgInfo()
    const { go } = useGoTo()
    useEffect(() => {
        if (orgInfo.currentOrg) {
            go(ROUTE_KEY.HOME)
        }
    }, [orgInfo.currentOrg, go])

    return (
        <Result
            status="404"
            title="请选择门店"
            subTitle="所有的管理行为都是基于您选择的门店进行筛选的"
            extra={
                <Button type="primary" href="/">
                    返回首页
                </Button>
            }
        />
    )
}

export default NoOrg

import { useGetUser } from '@/hooks/useHooks'
import { IPropChild } from '@/utils/types'
import { Spin } from 'antd'

const UserInfo = ({ children }: IPropChild) => {
    const { loading } = useGetUser()
    return (
        <Spin spinning={loading}>
            <div style={{ height: '100vh' }}>{children}</div>
        </Spin>
    )
}

export default UserInfo

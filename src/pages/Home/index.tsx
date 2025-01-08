import React from 'react'
import styles from './index.module.less'
// import { useUserContext } from '@/hooks/useHooks'
import useGetUserInfo from '@/hooks/useGetUserInfo'
import useGetOrgInfo from '@/hooks/useGetOrgInfo'
// import UserInfo from '@/components/UserInfo'

const Home = () => {
    // const { store } = useUserContext()
    const userInfo = useGetUserInfo()
    const orgInfo = useGetOrgInfo()
    console.log(userInfo, 'store')

    return <div className={styles.container}>home--{orgInfo.currentOrg}</div>
}

export default Home

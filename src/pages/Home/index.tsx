import React from 'react'
import styles from './index.module.less'
// import { useUserContext } from '@/hooks/useHooks'
import useGetUserInfo from '@/hooks/useGetUserInfo'
// import UserInfo from '@/components/UserInfo'

const Home = () => {
    // const { store } = useUserContext()
    const userInfo = useGetUserInfo()
    console.log(userInfo, 'store')

    return <div className={styles.container}>home</div>
}

export default Home

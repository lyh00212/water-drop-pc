import { useSelector } from 'react-redux'
import { StateType } from '@/store'
import { UserStateType } from '@/store/userReducer'

function useGetUserInfo() {
    const userInfo = useSelector<StateType>(state => state.user) as UserStateType
    return userInfo
}

export default useGetUserInfo

import { useQuery } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { GET_USER } from '@/graphql/user'
import { UserStateType } from '@/store/userReducer'
import { setUserInfo } from '@/store/userReducer'

export const useGetUser = () => {
    const dispatch = useDispatch()
    const { loading, refetch } = useQuery<{ getUserInfo: UserStateType }>(GET_USER, {
        onCompleted: data => {
            if (data.getUserInfo) {
                const { id, name, tel, desc, avatar } = data.getUserInfo
                dispatch(setUserInfo({ id, name, tel, desc, avatar }))
                return
            }
            if (window.location.pathname !== '/login') {
                window.location.href = `/login?orgUrl=${window.location.pathname}`
            }
        },
        onError: () => {
            if (window.location.pathname !== '/login') {
                window.location.href = `/login?orgUrl=${window.location.pathname}`
            }
        },
    })
    return { loading, refetch }
}

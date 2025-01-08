import { useSelector } from 'react-redux'
import { StateType } from '@/store'
import { OrgStateType } from '@/store/orgReducer'

function useGetOrgInfo() {
    const orgInfo = useSelector<StateType>(state => state.org) as OrgStateType
    return orgInfo
}

export default useGetOrgInfo

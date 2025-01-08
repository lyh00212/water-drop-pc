import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import orgReducer, { OrgStateType } from './orgReducer'

export interface StateType {
    user: UserStateType
    org: OrgStateType
}

export default configureStore({
    reducer: {
        user: userReducer,
        org: orgReducer,
    },
})

import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'

export interface StateType {
    user: UserStateType
}

export default configureStore({
    reducer: {
        user: userReducer,
    },
})

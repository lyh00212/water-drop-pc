import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserStateType {
    id: string
    tel?: string
    name: string
    desc: string
    avatar: string
}

const INIT_VALUE: UserStateType = {
    id: '',
    tel: '',
    name: '',
    desc: '',
    avatar: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState: INIT_VALUE,
    reducers: {
        setUserInfo: (state: UserStateType, action: PayloadAction<UserStateType>) => {
            return action.payload
        },
        editUserInfo: (state: UserStateType, action: PayloadAction<UserStateType>) => {
            return {
                tel: state.tel,
                ...action.payload,
            }
        },
    },
})

export const { setUserInfo, editUserInfo } = userSlice.actions
export default userSlice.reducer

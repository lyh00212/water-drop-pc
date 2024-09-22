import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserStateType {
    id: string
    tel: string
    name: string
}

const INIT_VALUE: UserStateType = {
    id: '',
    tel: '',
    name: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState: INIT_VALUE,
    reducers: {
        setUserInfo: (state: UserStateType, action: PayloadAction<UserStateType>) => {
            return action.payload
        },
    },
})

export const { setUserInfo } = userSlice.actions
export default userSlice.reducer

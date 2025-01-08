import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface OrgStateType {
    currentOrg?: string
}

const INIT_VALUE: OrgStateType = {
    currentOrg: '',
}

const orgSlice = createSlice({
    name: 'org',
    initialState: INIT_VALUE,
    reducers: {
        eidtCurrentOrg: (state: OrgStateType, action: PayloadAction<OrgStateType>) => {
            return {
                currentOrg: state.currentOrg,
                ...action.payload,
            }
        },
    },
})

export const { eidtCurrentOrg } = orgSlice.actions
export default orgSlice.reducer

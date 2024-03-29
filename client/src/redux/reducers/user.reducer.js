import {createSlice} from '@reduxjs/toolkit'

const TODOS_REDUCER_NAME = 'user'

const userSlice = createSlice({
    name: TODOS_REDUCER_NAME,
    initialState: {
        userData: null,
        isAuthenticated: null,
        role: null
    },
    reducers: {
        fetchRole(state, action) {
            state.userData = action.payload.userData
            state.isAuthenticated = action.payload.isAuthenticated
            state.role = action.payload.role
        },
    }
})

export const {
    fetchRole,
} = userSlice.actions

export default userSlice.reducer

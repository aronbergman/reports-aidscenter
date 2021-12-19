import { createSlice } from '@reduxjs/toolkit'
import moment from "moment";

const APP_REDUCER_NAME = 'filter-hotline'

const initialState = {
    rangePeriod: [
        moment().subtract(30,'d'),
        moment()
    ],
    city: null,
    reason: null,
    result: null,
}

const filterSlice = createSlice({
    name: APP_REDUCER_NAME,
    initialState: initialState,
    reducers: {
        setRangePeriod(state, action) {
            state.rangePeriod = action.payload
        },
        setTestingCity(state, action) {
            state.city = action.payload
        },
        setReason(state, action) {
            state.reason = action.payload
        },
        setResult(state, action) {
            state.result = action.payload
        },
        resetFilterState(state) {
            state.findByCode = null
        }
    }
})

export const {
    setRangePeriod,
    setTestingCity,
    setReason,
    setResult,
    resetFilterState
} = filterSlice.actions

export default filterSlice.reducer

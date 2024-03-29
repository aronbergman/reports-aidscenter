import { createSlice } from '@reduxjs/toolkit'
import moment from "moment";

const APP_REDUCER_NAME = 'filter-drugs'

const initialState = {
    city: null,
    type: null,
    rangePeriod: [
        moment().subtract(30,'d'),
        moment()
    ],
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
        setTestingType(state, action) {
            state.type = action.payload
        },
        resetFilterState(state) {
            state.findByCode = null
        }
    }
})

export const {
    setRangePeriod,
    setTestingCity,
    setTestingType,
    resetFilterState
} = filterSlice.actions

export default filterSlice.reducer

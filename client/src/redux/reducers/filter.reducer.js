import { createSlice } from '@reduxjs/toolkit'
import moment from "moment";

const APP_REDUCER_NAME = 'filter'

const initialState = {
    usedDrugs: false,
    usedPrep: false,
    sexWorked: false,
    rangePeriod: [
        moment().subtract(30,'d'),
        moment()
    ],
    city: null,
    findByCode: null,
    searchOfCode: null,
    formType: null,
    age: null,
    searchType: true,
}

const filterSlice = createSlice({
    name: APP_REDUCER_NAME,
    initialState: initialState,
    reducers: {
        findByCode(state, action) {
            state.findByCode = action.payload
        },
        setTestingDrugUsed(state, action) {
            state.usedDrugs = action.payload
        },
        setTestingPrepUsed(state, action) {
            state.usedPrep = action.payload
        },
        setRangePeriod(state, action) {
            state.rangePeriod = action.payload
        },
        setTestingCity(state, action) {
            state.city = action.payload
        },
        setTestingSexWorked(state, action) {
            state.sexWorked = action.payload
        },
        setSearchOfCode(state, action) {
            state.searchOfCode = action.payload
        },
        setFormType(state, action) {
            state.formType = action.payload
        },
        setAge(state, action) {
            state.age = action.payload
        },
        setSearchType(state, action) {
            state.searchType = action.payload
        },
        resetFilterState(state) {
            state.findByCode = null
        }
    }
})

export const {
    findByCode,
    setTestingDrugUsed,
    setTestingPrepUsed,
    setTestingSexWorked,
    setRangePeriod,
    setTestingCity,
    setSearchOfCode,
    setFormType,
    setAge,
    setSearchType,
    resetFilterState
} = filterSlice.actions

export default filterSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { START } from "../../constants/others.constants";

const APP_REDUCER_NAME = 'filter'

const filterSlice = createSlice({
    name: APP_REDUCER_NAME,
    initialState: {
        usedDrugs: false,
        usedPrep: false,
        sexWorked: false,
        rangePeriod: null,
        city: null,
        findByCode: null,
        searchOfCode: null,
        formType: null
    },
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
    setFormType
} = filterSlice.actions

export default filterSlice.reducer

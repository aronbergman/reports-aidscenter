import { createSlice } from "@reduxjs/toolkit";

const REDUCER_NAME = "patients";

const patientsSlice = createSlice({
  name: REDUCER_NAME,
  initialState: {
    patients: [],
  },
  reducers: {
    fetchAll(state, action) {
      state.patients = action.payload.data;
    },
  },
});

export const { fetchAll } = patientsSlice.actions;

export default patientsSlice.reducer;

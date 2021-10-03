import {
    TESTING_SET_DRUG_USED,
    TESTING_SET_RANGE_PERIOD,
    TESTING_CITY,
    TESTING_FIND_BY_CODE,
    TESTING_SET_PREP_USED, TESTING_SET_SEX_WORKED
} from "./types";

export const setTestingDrugUsed = (type) => ({
    type: TESTING_SET_DRUG_USED,
    payload: type,
});

export const setTestingPrepUsed = (type) => ({
    type: TESTING_SET_PREP_USED,
    payload: type,
});

export const setTestingSexWorked = (type) => ({
    type: TESTING_SET_SEX_WORKED,
    payload: type,
});

export const setRangePeriod = (period) => ({
    type: TESTING_SET_RANGE_PERIOD,
    payload: period,
});

export const setTestingCity = (city) => ({
    type: TESTING_CITY,
    payload: city,
});

export const findByCode = (code) => ({
    type: TESTING_FIND_BY_CODE,
    payload: code,
});

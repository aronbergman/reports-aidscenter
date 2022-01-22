import {combineReducers} from 'redux'
import user from './reducers/user.reducer'
import app from './reducers/app.reducer'
import filter from './reducers/filter.reducer'
import filterHotLine from './reducers/filterHotLine.reducer'
import filterGroupsHiv from './reducers/filterGroupsHiv.reducer'
import filterDrugs from "./reducers/filterDrugs.reducer"

export default combineReducers({
    app,
    user,
    filter,
    filterHotLine,
    filterGroupsHiv,
    filterDrugs
});

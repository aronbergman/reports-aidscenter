import {combineReducers} from 'redux'
import user from './reducers/user.reducer'
import app from './reducers/app.reducer'
import filter from './reducers/filter.reducer'
import filterHotLine from './reducers/filterHotLine.reducer'

export default combineReducers({
    app,
    user,
    filter,
    filterHotLine
});

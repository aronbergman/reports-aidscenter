import {combineReducers} from 'redux'
import user from './reducers/user.reducer'
import app from './reducers/app.reducer'
// import video from './reducers/video.reducer'
import filter from './reducers/filter.reducer'

export default combineReducers({
    app,
    user,
    // video,
    filter
});

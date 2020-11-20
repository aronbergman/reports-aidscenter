import {combineReducers} from 'redux'
import user from './reducers/user.reducer'
import app from './reducers/app.reducer'
import video from './reducers/video.reducer'

export default combineReducers({
    app,
    user,
    video,
});

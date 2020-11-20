import { createSlice } from '@reduxjs/toolkit'

const VIDEO_REDUCER_NAME = 'video'

const videoSlice = createSlice({
    name: VIDEO_REDUCER_NAME,
    initialState: {
        videos: null,
        count: null,
        loading : false
    },
    reducers: {
        setVideos(state, action) {
            state.videos = action.payload.videos
        },
        setFirstVideos(state, action) {
            state.videos = action.payload.videos
            state.count = action.payload.count
            state.loading = false
        },
        isLoading(state, action) {
            state.loading = action.payload
        }
    }
})

export const {
    setVideos,
    setFirstVideos,
    isLoading
} = videoSlice.actions

export default videoSlice.reducer

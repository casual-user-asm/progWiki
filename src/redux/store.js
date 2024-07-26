import { configureStore } from '@reduxjs/toolkit'
import wikiReducer from './slices/wikiSlice'

const store = configureStore({
    reducer: {
        data: wikiReducer,
    },
})
export default store

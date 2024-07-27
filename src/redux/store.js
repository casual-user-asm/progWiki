import { configureStore } from '@reduxjs/toolkit'
import wikiPediaSlice from './slices/wikiPediaSlice'
import wikiBooksSlice from './slices/wikiBooksSlice'
import wikiVersitySlice from './slices/wikiVersitySlice'

const store = configureStore({
    reducer: {
        wikiPedia: wikiPediaSlice,
        wikiBooks: wikiBooksSlice,
        wikiVersity: wikiVersitySlice,
    },
})
export default store

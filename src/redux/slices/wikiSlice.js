import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = []

const wikiReducer = createSlice({
    name: 'wiki',
    initialState: initialState,
    reducers: {
        addData: (state, action) => {
            state.push(action.payload)
        },
    },
})

export default wikiReducer.reducer

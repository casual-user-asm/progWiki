import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    bookData: [],
    bookStatus: 'idle',
    bookError: null,
}

export const fetchWikiBooksData = createAsyncThunk(
    'wiki/fetchWikiBooksData',
    async (query, thunkAPI) => {
        const url = `https://en.wikibooks.org/w/api.php?action=query&format=json&list=search&srsearch=${query}&srlimit=50&origin=*`

        try {
            const res = await axios.get(url)
            const wikiData = res.data.query.search

            return wikiData
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const wikiBooksSlice = createSlice({
    name: 'wikiBooks',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWikiBooksData.pending, (state) => {
                state.bookStatus = 'loading'
            })
            .addCase(fetchWikiBooksData.fulfilled, (state, action) => {
                state.bookStatus = 'succeeded'
                state.bookData = action.payload
            })
            .addCase(fetchWikiBooksData.rejected, (state, action) => {
                state.bookStatus = 'failed'
                state.bookError = action.payload
            })
    },
})

export default wikiBooksSlice.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    data: [],
    status: 'idle',
    error: null,
}

export const fetchWikiPediaData = createAsyncThunk(
    'wiki/fetchWikiPediaData',
    async (query, thunkAPI) => {
        const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${query}&srlimit=50&origin=*`

        try {
            const res = await axios.get(url)
            const wikiData = res.data.query.search

            return wikiData
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const wikiPediaSlice = createSlice({
    name: 'wikiPedia',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWikiPediaData.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchWikiPediaData.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
            .addCase(fetchWikiPediaData.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    },
})

export default wikiPediaSlice.reducer

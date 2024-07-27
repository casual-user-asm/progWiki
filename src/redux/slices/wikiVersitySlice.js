import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    versityData: [],
    versityStatus: 'idle',
    versityError: null,
}

export const fetchWikiVersityData = createAsyncThunk(
    'wiki/fetchWikiVersityData',
    async (query, thunkAPI) => {
        const url = `https://en.wikiversity.org/w/api.php?action=query&format=json&list=search&srsearch=${query}&srlimit=50&origin=*`

        try {
            const res = await axios.get(url)
            const wikiData = res.data.query.search

            return wikiData
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const wikiVersitySlice = createSlice({
    name: 'wikiVersity',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWikiVersityData.pending, (state) => {
                state.versityStatus = 'loading'
            })
            .addCase(fetchWikiVersityData.fulfilled, (state, action) => {
                state.versityStatus = 'succeeded'
                state.versityData = action.payload
            })
            .addCase(fetchWikiVersityData.rejected, (state, action) => {
                state.versityStatus = 'failed'
                state.versityError = action.payload
            })
    },
})

export default wikiVersitySlice.reducer

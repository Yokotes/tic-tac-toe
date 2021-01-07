import { createSlice } from '@reduxjs/toolkit'

const gameHistorySlice = createSlice({
    name: 'history',
    initialState: {
        history: []
    },
    reducers: {
        addNewItem: (state, action) => {
            state.history.unshift({ winner: action.payload.winner, time: action.payload.time })
        }
    }
})

export const { addNewItem } = gameHistorySlice.actions

export default gameHistorySlice.reducer
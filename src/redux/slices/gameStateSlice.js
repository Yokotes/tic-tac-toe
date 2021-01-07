import { createSlice } from '@reduxjs/toolkit'

const gameStateSlice = createSlice({
    name: 'gameState',
    initialState: {
        value: 'Play',
        winner: null
    },
    reducers: {
        changeState: (state, action) => {
            state.value = action.payload.value
            state.winner = action.payload.winner
        }
    }
})

export const { changeState } = gameStateSlice.actions

export default gameStateSlice.reducer